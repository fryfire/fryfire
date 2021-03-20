/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../game/Game";
import { Timer } from "../game/Timer";
import { TextNode } from "./TextNode";

export class FpsCounterNode<T extends Game> extends TextNode<T> {
    private frameCounter = 0;
    private lastUpdate = 0;

    public update(timer: Timer) {
        super.update(timer);
        if (this.lastUpdate + 1 < timer.getAppTime()) {
            this.setText(`${this.frameCounter} FPS`);
            this.lastUpdate = timer.getAppTime();
            this.frameCounter = 0;
        }
        this.frameCounter++;
    }
}
