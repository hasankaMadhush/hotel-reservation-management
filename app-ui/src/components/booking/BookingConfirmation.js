import { useContext, useState } from 'react';

import { Button, Container, Card, Col, Form, Row } from 'react-bootstrap';
import { MainContext } from 'components/layout/AppContainer';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { httpPost } from 'networking/http';
import { BOOK_RESERVATION } from 'networking/endpoints';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const PAYMENT_TYPES = [
  { label: 'Credit Card - Online', value: 'CCO' },
  { label: 'Credit Card - Location', value: 'CCL' },
  { label: 'Cash', value: 'CAS' },
];
function BookingConfirmation() {
  const [state] = useContext(MainContext);
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES[0]['value']);
  const user = state?.user;
  const history = useHistory();

  const bookReservation = () => {
    const data = {
      checkIn: state.checkIn,
      checkout: state.checkout,
      property: state.property.value,
      rooms: state.rooms,
      board: state.board.board,
      occupancy: state.board.occupancy,
      rate: state.board.rate,
      user: state.user,
      paymentType: paymentType,
    };

    httpPost(BOOK_RESERVATION, data).then(res => {
      const data = res.data;
      if (data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Reservation Successful',
          text: data.message,
        });
        history.push('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Bad Luck!',
          text: data.message,
          footer: '<a href="/">Try again...</a>',
        });
        history.push('/');
      }
    });
  };

  return (
    <Container className="justify-content-center my-4">
      <Card className="w-50 mx-auto">
        <Card.Body>
          <Card.Title className="text-center">Confirm your booking</Card.Title>
          <hr></hr>
          <Form.Group as={Row}>
            <Form.Label column>Name:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{user?.name}</Form.Label>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Email:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{user?.email}</Form.Label>
            </Col>
          </Form.Group>
          <Card.Title className="text-center">Payment Details</Card.Title>
          <Form.Label>Select payment type</Form.Label>
          {PAYMENT_TYPES.map(paymentOption => (
            <Form.Check
              key={paymentOption.value}
              type="radio"
              label={paymentOption.label}
              checked={paymentOption.value === paymentType}
              onChange={() => setPaymentType(paymentOption.value)}
            />
          ))}
          <hr></hr>
          <Row className="my-4">
            <Col sm="6" className="mx-auto">
              <Button
                variant="warning"
                className="text-white"
                block
                onClick={() => bookReservation()}
              >
                Complete Reservation
                <FontAwesomeIcon icon={faAngleDoubleRight} className={'mx-2'} />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingConfirmation;
