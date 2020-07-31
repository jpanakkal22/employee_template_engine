// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(username, role){
        this.username = username;
        this.role = "Engineer";
    }

    getGithub(){
        return this.username;
    }

    getRole(){
        return this.role;
    }
}

module.exports = Engineer;