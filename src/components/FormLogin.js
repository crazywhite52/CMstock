import React from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,MDBRow,MDBCol,MDBModal,MDBModalBody,MDBModalHeader,MDBModalFooter,MDBPopover,MDBPopoverBody,MDBPopoverHeader,MDBTooltip,MDBBtn
} from "mdbreact";
import AuthService from './AuthService';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      msg: "",
      modal15: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmitt = this.handleFormSubmitt.bind(this);
    this.Auth = new AuthService();
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    if (this.Auth.loggedIn()) this.props.history.replace("/");
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  handleFormSubmitt(e) {
    e.preventDefault();
    e.target.className += " was-validated";
    if (this.state.username === "") {
      this.setState({ msg: "กรุณากรอก username!" });
    } else if (this.state.password === "") {
      this.setState({ msg: "กรุณากรอก password!" });
    } else {

      this.Auth.login(this.state.username, this.state.password, 128).then(
        res => {
          //this.props.history.replace("/");
          //window.location.reload();
          if (res.accessapp === false) {
            this.setState({ msg: "Username || Password is Incorrect??" });
          } else {
            this.props.history.replace("/");
            window.location.reload();
          }
        }
      );
    }
  }

  render() {
    return (
      <Container className="mt-5">
          {/* <MDBBtn color="primary" onClick={this.toggle(15)}>MDBModal</MDBBtn> */}
          <div style={{opacity: '0.9'}}>
        <MDBModal  isOpen={this.state.modal15} toggle={this.toggle(15)} backdrop={false} centered>
          <MDBModalHeader ><strong>ล็อกอินเข้าสู่ระบบ จัดสินค้า</strong></MDBModalHeader>
          <MDBModalBody>
          <MDBCol size="12"><form className="needs-validation" onSubmit={this.handleFormSubmitt} noValidate>
              <div className="grey-text">
                <Input name="username" label="รหัสพนักงาน" icon="user" type="text" error="wrong" success="right" onChange={this.handleChange} value={this.state.username} required />
                <Input name="password" label="รหัสผ่าน" icon="lock" type="password" error="wrong" success="right" value={this.state.password} onChange={this.handleChange} required />
              </div>
              <div className="text-center">
                <Button color="primary" type="submit">เข้าสู่ระบบ</Button>
                <p className="red-text"><h4> {this.state.msg}</h4></p>
              </div>
            </form></MDBCol>
          </MDBModalBody>
        
        </MDBModal>
        </div>

      <MDBRow>
        <MDBCol>{}</MDBCol>
       
        <MDBCol>{}</MDBCol>
      </MDBRow>

      
      </Container>
    );
  }
}

export default FormLogin;
