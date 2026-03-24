"use strict";

function MakeRavensList({ playerList = [], title = "Untitled Player List", subtitle = "No subtitle", sortBy = "none" }) {
    if (!Array.isArray(playerList) || playerList.length === 0) {
        playerList = [{ name: "No Players Available", position: "N/A", salary: 0 }];
    }

    const originalList = [...playerList];

    const playerListComp = document.createElement("div");
    playerListComp.classList.add("ravenList");

    const listTitle = document.createElement("h2");
    listTitle.textContent = title;

    const listSubtitle = document.createElement("h4");
    listSubtitle.textContent = subtitle;
    listSubtitle.style.color = "gray";
    listSubtitle.style.fontStyle = "italic";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("titleInputClass");
    titleInput.placeholder = "Enter new list name";

    const titleButton = document.createElement("button");
    titleButton.textContent = "Change List Name";
    titleButton.classList.add("titleButtonClass");

    titleButton.onclick = function () {
        if (titleInput.value.trim() !== "") {
            listTitle.textContent = titleInput.value;
        } else {
            alert("Please enter a valid list name!");
        }
    };

    const sortSelect = document.createElement("select");
    sortSelect.classList.add("sortSelectClass");

    const options = [
        { text: "No Sorting", value: "none" },
        { text: "Salary Ascending", value: "asc" },
        { text: "Salary Descending", value: "desc" }
    ];

    for (const opt of options) {
        const optionEle = document.createElement("option");
        optionEle.textContent = opt.text;
        optionEle.value = opt.value;
        if (opt.value === sortBy) {
            optionEle.selected = true;
        }
        sortSelect.appendChild(optionEle);
    }

    const playerArea = document.createElement("div");
    playerArea.classList.add("playerArea");

    function renderPlayers() {
        playerArea.innerHTML = "";
        for (const playerObj of playerList) {
            playerArea.appendChild(MakeRavensPlayer(playerObj));
        }
    }

    renderPlayers();

    sortSelect.onchange = function () {
        const selectedSort = sortSelect.value;

        if (selectedSort === "asc") {
            playerList.sort((a, b) => a.salary - b.salary);
        } else if (selectedSort === "desc") {
            playerList.sort((a, b) => b.salary - a.salary);
        } else if (selectedSort === "none") {
            playerList = [...originalList];
        }

        renderPlayers();
    };

    playerListComp.appendChild(sortSelect);
    playerListComp.appendChild(listTitle);
    playerListComp.appendChild(listSubtitle);
    playerListComp.appendChild(titleInput);
    playerListComp.appendChild(titleButton);
    playerListComp.appendChild(playerArea);

    return playerListComp;
}

function MakeRavensPlayer(playerObjRef) {
    const playerObj = document.createElement("div");
    playerObj.classList.add("raven");

    const imgSrc = playerObjRef.image && playerObjRef.image.trim() !== "" 
        ? playerObjRef.image 
        : "pics_slideShow/nothing.jpg";

    playerObj.innerHTML = `
        <img src="${imgSrc}" alt="${playerObjRef.name}" class="playerImage">
        <div class='playerInfoClass'></div>

        <label>Change Image:</label>
        <select class='imageSelectClass'>
            <option value="pics_slideShow/nothing.jpg">Default</option>
            <option value="pics_slideShow/lamar.jpg">Lamar Jackson</option>
            <option value="pics_slideShow/andrews.jpg">Mark Andrews</option>
            <option value="pics_slideShow/coach.jpg">Coach</option>
        </select>

        <button class='positionButtonClass'>Change Position to:</button>
        <input type='text' class='newPositionInputClass'/>

        <button class='salaryButtonClass'>Change Salary By Amount:</button>
        <input type='text' class='salaryAmountInputClass'/>
    `;

    const playerInfo = playerObj.getElementsByClassName("playerInfoClass")[0];
    const positionButton = playerObj.getElementsByClassName("positionButtonClass")[0];
    const newPositionInput = playerObj.getElementsByClassName("newPositionInputClass")[0];
    const salaryButton = playerObj.getElementsByClassName("salaryButtonClass")[0];
    const salaryAmount = playerObj.getElementsByClassName("salaryAmountInputClass")[0];
    const imageSelect = playerObj.getElementsByClassName("imageSelectClass")[0];
    const playerImage = playerObj.getElementsByClassName("playerImage")[0];

    function display() {
        playerInfo.innerHTML = `
            <p class="playerName"><strong>${playerObjRef.name}</strong></p>
            <p>Position: ${playerObjRef.position}</p>
            <p>Salary: ${formatCurrency(playerObjRef.salary)}</p>
        `;
    }

    playerObj.setPosition = function (newPosition) {
        playerObjRef.position = newPosition || "No Position Provided";
        display();
    };

    playerObj.changeSalary = function (changeAmount) {
        const n = Number(changeAmount);
        if (isNaN(n)) {
            alert("Please enter a valid number for salary change.");
            return;
        }
        playerObjRef.salary += n;
        display();
    };

    imageSelect.onchange = function () {
        playerObjRef.image = imageSelect.value;
        playerImage.src = playerObjRef.image;
    };

    display();

    positionButton.onclick = function () {
        playerObj.setPosition(newPositionInput.value);
    };

    salaryButton.onclick = function () {
        playerObj.changeSalary(salaryAmount.value);
    };

    return playerObj;
}

function formatCurrency(num) {
    if (typeof num !== "number") {
        num = Number(num);
    }
    if (isNaN(num)) {
        console.error("Invalid number for currency formatting:", num);
        return "$0.00";
    }
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    });
}
