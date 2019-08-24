<template>
  <v-toolbar>

    <v-toolbar-side-icon>

      <v-avatar size="32">
        <img :src="userAvatarUrl" />
      </v-avatar>

    </v-toolbar-side-icon>

    <v-toolbar-title>{{ userAvatarUrl }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-btn icon @click="logOut">
        <v-icon>close</v-icon>
      </v-btn>

    </v-toolbar-items>
    
  </v-toolbar>
</template>

<script lang="ts" src="./share-title.ts"></script>

<style scoped></style>