import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function ErrorContainer({ error, resetErrorBoundary }) {
  const [priorLocation, setPriorLocation] = useState();
  const location = useLocation();

  useEffect(() => {
    // let the error boundary retry if the url changes
    if (!priorLocation) {
      setPriorLocation(location);
    } else if (priorLocation !== location) {
      resetErrorBoundary();
    }
  }, [location, priorLocation, resetErrorBoundary]);

  return (
    <Container>
      <h1 className="mt-5 text-center">We're sorry, something went wrong</h1>
      <div className="text-center py-2">
        <Button href="/">Back to Home</Button>
      </div>
    </Container>
  );
}

ErrorContainer.propTypes = {
  title: PropTypes.string,
  resetError: PropTypes.func,
};

export default ErrorContainer;
