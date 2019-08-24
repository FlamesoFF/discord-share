import { Discord, App } from '@/types'


export interface IStateApp {
    shareData: IShareData

    lists: {
        webhooks: App.IWebhook[]
        guilds: Discord.IGuild[]
        channels: (Discord.IGuildTextChannel | Discord.IGuildVoiceChannel)[]
        notifications: string[]
    }
}

export interface IStateShare {
    form: {
        videoUrl: string
        linkUrl: string
        quote: string
        comment: string
        webhook: App.IWebhook
        notification: string
    }
}

export interface IStateShareImage {
    title: string,
    activeImageUrl: string
    customImageUrl: string
    imageIndex: number
}

export interface IStateShareTitle {
    userAvatarUrl: string
    userName: string
}

export interface IStateAuth {
    user: Discord.IUser

    form: {}
}


export interface IMessagePayload {
    webhook: App.IWebhook
}