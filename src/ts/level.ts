import Pair from './pair';
import HtmlText from './html-text';

class Level {
    public pairs: Pair[];

    public answers: string;

    public select: string;

    public htmlText: HtmlText[];

    public state: string;

    public trueId: string[];

    constructor(pairs: Pair[], answers: string, select: string, htmlText: HtmlText[], trueId: string[], state: string = 'unresolved') {
        this.pairs = pairs;
        this.answers = answers;
        this.select = select;
        this.htmlText = htmlText;
        this.state = state;
        this.trueId = trueId;
    }

    findHtmlByDataID(dataID: string): HtmlText | null {
        let result: HtmlText | null = null;
        this.htmlText.forEach((e) => {
            result = e.getByDataId(dataID);
        });

        return result;
    }

    createTableWrapper(): HTMLElement {
        const wrapper: HTMLElement = document.createElement('div');
        wrapper.classList.add('table__dish-wrapper');
        return wrapper;
    }

    getElement(): HTMLElement {
        const elementClassesMap: Record<string, string[]> = {
            plate: ['plate'],
            'plate-colourful': ['plate', 'plate-colourful'],
            apple: ['apple'],
            'apple-big': ['apple-big'],
            'apple-big-move': ['apple-big-move'],
            watermelon: ['watermelon'],
            'watermelon-big': ['watermelon-big'],
            'watermelon-big-move': ['watermelon-big-move'],
            bananas: ['bananas'],
            'bananas-big': ['bananas-big'],
            'bananas-move': ['bananas-move'],
            lemon: ['lemon'],
            'lemon-move': ['lemon-move'],
            'lemon-big': ['lemon-big'],
            'lemon-big-move': ['lemon-big-move'],
        };

        const tableDishes: HTMLElement = document.createElement('div');
        tableDishes.classList.add('table__dishes');
        this.pairs.forEach((pair) => {
            const wrapper = this.createTableWrapper();
            tableDishes.append(wrapper);

            const bottomItem = document.createElement('span');
            if (pair.bottom in elementClassesMap) {
                bottomItem.classList.add(...elementClassesMap[pair.bottom]);
                bottomItem.setAttribute('data-id', pair.bottomDataId);
                if (pair.bottomMove === 'move') {
                    bottomItem.classList.add('move');
                }
            }
            wrapper.append(bottomItem);

            const upperItem = document.createElement('span');
            if (pair.upper in elementClassesMap) {
                upperItem.classList.add(...elementClassesMap[pair.upper]);
                upperItem.setAttribute('data-id', pair.upperDataId);
                bottomItem.append(upperItem);
                if (pair.upperMove === 'move') {
                    upperItem.classList.add('move');
                }
            }
        });

        return tableDishes;
    }

    render(tableSurface: HTMLElement): void {
        tableSurface.append(this.getElement());
    }

    getAnswer(): string {
        return this.answers;
    }

    getSelect(): string {
        return this.select;
    }

    getHtmlSegments(): HtmlText[] {
        return this.htmlText;
    }

    markAsHelped(): void {
        this.state = 'help';
    }
}

export default Level;
