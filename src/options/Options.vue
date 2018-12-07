<template>
    <v-app>
        <v-content>

            <v-card class="">
                <v-toolbar-title>Enter new webhook</v-toolbar-title>

                <v-text-field
                        v-model="inputName"
                        label="Webhook name"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="inputUrl"
                        label="Webhook url"
                        required
                ></v-text-field>

                <v-btn color="success" @click="addWebhook">Add webhook</v-btn>
            </v-card>

            <v-card>
                <v-toolbar-title>Webhooks</v-toolbar-title>

                <v-list two-line>
                    <template v-for="(item, index) in webhooks">
                        <v-subheader
                                v-if="item.title"
                                :key="item.title"
                        >
                            {{ item.title }}
                        </v-subheader>

                        <v-divider
                                v-else-if="item.divider"
                                :inset="item.inset"
                                :key="index"
                        ></v-divider>

                        <v-list-tile
                                v-else
                                :key="item.title"
                                avatar
                                @click=""
                        >
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.url"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>

            </v-card>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'Options',

        data: () => ({
            inputName: '',
            inputUrl: '',
            webhooks: []
        }),


        computed: {},

        beforeMount() {
            this.loadWebhooks();
        },

        methods: {
            loadWebhooks() {
                chrome.storage.sync.get([ 'webhooks' ], ( data ) => {
                    if ( data.webhooks ) {
                        this.webhooks = JSON.parse(data.webhooks);
                    }
                });
            },

            addWebhook() {
                chrome.storage.sync.get([ 'webhooks' ], ( data ) => {
                    let list

                    if ( data.webhooks ) {
                        list = JSON.parse(data.webhooks);
                    }
                    else {
                        list = [];
                    }

                    list.push({
                        title: this.inputName,
                        url: this.inputUrl
                    });

                    chrome.storage.sync.set({ webhooks: JSON.stringify(list) });

                    this.clear();
                });
            },

            clear() {
                this.inputName = '';
                this.inputUrl = '';
            }
        }
    }

</script>

<style lang="scss">
    html, body {
        width: 500px;
        height: auto;
        margin: 0;
        padding: 0;
    }

    .content {
        padding: 20px;
    }
</style>
