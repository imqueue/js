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

describe('object', () => {
    describe('contains()', () => {
        it('should return true if object contains given path', () => {
            expect(contains({ a: { b: { c: false }}}, 'a.b.c')).is.true;
            expect(contains(null, 'a.b.c')).is.false;
            expect(contains([], 'a.b.c')).is.false;
        });
        it('should return false if given object does not contain path', () => {
            expect(contains({ a: { b: true }}, 'a.b.c')).is.false;
        });
    });
    describe('get()', () => {
        it('should return value stored under given property or undefined',
        () => {
            expect(get({ a: { b: { c: false }}}, 'a.b.c')).is.false;
            expect(get({ a: { b: { c: false }}}, 'a.b.c.d')).is.undefined;
            expect(get({ a: { b: { c: false }}}, ''))
                .deep.equals({ a: { b: { c: false }}});
            expect(get({ a: { b: { c: false }}}, 'a.b'))
                .deep.equals({ c: false });
        });
    });
});
