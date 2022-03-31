// 翻译功能
function showTranslationWindow() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, { file: 'js/translate/popup.js', runAt: 'document_start' })
      chrome.tabs.insertCSS(tabs[0].id, { file: 'css/translate.css', runAt: 'document_start' })
    })
  }