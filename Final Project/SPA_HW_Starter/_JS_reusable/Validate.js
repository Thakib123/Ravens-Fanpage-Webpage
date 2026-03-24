"use strict";

// We are still following JS file naming convention: 
// "JS file name matches the single JS function or object defined within."
// Validate object matches Validate.js 
var Validate = {};

// Now we add public methods to Validate object (all validation functions)

Validate.Number = function (val, min = null, max = null, isRequired = false) {
    if (isRequired && val.trim() === "") return "Required";
    if (val.trim() === "") return ""; // allowed if not required
    const num = parseFloat(val);
    if (isNaN(num)) return "Must be a number.";
    if (min !== null && num < min) return `Too small. Min = ${min}.`;
    if (max !== null && num > max) return `Too large. Max = ${max}.`;
    return "";
  };

// Using Fat Arrow notation 
// (just an alternative to "regular" function definition above)
Validate.Integer = (inputVal, isRequired) => {
    if (isRequired && inputVal.length === 0) {
        return "Required";
    }

    if (!isNaN(inputVal)) { // means it is a number... 
        var numVal = Number(inputVal);
        var diff = numVal - Math.floor(numVal);
        if ((diff < 0.0001) && (diff > -0.0001)) {
            return ""; // no error message means input passed validation.
        } else {
            return "Error. You entered a number, but it's not an integer.";
        }
    }
    return "Error. Not a valid integer (not a number either).";
}

Validate.String = function (val, maxLen = 999, minLen = 0, isRequired = false) {
    if (isRequired && val.trim() === "") return "Required";
    if (val.length < minLen) return `Too short. Minimum ${minLen} characters.`;
    if (val.length > maxLen) return `Too long. Max ${maxLen} characters.`;
    return "";
  };

/* Note about date validation... I wanted to write some JS code (like above)
to check if a user entered string was a valid date but it actually seems difficult 
(and looks like you need a framework !!!)  So, we will just use the HTML5 
input type="date" which provides a nice date UI and no way the user can enter 
an invalid date. All we need to do is check that the user clicked a date 
(if the date input is required). For this, we can use the generic "RequiredField"
validation below, for a date or any type of input). 
*/
Validate.RequiredField = (inputVal, isRequired = false) => {
    if (isRequired && inputVal.trim() === "") {
      return "Required";
    }
    return "";
  };