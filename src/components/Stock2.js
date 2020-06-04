import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  TableBody,
  TableHead,
  MDBBtn,
  Fa,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  FormInline,
  MDBContainer,
  MDBAlert,
  Badge
} from "mdbreact";
import LoadingScreen from "react-loading-screen";
//import Load from "./lg.comet-spinner.gif";
import Load from "../img/octo-loader.gif";
import withAuth from "../components/withAuth";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import acer from "../img/acer.png";
import alienware from "../img/alienware.png";
import dell from "../img/dell.png";
import hp from "../img/hp.png";
import lenovo from "../img/lenovo.png";
import msi from "../img/msi.png";
import samsung from "../img/samsung.png";
import sony from "../img/sony.png";
import toshiba from "../img/toshiba.png";
import asus from "../img/asus.png";
import "./styles.css";
import pay from "../img/pay.png";
import { Hostname, Port, Tokenapp, Version } from "./host.js";
import Barcode from "react-barcode";
const API1 = "http://" + Hostname + ":5003/API/Stock/api_stock";
const API2 = "http://" + Hostname + ":5003/API/Stock/api_stocksearch/";
const option = {
  headers: {
    "content-type": "application/json",
    "mis-access-token": Tokenapp
  }
};
class Stock2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      code: "",
      isLoading: false,
      idkey: "",
      error: null,
      modal: false,
      input: "",
      mdata: [],
      userput: "",
      search: "",
      print: ""
    };
    this.print = this.print.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleChange(event) {
    this.setState({ code: event.target.value });
  }
  handleChange2(event) {
    this.setState({ search: event.target.value });
  }
  toggle = e => {
    this.setState({
      modal: !this.state.modal,
      userput: e
    });
  };

  componentDidMount() {
    this.response();
    //console.log(this.state.mdata);
  }
  componentWillUnmount() {
    //clearInterval(this.intervalId);
  }
  reload(e) {
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      this.response();
      this.setState({ isLoading: false });
    }, 1500);
  }
  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      fetch(API1, option)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .then(res => {
          if (res.data.status === false) {
            throw new Error("Something went wrong ...");
          } else {
            this.setState({ mdata: res.data.data, isLoading: false });
          }
          
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }, 3000);
  };

  Checklogo(e) {
    //alert(e);
    if (e === "ACER") {
      return acer;
    } else if (e === "ALIENWARE") {
      return alienware;
    } else if (e === "ASUS") {
      return asus;
    } else if (e === "DELL") {
      return dell;
    } else if (e === "HP") {
      return hp;
    } else if (e === "LENOVO") {
      return lenovo;
    } else if (e === "MSI") {
      return msi;
    } else if (e === "SAMSUNG") {
      return samsung;
    } else if (e === "SONY") {
      return sony;
    } else if (e === "TOSHIBA") {
      return toshiba;
    }
  }

  uporganize(e) {
    //alert(e);
    this.setState({ isLoading: true });
    this.timeout = setTimeout(() => {
      if (e === "") {
        fetch(API1, option)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong ...");
            }
          })
          .then(res =>
            this.setState({ mdata: res.data.data, isLoading: false })
          )
          .catch(error => this.setState({ error, isLoading: false }));
      } else {
        fetch(API2 + e, option)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong ...");
            }
          })
          .then(res =>
            this.setState({
              mdata: res.data.data,
              isLoading: false,
              search: ""
            })
          )
          .catch(error => this.setState({ error, isLoading: false }));
      }
      //fetch(API+'/'+e)
    }, 1500);
  }
  print(e) {
    this.setState({ print: e }, function() {
      //console.log(this.state.print);
    });
    this.timeout = setTimeout(() => {
      var content = document.getElementById("printarea");
      var pri = document.getElementById("ifmcontentstoprint").contentWindow;
      pri.document.open();
      pri.document.write(content.innerHTML);
      pri.document.close();
      pri.focus();
      pri.print();
    }, 500);
  }
  render() {
    const Link = ({ className, children }) => (
      <a className={className}>{children}</a>
    );

    const StyledLink = styled(Link)`
      animation: pulse 3s infinite;
      @keyframes pulse {
        50% {
          color: rgb(255, 51, 0);
        }
      }
    `;
    const top = { top: "250px" };

    const { isLoading, error } = this.state;
    const bgtd = { "background-color": "rgb(40, 167, 69)" };
    const bgtd2 = { "background-color": "rgb(255, 51, 0)" };
    const bgtd3 = { "background-color": "rgb(255, 255, 240)" };
    const font2 = { "font-weight": "900" };
    const font = { "font-weight": "900", color: "white" };
    const bgTh = { "background-color": "rgb(255, 204, 0)" };
    const bgprint = { "background-color": "palegreen" };
    const colsw = { animation: "pulse 5s infinite" };
    const fb = { "font-weight": "900", color: "#007bff" };
    const fb2 = { "font-weight": "900", color: "#00C851" };
    const p2 = { "font-weight": "900", color: "#0000FF" };
    const p1 = { "font-weight": "900", color: "#FF4500" };
    const fontZ = { "font-size": "16" };
    const bage = { "margin-top": "15px" };
    //const sTy1 = { "font-size": "13px" };
    if (error) {
      return (
        <Container className="text-center mt-5">
          <br/><br/><br/>
          <h5 style={{color:'white'}}>{"ยังไม่มีข้อมูลจัดสินค้า..."}</h5>
          <Button color="danger" onClick={() => window.location.reload()}>
            Reload...
          </Button>
        </Container>
      );
    }
    if (isLoading) {
      return (
        <div>
          <Container fluid>
            <Row>
              <Col style={top}>
                <LoadingScreen
                  loading={true}
                  bgColor="#00FFCC"
                  //spinnerColor="#9ee5f8"
                  textColor="#0000CC"
                  logoSrc={Load}
                  text="กำลังโหลดข้อมูล..."
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return (
      <Container className="mt-2" fluid>
        <Row>
          <Col>
            <FormInline className="md-form active-pink active-pink-2">
              <Fa icon="search" />
              <input
                className="form-control form-control-sm ml-3 w-10"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={this.state.value}
                onChange={this.handleChange2}
              />
              <Button
                size="sm"
                type="submit"
                color="indigo"
                onClick={() => this.uporganize(this.state.search)}
              >
                Search
              </Button>
              <Button size="sm" color="danger" onClick={() => this.reload("")}>
                Reload...
              </Button>
            </FormInline>
            <Table small striped hover responsive>
              <TableHead style={bgTh}>
                <tr>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>รอ</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>คิว</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>รุ่น</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>Order</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>Total</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>Band</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>ชื่อสินค้า</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>ช่อง</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>ผู้จัด</strong>
                    </h4>
                  </th>
                  <th className="text-center">
                    <h4>
                      <strong style={font2}>print</strong>
                    </h4>
                  </th>
                </tr>
              </TableHead>
              <TableBody>
              
                {this.state.mdata.map(post => (
                  <tr key={post.orderid} style={bgtd3}>
                    <td className="text-center">
                      <div style={bage}>
                        <Badge
                          color={
                            post.waittime <= "00:15:00" ? "success" : "danger"
                          }
                          pill
                        >
                          <b style={fontZ}>{post.waittime}</b>
                        </Badge>
                      </div>
                    </td>
                    <td className="text-center" style={bgtd}>
                      <h2>
                        <strong style={font}>{post.payq}</strong>
                      </h2>
                    </td>
                    <td className="text-center" style={bgtd2}>
                      <h2>
                        <strong style={font}>{post.modelid}</strong>
                      </h2>
                    </td>
                    <td className="text-center">
                      <h2>
                        <strong style={post.alocateid2 === "JIB" ? fb : fb2}>
                          {post.alocateid2}
                          {"("}
                          {post.orderid}
                          {")"}
                        </strong>
                      </h2>
                      <span>
                        <img src={pay} width={25} alt="Logo" />{" "}
                        <b style={post.pay === 0 ? p1 : p2}>
                          {post.pay === 0 ? "ยังไม่จ่าย" : "จ่ายแล้ว"}
                        </b>
                      </span>
                    </td>
                    <td className="text-center">
                      <h2>
                        <strong style={font2}>{post.qty}</strong>
                      </h2>
                    </td>
                    {post.stockprint > 0 ? (
                      <td style={bgprint} className="text-center">
                        <img
                          src={this.Checklogo(post.brand)}
                          alt="logo"
                          width={50}
                        />
                      </td>
                    ) : (
                      <td className="text-center">
                        <img
                          src={this.Checklogo(post.brand)}
                          alt="logo"
                          width={50}
                        />
                      </td>
                    )}

                    {post.stockprint > 0 ? (
                      <td style={bgprint}>
                        <strong style={font} class="green-text">
                          {post.productid}
                        </strong>
                        <h5>
                          <strong style={font2}>{post.productname}</strong>
                        </h5>
                        <strong class="">
                          <b style={font2}>
                            <StyledLink>รายการของแถม:</StyledLink>
                          </b>
                        </strong>{" "}
                        <b>{post.promotiondetail}</b>
                      </td>
                    ) : (
                      <td>
                        <strong style={font} class="green-text">
                          {post.productid}
                        </strong>
                        <h5>
                          <strong style={font2}>{post.productname}</strong>
                        </h5>
                        <strong class="">
                          <b style={font2}>
                            <StyledLink>รายการของแถม:</StyledLink>
                          </b>
                        </strong>{" "}
                        <b>{post.promotiondetail}</b>
                      </td>
                    )}
                    <td className="text-center" style={bgtd2}>
                      <h2>
                        <strong style={font}>
                          {post.itecuser === "" ? post.itecuser : ".."}
                        </strong>
                      </h2>
                    </td>
                    <td className="text-center" style={bgtd}>
                      <h2>
                        <strong style={font}>{post.userorganizer}</strong>
                      </h2>
                    </td>
                    {post.stockprint > 0 ? (
                      <td className="text-center" style={bgprint}>
                        {post.stockprint > 0 ? (
                          <MDBBtn
                            onClick={() => {
                              if (post.alocateid2 === "JIB") {
                                this.print("JIB" + post.orderid);
                              } else if (post.alocateid2 === "ONLINE") {
                                this.print("ONLINE" + post.orderid);
                              } else {
                                this.print("PRE" + post.orderid);
                              }
                            }}
                            //this.print(post.alocateid2 === "JIB"? post.alocateid : "ONLINE"+post.orderid)}}

                            className="btn btn-dark-green"
                            size="md"
                          >
                            <Fa icon="fa fa-print" /> Print
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            onClick={() => {
                              if (post.alocateid2 === "JIB") {
                                this.print("JIB" + post.orderid);
                              } else if (post.alocateid2 === "ONLINE") {
                                this.print("ONLINE" + post.orderid);
                              } else {
                                this.print("PRE" + post.orderid);
                              }
                            }}
                            className="btn btn-blue-grey"
                            size="md"
                          >
                            <Fa icon="fa fa-print" /> Print
                          </MDBBtn>
                        )}
                      </td>
                    ) : (
                      <td className="text-center">
                        {post.stockprint > 0 ? (
                          <MDBBtn
                            onClick={() => {
                              if (post.alocateid2 === "JIB") {
                                this.print("JIB" + post.orderid);
                              } else if (post.alocateid2 === "ONLINE") {
                                this.print("ONLINE" + post.orderid);
                              } else {
                                this.print("PRE" + post.orderid);
                              }
                            }}
                            className="btn btn-dark-green"
                            size="md"
                          >
                            <Fa icon="fa fa-print" /> Print
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            onClick={() => {
                              if (post.alocateid2 === "JIB") {
                                this.print("JIB" + post.orderid);
                              } else if (post.alocateid2 === "ONLINE") {
                                this.print("ONLINE" + post.orderid);
                              } else {
                                this.print("PRE" + post.orderid);
                              }
                            }}
                            className="btn btn-blue-grey"
                            size="md"
                          >
                            <Fa icon="fa fa-print" /> Print
                          </MDBBtn>
                        )}
                      </td>
                    )}
                    <div style={{ margin: "0px" }} style={{ display: "none" }}>
                      <iframe
                        id="ifmcontentstoprint"
                        style={{
                          height: "0px",
                          width: "0px",
                          position: "absolute"
                        }}
                      />
                      <div id="printarea">
                        <div align={"center"}>
                        
                          <b style={{ "font-size": "50px" }}>
                            {this.state.print}
                          </b>
                          <p style={{ "margin-top": "0px" }}>
                            <Barcode height='50' displayValue='false' value={this.state.print} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth(Stock2);
