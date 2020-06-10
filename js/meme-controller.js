'use strict'

var gElCanvas;
var gCtx;
var gCurrMeme;
var gImgObj;
var gCurrImg;

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gElCanvas.width = 500;
    gElCanvas.height = 500;
    gCtx.fillStyle = 'white';
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height);
    //renderGallery()
    getMeme()
}

function getMeme() {
    gCurrMeme = getGMeme()
    var imgId = gCurrMeme.selectedImgId
    gImgObj = getImgObj(imgId)
    drawImg()
}

function renderCanvas() {
    drawImg()
}

function drawImg(elImg) {
    gCurrImg = elImg
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

// function drawImg() {
//     var elImg = new Image()
//     elImg.src = gImgObj.url;
//     elImg.onload = () => {
//         gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
//         drawText(gCurrMeme.lines[0].text, 250, 50)
//     }
// }

function drawText(text, x, y) {
    console.log(text, x, y)
    gCtx.lineWidth = '1';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '30px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onAddText() {
    var elNewText = document.querySelector('input[name=text]');
    gCurrMeme.lines[0].text = elNewText.value
    renderCanvas()
}
