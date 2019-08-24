<template>
    <v-app>
        <v-container fluid fill-height>
            <v-layout align-center justify-center row fill-height>

                <v-btn @click="authorize"
                       v-if="!progress"
                       color="info">
                    Link Discord account
                </v-btn>

                <v-progress-circular
                        v-if="progress"
                        indeterminate
                        color="primary"
                ></v-progress-circular>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script lang="ts" src="./auth.ts"></script>