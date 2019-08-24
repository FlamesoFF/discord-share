import {ContextMenu} from "./ContextMenu";

abstract class Background {
    private static contextMenu = new ContextMenu();

    static async run() {
        // Check on first launch
        let callback = details => {
            if (details.reason == 'install' || details.reason == 'update') {
                this.checkWebhooks();
            }
        };

        chrome.runtime.onInstalled.addListener(callback);

        await this.contextMenu.initialize();
    }

    // Check webhooks
    private static checkWebhooks() {
        let callback = data => {
            const list = JSON.parse(data.webhooks || '[]');

            if (!list || (list && !list.length)) {
                chrome.tabs.create({'url': `chrome://extensions/?options=${chrome.runtime.id}`});
            }
        };

        chrome.storage.sync.get(["webhooks"], callback);
    }
}


Background.run().then(()=>{
    console.log('Background initialized.');
});