"use strict";

function MakeSlideShow({
    picObjList = [{ image: "pics_slideShow/nothing.jpg", caption: "Nothing", info: "No info available." }],
    ssTitle = "Untitled",
    themeColor = "gray"
} = {}) {

    var slideShow = document.createElement("div");
    slideShow.classList.add("slideShow");
    slideShow.style.backgroundColor = themeColor;

    slideShow.innerHTML = `
        <h3>${ssTitle}</h3>
        <div class="slideContainer">
            <img class="myImageC" />
            <span class="captionC"></span>
            <div class="infoC" style="display: none;"></div>
        </div>
        <div>
            <button class="backButtonC">&lt;</button>
            <button class="fwdButtonC">&gt;</button>
            <button class="toggleButtonC">Show Info</button>
        </div>
    `;

    var myImage = slideShow.querySelector(".myImageC");
    var caption = slideShow.querySelector(".captionC");
    var info = slideShow.querySelector(".infoC");
    var backButton = slideShow.querySelector(".backButtonC");
    var fwdButton = slideShow.querySelector(".fwdButtonC");
    var toggleButton = slideShow.querySelector(".toggleButtonC");

    var picNum = 0;

    // PERSISTENCE: Try to get saved picNum
    if (ssTitle && localStorage.getItem(ssTitle)) {
        picNum = parseInt(localStorage.getItem(ssTitle));
        if (isNaN(picNum) || picNum < 0 || picNum >= picObjList.length) {
            picNum = 0;
        }
    }

    function display() {
        myImage.src = picObjList[picNum].image;
        caption.textContent = picObjList[picNum].caption;
        info.innerHTML = picObjList[picNum].info;

        backButton.disabled = picNum === 0;
        fwdButton.disabled = picNum === picObjList.length - 1;

        // Save to localStorage
        if (ssTitle) {
            localStorage.setItem(ssTitle, picNum);
        }
    }

    display();

    fwdButton.onclick = function () {
        if (picNum < picObjList.length - 1) {
            picNum++;
            console.log("Pic Object List:", picObjList);
            display();
        }
    };

    backButton.onclick = function () {
        if (picNum > 0) {
            picNum--;
            console.log("Pic Object List:", picObjList);
            display();
        }
    };

    toggleButton.onclick = function () {
        if (info.style.display === "none") {
            info.style.display = "block";
            toggleButton.textContent = "Hide Info";
        } else {
            info.style.display = "none";
            toggleButton.textContent = "Show Info";
        }
    };

    slideShow.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < picObjList.length)) {
            picNum = newNum;
            console.log("Pic Object List:", picObjList);
            display();
        }
    };

    return slideShow;
}

// Attach globally if needed (depending on setup)
window.MakeSlideShow = MakeSlideShow;
