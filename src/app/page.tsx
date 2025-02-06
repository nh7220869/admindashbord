"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Product {
  id?: number | null;
  img: string;
  title: string;
  title2: string;
  price: string;
  description: string;
  color: string[];
  producttype: string;
  type: string;
}

export default function AdminProductPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productData, setProductData] = useState<Product>({
    img: "",
    title: "",
    title2: "",
    price: "",
    description: "",
    color: [],
    producttype: "",
    type: "",
  });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in");
    }
  }, [userId, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://677ff2a50476123f76a8dd73.mockapi.io/product");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  const handleEdit = (product: Product) => {
    if (product.id !== undefined && product.id !== null) {
      setProductData(product);
      setEditingProductId(product.id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://677ff2a50476123f76a8dd73.mockapi.io/product/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (productData.color.includes(color)) return;
    setProductData({
      ...productData,
      color: [...productData.color, color],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (editingProductId) {
        await fetch(`https://677ff2a50476123f76a8dd73.mockapi.io/product/${editingProductId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
        alert("Product updated!");
      } else {
        await fetch("https://677ff2a50476123f76a8dd73.mockapi.io/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
        alert("Product added!");
      }
  
      setProductData({
        img: "",
        title: "",
        title2: "",
        price: "",
        description: "",
        color: [],
        producttype: "",
        type: "",
      });
      setEditingProductId(null);
  
      const res = await fetch("https://677ff2a50476123f76a8dd73.mockapi.io/product");
      const data = await res.json();
      setProducts(data);
  
    } catch (err: unknown) {
      console.error(err);
      alert("Failed to save product.");
    }
  };

  if (!userId) return <div className="text-center text-white p-6">Redirecting...</div>;
  if (loading) return <div className="text-center text-white p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {editingProductId ? "Edit Product" : "Add Product"}
      </h1>

      {editingProductId !== null && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 max-w-4xl mx-auto">
          <div>
            <label htmlFor="title" className="block text-sm">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="title2" className="block text-sm">Title 2</label>
            <input
              type="text"
              id="title2"
              name="title2"
              value={productData.title2}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm">Description</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm">Colors</label>
            <input
              type="text"
              placeholder="Add color"
              onBlur={handleColorChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
            <div className="mt-2 flex space-x-2">
              {productData.color.map((clr, index) => (
                <span key={index} className="bg-gray-700 p-1 rounded-md">{clr}</span>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="producttype" className="block text-sm">Product Type</label>
            <input
              type="text"
              id="producttype"
              name="producttype"
              value={productData.producttype}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={productData.type}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Colors</th>
              <th className="py-3 px-6 text-left">Category & Type</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-700">
                <td className="py-3 px-6">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-6">{product.title}</td>
                <td className="py-3 px-6 text-sm">{product.description.slice(0, 80)}...</td>
                <td className="py-3 px-6 text-yellow-400 font-bold">{product.price}</td>
                <td className="py-3 px-6">
                  {product.color.map((clr, index) => (
                    <span key={index} className="text-white ml-1">{clr}</span>
                  ))}
                </td>
                <td className="py-3 px-6 text-sm text-gray-400">
                  {product.producttype} | {product.type}
                </td>
                <td className="py-3 px-6 flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 text-white p-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="bg-red-600 text-white p-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
