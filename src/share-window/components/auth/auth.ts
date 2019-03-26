import Component from "vue-class-component";
import API from '../../../api/api';
import AppView from "../../../shared/AppView";

@Component({})
export default class Auth extends AppView {

    beforeMount() {
        // check authorization
        API.checkAuthorization().then(async result => {

            if (result) {
                this.$router.push('/share');
            }

            // try {
            //     await API.getGuild();
            // } catch (error) {
            //     console.error(error);
            // }
            //
            // try {
            //     await API.getGuildWebhooks();
            // } catch (error) {
            //     console.error(error);
            // }

            this.$nextTick();
        });
    }

    async authorize() {
        try {
            const authorized = await API.authorize();

            if (authorized) {
                this.$router.push('/share');
            }

        } catch (e) {
        }
    }
}