/*!
 * @imqueue/js - JavaScript routines for @imqueue
 *
 * I'm Queue Software Project
 * Copyright (C) 2025  imqueue.com <support@imqueue.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If you want to use this code in a closed source (commercial) project, you can
 * purchase a proprietary commercial license. Please contact us at
 * <support@imqueue.com> to get commercial licensing options.
 */
import { js } from './js';

export namespace object {
    import isObject = js.isObject;
    import isDefined = js.isDefined;

    /**
     * Checks if a given path exists in a given object, returns true if it is,
     * false - otherwise
     *
     * @param {any} obj
     * @param path
     */
    export function contains(obj: any, path: string) {
        if (!isObject(obj)) {
            return false;
        }

        return path.split('.').every(field => {
            if (typeof obj[field] === 'undefined') {
                return false;
            }

            obj = obj[field];

            return true;
        });
    }

    /**
     * Extracts value from object by a given property path
     *
     * @param {any} obj
     * @param {string} path
     * @return {any}
     */
    export function get(obj: any, path: string): any {
        if (!path) {
            return obj;
        }

        const parts = path.split('.');
        let o = obj;

        for (let i = 0, s = parts.length; i < s; i++) {
            const prop = parts[i];

            o = o[prop];

            if (!isDefined(o)) {
                return o;
            }
        }

        return o;
    }

    /**
     * Recursively checks if property contains value.
     * If no - it will be deleted from object
     *
     * @param {any} obj
     * @returns {boolean}
     */
    export function clearObject(obj: any): boolean {
        let isEmpty = true;

        for (const [key, value] of Object.entries(obj)) {

            isEmpty = js.isEmpty(value) ? true
                : js.isObject(value)
                    ? clearObject(value) || js.isEmpty(value) : false;

            if (isEmpty) {
                delete obj[key];
                isEmpty = false;

            }
        }
        return isEmpty;
    }

    /**
     * Deep extends target object with properties from source
     *
     * @param {any} target - extending object
     * @param {any} source - object with extending fields
     * @example
     * const target = { a: 1, b: { a: 2 } };
     * const source = { c: 2, b: { b: 2, c: 3 } }
     * const result = deepExtends(target, source);
     * // { a: 1, b: { a: 2, b: 2, c: 3 }, c: 2 }
     *
     * const target = { a: [1, 2, 3], b: [{ a: 1 }, { b: 2 }] }
     * const source = { a: [3, 4, 5], b: [{ c: 2 }, { d: 3 }, { e: 4 }] }
     * const result = deepExtends(target, source);
     * // { a: [1, 2, 3, 4, 5], b: [{ a: 1, c: 2 }, { b: 2, d: 3 }, { e: 4 }] }
     */
    export function deepExtends(
        target?: any,
        source?: any,
    ) {
        if (!target) {
            target = source;
            return target;
        }
        if (Array.isArray(target) && Array.isArray(source)) {
            for (let i = 0; i < source.length; i++) {
                if (typeof source[i] === 'object') {
                    target[i] = deepExtends(target[i], source[i]);
                } else {
                    target[target.length] = source[i];
                }
            }

            target = [...new Set(target)];
        } else if (typeof target === 'object' && typeof source === 'object') {
            for (const [key, value] of Object.entries(source || {})) {
                const targetValue = target[key];
                target[key] = deepExtends(targetValue, value);
            }
        } else {
            target = source;
        }

        return target;
    }
}
