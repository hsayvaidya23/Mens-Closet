import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`http://localhost:3000/api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem("myuser")).token }),
      });
      let res = await a.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    } else {
      fetchOrders(); 
    }
  }, []);
  return (
    <div className="min-h-screen">
    <Head>
        <title>Orders - MensCloset.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h1 className="text-2xl font-semibold text-center p-8">My Orders</h1>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #Order Id 
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => {
                      return <tr
                        key={item._id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.orderId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {item.amount}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link href={'/order?id=' + item._id}><a> Details</a></Link>
                        </td>
                      </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }

//   return {
//     props: {
//       orders: orders,
//     }, // will be passed to the page component as props
//   };
// }

export default Orders;
