import { Utils } from '@/shared/Utils';
import Vue from "vue";
import Component from "vue-class-component";
import { $storeShare } from '@/share-window/store/store.share';
import { $storeShareImage } from '@/share-window/store/store.share.image';
import { $storeApp } from '@/share-window/store/store.app';

@Component({
    name: 'share-image',
})
export default class ShareImage extends Vue {
    get url(){
        return this.activeImageUrl || this.urls[0]
    }
    
    get urls(){
        return $storeApp.getters.imagesUrls;
    }

    get title() {
        return $storeShareImage.getters.title;
    }

    get activeImageUrl() {
        return $storeShareImage.getters.activeImageUrl;
    }

    
    beforeMount() {
        const url = this.urls[0];

        $storeShareImage.commit('activeImageUrl', url);
    }

    nextImage() {
        $storeShareImage.dispatch('nextImage');
    }

    prevImage() {
        $storeShareImage.dispatch('prevImage');
    }

    onError(url: string) {
        const parsed = Utils.processImageUrl(url);

        if (url) {
            $storeShareImage.commit('activeImageUrl', parsed);
        }
        else {
            $storeShareImage.commit('activeImageUrl', this.urls[0]);
        }
    }
};