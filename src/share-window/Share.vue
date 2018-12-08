<template>
  <v-app>
    <v-content>
      <v-container fluid>
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
            <!-- message -->
            <div class="py-2">
              <h3 class="title">Message</h3>
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
            <v-combobox v-model="webhook" :items="webhooks" label="Select webhook">
              <template class="slot" slot="item" slot-scope="data">
                {{data.item.title}}
              </template>

              <template class="slot" slot="selection" slot-scope="data">
                {{data.item.title}}
              </template>

              <template slot="no-data">
                <h4>You didn't added any webhook</h4>
                <p>Use options page to add any</p>
              </template>
            </v-combobox>
          </v-card-text>

          <v-card-actions>
            <v-btn color="info" @click="send">Share</v-btn>
            <v-btn color="info" @click="showAlert('test', 'info')">test alert</v-btn>
            <v-btn color="info" @click="closeWindow">Close</v-btn>
          </v-card-actions>
        </v-card>

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
    notify: undefined,
    notificationTypes: ["@everyone", "@here", "none"],
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
        if (this.notify && this.notify !== "none") {
          this.comment = `${this.notify} ${this.comment}`;
        }

        API.sendData({
          content: this.comment,
          embeds: [
            {
              title: this.tabInfo.title,
              description: this.contextMenusInfo.selectionText,
              url,
              image: {
                url: this.contentInfo.largestImageUrl
              }
            }
          ]
        }).then(
          response => {
            this.showAlert(response.status, "success", () => {
              this.closeWindow();
            });
          },
          error => {
            this.showAlert(error.message, "error");
          }
        );
      } else {
        this.showAlert("Select webhook first!", "warning");
      }
    },

    showAlert(message, type = "info", callback = () => {}) {
      this.alert.model = true;
      this.alert.type = type;
      this.alert.value = message;

      setTimeout(() => {
        this.alert.model = false;
        callback();
      }, 2000);
    },

    closeWindow() {
      window.close();
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