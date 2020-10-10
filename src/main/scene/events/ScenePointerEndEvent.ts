/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../../Game";
import { ScenePointerEvent } from "./ScenePointerEvent";

export class ScenePointerEndEvent<T extends Game = Game, A = void> extends ScenePointerEvent<T, A> {
}
