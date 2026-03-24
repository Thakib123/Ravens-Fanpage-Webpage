function GameStatsEditArea_CGF() {
    const inputSpecs = [
      {
        prompt: "Opponent (req’d, 3–20 chars)",
        fieldName: "opponent",
        dataType: "string",
        isRequired: true,
        minLen: 3,
        maxLen: 20
      },
      {
        prompt: "Score (req’d, value 0–100)",
        fieldName: "score",
        dataType: "number",
        isRequired: true,
        min: 0,
        max: 100
      },
      {
        prompt: "Game Date (req’d)",
        fieldName: "gameDate",
        dataType: "date",
        isRequired: true
      },
      {
        prompt: "Location (Home or Away)",
        fieldName: "location",
        dataType: "radio",
        isRequired: true,
        options: ["Home", "Away"],
        preSelect: "Home"
      }
    ];
  
    const editObj = {
      opponent: "Steelers",
      score: 24,
      gameDate: "2024-11-17",
      location: "Home"
    };
  
    return MakeEditArea({
      inputSpecs: inputSpecs,
      successCallBack: function (data) {
        console.log("GameStats Saved:", data);
      },
      cancelCallBack: function () {
        console.log("GameStats edit canceled.");
      },
      editObj: editObj
    });
  }
  