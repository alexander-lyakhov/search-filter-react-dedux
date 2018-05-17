import React from 'react';
import {connect} from 'react-redux'

import './user-list.scss';

import baseComponent from '../base-component.jsx';
import data from '../../data/data.js';

class UserList extends baseComponent
{
    constructor(props) {
        super(props);
    }

    get uid() {
        return Math.floor((Math.random() * new Date().getTime())).toString(16);
    }

    get users() {
        return  data.filter(item =>
            item.full_name.toLowerCase().indexOf(this.props.query.toLowerCase()) === 0
        );
    }

    shouldComponentUpdate(nextProps) {
        return this.props.query !== nextProps;
    }

    render() {
        //console.log('user-list: render')

        return (
            <ul className="user-list">
                {
                    this.users.map((user, index) =>
                        <li className="user-list__item" key={this.uid}>
                            <div className="thumbnail">
                                <img src={user.medium_avatar_url} width="72" height="72" alt="" />
                            </div>
                            <div className="user-info">
                                <div className="name">{user.full_name}</div>
                                <div className="headline">{user.headline}</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        query: state.query
    };
}

export default connect(mapStateToProps)(UserList);
