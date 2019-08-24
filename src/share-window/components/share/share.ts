import { $storeApp } from '@/share-window/store/store.app';
import { $storeAuth } from '@/share-window/store/store.auth';
import { $storeShare } from '@/share-window/store/store.share';
import { AppView } from '@/shared/AppView';
import { Utils } from '@/shared/Utils';
import { App, Discord } from '@/types';
import Component from "vue-class-component";
import { AlertTypes } from './../../../shared/AppView';
import ShareImage from './share-image/share-image.vue';
import ShareTitle from './title/share-title.vue';
import { $storeShareImage } from '@/share-window/store/store.share.image';
import { mapGetters } from 'vuex';


interface ISelect<T> {
    model: T
    list: T[]
}

@Component({
    components: {
        'share-title': ShareTitle,
        'share-image': ShareImage,
    }
})
export default class Share extends AppView {
    post = {
        model: undefined,
        list: [
            { id: 0, value: 'Through webhook' },
            { id: 1, value: 'As bot' },
        ],
    };

    set webhook(value: string) {
        $storeShare.commit('webhook', value);
    }
    get webhook() {
        return $storeShare.getters.form.webhook;
    }
    get webhooks() {
        return $storeApp.getters.webhooks;
    }

    set guild(value: Discord.IGuild) {
        $storeShare.commit('guild', value);
    }
    get guild() {
        return $storeShare.getters.form.guild;
    }
    get guilds() {
        return $storeApp.getters.guilds;
    }

    set channel(value: Discord.IGuildTextChannel | Discord.IGuildVoiceChannel) {
        $storeShare.commit('channel', value);
    }
    get channel() {
        return $storeShare.getters.form.channel;
    }
    get channels() {
        return $storeApp.getters.channels;
    }

    set notification(value: string) {
        $storeShare.commit('notification', value);
    }
    get notification() {
        return $storeShare.getters.form.notification;
    }
    get notifications() {
        return $storeApp.getters.notifications;
    }

    set videoUrl(url: string) {
        $storeShare.commit('videoUrl', url);
    }
    get videoUrl() {
        return $storeShare.getters.form.videoUrl;
    }

    set linkUrl(url: string) {
        $storeShare.commit('linkUrl', url);
    }
    get linkUrl() {
        return $storeShare.getters.form.videoUrl;
    }

    set quote(quote: string) {
        $storeShare.commit('quote', quote);
    }
    get quote() {
        return $storeShare.getters.form.quote;
    }

    set comment(comment: string) {
        $storeShare.commit('comment', comment);
    }
    get comment() {
        return $storeShare.getters.form.comment;
    }


    set customImageUrl(value: string) {
        $storeShare.commit('setCustomImageUrl', value);
        $storeShare.commit('setActiveImageUrl', value);
    };
    get customImageUrl() {
        return $storeShareImage.getters.customImageUrl;
    }

    get postType() {
        if (this.post.model && this.post.model.id !== undefined) {
            return this.post.model.id;
        } else {
            return undefined;
        }

    }

    set parsedVideoUrl(value: string) {
        $storeShare.commit('setVideoUrl', value);
    }
    get parsedVideoUrl() {
        return $storeShare.getters.parsedVideoUrl;
    }

    set description(text: string) {
        $storeShare.commit('setDescription', text);
    }
    get description(): string {
        return $storeShare.getters.description;
    }

    // Computed properties
    beforeMount() {
        // load webhooks
        $storeApp.dispatch('fetchWebhooks');
        $storeApp.dispatch('fetchGuilds');

        const shareData: IShareData = $storeApp.getters.shareData;
        const {
            contentInfo: {
                text : quote
            },
            tabInfo: {

            }
         } = shareData;

        this.quote = quote;       
    }


    parseServerIconUri(uri: string) {
        return Utils.getDiscordIconUrl(uri);
    }


    async send() {
        const response = await $storeShare.dispatch('sendMessageToDiscord')
            .catch(error => {
                this.showAlert(error, AlertTypes.error);
            });

        this.showAlert('Successfully shared!', AlertTypes.success, () => {
            this.closeWindow();
        });
    }

    closeWindow() {
        window.close();
    }

    async logOut() {
        $storeAuth.dispatch('logOut').then(() => {
            this.$router.push('/auth');
        });
    }
};