/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Transition } from "../scene/Transition";

export class FadeTransition extends Transition {
    public draw(ctx: CanvasRenderingContext2D, draw: () => void): void {
        ctx.globalAlpha = 1 - this.valueOf();
        draw();
    }
}
