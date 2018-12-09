<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <!-- <v-btn @click="authorize" color="info">Link Discord account</v-btn> -->

                <v-card class="pt-2">
                    <v-card-title>
                        <h1>Enter new webhook</h1>
                    </v-card-title>

                    <v-container>
                        <v-text-field v-model="inputName" label="Webhook name" required></v-text-field>
                        <v-text-field v-if="inputName" v-model="inputUrl" label="Webhook url" required></v-text-field>
                    </v-container>

                    <v-card-actions>
                        <v-btn color="success" @click="addWebhook">Add webhook</v-btn>
                        <v-btn color="info" @click="purgeWebhooks">Purge webhooks</v-btn>
                    </v-card-actions>
                </v-card>


                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <div slot="header" class="subheading">
                            Webhook list
                        </div>

                        <v-list two-line>
                            <template v-for="(item, index) in webhooks">
                                <v-layout align-center justify-space-between row fill-height>
                                    <v-subheader v-if="item.title" :key="item.title">{{ item.title }}</v-subheader>

                                    <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

                                    <v-list-tile v-else :key="item.title" avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.title"></v-list-tile-title>

                                        </v-list-tile-content>

                                    </v-list-tile>

                                    <v-btn flat icon color="gray" @click="deleteWebhook(index)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-layout>
                            </template>
                        </v-list>


                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts" src="./root.ts"></script>
<style lang="scss" src="./root.scss"></style>
