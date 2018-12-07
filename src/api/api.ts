import axios, {AxiosPromise} from 'axios';

export interface IDiscordWebhookParametersEmbeds {
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

export interface IDiscordWebhookParameters {
    content: string
    username?: string
    avatar_url?: string
    embeds?: IDiscordWebhookParametersEmbeds[]
}

export default abstract class API {
    static sendData(data: IDiscordWebhookParameters): AxiosPromise<any> {
        const url = 'https://discordapp.com/api/webhooks/520221146293993482/TOvCvoYnstKgAlxj3weBdCKxW7i1uvtSnF_VXD3n6UP9YCdTQBX650pKhJlj-dqQaQ_h';

        return axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static detectLargestImage(document: Document) : HTMLElement{
        const list = document.querySelectorAll('img');
        let result : HTMLImageElement = list[0];

        list.forEach((img : HTMLImageElement) => {
            if(img.width > result.width && img.height > result.height){
                result = img;
            }
        });

        return result;
    }
}