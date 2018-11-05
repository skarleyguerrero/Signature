import React from 'react';

export default class PageTemplate extends React.Component {
    render() {
        return (
            <div style={{ position: "absolute", top: "20px", right: "20px", fontSize:"12px", fontFamily:"Arial" }}>
                Page {this.props.pageNum}
            </div>
        );
    }
}
