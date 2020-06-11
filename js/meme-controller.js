'use strict'

var gElCanvas;
var gCtx;
var gCurrImg;

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    renderGallery();
    resizeCanvas();
}

function renderGallery() {
    var imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img onclick="onDrawImg(this)" src="${img.url}" alt="${img.keywords}"> `
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}
    
function renderMeme() {
   // clearCanvas()
    onDrawImg(gCurrImg)
    var meme = getMeme()
    //console.log('meme' , meme)
    meme.lines.forEach(line => drawText(line));
}

function onDrawImg(img) {
    gCurrImg = img
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.width)
}

function onUpdateText(elInput) {
    updateText(elInput.value)
    renderMeme()
}

function onUpdateSlectedLine(elInput) {
    updateSelectedLine(elInput.id)
}

function drawText(lineObj) {
    //  console.log(lineObj)
    gCtx.lineWidth = '5';
    gCtx.font = `${lineObj.size}px impact`;
    gCtx.textAlign = lineObj.align;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = lineObj.color;
    gCtx.strokeText(lineObj.txt, lineObj.x, lineObj.y);
    gCtx.fillText(lineObj.txt, lineObj.x, lineObj.y);
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onChangeTextPosition(diff) {
    changeTextPosition(diff)
    renderMeme()
}

function onSwitchLine() {
    // console.log('switch line in')
    switchLine()
    var meme = getMeme()
    focusOnLine(meme.selectedLineIdx)
    renderMeme()
}

function focusOnLine(lineIdx) {
    var elInput = document.getElementById(lineIdx)
    elInput.focus();
}

function show(li) {
    var liClass = li.className
console.log(liClass)
    switch (liClass) {
        case "gallery-li":
            var gallery = document.querySelector('.gallery-container');
            gallery.classList.remove('hide')
            var center = document.querySelector('.center');
            center.classList.add('hide')
            break;

        case "meme-li":
            var gallery = document.querySelector('.gallery-container');
            gallery.classList.add('hide')
            var center = document.querySelector('.center');
            center.classList.remove('hide')
            break;
        
        case "class3":
            test.innerHTML = "I have class3";
            break;
        case "class4":
            test.innerHTML = "I have class4";
            break;
        default:
            test.innerHTML = "";
    }

}
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_img';
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

