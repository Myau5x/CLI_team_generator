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

/**
 * reqursion ?
 * [empoyee name, id , email, type(list) , github whem engineer, school when intern , number when manager,  new employee [Yes No](* or confirm type)] if new enployee AskQuestions()
 * 
 */
const team = [] ///array of employers

const SaveManager = data =>{
  team.push(new Manager(data.name, data.ID, data.email,data.number));
}


const saveEmployee = data =>{
    switch (data.role) {
        case 'Engineer':
            team.push( new Engineer(data.name, data.ID, data.email, data.github));
            
            break;
        case 'Intern':
            team.push( new Intern(data.name, data.ID, data.email, data.school));
            
            break;     
        default:
            break;
    }
}
questionMan = [        

  {
      type:"input",
      message: "What is Manager Name?",
      name: "name"
    },
    {
      type:"input",
      message: "What is Manager ID",
      name: "ID"
    },
  {
      type:"input",
      message: "What is Manager email?",
      name: "email"
    },
   
    {
      type:"input",
      message: "What is Manager office number",
      name: "number",
    },
    {
      type:"confirm",
      message: "Do you want to add more employees?",
      name: "newEE"
      
    },
  ];

questions = [        
    {
      type: "list",
      choices: ['Intern','Engineer'],
      message: "What is Employee Role",
      name: "role"
    },
    {
        type:"input",
        message: "What is Employee Name?",
        name: "name"
      },
      {
        type:"input",
        message: "What is Employee ID",
        name: "ID"
      },
    {
        type:"input",
        message: "What is Employee email?",
        name: "email"
      },
      {
        type:"input",
        message: "What is Engineer Github username?",
        name: "github",
        when: (answers) => answers.role === 'Engineer'
      },
      {
        type:"input",
        message: "What is Intern school?",
        name: "school",
        when: (answers) => answers.role === 'Intern'
      },
      {
        type:"confirm",
        message: "Do you want to add more employees?",
        name: "newEE"
        
      },
    ];
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function(err) {

    if (err) {
      return console.log(err);
    }
  
    console.log("Success!");
  
  });

}

function askTeam() {
    inquirer
    .prompt(questions)
    .then((response) => {
        saveEmployee(response);
        if (response.newEE){
            askTeam();
        }
        else{
            //console.log(team);
            const html = render(team);
            //console.log(html);
            ////check if OUTPUT_DIR exist if not then create
            try {
              if (fs.existsSync(OUTPUT_DIR)) {
                console.log("Directory exists.")
              } else {
                console.log("Directory does not exist.")
                fs.mkdirSync(OUTPUT_DIR);
                console.log("directory was created")
              }
            } catch(e) {
              console.log("An error occurred.")}


            writeToFile(outputPath,html);
        }
  
      }
    );
  
  }
//askTeam();
function askManager(){
  inquirer
  .prompt(questionMan)
  .then((response) => {
    SaveManager(response);
    if (response.newEE){
        askTeam();
    }
    else{
        //console.log(team);
        const html = render(team);
        //console.log(html);
        ////check if OUTPUT_DIR exist if not then create
        try {
          if (fs.existsSync(OUTPUT_DIR)) {
            console.log("Directory exists.")
          } else {
            console.log("Directory does not exist.")
            fs.mkdirSync(OUTPUT_DIR);
            console.log("directory was created")
          }
        } catch(e) {
          console.log("An error occurred.")}


        writeToFile(outputPath,html);
    }

  })
}
askManager();

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
