class Selector {
    static querySelectorMust(query: string): HTMLElement {
        const result: HTMLElement | null = document.querySelector(query);
        if (result) {
            return result;
        }

        throw new Error(`no element found for [${query}] selector`);
    }
}

export default Selector;
