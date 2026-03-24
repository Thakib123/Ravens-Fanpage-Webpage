"use strict";

// Format salary as currency
function formatCurrency(num) {
    if (typeof num !== "number") num = Number(num);
    if (isNaN(num)) return "$0.00";
    return num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

// Make a single player card
function MakeRavensPlayer(playerObjRef) {
    var playerObj = document.createElement("div");
    playerObj.classList.add("raven");

    let imgSrc = playerObjRef.image && playerObjRef.image.trim() !== "" ? playerObjRef.image : "pics_slideShow/nothing.jpg";

    playerObj.innerHTML = `
        <div class="playerInfoClass"></div>

        <img src="${imgSrc}" alt="${playerObjRef.name}" class="playerImage">

        <label>Change Image:</label>
        <select class="imageSelectClass">
            <option value="pics_slideShow/nothing.jpg">Default</option>
            <option value="images/lamar.jpg">Lamar Jackson</option>
            <option value="images/zay_flowers.jpg">Zay Flowers</option>
            <option value="images/justin_tucker.jpg">J Tuck</option>
        </select>

        <div class="buttonArea">
            <button class="positionButtonClass">Change Position to:</button>
            <input type="text" class="newPositionInputClass"/>

            <button class="salaryButtonClass">Change Salary By Amount:</button>
            <input type="text" class="salaryAmountInputClass"/>
        </div>
    `;

    const playerInfo = playerObj.querySelector(".playerInfoClass");
    const playerImage = playerObj.querySelector(".playerImage");
    const imageSelect = playerObj.querySelector(".imageSelectClass");
    const positionButton = playerObj.querySelector(".positionButtonClass");
    const newPositionInput = playerObj.querySelector(".newPositionInputClass");
    const salaryButton = playerObj.querySelector(".salaryButtonClass");
    const salaryAmount = playerObj.querySelector(".salaryAmountInputClass");

    function display() {
        playerInfo.innerHTML = `
            <p class="playerName"><strong>${playerObjRef.name}</strong></p>
            <p>Position: ${playerObjRef.position}</p>
            <p>Salary: ${formatCurrency(playerObjRef.salary)}</p>
        `;
    }

    playerObj.setPosition = function(newPosition) {
        playerObjRef.position = newPosition || "No Position Provided";
        display();
    };

    playerObj.changeSalary = function(changeAmount) {
        const n = Number(changeAmount);
        if (isNaN(n)) {
            alert("Please enter a valid number for salary change.");
            return;
        }
        playerObjRef.salary += n;
        display();
    };

    imageSelect.onchange = function() {
        playerObjRef.image = imageSelect.value;
        playerImage.src = playerObjRef.image;
    };

    positionButton.onclick = function() {
        playerObj.setPosition(newPositionInput.value);
    };

    salaryButton.onclick = function() {
        playerObj.changeSalary(salaryAmount.value);
    };

    display(); // Initial render
    return playerObj;
}

// Make the entire list
function MakeRavensList({ playerList = [], title = "Ravens Player List", subtitle = "No subtitle", category = "Uncategorized", sortBy = "none" }) {
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

    const listCategory = document.createElement("p");
    listCategory.textContent = "Category: " + category;
    listCategory.style.fontStyle = "italic";
    listCategory.style.color = "darkblue";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("titleInputClass");
    titleInput.placeholder = "Enter new list name";

    const titleButton = document.createElement("button");
    titleButton.textContent = "Change List Name";
    titleButton.classList.add("titleButtonClass");

    titleButton.onclick = function() {
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

    sortSelect.onchange = function() {
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
    playerListComp.appendChild(listCategory);
    playerListComp.appendChild(titleInput);
    playerListComp.appendChild(titleButton);
    playerListComp.appendChild(playerArea);

    return playerListComp;
}

// Full screen component (with AJAX instead of fetch)
function MakeRavensList_CGF() {
    var ele = document.createElement("div");

    ajax("json/ravens_players.json", function(data) {
        var playerListComp = MakeRavensList({
            playerList: data,
            title: "Ravens Players",
            subtitle: "2025 Active Players",
            category: "Offense and Defense"
        });
        ele.appendChild(playerListComp);
    });

    ajax("json/coaching_staff.json", function(data) {
        const mappedData = data.map(item => ({
            name: item.name,
            position: item.role,
            salary: item.salary,
            image: item.image || "pics_slideShow/nothing.jpg"
        }));

        var coachListComp = MakeRavensList({
            playerList: mappedData,
            title: "Ravens Coaching Staff",
            subtitle: "2025 Coaches",
            category: "Coaches"
        });
        ele.appendChild(coachListComp);
    });

    var emptyListComp = MakeRavensList({
        playerList: [],
        title: "Empty List (No Data)",
        subtitle: "No information available",
        category: "None"
    });
    ele.appendChild(emptyListComp);

    return ele;
}

function ajax(url, successFn) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var obj = JSON.parse(xhr.responseText);
            successFn(obj);
        } else {
            console.error("AJAX Error loading", url);
        }
    };
    xhr.send();
}
