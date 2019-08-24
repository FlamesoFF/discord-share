import { appApi } from '@/api/api';
import { Discord } from '@/types';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IStateAuth } from './types';

Vue.use(Vuex);

const store = new class AppStore implements StoreOptions<IStateAuth> {
    strict: true

    state: IStateAuth = {
        user: undefined,
        form: {}
    }

    mutations = {
        
    }

    actions = {
        fetchUser: async (context) => {
            this.state.user = await appApi.getUserData();
            return;
        },

        checkAuthorization: () => {
            return appApi.checkAuthorization();
        },


        logIn: () => {
            return appApi.authorizeAsUser();
        },

        logOut: () => {
            return appApi.logOut();
        }
    }

    getters = {
        user: (): Discord.IUser => {
            return this.state.user;
        },
    }
}

export const $storeAuth = new Vuex.Store<IStateAuth>(store);