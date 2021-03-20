/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Assets } from "../assets/Assets";
import { Color } from "../color/Color";
import { RGBColor } from "../color/RGBColor";
import { Size } from "../geom/Size";
import { createCanvas, getRenderingContext } from "../graphics/canvas";
import { ControllerManager } from "../input/ControllerManager";
import { GamepadInput } from "../input/GamepadInput";
import { Scenes } from "../scene/Scenes";
import { signal, Signal } from "../util/Signal";
import { Timer, UpdateTimer } from "./Timer";

/**
 * Game constructor arguments.
 */
export interface GameArgs {
    /**
     * Optional physical game size. When set then the canvas uses this exact size and aspect ratio but is still
     * scaled up (by CSS) to fill as much of the screen as possible. When not specified then the physical size is
     * dynamically calculated from the window size and device pixel ratio.
     */
    size?: Size | null;

    /**
     * Set to true for a pixelated game. image smoothing and image rendering is configured accordingly to this
     * setting. Defaults is true when a fixed game size is specified, false if not.
     */
    pixelated?: boolean;

    /** The background color. Defaults to black. Before a frame is rendered the canvas is filled with this color. */
    backgroundColor?: Color | string;
}

export type ImageRendering = "auto" | "smooth" | "high-quality" | "crisp-edges" | "pixelated";

/**
 * Abstract base class for a game. Extend this class to implement the actual game. All scenes and nodes have easy
 * access to the game instance so this is a good place to put some global game logic.
 */
export abstract class Game {
    /**
     * Signal emitted when user presses down a key.
     *
     * @event
     */
    @signal(Game.prototype.initKeyDown)
    public readonly onKeyDown!: Signal<KeyboardEvent>;

    /**
     * Signal emitted when user releases a key.
     *
     * @event
     */
    @signal(Game.prototype.initKeyUp)
    public readonly onKeyUp!: Signal<KeyboardEvent>;

    /**
     * Signal emitted when user types (presses and releases) a key.
     *
     * @event
     */
    @signal(Game.prototype.initKeyPress)
    public readonly onKeyPress!: Signal<KeyboardEvent>;

    public readonly controllerManager = ControllerManager.getInstance();
    public readonly gamepad = new GamepadInput();
    public readonly scenes = new Scenes(this);
    public readonly assets = new Assets();
    private readonly size: Size | null;
    private readonly backgroundColor: string;
    private readonly pixelated: boolean;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly gameLoopCallback = this.gameLoop.bind(this);
    private gameLoopId: number | null = null;
    private updateTimer!: UpdateTimer;
    private readonly timer: Timer;

    /**
     * Creates a new game with the given arguments.
     *
     * @param args - The optional game arguments.
     */
    public constructor(args?: GameArgs);

    public constructor({ backgroundColor = new RGBColor(0, 0, 0), size = null,
            pixelated = size != null }: GameArgs = {}) {
        const canvas = this.canvas = createCanvas(320, 200);
        this.size = size;
        this.pixelated = pixelated;
        this.backgroundColor = typeof backgroundColor === "string" ? backgroundColor : backgroundColor.toRGBA().toCSS();
        this.timer = new Timer(update => { this.updateTimer = update; });

        // Desynchronized sounds like a good idea but unfortunately it prevents pixelated graphics
        // on some systems (Chrome+Windows+NVidia for example which forces bilinear filtering). So
        // it is deactivated here for pixelated games.
        this.ctx = getRenderingContext(canvas, "2d", { alpha: false, desynchronized: !pixelated });
        const style = canvas.style;
        style.position = "absolute";
        style.margin = "auto";
        style.left = style.top = style.right = style.bottom = "0";
        if (pixelated) {
            style.imageRendering = "pixelated";
            style.imageRendering = "crisp-edges";
        } else {
            style.imageRendering = "auto";
        }
        document.body.appendChild(this.canvas);

        // Update canvas size now and every time the window si resized.
        window.addEventListener("resize", () => this.updateCanvasSize());
        this.updateCanvasSize();

        // Prevent context menu when right-clicking the canvas
        canvas.addEventListener("contextmenu", event => {
            event.preventDefault();
        });

        // Use Alt+Enter to toggle fullscreen mode.
        window.addEventListener("keydown", async (event) => {
            if (event.altKey && event.key === "Enter") {
                const lockingEnabled = "keyboard" in navigator && typeof navigator.keyboard.lock === "function";
                // If the browser is in full screen mode AND fullscreen has been triggered by our own keyboard shortcut
                if (window.matchMedia("(display-mode: fullscreen)").matches && document.fullscreenElement != null) {
                    if (lockingEnabled) {
                        navigator.keyboard.unlock();
                    }
                    await document.exitFullscreen();
                } else {
                    if (lockingEnabled) {
                        await navigator.keyboard.lock([ "Escape" ]);
                    }
                    await document.body.requestFullscreen();
                }
            }
        });
    }

    private initKeyDown(signal: Signal<KeyboardEvent>): () => void {
        const listener = signal.emit.bind(signal);
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }

    private initKeyUp(signal: Signal<KeyboardEvent>): () => void {
        const listener = signal.emit.bind(signal);
        document.addEventListener("keyup", listener);
        return () => {
            document.removeEventListener("keyup", listener);
        };
    }

    private initKeyPress(signal: Signal<KeyboardEvent>): () => void {
        const listener = signal.emit.bind(signal);
        document.addEventListener("keypress", listener);
        return () => {
            document.removeEventListener("keypress", listener);
        };
    }

    /**
     * Returns the canvas element the game uses for rendering.
     *
     * @return The canvas.
     */
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    /**
     * Returns the timer used by the game to update game state.
     *
     * @return The timer.
     */
    public getTimer(): Timer {
        return this.timer;
    }

    /**
     * Returns the game width which is the same as the canvas width in pixels.
     *
     * @return The game width in pixels.
     */
    public getWidth(): number {
        return this.canvas.width;
    }

    /**
     * Returns the game height which is the same as the canvas height in pixels.
     *
     * @return The game height in pixels.
     */
    public getHeight(): number {
        return this.canvas.height;
    }

    public get input(): ControllerManager {
        return this.controllerManager;
    }

    /**
     * Updates the canvas size according to the window size.
     */
    private updateCanvasSize(): void {
        const { canvas, size } = this;
        const { innerWidth, innerHeight } = window;
        const style = this.canvas.style;

        if (size != null) {
            const width = canvas.width = size.getWidth();
            const height = canvas.height = size.getHeight();
            // Firefox reports a wrong inner height. So when it is one-off to outer height then we assume browser
            // is fullscreen and use the outer height as inner height
            const correctedInnerHeight = (Math.abs(innerHeight - outerHeight) === 1) ? outerHeight : innerHeight;
            const scale = Math.max(1, Math.floor(Math.min(innerWidth / width, correctedInnerHeight / height)));
            style.width = width * scale + "px";
            style.height = height * scale + "px";
        } else {
            const dpr = window.devicePixelRatio;
            canvas.width = innerWidth * dpr;
            canvas.height = innerHeight * dpr;
            style.width = style.height = "100%";
        }
    }

    /**
     * The game loop method which is executed for each frame. It updates the game and then renders it.
     */
    private gameLoop(currentUpdateTime: number): void {
        this.updateTimer(currentUpdateTime);
        const timer = this.timer;
        this.gameLoopId = requestAnimationFrame(this.gameLoopCallback);
        this.gamepad.update();
        this.scenes.update(timer);
        this.update(timer);

        const ctx = this.ctx;
        const width = this.getWidth();
        const height = this.getHeight();
        ctx.save();
        if (this.pixelated) {
            ctx.imageSmoothingEnabled = false;
        } else {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
        }
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        this.scenes.draw(ctx, width, height);
        this.draw(ctx, width, height);
        ctx.restore();
    }

    /**
     * Called within the game loop before rendering a frame and after updating the scene. Overwrite this method if
     * you want to implement some global update handlers.
     *
     * @param timer - The app/game timer.
     */
    protected update(timer: Timer): void {}

    /**
     * Called within the game loop after rendering the scene. Overwrite this method if you want to implement some
     * additional global drawing.
     *
     * @param ctx    - The rendering context
     * @param width  - The game width in pixels.
     * @param height - The game height in pixels.
     */
    protected draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {}

    /**
     * Starts the game if not already running.
     */
    public start(): this {
        if (this.gameLoopId == null) {
            this.gameLoop(performance.now());
        }
        return this;
    }

    /**
     * Stops the game if running.
     */
    public stop(): this {
        if (this.gameLoopId != null) {
            cancelAnimationFrame(this.gameLoopId);
            this.gameLoopId = null;
        }
        return this;
    }

    /**
     * Checks if game is running.
     *
     * @return True if game is running, false if not.
     */
    public isRunning(): boolean {
        return this.gameLoopId != null;
    }
}
