require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("Capstone");
const users = database.collection("users");

async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

run().catch(console.dir);

async function getUsers() {
  const result = await users.find({}).toArray();
  //console.log(`this is the get users result: ${JSON.stringify(result)}`);
	return JSON.stringify(result);
}

async function getUser(email) {
  const result = await users.findOne({email : email})
  if(result){
   console.log(`this is getUser result: ${JSON.stringify(result.email)}`);
   return JSON.stringify(result.email);
  } else {
   console.log('No user found. New user to be created...');
   let noUser = 0
   return noUser;
  }
 }

async function addUser(name, email, password) {
  let result = await users.findOne({email : email})
  if (result){
    console.log('User already exists!')
    return "User already exists"
  } else {
    let newUserInfo = { name, email, password, balance: 100 };
    const createUser = await users.insertOne(newUserInfo);
    console.log('New user successfully created!');
    let newUser = await users.findOne({email : email});
    //console.log(`this is newUser.name result: ${JSON.stringify(retrieveUser.name)}`); ---> returns new user name as string
    console.log(`This is newUser result: ${JSON.stringify(newUser)}`)
    return JSON.stringify(newUser);
  }
}

async function withdrawBalance(email, updates) {
  let retrieveUser = await users.findOne({email : email});
  //console.log(`this is retrieveUser: ${JSON.stringify(retrieveUser)}`); ---> retrieves user object
  let newBalance = retrieveUser.balance - updates;
  //console.log(`this is newBalance: ${newBalance}`); ---> returns integer
  let update = {$set: { balance : newBalance}};
  const result = await users.updateOne({email : email }, update);
  console.log('Balance successfully updated!');
  return newBalance;
}

async function depositBalance(email, updates) {
  let retrieveUser = await users.findOne({email : email});
  //console.log(`this is retrieveUser: ${JSON.stringify(retrieveUser)}`); ---> retrieves user object
  let newBalance = retrieveUser.balance + updates;
  //console.log(`this is newBalance: ${newBalance}`); ---> returns integer
  let update = {$set: { balance : newBalance}};
  const result = await users.updateOne({email : email }, update);
  console.log('Balance successfully updated!');
  return newBalance;
}

async function viewBalance(email) {
  let result = await users.findOne({email : email});
  if (result) {
    let updatedBalance = await JSON.stringify(result.balance);
    return updatedBalance;
  } else {
    console.log(`User with email ${email} not found`);
  }
}

  module.exports = { getUsers, getUser, addUser, withdrawBalance, depositBalance, viewBalance };