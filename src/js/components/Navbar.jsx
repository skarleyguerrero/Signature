import FontAwesome from 'react-fontawesome';
import React from 'react';
import BurgerMenu from '../components/BurgerMenu.jsx';
import store from "../store/Store.jsx";
import { Link } from "react-router-dom";
import Actions from "../actions/Actions";
import {Session} from '../actions/utility/session';


export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: null
        };
    }

    componentWillMount() {
        this.setState({
            session: Session.store.getSession()
        });
    }

    isActive(value) {
        return 'nav-link nav-link-ams ' + ((value === this.props.active) ? 'active' : '');
    }
    logout(event){
        Actions.logout(this.context.history)
    }
    

    render() {
        let logInOrOut = (!this.state.session || !this.state.session.autenticated) ? (
            <div>
                <Link to='/login'>
                    <span className="resident-login pr-1">Login </span>
                    <FontAwesome className="icon-underline" name="sign-in-alt" size="lg"/>
                </Link>
            </div>) : (
            <div>
                <a id="logoutButton" onClick={(event) => this.logout(event)}>
                    <span className="resident-login pr-1">{this.state.session.user.info.firstname}&nbsp;Logout&nbsp;</span>
                    <FontAwesome className="icon-underline" name="sign-out-alt" size="lg"/>
                </a>
            </div>
        );
        if (this.props.displayNo === "no") {
            logInOrOut = (
                <div></div>
            )
        }
        let menuLinks = (this.state.session.autenticated != true) ? (
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className={this.isActive("home")} to="/home" >Home</Link>
                    </li>
                </ul>
            ) : (
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link className={this.isActive("home")} to="/home" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={this.isActive("statement")} to="/statement">Statement</Link>
                    </li>
                </ul>
            )

        return (
            <nav className="navbar navbar-expand-lg navbar-light navbar-light-style sticky-top d-flex justify-content-between">
            <span className="navbar-toggler navbar-toggler-style" data-toggle="collapse" data-target="#mobileLink" aria-controls="mobileLink" aria-expanded="false" aria-label="Toggle navigation">
                <span> <BurgerMenu /> </span>
            </span>
            <div className="collapse navbar-collapse">
                {menuLinks}
            </div>
            <div>
                {logInOrOut}
            </div>
            </nav>
        );
    }
}
