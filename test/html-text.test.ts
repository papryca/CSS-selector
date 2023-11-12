import {describe, expect, test} from "@jest/globals";
import HtmlText from "../src/ts/html-text";

describe("HtmlText.getShortcut test", () => {
    test("should return tags with class", () => {
        const htmlText = new HtmlText('test1', ['test2'], null, '');
        const expectedResult = `<test1 class="test2"></test1>`
        expect(htmlText.getShortcut()).toEqual(expectedResult);
    });

    test("should return tags without class", () => {
        const htmlText = new HtmlText('test1', [], null, '');
        expect(htmlText.getShortcut()).toEqual('<test1></test1>');
    });
})

describe('HtmlText.getByDataId test', () => {
    test("Should return dataId", () => {
        const node = new HtmlText(
            'test0',
            ['table'],
            [
                new HtmlText('test1', [], null, '1'),
                new HtmlText('test2', [], null, '2'),
            ],
            '',
        )

        expect(node.getByDataId('1')!.tag).toEqual('test1');
        expect(node.getByDataId('2')!.tag).toEqual('test2');
    });

    test("Empty html nodes", () => {
        const htmlText = new HtmlText('test1', [], null, '');

        expect(htmlText.getByDataId('test-test-test')).toEqual(null);
    })

    test("Nested html nodes", () => {
        const htmlText = new HtmlText(
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
        );

        expect(htmlText.getByDataId('1')!.tag).toEqual('test1');
        expect(htmlText.getByDataId('2')!.tag).toEqual('test2');
        expect(htmlText.getByDataId('3')!.tag).toEqual('test3');
        expect(htmlText.getByDataId('4')!.tag).toEqual('test4');
        expect(htmlText.getByDataId('5')!.tag).toEqual('test5');
        expect(htmlText.getByDataId('6')!.tag).toEqual('test6');
        expect(htmlText.getByDataId('7')!.tag).toEqual('test7');
    })
})

