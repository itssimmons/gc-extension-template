// your chrome API use cases (do not include DOM manipulation here)

const GITHUB_ORIGIN = 'https://github.com';

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  const url = new URL(tab.url);

  if (url.origin === GITHUB_ORIGIN) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: '/sidePanel/index.html',
      enabled: true,
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch(error => console.error(error));
