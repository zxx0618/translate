$(function() {
    /**
     * 翻译
     */
    document.getElementById("transform").onclick = function () {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if(isChromeSettingPage(tabs[0].url)) {
                alert("抱歉，由于浏览器限制，“chrome://”开头的网页不支持翻译");
            } else {
                chrome.extension.getBackgroundPage().showTranslationWindow()
                window.close();
            }
        })
    }

    /**
     * 判断是否是 chrome:// 开头的链接
     * @param {} url
     * @returns
     */
    function isChromeSettingPage(url) {
        return /^chrome:\/\/.*$/.test(url);
    }
})
