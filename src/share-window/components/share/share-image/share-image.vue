<template>
  <v-img
    class="white--text main-image"
    :src="url"
    aspect-ratio="3"
    @error="onError"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">{{ title }}</span>
        </v-flex>
      </v-layout>

      <v-btn
        absolute
        dark
        fab
        bottom
        left
        small
        color="blue"
        @click="prevImage"
      >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>

      <v-btn
        absolute
        dark
        fab
        bottom
        right
        small
        color="blue"
        @click="nextImage"
      >
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-container>

    <span> image url :</span>
    <span v-if="activeImageUrl">{{ activeImageUrl }}</span>
  </v-img>
</template>

<script lang="ts" src="./share-image.ts"></script>

<style scoped></style>