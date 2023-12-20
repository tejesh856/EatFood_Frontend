import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";
import Model from "../Model";
import Cart from '../screens/Cart';
import { useCart } from './Contextreducer';
export default function Navbar() {
    const [cartview, setcartview] = useState(false);
    let data = useCart();
    const navigate=useNavigate();
    const handlelogout=()=>{

        localStorage.removeItem('authtoken');
        navigate('/login');
    }
    const loadcart=()=>{
        setcartview(true);
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-success" >
                <div className="container-fluid">
                    <div className="navbar-brand fs-1 fst-italic text-light" style={{ "cursor": "default" }}>EatFoods</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active text-light fs-6" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem('authtoken')) ? <li className="nav-item">
                                <Link className="nav-link active text-light fs-6" aria-current="page" to="/myorder">My Order</Link>
                            </li> : ''}

                        </ul>
                        {(!localStorage.getItem('authtoken')) ? <div className='d-flex'>
                            <Link className="nav-link bg-white text-success mx-1 px-3 py-1 rounded" to="/login">Login</Link>
                            <Link className="nav-link bg-white text-success mx-1 px-3 py-1 rounded" to="/createuser">Sign Up</Link>
                        </div> : <div>
                        <div className='btn bg-white text-success mx-2'onClick={loadcart}>
                            My Cart {' '}
                            <Badge pill bg='danger'>{data.length}</Badge>
                        </div>
                        {cartview ? <Model onClose={() => setcartview(false)}><Cart/></Model> : null}
                        <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                            Logout
                        </div>
                        </div> }
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}
