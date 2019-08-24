import { appApi } from '@/api/api';
import { DiscordMessage, Embed, EmbedImage, EmbedVideo } from '@/models/DiscordMessage';
import { Utils } from '@/shared/Utils';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { $storeApp } from './store.app';
import { $storeAuth } from './store.auth';
import { IStateShare } from './types';
import { $storeShareImage } from './store.share.image';
import { App } from '@/types';

Vue.use(Vuex);

const store = new class AppStore implements StoreOptions<IStateShare> {
    strict: true

    state: IStateShare = {
        form: {
            videoUrl: '',
            linkUrl: '',
            quote: '',
            comment: '',
            notification: '',
            webhook: undefined
        }
    }


    getters = {
        form: () => {
            return this.state.form;
        },

        parsedVideoUrl: (): string => {
            return Utils.parseYouTubeUrl(this.state.form.videoUrl);
        },

    }

    mutations = {
        videoUrl: (state: IStateShare, payload: string) => {
            this.state.form.videoUrl = payload;
        },

        linkUrl: (state: IStateShare, payload: string) => {
            this.state.form.linkUrl = payload;
        },

        quote: (state: IStateShare, text: string) => {
            this.state.form.quote = text;
        },

        comment: (state: IStateShare, text: string) => {
            if (text && text.length > 2000) {
                text = text.slice(0, 2000);
            }

            this.state.form.comment = text;
        },

        notification: (state: IStateShare, text: string) => {
            this.state.form.notification = text;
        },

        webhook: (state: IStateShare, value: App.IWebhook) => {
            this.state.form.webhook = value;
        }
    }

    actions = {
        sendMessageToDiscord: async (data) => {
            const {
                linkUrl,
                pageUrl,
                frameUrl,
                srcUrl,
                selectionText
            } = $storeApp.getters.shareData.contextMenusInfo;

            const {
                comment: description,
                notification,
                videoUrl,
                webhook
            } = this.state.form;

            const { activeImageUrl }  = $storeShareImage.getters;

            const {
                username,
                id,
                avatar
            } = $storeAuth.state.user;

            const url = linkUrl || pageUrl || frameUrl || srcUrl || $storeApp.state.shareData.tabInfo.url;


            if (!this.state.form.webhook) {
                throw "Select webhook first!";
            }


            let content: string;
            const notificationType = this.state.form.notification;

            if (notificationType && notificationType !== "none") {
                content = `${notificationType} ${this.state.form.comment}`;
            }

            const message = new DiscordMessage({
                content,
                embeds: [
                    new Embed({
                        title: $storeApp.state.shareData.tabInfo.title,
                        type: 'video',

                        description: selectionText,
                        url,
                        author: {
                            name,
                            icon_url: Utils.getDiscordAvatar(id, avatar)
                        },
                        image: new EmbedImage({
                            url: activeImageUrl
                        }),
                        video: new EmbedVideo({
                            url: videoUrl,
                            height: 200,
                            width: 300
                        })
                    })
                ]
            });

            return appApi.sendData(webhook.url, message);
        }
    }
}

export const $storeShare = new Vuex.Store<IStateShare>(store);