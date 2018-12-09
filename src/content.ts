import {IContentInfoMessage} from "./types/globals";

class Content {
    constructor() {
        chrome.runtime.onMessage.addListener((message: IContentInfoMessage, sender, sendResponse) => {
            if (message.type === 'contentInfo') {
                const list = document.querySelectorAll('img');
                let result: string[] = [];
                let buffer = list[0];

                const minWidth = 200,
                    minHeight = 100;

                // search for corresponding image
                list.forEach((img: HTMLImageElement) => {
                    if (img.width > minWidth && img.height > minHeight) {
                        result.push(img.src);
                    }
                });

                // if nothing was found
                if (result.length === 0) {
                    let buf = list[0];

                    list.forEach((img: HTMLImageElement) => {
                        if (img.width > buf.width && img.height > buf.height) {
                            buf = img;
                        }
                    });

                    result.push(buf.src);
                }

                sendResponse(<IContentInfoMessage>{
                    type: 'contentInfo',
                    data: {
                        imagesUrls: result
                    }
                });
            }
        });
    }
}

new Content();