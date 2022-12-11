import React from 'react'
import { useRouter } from 'next/router';
import Order from '../models/Order';
import mongoose from 'mongoose'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MyOrder = ({order, clearCart}) => {
  const products = order.products;
  const router = useRouter()
  const [date, setDate] = useState()
  useEffect(() => {
    const d = new Date(order.createdAt)
    setDate(d)
    if(router.query.clearCart == 1){
      clearCart()
    }
  }, [])
  
  
 
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">MENSCLOSET.COM</h2>
            <h1 className="text-gray-900 text-xl  md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
            <p className="leading-relaxed mb-4">Yayy! Your order has been successfully placed! </p>
            <p className="leading-relaxed mb-4">Order placed on: { date && date.toLocaleDateString("en-IN",{ weekday:'long', year:'numeric', month:'long', day:'numeric'})} </p>
            <p className="leading-relaxed mb-4">Your Payment Status is: <span className='font-semibold text-slate-700'>{order.status}</span>! </p>
            <div className="flex mb-4">
              <a className="flex-grow  text-center py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Total</a>
            </div>



            {Object.keys(products).map(( key)=>{
              return <div key={key} className="flex border-t border-gray-200 py-2">
              <span className=" container w-110 text-gray-500 text-start ">{products[key].name}({products[key].size}/{products[key].variant})</span>
              <span className="m-auto container w-90   text-center  text-gray-900">{products[key].qty}</span>
              <span className="m-auto container w-110 text-center   text-gray-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</span>
            </div>
            })}
 

           
            <div className="flex flex-col my-8">
              <span className="title-font font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount}</span>
              <div className='my-6'>
                <button className="flex mx-0 text-white bg-violet-500 border-0 py-2 px-6 focus:outline-none hover:bg-violet-600 rounded">Track Order</button>
              </div>
            </div>
          </div>
          {/* <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/orders.webp"  /> */}
          <Image className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={'/orders.webp'} width={400} height={400} />
        </div>
      </div>
    </section>
  )  
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);
 
 

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      
    }, // will be passed to the page component as props
  };
}

export default MyOrder