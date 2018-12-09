<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <!-- Info -->
                <v-card>
                    <v-toolbar>
                        <v-toolbar-side-icon>
                            <v-avatar size="32">
                                <img :src="`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`">
                            </v-avatar>
                        </v-toolbar-side-icon>
                        <v-toolbar-title>
                            {{user.username}}
                        </v-toolbar-title>

                    </v-toolbar>

                    <v-img class="white--text main-image" :src="customImageUrl || imageUrl" aspect-ratio="3">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">{{tabInfo.title}}</span>
                                </v-flex>
                            </v-layout>

                            <v-btn absolute dark fab bottom left small color="blue" @click="nextImage">
                                <v-icon>keyboard_arrow_left</v-icon>
                            </v-btn>

                            <v-btn absolute dark fab bottom right small color="blue" @click="prevImage">
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </v-container>
                    </v-img>

                    <v-card-text>
                        <!-- user info -->


                        <!-- custom image -->
                        <div class="py-2">
                            <v-text-field v-model="customImageUrl" label="Custom image URL"></v-text-field>
                        </div>

                        <!-- message -->
                        <div class="py-2">
                            <h3 class="title">Quote</h3>
                            <p class="pt-2">{{contextMenusInfo.selectionText}}</p>
                        </div>

                        <!-- Notify -->
                        <div class="py-2">
                            <h3 class="title">Notify type</h3>

                            <v-combobox
                                    v-model="notify"
                                    :items="notificationTypes"
                                    label="Select a favorite activity or create a new one"
                            ></v-combobox>
                        </div>

                        <!-- comment -->
                        <div class="py-2">
                            <v-textarea
                                    label="Add your comment"
                                    class="body-1"
                                    autofocus
                                    v-model="comment"
                                    multi-line
                                    auto-grow
                                    box
                                    rows="1"
                            ></v-textarea>
                        </div>


                        <!-- Select webhook -->
                        <v-combobox v-model="webhook.model"
                                    :items="webhook.list"
                                    label="Select webhook">

                            <template class="slot"
                                      slot="item"
                                      slot-scope="data">
                                {{data.item.title}}
                            </template>

                            <template class="slot"
                                      slot="selection"
                                      slot-scope="data">
                                {{data.item.title}}
                            </template>

                            <template slot="no-data">
                                <h4>You didn't added any webhook</h4>
                                <p>Use options page to add any</p>
                            </template>

                        </v-combobox>


                        <!--&lt;!&ndash; Select server &ndash;&gt;-->
                        <!--<v-combobox v-model="guild.model"-->
                        <!--:items="guild.list"-->
                        <!--v-if="postType === 1"-->
                        <!--@change="loadGuildChannels(guild.model.id)"-->
                        <!--label="Select server">-->

                        <!--<template class="slot"-->
                        <!--slot="item"-->
                        <!--slot-scope="data">-->
                        <!--<v-avatar size="16">-->
                        <!--<img :src="\`https://cdn.discordapp.com/icons/${data.item.id}/${data.item.icon}.png\`">-->
                        <!--</v-avatar>-->
                        <!--{{data.item.name}}-->
                        <!--</template>-->

                        <!--<template class="slot"-->
                        <!--slot="selection"-->
                        <!--slot-scope="data">-->
                        <!--{{data.item.name}}-->
                        <!--</template>-->

                        <!--<template slot="no-data">-->
                        <!--<h4>You dont't have any servers</h4>-->
                        <!--</template>-->

                        <!--</v-combobox>-->

                        <!--&lt;!&ndash; Select channel &ndash;&gt;-->
                        <!--<v-combobox v-model="channel.model"-->
                        <!--:items="channel.list"-->
                        <!--v-if="guild.model"-->
                        <!--label="Select channel">-->

                        <!--<template class="slot"-->
                        <!--slot="item"-->
                        <!--slot-scope="data">-->
                        <!--{{data.item.title}}-->
                        <!--</template>-->

                        <!--<template class="slot"-->
                        <!--slot="selection"-->
                        <!--slot-scope="data">-->
                        <!--{{data.item.title}}-->
                        <!--</template>-->

                        <!--<template slot="no-data">-->
                        <!--<h4>You dont't have permissions to write in any channels</h4>-->
                        <!--</template>-->

                        <!--</v-combobox>-->
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="success" @click="send">Share</v-btn>
                        <v-btn color="info" @click="logOut">Log out</v-btn>
                    </v-card-actions>
                </v-card>

                <v-alert v-model="alert.model" :type="alert.type">Alert: {{alert.value}}</v-alert>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts" src="./share.ts"></script>

<style lang="scss" src="./share.scss"></style>