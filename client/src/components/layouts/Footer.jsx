import React from "react";
import { Link } from "react-router-dom";
import logo from "../../019eddbf5bf91320da288c242aefa491.png";

function Footer() {
  return (
    // <div className="footer-container" style={{width: "100%"}}>
    // 	<div
    // 		className="footer-section"
    // 		style={{
    // 			padding: "2em",
    // 			alignSelf: "center",
    // 			textAlign: "center",
    // 			alignItems:"center"
    // 		}}
    // 	>
    // 		<p className="contact-info-text" style={{"fontSize":"14px"}}>Copyrights @ IIITA Alumni Office</p>
    // 	</div>
    // 	<div
    // 		className="footer-section"
    // 		style={{ padding: "1em", alignSelf: "center" }}
    // 	>
    // 		<h6 className="text-primary">Contact us:</h6>
    // 		<div className="help-section help-location-div">
    // 			<i
    // 				className="fas fa-map-marker-alt location-icon"
    // 				aria-hidden="false"
    // 				style={{"fontSize":"14px"}}
    // 			></i>
    // 			<p className="contact-info contact-info-text" style={{"fontSize":"14px"}}>
    // 				Office of Alumni Affairs Admin Extension-1, IIIT
    // 				Allahabad, Devghat, Jhalwa Prayagraj - 211015 Uttar
    // 				Pradesh, India
    // 			</p>
    // 		</div>
    // 		<div className="help-section help-mail-div">
    // 			<i className="fa fa-envelope mail-icon" style={{"fontSize":"14px"}}></i>
    // 			<div className="contact-info">
    // 				<p className="contact-info-text" style={{"fontSize":"14px"}}>alumni.coordinator@iiita.ac.in</p>
    // 				<p className="contact-info-text" style={{"fontSize":"14px"}}>dean.aa@iiita.ac.in</p>
    // 			</div>
    // 		</div>
    // 		<div className="help-section help-phone-div">
    // 			<i
    // 				className="fa fa-phone phone-icon"
    // 				aria-hidden="true"
    // 				style={{"fontSize":"14px"}}
    // 			></i>
    // 			<p className="contact-info contact-info-text" style={{"fontSize":"14px"}}>(91) 0532 292 2042/2290</p>
    // 		</div>
    // 	</div>
    // </div>
    // style={{position: "absolute", top:"95vh", left: "10%"}}
    <footer className="footer-cont">
      <div className="footer-main">
        <div className="foot-row">
          <div className="foot-col">
            <img
              src={logo}
              alt="logo"
              style={{ height: "50px", width: "50px" }}
              className="navbar-link hero-logo"
            />
            <h2
              style={{
                fontWeight: "600",
                letterSpacing: "normal",
                fontSize: "2rem",
              }}
            >
              IIITA AlumniConnect
            </h2>
            <div className="footer-copyright">
              © 2022 Copyright:{" "}
              <a
                href="https://www.linkedin.com/in/iiita-alumni-affairs/"
                target="_blank"
                rel="noreferrer"
                className="nav-lt"
              >
                IIITA Alumni Affairs
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h6 style={{ fontWeight: "600", fontSize: "1.5rem" }}>
              Important Links
            </h6>
            <ul>
              <li>
                <Link to="/" className="navbar-link">
                  <span className="hide-sm nav-lt">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/add-achievement" className="navbar-link">
                  <span className="hide-sm nav-lt">Achievements/Awards</span>
                </Link>
              </li>
              <li>
                <Link to="/help" className="navbar-link">
                  <span className="hide-sm nav-lt">Help</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="navbar-link">
                  <span className="hide-sm nav-lt">About</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.iiita.ac.in/"
                  className="navbar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hide-sm nav-lt">IIIT Allahabad</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/iiita-alumni-affairs/"
                  className="navbar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hide-sm nav-lt">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          <hr className="clearfix w-100 d-md-none pb-3" />

          <div className="foot-col">
            <h6 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Contact us:
            </h6>
            {/* <p>
							Lorem ipsum, dolor sit amet consectetur adipisicing
							elit. Optio deserunt fuga perferendis modi earum
							commodi aperiam temporibus quod nulla nesciunt
							aliquid debitis ullam omnis quos ipsam, aspernatur
							id excepturi hic.
						</p> */}
            <div className="help-section help-location-div pt-1 pb-1">
              <i
                className="fas fa-map-marker-alt location-icon"
                aria-hidden="false"
              ></i>
              <p
                className="contact-info contact-info-text"
                style={{ fontSize: "15px" }}
              >
                Office of Alumni Affairs , Admin Building, IIIT Allahabad,
                Devghat, Jhalwa Prayagraj - 211015 Uttar Pradesh, India
              </p>
            </div>
            <div className="help-section help-mail-div pt-1 pb-1">
              <i className="fa fa-envelope mail-icon"></i>
              <div className="contact-info">
                <p className="contact-info-text" style={{ fontSize: "15px" }}>
                  alumni.office@iiita.ac.in
                </p>
                <p className="contact-info-text" style={{ fontSize: "15px" }}>
                  alumni.connect@iiita.ac.in
                </p>
              </div>
            </div>
            <div className="help-section help-phone-div pt-1 pb-1 mt-2">
              <i
                className="fa fa-phone phone-icon mt-3"
                aria-hidden="true"
                style={{ fontSize: "15px" }}
              ></i>
              <div className="contact-info">
                <p
                  className="contact-info contact-info-text"
                  style={{ fontSize: "15px" }}
                >
                  (91) 0532 292 2599/2308
                </p>
                <p
                  className="contact-info contact-info-text"
                  style={{ fontSize: "15px" }}
                >
                  (91) 7317319062
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="footer-copyright text-center py-3">
        © 2022 Copyright:
        <a
          href="https://www.linkedin.com/in/iiita-alumni-affairs/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          IIITA Alumni Affairs
        </a>
      </div> */}
    </footer>
  );
}

export default Footer;
