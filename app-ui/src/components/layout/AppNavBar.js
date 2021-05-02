import { Image, Navbar, Nav } from 'react-bootstrap';

import LOGO from 'assets/logo.png';

function AppNavBar() {
  return (
    <Navbar bg="light" variant="light" className="border-bottom">
      <Navbar.Brand href="/" className="text-dark">
        <Image src={LOGO} height="80" alt="Hotel" className="mr-2" />
        Mango Holidays
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="/" variant="link">
          Find Rooms
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavBar;
