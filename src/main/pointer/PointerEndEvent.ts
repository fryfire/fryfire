/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { Game } from "../game/Game";
import { AbstractPointerEvent } from "./AbstractPointerEvent";

export class PointerEndEvent<T extends Game = Game, A = void> extends AbstractPointerEvent<T, A> {}
