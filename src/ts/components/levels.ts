import Level from '../level';
import Pair from '../pair';
import HtmlText from '../html-text';

export function getDefaultLevels(): Level[] {
    return [
        new Level([
            new Pair('plate', 'lemon', 'move', '', '1', '2'),
            new Pair('plate', '', '', '', '3', '4'),
        ], 'plate:first-child', 'Select the plate', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate'], null, '3'),
                ],
                '',
            ),
        ], ['1']),
        new Level([
            new Pair('plate', 'lemon-move', '', 'move', '1', '2'),
            new Pair('plate-colourful', '', '', '', '3', '4'),
            new Pair('plate-colourful', '', '', '', '5', '6'),
            new Pair('watermelon-big-move', '', 'move', '', '7', '8'),
        ], 'lemon, watermelon', 'Select the lemon on the plate and the watermelon', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate-colourful'], null, '3'),
                    new HtmlText('plate', ['plate-colourful'], null, '5'),
                    new HtmlText('watermelon', ['watermelon big'], null, '7'),
                ],
                '',
            ),
        ], ['2', '7']),
        new Level([
            new Pair('plate-colourful', 'lemon', 'move', '', '1', '2'),
            new Pair('plate', '', 'move', '', '3', '4'),
            new Pair('plate-colourful', 'watermelon', 'move', '', '5', '6'),
            new Pair('plate', 'apple', 'move', '', '7', '8'),
        ], 'plate', 'Select the plates', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate-colourful'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate'], null, '3'),
                    new HtmlText('plate', ['plate-colourful'], [new HtmlText('lemon', ['lemon small'], null, '6')], '5'),
                    new HtmlText('plate', ['plate'], [new HtmlText('apple', ['apple small'], null, '8')], '7'),
                ],
                '',
            ),
        ], ['1', '3', '5', '7']),
        new Level([
            new Pair('plate-colourful', 'lemon', '', '', '1', '2'),
            new Pair('lemon-big-move', '', 'move', '', '3', '4'),
        ], 'lemon.big', 'Select the lemon', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate-colourful'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('lemon', ['lemon big'], null, '3'),
                ],
                '',
            ),
        ], ['3']),
        new Level([
            new Pair('plate', 'lemon-move', '', 'move', '1', '2'),
            new Pair('plate', 'lemon-move', '', 'move', '3', '4'),
            new Pair('apple-big', '', '', '', '5', '6'),
        ], 'plate > lemon', 'Select the lemon on the plate', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '4')], '3'),
                    new HtmlText('apple', ['apple big'], null, '5'),
                ],
                '',
            ),
        ], ['2', '4']),
        new Level([
            new Pair('plate', 'lemon', 'move', '', '1', '2'),
            new Pair('apple-big-move', '', 'move', '', '3', '4'),
            new Pair('watermelon-big', '', '', '', '5', '6'),
            new Pair('plate', '', '', '', '7', '8'),
        ], 'plate:first-child, apple', 'Select the plate and the apple', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('apple', ['apple big'], null, '3'),
                    new HtmlText('watermelon', ['watermelon big'], null, '5'),
                    new HtmlText('plate', ['plate'], null, '7'),
                ],
                '',
            ),
        ], ['1', '3']),
        new Level([
            new Pair('plate', 'lemon', '', '', '1', '2'),
            new Pair('plate', 'lemon', 'move', '', '3', '4'),
            new Pair('plate', 'lemon', 'move', '', '5', '6'),
            new Pair('plate', 'lemon', '', '', '7', '8'),
        ], ' plate:nth-child(2), plate:nth-child(3)', 'Select the plates', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '4')], '3'),
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '6')], '5'),
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '8')], '7'),
                ],
                '',
            ),
        ], ['3', '5']),
        new Level([
            new Pair('watermelon-big', '', '', '', '1', '2'),
            new Pair('watermelon-big-move', '', 'move', '', '3', '4'),
            new Pair('apple-big-move', '', 'move', '', '5', '6'),
            new Pair('watermelon-big', '', '', '', '7', '8'),
        ], 'watermelon:nth-of-type(2), apple', 'Select the watermelon and the apple', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('watermelon', ['big'], null, '1'),
                    new HtmlText('watermelon', ['big'], null, '3'),
                    new HtmlText('apple', ['apple'], null, '5'),
                    new HtmlText('watermelon', ['big'], null, '7'),
                ],
                '',
            ),
        ], ['3', '5']),
        new Level([
            new Pair('watermelon-big', '', '', '', '1', '2'),
            new Pair('apple-big', '', '', '', '3', '4'),
            new Pair('plate', '', 'move', '', '5', '6'),
            new Pair('plate', '', 'move', '', '7', '8'),
        ], 'apple ~ plate', 'Select the apple and the plate', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('watermelon', ['watermelon big'], null, '1'),
                    new HtmlText('apple', ['apple'], null, '3'),
                    new HtmlText('plate', ['plate'], null, '5'),
                    new HtmlText('plate', ['plate'], null, '7'),
                ],
                '',
            ),
        ], ['5', '7']),
        new Level([
            new Pair('plate', 'lemon-move', '', 'move', '1', '2'),
            new Pair('plate', '', '', '', '3', '4'),
            new Pair('plate-colourful', 'bananas-move', '', 'move', '5', '6'),
            new Pair('plate', 'lemon', '', '', '7', '8'),
        ], 'lemon:first-child, bananas', 'Select the lemon and the bananas on the plate', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate'], null, '3'),
                    new HtmlText('plate', ['plate-colourful'], [new HtmlText('bananas', ['bananas small'], null, '6')], '5'),
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '8')], '7'),
                ],
                '',
            ),
        ], ['2', '6']),
        new Level([
            new Pair('plate', 'lemon', 'move', '', '1', '2'),
            new Pair('plate', 'bananas-move', '', 'move', '3', '4'),
            new Pair('plate', 'bananas', '', '', '5', '6'),
            new Pair('lemon-big', 'move', '', '', '7', '8'),
        ], 'plate:first-child, bananas:first-of-type', 'Select the plate and bananas on the plate', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('plate', ['plate'], [new HtmlText('bananas', ['bananas small'], null, '4')], '3'),
                    new HtmlText('plate', ['plate'], [new HtmlText('bananas', ['bananas small'], null, '6')], '5'),
                    new HtmlText('lemon', ['lemon big'], null, '7'),
                ],
                '',
            ),
        ], ['1', '4']),
        new Level([
            new Pair('plate-colourful', 'lemon', '', '', '1', '2'),
            new Pair('lemon-big-move', '', 'move', '', '3', '4'),
            new Pair('plate', 'apple', '', '', '5', '6'),
            new Pair('lemon-big-move', '', 'move', '', '7', '8'),
        ], 'plate + lemon', 'Select the lemons', [
            new HtmlText(
                'div',
                ['table'],
                [
                    new HtmlText('plate', ['plate-colourful'], [new HtmlText('lemon', ['lemon small'], null, '2')], '1'),
                    new HtmlText('lemon', ['lemon'], null, '3'),
                    new HtmlText('plate', ['plate'], [new HtmlText('apple', ['apple small'], null, '6')], '5'),
                    new HtmlText('lemon', ['lemon'], null, '7'),
                ],
                '',
            ),
        ], ['3', '7']),
    ];
}
