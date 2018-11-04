import React from "react";
import Store from "../store/Store.jsx";
import "../../styles/pdfStyles.scss";

const PDFContent = ()=>{
  // Get Data
  const currentBalance = Store.getCurrentBalance();
  const transactions = Store.getTransactions();
  const propertyInfo = Store.getPropertyInfo();
  const customerName = Store.getCustomerName();

  const dateStyle={
    width: '10%'
  }

  const descriptionStyle={
    width: '45%'
  }

  const textCenter={
    textAlign: 'center'
  }

  const textRight={
    textAlign: 'right'
  }

  var renderInvoiceRows = ()=>{
    this.transactions.map(transaction=>{
      var credits = ()=>{
        (transaction.type=='Payment')? '$'+transaction.amount :'';
      }
      var charges = ()=>{
        (transaction.type=='Charge')? '$'+transaction.amount :'';
      }
      var date = transaction.date;
      return(
        <tr key={transaction.id}>
          <td>{date.substr(5,2)}/{date.substr(8,2)}/{date.substr(0,4)}</td>
          <td>{transaction.description}</td>
          <td>{credits}</td>
          <td>{charges}</td>
          <td>${transaction.balance}</td>
        </tr>
      )
    });
  }

  return(
    <div className="wrapper">
      <p style={textRight}>Page {this.pageNum}</p>
      <p style={textCenter}>
        <span className="bold">Lake View of the California</span><br/>
        <span>PO BOX 166445</span><br/>
        <span>Miami FL 33116-6445</span><br/>
        <span>305-325-4243</span>
      </p>
      <br/>
      <p style={textCenter} className="bold">Statement of Account - {transactions.transactionsDate}</p>
      <div className="accountData">
        <div className="col-50">
          <div className="referenceData">
            <p>Re: {propertyInfo.mailingAddress.address} {propertyInfo.mailingAddress.address2}</p>
            <address className="customerAddress">
              {customerName}<br/>
              {propertyInfo.mailingAddress.address}<br/>
              {propertyInfo.mailingAddress.address2}<br/>
              {propertyInfo.mailingAddress.city},{propertyInfo.mailingAddress.state}&nbsp;
              {propertyInfo.mailingAddress.zip}<br/>
            </address>
          </div>
        </div>
        <div className="col-50">
          <table className="accountTable">
            <tbody>
              <tr>
                <td>Account #:</td>
                <td>103</td>
              </tr>
              <tr>
                <td>Lot #:</td>
                <td>103</td>
              </tr>
              <tr>
                <td>Bill Period:</td>
                <td></td>
              </tr>
              <tr>
                <td>Payment Due:</td>
                <td>12/30/16</td>
              </tr>
              <tr>
                {
                  //empty row
                }
              </tr>
              <tr className="bold">
                <td>Amount Due:</td>
                <td>$105.39</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="invoiceData">
        <table className="invoiceTable">
          <thead>
            <tr>
              <td style={dateStyle}>Date</td>
              <td style={descriptionStyle}>Description</td>
              <td>Charges</td>
              <td>Credits</td>
              <td>Balance</td>
            </tr>
          </thead>
          <tbody>
            {renderInvoiceRows}
            <tr className="fillBottom">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table className="tableFooter">
          <tbody>
            <tr>
              <td colSpan="4" className="balance bold">
                New Balance - Please Pay This Amount
              </td>
              <td colSpan="1" className="balance">
                {currentBalance}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <p>Make Checks Payable to: <span className="bold">Lake View Of The California</span></p>
          <p>
            PAST DUE NOTICE. SUBMIT PAYMENT WITHIN<br/>
            5 DAYS TO AVOID ADDITIONAL FEES, COSTS<br/>
            PAY ONLINE & SETUP FREE AUTOPAY<br/>
            www.MANAGEDBYAFFINITY.COM
          </p>
        </div>
      </div>
    </div>
  );
}

export default PDFContent;
