import Component from "vue-class-component";
import API from "../../../api/api";
import {getSharedData} from "../../index";
import {IShareData} from "../../../types/globals";
import AppView, {AlertTypes} from "../../../shared/AppView";

@Component({})
export default class Share extends AppView {
    post = {
        model: undefined,
        list: [
            {id: 0, value: 'Through webhook'},
            {id: 1, value: 'As bot'},
        ],
    };
    webhook = {
        model: null,
        list: []
    };
    guild = {
        model: null,
        list: []
    };
    channel = {
        model: null,
        list: []
    };
    comment = "";
    notify = null;
    notificationTypes = ["@everyone", "@here", "none"];
    imageIndex = 0;
    imageUrl = "";
    customImageUrl = "";
    user = {
        id: "",
        username: "",
        discriminator: "",
        avatar: "",
        verified: null,
        email: "",
        flags: null,
        premium_type: null
    };


    get contextMenusInfo(): IShareData['contextMenusInfo'] {
        return getSharedData().contextMenusInfo;
    }

    get tabInfo(): IShareData['tabInfo'] {
        return getSharedData().tabInfo;
    }

    get contentInfo(): IShareData['contentInfo'] {
        return getSharedData().contentInfo;
    }

    get postType() {
        if (this.post.model && this.post.model.id !== undefined) {
            return this.post.model.id;
        } else {
            return undefined;
        }

    }

    beforeMount() {
        // load webhooks
        chrome.storage.sync.get(["webhooks"], data => {
            if (data.webhooks) {
                this.webhook.list = JSON.parse(data.webhooks);
                this.webhook.model = this.webhook.list[0];

                this.$nextTick();
            }
        });

        this.preloadData();

        try {
            this.imageUrl = this.contentInfo.imagesUrls[this.imageIndex];
        } catch (e) {
        }
    }

    send() {
        let url = this.contextMenusInfo.linkUrl || this.tabInfo.url;

        if (this.webhook.model) {
            let content: string;

            if (this.notify && this.notify !== "none") {
                content = `${this.notify} ${this.comment}`;
            }

            API.sendData(this.webhook.model.url, {
                content,
                embeds: [
                    {
                        title: this.tabInfo.title,
                        description: this.contextMenusInfo.selectionText,
                        url,
                        image: {
                            url: this.customImageUrl || this.imageUrl
                        }
                    }
                ]
            }).then(
                response => {
                    this.showAlert('Successfully shared!', AlertTypes.success, () => {
                        this.closeWindow();
                    });
                },
                error => {
                    this.showAlert('Unable to share. Check your webhooks list!', AlertTypes.error);
                }
            );
        } else {
            this.showAlert("Select webhook first!", AlertTypes.warning);
        }
    }

    closeWindow() {
        window.close();
    }

    nextImage() {
        if (
            this.contentInfo.imagesUrls &&
            this.contentInfo.imagesUrls[this.imageIndex + 1]
        ) {
            this.imageUrl = this.contentInfo.imagesUrls[this.imageIndex + 1];
            this.imageIndex++;
        }
    }

    prevImage() {
        if (
            this.contentInfo.imagesUrls &&
            this.contentInfo.imagesUrls[this.imageIndex - 1]
        ) {
            this.imageUrl = this.contentInfo.imagesUrls[this.imageIndex - 1];
            this.imageIndex--;
        }
    }

    validateQuoteText(str: string): string {
        if (str && str.length > 2000) {
            this.showAlert('Max quote length: 2000 symbols!', AlertTypes.error);

            return str.slice(0, 2000);
        }

        return str;
    }

    // async
    async preloadData() {
        try {
            this.guild.list = await API.getUserGuilds();
        } catch (error) {
            console.error(error);
        }

        try {
            this.user = await API.getUserData();
        } catch (error) {
            console.error(error);
        }
    }

    async logOut() {
        await API.logOut();

        this.$router.push('/auth');
    }

    async loadGuildChannels(id) {
        this.channel.list = await API.getGuildChannels(id);
    }

};