import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppContainer from 'components/layout/AppContainer';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AppContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
