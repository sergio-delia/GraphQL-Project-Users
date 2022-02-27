const {UserList, MovieList} = require('../FakeData');
const _ = require("lodash")

const resolvers = {

    Query:{

        //USERS RISOLVERS
        users: (parent, args, context) =>{
            console.log(context);
            return UserList;
        },
        user: (parent, args) =>{

            const id = args.id; //quando otteniamo l'id da args ci viene passato come stringa quindi dopo va trasformato in number
            const user = _.find(UserList, {id: Number(id)});
            return user;

        },

        //MOVIES RESOLVERS
        movies: () =>{
            return MovieList;
        },
        movie: (parent, args) =>{

            const name = args.name;
            const movie = _.find(MovieList, {name: name});
            return movie;

        }      
    },

    User: {
        favouriteMovies: () =>{
            return _.filter(MovieList, (movie)=> movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010)
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id
            user.id = lastId+1;
            UserList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const {id, username} = args.input;
            let userUpdated;
            UserList.forEach((user) =>{
                if(user.id == Number(id)){
                    user.username = username;
                    userUpdated = user;
                }
            });

            return userUpdated;
        },

        deleteUser: (parent, args) =>{
            const id = args.id;
            _.remove(UserList,(user)=> user.id === Number(id));
            return null;
        }
    }


}


module.exports = {resolvers}