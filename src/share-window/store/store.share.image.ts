import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IStateShareImage } from './types';
import { $storeApp } from './store.app';

Vue.use(Vuex);

const store = new class AppStore implements StoreOptions<IStateShareImage> {
    strict: true

    state: IStateShareImage = {
        title: '',
        activeImageUrl: '',
        customImageUrl: '',
        imageIndex: 0
    }


    getters = {
        title: () => {
            return this.state.title;
        },

        customImageUrl: (): string => {
            return this.state.customImageUrl;
        },

        activeImageUrl: () => {
            return this.state.activeImageUrl;
        }
    }

    mutations = {
        nextImage: () => {
            const { imagesUrls} = $storeApp.state.shareData.contentInfo;

            if (imagesUrls[this.state.imageIndex + 1]) {
                this.state.imageIndex++;

                this.state.activeImageUrl = imagesUrls[this.state.imageIndex];
            }
        },

        prevImage: () => {
            const { imagesUrls } = $storeApp.state.shareData.contentInfo;

            if (imagesUrls[this.state.imageIndex - 1]) {
                this.state.imageIndex--;

                this.state.activeImageUrl = imagesUrls[this.state.imageIndex];
            }
        },

        activeImageUrl: (state, url: string) => {
            this.state.activeImageUrl = url;
        },

        customImageUrl: (state, url: string) => {
            this.state.customImageUrl = url;
        }
    }

    actions = {

    }
}

export const $storeShareImage = new Vuex.Store<IStateShareImage>(store);