import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow, MDBContainer, MDBIcon, MDBCardHeader, MDBListGroup, MDBListGroupItem, MDBAlert } from "mdbreact";
import { Hostname, Port, Tokenapp, Version } from "./host.js";


export class Orderlist extends Component {
    focusInput = (component) => {
        if (component) {
            component.focus();
        }
    };
    constructor(props) {
        super(props);
        this.state = { value: '', datalength: 1, txt_searchlog: '', datalist: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendApi = this.sendApi.bind(this);
    }
    componentDidMount() {
        this.focusInput
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    sendApi() {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0, 10);

        const api_order = "http://172.18.24.113:5000/commart/validatedata";
        const data = {
            orderdate: date,
            txtsearch: this.state.value
        };
        fetch(api_order, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
                "mis-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
            }
        })
            .then(res => res.json())
            .then(
                response =>
                    this.setState({
                        datalist: response.data,
                        txt_searchlog: this.state.value
                    }, () => {
                        console.log('Success:', response);
                        //console.log(this.state.datalist.length);
                        this.setState({

                            datalength: this.state.datalist.length,
                            value: '',
                        })
                    })

            )
            .catch(error => console.error("Error:", error));
    }

    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        this.sendApi();
        event.preventDefault();
    }
    render() {

        if (this.state.datalength === 0) {
            return (
                <MDBContainer>
                    <MDBAlert color="warning">
                        <h4 className="alert-heading">ไม่พบข้อมูลที่ต้องการค้นหา!</h4>
                        <p><strong>Search: {this.state.txt_searchlog}</strong></p>
                        <p>ค้นหาข้อมูลใหม่อีกครั้งกดปุ่มด่านล่าง</p>
                        <hr />
                        <MDBBtn gradient="aqua" onClick={() => this.setState({datalength: 1})}>เริ่มค้นหาใหม่อีกครั้ง</MDBBtn>
                    </MDBAlert>
                </MDBContainer>
            )
        } else {
            return (
                <div>
                    <MDBContainer>

                        <MDBCard >
                            <form onSubmit={this.handleSubmit}>
                                <MDBCardBody>
                                    <MDBCardTitle>ค้นหาข้อมูลคิวของลูกค้า</MDBCardTitle>
                                    <MDBCardText>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput">ข้อมูลที่ต้องการค้นหา(คิว,เบอร์โทร,ชื่อ)</label>
                                            <input
                                                ref={this.focusInput}
                                                type="text"
                                                name="txt_data"
                                                className="form-control"
                                                id="formGroupExampleInput"
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </MDBCardText>
                                    <MDBBtn type="submit" color="primary" size="sm"> <MDBIcon far icon="check-circle" /> ค้นหา </MDBBtn>


                                </MDBCardBody>

                            </form>
                        </MDBCard>

                        <MDBRow>

                            {this.state.datalist.map(val => (
                                <MDBCard border="success" className="m-3" style={{ maxWidth: "55rem" }}>
                                    <MDBCardHeader color="success-color">ORDER: {val.jobid}</MDBCardHeader>
                                    <MDBCardBody className="text-success">
                                        {/* <MDBCardTitle >รายละเอียด</MDBCardTitle> */}
                                        <MDBCardText>

                                            <dl>
                                                <dt>คิวที่</dt>
                                                <dd>✦ {val.payq}</dd>
                                                <dt>modelid</dt>
                                                <dd>✦ {val.modelid}</dd>
                                                <dt>productid</dt>
                                                <dd>✦ {val.productid}</dd>
                                                <dt>productname</dt>
                                                <dd>✦ {val.productname}</dd>
                                                <dt>customer</dt>
                                                <dd>✦ {val.customer}</dd>
                                                <dt>tel</dt>
                                                <dd>✦ {val.tel}</dd>
                                                <dt>boots</dt>
                                                <dd>✦ {val.boots}</dd>
                                                <dt>qty</dt>
                                                <dd>✦ {val.qty}</dd>
                                                <dt>status</dt>
                                                <dd>✦ {val.status}</dd>
                                                <dt>paytype</dt>
                                                <dd>✦ {val.paytype}</dd>
                                                <dt>payremark</dt>
                                                <dd>✦ {val.payremark}</dd>
                                                <dt>promotiondetail</dt>
                                                <dd>✦ {val.promotiondetail}</dd>
                                            </dl>
                                            {/* <MDBListGroup style={{ width: "31rem" }}>
                                            <MDBListGroupItem><p>{val.payq}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.modelid}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.productid}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.productname}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.customer}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.tel}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.boots}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.qty}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.status}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.paytype}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.payremark}</p></MDBListGroupItem>
                                            <MDBListGroupItem><p>{val.promotiondetail}</p></MDBListGroupItem>
                                        </MDBListGroup> */}

                                        </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            ))}

                        </MDBRow>
                    </MDBContainer>
                </div>
            );
        }
    }
}

export default Orderlist;
