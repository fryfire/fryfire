/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../game/Game";
import { signal, Signal } from "../util/Signal";
import { AbstractPointerEvent } from "./AbstractPointerEvent";
import { PointerEndEvent } from "./PointerEndEvent";
import { PointerMoveEvent } from "./PointerMoveEvent";

export class PointerDownEvent<T extends Game = Game, A = void> extends AbstractPointerEvent<T, A> {
    @signal(PointerDownEvent.prototype.initOnPointerMove)
    public readonly onPointerMove!: Signal<PointerMoveEvent<T, A>>;

    @signal(PointerDownEvent.prototype.initOnPointerEnd)
    public readonly onPointerEnd!: Signal<PointerEndEvent<T, A>>;

    private initOnPointerMove(signal: Signal<PointerMoveEvent<T, A>>) {
        const listener = (event: PointerEvent) => {
            if (event.pointerId === this.getId()) {
                signal.emit(new PointerMoveEvent(this.game, this.scene, event));
            }
        };
        const canvas = this.game.getCanvas();
        const cleanup = () => {
            canvas.removeEventListener("pointermove", listener);
            this.onPointerEnd.disconnect(cleanup);
        };
        canvas.addEventListener("pointermove", listener);
        this.onPointerEnd.connect(cleanup);
        return cleanup;
    }

    private initOnPointerEnd(signal: Signal<PointerEndEvent<T, A>>) {
        const listener = (event: PointerEvent) => {
            if (event.pointerId === this.getId()) {
                signal.emit(new PointerEndEvent(this.game, this.scene, event));
                cleanup();
            }
        };
        const cleanup = () => {
            canvas.removeEventListener("pointercancel", listener);
            canvas.removeEventListener("pointerup", listener);
            this.onPointerMove.clear();
            this.onPointerEnd.clear();
            canvas.releasePointerCapture(this.getId());
        };
        const canvas = this.game.getCanvas();
        canvas.setPointerCapture(this.getId());
        canvas.addEventListener("pointerup", listener);
        canvas.addEventListener("pointercancel", listener);
        return cleanup;
    }

    public getButton(): number {
        return this.event.button;
    }
}
