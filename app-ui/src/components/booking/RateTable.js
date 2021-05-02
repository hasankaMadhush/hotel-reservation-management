import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Row, Table } from 'react-bootstrap';
import Select from 'react-select';
import { keys } from 'lodash-es';

import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MainContext } from 'components/layout/AppContainer';
import { useHistory } from 'react-router-dom';

const occupancyMapper = occupancies => {
  return occupancies.map(occupancy => ({
    label: occupancy,
    value: occupancy,
  }));
};

const broadMapper = selectedOccupancy => {
  return selectedOccupancy.map(board => ({
    label: board.board,
    value: board.rate,
    occupancy: board.occupancy,
  }));
};

const defaultRoomMapper = { label: 1, value: 1 };

function RateTable({ ratesByOccupancy }) {
  const [, dispatch] = useContext(MainContext);
  const [selectedOccupancy, setSelectedOccupancy] = useState();
  const [numberOfRooms] = useState(defaultRoomMapper);
  const [selectedBoarding, setSelectedBoarding] = useState();
  const isBookingVisible = selectedOccupancy && selectedBoarding;
  const history = useHistory();

  useEffect(() => {
    if (selectedBoarding) {
      dispatch({
        type: 'update',
        key: 'board',
        value: {
          board: selectedBoarding.label,
          rate: selectedBoarding.value,
          occupancy: selectedBoarding.occupancy,
        },
      });
    }
  }, [dispatch, selectedBoarding]);

  return (
    <div className="border">
      <Row className="mx-4 my-4 shadow-sm">
        <Col className="d-flex my-3" sm={12} lg={4}>
          <span className="mt-2 mr-2">Occupancy</span>
          <Select
            className="w-100"
            options={occupancyMapper(keys(ratesByOccupancy))}
            onChange={occupancy => {
              setSelectedOccupancy(ratesByOccupancy[occupancy.label]);
            }}
          />
        </Col>
        {selectedOccupancy && (
          <>
            <Col className="d-flex my-3" lg={4} sm={12}>
              <span className="mt-2 mr-2">Board</span>
              <Select
                className="w-100"
                options={broadMapper(selectedOccupancy)}
                onChange={setSelectedBoarding}
                value={selectedBoarding}
              />
            </Col>
            <Col className="d-flex my-3" lg={4}>
              <span className="mt-2 mr-2">Rooms</span>
              <Select
                className="w-100"
                options={[defaultRoomMapper]}
                value={numberOfRooms}
                isDisabled
              />
            </Col>
          </>
        )}
      </Row>
      {selectedOccupancy && (
        <Row className="mx-4 my-4 shadow-sm">
          <Table bordered>
            <tbody>
              {selectedOccupancy.map(occupancy => (
                <tr key={occupancy.board}>
                  <td>{occupancy.board}</td>
                  <td>
                    {occupancy.currency}
                    {occupancy.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      )}

      <Row className="mx-4 my-4 justify-content-end">
        <Col sm={4}>
          <Button
            variant="primary"
            block
            disabled={!isBookingVisible}
            onClick={() => {
              history.push('/login');
            }}
          >
            Book
            <FontAwesomeIcon icon={faAngleDoubleRight} className={'mx-2'} />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

RateTable.propTypes = {
  ratesByOccupancy: PropTypes.object,
};

export default RateTable;
