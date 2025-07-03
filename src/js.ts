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
