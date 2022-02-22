// 1. Use one of the http request libraries, to access API
// 2. Grab data and filter by given criteria
// 3. Save the data into JSON file
// 4. Pull the data from JSON file, and display in browser using HTTP module

// url : https://jsonplaceholder.typicode.com/users

let fs = require('fs');
let http = require('http');
let axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';
axios.get(url)
    .then(response => {
        // console.log(response.data);
        jsonData = JSON.stringify(response.data);
        jsonData2 = []
        for(const [key, value] of Object.entries(response.data)){
            jsonData2.push(
            {    
                "id": value.id,
                "name": value.name,
                "email": value.email,
                "street": value.address.street
            })
        }
        jsonData2 = JSON.stringify(jsonData2);
        fs.writeFileSync('data.json', jsonData);
        fs.writeFileSync('data2.json', jsonData2);
    }).catch(error => {
        console.log(error);
    })


// 3rd step
const readData = fs.readFileSync('data.json');
const fileData = readData.toString();
const data = JSON.parse(fileData);
// console.log(data);

const readData2 = fs.readFileSync('data2.json')
const fileData2 = readData2.toString();
const data2 = JSON.parse(fileData2);
console.log(data2);

convertedData = ''
for(const [key, value] of Object.entries(data)){
    convertedData += `<h2> ${value.id}. ${value.name} </h2>
     <p> ${value.email}. ${value.address.street} </p>`
}


// 4th step 
http.createServer(function(req, res){
    // res.writeHead(200, {'content-type': 'text/html'})
    res.write('<h1>JSON DATA</h1>')
    res.write(convertedData);
}).listen(8000);

