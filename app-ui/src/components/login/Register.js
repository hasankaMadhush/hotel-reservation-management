import { httpPost } from 'networking/http';
import { SIGN_UP } from 'networking/endpoints';
import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Register({ redirect }) {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginMessage, setLoginMessage] = useState();
  const history = useHistory();

  const doLogin = e => {
    e.preventDefault();
    setLoginMessage();
    httpPost(SIGN_UP, userForm)
      .then(res => {
        const data = res.data;
        if (data?.success && data?.user) {
          setLoginMessage({ msg: data?.message, variant: 'success' });
        } else if (!data?.success) {
          setLoginMessage({ msg: data?.message, variant: 'danger' });
        }
      })
      .catch(err => {
        console.log('error:', err);
      });
  };

  return (
    <Container className="justify-content-center my-4">
      <Card className="text-center w-50 mx-auto">
        <Card.Body>
          <Card.Title>Register</Card.Title>
          {loginMessage && <Alert variant={loginMessage.variant}>{loginMessage.msg}</Alert>}

          <Form className="my-2" onSubmit={doLogin}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={userForm.name}
                  placeholder="Enter Name"
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col>
                <Form.Control
                  type="email"
                  value={userForm.email}
                  placeholder="Enter email"
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
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
                  value={userForm.password}
                  placeholder="Password"
                  onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
          <span className="my-4 text-muted text-center">
            Registered user?
            <span
              variant="link"
              onClick={() => history.push('/login')}
              className="text-primary mx-2"
            >
              sign in
            </span>
          </span>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Register;
