/*
 * Copyright (C) 2021 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { IndexOutOfBoundsException } from "../util/exception";
import { GameControllerAxis } from "./GameControllerAxis";
import { GameControllerButton } from "./GameControllerButton";
import { GameControllerModel } from "./GameControllerModel";

/**
 * A single detected game controller.
 */
export class GameController {
    /**
     * The W3C gamepad reference. This is an immutable state snapshot so the reference is replaced on each
     * controller update
     */
    private gamepad: Gamepad;

    /** The game controller buttons. */
    private readonly buttons: readonly GameControllerButton[];

    /** The game controller axes. */
    private readonly axes: readonly GameControllerAxis[];

    /** The game controller model. */
    private readonly model: GameControllerModel;

    /**
     * Creates a new game controller instance with the specified initial W3C gamepad state.
     */
    public constructor(gamepad: Gamepad) {
        this.gamepad = gamepad;
        this.buttons = gamepad.buttons.map((_, index) => new GameControllerButton(this, index));
        this.axes = gamepad.axes.map((_, index) => new GameControllerAxis(this, index));
        this.model = GameControllerModel.fromGamepadId(gamepad.id);
    }

    public toString(): string {
        return this.gamepad.id;
    }

    /**
     * Returns the unique game controller ID.
     *
     * @return The unique game controller ID.
     */
    public getId(): string {
        return this.gamepad.id;
    }

    /**
     * Returns the unique game controller index.
     *
     * @return The unique game controller index.
     */
    public getIndex(): number {
        return this.gamepad.index;
    }

    /**
     * Returns the game controller buttons.
     *
     * @return The game controller buttons.
     */
    public getButtons(): readonly GameControllerButton[] {
        return this.buttons;
    }

    /**
     * Returns the button with the given index. For a standard gamepad controller the index can be specified as
     * a [[GamepadButton]] enum.
     *
     * @param index - The button index.
     * @return The controller button.
     */
    public getButton(index: number): GameControllerButton {
        const button = this.buttons[index];
        if (button == null) {
            throw new IndexOutOfBoundsException(`Controller has no button with index ${index}`);
        }
        return button;
    }

    /**
     * Returns the game controller axes.
     *
     * @return The game controller axes.
     */
    public getAxes(): readonly GameControllerAxis[] {
        return this.axes;
    }

    /**
     * Returns the axis with the given index. For a standard gamepad controller the index can be specified as
     * a [[GamepadAxis]] enum.
     *
     * @param index - The button index.
     * @return The controller button.
     */
    public getAxis(index: number): GameControllerAxis {
        const axis = this.axes[index];
        if (axis == null) {
            throw new IndexOutOfBoundsException(`Controller has no axis with index ${index}`);
        }
        return axis;
    }

    /**
     * Returns the game controller model.
     *
     * @return The game controller model.
     */
    public getModel(): GameControllerModel {
        return this.model;
    }

    /**
     * Returns the game controller layout mapping type. An empty string is returned when the layout is not re-mapped.
     * Returns `standard` when re-mapped to standard gamepad layout.
     *
     * @return The layout to which the game controller was re-mapped. Empty if not remapped
     */
    public getMappingType(): GamepadMappingType {
        return this.gamepad.mapping;
    }

    /**
     * Checks if this game controller is a standard game pad.
     *
     * @param True if standard game pad, false if not.
     */
    public isStandardGamepad(): boolean {
        return this.gamepad.mapping === "standard";
    }

    /**
     * Returns the timestamp representing the last time the data for this game controller was updated.
     *
     * @return The last update timestamp.
     */
    public getLastUpdated(): number {
        return this.gamepad.timestamp;
    }

    /**
     * Updates the game controller with the given W3C gamepad state.
     *
     * @param gamepad - The current W3C gamepad state of this game controller.
     */
    public update(gamepad: Gamepad): void {
        this.gamepad = gamepad;
        const buttons = gamepad.buttons;
        for (const button of this.buttons) {
            button.update(buttons[button.getIndex()]);
        }
        const axes = gamepad.axes;
        for (const axis of this.axes) {
            axis.update(axes[axis.getIndex()]);
        }
    }
}
