/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

/**
 * Enumeration of the different game controller styles.
 *
 * Mainly used to adjust button mappings to offer the best possible *expected* gaming
 * experience and to make sure that graphics are displayed in-game that match the
 * controller being used.
 */
export enum GameControllerStyle {
    XBOX = "xbox",
    PLAYSTATION = "playstation",
    STADIA = "stadia"
}

export namespace GameControllerStyle {
    /**
     * Returns the game controller style for the given vendor ID.
     *
     * @param vendorId - The vendor ID. Null if unknown.
     * @return The game controller style. Null if unknown.
     */
    export function fromVendorId(vendorId: number | null): GameControllerStyle | null {
        switch (vendorId) {
            case 0x045e:
                return GameControllerStyle.XBOX;

            case 0x054c:
                return GameControllerStyle.PLAYSTATION;

            default:
                return null;
        }
    }

    /**
     * Returns the game controller style for the given gamepad ID.
     *
     * @param id - The gamepad ID.
     * @return The game controller style. Null if unknown.
     */
    export function fromGamepadId(id: string): GameControllerStyle | null {
        if (id.match(/\bxinput\b/i)) {
            return GameControllerStyle.XBOX;
        } else if (id.match(/\bstadia controller\b/i)) {
            return GameControllerStyle.STADIA;
        } else if (id.match(/\bplaystation\b/i)) {
            return GameControllerStyle.PLAYSTATION;
        } else {
            return null;
        }
    }
}
