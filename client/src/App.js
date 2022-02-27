import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import './App.css';
import DataView from './DataView';

function App() {

  const client = new ApolloClient({

    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'

  });

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <DataView />
    </div>
    </ApolloProvider>
  );
}

export default App;
