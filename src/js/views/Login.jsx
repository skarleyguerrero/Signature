import Actions from "../actions/Actions.jsx";
import Flux from "@4geeksacademy/react-flux-dash";
import Footer from '../components/Footer.jsx';
import FontAwesome from 'react-fontawesome';
import Navbar from '../components/Navbar.jsx';
import React from "react";
import Store from "../store/Store.jsx";
import { Redirect } from "react-router-dom";

export default class Login extends Flux.View {
  constructor(props) {
    super(props);
    this.state = (
      Store.getLoggedInInfo()
    )
    this.state = ({
      selectedOption: "option1"
    })
    this.bindStore(Store, () => {
      this.setState(
        Store.getLoggedInInfo()
      )
    })
  }

  // Lifecycle methods

  componentDidMount() {

    if (this.state.uid != '' && this.props.match.params.nextP === "logout") { Actions.logout() }

    this.setState(
      Store.getLoggedInInfo()
    )
  }

  // Views Methods

  buttonNav(page, event) {
    event.preventDefault()
    Actions.updateStore({
      registerActivePage: page,
      registerActiveMobilePage: page
    })
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  console.log("login change email")
  }

  handleOptionChange(event) {
    this.setState({
      selectedOption: event.target.value
    })
  }

  handleFormSubmit(event) {

    // Writing choice to firebase is not implemented yet

    event.preventDefault()

    const option = this.state.selectedOption
    if (option === "option3") {
      Actions.updateStore({
        registerActivePage: "requestAccess",
        registerActiveMobilePage: "requestAccessMobile"
      })
    }
    else {
      Actions.updateStore({
        registerActivePage: "success",
        registerActiveMobilePage: "successMobile"
      })
    }
  }

  handleChangeUnit(event) {
    this.setState({ unitNumber: event.target.value });
  }

  handleChangeAddress(event) {
    this.setState({ address: event });
  }

  isActive(value) {
    return 'card col-sm-8 maximum-width ' + ((value === this.state.registerActivePage) ? '' : 'd-none');
  }

  isActiveResponsive(value) {
    return 'card col-sm-8 ' + ((value === this.state.registerActiveMobilePage) ? '' : 'd-none');
  }

  lookupMaskedInfo() {
    let address = this.state.address
    let unit = this.state.unitNumber
    let accountNumber = Actions.generateAccountNumber(address, unit)
    let maskedInfo = new Array()
    maskedInfo = Actions.fetchMaskedInfo(accountNumber)
    this.setState({
      registerActivePage: "maskedInfo",
      registerActiveMobilePage: "maskedInfoMobile"
    })
  }

  login(event) {
    event.preventDefault()
    const email = this.state.email
    const password = this.state.password
    const nextPage = (typeof this.props.location.state=="undefined")?"/home":this.props.location.state.from.pathname
    Actions.login(email, password, nextPage, this.props.history)
  }

  logout() {
    Actions.logout()
  }

  resetEmail(page, event) {
    event.preventDefault()
    const email = this.state.email
    Actions.resetPassword(email)
    this.setState({
      registerActivePage: page,
      registerActiveMobilePage: page
    })
  }

  resetEmailWindow(event) {
    event.preventDefault()
    let tempState = this.state.resetEmail
    if (tempState === "false") {
      tempState = "true"
    }
    else {
      tempState = "false"
    }
    this.setState({ resetEmail: tempState });
  }

  render() {

    if (typeof this.state.uid === 'undefined') {
      return (<h2>Loading</h2>)
    }

    if (this.state.uid != "") {
      return <Redirect to = {"/" + (this.props.match.params.nextP||"Home")}/>
    }

    let mainWindow = ""
    let resetWindow = ""

    if (this.state.resetEmail === "true") {
      mainWindow = "d-none"
    }

    if (this.state.resetEmail === "false") {
      resetWindow = "d-none"
    }

    return (
      <div>
          <Navbar displayNo="no"/>
          <div id="body">
            <div id="loginForm" className="card section-height">
              <span>
                <span>
                {/* Login Responsive Screen */}
                  <div className={this.isActive("login")}>
                    <div className="d-flex justify-content-sm-center">
                      <div className="col-sm-8">
                        <span className="row">
                          <h1 id="login-left">Log in</h1>
                          {/* <span id="register-right" className="text-center">
                            <button className="btn btn-primary" onClick={(event) =>{this.buttonNav("enterAddress",event)}}>Register</button>
                          </span>*/}
                        </span>
                        <hr className="hr-overwrite" />
                        <form>
                          <div className="form-group col-sm-12">
                              <label className="labelClass">Email</label>
                              <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange.bind(this)}/>
                          </div>
                          <div className="form-group col-sm-12">
                              <label className="labelClass">Password</label>
                              <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange.bind(this)}/>
                          </div>
                          <span className="row d-flex justify-content-between">
                            <div className="form-group">
                              <button id="pixel-left" className="btn btn-primary button-color" onClick={(event) => {this.login(event)}}>Log in</button>
                            </div>
                            <div className="form-group">
                              <span className="reset-color" id="pixel-right" onClick={(event) => {this.buttonNav("emailReset", event)}}><a>Reset Password</a></span>
                            </div>
                          </span>
                        </form>
                      </div>
                    </div>
                  </div>
                </span>
              </span>
            </div>
          </div>
          <Footer/>
        </div>
    );
  }
}
