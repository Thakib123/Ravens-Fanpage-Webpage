"use strict";

function SlideShow_CGF() {
    var container = document.createElement("div"); 

    fetch("json/Lamar.json")
        .then(response => response.json())
        .then(rawLamarSlides => {
            const lamarSlides = rawLamarSlides.map(slide => ({
                image: slide.image,
                caption: slide.nickname,
                info: `Year: ${slide.year}`
            }));

            var lamarSS = MakeSlideShow({
                picObjList: lamarSlides,
                ssTitle: "Lamar Highlights",
                themeColor: "purple"
            });
            container.appendChild(lamarSS);
        })
        .catch(err => {
            console.error("Error loading Lamar slides:", err);
            container.innerHTML += "<p>Error loading Lamar slideshow.</p>";
        });

    fetch("json/Derrick.json")
        .then(response => response.json())
        .then(rawDerrickSlides => {
            const derrickSlides = rawDerrickSlides.map(slide => ({
                image: slide.image,
                caption: slide.nickname,
                info: `Year: ${slide.year}`
            }));

            var derrickSS = MakeSlideShow({
                picObjList: derrickSlides,
                ssTitle: "Derrick Highlights",
                themeColor: "blue"
            });
            container.appendChild(derrickSS);
        })
        .catch(err => {
            console.error("Error loading Derrick slides:", err);
            container.innerHTML += "<p>Error loading Derrick slideshow.</p>";
        });

    const emptySS = MakeSlideShow({});
    container.appendChild(emptySS);

    return container;
}

window.SlideShow_CGF = SlideShow_CGF; 