/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { clamp } from "../util/math";

/**
 * Max time delta (in s). If game freezes for a few seconds for whatever reason, we don't want
 * updates to jump too much.
 */
const MAX_DT = 0.1;

/**
 * Function signature for updating the timer. This function is exposed to the game through the constructor so
 * the game can call it but no one else can by accident.
 */
export type UpdateTimer = (time: number) => void;

/**
 * Timer passed to the update methods within the game. Contains the app time and the game time and the deltas between
 * current update and last update. The game time can be paused while the app time runs continuously. So you should use
 * the game time/delta to update game time and the app time/delta to update other stuff like the UI.
 */
export class Timer {
    private lastTime: number;
    private paused: boolean = false;
    private speed: number = 1;

    /** The time the application runs so far in seconds. */
    private appTime: number;

    /** Application time delta since last update. */
    private appDelta : number = 0;

    /** The time the game runs so far in seconds. Does not increase while game is paused. */
    private gameTime: number;

    /** Game time delta since last update. Will be 0 while game is paused. */
    private gameDelta: number = 0;

    /**
     * Creates a new timer with app and game time initialized to current time as reported by the performance API.
     * You don't have to create an instance of this class yourself. It is managed by the game and passed to all
     * update methods of the game, scenes and scene nodes.
     *
     * @param expose - Callback for exposing the update method of the timer to the game so the game can
     *                 call it without making the method public.
     */
    public constructor(expose?: (update: UpdateTimer) => void) {
        this.appTime = this.gameTime = this.lastTime = performance.now() / 1000;
        if (expose != null) {
            expose(this.update.bind(this));
        }
    }

    /**
     * Returns the time the application runs so far in seconds. This time is not affected by game speed or pause/resume
     * and therefor ideal for updating the game UI for example.
     *
     * @return The application time in seconds.
     */
    public getAppTime(): number {
        return this.appTime;
    }

    /**
     * Returns the time the game runs so far in seconds. This time is affected by game speed and pause/resume
     * and therefor ideal for updating the game state.
     *
     * @return The game time in seconds.
     */
    public getGameTime(): number {
        return this.gameTime;
    }

    /**
     * Returns the application time delta since the last update. This time is not affected by game speed or pause/resume
     * and therefor ideal for updating the game UI for example.
     *
     * @return The application time delta since last update in seconds.
     */
    public getAppDelta(): number {
        return this.appDelta;
    }

    /**
     * Returns the game time delta since the last update. This time is affected by game speed and pause/resume
     * and therefor ideal for updating the game state.
     *
     * @return The game time delta in since last update in seconds.
     */
    public getGameDelta(): number {
        return this.gameDelta;
    }

    /**
     * Pauses the game time. The app time is not affected by this.
     */
    public pause(): this {
        this.paused = true;
        return this;
    }

    /**
     * Resumes the game time.
     */
    public resume(): this {
        this.paused = false;
        return this;
    }

    /**
     * Checks if game time is paused.
     *
     * @return True if game time is paused, false if not.
     */
    public isPaused(): boolean {
        return this.paused;
    }

    /**
     * Returns the game speed factor. 1 is normal.
     *
     * @return The game speed factor.
     */
    public getSpeed(): number {
        return this.speed;
    }

    /**
     * Sets the game speed factor. 1 is normal.
     *
     * @parma speed - The game speed factor to set.
     */
    public setSpeed(speed: number): this {
        this.speed = speed;
        return this;
    }
    /**
     * Updates the timer.
     *
     * @param time - The current time in milliseconds.
     */
    private update(time: number): void {
        time = time / 1000;
        const delta = clamp(time - this.lastTime, 0, MAX_DT) * this.speed;
        this.lastTime = time;
        this.appDelta = delta;
        this.appTime += delta;
        if (this.paused) {
            this.gameDelta = 0;
        } else {
            this.gameDelta = delta;
            this.gameTime += delta;
        }
    }
}
