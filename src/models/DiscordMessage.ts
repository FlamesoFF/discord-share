import { IEmbed, IEmbedProvider, IEmbedProxy, IMessage, IEmbedData } from "@/types";
import {Utils} from "@shared/Utils";


export class DiscordMessage implements IMessage {
    content: string
    nonce?: string
    tts?: boolean = false
    payload_json?: string
    embeds?: IEmbed[]
    file?: ArrayBuffer

    constructor(params: IMessage) {
        Object.assign(this, { ...params })

        Utils.clearUndefinedProperties(this);
    }
}

export class Embed implements IEmbed {
    title?: string
    type?: string
    description?: string
    url?: string
    timestamp?: string
    color?: number
    provider?: IEmbedProvider
    author?: IEmbedProxy

    constructor(params: IEmbed) {
        Object.assign(this, { ...params });

        Utils.clearUndefinedProperties(this);
    }
}

export class EmbedImage implements IEmbedProxy {
    url?: string
    height?: number
    width?: number

    constructor(params: IEmbedProxy) {
        Object.assign(this, { ...params });

        Utils.clearUndefinedProperties(this);
    }
}

export class EmbedVideo implements IEmbedData {
    url?: string
    height?: number
    width?: number

    constructor(params: IEmbedData) {
        Object.assign(this, { ...params });

        Utils.clearUndefinedProperties(this);
    }
}