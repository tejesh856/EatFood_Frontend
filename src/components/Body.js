import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from "../components/Contextreducer";
export default function Body(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceref = useRef();
    let option = props.options
    let priceoptions = Object.keys(option)
    let fooditem = props.fooditems;
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState('');
    const handleaddtocart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === fooditem._id) {
                food = item;

                break;
            }
        }
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: fooditem._id, price: finalprice, qty: qty })
                return
               
            }
            else if (food.size != size) {
                await dispatch({ type: "ADD", id: fooditem._id, name: fooditem.name, price: finalprice, qty: qty, size: size, img: fooditem.img })
                //console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({ type: 'ADD', id: fooditem._id, name: fooditem.name, price: finalprice, qty: qty, size: size })
        console.log(data)
    }
    let finalprice = qty * parseInt(option[size])
    useEffect(() => {
        setsize(priceref.current.value)
    }, [])
    return (
        <div>
            <div className="card mt-3 m-3 mb-0" style={{ "width": "18rem" }}>
                <img src={fooditem.img} className="card-img-top" alt="..." style={{ "height": "200px", "objectFit": "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{fooditem.name}</h5>
                    <p className="card-text">This is some important text.</p>
                    <div className='container w-100'>
                        <select className="m-2 h-100 bg-success rounded border-0" style={{ "outline": "none" }} onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })

                            }
                        </select>
                        <select className="m-2 h-100 bg-success rounded border-0" ref={priceref} style={{ "outline": "none" }} onChange={(e) => setsize(e.target.value)}>
                            {
                                priceoptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='m-2 h-100 d-inline'>
                            ₹{finalprice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-content-center ms-2' onClick={handleaddtocart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
