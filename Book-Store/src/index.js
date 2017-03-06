// import React from 'react';// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
 import 'bootstrap/dist/css/bootstrap.css';
 

 
 // const React = require('react')
 const ReactDOM = require('react-dom')
 const { hashHistory,
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
 } = require('react-router')

 const Model = require('./jsx/model.jsx')
 const Cart = require('./jsx/cart.jsx')
 const Checkout = require('./jsx/checkout.jsx')
 const Product =require('./jsx/product.jsx')

const PRODUCTS = [
  { id: 0, src: 'images/proexpress-cover.jpg', title: 'Pro Express.js', url: 'http://amzn.to/1D6qiqk' },
  { id: 1, src: 'images/practicalnode-cover.jpeg', title: 'Practical Node.js', url: 'http://amzn.to/NuQ0fM' },
  { id: 2, src: 'images/expressapiref-cover.jpg', title: 'Express API Reference', url: 'http://amzn.to/1xcHanf' },
  { id: 3, src: 'images/reactquickly-cover.jpg', title: 'React Quickly', url: 'https://www.manning.com/books/react-quickly'},
  { id: 4, src: 'images/fullstack-cover.png', title: 'Full Stack JavaScript', url: 'http://www.apress.com/9781484217504'}
]
  const Heading  = () =>{
    return <h1>my Book Store</h1>
  }
 const Copy = () => {
   return <p>Please click on a book to view details in a modal. You can copy/paste the link of the modal. The link will </p>
 } 

 class App extends React.Component{
   componentWillReceiveProps(nextProps) {
     this.isModal = (nextProps.location.state && nextProps.location.state.model )
     if(this.isModel && 
     nextProps.location.key !== this.props.location.key) {
       this.previousChildern =this.props.children
     }
   }

 render() {
   console.log('Model: ',this.isModel)
   return (
      <div className = "well">
      <Heading/>
      <div>
      {(this.isModel) ? this.previousChildren : this.props.children}

      {(this.isModal)?
        <Modal isOpen ={true} returnTo= {this.props.location.state.returnTo}>
          {this.props.children}
          </Modal> : ''
      }
    </div>
  </div>

   )
 }

}
  
   class Index extends React.Component{
     render(){
       return(
         <div>
         <copy/>
         <p><Link to="/cart" className="btn btn-danger">Cart</Link></p>
         <div>
         {PRODUCTS.map(picture => (
           <Link key= {picture.id}
           to={{pathname: '/products/${picture.id}',
           state: {modal: true,
              returnTo: this.props.location.pathname  }
          }
        }>
        <img style={{margin:10}} src={picture.src} height="100" />
        </Link>
         ))}
         </div>
         </div>
       )
     }

   }
   
  let cartItems = {}
    const addToCart = (id) => {
       if (cartItems[id])
       cartItems[id] += 1
       else
       cartItems[id] =1
    }
  





ReactDOM.render(
  <Router history = {hashHistory}>
   <Route path="/" component={App}>
   <IndexRoute component={Index}/>
   <Route path="/products/:id" component={Product}
   addToCart = {addToCart}
   products={PRODUCTS}/>
   </Route>
   <Route path = "/Checkout" component={Checkout}
     cartItems= {cartItems} products = {PRODUCTS}/>

     </Router>
), document.getElementById('app')
