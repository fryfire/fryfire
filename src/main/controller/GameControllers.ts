/*
 * Copyright (C) 2021 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { expose } from "../util/env";
import { Signal } from "../util/Signal";
import { GameController } from "./GameController";

/**
 * Internal list of game controllers. The index follows the indexing of the W3C gamepad API so entries may be empty
 * when controller was disconnected.
 */
const gameControllers: Array<GameController | null> = [];

/**
 * Emitted when a game controller is connected.
 *
 * @event
 */
export const onGameControllerConnect = new Signal<GameController>();

/**
 * Emitted when a game controller is disconnected.
 *
 * @event
 */
export const onGameControllerDisconnect = new Signal<GameController>();

/**
 * Updates the game controller states. Call this regularly to detect game controller connects/disconnects and state
 * changes. When using the [[Game]] class then this function is already called inside the game loop.
 */
export function updateGameControllers() {
    const gamepads = navigator.getGamepads();
    for (let index = 0, max = Math.max(gameControllers.length, gamepads.length); index < max; ++index) {
        const gamepad = gamepads[index];
        const controller = gameControllers[index];
        if (gamepad != null) {
            if (controller == null) {
                const controller = new GameController(gamepad);
                gameControllers[index] = controller;
                onGameControllerConnect.emit(controller);
            } else {
                controller.update(gamepad);
            }
        } else if (controller != null) {
            gameControllers[index] = null;
            onGameControllerDisconnect.emit(controller);
        }
    }
}
expose("updateGameControllers", updateGameControllers);

/**
 * Returns all connected game controllers.
 *
 * @return The connected game controllers.
 */
export function getGameControllers() {
    return gameControllers.filter(controller => controller != null);
}
expose("getGameControllers", getGameControllers);
