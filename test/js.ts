/* tslint:disable:no-empty object-literal-key-quotes */
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
import { expect } from 'chai';
import { js } from '../src/index';
import isDefined = js.isDefined;
import isOk = js.isOk;
import isNumeric = js.isNumeric;
import isEmpty = js.isEmpty;
import isArray = js.isArray;
import isString = js.isString;
import isDate = js.isDate;

class A {}

describe('js', () => {
    describe('isDefined()', () => {
        it('should return false if given value is undefined or null', () => {
            // noinspection JSConsecutiveCommasInArrayLiteral
            [undefined, , null, (global as any || window as any).a]
                .forEach(value => expect(isDefined(value)).to.be.false);
        });
        it('should return true if given value is defined or not null', () => {
            const values = [
                true, false, 0, -1, 10, '', 'a', {}, {a: 'b'},
                () => {}, new A(), [], new Map(), new Set(),
            ];

            [...values, values]
                .forEach(value => expect(isDefined(value)).to.be.true);
        });
    });
    describe('isOk', () => {
        it('should return true if given value is defined and truthy', () => {
            [true, -1, 'a', {}, {a: 'b'}, () => {}, new A(), []]
                .forEach(value => expect(isOk(value)).to.be.true);
        });
        it('should return false if given value is undefined or falsy', () => {
            [0, '', false, null, undefined]
                .forEach(value => expect(isOk(value)).to.be.false);
        });
    });
    describe('isNumeric()', () => {
        it('should return true if given value can be converted to number',
        () => {
            [1, 0.23e10, 0xff, '123', '0.15', '0.23e10', '0xff', true, false]
                .forEach(value => expect(isNumeric(value)).to.be.true);
        });
        it('should return false if given value cannot be converted to number',
        () => {
            // noinspection JSConsecutiveCommasInArrayLiteral
            [
                {'1': 2}, [1, 2, 3], new A(), {}, [], undefined, null, ,
                '1abc', 'abc1', '0xtrue', '-123.23.45',
            ].forEach(value => expect(isNumeric(value)).to.be.false);
        });
    });
    describe('isEmpty()', () => {
        it('should return true if given value is defined and non-empty', () => {
            [1, [1, 2, 3], { a: '' }, '123', 'aaa', 0, -1, true, false]
                .forEach(value => expect(isEmpty(value)).to.be.false);
        });
        it('should return false if given value is undefined or empty', () => {
            // noinspection JSConsecutiveCommasInArrayLiteral
            [undefined, , '', {}, [], null]
                .forEach(value => expect(isEmpty(value)).to.be.true);
        });
    });
    describe('isArray()', () => {
        it('should return false if given value is not array', () => {
            [
                1, { a: '' }, '123', 'aaa', 0, -1, true, false, null, undefined,
                new A(), new Map(), new Set(),
            ].forEach(value => expect(isArray(value)).to.be.false);
        });
        it('should return true if given value is array', () => {
            // noinspection JSConsecutiveCommasInArrayLiteral
            [[], [1, 2, 3], [new A(), {}, []]]
                .forEach(value => expect(isArray(value)).to.be.true);
        });
    });
    describe('isString()', () => {
        it('should return false if given value is not string', () => {
            [
                1, { a: '' }, 0, -1, true, false, null, undefined,
                new A(), new Map(), new Set(),
            ].forEach(value => expect(isString(value)).to.be.false);
        });
        it('should return true if given value is string', () => {
            // noinspection JSConsecutiveCommasInArrayLiteral
            ['', 'aaa', String(null), String({})]
                .forEach(value => expect(isString(value)).to.be.true);
        });
    });
    describe('isDate()', () => {
        it('should return false if given value is not valid date', () => {
            [
                1, { a: '' }, 0, -1, true, false, null, undefined, '',
                new A(), new Map(), new Set(), new Date(undefined as any),
                '2019-15-14T09:46:57.785Z', '2019-08-41T09:46:57.785Z',
            ].forEach(value => expect(isDate(value)).to.be.false);
        });
        it('should return true if given value is valid date', () => {
            // noinspection JSConsecutiveCommasInArrayLiteral
            ['2019-08-14T09:46:57.785Z', new Date()]
                .forEach(value => expect(isDate(value)).to.be.true);
        });
    });
});
