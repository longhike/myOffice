const employee = (role) => [
    {
        type: 'input',
        name: 'name',
        message: "What is the " + role + "'s name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the " + role + "'s ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the " + role + "'s e-mail address?"
    }
]

module.exports = {
    manager: [...employee("manager"), {
        type: "input",
        name: "officeNumber",
        message: "What is their office number?"
    }],
    engineer: [...employee("engineer"), {
        type: "input",
        name: "github",
        message: "What is their github username?"
    }],
    intern: [...employee("intern"), {
        type: "input",
        name: "school",
        message: "What school do they go to?"
    }],
    chooseRole: {
        type: "list",
        name: "role",
        message: "What employee role would you like to add next?",
        choices: ['Engineer', 'Intern', "Exit"]
    }
}