import React from 'react';
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer footer-overflow footer-mobile" id="footer">
        		<div className="container">
        			<div className="row text-center text-xs-center text-sm-left text-md-left">
        				<div className="col-xs-12 col-sm-6 col-md-6">
        					<h5>Professionally Managed By:</h5>
        					<address>Affinity Management Services<br/>
        					   8200 NW 41st ST #200<br/>
        					   Doral, FL 33166<br/>
        					   P: 305-325-4243<br/>
        					   <a href="mailto:CustomerCare@ManagedByAffinity.com">
        					   <span className="text">E: CustomerCare@ManagedByAffinity.com</span>
        					   <span className="icon"><i className="fas fa-envelope"></i></span>
        					   </a>
        					</address>
        				</div>
        			</div>
    			</div>
            </footer>
        )
    }
}
