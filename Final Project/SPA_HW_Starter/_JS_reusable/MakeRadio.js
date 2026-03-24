"use strict";
function MakeRadio({ label = "", name = "", options = [] }) {
    const wrapper = document.createElement("div");

    const groupLabel = document.createElement("label");
    groupLabel.textContent = label;
    wrapper.appendChild(groupLabel);

    for (const option of options) {
        const radioWrapper = document.createElement("div");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = name;
        input.value = option;

        const lbl = document.createElement("label");
        lbl.textContent = option;
        lbl.htmlFor = option;

        radioWrapper.appendChild(input);
        radioWrapper.appendChild(lbl);
        wrapper.appendChild(radioWrapper);
    }

    return wrapper;
}
