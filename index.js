const express = require('express');
const app     = express();
const cors    = require('cors');
const dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


app.get('/account/create/:name/:email/:password', function (req, res) {
    async function createAccount(){
        let result = await dal.addUser(req.params.name, req.params.email, req.params.password);
        //console.log(`this is createAccount result before if(): ${result}`);
        if(result === 'User already exists'){
            //console.log('User already exists, ' + `this is createAccount result after if(): ${result}`);
            res.status(400).send('User already exists');
        }else{
            //const newUser = await dal.addUser(req.params.name, req.params.email, req.params.password);
            console.log(`this is newUser result ${JSON.stringify(result)}`); //returns new user as object
            res.send(JSON.stringify(result));
        }
    } 
    createAccount();
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    async function loginUser() {
        let result = await dal.getUser(req.params.email);
        console.log(`this is loginUser result: ${result}`);
        result[0].password === req.params.password ? res.send(user[0]) : res.send('Login failed: wrong password');
		if(result === 0){
        res.send('Login failed: user not found')
        }
    }
    loginUser();
});

// all accounts
app.get('/account/all', function (req, res) {
    async function allData() {
        let allData = await dal.getUsers();
        //console.log(allData);
        res.send(allData); 
    }    
    allData();
}); 

// update - withdraw amount
app.get('/account/update/withdraw/:email/:amount', function (req, res) {
    async function userUpdateWithdraw() {
        let updates = Number(req.params.amount);
        let result = await dal.withdrawBalance(req.params.email, updates);
        //console.log(`this is updateUser result stringified: ${JSON.stringify(result)}`); ---> return integer
        console.log(`this is updateUser result: ${result}`); // ---> returns integer
        res.send(JSON.stringify(result));
    }
    userUpdateWithdraw();
});

// update - deposit amount
app.get('/account/update/deposit/:email/:amount', function (req, res) {
    async function userUpdateDeposit() {
        let updates = Number(req.params.amount);
        let result = await dal.depositBalance(req.params.email, updates);
        //console.log(`this is updateUser result stringified: ${JSON.stringify(result)}`); ---> return integer
        console.log(`this is updateUser result: ${result}`); // ---> returns integer
        res.send(JSON.stringify(result));
    }
    userUpdateDeposit();
});

// view balance amount
app.get('/account/update/balance/:email', function (req, res) {
    async function viewBalance() {
        let result = await dal.viewBalance(req.params.email);

        if(result == ''){
            res.send('User not found. Please try again');
        } else {
            console.log(`this is viewBalance result stringified: ${JSON.stringify(result)}`); //---> return integer
            //console.log(`this is updateUser result: ${result}`); // ---> returns integer
            res.send(JSON.stringify(result)); 
        }
    }
    viewBalance();
});

app.listen(3000);
console.log('Running on port 3000');