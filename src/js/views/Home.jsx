import { Link } from "react-router-dom";
import Flux from "@4geeksacademy/react-flux-dash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import React from "react"
import Store from "../store/Store.jsx";

export default class Home extends Flux.View {

    constructor(props) {
        super(props);
        this.state = {
        }
        
    }

    // Lifecycle methods

    componentWillMount() {
       
    }

    // Views Methods

    render() {
        return (
            <div>
                <Navbar active="home" />
                <div id="body" className="col-sm-9 max-width-div">
                <div>
                    <span className="largeParagraph">
                        <p></p>
                        <p></p>
                        <h1 id="aboutOurCommunity">
                            This is the attorney service portal.
                        </h1>
                    </span>
                    <span className="smallParagraph">
                        <input type="checkbox" className="read-more-state" id="post-1" />
                            <h1 id="aboutOurCommunity" className="read-more-wrap">
                               This is the attorney service portal.
                            </h1>
                        <label htmlFor="post-1" className="read-more-trigger"></label>
                    </span>
                    <p></p>
                    <p></p>
                </div>
            </div>   
            <Footer/>
            </div>
        );
    }
}
