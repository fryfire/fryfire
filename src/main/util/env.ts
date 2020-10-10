/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

/**
 * The global scope of the current environment. This `globalThis` if present, the browsers Window object when
 * present or the Node.js global object. When nothing of all this exists then an empty object is returned as fallback.
 */
const globalScope = (
    typeof globalThis !== "undefined" ? globalThis :
    typeof window !== "undefined" ? window :
    typeof global !== "undefined" ? global :
    {}
) as NodeJS.Global & Window & Record<string, unknown>;

export { globalScope as global };

/** Cached result of [[isLittleEndian]] function */
let littleEndian: boolean | null = null;

/**
 * Checks whether runtime is little endian.
 *
 * @return True if little endian, false if not.
 */
export function isLittleEndian(): boolean {
    return littleEndian ?? (littleEndian = new Uint16Array(new Uint8Array([ 0x12, 0x34 ]).buffer)[0] === 0x3412);
}

/**
 * Checks whether runtime is electron.
 *
 * @return True if electron, false if not.
 */
export function isElectron(): boolean {
    return navigator.userAgent.match(/\belectron\b/i) != null;
}

/** Cached process query parameters. */
let params: Record<string, string> | null = null;

/**
 * Returns the environment/query parameter with the given name.
 *
 * @param name - The parameter name
 * @return The parameter value of null if parameter does not exist.
 */
export function getParam(name: string): string | null {
    if (isElectron()) {
        return process.env[name] ?? null;
    } else {
        if (params == null) {
            params = window.location.search.substr(1).split("&").reduce((params, s) => {
                const [ key, value ] = s.split("=");
                params[key] = value ?? "";
                return params;
            }, {} as Record<string, string>);
        }
        return params[name] ?? null;
    }
}

/**
 * Checks whether development mode is enabled or not.
 *
 * @return True if development mode, false if not.
 */
export function isDev(): boolean {
    // Check dev parameter
    const param = getParam("dev");
    if (param != null) {
        return param !== "false" && param !== "0";
    }

    // When port is not standard then assume development mode
    return window.location.port !== "";
}
