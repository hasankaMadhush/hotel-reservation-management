import { useContext } from 'react';
import dayjs from 'dayjs';
import { Container, Card, Col, Form, Row } from 'react-bootstrap';

import { MainContext } from 'components/layout/AppContainer';
const DATE_FORMAT = 'ddd,MMM DD, YYYY';
function BookingSummary() {
  const [state] = useContext(MainContext);

  // no need to use useMemo since not much of calculation
  const nights = dayjs(state.checkout).diff(dayjs(state.checkIn), 'day');
  const totalCharges = nights * state.board.rate;

  return (
    <Container className="justify-content-center my-4">
      <Card className="w-50 mx-auto">
        <Card.Body>
          <Card.Title className="text-center">Your Booking Summary</Card.Title>
          <hr></hr>
          <Form.Group as={Row}>
            <Form.Label column>Check in:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{dayjs(state.checkIn).format(DATE_FORMAT)}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.checkIn} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Check out:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{dayjs(state.checkout).format(DATE_FORMAT)}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.checkout} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Hotel:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{state.property.label}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.rooms} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Rooms:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{state.rooms}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.rooms} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Guests:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{state.board.occupancy}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.board.occupancy} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Rate:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{state.board.rate}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.board.rate} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Board:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{state.board.board}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.board.board} /> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column>Stays:</Form.Label>
            <Col className="text-right">
              <Form.Label column>{`${nights} nights`}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.board.board} /> */}
            </Col>
          </Form.Group>
          <hr></hr>
          <Form.Group as={Row}>
            <Form.Label column>Total Charges</Form.Label>
            <Col className="text-right">
              <Form.Label column>{totalCharges}</Form.Label>
              {/* <Form.Control plaintext readOnly defaultValue={state.board.board} /> */}
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookingSummary;
