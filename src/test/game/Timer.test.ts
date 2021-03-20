import { Timer, UpdateTimer } from "../../main/fryfire";

describe("Timer", () => {
    describe("update", () => {
        it("updates the timer with the given delta", () => {
            let update: UpdateTimer = () => {};
            const timer = new Timer(timerUpdate => { update = timerUpdate; });
            const startAppTime = timer.getAppTime();
            const startGameTime = timer.getGameTime();
            update(startAppTime * 1000 + 53);
            expect(timer.getAppDelta()).toBeCloseTo(53 / 1000, 5);
            expect(timer.getGameDelta()).toBeCloseTo(53 / 1000, 5);
            expect(timer.getAppTime()).toBeCloseTo(startAppTime + 53 / 1000, 5);
            expect(timer.getGameTime()).toBeCloseTo(startGameTime + 53 / 1000, 5);
        });
        it("clamps time delta to 0 when called with a time from the past", () => {
            let update: UpdateTimer = () => {};
            const timer = new Timer(timerUpdate => { update = timerUpdate; });
            const startAppTime = timer.getAppTime();
            const startGameTime = timer.getGameTime();
            update(startAppTime * 1000 - 53);
            expect(timer.getAppDelta()).toBe(0);
            expect(timer.getGameDelta()).toBe(0);
            expect(timer.getAppTime()).toBe(startAppTime);
            expect(timer.getGameTime()).toBe(startGameTime);
        });
        it("clamps time delta to MAX_DT when called with a time to far in the future", () => {
            let update: UpdateTimer = () => {};
            const timer = new Timer(timerUpdate => { update = timerUpdate; });
            const startAppTime = timer.getAppTime();
            const startGameTime = timer.getGameTime();
            update(startAppTime * 1000 + 123456);
            expect(timer.getAppDelta()).toBeCloseTo(100 / 1000, 5);
            expect(timer.getGameDelta()).toBeCloseTo(100 / 1000, 5);
            expect(timer.getAppTime()).toBeCloseTo(startAppTime + 100 / 1000, 5);
            expect(timer.getGameTime()).toBeCloseTo(startGameTime + 100 / 1000, 5);
        });
        it("does only advance app time (not game time) when paused", () => {
            let update: UpdateTimer = () => {};
            const timer = new Timer(timerUpdate => { update = timerUpdate; });
            timer.pause();
            const startAppTime = timer.getAppTime();
            const startGameTime = timer.getGameTime();
            update(startAppTime * 1000 + 53);
            expect(timer.getAppDelta()).toBeCloseTo(53 / 1000, 5);
            expect(timer.getGameDelta()).toBe(0);
            expect(timer.getAppTime()).toBeCloseTo(startAppTime + 53 / 1000, 5);
            expect(timer.getGameTime()).toBe(startGameTime);
        });
        it("does advance game time faster than app time according to specified speed", () => {
            let update: UpdateTimer = () => {};
            const timer = new Timer(timerUpdate => { update = timerUpdate; });
            timer.setSpeed(2);
            const startAppTime = timer.getAppTime();
            const startGameTime = timer.getGameTime();
            update(startAppTime * 1000 + 53);
            expect(timer.getAppDelta()).toBeCloseTo(53 / 1000, 5);
            expect(timer.getGameDelta()).toBeCloseTo(53 / 1000 * 2, 5);
            expect(timer.getAppTime()).toBeCloseTo(startAppTime + 53 / 1000, 5);
            expect(timer.getGameTime()).toBeCloseTo(startGameTime + 53 / 1000 * 2, 5);
        });
    });

    describe("getSpeed", () => {
        it("returns the current game speed", () => {
            const timer = new Timer();
            expect(timer.getSpeed()).toBe(1);
            timer.setSpeed(2);
            expect(timer.getSpeed()).toBe(2);
            timer.setSpeed(0.5);
            expect(timer.getSpeed()).toBe(0.5);
        });
    });

    describe("isPaused", () => {
        it("checks if game is paused", () => {
            const timer = new Timer();
            expect(timer.isPaused()).toBe(false);
            timer.pause();
            expect(timer.isPaused()).toBe(true);
            timer.resume();
            expect(timer.isPaused()).toBe(false);
        });
    });
});
