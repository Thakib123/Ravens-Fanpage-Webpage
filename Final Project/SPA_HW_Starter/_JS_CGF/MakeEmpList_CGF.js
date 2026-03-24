"use strict"; // prevent browser from globally auto-declaring variables

function MakeEmpList_CGF() {
    var ele = document.createElement("div");

    // Define Employee Lists for May and July
    var MayEmployeeList = [
        { title: "Manager", salary: 60000 },
        { title: "Developer", salary: 50000 },
        { title: "Designer", salary: 45000 }
    ];
    var MayEmpComp = MakeEmpList({
        employeeList: MayEmployeeList,
        title: "May Employee List"
    });
    ele.appendChild(MayEmpComp); // Append the May Employee List

    var JulyEmployeeList = [
        { title: "Accountant", salary: 55000 },
        { title: "HR Specialist", salary: 48000 },
        { title: "Intern", salary: 30000 }
    ];
    var JulyEmpComp = MakeEmpList({
        employeeList: JulyEmployeeList,
        title: "July Employee List"
    });
    ele.appendChild(JulyEmpComp); // Append the July Employee List

    // Call MakeEmpList with empty object for default case (no input)
    var defaultEmpComp = MakeEmpList({});
    ele.appendChild(defaultEmpComp);

    return ele; // Return the complete container with employee lists
}
