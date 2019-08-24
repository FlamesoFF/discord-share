import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { default as Vuetify } from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import { Utils } from "../shared/Utils";
import Auth from './components/auth/auth.vue';
import Root from './components/root/root.vue';
import Share from './components/share/share.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);

Utils.ready().then(() => {
    new Vue({
        el: '#app',
        // template: '<Root/>',
        render: h => h(Root),

        router: new VueRouter({
            routes: [
                { path: '/auth', component: Auth },
                { path: '/share', component: Share }
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