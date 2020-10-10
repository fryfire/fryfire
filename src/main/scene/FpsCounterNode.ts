/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../Game";
import { Timer } from "../Timer";
import { TextNode } from "./TextNode";

export class FpsCounterNode<T extends Game> extends TextNode<T> {
    private frameCounter = 0;
    private lastUpdate = 0;

    public update(timer: Timer) {
        super.update(timer);
        if (this.lastUpdate + 1 < timer.appTime) {
            this.setText(`${this.frameCounter} FPS`);
            this.lastUpdate = timer.appTime;
            this.frameCounter = 0;
        }
        this.frameCounter++;
    }
}
