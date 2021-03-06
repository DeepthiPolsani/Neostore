import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Row, Col,Card} from "react-bootstrap";
import { useNavigate } from "react-router";
import { authentication, createOrders } from "../config/Myservice";
import { MdDelete } from 'react-icons/md'

import axios from "axios";
import Headers from "./Headers";

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    let items = [];
    let total = [0];

    useEffect(() => {

        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);

    

    const onAdd = (index) => {
        console.log(cart[index])
        let temp = [...cart]
        temp[index].quantity++
        setCart(temp)
        localStorage.setItem('mycart', JSON.stringify(temp))

    };

    const onRemove = (index) => {
        console.log(cart[index])
        let temp = [...cart]
        temp[index].quantity--
        setCart(temp)
        localStorage.setItem('mycart', JSON.stringify(temp))

    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
    };


    const proceedBuy = () => {
        console.log(cart);

        cart.map((value) => {
            let allorders = { product_name: `${value.item.product_name}`, product_cost: `${value.item.product_cost}`, product_image: `${value.item.product_image}`, quantity: `${value.quantity}` }
            items.push(allorders)
            console.log(items.product_name)
        });

        let email = sessionStorage.getItem('user')
        let orderno = Math.random().toFixed(6).split('.')[1];
        let checkout = {
            email: email,
            items: items,
            orderno: orderno,
            total: total.reduce((result, number) => result + number),
        };
        console.log(checkout);
        createOrders(checkout)
            .then((res) => {
                console.log(res.data)
                navigate('/checkout', { state: { orderno: orderno } })
            
            });
    };

    return (
        <>
          
          
             {cart!==null ?
         
                <Row fluid className="text-dark mt-4 mb-5 ">
                    
               
                    <Col lg={8} >
                   
                        <Card className="p-3 ">
                            <h2>My Orders</h2>
                        
                                <Table bordered hover variant="light" size="sm" className="mt-3 text-dark ">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th >Quantity</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart ? cart.map((value, index) => {
                                            return (
                                                <tr key={index}>

                                                    <td><b><img src={value.item.product_image} width="100px" height="80px" /></b></td>
                                                    <td><b>{value.item.product_name}</b></td>
                                                    <td><b>{value.item.product_cost}/-</b></td>
                                                    <td>
                                                        <Row>
                                                            <Col>
                                                                <Button variant="secondary" onClick={() => onRemove(index)}>-</Button>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control type="text" placeholder="Enter quantity" min="1" max="20" value={value.quantity} />
                                                            </Col>
                                                            <Col>
                                                                <Button variant="secondary" onClick={() => onAdd(index)}>+</Button>
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                    <td><b>
                                                        {value.quantity * value.item.product_cost}</b>
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => onDelete(index)}><MdDelete /></Button>
                                                    </td>
                                                    {console.log(
                                                        total.push(
                                                            value.item.product_cost * value.quantity
                                                        )
                                                    )}
                                                </tr>
                                            );
                                        })
                                            : ""}
                                    </tbody>
                                </Table> 
                        </Card>
                         
                    </Col>

                    <Col lg={4}>
                        <Card className="p-3 text-dark" >
                            <h3>Review Order</h3>
                            <br />
                          
                          <h5 className="text-left text-dark">
                          SubTotal: &nbsp;
                               <i> {total.reduce((result, number) => result + number)}/-</i>
                            </h5>
                         
                            <hr />
                            <h5 className="text-left text-dark">GST%:  &nbsp;
                               <i> {Math.floor(0.05 * (total.reduce((result, number) => result + number)))}/-</i>
                            </h5>
                            <hr />
                            <h5 className="text-left text-dark">OrderTotal: &nbsp;
                               <i> {(total.reduce((result, number) => result + number)) -Math.floor(0.05 * (total.reduce((result, number) => result + number)))}/-</i>
                            </h5>
                            <br />
                            <Button variant="success" onClick={() => proceedBuy()} className="cc"> Proceed to Buy</Button>
                        </Card>
                    </Col>
                 
                </Row>
                : <h3 className="mt-5 bg-danger p-2">Your cart is empty</h3>}
                
               

        </>
    );
}