import React from 'react';

export default class PageTemplate extends React.Component {
  render() {
    return(
        <div className="pdfFooter text-center w-100">
          If you have any questions about this invoice, please contact:
          <address>
            <strong>Affinity Property Management</strong><br/>
            [Street Address], [City, State Zip]<br/>
            Phone: [000-000-0000], Fax: [000-000-0000], [Email]
          </address>
          <p className='mt-3'><strong><em>Thank You For Your Business!</em></strong></p>
          <div>Page {this.props.pageNum} of {this.props.totalPages}</div>
        </div>
    );
  }
}
