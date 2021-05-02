import dayjs from 'dayjs';

import { CHECK_IN_TIME } from 'config/config';

const useDates = () => {
  const isCheckingTimePassed = dayjs().get('hour') > Number(CHECK_IN_TIME);
  const today = new Date(dayjs());
  const currentCheckingDate = isCheckingTimePassed ? new Date(dayjs().add(1, 'day')) : today;
  const oneMonthsPrior = new Date(dayjs().add(1, 'month'));
  const getTomorrow = today => {
    return new Date(dayjs(today).add(1, 'day'));
  };

  return [currentCheckingDate, oneMonthsPrior, getTomorrow];
};

export { useDates };
