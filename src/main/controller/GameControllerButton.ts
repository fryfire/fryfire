/*
 * Copyright (C) 2021 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Signal } from "../util/Signal";
import { GameController } from "./GameController";

/**
 * A single button on a specific game controller.
 */
export class GameControllerButton {
    /**
     * Emitted when the button state has changed.
     *
     * @event
     */
    public readonly onChange = new Signal<this>();

    /**
     * Emitted when the button is pressed down.
     *
     * @event
     */
    public readonly onPress = new Signal<this>();

    /**
     * Emitted when the button has been released.
     *
     * @event
     */
    public readonly onRelease = new Signal<this>();

    /**
     * Emitted when the button is touched.
     *
     * @event
     */
    public readonly onTouchStart = new Signal<this>();

    /**
     * Emitted when the button is no longer touched.
     *
     * @event
     */
    public readonly onTouchEnd = new Signal<this>();

    private readonly controller: GameController;
    private readonly index: number;
    private pressed: boolean = false;
    private touched: boolean = false;
    private value: number = 0;

    public constructor(controller: GameController, buttonIndex: number) {
        this.controller = controller;
        this.index = buttonIndex;
    }

    public toString(): string {
        return `${this.controller} button ${this.index}`;
    }

    /**
     * Returns the controller this button belongs to.
     *
     * @return The controller.
     */
    public getController(): GameController {
        return this.controller;
    }

    /**
     * Returns the index of the button.
     *
     * @return The button index.
     */
    public getIndex(): number {
        return this.index;
    }

    /**
     * Checks if button is pressed.
     *
     * @return True if button is pressed, false if not.
     */
    public isPressed(): boolean {
        return this.pressed;
    }

    /**
     * Checks if button is touched.
     *
     * @return True if button is touched, false if not.
     */
    public isTouched(): boolean {
        return this.touched;
    }

    /**
     * Returns the current button value. For a digital button this is 0 for not pressed and 1 for pressed. For an
     * analog button this value can be anywhere between 0 and 1 depending how far down the button has been pressed.
     *
     * @return The current button value (0.0 - 1.0).
     */
    public getValue(): number {
        return this.value;
    }

    /**
     * Updates the state from the specified W3C gamepad button state.
     *
     * @param button - The current state of the W3c gamepad button.
     */
    public update(button: GamepadButton) {
        let changed = false;
        const pressed = button.pressed;
        if (pressed !== this.pressed) {
            this.pressed = pressed;
            console.log("press", this.index);
            if (pressed) {
                this.onPress.emit(this);
            } else {
                this.onRelease.emit(this);
            }
            changed = true;
        }

        const touched = button.touched;
        if (touched !== this.touched) {
            this.touched = touched;
            if (touched) {
                this.onTouchStart.emit(this);
            } else {
                this.onTouchEnd.emit(this);
            }
            changed = true;
        }

        const value = button.value;
        if (value !== this.value) {
            this.value = value;
            changed = true;
        }

        if (changed) {
            this.onChange.emit(this);
        }
    }
}
