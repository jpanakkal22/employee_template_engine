const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

const questions = [
  {
    type: "input",
    message: "Enter emloyee name",
    name: "name"
  },
  {
    type: "input",
    message: "Enter employee id",
    name: "id"
  },
  {
    type: "input",
    message: "Enter employee email address",
    name: "email"
  },
  
  {
    type: 'confirm',
    name: 'engineer',
    message: 'Is the employee and ENGINEER?'
  },
  {
    type: 'input',
    name: 'Github',
    message: "What is the ENGINEER's GitHub username?",
    when: function(answers){
      return answers.engineer;
    } 
  },
  {
    type: 'confirm',
    name: "manager",
    message: "Is the employee a MANAGER?",
    when: function(answers){
      return !switchPrompt('engineer')(answers);
    }
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "What is the MANAGER's office number?",
    when: switchPrompt('manager'),   
  },
  {
    type: 'confirm',
    name: "intern",
    message: "Is the employee an INTERN?",
    when: function(answers){      
      return (!switchPrompt('manager')(answers) && !switchPrompt('engineer')(answers));
    }
  },
  {
    type: 'input',
    name: 'school',
    message: "Where did the employee go to school?",
    when: switchPrompt('intern'),   
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another employee (just hit enter for YES)?',
    default: true,
  }    
];

//Function to switch prompts depending on answers
function switchPrompt(res){
  return function(answers){
    return answers[res];
  }
}

//Recursive function for prompts
function ask() {
  inquirer.prompt(questions).then((answers) => {    
    if (answers.askAgain) {
      ask();
    } else {
      console.log('Done');
    }
  });
}

ask();


