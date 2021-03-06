'use strict'
const KEY = 'savedMemes';
var gSavedMemes = [];

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            idx:0,
            txt: '',
            size: 50,
            align: 'center',
            borderColor: 'black',
            textColor: 'white',
            x: 150,
            y: 50,

        },
        {
            idx:1,
            txt: '',
            size: 50,
            align: 'center',
            borderColor: 'black',
            textColor: 'white',
            x: 150,
            y: 250,
        }
    ]
}

function getImgs() {
    return gImgs;
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getMeme() {
    return gMeme;
}


function updateText(text) {  //changing the text on gMemes >> lines >> txt
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff * 3;
}


function changeTextYPosition(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff * 5;
}
function changeTextXPosition(diff) {
    gMeme.lines[gMeme.selectedLineIdx].x += diff * 5;

}
function switchLine(idx) {
    gMeme.selectedLineIdx = idx
}
function updateSelectedLine(inputId) {
    gMeme.selectedLineIdx = inputId
}

function changeBorderColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].borderColor = color
}
function changeTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].textColor = color
}

function clearCanvas() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function saveMeme() {
    gSavedMemes.push(gMeme);
    saveToStorage(KEY, gSavedMemes)
}

function getMemes() {
    gSavedMemes = loadFromStorage(KEY)
    return gSavedMemes;
}
