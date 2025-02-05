"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Order {
  id: number;
  orderId: string;
  product: string;
  price: string;
  status: string;
}

export default function FakeAdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fakeOrders: Order[] = [
      { id: 1, product: "Nike Air Max Pulse", price: "₹13,995", status: "Shipped", orderId: "" },
      { id: 2, product: "Nike Air Max 97 SE", price: "₹13,995", status: "Pending", orderId: "" },
      { id: 3, product: "Nike Therma", price: "₹13,995", status: "Delivered", orderId: "" },
      { id: 4, product: "Nike Sportswear", price: "₹13,995", status: "Cancelled", orderId: "" },
      { id: 5, product: "Nike Zenvy (M)", price: "₹13,500", status: "Shipped", orderId: "" },
      { id: 6, product: "Nike Court Vision Low", price: "₹5,695", status: "Delivered", orderId: "" },
      { id: 7, product: "Nike Dunk Low Retro SE", price: "₹9,695", status: "Delivered", orderId: "" },
      { id: 8, product: "Nike Alate All U", price: "₹2,195", status: "Cancelled", orderId: "" },
      { id: 9, product: "Nike Elite All-Court 8P", price: "₹595", status: "Shipped", orderId: "" },
      { id: 10, product: "Adidas Essentials 3-Stripes", price: "₹2,299", status: "Pending", orderId: "" },
      { id: 11, product: "The North Face Denali Hoodie", price: "₹7,999.00", status: "Delivered", orderId: "" },
      { id: 12, product: "Adidas Essentials 3-Stripes", price: "₹2,299", status: "Shipped", orderId: "" },
      { id: 13, product: "Calvin Klein Logo Hoodie", price: " ₹ 6,499.00", status: "Pending", orderId: "" },
    ];

    // Assign order IDs
    const updatedOrders = fakeOrders.map((order, index) => ({
      ...order,
      orderId: `ORD-${1001 + index}`,
    }));

    const statusOrder = {
      Delivered: 1,
      Shipped: 2,
      Pending: 3,
      Cancelled: 4,
    } as const;
    
    updatedOrders.sort(
      (a, b) =>
        (statusOrder[a.status as keyof typeof statusOrder] || 5) -
        (statusOrder[b.status as keyof typeof statusOrder] || 5)
    );

    setOrders(updatedOrders);
  }, []);

  const statusCounts = orders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = {
    labels: ["Delivered", "Shipped", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Orders by Status",
        data: [
          statusCounts["Delivered"] || 0,
          statusCounts["Shipped"] || 0,
          statusCounts["Pending"] || 0,
          statusCounts["Cancelled"] || 0,
        ],
        backgroundColor: ["#22c55e", "#3b82f6", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Orders Details</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="min-w-full bg-gray-700 text-white border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-600">
                  <td className="py-3 px-6">{order.orderId}</td>
                  <td className="py-3 px-6">{order.product}</td>
                  <td className="py-3 px-6 text-yellow-400 font-bold">{order.price}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-400"
                        : order.status === "Shipped"
                        ? "text-blue-400"
                        : order.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-3 px-6">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Order Status Overview</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}
