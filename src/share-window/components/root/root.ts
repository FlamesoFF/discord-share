import { appApi } from '@/api/api';
import Vue from 'vue';
import Component from 'vue-class-component';
import { $storeApp } from '@/share-window/store/store.app';
import { $storeAuth } from '@/share-window/store/store.auth';


@Component({})
export default class Root extends Vue {
    async beforeMount() {
        await $storeApp.dispatch('fetchShareData');
        await $storeAuth.dispatch('fetchUser')

        $storeAuth.dispatch('checkAuthorization')
            .then(result => {
                if (result) {
                    this.$router.push('/share');
                } else {
                    this.$router.push('/auth');
                }
            });
    }
}