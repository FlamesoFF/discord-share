import Vue from "vue";
import Component from "vue-class-component";
import API from "../../../api/api";
import {getSharedData} from "../../index";

@Component({})
export default class Share extends Vue {
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
    alert = {
        model: null,
        active: false,
        value: "",
        type: "success"
    };
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


    get contextMenusInfo() {
        if (getSharedData()) {
            return getSharedData().contextMenusInfo;
        }
    }

    get tabInfo() {
        if (getSharedData()) {
            return getSharedData().tabInfo;
        }
    }

    get contentInfo() {
        if (getSharedData()) {
            return getSharedData().contentInfo;
        }
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
            this.imageUrl = getSharedData().contentInfo.imagesUrls[this.imageIndex];
        }
        catch (e) {}
    }

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

    send() {
        let url = this.contextMenusInfo.linkUrl || this.tabInfo.url;

        if (this.webhook.model) {
            if (this.notify && this.notify !== "none") {
                this.comment = `${this.notify} ${this.comment}`;
            }

            API.sendData(this.webhook.model.url, {
                content: this.comment,
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
                    this.showAlert(response.status, "success", () => {
                        this.closeWindow();
                    });
                },
                error => {
                    this.showAlert(error.message, "error");
                }
            );
        } else {
            this.showAlert("Select webhook first!", "warning");
        }
    }

    showAlert(message, type = "info", callback = () => {
    }) {
        this.alert.model = true;
        this.alert.type = type;
        this.alert.value = message;

        setTimeout(() => {
            this.alert.model = false;
            callback();
        }, 2000);
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

    async logOut() {
        await API.logOut();

        this.$router.push('/auth');
    }

    async loadGuildChannels(id) {
        this.channel.list = await API.getGuildChannels(id);
    }

};