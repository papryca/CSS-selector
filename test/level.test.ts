import {describe, expect, test} from '@jest/globals';
import Level from "../src/ts/level";
import HtmlText from "../src/ts/html-text";

describe('Level.findHtmlByDataID test', () => {
    test("General level", () => {
        const level = new Level([], '', '', [
            new HtmlText(
                'test0',
                ['table'],
                [
                    new HtmlText('test1', [], null, '1'),
                    new HtmlText('test2', [], null, '2'),
                ],
                '',
            ),
        ], []);

        expect(level.findHtmlByDataID('1')!.tag).toEqual('test1');
        expect(level.findHtmlByDataID('2')!.tag).toEqual('test2');
    });

    test("Empty html nodes", () => {
        const level = new Level([], '', '', [], []);

        expect(level.findHtmlByDataID('test-test-test')).toEqual(null);
    })

    test("Nested html nodes", ()  => {
        const level = new Level([], '', '', [
            new HtmlText(
                'test0',
                ['table'],
                [
                    new HtmlText('test1', [], [
                        new HtmlText('test2', [], [
                            new HtmlText('test3', [], [
                                new HtmlText('test4', [], null, '4')
                            ], '3')
                        ], '2'),
                        new HtmlText('test5', [], null, '5'),
                        new HtmlText('test6', [], null, '6')
                    ], '1'),
                    new HtmlText('test7', [], null, '7'),
                ],
                '',
            ),
        ], []);

        expect(level.findHtmlByDataID('1')!.tag).toEqual('test1');
        expect(level.findHtmlByDataID('2')!.tag).toEqual('test2');
        expect(level.findHtmlByDataID('3')!.tag).toEqual('test3');
        expect(level.findHtmlByDataID('4')!.tag).toEqual('test4');
        expect(level.findHtmlByDataID('5')!.tag).toEqual('test5');
        expect(level.findHtmlByDataID('6')!.tag).toEqual('test6');
        expect(level.findHtmlByDataID('7')!.tag).toEqual('test7');
    })
})

describe("Level.getSelect test", () => {
    test("general", () => {
        const level = new Level([], '', 'test1', [], []);
        expect(level.getSelect()).toEqual('test1');
    })
})

describe("Level.markAsHelped test", () => {
    test("general", () => {
        const level = new Level([], '', 'test1', [], []);
        level.markAsHelped();
        expect(level.state).toEqual('help');
    })
})

describe('Level.getHtmlSegments test', () => {
    test("general", () => {
        const htmlText =  new HtmlText(
            'test1',
            [''],
            null,
            '',
        );
        const level = new Level([], '', '', [htmlText], []);
        expect(level.getHtmlSegments()).toEqual([htmlText])
    })
})

describe('Level.getAnswer test', () => {
    test("general", () => {
        const level = new Level([], 'test1', '', [], []);
        expect(level.getAnswer()).toEqual('test1');
    })
})