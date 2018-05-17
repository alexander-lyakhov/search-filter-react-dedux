import React from 'react';

export default class baseComponent extends React.Component {
    constructor(props) {
        super(props);

        let app = window.app = window.app || {};

        if (!app.componentByID) {
            app.componentByID = {};
        }

        if (!app.componentsByName) {
            app.componentsByName = {};
        }

        if (props.id) {
            app.componentByID[props.id] = this;
        }

        let componentName = this.constructor.name;

        if (app.componentsByName[componentName] === undefined) {
            app.componentsByName[componentName] = [];
        }

        app.componentsByName[componentName].push(this);
    }

    emit(fn, data) {
        if (this.props[fn] && typeof fn === 'string') {
            this.props[fn](data);
        }
    }
}
