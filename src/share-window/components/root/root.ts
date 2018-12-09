import Vue from "vue";
import Component from "vue-class-component";
import API from '../../../api/api';

@Component({})
export default class Root extends Vue {
    beforeMount(): void {
        API.checkAuthorization().then(result => {
            if (result) {
                this.$router.push('/share');
            } else {
                this.$router.push('/auth');
            }
        });
    }
}