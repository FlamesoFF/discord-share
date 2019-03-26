import axios, { AxiosPromise } from 'axios';
import {
    IDiscordBotAuthorization,
    IDiscordGuild,
    IDiscordGuildTextChannel,
    IDiscordGuildVoiceChannel,
    IDiscordWebhookParameters
} from "../types/globals";

enum STORAGE {
    code = 'authCode',
    token = 'authToken'
}

class AppAPI {
    private readonly clientID = '520220668390932503';
    private readonly clientSecret = 'x-eqwaz5Ty0OFusoWm5iwgHJPSi6CC_3';
    private readonly baseUrl = 'https://discordapp.com/api';
    private readonly botToken = 'NTIwMjIwNjY4MzkwOTMyNTAz.Du6KRw.uAd9Rw0kxrVzUEnN_aNyFBe0B7c';
    private readonly REDIRECT_URI = `${chrome.identity.getRedirectURL()}auth`;


    constructor() {
        chrome.storage.sync.get([STORAGE.token], (data) => {
            const { authToken } = data;

            if (authToken) {
                this.setDefualtHeaders(authToken);
            }
        });
    }

    async authorize() {
        //let code: string;
        let token: string;

        return new Promise((resolve, reject) => {

            chrome.identity.launchWebAuthFlow({
                interactive: !0,
                url: 'https://discordapp.com/api/oauth2/authorize?client_id=520220668390932503&response_type=token&scope=identify+guilds'
            }, async result => {
                console.log(result);

                const token = this.parseToken(result);

                await this.saveToken(token);

                resolve(result);
            })

        });
        // try {
        //     code = await this.getAuthorizationCode();
        // } catch (e) {
        // }

        // token = await this.getAuthorizationToken();

        //if (token && code) {
        // this.setDefualtHeaders(token);
        //await this.saveCode(code);
        return true;
        // } else {
        //     return false;
        // }
    }

    private async getAuthorizationCode(): Promise<string> {
        const params = new URLSearchParams();

        params.set('client_id', this.clientID);
        params.set('redirect_uri', this.REDIRECT_URI);
        params.set('response_type', 'token');
        params.set('scope', 'identify guilds');

        const url = `${this.baseUrl}/oauth2/authorize?${params.toString()}`;

        return new Promise<string>((resolve, reject) => {
            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url
            }, response => {
                let code;

                try {
                    code = response.match(/\?code=(.+)$/i)[1];
                }
                catch (error) {
                    throw 'Unable to parse code.';
                }

                resolve(code);
            });
        });
    }

    private async getAuthorizationToken(): Promise<string> {
        const params = new URLSearchParams();

        console.log(this.REDIRECT_URI);

        params.set('client_id', this.clientID);
        //params.set('redirect_uri', this.REDIRECT_URI);
        params.set('response_type', 'token');
        params.set('scope', 'identify guilds');

        return new Promise<string>((resolve, reject) => {
            const url = `${this.baseUrl}/oauth2/authorize?${params.toString()}`;

            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url: url
            }, function (response) {
                this.parseToken(response);
            });
        });

        // return axios.get(url).then(response => {
        //     let token = response.data.match(/#access_token=([\d\w]+)\&.+$/i)[1];
        //
        //     return Promise.resolve(token);
        // });
    }

    private parseToken(string: string): string {
        let token;

        try {
            token = string.match(/#access_token=([\d\w]+)\&.+$/i)[1];
        }
        catch (error) {
            throw 'Unable to parse token.';
        }

        return token;
    }

    async logOut() {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([STORAGE.token], async (data) => {
                const { authToken } = data;
                const url = `${this.baseUrl}/oauth2/token/revoke?token=${authToken}`;

                const result = await axios.get(url);

                if (result) {
                    const authRemoved = this.removeAuth();
                    if (authRemoved) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                }
            });
        });
    }

    private setDefualtHeaders(token: string): void {
        // Add a request interceptor
        axios.interceptors.request.use(config => {
            // Do something before request is sent
            config.headers.get['Authorization'] = `Bearer ${token}`;

            return config;
        }, (error) => {
            // Do something with request error
            return Promise.reject(error);
        });
    }

    checkAuthorization(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([STORAGE.token], (data) => {
                if (data.authToken) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    private saveToken(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({
                authToken: token
            }, () => {
                resolve();
            });
        });
    }

    private saveCode(code: string): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({
                authCode: code
            }, () => {
                resolve();
            });
        });
    }

    private getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([STORAGE.token], (data) => {
                resolve(data[STORAGE.token]);
            });
        });
    }

    private getCode(): Promise<string> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([STORAGE.code], (data) => {
                resolve(data[STORAGE.code]);
            });
        });
    }

    private removeAuth(): Promise<void> {
        return new Promise((resolve, reject) => {
            let code = false,
                token = false;

            chrome.storage.sync.remove([STORAGE.code], () => {
                code = true;
            });

            chrome.storage.sync.remove([STORAGE.token], () => {
                token = true;
            });

            if (code && token) {
                resolve();
            } else {
                reject();
            }
        });
    }

    authorizeBot(): AxiosPromise<IDiscordBotAuthorization> {
        const url = `${this.baseUrl}/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=1`;

        return axios.get(url);
    }

    /*
    * REST requests
     */

    sendData(hook: string, data: IDiscordWebhookParameters): AxiosPromise<any> {
        const url = `${this.baseUrl}/`;

        return axios.post(hook, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    //static sendAsMessageData(hook: string, data: IDiscordWebhookParameters): AxiosPromise<any> {
    // const url = 'https://discordapp.com/api/webhooks/520221146293993482/TOvCvoYnstKgAlxj3weBdCKxW7i1uvtSnF_VXD3n6UP9YCdTQBX650pKhJlj-dqQaQ_h';

    // return axios.post(hook, data, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
    //}

    async getUserData(): Promise<any> {
        const url = `${this.baseUrl}/users/@me`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${await this.getToken()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    //}

    async getUserGuilds(): Promise<IDiscordGuild[]> {
        const url = `${this.baseUrl}/users/@me/guilds`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${await this.getToken()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    async getGuildChannels(id: string): Promise<(IDiscordGuildTextChannel | IDiscordGuildVoiceChannel)[]> {
        const url = `${this.baseUrl}/guilds/${id}/channels`;
        // const url = `${this.baseUrl}/users/@me/channels`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bot ${await this.getCode()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    async getGuild(id: string = '511273672510799885'): Promise<IDiscordGuild[]> {
        const url = `${this.baseUrl}/guilds/${id}`;
        // const url = `${this.baseUrl}/users/@me/channels`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bot ${await this.getCode()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    async getGuildWebhooks(id: string = '511273672510799885'): Promise<IDiscordGuild[]> {
        const url = `${this.baseUrl}/guilds/${id}/webhooks`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bot ${await this.getToken()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    createChannelWebhook(server) {
        // POST/channels/{channel.id}/webhooks


    }
}

export default new AppAPI();