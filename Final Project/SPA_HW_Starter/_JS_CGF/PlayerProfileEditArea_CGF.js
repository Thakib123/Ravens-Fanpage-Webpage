function PlayerProfileEditArea_CGF() {
    const inputSpecs = [
      {
        prompt: "Player Name (opt’l)",
        fieldName: "playerName",
        dataType: "string",
        isRequired: false
      },
      {
        prompt: "Position (req’d, 2–20 chars)",
        fieldName: "position",
        dataType: "string",
        isRequired: true,
        minLen: 2,
        maxLen: 20
      },
      {
        prompt: "Jersey Number (req’d, 1–99)",
        fieldName: "jerseyNumber",
        dataType: "number",
        isRequired: true,
        min: 1,
        max: 99
      },
      {
        prompt: "Birthdate (opt’l)",
        fieldName: "birthDate",
        dataType: "date",
        isRequired: false
      },
      {
        prompt: "Role (req’d, choose one)",
        fieldName: "role",
        dataType: "radio",
        isRequired: true,
        options: ["Starter", "Backup", "Practice Squad"]
      }
    ];
  
    const editObj = {
      playerName: "",
      position: "",
      jerseyNumber: "",
      birthDate: "",
      role: ""
    };
  
    return MakeEditArea({
      inputSpecs: inputSpecs,
      successCallBack: function (data) {
        console.log("PlayerProfile Saved:", data);
      },
      cancelCallBack: function () {
        console.log("PlayerProfile edit canceled.");
      },
      editObj: editObj
    });
  }
  