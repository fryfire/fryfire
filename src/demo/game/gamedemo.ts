/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "fryfire/game/Game";
import { Size } from "fryfire/geom/Size";
import { translateToHalfPixel } from "fryfire/graphics/canvas";
import { Timer } from "fryfire/game/Timer";
import { expose, isDev } from "fryfire/util/env";

/**
 * This demo shows how to use Fryfire without any scenes by simply overwriting the update/draw methods of the game
 * class itself.
 */
class DemoGame extends Game {
    private rotation = Math.PI;

    protected update(timer: Timer): void {
        // Increase rotation 0.5 RAD per second
        this.rotation += 0.5 * timer.getGameDelta();
    }

    protected draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.save();

        // Translate to center of game canvas. By default the origin is the upper left corner
        ctx.translate(width / 2, height / 2);

        // Let the rectangle rotate around the screen
        ctx.translate(Math.sin(this.rotation) * (width - 100) / 3, Math.cos(this.rotation) * (height - 100) / 3);

        // In this demo we draw lines (Stroked rectangle) with line width of 1 pixel. To enforce that it is really
        // rendered as 1 pixel we must translate the coordinate system to a half-pixel. This improves
        // pixel-correctness by sacrificing smooth movement.
        translateToHalfPixel(ctx);

        // Render the rectangle
        ctx.beginPath();
        ctx.rect(-50, -50, 100, 100);
        ctx.fillStyle = isDev() ? "red" : "#222";
        ctx.strokeStyle = "#fff";
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        ctx.save();
        ctx.strokeStyle = "white";
        translateToHalfPixel(ctx);
        ctx.strokeRect(0, 0, width - 1, height - 1);
        ctx.restore();
    }
}

// Instantiate and start the game
const game = new DemoGame({ size: new Size(384, 216) }).start();
expose("game", game);
game.onPointerDown.connect(e => {
    e.onPointerMove.connect(e => {
        console.log(e.getX(), e.getY());
    });
});
