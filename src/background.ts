import { IContentInfoMessage, IShareData } from "./types";

declare global {
    interface Window {
        data: IShareData
    }
}

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
                        try {
                            const shareData: IShareData = {
                                contextMenusInfo: info,
                                tabInfo: tabs[0],
                                contentInfo: {
                                    largestImageUrl: message.data.largestImageUrl
                                }
                            };

                            chrome.windows.create({
                                url: './share-window/share.html',
                                type: 'panel',
                                width: 400,
                                height: 800,
                                focused: true,
                            }, (createdWindow) => {
                                window.data = shareData;
                            });
                        }
                        catch (error) { }
                    });
                });
            }
        });
    }
}

new Background();