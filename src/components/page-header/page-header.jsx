import React from 'react';
import {connect} from 'react-redux'

import './page-header.scss';
import baseComponent from '../base-component.jsx';

class PageHeader extends baseComponent
{
    constructor(props) {
        super(props);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    keyUpHandler(e) {
        this.props.search(e.target.value);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.refs.txtSearch.focus();
    }

    render() {
        return (
            <header>
                <div className="header-area">
                    <div className="text-wrapper">
                        <input type="text"  ref="txtSearch" className="text-field" onKeyUp={this.keyUpHandler} />
                    </div>
                </div>
            </header>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        search: function(query) {
            dispatch({type: 'QUERY.UPDATE', query: query})
        }
    };
}

export default connect(null, mapDispatchToProps)(PageHeader);