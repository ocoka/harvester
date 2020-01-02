/* global chrome */
/* eslint 'no-console': 'off' */

const exUrl = chrome.extension.getURL('index.html');
chrome.runtime.onInstalled.addListener(() => {
  chrome.bookmarks.search('http', result => {
    chrome.browserAction.setBadgeText({
      text: result.length.toString(),
    });
  });
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.windows.create({
    left: 0,
    top: 0,
    url: exUrl,
  });
});
