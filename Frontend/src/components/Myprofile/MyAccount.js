import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md';
import { MAIN_URL} from  '../../config/Url';

import { getProfile, } from '../../config/Myservice';
import axios from 'axios';
import '../../App.css';
import Headers from '../Headers';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);


export default function MyAccount() {

    let [user, setUser] = useState([]);
    let [email, setEmail] = useState('');
 
    const navigate = useNavigate();
   
    useEffect(() => {
        getProfile(sessionStorage.getItem('user'))
            .then(res => {
              
                    console.log(res.data.user);
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);      
                
            })
    }, [])
   


    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', document.getElementById('files').files[0]);
        formData.append('email', email)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:8899/api/neostore/upload", formData, config)
            .then((res) => {
                console.log(res.data)
                alert("The file is successfully uploaded");
                
            })
            window.location.reload()
    }

   
    return (
        <>
        
        <div >
            {/* <h3>My Account</h3>
            <hr /> */}
            <div >
                <div >
                    <div>
                        <div style={{textAlign:'center' }} >
                            <img src={`/images/${user.imagePath}`} height="140px" width="140px"  className="pic"/>
                            <h4 className="text-danger mt-1">{user.name}</h4>
                            <form onSubmit={onFormSubmit}>

                                <input type="file" id="files" name="myImage" className="ml-5 pl-5 mb-2" /><br/>

                                <button className="upload-button" type="submit" className="mb-2 btn btn-warning">Upload</button>
                            </form>
                        </div>
                    </div>
                    <div >
                        <a className='btn w-100' href="/order"><HiOutlineMenuAlt2 style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Order</a>
                        <a className='btn w-100' href="/profile"><MdAccountBox style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Profile</a>
                        <a className='btn w-100' href="/address"><MdLibraryBooks style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Address</a>
                        <a className='btn w-100' href="/changepassword"><BsArrowLeftRight style={{ margin: '0 4 4 0', fontSize: 'larger' }} />Change Password</a>
                    </div>
                </div>
                <div style={{ width: '70%' }}>
                    <Outlet />
                </div>
            </div>
        </div>
        </>
    )
}

