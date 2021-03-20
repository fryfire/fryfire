import { Game, Size, sleep, Timer } from "../../main/fryfire";

async function resizeWindowBy(x: number, y: number): Promise<void> {
    return new Promise<void>(resolve => {
        const onResize = () => {
            window.removeEventListener("resize", onResize);
            resolve();
        };
        window.addEventListener("resize", onResize);
        window.resizeBy(x, y);
    });
}

describe("Game", () => {
    it("correctly runs game loop", async () => {
        const onDraw = jest.fn();
        const onUpdate = jest.fn();
        class MyGame extends Game {
            protected update(timer: Timer): void {
                super.update(timer);
                onUpdate();
            }
            protected draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
                super.draw(ctx, width, height);
                onDraw();
            }
        }
        const game = new MyGame();
        await sleep(100);
        expect(onDraw).not.toHaveBeenCalled();
        expect(onUpdate).not.toHaveBeenCalled();
        expect(game.isRunning()).toBe(false);
        game.start();
        expect(game.isRunning()).toBe(true);
        await sleep(100);
        expect(onDraw).toHaveBeenCalled();
        expect(onUpdate).toHaveBeenCalled();
        game.stop();
        expect(game.isRunning()).toBe(false);
        onDraw.mockClear();
        onUpdate.mockClear();
        await sleep(100);
        expect(onDraw).not.toHaveBeenCalled();
        expect(onUpdate).not.toHaveBeenCalled();
    });

    describe("start", () => {
        it("does nothing when game is already running", () => {
            class MyGame extends Game {}
            const game = new MyGame();
            game.start();
            expect(game.isRunning()).toBe(true);
            game.start();
            expect(game.isRunning()).toBe(true);
            game.stop();
            expect(game.isRunning()).toBe(false);
        });
    });

    describe("stop", () => {
        it("does nothing when game is not running", () => {
            class MyGame extends Game {}
            const game = new MyGame();
            game.stop();
            expect(game.isRunning()).toBe(false);
        });
    });

    describe("update", () => {
        it("is called with correct timer reference and is updated correctly", () => {
            let call = 0;
            return new Promise<void>((resolve, reject) => {
                class MyGame extends Game {
                    protected update(timer: Timer): void {
                        try {
                            call++;
                            expect(timer).toBe(this.getTimer());
                            expect(timer.getAppTime()).toBeGreaterThan(timer.getAppDelta());
                            expect(timer.getGameTime()).toBeGreaterThan(timer.getGameDelta());
                            if (call === 2) {
                                this.stop();
                                resolve();
                            }
                        } catch (e) {
                            reject(e);
                        }
                    }
                }
                new MyGame().start();
            });
        });
    });

    describe("draw", () => {
        it("is called with image smoothing disabled for pixelated game", () => {
            return new Promise<void>(resolve => {
                class MyGame extends Game {
                    protected draw(ctx: CanvasRenderingContext2D): void {
                        this.stop();
                        expect(ctx.imageSmoothingEnabled).toBe(false);
                        resolve();
                    }
                }
                new MyGame({ pixelated: true }).start();
            });
        });
        it("is called with image smoothing enabled for non-pixelated game", () => {
            return new Promise<void>(resolve => {
                class MyGame extends Game {
                    protected draw(ctx: CanvasRenderingContext2D): void {
                        this.stop();
                        expect(ctx.imageSmoothingEnabled).toBe(true);
                        expect(ctx.imageSmoothingQuality).toBe("high");
                        resolve();
                    }
                }
                new MyGame({ pixelated: false }).start();
            });
        });
        it("is called with physical screen size when not size is specified", () => {
            return new Promise<void>(resolve => {
                class MyGame extends Game {
                    protected draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
                        this.stop();
                        expect(ctx.canvas.width).toBe(800);
                        expect(ctx.canvas.height).toBe(575);
                        expect(width).toBe(800);
                        expect(height).toBe(575);
                        expect(ctx.canvas.offsetWidth).toBe(800);
                        expect(ctx.canvas.offsetHeight).toBe(575);
                        resolve();
                    }
                }
                new MyGame({ }).start();
            });
        });
        it("is called with specified custom game size", () => {
            return new Promise<void>(resolve => {
                class MyGame extends Game {
                    protected draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
                        this.stop();
                        expect(ctx.canvas.width).toBe(300);
                        expect(ctx.canvas.height).toBe(200);
                        expect(width).toBe(300);
                        expect(height).toBe(200);
                        expect(ctx.canvas.offsetWidth).toBe(600);
                        expect(ctx.canvas.offsetHeight).toBe(400);
                        resolve();
                    }
                }
                new MyGame({ size: new Size(300, 200) }).start();
            });
        });
    });

    describe("getCanvas", () => {
        it("returns the HTML Canvas element of the game", async () => {
            const { game, expected } = await new Promise(resolve => {
                class MyGame extends Game {
                    protected draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
                        this.stop();
                        resolve({ game: this, expected: ctx.canvas });
                    }
                }
                new MyGame().start();
            });
            expect(game.getCanvas()).toBe(expected);
        });
    });

    describe("getWidth", () => {
        it("returns physical screen width when game runs full-screen", () => {
            const game = new class MyGame extends Game {}();
            expect(game.getWidth()).toBe(800);
        });
        it("returns updated physical screen height when game runs full-screen and screen size changes", async () => {
            const game = new class MyGame extends Game {}();
            expect(game.getWidth()).toBe(800);
            await resizeWindowBy(-100, 0);
            expect(game.getWidth()).toBe(700);
            await resizeWindowBy(100, 0);
        });
        it("returns custom width when game runs with custom size", () => {
            const game = new class MyGame extends Game {}({ size: new Size(300, 200) });
            expect(game.getWidth()).toBe(300);
        });
    });

    describe("getHeight", () => {
        it("returns physical screen height when game runs full-screen", () => {
            const game = new class MyGame extends Game {}();
            expect(game.getHeight()).toBe(575);
        });
        it("returns updated physical screen height when game runs full-screen and screen size changes", async () => {
            const game = new class MyGame extends Game {}();
            expect(game.getHeight()).toBe(575);
            await resizeWindowBy(0, 100);
            expect(game.getHeight()).toBe(675);
            await resizeWindowBy(0, -100);
        });
        it("returns custom height when game runs with custom size", () => {
            const game = new class MyGame extends Game {}({ size: new Size(300, 200) });
            expect(game.getHeight()).toBe(200);
        });
    });
});
