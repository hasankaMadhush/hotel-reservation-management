import { Alert, Row } from 'react-bootstrap';

function BookingFullAlert() {
  return (
    <Row className="mx-4 my-4 justify-content-center">
      <Alert variant="danger">
        Sorry we are out of space. Please try our other hotels or different dates.
      </Alert>
    </Row>
  );
}

export default BookingFullAlert;
