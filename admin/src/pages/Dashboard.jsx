import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getDashboard();
                setDashboard(response.data.data ?? response.data);
            } catch (error) {
                console.error("Dashboard loading failed:", error);
                setError("Dashboard loading failed!");
            } finally {
                setLoading(false);
            }

        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <p className="p-6 text-gray-600">Dashboard loading ...</p>
        );
    }
    if (error) {
        return (
            <p className="m-6 rounded-lg bg-red-50 p-4 text-red-600">{error}</p>
        );
    }

    const stats = [
        {
            title: "Total Products",
            value: dashboard.total_products,
            color: "border-blue-50",
        },
        {
            title: "Total Categories",
            value: dashboard.total_categories,
            color: "border-purple-500",
        },
        {
            title: "Total Active Products",
            value: dashboard.active_products,
            color: "border-green-500",
        },
        {
            title: "Low Stock Products",
            value: dashboard.low_stock_products,
            color: "border-orange-500"
        }
    ]

    return (
        <div className="space-y-6">

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">Welcome to your e-commerce admin panel.</p>
            </div>

            <div className="flex flex-wrap gap-3">
                <button onClick={() => window.location.href = '/products/create'} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">+ Add Product</button>
                <button onClick={() => window.location.href = '/products'} className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Manage Product</button>
                <button onClick={() => window.location.href = '/categories'} className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Manage Category</button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.title} className={`rounded-xl bg-white p-6 shadow-sm border ${stat.color}`}>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h2 className="mt-2 text-3xl font-bold text-gray-800">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Recent Products
                    </h2>
                </div>
                <div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-5 py-3">Product</th>
                                <th className="px-5 py-3">Image</th>
                                <th className="px-5 py-3">Category</th>
                                <th className="px-5 py-3">Price</th>
                                <th className="px-5 py-3">Stock</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {dashboard.recent_products?.length > 0 ? (
                                dashboard.recent_products.map((product) => (
                                    <tr className="hover:bg-gray-50">
                                        <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-800">{product.name}</td>
                                        <td className="px-5 py-0">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg border-gray-200 object-cover" />
                                            ) : (
                                                <span className="text-sm text-gray-400">No Image</span>
                                            )}

                                        </td>
                                        <td className="px-5 py-4 text-gray-600">{product.category?.name}</td>
                                        <td className="whitespace-nowrap px-5 py-4 text-gray-700">
                                            ৳{Number(product.price).toLocaleString()}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            <span className={`rounded-full px-2.5 py-1 font-semibold ${Number(product.stock <= 5) ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`}>{product.stock}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-medium 
                                                ${Number(product.status) === 1 ?
                                                    "bg-green-100 text-green-700" :
                                                    "bg-red-100 text-red-600"}`}>
                                                {Number(product.status) === 1
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <button onClick={() => navigate(`/products/${product.id}/edit`)} className="rounded-lg bg-blue-50 px-3 py-1 text-sm, font-semibold text-blue-700 hover:bg-blue-100">Edit</button>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-5 py-8 text-center text-gray-500">No Products found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Low Stock Product */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">Low Stock Products</h2>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        {dashboard.low_stock_products} Products
                    </span>
                </div>
                <div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-5 py-3">Product</th>
                                <th className="px-5 py-3">Category</th>
                                <th className="px-5 py-3">Stock Left</th>
                            </tr>
                        </thead>
                        <tbody className="divided-y divide-gray-100">
                            {dashboard.low_stock_list.length > 0 ? (
                                dashboard.low_stock_list.map((product) => (

                                    <tr key={product.id} className="hover:bg-orange-50">
                                        <td className="px-5 py-4 font-medium text-gray-800">{product.name}</td>
                                        <td className="px-5 py-4 font-medium text-gray-600">{product.category?.name}</td>
                                        <td className="px-5 py-4 ">
                                            <span className="rounded-full bg-orange-100 px-2.5 py-1 font-semibold text-orange-700">
                                                {product.stock}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-5 py-8 text-center text-gray-500">
                                        No Low Stock Products.Great Jobs!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;