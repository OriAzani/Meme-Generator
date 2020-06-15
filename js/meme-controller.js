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
        return `<img class="gallery-img" onclick="onDrawImg(this)" id="${img.id}" src="${img.url}" alt="${img.keywords}"> `
        // return `<img class="gallery-img" onclick="onDrawImg(${img.id})" src="${img.url}" alt="${img.keywords}"> `
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}


// function renderMemes() {
//     var memes = getMemes();
//     var imgs = getImgs();

//     var strHtmls = memes.map(meme => {
//     return `<img class="gallery-img" onclick="onDrawImg(this)" id="${imgs[meme.selectedImgId]} src="${imgs[3].url}"  alt="${imgs[meme.selectedImgId].keywords}"> `
//     });

//     document.querySelector('.memes-container').innerHTML = strHtmls.join('')
// }


function renderMeme() {
    onDrawImg(gCurrImg)
    var meme = getMeme()
    meme.lines.forEach(line => drawText(line));
}

function onDrawImg(img) {
    // console.log(img)
    getMeme().selectedImgId = img.id

    //---Just like "show" function---//
    var center = document.querySelector('.center');
    center.classList.add('flex')
    center.classList.remove('hide')

    var memes = document.querySelector('.memes-container');
    memes.classList.add('flex')
    memes.classList.remove('hide')

    var gallery = document.querySelector('.gallery-container');
    gallery.classList.add('hide')
    gallery.classList.remove('flex')

    resizeCanvas();
    //---Draw image on canvas---//
    gCurrImg = img
    // const selectedImage =  getImgById(imgId)
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
    gCtx.lineWidth = '5';
    gCtx.font = `${lineObj.size}px impact`;
    gCtx.textAlign = lineObj.align;
    gCtx.strokeStyle = lineObj.borderColor;
    gCtx.fillStyle = lineObj.textColor;
    gCtx.strokeText(lineObj.txt, lineObj.x, lineObj.y);
    gCtx.fillText(lineObj.txt, lineObj.x, lineObj.y);
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onChangeTextYPosition(diff) {
    changeTextYPosition(diff)
    renderMeme()
}
function onChangeTextXPosition(diff) {
    changeTextXPosition(diff)
    renderMeme()
}

function onSwitchLine() {

    if (getMeme().selectedLineIdx === 0) switchLine(1)
    else switchLine(0)
    var meme = getMeme()
    focusOnLine(meme.selectedLineIdx)
    renderMeme()
}

function focusOnLine(lineIdx) {
    var elInput = document.getElementById(lineIdx)
    elInput.focus();
}


function show(toShow) {
    // console.log(el)
    // var elClass = el.className
    // console.log(elClass)

    switch (toShow) {
        case 'gallery-li':
            var gallery = document.querySelector('.gallery-container');
            gallery.classList.remove('hide');

            var center = document.querySelector('.center');
            center.classList.remove('flex');
            center.classList.add('hide');

            var memes = document.querySelector('.memes-container');
            memes.classList.add('hide')
            memes.classList.remove('flex')

            break;
        case 'aditor-li':
            var center = document.querySelector('.center');
            center.classList.add('flex')
            center.classList.remove('hide')

            var gallery = document.querySelector('.gallery-container');
            gallery.classList.add('hide')
            gallery.classList.remove('flex')

            var memes = document.querySelector('.memes-container');
            memes.classList.add('hide')
            memes.classList.remove('flex')
            break

        case 'memes-li':
            var memes = document.querySelector('.memes-container');
            memes.classList.add('flex')
            memes.classList.remove('hide')

            var gallery = document.querySelector('.gallery-container');
            gallery.classList.add('hide')
            gallery.classList.remove('flex')

            var center = document.querySelector('.center');
            center.classList.add('hide')
            center.classList.remove('flex')
            renderMemes();
            break;

        default:
            //about
            break
    }
}
function onClearCanvas() {
    clearCanvas()
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_img';
}

function onChangeBorderColor(color) {
    changeBorderColor(color)
    renderMeme()
}
function onChangeTextColor(color) {
    changeTextColor(color)
    renderMeme()
}
function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

///----EXTERNAL FUNCTIONS----///

////---upload to fb---////
// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        var link = `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`
        window.open(link)
        //     uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        //     document.querySelector('.share-container').innerHTML = `
        //  <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        //      <button class="blue-btn"><i class="fab fa-facebook"></i></button>
        //     </a>`

    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

//----HIDE PUBLISH BTN--//
// function hidePubBTn(){
//     var pubBtn = document.querySelector('.publish-btn');
//     pubBtn.classList.add('hide')
//     }
//----HIDE PUBLISH BTN--//


//Upload From User//
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    console.log('in');

    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            clearCanvas()
            img.width = gElCanvas.width;
            img.height = gElCanvas.height;
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}


// function onCanvasClicked(ev) {
//     const { offsetX: x, offsetY: y } = ev
//     var offsetY = ev.offsetY;
//    var meme=  getMeme()
//     meme.lines.forEach((line, idx) => {
//         if (offsetY < line.y && offsetY > line.y - line.size) {
//             switchLine(line.idx)
//             focusOnLine(line.idx)
//             renderMeme()
//         }
       
//     })
// }




function onSaveMeme() {
    saveMeme()
    renderMeme()
}