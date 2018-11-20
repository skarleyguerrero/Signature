import Actions from "../actions/Actions.jsx";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Flux from "@4geeksacademy/react-flux-dash";
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import React from "react";
import Store from "../store/Store.jsx";
import { Link, Redirect } from "react-router-dom";
import {Session} from '../actions/utility/session';

import { PDFExport } from '@progress/kendo-react-pdf';
import PdfContent from '../components/PDFContent.jsx';
import PageTemplate from '../components/pageTemplate.jsx';

export default class Statement extends Flux.View {
  constructor(props) {
    super(props);
    this.state = {
      propertyInfo:{},
      accountNumber:"",
      fullName:"",
      currentBalance:"",
      transactionsDate:"",
      transactions:[{
        date:"",
        description:"",
        type:"",
        amount:"",
        balance:""
      }]
    }
    this.invoice = React.createRef();
  }

  // Lifecycle methods
  componentWillMount (){
    const adjustNameCapitalization = (str) => {
       var splitStr = str.toLowerCase().split(' ');
       for (var i = 0; i < splitStr.length; i++) {
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
       }
       return splitStr.join(' ');
    }

    const currBal = Store.getCurrentBalance()
    const tranObj = Store.getTransactions()
    const session = Session.store.getSession()
    const customerName = adjustNameCapitalization(session.user.info.topsownerfullname)
    const accountNum = session.user.info.accountnumber
    const propertyObject = Store.getPropertyInfo()

    this.setState ({
      accountNumber: accountNum,
      propertyInfo: propertyObject,
      fullName: customerName,
      currentBalance: currBal,
      transactions: tranObj[0],
      transactionsDate: tranObj[1]
    })
  }

  componentDidMount() {
    const userInformation = Session.store.getSession().user.info;
    const today = new Date().toJSON().slice(0,10).replace(/-/g,'/')
    if (today != this.state.transactionsDate) {
      Actions.getPossesionData(userInformation.topsownerid)
      Actions.getTransactions(userInformation.topsownerid)
    }

    this.bindStore(Store, () => {
      const currBal = Store.getCurrentBalance()
      this.setState ({
        currentBalance: currBal
      })
    })
    this.bindStore(Store, () => {
      const tranObj = Store.getTransactions()
      this.setState ({
        transactions: tranObj[0],
        transactionsDate: tranObj[1]
      })
    })
  }

  // Views Methods

    render() {
    if (this.state.currentBalance === '') {
      return (<h2>Loading</h2>)
    }

   var allTransactionsLarge = this.state.transactions.map((transactions) => {
      const date = transactions.date
      return (
        <tr key={transactions.id}>
          <td>{date.substr(5,2)}/{date.substr(8,2)}/{date.substr(0,4)}</td>
          <td>{transactions.description}</td>
          <td>{transactions.type}</td>
          <td>${transactions.amount}</td>
         {/* <td>${transactions.balance}</td> */}
        </tr>
      )
    })

   var allTransactionsSmall = this.state.transactions.map((transactions) => {
      const date = transactions.date
      return (
        <div id="statementCardSmall" key={transactions.id}>
          <table className="table table-sm table-margin">
            <tbody>
              <tr>
                <th scope="row">Date</th>
                <td>{date.substr(5,2)}/{date.substr(8,2)}/{date.substr(0,4)}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{transactions.description}</td>
              </tr>
              <tr>
                <th scope="row">Type</th>
                <td>{transactions.type}</td>
              </tr>
              <tr>
                <th scope="row">Amount</th>
                <td>${transactions.amount}</td>
              </tr>
            {/*  <tr>
                <th scope="row">Balance</th>
                <td>${transactions.balance}</td>
              </tr> */}
            </tbody>
          </table>
      </div>
      )
    })

    var exportPDF = () => {
      if(this.state.currentBalance !== ''){
        this.invoice.save();
      }
    }

    var dateConvert = () => {
      const date = this.state.transactionsDate;
      const currentDate = date.substr(5,2)+'/'+date.substr(8,2)+'/'+date.substr(0,4);
      return currentDate;
    }

    return (
      <div>
        <Navbar active="statement"/>
        <div id="body">
        <span className="smallStatement">
          <div className="statement-view">
            <div id="top-group">
              <div id="group-bottom" className="row d-flex justify-content-between">
                <Link to="/">
                    <button type="button" className="btn btn-primary button-color">
                      <FontAwesome name='arrow-left' size="lg"/>
                    </button>
                </Link>
              </div>
              <div>
                <h1 id="h1-statement" className="text-center">Statement</h1>
              </div>
              <div id="button-group-padding" className="row d-flex justify-content-between">
                <Link to="/pay-now">
                  <button type="button" className="btn btn-primary" onClick={this.exportPDF}><FontAwesomeIcon icon='file-pdf' style={{marginRight:'5px'}} size="lg"/> Download Statement</button>
                </Link>
                <p id="pixel-leftSmall" className="boldify">Current Balance: ${this.state.currentBalance}</p>
              </div>
            </div>

            <span id="transactions">
             {allTransactionsSmall}
           </span>

              </div>

          </span>
        <span className="largeStatement">
        <div id="enclosing-statement">
          <div className="max-width-statement">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12">
                <h1>Statement</h1>
                <hr className="hr-overwrite" />
                  <div className="card cardStyle div-top-margin">
                    <div className="card-body row d-flex justify-content-between">
                      <p id="pixel-left" className="boldify">Current Balance: ${this.state.currentBalance}</p>
                      <button id="pixel-right"  className="btn btn-primary" onClick={exportPDF}><FontAwesomeIcon icon='file-pdf' style={{marginRight:'5px'}} size="lg"/> Download Statement</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row-margin">
                <div className="col-sm-12">
                  <table className="table row-margin tableStyle">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                     {/*   <th scope="col">Balance</th> */}
                      </tr>
                    </thead>
                    <tbody>
                    {allTransactionsLarge}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
          </span>
        </div>
        <div style={{ position: "absolute", left: "-1000%", top: 0 }}>
          <PDFExport
              paperSize='Letter'
              pageTemplate={PageTemplate}
              fileName={"invoice-"+this.state.transactionsDate+".pdf"}
              repeatHeaders={true}
              forcePageBreak=".page-break"
              margin='1cm'
              ref={(component)=>this.invoice=component}
              >
                <PdfContent
                  transactions={this.state.transactions}
                  transactionsDate={dateConvert()}
                  currentBalance={this.state.currentBalance}
                  propertyInfo={this.state.propertyInfo}
                  customerName={this.state.fullName}
                  account={this.state.accountNumber}
                  />
          </PDFExport>
        </div>
        <Footer />
      </div>
    );
  }
}
