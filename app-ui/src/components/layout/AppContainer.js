import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import classNames from 'classnames';
import { css, StyleSheet } from 'aphrodite';

import Home from 'components/Home';

function AppContainer() {
  return (
    <Router>
      <div className={classNames(css(styles.pageWrapper), 'd-flex justify-content-center')}>
        <Switch>
          <Route>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const styles = StyleSheet.create({
  pageWrapper: {
    height: '100%',
    overflowX: 'none',
    width: '100%',
  },
});
export default AppContainer;
