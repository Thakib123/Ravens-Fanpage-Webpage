"use strict";

function ajax(url, successFn, errorFn = null) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            successFn(data);
        } else {
            if (errorFn) errorFn(xhr.statusText);
            else console.error("AJAX Error:", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        if (errorFn) errorFn("Request failed");
        else console.error("AJAX Request failed");
    };
    xhr.send();
}
