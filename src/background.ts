import {IShareData} from "./types/globals";


class Background {
    constructor() {
        chrome.contextMenus.removeAll(() => {
            chrome.contextMenus.create({
                id: 'discord',
                title: 'Share to Discord',
                contexts: ['all']
            });

            chrome.contextMenus.onClicked.addListener((info, tab) => {
                if (info.menuItemId === 'discord') {

                    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            type: 'contentInfo'
                        }, (message) => {
                            try {
                                const shareData: IShareData = {
                                    contextMenusInfo: info,
                                    tabInfo: tabs[0],
                                    contentInfo: {
                                        imagesUrls: message.data.imagesUrls
                                    }
                                };

                                chrome.windows.create({
                                    url: './share-window/index.html',
                                    type: 'panel',
                                    width: 600,
                                    // height: 800,
                                    focused: true,
                                }, (createdWindow) => {
                                    window['shareData'] = shareData;
                                });
                            } catch (error) {
                            }
                        });
                    });
                }
            });
        });
    }
}


new Background();