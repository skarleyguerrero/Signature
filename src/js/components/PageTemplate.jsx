import React from 'react';

export default class PageTemplate extends React.Component {
  render() {
    return(
        <div className="pFoot w-100 text-center">
          Page {this.props.pageNum} of {this.props.totalPages}
        </div>
    );
  }
}
