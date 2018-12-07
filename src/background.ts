import { IContentInfoMessage, IShareData } from "./types";

class Background {
    constructor() {
        chrome.contextMenus.create({
            id: 'discord',
            title: 'Share to Discord',
            contexts: ['all']
        });

        chrome.contextMenus.onClicked.addListener((info, tab) => {
            if (info.menuItemId === 'discord') {

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'contentInfo'
                    }, (message) => {
                        chrome.windows.create({
                            url: './share-window/share.html',
                            type: 'panel',
                            width: 600,
                            height: 400,
                            focused: true,
                        }, (createdWindow) => {
                            Object.defineProperty(window, 'data', {
                                value: <IShareData>{
                                    contextMenusInfo: info,
                                    tabInfo: tabs[0],
                                    contentInfo: {
                                        largestImageUrl: message.data.largestImageUrl
                                    }
                                },
                                writable: false
                            });
                        });
                    });
                });
            }
        });
    }
}

new Background();