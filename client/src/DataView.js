import {gql, useQuery, useLazyQuery, useMutation} from '@apollo/client'
import { useState } from 'react';

function DataView() {

    const GET_ALL_USER = gql`

query getAllUser{

    users{
        name
        username
        age
        id
    }
}
`;


const GET_ALL_MOVIES = gql`
query getAllMovies{

movies{
    id
    name
    yearOfPublication
}
}
`;

const GET_MOVIE_BY_NAME = gql`

query getMovieByName($name: String!){
  movie(name: $name){
    
    name
    yearOfPublication

  }
  }

`;


const CREATE_NEW_USER = gql`

mutation creaUtente($input: CreateUserInput!){
  createUser(input: $input) {
    id
    name
    nationality
    age
  }
}

`;


//MUTATION
const [creaUtente] = useMutation(CREATE_NEW_USER);


//LAZY QUERY
const [searchMovie, {data:movieTrovato, error:movieError}] = useLazyQuery(GET_MOVIE_BY_NAME) 


//QUERY
const { data, loading, error, refetch } = useQuery(GET_ALL_USER);

const { data:dataMovies, loading:loadingMovies, error:errorMovies } = useQuery(GET_ALL_MOVIES);



//SET STATE
const [movieSearched, setMovieSearched] = useState("");
const [name, setName] = useState("");
const [username, setUsername] = useState("");
const [nationality, setNationality] = useState("");
const [age, setAge] = useState(0);

  return (
    <div>
        <h1>Lista Utenti</h1>

        <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
        <input type="text" placeholder="Username"  onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="number" placeholder="Age"  onChange={(e)=>{setAge(Number(e.target.value))}} />
        <input type="text" placeholder="Nationality"  onChange={(e)=>{setNationality(e.target.value.toUpperCase())}}/>
        <button onClick={() => {
            creaUtente({variables:{input:{name:name, username: username, age: age, nationality: nationality}}})
            refetch();
    }}>CREA UTENTE</button>

        <div>
        <ul style={{padding:"0"}}>
            {data && data.users.map((user) =>{
               return <li style={{listStyle:"none"}} key={user.id}>
                    <h3>Name: {user.name}</h3>
                    <h4>Username: {user.username}</h4>
                    <hr />
                </li>
                        })}
            
            </ul>
        </div> 


                        <input placeholder='Search Movie... Interstellar' value={movieSearched} onChange={(e)=>setMovieSearched(e.target.value)} />
                        <button onClick={()=>{searchMovie({variables:{name:movieSearched}})}}>Invia</button>

                        <h3>{movieTrovato && movieTrovato.movie.name}</h3>
                        <h3>{movieTrovato && movieTrovato.movie.yearOfPublication}</h3>

        <h1>Movies</h1>
        <div>
            <ul style={{padding:"0"}}>
                {dataMovies && dataMovies.movies.map((movie) =>{
                    return <li style={{listStyle:"none"}} key={movie.id}>
                        <h3>Title: {movie.name}</h3>
                        <h4>Year: {movie.yearOfPublication}</h4>
                        <hr />
                    </li>
                })}

            </ul>

        </div>
    </div>
  )
}

export default DataView