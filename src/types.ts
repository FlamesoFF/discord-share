export interface IContentInfoMessage {
    type: 'contentInfo',
    data: IContentInfo
}


export namespace App {
    export interface IWebhook {
        title: string
        url: string
    }
}

export namespace Discord {
    export interface IUser {
        id: string;
        username: string;
        discriminator: string;
        avatar: string;
        verified: boolean;
        email: string;
        flags: number;
        premium_type: number;
    }

    export interface IWebhook {
        name: string;
        channel_id: string;
        token: string;
        avatar: null;
        guild_id: string;
        id: string;
        user: IWebhookUser;
    }

    export interface IWebhookUser {
        username: string;
        discriminator: string;
        id: string;
        avatar: string;
    }

    export interface IBotAuthorization {
        token_type: string;
        guild: IGuild;
        access_token: string;
        scope: string;
        expires_in: number;
        refresh_token: string;
    }

    export interface IWebhookParametersEmbeds {
        title?: string
        type?: string
        description?: string
        url?: string
        timestamp?: number
        color?: number
        image?: {
            url?: string
            proxy_url?: string
            height?: number
            width?: number
        }
        thumbnail?: {
            url?: string
            proxy_url?: string
            height?: number
            width?: number
        }
    }

    export interface IWebhookParameters {
        content: string
        username?: string
        avatar_url?: string
        embeds?: IWebhookParametersEmbeds[]
    }


    export interface IGuild {
        mfa_level: number;
        emojis: any[];
        application_id: null;
        name: string;
        roles: IRole[];
        afk_timeout: number;
        system_channel_id: null;
        widget_channel_id: null;
        region: string;
        default_message_notifications: number;
        embed_channel_id: null;
        explicit_content_filter: number;
        splash: null;
        features: any[];
        afk_channel_id: null;
        widget_enabled: boolean;
        verification_level: number;
        owner_id: string;
        embed_enabled: boolean;
        id: string;
        icon: null;
    }

    export interface IGuildTextChannel {
        id: string;
        guild_id: string;
        name: string;
        type: number;
        position: number;
        permission_overwrites: any[];
        rate_limit_per_user: number;
        nsfw: boolean;
        topic: string;
        last_message_id: string;
        parent_id: string;
    }

    export interface IGuildVoiceChannel {
        id: string;
        guild_id: string;
        name: string;
        type: number;
        nsfw: boolean;
        position: number;
        permission_overwrites: any[];
        bitrate: number;
        user_limit: number;
        parent_id: null;
    }

    export interface IRole {
        hoist: boolean;
        name: string;
        mentionable: boolean;
        color: number;
        position: number;
        id: string;
        managed: boolean;
        permissions: number;
    }
}

export interface IMessage {
    content: string
    nonce?: string
    tts?: boolean
    payload_json?: string
    embeds?: IEmbed[]
    file?: ArrayBuffer
}


export interface IEmbedUrl {
    url?: string
}

export interface IEmbedData extends IEmbedUrl {
    height?: number
    width?: number
}

export interface IEmbedField {
    name: string
    value: string
    inline?: boolean
}

export interface IEmbedProvider {
    name?: string
    url?: string
}

export interface IEmbedProxy extends IEmbedData {
    proxy_url?: string
}

export interface IEmbedProxyIcon {
    icon_url?: string
    proxy_icon_url?: string
}

export interface IEmbedAuthor extends IEmbedProxyIcon, IEmbedUrl {
    name?: string
}

export interface IEmbedFooter extends IEmbedProxyIcon {
    text: string
}

export interface IEmbed {
    title?: string
    type?: string
    description?: string
    url?: string
    timestamp?: string
    color?: number
    footer?: IEmbedFooter
    image?: IEmbedProxy
    thumbnail?: IEmbedProxy
    video?: IEmbedData
    provider?: IEmbedProvider
    author?: IEmbedAuthor
    fields?: IEmbedField[]
}