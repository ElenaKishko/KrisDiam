import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import pinkSet from '../img/photos/pinkset.png'

export const ContactMeComp = () => {
  const form = useRef()
  const [sent, setSent] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_k4iufiq', 'template_rt2p7qj', form.current, 'rmtD9XOOm2L5gSnXd')
      .then((result) => {
          console.log(result.text);
          e.target.reset();
          setSent(true);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <section className="contact">
        <Container className='container-xxl container-xl container-lg container-md container-sm'>
            <Row className="contact_wrapper">
                <Col className="contact_img"><img src={pinkSet}></img></Col>
                <Col className="contact_descr">
                    <div className="contact_descr_title">Contact me for individual order</div>
                    <div className="contact_descr_text">For any question, individual design 
                    or suggestion please fill the form, and I will message you back as 
                    soon as possible.</div>
                </Col>
                <Col className="contact_form">
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="text" placeholder="Your name"  name="from_name"/>
                        <input type="mobile" placeholder="Your mobile number" name="from_mobile" />
                        <textarea className="contact_form_message" type="text" placeholder="Message" name="message"/>
                        <input type="submit" value="Send" />
                    </form>
                    <div className={sent ? "contact_form_success" : "contact_form_noSuccess"}>Message was sent successfully</div>
                </Col>
            </Row>                        
        </Container>
    </section>
  );
};