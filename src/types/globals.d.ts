import Vue from 'vue';


interface IContentInfo {
    imagesUrls: string[]
}

interface IContentInfoMessage {
    type: 'contentInfo',
    data: IContentInfo
}

interface IShareData {
    contextMenusInfo: chrome.contextMenus.OnClickData,
    tabInfo: chrome.tabs.Tab,
    contentInfo: IContentInfo
}

interface IDiscordWebhookParametersEmbeds {
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

interface IDiscordWebhookParameters {
    content: string
    username?: string
    avatar_url?: string
    embeds?: IDiscordWebhookParametersEmbeds[]
}

interface Guild {
    mfa_level: number;
    emojis: any[];
    application_id: null;
    name: string;
    roles: Role[];
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

interface Role {
    hoist: boolean;
    name: string;
    mentionable: boolean;
    color: number;
    position: number;
    id: string;
    managed: boolean;
    permissions: number;
}

interface IDiscordBotAuthorization {
    token_type: string;
    guild: Guild;
    access_token: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

interface IDiscordGuild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
}

interface IDiscordGuildTextChannel {
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

interface IDiscordGuildVoiceChannel {
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

interface IDiscordWebhook {
    name: string;
    channel_id: string;
    token: string;
    avatar: null;
    guild_id: string;
    id: string;
    user: IDiscordWebhookUser;
}

interface IDiscordWebhookUser {
    username: string;
    discriminator: string;
    id: string;
    avatar: string;
}