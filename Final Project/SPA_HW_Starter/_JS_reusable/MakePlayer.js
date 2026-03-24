"use strict";

function MakePlayer({ 
    imgSrc = "default.jpg", 
    imgObjList = [], 
    playerName = "Unknown Player", 
    touchdowns = 0,
    yards = 0
} = {}) {
    // Store touchdowns per player
    let touchdownStats = {}; 
    imgObjList.forEach(imgObj => {
        if (!(imgObj.display in touchdownStats)) {
            touchdownStats[imgObj.display] = 0;
        }
    });

    // Create main div
    let playerDiv = document.createElement("div");
    playerDiv.classList.add("player");

    // Create image element
    let img = document.createElement("img");
    img.src = imgSrc;
    img.alt = playerName;

    // Create a div to hold player details
    let playerContent = document.createElement("div");
    playerContent.classList.add("player-content");

    // Use JS templating to set initial player content
    playerContent.innerHTML = `
        <h3>${playerName}</h3>
        <p>Touchdowns: ${touchdowns}</p>
        <p>Yards: ${yards}</p>
    `;

    // Get references after setting innerHTML
    let nameElement = playerContent.querySelector("h3");
    let touchdownsElement = playerContent.querySelectorAll("p")[0];
    let yardsElement = playerContent.querySelectorAll("p")[1];

    // Button to increase touchdowns
    let addTouchdownButton = document.createElement("button");
    addTouchdownButton.textContent = "Add Touchdown";
    addTouchdownButton.classList.add("touchdown-btn");
    addTouchdownButton.addEventListener("click", function () {
        let currentPlayer = nameElement.textContent;
        if (!(currentPlayer in touchdownStats)) {
            touchdownStats[currentPlayer] = 0;
        }
        touchdownStats[currentPlayer]++;
        touchdownsElement.textContent = `Touchdowns: ${touchdownStats[currentPlayer]}`;
    });

    // Button to add yards
    let addYardsButton = document.createElement("button");
    addYardsButton.textContent = "Add 10 Yards";
    addYardsButton.classList.add("yards-btn");
    addYardsButton.addEventListener("click", function () {
        yards += 10;
        yardsElement.textContent = `Yards: ${yards}`;
    });

    // Create dropdown for changing images
    let select = document.createElement("select");
    select.classList.add("selectImages");
    imgObjList.forEach(imgObj => {
        let option = document.createElement("option");
        option.value = imgObj.val;
        option.textContent = imgObj.display;
        select.appendChild(option);
    });

    // Update player details when changing image
    select.addEventListener("change", function () {
        let selectedOption = select.options[select.selectedIndex];
        let newPlayer = selectedOption.textContent;
        
        img.src = selectedOption.value;
        nameElement.textContent = newPlayer;

        if (!(newPlayer in touchdownStats)) {
            touchdownStats[newPlayer] = 0;
        }
        touchdownsElement.textContent = `Touchdowns: ${touchdownStats[newPlayer]}`;
    });

    // Append all interactive elements to playerContent
    playerContent.appendChild(addTouchdownButton);
    playerContent.appendChild(addYardsButton);
    playerContent.appendChild(select);

    // Append image and player content into playerDiv
    playerDiv.appendChild(img);
    playerDiv.appendChild(playerContent);

    return playerDiv;
}
