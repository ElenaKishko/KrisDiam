import { Container } from "@mui/material";
import { logo } from "./images";

function Footer() {
  return (
    <footer>
      <Container className="footer">
        <div className="footer_wrapper">
          <div>
            <div className="footer_rights">
              KrisDiam <br />
              All rights reserved, 2023
            </div>
          </div>
          <div>
            <div className="footer_logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div>
            <div className="footer_details">
              <div className="footer_details_hours">Call me Sunday-Friday</div>
              <div className="footer_details_mobile">+972 54 739 13 23</div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
