import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {default as Vuetify} from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import {Utils} from "@shared/Utils";
import Root from './components/root/root.vue';
import {router} from "@/share-window/router";

Vue.use(VueRouter);
Vue.use(Vuetify);

Utils.ready().then(() => {
    new Vue({
        el: '#app',
        // template: '<Root/>',
        render: h => h(Root),

        router,

        beforeCreate() {
            this.$router.push('/auth');

            window.addEventListener("beforeunload", function (e) {
                e.preventDefault();
            }, false);
        }
    });
});