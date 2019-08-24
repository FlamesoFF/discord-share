import { appApi } from '@/api/api';
import { AppView } from '@/shared/AppView';
import Component from "vue-class-component";
import { $storeAuth } from '@/share-window/store/store.auth';

@Component({})
export default class Auth extends AppView {
    progress = false;

    beforeMount() {
    }

    async authorize() {
        this.progress = true;

        $storeAuth.dispatch('').then(() => {
            this.$router.push('/share');
            this.progress = false;
        });
    }
}