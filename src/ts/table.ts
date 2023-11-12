import Level from './level';
import HtmlText from './html-text';
import { getDefaultLevels } from './components/levels';
import StorageHelper from './helpers/storage';
import Selector from './helpers/selector';

class Table {
    public tableSurface: HTMLElement = Selector.querySelectorMust('.table__surface');

    public levels: Level[];

    protected activeLevel: Level;

    protected activeLevelNumber: number;

    constructor() {
        this.levels = getDefaultLevels();
        // eslint-disable-next-line prefer-destructuring
        this.activeLevel = this.levels[0];
        this.activeLevelNumber = 0;
    }

    init(): void {
        const levelsJson: string | null = localStorage.getItem('levels');
        if (levelsJson) {
            this.levels = StorageHelper.parse(levelsJson);
        }

        const lvl: string | null = localStorage.getItem('active-level');
        if (lvl) {
            this.activeLevelNumber = parseInt(lvl, 10);
        }

        this.generateLevelList(this.levels, this.activeLevelNumber);
        this.changeDishes(this.activeLevelNumber);
        this.registerResetButton();
        this.registerEnterKeydown();
        this.registerEnterButtonClick();
    }

    generateLevelList(levels: Level[], activeId: number): void {
        const levelNumbers: HTMLElement | null = document.getElementById('level-list');
        if (!levelNumbers) {
            return;
        }

        levelNumbers.innerHTML = '';
        for (let i = 0; i < levels.length; i += 1) {
            const levelImage: HTMLElement = document.createElement('span');
            levelImage.classList.add('level__image');
            if (levels[i].state === 'unresolved') {
                levelImage.classList.add('level_black');
            } else if (levels[i].state === 'help') {
                levelImage.classList.add('level_yellow');
            } else if (levels[i].state === 'resolved') {
                levelImage.classList.add('level_green');
            }
            const levelNumber: HTMLElement = document.createElement('p');
            levelNumber.classList.add('level__number');
            levelNumber.setAttribute('data-level', String(i));
            levelNumber.textContent = String(i + 1);
            const levelNumbersList: HTMLElement = document.createElement('div');
            levelNumbersList.classList.add('level__string');
            levelNumbersList.append(levelImage);
            levelNumbersList.append(levelNumber);
            levelNumbers.append(levelNumbersList);

            if (activeId === i) {
                levelNumbersList.classList.add('level_active');
            }

            levelNumbersList.addEventListener('click', (e: MouseEvent) => {
                const targetElement: HTMLElement = e.currentTarget as HTMLElement;
                const number: HTMLElement | null = targetElement.querySelector('.level__number');
                if (number) {
                    const n = parseInt(String(number.dataset.level), 10);
                    if (!Number.isNaN(n)) {
                        this.changeDishes(n);
                    }
                }
            });
        }
    }

    drawSelect(text: string): void {
        Selector.querySelectorMust('.table__select').innerText = text;
    }

    drawHtmlText(htmlSegments: HtmlText[]): void {
        const codeHtml = Selector.querySelectorMust('.code__content_html');
        codeHtml.innerHTML = '';
        codeHtml.classList.add('language-html');
        htmlSegments.forEach((htmlText) => {
            codeHtml.append(htmlText.getElement());
        });

        const rows = document.querySelectorAll('.code__content div');
        rows.forEach((row) => {
            row.addEventListener('mouseover', (e) => {
                document.querySelectorAll('.table__box')
                    .forEach((value) => {
                        value.remove();
                    });

                const dataId = (e.currentTarget as HTMLElement).getAttribute('data-id');
                if (!dataId) {
                    return;
                }
                (e.currentTarget as HTMLElement).classList.add('selected-text');

                const elem = document.querySelector(`.table__surface [data-id="${dataId}"]`);
                if (elem) {
                    elem.classList.add('selected');
                    const textBox = document.createElement('div');
                    const htmlSegment = this.activeLevel.findHtmlByDataID(dataId);
                    if (htmlSegment) {
                        textBox.innerText = htmlSegment.getShortcut();
                    }

                    textBox.classList.add('table__box');
                    const wrapper = elem.closest('.table__dish-wrapper');
                    if (wrapper) {
                        wrapper.append(textBox);
                    }
                }
            });
            row.addEventListener('mouseout', (e) => {
                document.querySelectorAll('.table__box')
                    .forEach((value) => {
                        value.remove();
                    });
                const dataId = (e.currentTarget as HTMLElement).getAttribute('data-id');
                (e.currentTarget as HTMLElement).classList.remove('selected-text');

                const elem = document.querySelector(`.table__surface [data-id="${dataId}"]`);
                if (elem) {
                    elem.classList.remove('selected');
                }
            });
        });
    }

    typeLetters(inputElement: HTMLInputElement, answer: string, time: number): void {
        const codeButton: HTMLButtonElement = Selector.querySelectorMust('.code__button') as HTMLButtonElement;
        let counter = 0;
        inputElement.value = '';
        const interval = setInterval(() => {
            inputElement.value += answer.charAt(counter);
            counter += 1;
            if (counter === answer.length) {
                clearInterval(interval);
                codeButton.disabled = false;
            }
        }, time);
    }

    drawHelpButton(level: Level): void {
        const oldHelpButton: HTMLButtonElement | null = document.querySelector('.table__button-help');
        const tableButton: HTMLElement = Selector.querySelectorMust('.table__button');
        const codeButton: HTMLButtonElement = Selector.querySelectorMust('.code__button') as HTMLButtonElement;
        codeButton.disabled = true;
        if (oldHelpButton) {
            oldHelpButton.remove();
        }
        const helpButton: HTMLButtonElement = document.createElement('button');
        helpButton.classList.add('table__button-help', 'button');
        helpButton.innerText = 'Help';
        tableButton.append(helpButton);
        const inputField: HTMLInputElement = Selector.querySelectorMust('.code__input-content') as HTMLInputElement;
        if ('value' in inputField) {
            inputField.value = '';
        }

        helpButton.addEventListener('click', () => {
            inputField.value = '';
            inputField.removeAttribute('placeholder');
            inputField.classList.remove('code_animation');
            this.typeLetters(inputField, level.getAnswer(), 100);
            level.markAsHelped();
            helpButton.disabled = true;
        });
    }

    setFocusInputBox(): void {
        const inputContent = Selector.querySelectorMust('.code__input-content');
        const codeButton = Selector.querySelectorMust('.code__button') as HTMLButtonElement;
        inputContent.setAttribute('placeholder', 'Type in a CSS selector');
        inputContent.classList.add('code_animation');
        document.addEventListener('keydown', () => {
            inputContent.removeAttribute('placeholder');
            inputContent.classList.remove('code_animation');
            inputContent.focus();
            codeButton.disabled = false;
        });
    }

    registerImageSelections(): void {
        const rows = document.querySelectorAll('.table__surface span');

        rows.forEach((row) => {
            row.addEventListener('mouseover', (e) => {
                const dataId = (e.currentTarget as HTMLElement).getAttribute('data-id');
                if (!dataId) {
                    return;
                }
                (e.currentTarget as HTMLElement).classList.add('selected');

                document.querySelectorAll('.table__box')
                    .forEach((value) => {
                        value.remove();
                    });

                const elem = document.querySelector(`.code__content [data-id="${dataId}"]`);
                if (elem) {
                    elem.classList.add('selected-text');
                    const textBox = document.createElement('div');
                    const htmlSegment = this.activeLevel.findHtmlByDataID(dataId);
                    if (htmlSegment) {
                        textBox.innerText = htmlSegment.getShortcut();
                    }

                    textBox.classList.add('table__box');
                    const wrapper = (e.currentTarget as HTMLElement).closest('.table__dish-wrapper');
                    if (wrapper) {
                        wrapper.append(textBox);
                    }
                }
            });
            row.addEventListener('mouseout', (e) => {
                document.querySelectorAll('.table__box')
                    .forEach((value) => {
                        value.remove();
                    });
                const dataId = (e.currentTarget as HTMLElement).getAttribute('data-id');
                (e.currentTarget as HTMLElement).classList.remove('selected');

                const elem = document.querySelector(`.code__content [data-id="${dataId}"]`);
                if (elem) {
                    elem.classList.remove('selected-text');
                }
            });
        });
    }

    clearTable(): void {
        const tableDishesContain: NodeListOf<HTMLSpanElement> = this.tableSurface.querySelectorAll('div');
        tableDishesContain.forEach((div) => {
            div.remove();
        });
    }

    changeDishes(levelNumber: number): void {
        if (levelNumber < this.levels.length) {
            this.clearTable();

            const level = this.levels[levelNumber];

            this.activeLevel = level;
            this.activeLevelNumber = levelNumber;
            level.render(this.tableSurface);
            this.registerImageSelections();
            this.drawSelect(level.getSelect());
            this.drawHtmlText(level.getHtmlSegments());
            this.drawHelpButton(level);
            this.generateLevelList(this.levels, levelNumber);
            this.setFocusInputBox();
            this.setLevelsToLocalStorage();
        } else {
            const select: HTMLElement = Selector.querySelectorMust('.table__select');
            const table: HTMLElement = Selector.querySelectorMust('.table__dishes');
            select.innerHTML = ('Congratulations! Victory!');
            table.innerHTML = '';
            const playAgainButton = document.createElement('button');
            playAgainButton.classList.add('level__button', 'button');
            playAgainButton.innerHTML = 'Try again';
            playAgainButton.addEventListener('click', () => {
                this.levels = getDefaultLevels();
                this.changeDishes(0);
            });
            table.append(playAgainButton);
        }
    }

    registerEnterKeydown(): void {
        const inputField: HTMLInputElement = Selector.querySelectorMust('.code__input-content') as HTMLInputElement;
        const cssCode: HTMLInputElement = Selector.querySelectorMust('.code__content') as HTMLInputElement;
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (inputField.value === this.activeLevel.getAnswer() && e.key === 'Enter') {
                e.preventDefault();
                if (this.activeLevel.state !== 'help') {
                    this.activeLevel.state = 'resolved';
                }
                const active = document.querySelectorAll('.move');
                active.forEach((item) => {
                    item.classList.remove('move');
                    item.classList.add('animation');
                });
                setTimeout(() => {
                    this.changeDishes(this.activeLevelNumber + 1);
                }, 2500);
            } else if (inputField.value !== this.activeLevel.getAnswer() && e.key === 'Enter') {
                cssCode.classList.add('wrong-animation');
                setTimeout(() => {
                    cssCode.classList.remove('wrong-animation');
                }, 1000);
            }
        });
    }

    registerEnterButtonClick(): void {
        const enterButton: HTMLElement = Selector.querySelectorMust('.code__button');
        const inputField: HTMLInputElement = Selector.querySelectorMust('.code__input-content') as HTMLInputElement;
        const cssCode: HTMLInputElement = Selector.querySelectorMust('.code__content') as HTMLInputElement;
        enterButton.addEventListener('click', () => {
            if (inputField.value === this.activeLevel.getAnswer()) {
                if (this.activeLevel.state !== 'help') {
                    this.activeLevel.state = 'resolved';
                }
                const active = document.querySelectorAll('.move');
                active.forEach((item) => {
                    item.classList.remove('move');
                    item.classList.add('animation');
                });
                setTimeout(() => {
                    this.changeDishes(this.activeLevelNumber + 1);
                }, 2500);
            } else {
                cssCode.classList.add('wrong-animation');
                setTimeout(() => {
                    cssCode.classList.remove('wrong-animation');
                }, 1000);
            }
        });
    }

    registerResetButton(): void {
        const resetProgressButton: HTMLElement = Selector.querySelectorMust('.level__button');
        resetProgressButton.addEventListener('click', () => {
            this.levels = getDefaultLevels();
            this.changeDishes(0);
            localStorage.removeItem('levels');
            localStorage.removeItem('active-level');
        });
    }

    setLevelsToLocalStorage(): void {
        const levelsJson: string = JSON.stringify(this.levels);

        localStorage.setItem('levels', levelsJson);
        localStorage.setItem('active-level', String(this.activeLevelNumber));
    }
}

export default Table;
