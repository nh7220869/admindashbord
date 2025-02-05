'use client';
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  img: string;
  title: string;
  title2: string;
  price: string;
  description: string;
  color: string;
  producttype: string;
  type: string;
}

export default function AddProductForm() {
  const [formData, setFormData] = useState<FormData>({
    img: "",
    title: "",
    title2: "",
    price: "",
    description: "",
    color: "",
    producttype: "",
    type: "",
  });

  const [id, setId] = useState<number>(0); // Store product ID as a number

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      color: formData.color.split(",").map((clr) => clr.trim()),
    };

    try {
      const res = await fetch("https://677ff2a50476123f76a8dd73.mockapi.io/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Product added:", data);
        setId(data.id); // Save the product ID to state

        setFormData({
          img: "",
          title: "",
          title2: "",
          price: "",
          description: "",
          color: "",
          producttype: "",
          type: "",
        });
      } else {
        throw new Error("Failed to add product");
      }
    } catch (err: unknown) {
      // Type assertion is used here to tell TypeScript that we know `err` is an `Error`
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Add Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Product Image URL</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Subtitle</label>
          <input
            type="text"
            name="title2"
            value={formData.title2}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter subtitle"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Colors (comma separated)</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter colors (e.g. Black, White)"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Category</label>
          <input
            type="text"
            name="producttype"
            value={formData.producttype}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter product category"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-white">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="Enter product type"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 font-semibold p-2 rounded-md"
        >
          Add Product
        </button>
      </form>

      {id !== 0 && ( // Display the product ID if available
        <div className="mt-4 p-3 bg-green-500 text-white rounded-md text-center">
          <strong>Product Added Successfully!</strong> <br />
          Product ID: <span className="font-bold">{id}</span>
        </div>
      )}
    </div>
  );
}
