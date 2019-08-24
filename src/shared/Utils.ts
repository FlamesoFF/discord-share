export abstract class Utils {
    static async ready() {
        return new Promise((resolve, reject) => {
            if (document.readyState === 'complete') {
                resolve();
            }
            else {
                document.onreadystatechange = () => {
                    if (document.readyState === 'complete') {
                        resolve();
                    }
                };
            }
        });
    }

    static parseYouTubeUrl(url: string): string {
        const regExp = /(?=youtu\.be\/(.+))|(?=youtube\.com\/watch\?v=(.+))/i;
        const parsed = url.match(regExp);

        if (parsed) {
            const [
                ,
                videoUri1,
                videoUri2
            ] = parsed;

            const uri = (videoUri1 || videoUri2).trim();

            return `https://www.youtube.com/embed/${uri}`;
        }
        else {
            return '';
        }

    }

    static processImageUrl(url: string): string {
        return chrome.runtime.getURL('assets/discord.png');
    }

    static clearUndefinedProperties(object: object) {
        for (let [key, value] of Object.entries(object)) {
            if (value) {
                if (typeof value === 'object' && value instanceof Object) {
                    this.clearUndefinedProperties(value);
                }
            }
            else {
                delete object[key];
            }
        }
    }

    static getDiscordAvatar(userId: string, avatarUri: string): string {
        if (userId && avatarUri) {
            return `https://cdn.discordapp.com/avatars/${userId}/${avatarUri}.png`
        }
        else {
            return '';
        }
    }

    static getDiscordIconUrl(uri: string): string {
        if (uri) {
            return `https://cdn.discordapp.com/icons/${uri}.png`
        }
        else {
            return '';
        }
    }
}