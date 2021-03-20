/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { GameControllerStyle } from "./GameControllerStyle";

/** Regular expressions to match the vendor ID in a gamepad ID. */
const vendorIdMatchers = [
    /\bvendor:?\s*([0-9a-f]{4})\b/i,
    /\b([0-9a-f]{4})[:-][0-9a-f]{4}\b/i
];
/** Regular expressions to match the product ID in a gamepad ID. */
const productIdMatchers = [
    /\bproduct:?\s*([0-9a-f]{4})\b/i,
    /\b[0-9a-f]{4}[:-]([0-9a-f]{4})\b/i
];

export class GameControllerModel {
    /**
     * @param style     - The game controller style or null if unknown.
     * @param vendorId  - The USB vendor ID of the game controller or null if unknown.
     * @param productId - The USB product ID of the game controller or null if unknown.
     */
    private constructor(
        private readonly style: GameControllerStyle | null,
        private readonly vendorId: number | null,
        private readonly productId: number | null
    ) {}

    /**
     * Creates a game controller model object from the given gamepad id.
     *
     * @param id - Gamepad identifier string as reported by the W3C Gamepad API.
     * @return The game controller model.
     */
    public static fromGamepadId(id: string): GameControllerModel {
        function findId(regexps: RegExp[], value: string): number | null {
            for (const regexp of regexps) {
                const match = regexp.exec(value);
                if (match != null) {
                    return parseInt(match[1], 16);
                }
            }
            return null;
        }
        const vendorId = findId(vendorIdMatchers, id);
        const productId = findId(productIdMatchers, id);
        const style = GameControllerStyle.fromVendorId(vendorId) ?? GameControllerStyle.fromGamepadId(id) ?? null;
        return new GameControllerModel(style, vendorId, productId);
    }

    /**
     * Returns the game controller style or null if unknown.
     *
     * @return The game controller style or null if unknown.
     */
    public getStyle(): GameControllerStyle | null{
        return this.style;
    }

    /**
     * Returns the vendor ID or null if unknown.
     *
     * @return The vendor ID or null if unknown.
     */
    public getVendorId(): number | null {
        return this.vendorId;
    }

    /**
     * Returns the product ID or null if unknown.
     *
     * @return The product ID or null if unknown.
     */
    public getProductId(): number | null {
        return this.productId;
    }
}
