'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
];

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '', 
            size: 50,
            align: 'left',
            color: 'white',
            x:50,
            y:50,
        },
        {
            txt: '', 
            size: 50,
            align: 'left',
            color: 'white',
            x:50,
            y:400,
        }
    ]
}

function getImgs() {
return gImgs;
}

function getMeme() {
   return gMeme;
}

function updateText(text){  //changing the text on gMemes >> lines >>txt
    //console.log('dfdfdfdfdf')
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    
}

function changeFontSize(diff){
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}


function changeTextPosition(diff){
    gMeme.lines[gMeme.selectedLineIdx].y += diff;
}

function switchLine(){
   if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = 1
   else gMeme.selectedLineIdx = 0
   console.log(gMeme.selectedLineIdx)

}
function updateSelectedLine(inputId){
    gMeme.selectedLineIdx = inputId
}


