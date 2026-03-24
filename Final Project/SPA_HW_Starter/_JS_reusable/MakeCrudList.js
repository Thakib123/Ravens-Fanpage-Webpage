"use strict";

function MakeCrudList({
    title = "Untitled List",
    objList = [
        { name: "Sample", value: "..." }
    ],
    templateHTML = "${name}: ${value}",
    inputSpecs = [
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
} = {}) {
    let isEditing = false;

    const wrapper = document.createElement("div");
    wrapper.classList.add("crudList");

    const heading = document.createElement("h2");
    heading.textContent = title;
    wrapper.appendChild(heading);

    const listArea = document.createElement("div");
    listArea.classList.add("listArea");
    wrapper.appendChild(listArea);

    const insertBtn = document.createElement("button");
    insertBtn.textContent = "Insert";
    wrapper.appendChild(insertBtn);

    function renderList() {
        listArea.innerHTML = "";

        objList.forEach((obj, index) => {
            const childDiv = document.createElement("div");
            childDiv.classList.add("listItem");

            try {
                if (typeof templateHTML === "function") {
                    childDiv.innerHTML = templateHTML(obj);
                } else {
                    const templateFn = new Function("obj", "with(obj) { return `" + templateHTML + "`; }");
                    childDiv.innerHTML = templateFn(obj);
                }
            } catch (e) {
                childDiv.innerHTML = `<span style='color:red;'>Template error: ${e.message}</span>`;
            }

            // Edit Button
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = function () {
                if (isEditing) return;
                isEditing = true;

                const editBox = MakeEditArea({
                    inputSpecs,
                    editObj: structuredClone(obj),
                    successCallBack: function (updatedObj) {
                        objList[index] = updatedObj;
                        renderList();
                        isEditing = false;
                    },
                    cancelCallBack: function () {
                        isEditing = false;
                    }
                });

                childDiv.appendChild(editBox);
            };

            // Delete Button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = function () {
                if (isEditing) return;
                objList.splice(index, 1);
                renderList();
            };

            childDiv.appendChild(editBtn);
            childDiv.appendChild(deleteBtn);
            listArea.appendChild(childDiv);
        });
    }

    insertBtn.onclick = function () {
        if (isEditing) return;
        isEditing = true;

        const newObj = {};
        const editBox = MakeEditArea({
            inputSpecs,
            editObj: newObj,
            successCallBack: function (validatedObj) {
                objList.push(validatedObj);
                renderList();
                isEditing = false;
            },
            cancelCallBack: function () {
                isEditing = false;
            }
        });

        wrapper.appendChild(editBox);
    };

    renderList();
    return wrapper;
}
