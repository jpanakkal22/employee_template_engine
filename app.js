const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array to contain employee objects
var employees = [];
//Inquirer questions
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
    name: 'Engineer',
    message: 'Is the employee and ENGINEER?'
  },
  {
    type: 'input',
    name: 'Github',
    message: "What is the ENGINEER's GitHub username?",
    when: function(answers){
      return answers.Engineer;
    } 
  },
  {
    type: 'confirm',
    name: "Manager",
    message: "Is the employee a MANAGER?",
    when: function(answers){
      return !switchPrompt('Engineer')(answers);
    }
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "What is the MANAGER's office number?",
    when: switchPrompt('Manager'),   
  },
  {
    type: 'confirm',
    name: "Intern",
    message: "Is the employee an INTERN?",
    when: function(answers){      
      return (!switchPrompt('Manager')(answers) && !switchPrompt('Engineer')(answers));
    }
  },
  {
    type: 'input',
    name: 'school',
    message: "Where did the employee go to school?",
    when: switchPrompt('Intern'),   
  }
  
];

//Function creates objects from inquirer response and pushes into employees array
function ask(){
  inquirer.prompt(questions).then((answers) => {
    
    if(answers.Engineer){
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.Github);
      employees.push(engineer);
    }
    else if(answers.Manager){
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      employees.push(manager);
    }
    else{
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      employees.push(intern);
    }
    //Prompts user to enter any more employees or Done.
    inquirer.prompt(
      {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to enter another employee (just hit enter for YES)?',
        default: true,
      }
    ).then((response) => {
      if(response.askAgain === true){
        ask();
      }
      else{
        console.log("Done");
        const html = render(employees);
        fs.writeFile("./output/team.html", html, function(error){
          if(error){
            return error;
          }
          console.log("File written!");
        })
      }
    })    
  })
}

ask();

//Function to switch prompts depending on answers
function switchPrompt(res){
  return function(answers){
    return answers[res];
  }
}



