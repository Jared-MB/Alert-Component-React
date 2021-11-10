import React, { Component } from 'react';

import './alert.css'
/* 
    Animations by : Animista
    https://animista.net/
*/

export default class Alert extends Component {
    render() {
        const { show, msg, type } = this.props.data;
        const { style, className } = this.props;
        const styleDefault = {
            backgroundColor: 
                type === 'danger' 
                ? '#cc3300' 
                : type === 'warning' 
                    ? '#ffcc00' 
                    : type === 'success'
                        ? '#339900'
                        : type
                            ? type
                            : '#cc3300',
        }
        if (show){
            return (
                <div 
                    className={ 
                        className 
                        ? `${className} scale-in-center` 
                        : 'alert scale-in-center'
                    } 
                    style={ 
                        style 
                        ? style 
                        : styleDefault 
                    }>
                    <p>{ msg }</p>
                </div>
            )
        }
        else {
            return null
        }
    }
}