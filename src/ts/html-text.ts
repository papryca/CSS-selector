class HtmlText {
    public tag: string;

    public classTag: string[];

    public children: HtmlText[] | null;

    public dataId: string;

    constructor(tag: string, classTag: string[], children: HtmlText[] | null, dataId: string) {
        this.tag = tag;
        this.classTag = classTag;
        this.children = children;
        this.dataId = dataId;
    }

    getElement(): HTMLElement {
        const item: HTMLElement = document.createElement('div');
        item.setAttribute('data-id', this.dataId);

        const tag = document.createElement('span');
        tag.append(`<${this.tag} `);

        const attr = document.createElement('span');
        attr.classList.add('highlight-attr');
        attr.innerText = 'class=';
        tag.append(attr);

        const cls = document.createElement('span');
        cls.classList.add('highlight-attr-val');
        cls.innerText = `"${this.classTag}"`;
        tag.append(cls);

        if (this.children && this.children.length > 0) {
            tag.append('>');

            item.append(tag);

            this.children.forEach((child) => {
                item.append(child.getElement());
            });

            item.append(`</${this.tag}>`);
        } else {
            tag.append('/>');

            item.append(tag);
        }

        return item;
    }

    getByDataId(dataId: string): HtmlText | null {
        if (this.dataId === dataId) {
            return this;
        }

        if (this.children) {
            let result: HtmlText | null = null;
            this.children.forEach((e) => {
                const node = e.getByDataId(dataId);
                if (node) {
                    result = node;
                }
            });
            return result;
        }

        return null;
    }

    getShortcut(): string {
        if (this.classTag.length > 0) {
            return `<${this.tag} class="${this.classTag}"></${this.tag}>`;
        }
        return `<${this.tag}></${this.tag}>`;
    }
}

export default HtmlText;
