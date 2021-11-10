# Alert Component using React
This is an custom alert component using React with classes that I made for a proyect I'm working on and maybe it can help you to use in your proyect or you can give me a feedback.
## How do I configure it?

### Requirements
It consists of a container (where is the alert located), the alert code (file or in the same container) and the css, feel free to edit as you like.

**The files _alert.jsx_ and _alert.css_ have to be in the same directory.**

### Import it

Import the component in your proyect with the name _"Alert"_ of as you want name it.

`import Alert from './Alert.jsx';`

### Configuration of the container

The container should have :
- A state name _"alert"_ 
```js
state = {
    //This are the default values
    alert: {
        show: false,
        message: ',
        type: ''
    }
}
```
- A function name _"setAlert"_ or with another name you want to use
```js
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
        //When you click more than once while the alert is running, 
        //it can cause an error, so it as a try - catch to not mess up the page
        try {
            alert.classList.add('scale-out-center');
            //Clear alert values
            this.setState({
                alert : {
                    show : false,
                    msg : '',
                    type : ''
                }
            })
        }
        catch(err){}
    }, 5000)
    //The alert only lasts 5 seconds, you can modify this value (remember that time is in milliseconds)
}
```
- The component name _"Alert"_ or how do you imported it inside of your container and it requires a prop name _"data"_ that recives the alert values
```js
render(){
    return (
        <div className='container'>
            <Alert data={this.state.alert}/>
        </div>
    )
}
```

The alert only is render when you use it and has a position absolute so it doesn't mess up your design and it removes itself after 5 seconds or the time you configure it.

## How do I use it?

You call the function _setAlert()_ where you want to show a message, remeber use _this._ before the function name.

`this.setAlert()`

But this is not sufficient beacuse it recives two parameters
- The first one is the message you want to show
- The second one is the _type_ of the message, it means the background color it will show, it can be _"success"_, _"warning"_ , _"danger"_ or the color you want to use (in hexadecimal , _#fff_ for example)

`this.setAlert('This is a message', 'success')`

The colors of each _type_ are:
- _"success"_: _#339900_
- _"warning"_: _#ffcc00_
- _"danger"_: _#cc3300_

The default color is red _(#cc3300)_ so you don't need to write the second parameter for an "danger" alert

`this.setAlert('This is an danger alert')`

When you call the component (`<Alert data={this.state.alert}/>`) you can pass some props to costum as you want.

- A className 
`<Alert data={this.state.alert} className='alert-custom'/>`
- A style
`<Alert data={this.state.alert} style={{backgroundColor: '#cc3300'}}/>`

Remember the style is an object, so you can pass a variable to the style, for example:

```js
render(){
    const style = {
    backgroundColor: '#cc3300',
    fontSize: '1.5rem'
    color : '#000'
    }
    return (
        <div className='container'>
            <Alert data={this.state.alert} style={style}/>
        </div>
    )
}
```

The default style is this

```css
.alert {
    position: absolute;
    z-index: 1000;
    top: 0em;
    font-size: 1.2em;
    left: 3em;
    padding: 0.8em;
}
```

The style is in the file _"alert.css"_ feel free to change it or use your own style using the className property.

In the same file (alert.css) you can find the animation of the alert, you can change it or use your own animation. The animations I use is by _Animista_, you can find it in the link below:
https://animista.net/

Only remember to change the className property _"scale-in-center"_ and _"scale-out-center"_, you can find the first in the file _"alert.jsx"_ on _className_ (change the two)
```js
className={ 
    className 
    //Change only 'scale-in-center' value , don't change 'alert' value
    ? `${className} scale-in-center` 
    : 'alert scale-in-center'
} 
```
and the second you can find in the function _setAlert()_ in the _setTimeout()_ part, on the file _"alert.jsx"_
```js
setTimeout(() => {
    //For animations
    //This is the value you set in className on "alert.css"
    const alert = document.querySelector('.scale-in-center');
    try {
        //This className is for an "exit" animation
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
```

### When to use it?

You could use when you want to show to the user an personalized error or a success alert but you dont want to use the same ugly window alert for every error or success process.

For example, you do a request to an api, if you get an error, you can show the error to the user with the alert component and custom it.

```js
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
```