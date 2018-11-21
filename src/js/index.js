//import react into the bundle
import React from "react";
import ReactDOM from 'react-dom';
//import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.scss";

//import "./src/views/NewStyle.css"
//import 'font-awesome/css/font-awesome.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faPaintRoller, faUserCircle, faFileAlt, faListAlt, faBirthdayCake, faWallet, faTrashAlt,faUserCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faFilePdf,faPaintRoller,faUserCircle,faFileAlt,faListAlt,faBirthdayCake,faWallet,faTrashAlt, faUserCheck)
//import '../node_modules/font-awesome/css/font-awesome.min.css';

//include bootstrap npm library into the bundle
import 'bootstrap';

//include your index.scss file into the bundle
import '../styles/index.scss';
import '../images/amslogo.jpg';

//import your own components
import Router from './Router.jsx';

//render your react application
ReactDOM.render(
    <Router />,
    document.querySelector('#app')
);
