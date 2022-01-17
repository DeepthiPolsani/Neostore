import React, { useState, useEffect } from 'react'
import { getProducts } from '../config/Myservice';
import ReactStars from "react-rating-stars-component";
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Headers from './Headers';

import { Slide } from 'react-slideshow-image';
export default function Dashboard() {


    let [products, setProducts] = useState([]);


    useEffect(() => {

        getProducts()
            .then(res => {
                console.log(res.data)


                setProducts(res.data.products);

            })


    }, [])

    const ratingChanged =()=>{

    }
    
    return (
        <>
       
        <Container fluid >
     
            <Container fluid expand="lg"  className='w-100% h-vh m-0 p-0 container-fluid row'>

                <div id="carouselExampleControls" className="carousel slide row  " data-ride="carousel">
                    <div className="carousel-inner ">
                        <div className="carousel-item active ">
                            <img src="images/25.jpg"  className="w-1024 h-100 m-0 p-0 container-fluid" alt="..." />
                        </div>
                        <div className="carousel-item h-75">
                            <img src="images/26.jpg"  className="d-block w-1024 img-fluid" alt="..." />
                        </div>
                        <div className="carousel-item h-75 w-1000">
                            <img src="images/31.jpg"   className="d-block w-1250  img-fluid" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
            </Container>
            <Container className="mt-3">
                <h2 className="text-center pt-3">Popular Products</h2>
                <Row>
                    {products.map(item =>
                        <Col lg={4} md={6} sm={6}  key={item._id}>
                        <Card className='p-1 m-2 mb-4 mr-11' style={{ width: '18rem' ,textAlign:"center"}}>
                            <Card.Img variant="top" src={item.product_image} width="200" height="200" />
                                <Card.Body>
                                    <Card.Title className="text-info">{item.product_name}</Card.Title>
                                    <Card.Text>
                                        <b>Rs.{item.product_cost}</b>
                                    </Card.Text>
                                    <Container className="d-flex justify-content-center">
                                        <Button variant="danger" className="btn btn-danger mb-2 cc">Add to cart</Button><br/>
                                      
                                    </Container>
                                    <Container className="d-flex justify-content-center">
                                    <ReactStars
                                            count={5}
                                            onChange={ratingChanged}
                                            size={18}
                                            activeColor="#ffd700"
                                            className="card1 "
                                            edit={true}
                                            isHalf={true}
                                            value={item.product_rating}
                                        />
                                        </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </Container>
        </>
    )
}
