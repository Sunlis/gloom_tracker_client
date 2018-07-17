import * as React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Main} from './components/main.jsx';

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Main></Main>
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));
