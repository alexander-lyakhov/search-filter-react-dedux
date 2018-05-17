import React from 'react';
import {Provider} from 'react-redux';
import store from '../../store/store.js';

import './app.scss';
import baseComponent from '../base-component.jsx';

import PageHeader from '../page-header/page-header.jsx';
import UserList from '../user-list/user-list.jsx';

import '../../assets/react-logo.png';

export default class App extends baseComponent
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div className="main">
                    <PageHeader />
                    <UserList />
                </div>
            </Provider>
        )
    }
}