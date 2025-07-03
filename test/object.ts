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
import { object } from '../src/index';
import contains = object.contains;
import get = object.get;
import clearObject = object.clearObject;
import deepExtends = object.deepExtends;

describe('object', () => {
    describe('contains()', () => {
        it('should return true if object contains given path', () => {
            expect(contains({ a: { b: { c: false } } }, 'a.b.c')).is.true;
            expect(contains(null, 'a.b.c')).is.false;
            expect(contains([], 'a.b.c')).is.false;
        });
        it('should return false if given object does not contain path', () => {
            expect(contains({ a: { b: true } }, 'a.b.c')).is.false;
        });
    });
    describe('get()', () => {
        it('should return value stored under given property or undefined',
            () => {
                expect(get({ a: { b: { c: false } } }, 'a.b.c')).is.false;
                expect(get({ a: { b: { c: false } } }, 'a.b.c.d')).is.undefined;
                expect(get({ a: { b: { c: false } } }, ''))
                    .deep.equals({ a: { b: { c: false } } });
                expect(get({ a: { b: { c: false } } }, 'a.b'))
                    .deep.equals({ c: false });
            });
    });

    describe('clearObject()', () => {
        it('should return object without empty properties ' +
            'including inner objects',
            () => {
                const testObjSource = {
                    prop1: false,
                    prop2: 1,
                    prop3: '',
                    prop4: 0,
                    prop5: [1, 2, 3],
                    prop6: [],
                    prop7: null,
                    prop8: {
                        innerProp1: null,
                        innerProp2: undefined,
                        innerProp3: 'string',
                        innerProp4: [],
                        innerProp5: {
                            innerInnerProp1: [],
                            innerInnerProp2: 10,
                        },
                    },
                };
                const expected = {
                    prop1: false,
                    prop2: 1,
                    prop4: 0,
                    prop5: [1, 2, 3],
                    prop8: {
                        innerProp3: 'string',
                        innerProp5: {
                            innerInnerProp2: 10,
                        },
                    },
                };

                clearObject(testObjSource);
                expect(testObjSource).deep.equals(expected);
            });
    });

    describe('deepExtends()', () => {
        it('should return object with extended fields',
            () => {
                const target = {
                    field1: 1,
                    field2: {
                        subField1: 3,
                        subObject: {
                            subObjectField1: 2,
                        }
                    },
                    arrayObj: [{ a: 1}],
                    field3: [1, 2, 3]
                };

                const expected =  {
                    field1: 1,
                    field2: {
                        subField1: 3,
                        subObject: {
                            subObjectField1: 2,
                            subObjectField2: 3,
                        },
                        subField2: 5,
                    },
                    arrayObj: [{ a: 1, b: 2}, { c: 3 }],
                    field3: [1, 2, 3, 4, 5],
                    field5: 4,
                };

                deepExtends(target, {
                    field5: 4,
                    field2: {
                        subField2: 5,
                        subObject: {
                            subObjectField2: 3,
                        }
                    },
                    field3: [4, 5],
                    arrayObj: [{ b: 2 }, { c: 3}],
                });

                expect(target).deep.equals(expected);
            });
    });
});
