import React from 'react'
import {fetchOrders, deleteOrder, addOrder, getOrder, updateOrder} from './main.js'
import './styles/product-styles.css'

export default class Order extends React.Component {

    constructor() {
        super()

        this.state ={
            id: '', name: '' ,email: '', phone:'', address: '', orderDate: '', total: 0, status: ''
    
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchOrders())
    }

    componentWillReceiveProps(props){
        this.setState(props.editedOrder)
    }

    handleSave(){
        if(this.state.id === '' || this.state.name ===''
        ||this.state.email === '' ||this.state.phone === '' ||this.state.address === '' || this.state.orderDate ===''|| this.state.total ==='' ){
                    alert('Please check the form')
                    return false
                }
        else{
        if(this.state._id === undefined || this.state._id ==='')
            this.props.dispatch(addOrder(this.state))
        else    
            this.props.dispatch(updateOrder(this.state))
    }
}

    handleDelete(_id) {
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_ORDER',
                payload: _id
            })
            this.props.dispatch(deleteOrder(_id))

        }
    }
    handleEdit(id){
        this.props.dispatch(getOrder(id))
    }
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    render() {
        return (
            <div className="container">
                <div className='header'>
                <h3>Order Form</h3>
                </div>
                <table style={{ width:"50%",borderWidth:"2px", borderColor:"#dddddd"}}>
                    <tbody>
                    <tr>
                    <td>ID</td>
                    <td><input type="text" name='id' value={this.state.id}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name='name' value={this.state.name}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" name='email' value={this.state.email}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td><input type="text" name='phone' value={this.state.phone}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><input type="text" name='address' value={this.state.address}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>OrderDate</td>
                        <td><input type="text" name='orderDate' value={this.state.orderDate}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td><input type="text" name='total' value={this.state.total}
                        onChange={this.handleChange.bind(this)} />$</td>
                    </tr>
                    <tr>
                    <td>Status</td>
                    <td>
                        <select name="status" value={this.state.status} onChange={this.handleChange.bind(this)}>
                        <option>New</option>
                        <option>Processing</option>
                        <option>Ordering</option>
                        <option>Completed</option>
                        </select>
                    </td>
                    </tr>
                    
                    <br/>
                    <tr style={{textAlign:"right"}}>
                        <td>
                            <a type='button' className='button' value='Save' onClick={()=>this.handleSave()}>
                            <img src="/icons/submit.png" width="25px" height="25px" alt=""/></a>
                        </td>
                    </tr>
                    </tbody>
                    </table>
            
                <div className='header'><h3>Product Order</h3></div>
                    
                    
                    <div className="list">
                            <br/>
                            <table  style={{width:"100%", textAlign:"left"}}>
                            <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>OrderDate</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                            {this.props.orders.map((i) =>
                            <tr style={{textAlign:"center"}}>
                            
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.phone}</td>
                                <td>{i.address}</td>
                                <td>{i.orderDate}</td>
                                <td>{i.total}$</td>
                                <td>{i.status}</td>
                                <td>
                                    <a type='button' className="button"  onClick={() => this.handleDelete(i._id)}>
                                    <img className='icon' src='./icons/rubbish-bin.png'/></a>
                                </td>
                                <td>
                                <a className="button"  onClick={() => this.handleEdit(i._id)}><img className='icon' src='./icons/new-file.png'/>
                                </a>
                                </td>
                            </tr>
                            )}
                            </tbody>
                            </table>
            
                        <br/>
                            
                            
                            
                        </div>
            </div>
        )
    }
}

