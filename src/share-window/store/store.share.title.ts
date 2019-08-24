import { Utils } from '@/shared/Utils';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { $storeAuth } from './store.auth';
import { IStateShareTitle } from './types';

Vue.use(Vuex);

const store = new class AppStore implements StoreOptions<IStateShareTitle> {
    strict: true

    state: IStateShareTitle = {
        userAvatarUrl: '',
        userName: ''
    }


    getters = {
        userAvatarUrl: () => {
            const { id, avatar } = $storeAuth.state.user;
            return Utils.getDiscordAvatar(id, avatar);
        }
    }

    mutations = {
        nextImage: () => {

        },

        prevImage: () => {

        }
    }

    actions = {

    }
}

export const $storeTitle = new Vuex.Store<IStateShareTitle>(store);