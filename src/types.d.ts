export interface IContentInfo {
    largestImageUrl: string
}

export interface IContentInfoMessage {
    type: 'contentInfo',
    data: IContentInfo
}

export interface IShareData {
    contextMenusInfo: chrome.contextMenus.OnClickData,
    tabInfo: chrome.tabs.Tab,
    contentInfo: IContentInfo
}