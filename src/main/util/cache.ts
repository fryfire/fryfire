/*
 * Copyright (C) 2020 The Fryfire Authors
 * See LICENSE.md for licensing information
 */

import { createMethodDecorator } from "./decorator";

/**
 * Decorator for caching method results. The method is only called on cache miss and then the returned result
 * is cached. Subsequent calls then return the cached result immediately without executing the method until the
 * cache is reset with `delete obj.method`.
 */
export const cacheResult = createMethodDecorator((target, propertyKey, descriptor:
        TypedPropertyDescriptor<() => any>) => {
    const origMethod = target[propertyKey];
    descriptor.value = function() {
        const origValue = origMethod.call(this) as unknown;
        Object.defineProperty(this, propertyKey, {
            configurable: true,
            value: () => origValue
        });
        return origValue;
    };
});
