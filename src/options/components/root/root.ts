import API from "../../../api/api";
import Component from "vue-class-component";
import Vue from "vue";


@Component({})
export default class Options extends Vue {
    name: "Options";

    inputName = "";
    inputUrl = "";
    webhooks = [];


    beforeMount() {
        this.loadWebhooks();
        this.$nextTick();

        window.addEventListener('hashchange', (data) => {
            console.log(data);
        });
    }


    loadWebhooks() {
        chrome.storage.sync.get(["webhooks"], data => {
            if (data.webhooks) {
                this.webhooks = JSON.parse(data.webhooks);
            }
        });
    }


    updated() {
        this.loadWebhooks();
        this.$nextTick();
    }

    addWebhook() {
        chrome.storage.sync.get(["webhooks"], data => {
            let list;

            if (data.webhooks) {
                list = JSON.parse(data.webhooks);
            } else {
                list = [];
            }

            if (this.inputName && this.inputUrl) {
                let found = false;

                list.forEach(element => {
                    if (element.title == this.inputName) {
                        element = {
                            title: this.inputName,
                            url: this.inputUrl
                        };

                        found = true;
                    }
                });

                if (!found) {
                    list.push({
                        title: this.inputName,
                        url: this.inputUrl
                    });
                }

                chrome.storage.sync.set({webhooks: JSON.stringify(list)});

                this.clear();

                this.$nextTick();
            }
        });
    }

    deleteWebhook(index) {
        this.webhooks.splice(index, 1);

        chrome.storage.sync.set({webhooks: JSON.stringify(this.webhooks)}, () => {
            this.$nextTick();
        });
    }

    purgeWebhooks() {
        chrome.storage.sync.remove(["webhooks"]);
    }

    clear() {
        this.inputName = "";
        this.inputUrl = "";
    }
}