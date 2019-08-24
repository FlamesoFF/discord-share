import { $storeAuth } from '@/share-window/store/store.auth';
import { $storeTitle } from '@/share-window/store/store.share.title';
import Vue from "vue";
import Component from "vue-class-component";

@Component({
    name: 'share-title'
})
export default class ShareTitle extends Vue {
    get userAvatarUrl() {
        return $storeTitle.getters.userAvatarUrl;
    }

    get userName() {
        return $storeAuth.getters.user.username;
    }


    logOut() {
        $storeAuth.dispatch('logOut').then(() => {
            this.$router.push('/auth');
        });
    }
};