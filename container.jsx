/* 
---------------------------------------------

THIS IS AN EXAMPLE OF A CONTAINER COMPONENT

---------------------------------------------
*/
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
                //Clear alert values after the animation finishes
                setTimeout(() => {
                    this.setState({
                        alert : {
                            show : false,
                            msg : '',
                            type : ''
                        }
                    })
                },250)
            }
            catch(err){}
        }, 5000)
    }

    /* THIS IS NOT PART OF THE ALERT, IS JUST AN EXAMPLE OF HOW TO USE IT */
    getProducts = () => {
        fetch(API)
        .then(res => res.json())
        .then(data => {
            this.setState({
                products : data
            })
        })
        .catch(() => this.setAlert('Error fetching data', 'warning'))
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
