/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../../game/Game";
import { ScenePointerEvent } from "./ScenePointerEvent";

export class ScenePointerMoveEvent<T extends Game = Game, A = void> extends ScenePointerEvent<T, A> {
}
