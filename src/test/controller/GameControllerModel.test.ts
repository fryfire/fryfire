import { GameControllerModel } from "../../main/controller/GameControllerModel";
import { GameControllerStyle } from "../../main/controller/GameControllerStyle";

const xboxModels = [
    "Xbox 360 Controller (XInput STANDARD GAMEPAD)",
    "xinput",
    "Xbox One Controller (STANDARD GAMEPAD Vendor: 045e Product: 02ea)",
    "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02fd)",
    "Xbox 360 Controller (STANDARD GAMEPAD Vendor: 045e Product: 028e)",
    "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02e0)",
    "Microsoft Controller (STANDARD GAMEPAD Vendor: 045e Product: 02ea)"
];

const psModels = [
    "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 09cc)",
    "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)",
    "054c-09cc-Wireless Controller",
    "054c-05c4-Wireless Controller",
    "PLAYSTATION(R)3 Controller (Vendor: 054c Product: 0268)",
    "PS3 GamePad (Vendor: 054c Product: 0268)",
    "Sony PLAYSTATION(R)3 Controller (STANDARD GAMEPAD Vendor: 054c Product: 0268)",
    "PLAYSTATION(R)3 Controller (STANDARD GAMEPAD Vendor: 054c Product: 0268)"
];

const stadiaModels = [
    "Stadia Controller (STANDARD GAMEPAD Vendor: 18d1 Product: 9400)",
    "Google Inc. Stadia Controller (STANDARD GAMEPAD Vendor: 18d1 Product: 9400)"
];

/* spell-checker: disable */
const unknownModels = [
    "Hockus Pockus Wibbly Wobbly JoySt1ck",
    "Flibber Flubber Thingy",
    "Microz0ft YBox Controlla"
];
/* spell-checker: enable */

describe("GameControllerModel", () => {
    describe("fromGamepadId", () => {
        describe("detects Xbox controllers", () => {
            xboxModels.forEach((str) => {
                it(`given the string "${str}"`, () => {
                    const model = GameControllerModel.fromGamepadId(str);
                    expect(model.getStyle()).toBe(GameControllerStyle.XBOX);
                });
            });
        });
        describe("detects PlayStation-like controllers", () => {
            psModels.forEach((str) => {
                it(`given the string "${str}"`, () => {
                    const model = GameControllerModel.fromGamepadId(str);
                    expect(model.getStyle()).toBe(GameControllerStyle.PLAYSTATION);
                });
            });
        });
        describe("detects Google Stadia controllers", () => {
            stadiaModels.forEach((str) => {
                it(`given the string "${str}"`, () => {
                    const model = GameControllerModel.fromGamepadId(str);
                    expect(model.getStyle()).toBe(GameControllerStyle.STADIA);
                });
            });
        });
        describe("returns null on unknown controllers", () => {
            unknownModels.forEach((str) => {
                it(`given the string "${str}"`, () => {
                    const model = GameControllerModel.fromGamepadId(str);
                    expect(model.getStyle()).toBeNull();
                });
            });
        });
    });
});
