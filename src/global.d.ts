declare module 'webpack-merge';

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}


declare interface IContentInfo {
    imagesUrls: string[]
    text: string
}

declare interface IShareData {
    contextMenusInfo: chrome.contextMenus.OnClickData,
    tabInfo: chrome.tabs.Tab,
    contentInfo: IContentInfo
}

declare interface IBackgroundPage extends Window {
    shareData: IShareData
}

declare interface Window {
    bgPage: IBackgroundPage
}