// Using Axios :
// 1. grab API information and filter by given criteria, 
// 2. then save the data info JSON file. 
// 3. pull the data from JSON file and display in browser using HTTP server module

let fs = require('fs');
let http = require('http');
const axios = require('axios');

let jsonData = ''; 

// step-1
axios.get('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    console.log(response.data);  //to console object type data
    // step-2 : stringifing data and writing in json file
    jsonData = JSON.stringify(response.data);  //to stringify object data to json
    //fs.writeFileSync('api-json.json', jsonData);  // it is already written!
  })
  .catch(error => {
    console.log(error);
  });


// step-3: Reading JSON file
const readData = fs.readFileSync('api-json.json');
const fileData = readData.toString()
const data = JSON.parse(fileData)
console.log(data)

// Iterating JSON object
convertedData = '';
for (const [key, value] of Object.entries(data)) {
  convertedData += `
                    <h3> ${value.id}. ${value.name} </h3>
                    <p> username: ${value.username} , email: ${value.email} </p>
                    `;
}

// Creating HTTP server and displaying JSON data from file
http.createServer(function(req, res){
    // http header
    res.writeHead(200, {'Content-Type': 'text-html'});
    res.write('<h1> Pulling JSON data </h1>');
    res.write(convertedData);
    res.end();
}).listen(9000);