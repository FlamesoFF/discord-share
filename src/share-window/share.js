import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import { default as Vuetify } from "vuetify";
import App from './Share.vue';

Vue.use(Vuetify);

// document.onreadystatechange = () => {
//     if ( document.readyState === 'complete' ) {

chrome.runtime.getBackgroundPage(( bgPage ) => {
    window.bgPage = bgPage;
    console.log(bgPage.data);

    new Vue({
        el: '#app',

        template: '</App>',

        render: h => h(App),

        beforeCreate(){
            window.addEventListener("beforeunload", function(e){
                e.preventDefault();
            }, false);
        }
    });
});

//     }
// }
