import { appApi } from '@/api/api';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IStateApp } from './types';

Vue.use(Vuex);

const store = new class AppStore implements StoreOptions<IStateApp> {
    strict: true

    state: IStateApp = {
        shareData: undefined,

        lists: {
            webhooks: [],
            guilds: [],
            channels: [],
            notifications: [
                "@everyone",
                "@here",
                "none"
            ]
        }
    }

    actions = {
        fetchWebhooks: (context) => {
            chrome.storage.sync.get(
                ["webhooks"], data => {
                    if (data) {
                        this.state.lists.webhooks = JSON.parse(data.webhooks);
                    }
                }
            );
        },

        fetchGuilds: async (context) => {
            this.state.lists.guilds = await appApi.getUserGuilds();
        },

        fetchGuildsChannels: async (context, id: string) => {
            this.state.lists.channels = await appApi.getGuildChannels(id);
        },

        fetchShareData: () => {
            return new Promise((resolve, reject) => {
                chrome.runtime.getBackgroundPage(({ shareData }: IBackgroundPage) => {
                    this.state.shareData = shareData;
                    resolve();
                });
            });
        }
    }

    mutations = {
        setShareData: (state: IStateApp, payload: IShareData) => {
            this.state.shareData = payload;
        }
    }

    getters = {
        shareData: (): IShareData => {
            return this.state.shareData;
        },

        imagesUrls: (): string[] => {
            return this.state.shareData.contentInfo.imagesUrls;
        },

        webhooks: () => {
            return this.state.lists.webhooks;
        },

        guilds: () => {
            return this.state.lists.guilds;
        },

        channels: () => {
            return this.state.lists.channels;
        },

        notificationTypes: () => {
            return this.state.lists.notifications;
        }
    }
};

export const $storeApp = new Vuex.Store<IStateApp>(store);