import { useContext } from 'react';

import { Redirect } from 'react-router-dom';

import BookingConfirmation from 'components/booking/BookingConfirmation';
import BookingSummary from 'components/booking/BookingSummary';
import { MainContext } from 'components/layout/AppContainer';

function Checkout() {
  const [state] = useContext(MainContext);

  if (!state?.property) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <BookingSummary />
      <BookingConfirmation />
    </>
  );
}

export default Checkout;
