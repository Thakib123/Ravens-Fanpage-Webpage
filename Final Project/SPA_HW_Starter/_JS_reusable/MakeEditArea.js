"use strict";

function MakeEditArea({ inputSpecs, successCallBack, cancelCallBack, editObj = {} }) {

    var errorMsg = "";

    if (!inputSpecs || !inputSpecs[0]) {
        errorMsg += "MakeEditArea did not receive a parameter property named 'inputSpecs'\n" +
            "that has at least one object (that defines one input field). <br/><br/>";
    }

    if (!successCallBack || !(successCallBack instanceof Function)) {
        errorMsg += "MakeEditArea did not receive a parameter property named 'successCallBack',\n" +
            "a Consumer function that will be called (passing an object full of user entered data)\n" +
            "if the user clicks 'Submit' and all the inputs validate. <br/><br/>";
    }

    if (!cancelCallBack || !(cancelCallBack instanceof Function)) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'cancelCallBack',\n" +
            "a Consumer function that will be called if the user clicks 'Cancel'.\n" +
            "(no input will be passed to the cancel call back function). <br/><br/>";
    }

    if (errorMsg.length > 0) {
        alert(errorMsg);
        throw errorMsg;
    }

    var editDiv = document.createElement("div");
    editDiv.classList.add("editArea");

    editDiv.innerHTML = `
    <div class="rowsC"></div>
    <button class="saveButtonC">Save</button>
    <button class="cancelButtonC">Cancel</button>
    <span class="recLevelMsgC"></span>
    `;

    var rows = editDiv.getElementsByClassName("rowsC")[0];
    var saveButton = editDiv.getElementsByClassName("saveButtonC")[0];
    var cancelButton = editDiv.getElementsByClassName("cancelButtonC")[0];
    var recLevelMsg = editDiv.getElementsByClassName("recLevelMsgC")[0];

    for (var spec of inputSpecs) {
        var rowDiv = MakeTag({
            htmlTag: "div",
            parent: rows,
            cssClass: "row"
        });

        MakeTag({
            htmlTag: "span",
            cssClass: "prompt",
            innerHTML: spec.prompt,
            parent: rowDiv
        });

        // === HANDLE RADIO ===
        if (spec.dataType === "radio") {
            spec.inputTag = [];
            spec.radioValue = editObj[spec.fieldName] || "";

            for (let option of spec.options) {
                const label = MakeTag({ htmlTag: "label", parent: rowDiv });

                const radio = MakeTag({
                    htmlTag: "input",
                    type: "radio",
                    name: spec.fieldName,
                    value: option,
                    parent: label
                });

                if (option === editObj[spec.fieldName] || option === spec.preSelect) {
                    radio.checked = true;
                }

                spec.inputTag.push(radio);

                MakeTag({
                    htmlTag: "span",
                    innerHTML: option,
                    parent: label
                });
            }

        }
        // === HANDLE SELECT ===
        else if (spec.dataType === "select") {
            spec.inputTag = MakeTag({
                htmlTag: "select",
                parent: rowDiv
            });

            const defaultOption = MakeTag({
                htmlTag: "option",
                innerHTML: "Select...",
                parent: spec.inputTag
            });
            defaultOption.disabled = true;
            defaultOption.selected = true;

            for (let opt of spec.options) {
                const optionTag = MakeTag({
                    htmlTag: "option",
                    innerHTML: opt,
                    parent: spec.inputTag
                });
                optionTag.value = opt;

                if (opt === editObj[spec.fieldName]) {
                    optionTag.selected = true;
                }
            }

        }
        // === HANDLE TEXT / DATE / NUMBER ===
        else {
            var textOrDate = "text";
            if (spec.dataType === "date") {
                textOrDate = "date";
                console.log("Date value is " + editObj[spec.fieldName]);
            }

            spec.inputTag = MakeTag({
                htmlTag: "input",
                type: textOrDate,
                value: editObj[spec.fieldName] || "",
                parent: rowDiv
            });
        }

        MakeTag({
            htmlTag: "span",
            innerHTML: "&nbsp;",
            parent: rowDiv
        });

        spec.errorMsg = MakeTag({
            htmlTag: "span",
            cssClass: "error",
            parent: rowDiv
        });
    }

    saveButton.onclick = function () {
        var allErrors = "";

        for (var spec of inputSpecs) {
            if (spec.dataType === "string") {
                spec.errorMsg.innerHTML = Validate.String(
                    spec.inputTag.value,
                    spec.maxLen || 999,
                    spec.minLen || 0,
                    spec.isRequired || false
                );
            } else if (spec.dataType === "number") {
                spec.errorMsg.innerHTML = Validate.Number(
                    spec.inputTag.value,
                    spec.min,
                    spec.max,
                    spec.isRequired || false
                );
            } else if (spec.dataType === "date") {
                spec.errorMsg.innerHTML = Validate.RequiredField(
                    spec.inputTag.value,
                    spec.isRequired || false
                );
            } else if (spec.dataType === "radio") {
                let selected = "";
                for (let radio of spec.inputTag) {
                    if (radio.checked) {
                        selected = radio.value;
                        break;
                    }
                }
                spec.errorMsg.innerHTML = Validate.RequiredField(
                    selected,
                    spec.isRequired || false
                );
            } else if (spec.dataType === "select") {
                spec.errorMsg.innerHTML = Validate.RequiredField(
                    spec.inputTag.value,
                    spec.isRequired || false
                );
            } else {
                spec.errorMsg.innerHTML = "Unknown data type.";
            }
            allErrors += spec.errorMsg.innerHTML;
        }

        if (allErrors.length > 0) {
            recLevelMsg.innerHTML = "Please Try Again";
            return;
        } else {
            recLevelMsg.innerHTML = "Data successfully submitted!";
        }

        // Save validated values into editObj
        for (var spec of inputSpecs) {
            if (spec.dataType === "radio") {
                for (let radio of spec.inputTag) {
                    if (radio.checked) {
                        editObj[spec.fieldName] = radio.value;
                    }
                }
            } else if (spec.dataType === "select") {
                editObj[spec.fieldName] = spec.inputTag.value;
            } else {
                editObj[spec.fieldName] = spec.inputTag.value;
            }
        }

        successCallBack(editObj);
    };

    function clearAll() {
        for (var spec of inputSpecs) {
            if (spec.dataType === "radio") {
                for (let radio of spec.inputTag) {
                    radio.checked = false;
                }
            } else {
                spec.inputTag.value = "";
            }
        }
        recLevelMsg.innerHTML = "";
    }

    cancelButton.onclick = function () {
        clearAll();
        cancelCallBack();
    };

    return editDiv;
}
