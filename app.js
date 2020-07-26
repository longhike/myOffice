const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require('./questions')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
init();

function buildManager() {
    inquirer
        .prompt(questions.manager)
        .then(answers => {
            // build manager 
            const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            // add to employee list
            employees.push(newManager)

            chooseRole()
        })
}

function buildEngineer() {
    inquirer
        .prompt(questions.engineer)
        .then(answers => {
            // build engineer 
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            // add to employee list
            employees.push(newEngineer)

            chooseRole()
        })
}

function buildIntern() {
    inquirer
        .prompt(questions.intern)
        .then(answers => {
            // build intern 
            const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
            // add to employee list
            employees.push(newIntern)

            chooseRole()
        })
}

function buildHTML() {
    const html = render(employees)
    console.log(html)
    fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
    })
}

function chooseRole() {
    inquirer.prompt(questions.chooseRole)
        .then(answer => {
            switch (answer.role) {
                case "Manager":
                    // call build manager questions
                    buildManager();
                    break;
                case "Engineer":
                    // call build engineer questions
                    buildEngineer();
                    break;
                case "Intern":
                    // call build intern questions
                    buildIntern();
                    break;
                case "Exit":
                    // call htmlRenderer function
                    buildHTML();
                    break;
            }
        })
}

function init() {
    buildManager();
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```