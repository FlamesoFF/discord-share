import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import VueRouter from 'vue-router'
import {default as Vuetify} from "vuetify";
import Root from "./components/root/Root.vue";
import Auth from "./components/auth/Auth.vue";
import Share from "./components/share/Share.vue";
import {IShareData} from "../types/globals";


Vue.use(VueRouter);
Vue.use(Vuetify);

interface IBackgroundPage extends Window{
    shareData: IShareData
}

export let getSharedData: () => IShareData;

chrome.runtime.getBackgroundPage((bgPage: IBackgroundPage) => {
    getSharedData = () => {
        return bgPage['shareData'];
    };
    console.log(getSharedData());

    new Vue({
        el: '#root',

        template: '<Root/>',

        render: h => h(Root),

        router: new VueRouter({
            routes: [
                {path: '/auth', component: Auth},
                {path: '/share', component: Share}
            ] // short for `routes: routes`
        }),

        beforeCreate() {
            this.$router.push('/auth');

            window.addEventListener("beforeunload", function (e) {
                e.preventDefault();
            }, false);
        }
    });
});