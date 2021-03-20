/*
 * Copyright (C) 2021 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

/**
 * The standard gamepad axes. Only applies to controllers which are recognized as standard gamepad controllers.
 *
 * See https://w3c.github.io/gamepad/#dfn-standard-gamepad-layout
 */
export enum GamepadAxis {
    /**  Horizontal axis for left stick (negative left/positive right) */
    LEFT_X = 0,

    /** Vertical axis for left stick (negative up/positive down) */
    LEFT_Y = 1,

    /** Horizontal axis for right stick (negative left/positive right) */
    RIGHT_X = 2,

    /** Vertical axis for right stick (negative up/positive down) */
    RIGHT_Y = 3
}
