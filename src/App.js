import './App.css';
import { ApolloProvider } from '@apollo/client';
import {client} from './client/apollo'
import {TaskList} from './TaskList'
import {TaskCreate} from './TaskCreate'

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <TaskList/>
        <TaskCreate/>
    </ApolloProvider>
    </div>
  );
}

export default App;
