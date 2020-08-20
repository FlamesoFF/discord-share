import { API } from '@/shared/constants';
import axios, { AxiosPromise } from 'axios';
import { DiscordMessage } from '@/models/DiscordMessage';
import { Discord } from '@/types';

enum STORAGE {
    code = 'authCode',
    token = 'authToken'
}

const appApi = new class AppApi {
    private readonly URL = `https://discordapp.com/api/oauth2/authorize?client_id=${API.CLIENT_ID}&response_type=token&scope=${API.SCOPE}`;

    constructor() {
        chrome.storage.sync.get([STORAGE.token], (data) => {
            const { authToken } = data;

            if (authToken) {
                this.setDefualtHeaders(authToken);
            }
        });
    }

    async authorize(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                chrome.identity.launchWebAuthFlow({
                    interactive: !0,
                    url: this.URL
                }, async (result: string) => {
                    try {
                        const token = await this.parseAndSaveToken(result);
                    } catch (error) {
                        reject(error);
                    }
                });
            } catch (error) {
                throw error;
            }
        });
    }

    async getAuthorizationCode(): Promise<string> {
        const params = new URLSearchParams();

        params.set('client_id', API.CLIENT_ID);
        params.set('redirect_uri', API.REDIRECT_URI);
        params.set('response_type', 'token');
        params.set('scope', 'identify guilds');

        const url = `${API.BASE_URL}/oauth2/authorize?${params.toString()}`;

        return new Promise<string>((resolve, reject) => {
            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url
            }, response => {
                let code;

                try {
                    code = response.match(/\?code=(.+)$/i)[1];
                } catch (error) {
                    throw 'Unable to parse code.';
                }

                resolve(code);
            });
        });
    }

    async authorizeAsUser(): Promise<boolean> {
        const params = new URLSearchParams({
            client_id: API.CLIENT_ID,
            response_type: 'token',
            scope: 'identify messages.read'
        }).toString();

        return new Promise<boolean>((resolve, reject) => {
            const url = `${API.BASE_URL}/oauth2/authorize?${params}`;

            chrome.identity.launchWebAuthFlow({
                interactive: true,
                url: url
            }, async (response) => {
                if (response) {
                    try {
                        await this.parseAndSaveToken(response);
                        resolve(true);
                    }
                    catch (error) {
                        reject(false);
                    }
                } else {
                    reject(false);
                }
            });
        });

        // return axios.get(url).then(response => {
        //     let token = response.data.match(/#access_token=([\d\w]+)\&.+$/i)[1];
        //
        //     return Promise.resolve(token);
        // });
    }

    private async parseAndSaveToken(string: string): Promise<string> {
        let token, tokenType;

        try {
            const [
                ,
                match1,
                match2,
            ] = string.match(/#token_type=(\w+)&access_token=([\d\w]+)\&.+$/i);

            tokenType = match1;
            token = match2;
        } catch (error) {
            throw 'Unable to parse token.';
        }

        if (token) {
            await this.saveToken(token);
            await this.saveTokenType(tokenType);
        }

        return token;
    }

    async logOut(): Promise<boolean> {
        const authRemoved = await this.removeAuth();

        if (authRemoved) {
            return true;
        } else {
            return false;
        }
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

    async checkAuthorization(): Promise<boolean> {
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

    private saveTokenType(tokenType: string): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({
                authTokenType: tokenType
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

    private async removeAuth(): Promise<boolean> {
        let codeDeleted = false,
            tokenDeleted = false;

        try {
            codeDeleted = await new Promise((resolve, reject) => {
                chrome.storage.sync.remove(STORAGE.code, () => {
                    if (!chrome.runtime.lastError) {
                        resolve(true);
                    }
                    else {
                        reject();
                    }
                });
            });
        }
        catch (error) { }

        try {
            tokenDeleted = await new Promise((resolve, reject) => {
                chrome.storage.sync.remove(STORAGE.token, () => {
                    if (!chrome.runtime.lastError) {
                        resolve(true);
                    }
                    else {
                        reject();
                    }
                });
            });
        } catch (error) { }

        return codeDeleted && tokenDeleted;
    }

    authorizeBot(): AxiosPromise<Discord.IBotAuthorization> {
        const url = `${API.BASE_URL}/oauth2/authorize?client_id=157730590492196864&scope=bot&permissions=1`;

        return axios.get(url);
    }

    /*
    * REST requests
     */

    sendData(hook: string, data: DiscordMessage): AxiosPromise<any> {
        return axios.post(hook, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    //static sendAsMessageData(hook: string, data: IWebhookParameters): AxiosPromise<any> {
    // const url = 'https://discordapp.com/api/webhooks/520221146293993482/TOvCvoYnstKgAlxj3weBdCKxW7i1uvtSnF_VXD3n6UP9YCdTQBX650pKhJlj-dqQaQ_h';

    // return axios.post(hook, data, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
    //}

    async getUserData(): Promise<Discord.IUser> {
        const url = `${API.BASE_URL}/users/@me`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${await this.getToken()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    //}

    async getUserGuilds(): Promise<Discord.IGuild[]> {
        const url = `${API.BASE_URL}/users/@me/guilds`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${await this.getToken()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    async getGuildChannels(id: string): Promise<(Discord.IGuildTextChannel | Discord.IGuildVoiceChannel)[]> {
        const url = `${API.BASE_URL}/guilds/${id}/channels`;
        // const url = `${this.BASE_URL}/users/@me/channels`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${await this.getToken()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    async getGuild(id: string = '511273672510799885'): Promise<Discord.IGuild[]> {
        const url = `${API.BASE_URL}/guilds/${id}`;
        // const url = `${this.BASE_URL}/users/@me/channels`;

        return axios.get(url, {
            headers: {
                'Authorization': `Bot ${await this.getCode()}`
            }
        }).then(response => {
            return Promise.resolve(response.data);
        })
    }

    async getGuildWebhooks(id: string = '511273672510799885'): Promise<Discord.IGuild[]> {
        const url = `${API.BASE_URL}/guilds/${id}/webhooks`;

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

export {appApi};