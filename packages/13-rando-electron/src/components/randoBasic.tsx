import React, { Component } from 'react';
import { RandoBackend } from '../backend/randoBackend';

export class RandoBasicComponent extends Component {

    private interval?: NodeJS.Timer;
    private backend: RandoBackend;

    constructor(props: any){
        super(props);
        this.setState({});
        this.backend = new RandoBackend();
    }

    render(){
        return (
            <div> {JSON.stringify(this.state)}</div>
        );
    }
    componentDidMount() {
        this.backend
        this.interval = setInterval(this.stateRefreshCallback, 2000);
    }

    stateRefreshCallback() {
        const state = this.backend.getState();
        if(state){
            this.setState(state);
        }
    }

    componentWillUnmount() {
        if(this.interval){
            clearInterval(this.interval);
        }
    }
}