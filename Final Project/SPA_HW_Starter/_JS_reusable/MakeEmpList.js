"use strict"; // prevent browser from globally auto-declaring variables

function MakeEmpList({ employeeList = [{}], title = "Untitled Employee List" }) {

    // Helper function for generating individual employee components
    function MakeEmp({ title = "unknown title", salary = -1 }) {

        // Create a div for individual employee info
        var empObj = document.createElement("div");
        empObj.classList.add("emp"); // Add styling class for the employee component

        // Build the UI using backticks for easy HTML structure creation
        empObj.innerHTML = `
            <div class='empInfoClass'></div>
            <button class='titleButtonClass'>Change Title to: </button>
            <input class='newTitleInputClass'/> <br/>
            <button class='salaryButtonClass'>Change Salary By Amount: </button>
            <input class='salaryAmountInputClass'/> 
        `;

        // Access the DOM elements for interactive buttons and inputs
        var empInfo = empObj.getElementsByClassName("empInfoClass")[0];
        var titleButton = empObj.getElementsByClassName("titleButtonClass")[0];
        var newTitleInput = empObj.getElementsByClassName("newTitleInputClass")[0];
        var salaryButton = empObj.getElementsByClassName("salaryButtonClass")[0];
        var salaryAmount = empObj.getElementsByClassName("salaryAmountInputClass")[0];

        // Function to display current title and salary
        var display = function () {
            empInfo.innerHTML = `
                <p>
                    Title: ${title}<br/>
                    Salary: ${formatCurrency(salary)}
                </p>`;
        };

        // Setter for title
        empObj.setTitle = function (newTitle) {
            title = newTitle;
            display(); // Update the display with the new title
        };

        // Method to change salary based on input value
        empObj.changeSalary = function (changeAmount) {
            var n = Number(changeAmount); // Convert input to a number
            salary = salary + n; // Adjust salary
            display(); // Show updated salary
        };

        // Initial display call to populate the UI with current values
        display();

        // Event listeners for buttons to change title and salary
        titleButton.onclick = function () {
            empObj.setTitle(newTitleInput.value);
        };

        salaryButton.onclick = function () {
            empObj.changeSalary(salaryAmount.value);
        };

        // Helper function to format salary as currency
        function formatCurrency(numStr) {
            numStr += ""; // Convert to string if it's not
            numStr = numStr.replace("$", "").replace(",", ""); // Clean up format

            var num = Number(numStr); // Convert back to number
            return num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
        }

        return empObj; // Return the employee component
    }

    // Main function for generating the entire employee list
    var empListComp = document.createElement("div");
    empListComp.classList.add("empList");
    empListComp.innerHTML = `<h2>${title}</h2>`; // Add title to the list

    // Loop through each employee object and create employee components
    for (var empObj of employeeList) {
        empListComp.appendChild(MakeEmp(empObj)); // Append individual employee component
    }

    return empListComp; // Return the complete employee list component
}
