import React from 'react'
import { fetchCarts, deleteCart, addToCart, addOrder, getOrder } from './main.js';


export default class ShoppingCart extends React.Component{
    constructor() {
        super()

        this.state ={
            id: '', name: '', price: 0, description: '',
            brand: '', producer: '', imageUrl: ''
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchCarts())
    }
    handleDelete(id){
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_CART',
                payload: id
            })
        this.props.dispatch(deleteCart(id))
        }
    }
    handleCheckOut(){
        var money = 0
        this.props.carts.map((i)=>{
            money = money + parseInt(i.price)
            this.props.dispatch(deleteCart(i._id))
        })
        let bill ={}
        bill['total']= money
        this.props.dispatch(addOrder(bill))
        
    }
    handleDeleteAll(){
        if (confirm('Are you sure to DELETE ALL of the items?')){
        this.props.carts.map((i)=>this.props.dispatch(deleteCart(i._id)))
        }
    }
    render(){
        return(
            <div className="left">
                  <div>
                   <h3>Shopping Cart</h3>
                  </div>
                  <div>
                  <table style={{width:"100%", textAlign:"left"}}>
                    
                        <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Producer</th>
                        <th>Image</th>
                        </tr>
                    
                    {this.props.carts.map((cart, i)=>
                            <tr key={i}>
                                <td>{cart.id}</td>
                                <td>{cart.name}</td>
                                <td>{cart.price}</td>
                                <td>{cart.description}</td>
                                <td>{cart.brand}</td>
                                <td>{cart.producer}</td>
                                <td><img src={cart.imageUrl} width="55px" height="55px" /></td>

                                <td><a onClick={()=>this.handleDelete(cart._id)}>
                                <img className='icon' src='./icons/rubbish-bin.png'/></a></td>

                                <td><a href='#' onClick={()=>
                                    {   
                                        let order = {total:cart.price, imageUrl: cart.imageUrl}
                                        this.props.dispatch(deleteCart(cart._id)) 
                                        this.props.dispatch(addOrder(order))
                                        
                                        
                                        
                                    }
                                    }>Check_Out</a></td>
                            </tr>
                            
                        
                    
                    )}
                        </table>
                        <table style={{width:"100%"}}>
                        <tr>
                        <td>
                        <a href='#' onClick={()=>this.handleCheckOut()}>Check Out All</a>
                        </td>
                        <td>
                            <a href='#' onClick={()=>this.handleDeleteAll()}>DeleteAll</a>
                        </td>
                        </tr>
                        </table>
                  </div>

                </div>


        )
    }
}