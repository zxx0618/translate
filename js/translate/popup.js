if (typeof (BitTarnsDiv) !== "undefined") {
    console.log("存在 BitTarnsDiv")
    BitTarnsDiv.parentNode.removeChild(BitTarnsDiv)
}
var BitTarnsDiv = document.createElement("div")
BitTarnsDiv.id = "BitTarnsDivId"
document.body.appendChild(BitTarnsDiv)
BitTarnsDiv.style.backgroundColor = "RGB(238,237,237)"
BitTarnsDiv.style.height = "550px"
BitTarnsDiv.style.width = "300px"
BitTarnsDiv.style.zIndex = 99999
BitTarnsDiv.style.position = "fixed"
BitTarnsDiv.style.right = '10px'
BitTarnsDiv.style.top = '50px'
BitTarnsDiv.style.float = 'right'
BitTarnsDiv.style.border = '2px solid RGB(238,237,237)'
BitTarnsDiv.style.borderRadius = '25px'

// 文档内容
BitTarnsDiv.innerHTML = `
<div id='trans'>
<div id="trans_header">
  翻译小卡片
  <button id="deleteTrans">X</button>
</div>
<select id="inputLangSelect" class="LangSelectCss"> 
  <option class="LangSelectCssOption" value="auto">自动检测语言</option>
  <option class="LangSelectCssOption" value="zh">简体中文</option>
  <option class="LangSelectCssOption" value="en">English</option>
</select>
=>
<select id="outLangSelect" class="LangSelectCss">
  <option class="LangSelectCssOption" value="zh">简体中文</option>
  <option class="LangSelectCssOption" value="en">English</option>
</select>

<textarea cols="39" rows="15" id="inputLang" placeholder="请输入翻译内容"></textarea>

<br>
<div id="middleTans">
  自动检测语言：<p id="LangType">English</p><button id="tranbtn">翻译</button>
  
</div>
<hr>
<div id="outPutRes"></div>
</div>
 `

var from = 'auto';
var to = 'auto';

var postMsg = async function () {
    var msgq = document.getElementById("inputLang").value
    // 翻译api
    msgq = encodeURIComponent(msgq)

    let httpUrl1 = "//qca566.api.cloudendpoint.cn/hello?msgq=" +
        msgq + "&from=" + from + "&to=" + to + ""
    let res1 = await fetch(httpUrl1)
    let result1 = await res1.json()
    let res2 = result1.trans_result[0].dst
    document.getElementById("outPutRes").innerHTML = res2
}

var onInputChange = async function () {

    var msgq = document.getElementById("inputLang").value
    msgq = encodeURIComponent(msgq)
    let httpUrl1 = "//qca566.api.cloudendpoint.cn/transLang?msgq=" + msgq + ""
    let res1 = await fetch(httpUrl1)
    let result1 = await res1.json()
    let res2 = result1.data.src
    if (res2 == 'en') {
        document.getElementById("LangType").innerHTML = 'English'
        from = 'en';
        to = 'zh';
        postMsg()
    } else if (res2 == 'zh') {
        document.getElementById("LangType").innerHTML = '简体中文'
        from = 'zh';
        to = 'en';
        postMsg()
    } else {
        document.getElementById("LangType").innerHTML = res2
        to = 'zh';
        postMsg()
    }
    
}

//触发识别语言，再翻译
document.getElementById("inputLang").onchange = function () {
    onInputChange()
}
//直接翻译
document.getElementById("tranbtn").onclick = function () {
    from = document.getElementById("inputLangSelect").value
    to = document.getElementById("outLangSelect").value
    postMsg()
}
//关闭翻译模块
document.getElementById("deleteTrans").onclick = function () {
    BitTarnsDiv.parentNode.removeChild(BitTarnsDiv)
    BitTarnsDiv = undefined
}