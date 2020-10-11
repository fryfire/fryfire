/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { clamp } from "./util/math";

/**
 * Max time delta (in s). If game freezes for a few seconds for whatever reason, we don't want
 * updates to jump too much.
 */
const MAX_DT = 0.1;

/**
 * Timer passed to the update methods within the game. Contains the app time and the game time and the deltas between
 * current update and last update. The game time can be paused while the app time runs continuously. So you should use
 * the game time/delta to update game time and the app time/delta to update other stuff like the UI.
 */
export class Timer {
    private lastTime: number;
    private paused: boolean = false;
    private speed: number = 1;

    /** The time the application runs so far in seconds. */
    public appTime: number;

    /** Application time delta since last update. */
    public appDelta : number = 0;

    /** The time the game runs so far in seconds. Does not increase while game is paused. */
    public gameTime: number;

    /** Game time delta since last update. Will be 0 while game is paused. */
    public gameDelta: number = 0;

    public constructor() {
        this.appTime = this.gameTime = this.lastTime = performance.now() / 1000;
    }

    /**
     * Updates the timer.
     *
     * @param time - The current time in milliseconds.
     */
    public update(time: number): this {
        time = time / 1000;
        const delta = clamp(time - this.lastTime, 0, MAX_DT) * this.speed;
        this.lastTime = time;
        this.appDelta = delta;
        this.appTime += delta;
        if (this.paused) {
            this.gameDelta = 0;
        } else {
            this.gameDelta = delta;
            this.gameTime += delta;
        }
        return this;
    }

    /**
     * Pauses the game time. The app time is not affected by this.
     */
    public pause(): this {
        this.paused = true;
        return this;
    }

    /**
     * Resumes the game time.
     */
    public resume(): this {
        this.paused = false;
        return this;
    }

    /**
     * Checks if game time is paused.
     *
     * @return True if game time is paused, false if not.
     */
    public isPaused(): boolean {
        return this.paused;
    }

    /**
     * Returns the game speed factor. 1 is normal.
     *
     * @return The game speed factor.
     */
    public getSpeed(): number {
        return this.speed;
    }

    /**
     * Sets the game speed factor. 1 is normal.
     *
     * @parma speed - The game speed factor to set.
     */
    public setSpeed(speed: number): this {
        this.speed = speed;
        return this;
    }
}
