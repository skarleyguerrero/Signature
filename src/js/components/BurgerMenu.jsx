import FontAwesome from 'react-fontawesome';
import React from 'react';
import store from "../store/Store.jsx";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import {Session} from '../actions/utility/session';
import Actions from '../actions/Actions.jsx';
export default class BurgerMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: null
        };
    }

    componentDidMount() {
        this.setState({
            session: Session.store.getSession()
        });
    }

    isActive(value) {
        return 'nav-link ' + ((value === this.props.active) ? 'active' : '');
    }

    isActiveAuth(value) {
        let itemClass
        if (this.state.uid != "") {
            itemClass = 'nav-link ' + ((value === this.props.active) ? 'active' : '')
        }
        else {
            itemClass = "d-none"
        }
        return itemClass
    }

    render() {
        let logInOrOut = (!this.state.session || !this.state.session.autenticated) ? (
            <div>
                <Link to='/login'>
                    <span>Resident Login&nbsp;</span>
                    <FontAwesome name="sign-in-alt" size="lg"/>
                </Link>
            </div>) : (
            <div>
                <a onClick={() => Actions.logout()}>
                    <span>{this.state.session.user.info.firstName}&nbsp;Logout&nbsp;</span>
                    <FontAwesome name="sign-out-alt" size="2x"/>
                </a>
            </div>
        );

        if (this.props.displayNo === "no") logInOrOut = (<div></div>);

        return (
            <Menu>
                <Link className={this.isActive("home")} to="/home" >Home</Link>
                <a href="https://fs23.formsite.com/AFFINITY/form11/index.html">Estoppels Request</a>
                <Link className="d-none" to="/amenities">Amenities</Link>
                
                {/*<Link className={this.isActive("events")} to="/events">Events</Link>*/}
                
                <Link className={this.isActive("contact")} to="/contact">Contact Us</Link>
                <Link className={this.isActiveAuth("profile")} to="/profile">My Profile</Link>
                <Link className={this.isActiveAuth("statement")} to="/statement">Statement</Link>
                <Link className={this.isActiveAuth("documents")} to="/documents">Documents</Link>
                <Link className={this.isActiveAuth("dispute")} to="/dispute">Dispute</Link>
                <Link className={this.isActiveAuth("architectural")} to="/architectural">Architectural</Link>
            </Menu>
        );
    }
}
