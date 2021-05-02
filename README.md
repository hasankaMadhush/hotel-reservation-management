# Hotel Reservation Management

This Project is a small demo for a Hotel Reservation Management System(HRM).

# Features

- Check room availability upon selected hotel/property.
- Authentication - Login/ Register.
- Viewing room availability.
- Make reservations upon availability.
- Receive Confirmation Email Upon making reservations.
- Cancellation of reservation based on cancellation fee structure.

## API Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f80e63cbfea7863b9dbf)

## Prerequisites

- Node JS - v14.15.3
- NPM - 6.14.9
- Mongo db
- React JS - ^17.0.2

## Set Up Instructions

- Clone the repository

  `git clone https://github.com/hasankaMadhush/hotel-reservation-management.git`

- Setup Node JS & NPM: Visit official [node js](https://nodejs.org/en/) site for more information:
- Move to Project folder
- Start backend my moving to **app** folder and install all dependencies before starting

  `cd app`
  `npm i`

- Start Dev server

  `npm run dev-start`

- Start frontend by moving to **app-ui** folder

  `cd app-ui`

- Install all dependencies and start the front end

  `npm i`

  `npm start`

## Assumptions

1.  A user can book up to a one month
2.  Only capturing payment type and storing the payment option to database
3.  Login/ Registration is provided only in reservation process.

## Tests

- No Test cases were added yet due to the time limitations.

# Development Tools

1.  Visual Studio Code
