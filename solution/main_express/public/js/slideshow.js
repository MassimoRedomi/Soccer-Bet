// creating the width of the wrapper depending on the amount of images
window.addEventListener("load",function(){
    document.querySelector(".allImages").style.width = (document.querySelector(".banner").clientWidth * document.querySelector(".allImages").children.length) + "px";
})

var AllImages = document.querySelector(".allImages");
var imageWidth = document.querySelector(".banner").clientWidth;
// the index value of current page
var i = 0;

//placeholder for our setInterval function
var timer = 0;

// start timer function
function Start() {

    timer = setInterval(function(){
        if (i < AllImages.children.length) {
            i++;
            AllImages.style.transform = "translateX(" +  (-imageWidth * i) + "px)";
            if (i >= AllImages.children.length) {
                AllImages.style.transform = "translateX(0px)";
                i = 0;
            }
        }
    }, 5000);
}

// starting the timer
Start();

//stop the timer
function Stop() {
    clearInterval(timer);
}
  