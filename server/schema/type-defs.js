const {gql} = require('apollo-server');

const typeDefs = gql`

type User{
id: ID!
name: String!
username: String!
age: Int!
nationality: Nationality!
friends: [User]
favouriteMovies: [Movie]
}

type Movie {
id: ID!
name: String!
yearOfPublication: Int!
isInTheaters: Boolean!

}

input CreateUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: Nationality= BRAZIL
}

input UpdateUsernameInput{
    id: ID!
    username: String!
}

type Query{
    users: [User!]!
    user(id:ID!): User!
    movies: [Movie!]!
    movie(name:String!): Movie!
}

type Mutation{

    createUser(input: CreateUserInput!):User
    deleteUser(id:ID!): User
    updateUsername(input: UpdateUsernameInput!): User

}

enum Nationality {
    ITALY
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }

`;


module.exports = {typeDefs}