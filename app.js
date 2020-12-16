const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");


var allEmployees = [];

const promptUser = () =>
 inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the employee'
    },
    {
      type: 'list',
      name: 'role',
      message: `Select the employee's role`,
      default: 'Intern',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'id',
      message: `Enter the employee's employee id number`
    },
    {
      type: 'input',
      name: 'email',
      message: `Enter the employee's email address`
    },
    {
      type: 'input',
      name: "officeNumber",
      message: "Enter the manager's office number",
      when: (answer) => answer.role === "Manager"
    },
{
  type: 'input',
  name: "gitHub",
  message: "Enter the engineer's GitHub username",
  when: (answer) => answer.role === "Engineer"
},
{
  type: 'input',
  name: "school",
  message: "Enter the name of the intern's University",
  when: (answer) => answer.role === "Intern"
},
{
  type: 'confirm',
  name: 'addEmployee',
  message: 'Will you be adding additional employees?',
}
])
    .then((answers) => {
    switch (answers.role) {
        case 'Manager':
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            allEmployees.push(manager);
            console.log('Employee added successfully');
            break;
        case 'Engineer':
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
            allEmployees.push(engineer);
            console.log('Employee added successfully');
            break;
        case 'Intern':
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            allEmployees.push(intern);
            console.log('Employee added successfully');
            break;
        }
    if (answers.additionalEmployee) {
      promptUser();
} else {
    const renderHTML = render(allEmployees);
    fs.writeFile(outputPath, renderHTML, (err) => {
    if (err) {
    console.log(err);
    }else{
console.log(`success! Your new html page is ready to view.\ncheck inside the 'output' folder`);
}
 })
  }
   })

promptUser();


      


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
