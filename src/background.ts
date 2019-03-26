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
                                        text: message.data.text,
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

        // Check on first launch
        chrome.runtime.onInstalled.addListener(details => {
            if (details.reason == 'install' || details.reason == 'update') {
                this.checkWebhooks();
            }
        });
    }

    private checkWebhooks() {
        // Check webhooks
        chrome.storage.sync.get(["webhooks"], data => {
            const list = JSON.parse(data.webhooks || '[]');

            if (!list || (list && !list.length)) {
                chrome.tabs.create({'url': 'chrome://extensions/?options=' + chrome.runtime.id});
            }
        });
    }
}


new Background();