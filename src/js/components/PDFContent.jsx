import React from "react";
import Store from "../store/Store.jsx";
import "../../styles/pdfStyles.scss";

const PdfContent = (props) => {

  var renderInvoiceRows = props.transactions.map((transaction,index)=>{
      var date = transaction.date;
      if(index!==0 && index===8){
        return(
          <tr key={transaction.id} className="page-break">
            <td>{date.substr(5,2)}/{date.substr(8,2)}/{date.substr(0,4)}</td>
            <td>{transaction.description}</td>
            <td style={{textAlign:'right'}}>{(transaction.type==='Payment')? <span><span style={{float:'left'}}>$</span> {transaction.amount}</span> :''}</td>
            <td style={{textAlign:'right'}}>{(transaction.type==='Charge')? <span><span style={{float:'left'}}>$</span> {transaction.amount}</span> :''}</td>
            <td style={{textAlign:'right'}}><span style={{float:'left'}}>$</span> {transaction.balance}</td>
          </tr>
        );
      }else if (index!==0 && index%32===0) {
        return(
          <tr key={transaction.id} className="page-break">
            <td>{date.substr(5,2)}/{date.substr(8,2)}/{date.substr(0,4)}</td>
            <td>{transaction.description}</td>
            <td style={{textAlign:'right'}}>{(transaction.type==='Payment')? <span><span style={{float:'left'}}>$</span> {transaction.amount}</span> :''}</td>
            <td style={{textAlign:'right'}}>{(transaction.type==='Charge')? <span><span style={{float:'left'}}>$</span> {transaction.amount}</span> :''}</td>
            <td style={{textAlign:'right'}}><span style={{float:'left'}}>$</span> {transaction.balance}</td>
          </tr>
        );
      }else{
        return(
          <tr key={transaction.id}>
            <td>{date.substr(5,2)}/{date.substr(8,2)}/{date.substr(0,4)}</td>
            <td>{transaction.description}</td>
            <td style={{textAlign:'right'}}>{(transaction.type==='Payment')? <span><span style={{float:'left'}}>$</span> {transaction.amount}</span> :''}</td>
            <td style={{textAlign:'right'}}>{(transaction.type==='Charge')? <span><span style={{float:'left'}}>$</span> {transaction.amount}</span> :''}</td>
            <td style={{textAlign:'right'}}><span style={{float:'left'}}>$</span> {transaction.balance}</td>
          </tr>
        );
      }
    });

  return(
    <div>
      <table className="w-100 wrapper">
        <thead className="pdfHeader">
          <tr>
            <th>
              <div className='row my-0'>
                <div className="col-5">
                  <div className="row mb-1">
                    <div className="col">
                      <img src="/local/attorneyPortal/src/images/amslogo.jpg" className="logoImg" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <table className="table table-sm w-100 my-0">
                        <thead className="thead-blue">
                          <tr>
                            <th scope="col" colSpan="2">Bill To:</th>
                          </tr>
                        </thead>
                        <tbody className="my-0">
                          <tr>
                            <td scope="col">Re:</td>
                            <td scope="col">3701 N Country Dr #206</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <address className="customerAddress">
                                <strong>
                                  {props.customerName}<br/>
                                  3701 N Country Dr #206<br/>
                                  Miami, FL 33180<br/>
                                </strong>
                              </address>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-2 my-0"></div>

                <div className="col-5 my-0">
                  <table className="table table-sm table-borderless w-100">
                    <thead>
                      <tr>
                        <th scope="col" colSpan="2"><h2>Statement</h2></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr scope="row">
                        <td className="w-75">Statement Date:</td>
                        <td>{props.transactionsDate}</td>
                      </tr>
                      <tr scope="row">
                        <td>Account #:</td>
                        <td>{props.account}</td>
                      </tr>
                      <tr scope="row">
                        <td>Lot #:</td>
                        <td>103</td>
                      </tr>
                      <tr scope="row"><td>&nbsp;</td></tr>
                      <tr scope="row">
                        <td><strong>Make Checks Payable to:</strong></td>
                      </tr>
                      <tr scope="row">
                        <td>Lake View Of The California</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row my-0">
                <div className="col-5">
                  <table className="table table-sm">
                    <thead className="thead-blue">
                      <tr>
                        <th scope="col">Remittance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <address>
                            <strong>Lake View of the California</strong><br/>
                            PO BOX 166445<br/>
                            Miami FL 33116-6445<br/>
                            305-325-4243
                          </address>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col">

                </div>
                <div className="col-5">
                  <table className="table table-sm">
                    <thead className="thead-blue">
                      <tr>
                        <th scope="col" colSpan="2">Account Summary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr scope="row">
                          <td className="w-50">Bill Period:</td>
                          <td>11/1/18 - 12/1/18</td>
                      </tr>
                      <tr scope="row">
                        <td>Payment Due:</td>
                        <td>{props.transactionsDate}</td>
                      </tr>
                      <tr scope="row">
                        <td>Amount Due:</td>
                        <td>${props.currentBalance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </table>
      <table className="wrapper table table-striped table-bordered table-sm invoiceTable">
        <thead className="thead-blue">
          <tr>
            <th scope="col" style={{width:"13%"}}>Date</th>
            <th scope="col" style={{width:"45%"}}>Description</th>
            <th scope="col">Charges</th>
            <th scope="col">Credits</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          {renderInvoiceRows}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="table-active text-right">
              <strong>New Balance - Please Pay This Amount</strong>
            </td>
            <td colSpan="1" className="tcell-blue">
              <strong>${props.currentBalance}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default PdfContent;
