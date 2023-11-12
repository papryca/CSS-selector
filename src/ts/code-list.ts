function generateCodeList(listNumber: number, idName: string): void {
    const codeNumbers: HTMLElement | null = document.getElementById(idName);
    const codeNumbersList: HTMLElement = document.createElement('ul');
    codeNumbersList.classList.add('code__numbers-list');
    if (codeNumbers) {
        for (let i = 1; i <= listNumber; i += 1) {
            const codeNumber: HTMLElement = document.createElement('li');
            codeNumber.textContent = String(i);
            codeNumbersList.append(codeNumber);
        }
        codeNumbers.append(codeNumbersList);
    }
}

export default generateCodeList;
