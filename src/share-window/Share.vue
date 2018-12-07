<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <h1 class="display-1 pb-2">Share to Discord</h1>

        <!-- Info -->
        <v-card>
          <v-img class="white--text" :src="contentInfo.largestImageUrl" aspect-ratio="3">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{tabInfo.title}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>

          <v-card-text>
            <div class="py-2">
              <h3 class="title">Message</h3>
              <p class="pt-2">{{contextMenusInfo.selectionText}}</p>
            </div>

            <div class="py-2">
              <h3 class="title">Url</h3>
              <p class="pt-2">
                <a :href="url">{{contextMenusInfo.pageUrl}}</a>
              </p>
            </div>

            <div class="py-2">
              <span class="title">Add your comment</span>
              <v-text-field class="body-1" autofocus v-model="comment" multi-line="3"></v-text-field>
            </div>
          </v-card-text>
        </v-card>

        <!-- Select webhook -->
        <v-combobox v-model="webhook" :items="webhooks" label="Select webhook">
          <template class="slot" slot="item" slot-scope="data">
            <span>{{data.item.title}}</span>
            <span class="url">{{data.item.url}}</span>
          </template>

          <template class="slot" slot="selection" slot-scope="data">
            <p class="url">{{data.item.title}}</p>
          </template>

          <template slot="no-data">
            <h4>You didn't added any webhook</h4>
            <p>Use options page to add any</p>
          </template>
        </v-combobox>

        <v-btn color="success" @click="send">Share</v-btn>
        <v-btn color="success" @click="showAlert('test', 'info')">test alert</v-btn>

        <v-alert v-model="alert.model" :type="alert.type">Alert: {{alert.value}}</v-alert>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import API from "../api/api";
import { setTimeout } from "timers";

export default {
  name: "App",

  data: () => ({
    webhook: undefined,
    webhooks: [],
    comment: "",
    alert: {
      model: undefined,
      active: false,
      value: "",
      type: "success"
    }
  }),

  computed: {
    contextMenusInfo: {
      get() {
        if (window.bgPage) {
          return window.bgPage.data.contextMenusInfo;
        }
      }
    },

    tabInfo: {
      get() {
        if (window.bgPage) {
          return window.bgPage.data.tabInfo;
        }
      }
    },

    contentInfo: {
      get() {
        if (window.bgPage) {
          return window.bgPage.data.contentInfo;
        }
      }
    }
  },

  beforeMount() {
    this.loadWebhooks();
  },

  methods: {
    loadWebhooks() {
      chrome.storage.sync.get(["webhooks"], data => {
        if (data.webhooks) {
          this.webhooks = JSON.parse(data.webhooks);
        }
      });
    },

    send() {
      let url = this.contextMenusInfo.linkUrl || this.tabInfo.url;

      if (this.webhook) {
        API.sendData({
          content: this.comment,
          embeds: [
            {
              title: this.tabInfo.title,
              description: this.contextMenusInfo.selectionText,
              url,
              thumbnail: {
                url: this.tabInfo.favIconUrl,
                width: 32,
                height: 32
              },
              image: {
                url: this.contentInfo.largestImageUrl
              }
            }
          ]
        }).then(
          response => {
            this.showAlert(response.status, "success");
          },
          error => {
            this.showAlert(error.message, "error");
          }
        );
      } else {
        this.showAlert('Select webhook first!', 'warning');
      }
    },

    showAlert(message, type = "info") {
      this.alert.model = true;
      this.alert.type = type;
      this.alert.value = message;

      setTimeout(() => {
        this.alert.model = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;

  .slot {
    .url {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .headline {
    text-shadow: 1px 1px 6px black;
  }
}
</style>