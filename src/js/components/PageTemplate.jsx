import React from 'react';

export default class PageTemplate extends React.Component {
  render() {
    return(
        <div className="pdfFooter text-center w-100">
          If you have any questions about this invoice, please contact:
          <address>
            <strong>Affinity Management Services</strong><br/>
            8200 NW 41st ST STE 200, Doral, FL 33166<br/>
            Phone: 305-325-4243, Fax: 305-325-4053, CustomerCare@ManagedByAffinity.com
          </address>
          <p className='mt-3'><strong><em>Thank You For Your Business!</em></strong></p>
          <div>Page {this.props.pageNum} of {this.props.totalPages}</div>
        </div>
    );
  }
}
