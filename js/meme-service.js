'use strict'

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'images/2.jpg', keywords: ['sad'] },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            text: 'Hello',
            size: 16,
            align: 'center',
            color: 'red',
        }
    ]
}

function getGMeme() {
    return gMeme
}

function getImgs(){
    return gImgs
}


function getImgObj(imgId) {
    console.log(imgId)
    var idx = gImgs.findIndex(img => img.id === imgId);
    return gImgs[idx]
}

function getObj() {
    console.log('in')
    var idx = gImgs.findIndex(img => img.id === 1);
    console.log(gImgs[idx]);
    return gImgs[idx]
} 
