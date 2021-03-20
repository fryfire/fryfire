/*
 * Copyright (C) 2021 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Signal } from "../util/Signal";
import { GameController } from "./GameController";

/**
 * A single axis on a specific game controller.
 */
export class GameControllerAxis {
    /**
     * Emitted when the axis state has changed.
     *
     * @event
     */
    public readonly onChange = new Signal<this>();

    private readonly controller: GameController;
    private readonly index: number;
    private value: number = 0;

    public constructor(controller: GameController, axisIndex: number) {
        this.controller = controller;
        this.index = axisIndex;
    }

    public toString(): string {
        return `${this.controller} axis ${this.index}`;
    }

    /**
     * Returns the controller this axis belongs to.
     *
     * @return The controller.
     */
    public getController(): GameController {
        return this.controller;
    }

    /**
     * Returns the index of the axis.
     *
     * @return The axis index.
     */
    public getIndex(): number {
        return this.index;
    }

     /**
     * Returns the current axis value.
     *
     * @return The current axis value (Range from -1.0 to 1.0).
     */
    public getValue(): number {
        return this.value;
    }

    /**
     * Updates the state from the specified W3C gamepad axis value.
     *
     * @param value - The current value of the W3C gamepad axis.
     */
    public update(value: number) {
        if (value !== this.value) {
            this.value = value;
            this.onChange.emit(this);
        }
    }
}
