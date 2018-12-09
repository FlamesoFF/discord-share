class DOM {
    detectLargestImage(document: Document): HTMLElement {
        const list = document.querySelectorAll('img');
        let result: HTMLImageElement = list[0];

        list.forEach((img: HTMLImageElement) => {
            if (img.width > result.width && img.height > result.height) {
                result = img;
            }
        });

        return result;
    }
}

export default new DOM();