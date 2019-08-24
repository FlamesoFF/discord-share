export class ContextMenu {
    private properties = {
        id: 'discord',
        title: 'Share to Discord',
        contexts: ['all']
    };

    async initialize() {
        await this.removeAll();

        chrome.contextMenus.create(this.properties);

        let callback = async (info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => {
            if (info.menuItemId === 'discord') {
                const tabs = await this.query({ active: true, currentWindow: true });
                const message = await this.sendMessage(tabs);

                try {
                    const shareData: IShareData = {
                        contextMenusInfo: info,
                        tabInfo: tabs[0],
                        contentInfo: {
                            text: message.data.text,
                            imagesUrls: message.data.imagesUrls,
                        }
                    };

                    let windowParameters = {
                        url: './share-window/share.html',
                        type: 'panel',
                        width: 600,
                        // height: 800,
                        focused: true,
                    };

                    const createdWindow = await this.createWindow(windowParameters);

                    window['shareData'] = shareData;
                } catch (error) {
                }
            }
        };

        chrome.contextMenus.onClicked.addListener(callback);
    }

    async query(query: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
        return new Promise<any>((resolve, reject) => {
            chrome.tabs.query(query, (tabs) => {
                resolve(tabs);
            });
        });
    }

    async sendMessage(tabs: chrome.tabs.Tab[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'contentInfo'
            }, (message) => {
                resolve(message);
            });
        });
    }

    async createWindow(windowParameters: chrome.windows.CreateData): Promise<chrome.windows.Window> {
        return new Promise((resolve, reject) => {
            chrome.windows.create(windowParameters, (createdWindow) => {
                resolve(createdWindow);
            });
        });
    }

    async removeAll(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            chrome.contextMenus.removeAll(() => {
                resolve();
            });
        });
    }
}