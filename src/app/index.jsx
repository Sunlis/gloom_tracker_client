import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from './reducers/root-reducer';
import { Main } from './components/main.jsx';
import { Socket } from './components/sockets.jsx';

const store = createStore(rootReducer);

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <div>
      	  <Main></Main>
          <Socket></Socket>
        </div>
      </Provider>
    );
  }
}

render(<App/>, document.getElementById('app'));
