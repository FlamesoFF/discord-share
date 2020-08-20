import { IContentInfoMessage } from '@/types';


class Content {
    constructor() {
        chrome.runtime.onMessage.addListener((message: IContentInfoMessage, sender, sendResponse) => {
            if (message.type === 'contentInfo') {
                const imagesUrls = this.parseImages();
                const text = this.getSelectedText();

                sendResponse(<IContentInfoMessage>{
                    type: 'contentInfo',
                    data: {
                        text,
                        imagesUrls
                    }
                });
            }
        });
    }

    private parseImages(): string[] {
        const images = document.querySelectorAll('img');
        let result: string[] = [];
        let buffer = images[0];

        const minWidth = 200,
            minHeight = 100;

        // search for corresponding image
        images.forEach((img: HTMLImageElement) => {
            if (img.width > minWidth && img.height > minHeight) {
                result.push(img.src);
            }
        });

        // if nothing was found
        if (result.length === 0) {
            let buf = images[0];

            images.forEach((img: HTMLImageElement) => {
                if (img.width > buf.width && img.height > buf.height) {
                    buf = img;
                }
            });

            result.push(buf.src);
        }

        return result;
    }

    private getSelectedText(): string {
        const text = document.getSelection().toString();

        if (text) {
            const formatted = text.replace(/[\n]+/g, '\n\n');

            return formatted ? formatted : '';
        }
    }
}

new Content();