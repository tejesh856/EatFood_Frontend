import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
    const [credentials, setcredentials] = useState({ name: '', password: '', email: '', geolocation: '' });
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://eatfood-api.onrender.com/api/createuser',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email, location: credentials.geolocation })
            }

        )
        const json = await response.json()
        //console.log(json)

        if (!json.success) {
            alert('enter valid credentials');
        }
        else {
            alert('user created');
            navigate('/login');
        }

    }
    const handleChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
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
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container p-5'>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id="email" className="form-control" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" name='password' value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="geolocation" className="form-label">Address</label>
                        <input type="text" id="geolocation" className="form-control" name='geolocation' value={credentials.geolocation} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className="btn btn-danger m-3">Already a User</Link>
                </form>
            </div>
        </div>
    )
}
