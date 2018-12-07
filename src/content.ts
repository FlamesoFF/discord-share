import {IContentInfoMessage} from "./types";

class Content {
    constructor() {
        chrome.runtime.onMessage.addListener((message: IContentInfoMessage, sender, sendResponse) => {
            if(message.type === 'contentInfo'){
                const list = document.querySelectorAll('img');
                let result : string = list[0].src;
                let buffer = list[0];

                list.forEach((img : HTMLImageElement) => {
                    if(img.width > buffer.width && img.height > buffer.height){
                        result = img.src;
                        buffer = img;
                    }
                });

                sendResponse(<IContentInfoMessage>{
                    type: 'contentInfo',
                    data: {
                        largestImageUrl: result
                    }
                });

                // chrome.runtime.sendMessage({
                //     type: 'contentInfo',
                //     data: {
                //         largestImageUrl: result
                //     }
                // });
            }
        });
    }
}

new Content();