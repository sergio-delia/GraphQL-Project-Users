const {ApolloServer} = require("apollo-server");
const {typeDefs} = require('./schema/type-defs');
const {resolvers} = require('./schema/resolvers');

const server = new ApolloServer({typeDefs , resolvers, context: ({req}) =>{
  return {req, name:"Sergio"}
}})

server.listen().then(({url}) =>{
    console.log(`YOUR SERVER IS RUNNING ON ${url}`)
});


/*
ESEMPIO DI QUERY

query getAllUsers {
  users {
    id
    age
    name
    nationality
  }
}

ESEMPIO DI MUTATION -> Guardare file type-defs.js

mutation aggiorna($input: UpdateUsernameInput!){
  updateUsername(input: $input) {
    name
    username
  }
}


*/