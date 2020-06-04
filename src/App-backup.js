import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  Footer,
  NavLink,
  Badge,
  MDBIcon,
  MDBBadge,
  MDBBtn,
  Button,
  MDBView
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AuthService from "./components/AuthService";
import Routes from "./Routes";
import logo from "./img/logo-cm-work.png";
import socketIOClient from "socket.io-client";
import { Hostname, Port, Tokenapp, Version } from "./components/host.js";

const Auth = new AuthService();
const option = {
  headers: {
    "content-type": "application/json",
    "mis-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
};
//Stockcount

class Header1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: "",
      chkurl: "",
      time: "",
      endpoint: "http://" + Hostname + ":5004",
      count1: "",
      count2: "",
      count3: "",
      count4: "",
      time_avg: ""
    };
  }

  componentDidMount() {
    this.response();
    this.avg_time();
    this.Clock = setInterval(() => this.GetTime(), 1000);
    this.setState({
      chkurl: window.location.pathname
    });

    //console.log(window.location.pathname);
  }

  response = () => {
    this.setState({ isLoading: true });
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("Stockcount", data => {
      this.setState({
        count1: data.Stockcount[0].corder1,
        count2: data.Stockcount[0].corder2,
        count3: data.Stockcount[0].corder3,
        count4: data.Stockcount[0].corder4
      });
      this.setState({ isLoading: false });
      //console.log(data);
      //console.log();
    });
  };
  avg_time = () => {
    fetch("http://27.131.138.143:9000/get/8510/api_stockavg", option)
      .then(data => data.json())
      .then(data => {
        this.setState({ time_avg: data.data[0].avg_time }, () => {
          //console.log(this.state.time_avg);
        });
      });
  };

  GetTime() {
    // Creating variables to hold time.
    var date, TimeType, hour, minutes, seconds, fullTime;
    // Creating Date() function object.
    date = new Date();
    // Getting current hour from Date object.
    hour = date.getHours();
    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 11) {
      TimeType = "AM";
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = "PM";
    }
    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }
    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour === 0) {
      hour = 12;
    }
    // Getting the current minutes from date object.
    minutes = date.getMinutes();
    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }
    //Getting current seconds from date object.
    seconds = date.getSeconds();
    // If seconds value is less than 10 then add 0 before seconds.
    if (seconds < 10) {
      seconds = "0" + seconds.toString();
    }
    // Adding all the variables in fullTime variable.
    fullTime =
      hour.toString() + ":" + minutes.toString() + ":" + seconds.toString();
    //TimeType.toString();
    // Setting up fullTime variable in State.
    this.setState({
      time: fullTime
    });
  }
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }
  render() {
    //console.log(this.state.count);

    function User2(props) {
      return <h5>{""}</h5>;
    }
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    const NavSty = {
      "padding-bottom": "4px",
      "padding-top": "4px"
    };
    const ti = {
      "margin-bottom": "0px"
    };
    return (
      <Router>
        <div className="flyout">
          <Navbar
            color="indigo"
            dark
            expand="md"
            fixed="top"
            scrolling
            style={NavSty}
          >
            <NavbarBrand href="/">
              <img src={logo} alt="" height="42" width="130" />
            </NavbarBrand>{" "}
            <p style={ti} class="yellow-text">
              {""}
            </p>
            <NavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <Collapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <NavbarNav left>
                {/* <NavItem>
                  <NavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    Home
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink
                    to="/stock1"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    สินค้าทั้งหมด{" "}
                    <MDBBadge color="danger" className="ml-2">
                      {this.state.count1}
                    </MDBBadge>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    to="/stockjib"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    {/* JIB(จ่ายแล้ว){" "}
                    <Badge color="danger" pill>
                      {this.state.count4}
                    </Badge> */}

                    JIB(จ่ายแล้ว) <MDBBadge color="danger" className="ml-2">{this.state.count4}</MDBBadge>

                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/stockonline"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    ONLINE(จ่ายแล้ว){" "}
                    <MDBBadge color="danger" className="ml-2">
                      {this.state.count3}
                    </MDBBadge>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/stock2"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    จัดสินค้าแล้ว{" "}
                    {
                      <MDBBadge color="danger" className="ml-2">
                        {this.state.count2}
                      </MDBBadge>
                    }
                  </NavLink>
                </NavItem>
              </NavbarNav>
              <NavbarNav right>
                <NavItem>
                  <NavLink to="#">เวลาเฉลี่ยต่อคิว : <b style={{ color: '#89FB89' }}>{this.state.time_avg === null ? '00:00:00' : this.state.time_avg}</b></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="#">{}</NavLink>
                </NavItem>
                {this.state.chkurl === "/login" ? (
                  <User2 />
                ) : (
                    <NavItem>
                      <NavLink
                        className="btn btn-sm"
                        onClick={this.handleLogout.bind(this)}
                        to="#"
                      >
                       
                          <MDBIcon fab icon="sun" size="1x" />
                        
                        <b style={{ fontSize: "12px" }}>ออกจากระบบ</b>
                      </NavLink>
                    </NavItem>
                  )}
              </NavbarNav>
            </Collapse>
          </Navbar>
          {this.state.collapseID && overlay}

          <main style={{ marginTop: "4.5rem" }}>
            <Routes />
          </main>

          <Footer className="page-footer font-small indigo fixed-bottom">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="#"> JIB Management Information Systems </a>
            </p>
          </Footer>
        </div>
      </Router>
    );
  }
}

export default Header1;
