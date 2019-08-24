<template>
  <v-app>
    <v-content fluid>
      <!-- Info -->
      <v-card>
        <!-- ShareTitle -->
        <share-title></share-title>`

        <!-- Image -->
        <share-image></share-image>

        <!-- Video -->
        <div class="py-1">
          <iframe
            width="100%"
            height="200"
            v-if="parsedVideoUrl"
            :src="parsedVideoUrl"
          ></iframe>
        </div>

        <v-card-text>
          <!-- user info -->
          <!-- custom image -->
          <div class="py-1">
            <v-text-field
              v-model="customImageUrl"
              label="Custom image URL"
            ></v-text-field>
          </div>

          <!-- custom video url -->
          <v-text-field
            v-model="videoUrl"
            label="YouTube Video URL"
          ></v-text-field>

          <!-- Quote -->
          <div class="py-1" v-if="quote">
            <h4 class="title">Quote</h4>

            <p class="pt-2 share-quote-text">
              {{ quote }}
            </p>
          </div>

          <!-- link -->
          <div class="py-1">
            <v-text-field
              v-if="linkUrl"
              v-model="linkUrl"
              label="Link"
              disabled="true"
            ></v-text-field>
          </div>

          <!-- Notify -->
          <v-combobox
            v-model="notification"
            :items="notifications"
            label="Notify type"
          ></v-combobox>

          <!-- comment -->
          <div class="py-1">
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
          <v-combobox
            v-model="webhook"
            :items="webhooks"
            label="Select webhook"
          >
            <template class="slot" slot="item" slot-scope="data">{{
              data.item.title
            }}</template>

            <template class="slot" slot="selection" slot-scope="data">{{
              data.item.title
            }}</template>

            <template slot="no-data">
              <h4>You didn't added any webhook</h4>
              <p>Use options page to add any</p>
            </template>
          </v-combobox>

          <!-- Select server -->
          <v-combobox
            v-model="guild"
            :items="guilds"
            label="Select server"
          >
            <template class="slot" slot="item" slot-scope="data">
              <v-icon :src="parseServerIconUri(data.item.icon)"></v-icon>
              <span>{{ data.item.name }}</span>
            </template>

            <template class="slot" slot="selection" slot-scope="data">
              <v-icon :src="data.item.icon"></v-icon>
              <span>{{ data.item.name }}</span>
            </template>

            <template slot="no-data">
              <h4>No servers found</h4>
              <p>Use options page to add any</p>
            </template>
          </v-combobox>

          <!-- Select channel -->
          <v-combobox
            v-if="guild"
            v-model="channel"
            :items="channels"
            label="Select channnel"
          >
            <template class="slot" slot="item" slot-scope="data">{{
              data.item.title
            }}</template>

            <template class="slot" slot="selection" slot-scope="data">{{
              data.item.title
            }}</template>

            <template slot="no-data">
              <h4>You didn't added any webhook</h4>
              <p>Use options page to add any</p>
            </template>
          </v-combobox>
        </v-card-text>

        <v-card-actions>
          <v-btn color="info" @click="send" :disabled="!webhook"
            >Share</v-btn
          >
          <v-btn color="error" @click="logOut">Log out</v-btn>
        </v-card-actions>
      </v-card>

      <v-alert v-model="alert.model" :type="alert.type" dismissible>{{
        alert.value
      }}</v-alert>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./share.ts"></script>

<style lang="scss" src="./share.scss"></style>