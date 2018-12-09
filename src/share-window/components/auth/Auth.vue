<template>
    <v-app>
        <v-container fluid fill-height>
            <v-layout align-center justify-center row fill-height>

                <v-btn @click="authorize"
                       color="info">
                    Link Discord account
                </v-btn>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script lang="ts" src="./auth.ts"></script>