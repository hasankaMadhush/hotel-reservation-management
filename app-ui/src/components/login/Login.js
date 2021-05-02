import { useContext, useState } from 'react';

import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import { MainContext } from 'components/layout/AppContainer';
import { httpPost } from 'networking/http';
import { SIGN_IN } from 'networking/endpoints';
import { Redirect, useHistory } from 'react-router-dom';

function Login() {
  const [state, dispatch] = useContext(MainContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [loginMessage, setLoginMessage] = useState();
  const history = useHistory();

  const doLogin = e => {
    e.preventDefault();
    httpPost(SIGN_IN, credentials)
      .then(res => {
        const data = res.data;
        if (data?.success && data?.token) {
          dispatch({
            type: 'update',
            key: 'user',
            value: data.user,
          });
          history.push('/booking');
        } else if (!data?.success) {
          setLoginMessage(data?.message);
        }
      })
      .catch(err => {
        console.log('error:', err);
      });
  };

  if (state.user) {
    return <Redirect to="/booking" />;
  }

  return (
    <Container className="justify-content-center my-4">
      <Card className="text-center w-50 mx-auto">
        <Card.Body>
          <Card.Title>Login</Card.Title>
          {loginMessage && <Alert variant="danger">{loginMessage}</Alert>}

          <Form className="my-2" onSubmit={doLogin}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col>
                <Form.Control
                  type="email"
                  value={credentials.email}
                  placeholder="Enter email"
                  onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Password
              </Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  value={credentials.password}
                  placeholder="Password"
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
          </Form>
          <span className="my-4 text-muted text-center">
            Not a registered user?
            <span
              variant="link"
              onClick={() => history.push('/register')}
              className="text-primary mx-2"
            >
              sign up
            </span>
          </span>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Login;
