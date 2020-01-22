/* tslint:disable:no-empty object-literal-key-quotes */
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
import { expect } from 'chai';
import { object } from '../../src';
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
