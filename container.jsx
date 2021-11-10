import React, { Component } from 'react'

import Alert from './alert'

export default class container extends Component {

    state = {
        products : [],
        alert : {
            show : false,
            msg : '',
            type : 'warning'
        }
    }

    setAlert = (msg, type = '') => {
        this.setState({
            alert : {
                show : true,
                msg,
                type
            }
        })
        setTimeout(() => {
            //For animations
            const alert = document.querySelector('.scale-in-center');
            try {
                alert.classList.add('scale-out-center');
                const closeAlert = setInterval(() => {
                    this.setState({
                        alert : {
                            show : false,
                            msg : '',
                            type : ''
                        }
                    })
                },250)
                setTimeout(() => {
                    clearInterval(closeAlert);
                }, 5000)
            }
            catch(err){}
        }, 5000)
    }

    getProducts = () => {
        fetch(API)
        .then(res => res.json())
        .then(data => {
            this.setState({
                products : data
            })
        })
        .catch(() => this.setAlert('Error fetching data', 'danger'))
    }

    render() {
        const alertStyle = {
            fontSize : '1.5rem',
            width : '10vw',
        }
        return (
            <div>
                <Alert data={this.state.alert} className='alert' style={alertStyle}/>
            </div>
        )
    }
}
