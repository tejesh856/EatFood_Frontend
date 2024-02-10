import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Body from '../components/Body'
export default function Home() {
    const [search, setsearch] = useState('')
    const [foodcat, setfoodcat] = useState([]);
    const [fooditems, setfooditems] = useState([])
    const loaddata = async () => {
        const response = await fetch('https://eat-food-backend.vercel.app/api/fooddata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        //console.log(json)
        setfooditems(json[0])
        setfoodcat(json[1])
    }
    useEffect(() => {
        loaddata();
    }, [])
    const filterStyles = {
        filter: 'invert(0) grayscale(50)',
    };
    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control bg-dark text-light border-1 border-secondary me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                                {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" style={filterStyles}></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" style={filterStyles}></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodcat != []
                        ? foodcat.map((data) => {
                            return (
                                <div>
                                    <div key={data._id} className='mt-3'>{data.CategoryName}</div>
                                    <hr />
                                    <div className='container d-flex flex-wrap'>
                                        {fooditems != [] ? fooditems.filter((item) =>(item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filteritems => {
                                                return (
                                                    <div key={filteritems._id} >
                                                        <Body fooditems={filteritems}
                                                            options={filteritems.options[0]}
                                                             />
                                                    </div>
                                                )
                                            }) : <div>No such Data Found</div>}
                                    </div>

                                </div>
                            )
                        }) : <div>*************</div>

                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
