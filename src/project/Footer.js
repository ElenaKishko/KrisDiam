import 'bootstrap/dist/css/bootstrap-grid.css'
import Container from 'react-bootstrap/Container'
import logo from '../img/icons/logo.svg'

function FooterComp() {
  return (
      <footer>
        <Container className="footer">
          <div className="footer_wrapper">
            <div>
              <div className="footer_rights">
                KrisDiam <br/>
                All rights reserved, 2023
              </div>
            </div>
            <div>
              <div className="footer_logo"><img src={logo} alt="logo"/></div>
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
export default FooterComp;
