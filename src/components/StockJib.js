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
import pay from "../img/pay.png";
import "./styles.css";
import { Hostname, Port, Tokenapp, Version } from "./host.js";
import Barcode from "react-barcode";
const option = {
  headers: {
    "content-type": "application/json",
    "mis-access-token": Tokenapp
  }
};
class StockOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: [],
      code: "",
      code2: "",
      isLoading: false,
      idkey: "",
      error: null,
      modal: false,
      endpoint: "http://" + Hostname + ":5004",
      input: "",
      mdata: [],
      userput: "",
      inputcode: "",
      radio3: false,
      itecuser: "",
      print: "",
      alocateid: ""
    };
    this.print = this.print.bind(this);
    this.onClick1 = this.onClick1.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.onClick3 = this.onClick3.bind(this);
    this.onClick4 = this.onClick4.bind(this);
    this.onClick5 = this.onClick5.bind(this);
    this.onClick6 = this.onClick6.bind(this);
    this.onClick7 = this.onClick7.bind(this);
    this.onClick8 = this.onClick8.bind(this);
    this.onClick9 = this.onClick9.bind(this);
    this.onClick10 = this.onClick10.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  onClick1() {
    this.setState({ radio3: 1 });
  }
  onClick2() {
    this.setState({ radio3: 2 });
  }
  onClick3() {
    this.setState({ radio3: 3 });
  }
  onClick4() {
    this.setState({ radio3: 4 });
  }
  onClick5() {
    this.setState({ radio3: 5 });
  }
  onClick6() {
    this.setState({ radio3: 6 });
  }
  onClick7() {
    this.setState({ radio3: 7 });
  }
  onClick8() {
    this.setState({ radio3: 8 });
  }
  onClick9() {
    this.setState({ radio3: 9 });
  }
  onClick10() {
    this.setState({ radio3: 10 });
  }
  handleChange(event) {
    this.setState({ code: event.target.value });
  }
  handleChange2(event) {
    this.setState({ code2: event.target.value });
  }
  toggle(e, a) {
    //alert(a);
    this.setState({
      modal: !this.state.modal,
      userput: e,
      alocateid: a
    });
  }
  componentDidMount() {
    this.response();
  }
  componentWillUnmount() {
    //clearInterval(this.intervalId);
  }
  response = () => {
    this.setState({ isLoading: true });
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("StockApicommart", data => {
      const list = data.StockApicommart[0].filter(
        item => item.alocateid2 == "JIB"
      );

      this.setState({ list: list.filter(itm => itm.pay == "1") });

      //this.setState({ mdata: data.StockApicommart[0] });
      this.timeout = setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
      //console.log(this.state.list);
    });
  };
  Checklogo(e) {
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
    if (this.state.code === "") {
      this.setState({ inputcode: "*กรุณากรอกข้อมูลให้ครบถ้วน" });
    } else {
      var c1 = this.state.code2;
      var c2 = this.state.radio3;

      if (c1 !== "") {
        var dc = c1;
      } else {
        var dc = c2;
      }
      var data = {
        orderid: e,
        userorganizer: this.state.code,
        itecuser: dc,
        alocateid: this.state.alocateid
      };
      //alert(data);

      var api_update = "http://" + Hostname + ":5003/API/Stock/uporganize";
      fetch(api_update, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": Tokenapp
        }
      })
        .then(res => res.json())
        .then(
          response =>
            this.setState({
              modal: !this.state.modal,
              userput: "",
              inputcode: ""
            })

          //console.log('Success:', JSON.stringify(response))
        )
        .catch(error => console.error("Error:", error));
    }
  }
  print(e, p) {
    //alert(e);
    //this.setState({ print: e });
    //console.log(this.state.print);
    this.setState({ print: e }, function () {
      //console.log(this.state.print);
    });

    var urlup = "http://" + Hostname + ":5003/API/Stock/updateprint/" + p;
    fetch(urlup, option).then(response => {
      if (response.ok) {
      }
    });
    // this.timeout = setTimeout(() => {
    //   var content = document.getElementById("printarea");
    //   var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    //   pri.document.open();
    //   pri.document.write(content.innerHTML);
    //   pri.document.close();
    //   pri.focus();
    //   pri.print();
    // }, 500);
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
    const { mdata, isLoading, error } = this.state;
    const bgtd = { "background-color": "rgb(40, 167, 69)" };
    const bgtd2 = { "background-color": "rgb(255, 51, 0)" };
    const bgtd3 = { "background-color": "rgb(255, 255, 240)" };
    const font2 = { "font-weight": "900" };
    const fb = { "font-weight": "900", color: "#007bff" };
    const fb2 = { "font-weight": "900", color: "#00C851" };
    const font = { "font-weight": "900", color: "white" };
    const bgTh = { "background-color": "rgb(255, 204, 0)" };
    const bgprint = { "background-color": "palegreen" };
    const colsw = { animation: "pulse 5s infinite" };
    const colorf = { color: "black" };
    const p2 = { "font-weight": "900", color: "#0000FF" };
    const p1 = { "font-weight": "900", color: "#FF4500" };
    const fontZ = { "font-size": "16px" };
    const bage = { "margin-top": "15px" };
    //const usersOnline = this.state.mdata.filter(ondata => ondata.alocateid2);
    //console.log('data'+':'+this.state.mdata);
    if (error) {
      return (
        <Container className="text-center mt-5">
          <h2>{error.message}</h2>
          <h5>...ไม่พบข้อมูล...</h5>
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
                  bgColor="#ededed"
                  //spinnerColor="#9ee5f8"
                  textColor="#676767"
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
                  {/* <th className="text-center">
                    <h4>
                      <strong style={font2}>จัดสินค้า</strong>
                    </h4>
                  </th> */}
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
                      <strong style={font2}>Print(จัด)</strong>
                    </h4>
                  </th>
                </tr>
              </TableHead>
              <TableBody>
                {this.state.list.map(post => (
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
                    {post.payq > 0 ? (
                      <td className="text-center" style={bgtd}>
                        <h2>
                          <strong style={font}>{post.payq}</strong>
                        </h2>
                      </td>
                    ) : (
                        <td className="text-center">
                          <h2>
                            <strong style={font}>{post.payq}</strong>
                          </h2>
                        </td>
                      )}
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
                        <strong style={font} class="purple-text">
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
                          <strong style={font} class="purple-text">
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

                    {post.stockprint > 0 ? (
                      <td className="text-center" style={bgprint}>
                        {post.stockprint > 0 ? (
                          <MDBBtn
                            onClick={() => {
                              if (post.alocateid2 === "JIB") {
                                this.print(
                                  "JIB" + post.orderid,
                                  post.alocateid
                                );
                              } else if (post.alocateid2 === "ONLINE") {
                                this.print(
                                  "ONLINE" + post.orderid,
                                  post.alocateid
                                );
                              } else {
                                this.print(
                                  "PRE" + post.orderid,
                                  post.alocateid
                                );
                              }
                            }}
                            className="btn btn-dark-green"
                            size="md"
                          >
                            <Fa icon="fa fa-print" /> จัดสินค้า
                          </MDBBtn>
                        ) : (
                            <MDBBtn
                              onClick={() => {
                                if (post.alocateid2 === "JIB") {
                                  this.print(
                                    "JIB" + post.orderid,
                                    post.alocateid
                                  );
                                } else if (post.alocateid2 === "ONLINE") {
                                  this.print(
                                    "ONLINE" + post.orderid,
                                    post.alocateid
                                  );
                                } else {
                                  this.print(
                                    "PRE" + post.orderid,
                                    post.alocateid
                                  );
                                }
                              }}
                              className="btn btn-blue-grey"
                              size="md"
                            >
                              <Fa icon="fa fa-print" /> จัดสินค้า
                          </MDBBtn>
                          )}
                      </td>
                    ) : (
                        <td className="text-center">
                          {post.stockprint > 0 ? (
                            <MDBBtn
                              onClick={() => {
                                if (post.alocateid2 === "JIB") {
                                  this.print(
                                    "JIB" + post.orderid,
                                    post.alocateid
                                  );
                                } else if (post.alocateid2 === "ONLINE") {
                                  this.print(
                                    "ONLINE" + post.orderid,
                                    post.alocateid
                                  );
                                } else {
                                  this.print(
                                    "PRE" + post.orderid,
                                    post.alocateid
                                  );
                                }
                              }}
                              className="btn btn-dark-green"
                              size="md"
                            >
                              <Fa icon="fa fa-print" /> จัดสินค้า
                          </MDBBtn>
                          ) : (
                              <MDBBtn
                                onClick={() => {
                                  if (post.alocateid2 === "JIB") {
                                    this.print(
                                      "JIB" + post.orderid,
                                      post.alocateid
                                    );
                                  } else if (post.alocateid2 === "ONLINE") {
                                    this.print(
                                      "ONLINE" + post.orderid,
                                      post.alocateid
                                    );
                                  } else {
                                    this.print(
                                      "PRE" + post.orderid,
                                      post.alocateid
                                    );
                                  }
                                }}
                                className="btn btn-blue-grey"
                                size="md"
                              >
                                <Fa icon="fa fa-print" /> จัดสินค้า
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
                          <p>
                            <Barcode value={this.state.print} />
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

export default withAuth(StockOnline);
