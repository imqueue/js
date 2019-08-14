/*!
 * @imqueue/js - JavaScript routines for @imqueue
 *
 * Copyright (c) 2019, imqueue.com <support@imqueue.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
export namespace js {
    /**
     * Returns true if a given value is not undefined or null,
     * false otherwise
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isDefined(value: any): boolean {
        return typeof value !== 'undefined' && value !== null;
    }

    /**
     * Returns true if a given value is defined and is truthy
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isOk(value: any) {
        return !!(isDefined(value) && value);
    }

    /**
     * Returns true if a given value is defined and is numeric
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isNumeric(value: any) {
        return isDefined(value) && !isArray(value) && !isNaN(+value);
    }

    /**
     * Returns true whenever the given value is not defined or null, or empty
     * string, or empty object, or empty array.
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isEmpty(value: any) {
        return !isDefined(value) ||
            ((value + '') === '') ||
            (isObject(value) && !Object.keys(value).length);
    }

    /**
     * Checks if a given value is an object type, but not null
     *
     * @param {any} obj
     * @return {boolean}
     */
    export function isObject(obj: any) {
        return typeof obj !== 'function' && Object(obj) === obj;
    }

    /**
     * Checks if a given value is Array
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isArray(value: any) {
        return Array.isArray(value);
    }

    /**
     * Checks if given value is a valid date
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isDate(value: any): boolean {
        if (!(value instanceof Date || isString(value))) {
            return false;
        }

        if (isString(value)) {
            value = new Date(value);
        }

        return String(value) !== 'Invalid Date';
    }

    /**
     * Checks if a given object is string
     *
     * @param {any} value
     * @return {boolean}
     */
    export function isString(value: any): boolean {
        return typeof value === 'string';
    }
}
