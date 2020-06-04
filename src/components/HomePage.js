import React from "react";
import withAuth from "./withAuth";
import "./HomePage.css";
import img1 from "../img/commart.jpg";
import img2 from "../img/commart.jpg";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer,MDBRow,MDBCol } from
"mdbreact";


class HomePage extends React.Component {
  getYear() {
    return new Date().getFullYear();
}
  render() {
    return (
      <div>
      <br/>
<MDBContainer fluid>
<MDBRow>
<MDBCol>
 <h2 className="h2-responsive mb-4">
                  <strong style={{color:'white'}}>COMMART X PRO {this.getYear()} 5-8 มี.ค. </strong>
                </h2>
                {/* <p><strong>Welcome User {this.props.user.username}</strong></p> */}
      {/* <MDBCarousel activeItem={1} length={2} showControls={true} showIndicators={true} className="z-depth-1">
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img className="d-block w-100" src={img1} height="600" alt="First slide" />
              <MDBMask overlay="black-light" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">JIB COMPUTER</h3>
              <p></p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img className="d-block w-100" src={img2} height="600" alt="Second slide" />
              <MDBMask overlay="black-strong" />
            </MDBView>
            <MDBCarouselCaption>
              <h3 className="h3-responsive">JIB COMPUTER</h3>
              <p></p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        
         
        </MDBCarouselInner>
      </MDBCarousel> */}
      </MDBCol>
      </MDBRow>
    </MDBContainer>

      </div>
    );
  }
}

export default withAuth(HomePage);
