import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import { css, StyleSheet } from 'aphrodite';
import { ErrorBoundary } from 'react-error-boundary';

import AppNavBar from 'components/layout/AppNavBar';
import BookingCheck from 'components/booking/BookingCheck';
import Checkout from 'components/booking/Checkout';
import ErrorContainer from 'libs/errors/ErrorContainer';
import Login from 'components/login/Login';
import Register from 'components/login/Register';

const MainContext = React.createContext(null);

const INITIAL_STATE = {
  property: null,
  checkIn: '',
  checkout: '',
  rooms: 1,
  board: {},
  user: null,
};
function AppContainer() {
  const reducer = (state, action) => {
    if (action.type === 'update') {
      return { ...state, [action.key]: action.value };
    }
  };
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <MainContext.Provider value={[state, dispatch]}>
      <Router>
        <div className={classNames(css(styles.pageWrapper))}>
          <AppNavBar />
          <ErrorBoundary FallbackComponent={ErrorContainer}>
            <Container>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/booking">
                  <Checkout />
                </Route>
                <Route>
                  <BookingCheck />
                </Route>
              </Switch>
            </Container>
          </ErrorBoundary>
        </div>
      </Router>
    </MainContext.Provider>
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
export { MainContext };
