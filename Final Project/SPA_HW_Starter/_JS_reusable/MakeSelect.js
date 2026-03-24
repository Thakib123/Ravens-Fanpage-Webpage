"use strict";
function MakeSelect({ label = "", name = "", options = [] }) {
    const wrapper = document.createElement("div");

    const lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.htmlFor = name;

    const select = document.createElement("select");
    select.name = name;

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select...";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    // Add all options
    for (const option of options) {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    }

    wrapper.appendChild(lbl);
    wrapper.appendChild(select);
    return wrapper;
}
