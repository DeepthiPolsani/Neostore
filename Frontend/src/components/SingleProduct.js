import React, { useEffect, useState } from "react";
import { getsingleproduct, Rate } from "../config/Myservice";
import { useLocation } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import { Rating } from 'react-simple-star-rating';
import { Container, Tabs, Tab } from 'react-bootstrap';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  GooglePlusShareButton,
  TwitterIcon,
} from "react-share";
import "react-multiple-select-dropdown-lite/dist/index.css";
import ReactStars from "react-rating-stars-component";
import Headers from "./Headers";

function SingleProduct(props) {
  let email = sessionStorage.getItem('user')
  const [ratings, setRatings] = useState(0)
  const [postdata, setPostdata] = useState([]);
  const [images, setimages] = useState([]);
  const [mainimage, setmainimage] = useState();
  const [rating, setrating] = useState();
  const [uid, setUid] = useState("");
  const [code,setCode]=useState('');
  const [colname,setColname]=useState('')
  // let location = useLocation();
  const { state } = useLocation();
  const [states, setStates] = useState('')

  const handleRating = (rate) => {
    let newrating =((((rate/20)+rating)/2).toFixed(1))
    let data = { newrating: newrating }

    //setRatings(rate)
    setRatings(rate)
    console.log(rate / 20)
    console.log(data)
    Rate(state.id, data)
      .then(res => {
        if (res.data.err) {
          alert(res.data.err);
        }
        else {
          //alert(res.data.msg);
        }

      })

  }
  const rateProduct = () => {
    window.location.reload()
  }

  useEffect(() => {
    console.log(state.id);
    getsingleproduct(state.id)
      .then((res) => {
        console.log(res.data);
        setrating(res.data.product.product_rating);
        setPostdata(res.data.product);
        setmainimage(res.data.product.product_image);
        setimages(res.data.image);
        document.documentElement.style.setProperty('--background-color', res.data.product.color_id.color_code)
        setCode(res.data.product.color_id.color_code)
        setColname(res.data.product.color_id.color_name)
        console.log(res.data.product.color_id.color_code)
        console.log(res.data.product.color_id.color_name)
       
      });
  }, []);
  console.log(postdata);
  // console.log(location.state.id)

  const addCart = (item, id) => {
    if (localStorage.getItem('mycart') != undefined) {
      let arr = JSON.parse(localStorage.getItem('mycart'));
      console.log(arr)
      if (arr.find(x => x.id == id) != undefined) {
        let ind = arr.findIndex(x => x.id === id);
        arr[ind] = { id: id, quantity: arr[ind].quantity + 1, item: item, email: email };
        localStorage.setItem('mycart', JSON.stringify(arr));
        alert("Product quantity is increased");
      }
      else {
        arr.push({ id: id, quantity: 1, item: item, email: email });
        localStorage.setItem('mycart', JSON.stringify(arr));
        counter()
        alert("Product added to cart hii")
        //window.location.reload()
      }

    }
    else {
      let arr = [];
      arr.push({ id: id, quantity: 1, item: item, email: email });
      localStorage.setItem('mycart', JSON.stringify(arr));
      counter()
      alert("Product added to cart")
      //window.location.reload()

    }
  }
  const counter = () => {
    let arr = JSON.parse(localStorage.getItem('mycart'));
    setStates(arr.length)
    localStorage.setItem('my', JSON.stringify(states))
    console.log(states)
    //console.log()
  }
  return (
    <>
    
      <div>
        <div className="container pt-4">

          <div className="row">
            <div className="container  bg-light p-4 ">
              <div className=" row">
                <div className=" col-md-5">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: mainimage,
                      },
                      largeImage: {
                        src: mainimage,
                        width: 900,
                        height: 900,
                      },
                    }}
                  />

                </div>
                <div className="col-md-6">
                  <div className="card1 pl-4">
                    <h3 className="">{postdata.product_name}</h3>
                    <div className="">

                      <Rating onClick={handleRating} ratingValue={ratings} />

                    </div>
                    <p>{postdata.product_rating}</p>
                    <hr />
                    <br />
                    <h5>
                      Price:

                      <span className="text-danger">
                        {" "}
                        ??? {postdata.product_cost}
                      </span>


                    </h5>
                    <h5>
                    <p>Color :&nbsp;<span className="dynamiccol">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="text-dark">&nbsp;<b>{colname}</b></span></p>

                    </h5>

                    <br />
                    <div className="row">
                      <div className="pt-2 ml-3">
                        <button className="btn btn-danger text-uppercase cc" onClick={() => addCart(postdata, postdata._id)}>Add To Cart</button>

                        <button className="btn btn-info text-uppercase ml-3 cc" onClick={rateProduct}>Rate Product</button>
                      </div>
                      <div className="pt-3 pl-3">
                        <h4>Share</h4>
                        <div className="row">
                        
                          <div className="col-lg-3">
                            <WhatsappShareButton
                              url="https://www.amazon.in/"
                              title={"Checkout " + postdata.product_name}
                              hashtag="#react"
                            >
                              <WhatsappIcon
                                logofillColor="white"
                                round={true}
                              ></WhatsappIcon>
                            </WhatsappShareButton>
                          </div>
                          <div className="col-lg-3">
                            <FacebookShareButton
                              url="https://www.amazon.in/"
                              title={"Checkout " + postdata.product_name}
                              hashtag="#react"
                            >
                              <FacebookIcon
                                logofillColor="white"
                                round={true}
                              ></FacebookIcon>
                            </FacebookShareButton>
                          </div>

                          <div className="col-lg-3">
                            <TwitterShareButton
                              url="https://www.amazon.in/"
                              title={"Checkout " + postdata.product_name}
                              hashtag="#react"
                            >
                              <TwitterIcon
                                logofillColor="white"
                                round={true}
                              ></TwitterIcon>
                            </TwitterShareButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      {images.map((item) => (
                        <button
                          className="btn img-fluid"
                          width="100px"
                          height="400px"
                          onClick={() => setmainimage(item)}
                        >
                          {" "}
                          <img
                            src={item}
                            width="100px"
                            height="100px"
                            className="img-fluid"
                          />
                        </button>
                      ))}
                    </div>


                  </div>
                </div>
                <Container className="pt-3">
                  <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="description" title="Description">
                      <p>{postdata.product_desc}</p>
                    </Tab>
                    <Tab eventKey="features" title="Features" className="pl-5">
                      < p>Bharat Lifestyle brings to you modern and comfortable sofa set for your living room.
Bharat Lifestyle Tulip Cream Brown Soft Touch Fabric 3+1+1 Sofa Set is made of Acacia wood.
 It has an elegant design which enhances the interior decor of your living room. 
 Designed in such a way, the sofa is comfortable to sit.
  The best part it, it comes with good price without compromising on quality. Buy this sofa today! </p>
                      <p>{postdata.product_desc}</p>
                    </Tab>

                  </Tabs>
                </Container>

              </div>
            </div>
            <hr />
          </div>
        </div>
        <br />
        <br />

      </div>
    </>

  );
}

export default SingleProduct