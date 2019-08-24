import Vue from "vue";

export enum AlertTypes {
    success = 'success',
    info = 'info',
    warning = 'warning',
    error = 'error',
}

export class AppView extends Vue {
    alert = {
        model: null,
        active: false,
        value: "",
        type: "success"
    };

    showAlert(message, type = AlertTypes.info, callback = () => {
    }) {
        this.alert.model = true;
        this.alert.type = type;
        this.alert.value = message;

        setTimeout(() => {
            this.alert.model = false;
            callback();
        }, 2000);
    }
}