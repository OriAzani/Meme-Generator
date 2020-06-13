'use strict'

var gElCanvas;
var gCtx;
var gCurrImg;

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    
    renderGallery();
    resizeCanvas();
         // ---Start with publishBtn---//
        var pubBtn = document.querySelector('.publish-btn');
        pubBtn.classList.remove('hide')
        // ---Start without center---//
        var center = document.querySelector('.center');
        center.classList.remove('flex')
        center.classList.add('hide')
}


function renderGallery() {
    var imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img class="gallery-img" onclick="onDrawImg(this)" src="${img.url}" alt="${img.keywords}"> `
    });
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function renderMeme() {
    onDrawImg(gCurrImg)
    var meme = getMeme()
    meme.lines.forEach(line => drawText(line));
}

function onDrawImg(img) {
        //---Just like "show" function---//
        var center = document.querySelector('.center');
        center.classList.add('flex')
        center.classList.remove('hide')
    
        var gallery = document.querySelector('.gallery-container');
        gallery.classList.add('hide')
        gallery.classList.remove('flex')

    //---Draw image on canvas---//
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

function onChangeTextPosition(diff) {
    changeTextPosition(diff)
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    var meme = getMeme()
    focusOnLine(meme.selectedLineIdx)
    renderMeme()
}

function focusOnLine(lineIdx) {
    var elInput = document.getElementById(lineIdx)
    elInput.focus();
}


function show(el) {
    console.log(el)
    var elClass = el.className
    console.log(elClass)

    switch (elClass) {
        case 'gallery-li':
            var gallery = document.querySelector('.gallery-container');
            gallery.classList.remove('hide');

            var center = document.querySelector('.center');
            center.classList.remove('flex');
            center.classList.add('hide');
            break;

        case "meme-li":
            var gallery = document.querySelector('.gallery-container');
            gallery.classList.add('hide')
            gallery.classList.remove('flex')

            var center = document.querySelector('.center');
            center.classList.add('flex')
            center.classList.remove('hide')
            break;
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
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
     <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         <button class="blue-btn"><i class="fab fa-facebook"></i></button>
        </a>`

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
function hidePubBTn(){
    var pubBtn = document.querySelector('.publish-btn');
    pubBtn.classList.add('hide')
    }
//----HIDE PUBLISH BTN--//



var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

function handleImage(e){
    console.log('in');
    
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            img.width = gElCanvas.width;
            img.height =  gElCanvas.height;
            gCtx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
