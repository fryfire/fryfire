/*
 * Copyright (C) 2021 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

/**
 * The standard gamepad buttons. Only applies to controllers which are recognized as standard gamepad controllers.
 * This enum contains generic enum names and some common aliases for Xbox and Playstation gamepads.
 *
 * See https://w3c.github.io/gamepad/#dfn-standard-gamepad-layout
 */
export enum GamepadButton {
    // --- Right cluster buttons --------------------------------------------------------------------------------------

    /** Bottom button in right cluster */
    BOTTOM_RIGHT = 0,

    /** Right button in right cluster */
    RIGHT_RIGHT = 1,

    /** Left button in right cluster */
    LEFT_RIGHT = 2,

    /** Top button in right cluster */
    TOP_RIGHT = 3,


    // --- Front buttons ----------------------------------------------------------------------------------------------

    /** Top left front button */
    TOP_LEFT_FRONT = 4,

    /** Top right front button */
    TOP_RIGHT_FRONT = 5,

    /**  Bottom left front button */
    BOTTOM_LEFT_FRONT = 6,

    /** Bottom right front button */
    BOTTOM_RIGHT_FRONT = 7,


    // --- Center cluster buttons -------------------------------------------------------------------------------------

    /** Left button in center cluster */

    LEFT_CENTER = 8,
    /** Right button in center cluster */
    RIGHT_CENTER = 9,

    /** Center button in center cluster */
    CENTER_CENTER = 16,

    // --- Stick buttons ----------------------------------------------------------------------------------------------

    /** Left stick pressed button */
    LEFT_STICK = 10,

    /** Right stick pressed button */
    RIGHT_STICK = 11,


    // --- Left cluster buttons ---------------------------------------------------------------------------------------

    /** Top button in left cluster */
    TOP_LEFT = 12,

    /** Bottom button in left cluster */
    BOTTOM_LEFT = 13,

    /** Left button in left cluster */
    LEFT_LEFT = 14,

    /** Right button in left cluster */
    RIGHT_LEFT = 15,


    // --- Xbox aliases -----------------------------------------------------------------------------------------------

    /** Xbox-specific alias for [[BOTTOM_RIGHT]] */
    A = GamepadButton.BOTTOM_RIGHT,

    /** Xbox-specific alias for [[RIGHT_RIGHT]] */
    B = GamepadButton.RIGHT_RIGHT,

    /** Xbox-specific alias for [[LEFT_RIGHT]] */
    X = GamepadButton.LEFT_RIGHT,

    /** Xbox-specific alias for [[TOP_RIGHT]] */
    Y = GamepadButton.TOP_RIGHT,

    /** Xbox-specific alias for [[TOP_LEFT_FRONT]] */
    LB = GamepadButton.TOP_LEFT_FRONT,

    /** Xbox-specific alias for [[BOTTOM_LEFT_FRONT]] */
    LT = GamepadButton.BOTTOM_LEFT_FRONT,

    /** Xbox-specific alias for [[TOP_RIGHT_FRONT]] */
    RB = GamepadButton.TOP_RIGHT_FRONT,

    /** Xbox-specific alias for [[BOTTOM_RIGHT_FRONT]] */
    RT = GamepadButton.BOTTOM_RIGHT_FRONT,

    /** Xbox-specific alias for [[LEFT_CENTER]] */
    BACK = GamepadButton.LEFT_CENTER,


    // --- Playstation aliases ----------------------------------------------------------------------------------------

    /** Playstation-specific alias for [[BOTTOM_RIGHT]] */
    CROSS = GamepadButton.BOTTOM_RIGHT,

    /** Playstation-specific alias for [[RIGHT_RIGHT]] */
    CIRCLE = GamepadButton.RIGHT_RIGHT,

    /** Playstation-specific alias for [[LEFT_RIGHT]] */
    SQUARE = GamepadButton.LEFT_RIGHT,

    /** Playstation-specific alias for [[TOP_RIGHT]] */
    TRIANGLE = GamepadButton.TOP_RIGHT,

    /** Playstation-specific alias for [[LEFT_CENTER]] */
    SELECT = GamepadButton.LEFT_CENTER,


    // --- Common aliases (Shared by multiple controller styles -------------------------------------------------------

    /** Common alias for [[TOP_LEFT]] */
    D_PAD_UP = GamepadButton.TOP_LEFT,

    /** Common alias for [[BOTTOM_LEFT]] */
    D_PAD_DOWN = GamepadButton.BOTTOM_LEFT,

    /** Common alias for [[LET_LEFT]] */
    D_PAD_LEFT = GamepadButton.LEFT_LEFT,

    /** Common alias for [[RIGHT_LEFT]] */
    D_PAD_RIGHT = GamepadButton.RIGHT_LEFT,

    /** Common alias for [[RIGHT_CENTER]] */
    START = GamepadButton.RIGHT_CENTER,

    /** Common alias for [[CENTER_CENTER]] */
    VENDOR = GamepadButton.CENTER_CENTER
}
