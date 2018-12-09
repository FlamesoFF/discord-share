import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import { default as Vuetify } from "vuetify";
import Options from './components/root/Root.vue';

Vue.use(Vuetify);

new Vue({
    el: '#app',

    template: '</Options>',

    render: h => h(Options)
});
