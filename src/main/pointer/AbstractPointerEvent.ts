/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../game/Game";
import { ReadonlyVector2, Vector2 } from "../graphics/Vector2";
import { Scene } from "../scene/Scene";

export abstract class AbstractPointerEvent<T extends Game = Game, A = void> {
    protected readonly position: ReadonlyVector2;
    protected readonly scenePosition: ReadonlyVector2;

    public constructor(
        protected readonly game: T,
        protected readonly scene: Scene<T, A> | null,
        protected readonly event: PointerEvent
    ) {
        const canvas = game.getCanvas();
        const scaleX = canvas.width / canvas.offsetWidth;
        const scaleY = canvas.height / canvas.offsetHeight;
        this.position = new Vector2(event.offsetX, event.offsetY).scale(scaleX, scaleY).floor();
        if (scene != null) {
            const cameraTransformation = scene.camera.getSceneTransformation();
            this.scenePosition = new Vector2(event.offsetX, event.offsetY).scale(scaleX, scaleY)
                .div(cameraTransformation).floor();
        } else {
            this.scenePosition = this.position;
        }
    }

    public getGame(): T {
        return this.game;
    }

    public getScene(): Scene<T, A> | null {
        return this.scene;
    }

    public getId(): number {
        return this.event.pointerId;
    }

    public getX(): number {
        return this.position.x;
    }

    public getY(): number {
        return this.position.y;
    }

    public getPosition(): ReadonlyVector2 {
        return this.position;
    }

    public getSceneX(): number {
        return this.scenePosition.x;
    }

    public getSceneY(): number {
        return this.scenePosition.y;
    }

    public getScenePosition(): ReadonlyVector2 {
        return this.scenePosition;
    }
}
