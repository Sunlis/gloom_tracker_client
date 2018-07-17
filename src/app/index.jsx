import * as React from 'react';
import {render} from 'react-dom';
// import { MuiThemeProvider } from '@material-ui/core/styles';

import {Main} from './components/main.jsx';

class App extends React.Component {
  render () {
    return (
    	<Main></Main>
    );
  }
}

render(<App/>, document.getElementById('app'));
