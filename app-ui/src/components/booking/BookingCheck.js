import { useContext, useEffect, useState } from 'react';

import { Button, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { groupBy, sortBy } from 'lodash-es';
import Select from 'react-select';

import BookingFullAlert from 'components/booking/BookingFullAlert';
import { CHECK_BOOKING, GET_RATES_BY_PROPERTY, GET_PROPERTIES } from 'networking/endpoints';
import { httpGet } from 'networking/http';
import { MainContext } from 'components/layout/AppContainer';
import RateTable from 'components/booking/RateTable';
import { useDates } from 'libs/hooks/useDates';

import 'react-datepicker/dist/react-datepicker.css';

const propertyMapper = properties => {
  return properties?.map(property => ({
    value: property._id,
    label: property.name,
    data: property,
  }));
};

const DATE_FORMAT = 'YYYY-MM-DD';

function BookingCheck() {
  const [today, oneMonthsPrior, getTomorrow] = useDates();
  const [, dispatch] = useContext(MainContext);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [checkIn, setCheckIn] = useState(today);
  const [checkout, setCheckout] = useState(getTomorrow(today));
  const [allOccupancies, setAllOccupancies] = useState();
  const [bookingAvailability, setBookingAvailability] = useState(false);
  const [bookingFull, setBookingFull] = useState(false);

  useEffect(() => {
    httpGet(GET_PROPERTIES).then(res => {
      const data = res.data.data;
      setProperties(data);
      setSelectedProperty({ label: data[0].name, value: data[0]._id, data: data[0] });
    });
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      httpGet(`${GET_RATES_BY_PROPERTY}${selectedProperty.value}`).then(rates => {
        const data = rates.data.data;
        const sorted = sortBy(data, 'occupancyIndex');
        const grouped = groupBy(sorted, 'occupancy');
        setAllOccupancies(grouped);
      });
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedProperty) {
      dispatch({
        type: 'update',
        key: 'property',
        value: selectedProperty,
      });
    }

    if (checkIn) {
      dispatch({
        type: 'update',
        key: 'checkIn',
        value: checkIn,
      });
    }

    if (checkout) {
      dispatch({
        type: 'update',
        key: 'checkout',
        value: checkout,
      });
    }
  }, [dispatch, checkout, selectedProperty, checkIn]);

  const checkBooking = () => {
    const checkInDate = dayjs(checkIn).format(DATE_FORMAT);
    const checkoutDate = dayjs(checkout).format(DATE_FORMAT);
    httpGet(`${CHECK_BOOKING}${selectedProperty.value}/${checkInDate}/${checkoutDate}`).then(
      response => {
        const available = response.data.available;
        setBookingAvailability(available);
        setBookingFull(!available);
      },
    );
  };

  return (
    <>
      <div className="border">
        <Row className="my-3 justify-content-center">
          <h3>Find Rooms</h3>
        </Row>
        <Row className="mx-2 my-4">
          <Col className="d-flex" lg={4} sm={12}>
            <span className="mr-2 mt-2">Hotel</span>
            <Select
              className="w-100"
              options={propertyMapper(properties)}
              onChange={property => {
                setSelectedProperty(property);
              }}
              value={selectedProperty}
            />
          </Col>
          <Col className="d-flex" lg={4} sm={12}>
            <span className="mr-2 mt-2">Check in</span>
            <DatePicker
              selected={checkIn}
              onSelect={date => {
                setCheckIn(date);
                setCheckout(getTomorrow(date));
              }}
              todayButton="Reset"
              minDate={today}
              maxDate={oneMonthsPrior}
              className="form-control block"
            />
          </Col>
          <Col className="d-flex" lg={4} sm={12}>
            <span className="mr-2 mt-2">Check out</span>
            <DatePicker
              selected={checkout}
              onSelect={setCheckout}
              todayButton="Reset"
              minDate={checkIn}
              maxDate={oneMonthsPrior} // assuming can book up to one month
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="my-2 justify-content-center">
          <Col lg={4}>
            <Button block variant="primary" onClick={() => checkBooking()}>
              Search
            </Button>
          </Col>
        </Row>
      </div>
      {bookingAvailability && <RateTable ratesByOccupancy={allOccupancies} />}
      {bookingFull && <BookingFullAlert />}
    </>
  );
}

export default BookingCheck;
