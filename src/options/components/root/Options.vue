<template>
    <v-app>
        <v-content>
            <!-- <v-btn @click="authorize" color="info">Link Discord account</v-btn> -->

            <v-card class="py-2">
                <v-card-title>
                    <h1>Enter new webhook</h1>
                </v-card-title>

                <v-container>
                    <v-text-field v-model="inputName"
                                  label="Webhook name"
                                  maxlength="30"
                                  autofocus
                                  :clearable="true"
                                  required></v-text-field>

                    <v-textarea v-if="inputName.length"
                                v-model="inputUrl"
                                label="Webhook url"
                                :clearable="true"
                                multi-line
                                required></v-textarea>
                </v-container>

                <v-card-actions>
                    <v-btn color="success"
                           @click="addWebhook"
                           :disabled="!inputName.length || !inputUrl.length">
                        Add webhook
                    </v-btn>
                    <v-btn color="info"
                           @click="purgeWebhooks">
                        Purge webhooks
                    </v-btn>
                </v-card-actions>
            </v-card>


            <v-expansion-panel class="py-2">
                <v-expansion-panel-content>
                    <div slot="header" class="subheading">
                        Webhook list
                    </div>

                    <v-list two-line>
                        <template v-for="(item, index) in webhooks">
                            <v-layout align-center justify-space-between row fill-height v-bind:key="index">
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

            <v-alert v-model="alert.model"
                     :type="alert.type"
                     dismissible>
                {{alert.value}}
            </v-alert>
        </v-content>
    </v-app>
</template>

<script lang="ts" src="./options.ts"></script>
<style lang="scss" src="./options.scss"></style>
