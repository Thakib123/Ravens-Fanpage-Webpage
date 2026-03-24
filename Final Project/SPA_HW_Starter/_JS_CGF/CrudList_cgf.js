"use strict";

function CrudList_CGF() {
    const wrapper = document.createElement("div");

    // Load JSON 1: RavensPlayerStats
    ajax("json/RavensPlayerStats.json", function (playerList) {
        wrapper.appendChild(MakeCrudList({
            title: "Ravens Player Stats",
            objList: playerList,
            templateHTML: function(obj) {
                return `
                    Player: ${obj.playerName} (#${obj.jerseyNumber})<br>
                    Rating: ${obj.rating}<br>
                    <img src="${obj.playerImg}" width="120">
                `.trim();
            },
            inputSpecs: [
                {
                    fieldName: "playerName",
                    prompt: "Player Name (10–30 characters)",
                    dataType: "string",
                    minLen: 10,
                    maxLen: 30,
                    isRequired: true
                },
                {
                    fieldName: "jerseyNumber",
                    prompt: "Jersey Number (1–99)",
                    dataType: "number",
                    min: 1,
                    max: 99,
                    isRequired: true
                },
                {
                    fieldName: "rating",
                    prompt: "Player Rating (0–100)",
                    dataType: "number",
                    min: 0,
                    max: 100,
                    isRequired: true
                },
                {
                    fieldName: "playerImg",
                    prompt: "Image File Path",
                    dataType: "string",
                    minLen: 5,
                    maxLen: 100,
                    isRequired: true
                }
            ]
        }));
    }, function (err) {
        console.error(" Failed to load RavensPlayerStats.json:", err);
    });

    // Load JSON 2: GameSummaries
    ajax("json/GameSummaries.json", function (gameList) {
        wrapper.appendChild(MakeCrudList({
            title: "Ravens Game Summaries",
            objList: gameList,
            templateHTML: function(obj) {
                return `
                    Opponent: ${obj.opponent} (${obj.result})<br>
                    Attendance: ${obj.attendance}<br>
                    Date: ${obj.gameDate}<br>
                    <img src="${obj.gameImg}" width="120">
                `.trim();
            },
            inputSpecs: [
                {
                    fieldName: "opponent",
                    prompt: "Opponent",
                    dataType: "select",
                    options: ["Chiefs", "Bengals", "Browns", "Steelers", "Dolphins", "Jets"],
                    isRequired: true
                },
                {
                    fieldName: "result",
                    prompt: "Game Result",
                    dataType: "radio",
                    options: ["Win", "Loss"],
                    isRequired: true
                },
                {
                    fieldName: "attendance",
                    prompt: "Attendance (10000–80000)",
                    dataType: "number",
                    min: 10000,
                    max: 80000,
                    isRequired: true
                },
                {
                    fieldName: "gameDate",
                    prompt: "Game Date",
                    dataType: "date",
                    isRequired: true
                },
                {
                    fieldName: "gameImg",
                    prompt: "Image File Path",
                    dataType: "string",
                    minLen: 5,
                    maxLen: 100,
                    isRequired: true
                }
            ]
        }));
    }, function (err) {
        console.error(" Failed to load GameSummaries.json:", err);
    });

    wrapper.appendChild(MakeCrudList({
        title: "Default Sample List",
        objList: [{ name: "Sample Item", value: "Test Value" }],
        templateHTML: function(obj) {
            return `Name: ${obj.name}, Value: ${obj.value}`;
        },
        inputSpecs: [
            {
                fieldName: "name",
                prompt: "Name (5–30 characters)",
                dataType: "string",
                minLen: 5,
                maxLen: 30,
                isRequired: true
            },
            {
                fieldName: "value",
                prompt: "Value (5–30 characters)",
                dataType: "string",
                minLen: 5,
                maxLen: 30,
                isRequired: true
            }
        ]
    }));
    

    return wrapper;
}
