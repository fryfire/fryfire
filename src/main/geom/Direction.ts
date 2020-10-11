/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { expose } from "../util/env";
import { IllegalArgumentException } from "../util/exception";
import { toLowerDashCase, toUpperSnakeCase } from "../util/string";

export enum Direction {
    CENTER = 0,
    TOP = 1,
    RIGHT = 2,
    BOTTOM = 4,
    LEFT = 8,
    TOP_RIGHT = TOP | RIGHT,
    BOTTOM_RIGHT = BOTTOM | RIGHT,
    BOTTOM_LEFT = BOTTOM | LEFT,
    TOP_LEFT = TOP | LEFT
}

export namespace Direction {
    /**
     * Serializes the given direction to a string.
     *
     * @param direction - The direction to serialize.
     * @return The serialized direction.
     */
    export function toJSON(direction: Direction): string {
        return toLowerDashCase(Direction[direction]);
    }

    /**
     * Deserializes a direction string into a direction.
     *
     * @param json - The serialized direction.
     * @return The deserialized direction.
     */
    export function fromJSON(json: string): Direction {
        const direction = Direction[toUpperSnakeCase(json) as keyof typeof Direction] as Direction;
        if (direction == null) {
            throw new IllegalArgumentException("Invalid direction JSON: " + json);
        }
        return direction;
    }

    /**
     * Checks if direction is a corner (top-right, top-left, bottom-right or bottom-left).
     *
     * @param direction - The direction to check.
     * @return True if direction is a corner, false if not.
     */
    export function isCorner(direction: Direction): boolean {
        return direction === Direction.TOP_RIGHT
            || direction === Direction.BOTTOM_RIGHT
            || direction === Direction.BOTTOM_LEFT
            || direction === Direction.TOP_LEFT;
    }

    /**
     * Checks if direction is an edge (top, bottom, left or right).
     *
     * @param direction - The direction to check.
     * @return True if direction is an edge, false if not.
     */
    export function isEdge(direction: Direction): boolean {
        return direction === Direction.TOP
            || direction === Direction.RIGHT
            || direction === Direction.BOTTOM
            || direction === Direction.LEFT;
    }

    /**
     * Checks if direction is left, top-left or bottom-left.
     *
     * @return True if direction is left, top-left or bottom-left. False if not.
     */
    export function isLeft(direction: Direction): boolean {
        return (direction & Direction.LEFT) !== 0;
    }

    /**
     * Checks if direction is right, top-right or bottom-right.
     *
     * @return True if direction is right, top-right or bottom-right. False if not.
     */
    export function isRight(direction: Direction): boolean {
        return (direction & Direction.RIGHT) !== 0;
    }

    /**
     * Checks if direction is top, top-right or top-left.
     *
     * @return True if direction is top, top-right or top-left. False if not.
     */
    export function isTop(direction: Direction): boolean {
        return (direction & Direction.TOP) !== 0;
    }

    /**
     * Checks if direction is bottom, bottom-right or bottom-left.
     *
     * @return True if direction is bottom, bottom-right or bottom-left. False if not.
     */
    export function isBottom(direction: Direction): boolean {
        return (direction & Direction.BOTTOM) !== 0;
    }

    /**
     * Converts direction into an angle starting at top and going in 45 degrees step in clock-wise direction.
     *
     * @param direction - The direction.
     * @param unit      - Optional unit to multiply the direction with. Defaults to 1, so 1 means 45 degrees, 2
     *                    means 90 degrees and so on. Specify 45 to get a real angle in degrees, specify Math.PI / 4
     *                    to get a real angle in radians.
     * @return The direction angle.
     */
    export function toAngle(direction: Direction, unit: number = 1): number {
        switch (direction) {
            case Direction.TOP:
                return 0;
            case Direction.TOP_RIGHT:
                return 1 * unit;
            case Direction.RIGHT:
                return 2 * unit;
            case Direction.BOTTOM_RIGHT:
                return 3 * unit;
            case Direction.BOTTOM:
                return 4 * unit;
            case Direction.BOTTOM_LEFT:
                return 5 * unit;
            case Direction.LEFT:
                return 6 * unit;
            case Direction.TOP_LEFT:
                return 7 * unit;
            default:
                throw new IllegalArgumentException("Direction has no angle: " + (Direction[direction] ?? direction));
        }
    }

    /**
     * Converts angle into direction.
     *
     * @param angle - The angle
     * @param unit  - Optional unit of the angle. Defaults to 1, so 1 means 45 degrees, 2
     *                means 90 degrees and so on. Specify 45 if angle is a real angle in degrees, specify Math.PI / 4
     *                if it is a real angle in radians.
     * @return The angle direction.
     */
    export function fromAngle(angle: number, unit: number = 1): Direction {
        switch (((Math.round(angle / unit) % 8) + 8) % 8) {
            case 1:
                return Direction.TOP_RIGHT;
            case 2:
                return Direction.RIGHT;
            case 3:
                return Direction.BOTTOM_RIGHT;
            case 4:
                return Direction.BOTTOM;
            case 5:
                return Direction.BOTTOM_LEFT;
            case 6:
                return Direction.LEFT;
            case 7:
                return Direction.TOP_LEFT;
            default:
                return Direction.TOP;
        }
    }

    /**
     * Returns the horizontal direction factor (-1 is left, 1 is right, 0 is center).
     *
     * @return The horizontal direction factor.
     */
    export function getX(direction: Direction): number {
        return isLeft(direction) ? -1 : isRight(direction) ? 1 : 0;
    }

    /**
     * Returns the vertical direction factor (-1 is top, 1 is bottom, 0 is center).
     *
     * @return The vertical direction factor.
     */
    export function getY(direction: Direction): number {
        return isTop(direction) ? -1 : isBottom(direction) ? 1 : 0;
    }
}

expose("fryfire.Direction", Direction);
