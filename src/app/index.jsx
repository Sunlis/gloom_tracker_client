import * as React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <span>yo</span>
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));
