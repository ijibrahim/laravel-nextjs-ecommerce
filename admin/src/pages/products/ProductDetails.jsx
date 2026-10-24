import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getProduct } from "../../api/productApi";

export default function () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await getProduct(id);
                console.log(response);
                setProduct(response.data.data ?? response.data);
            } catch (error) {
                console.error("Failed to load product:", error);
                setError("Product Not loaded", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    if (loading) {
        return <p className="p-6">Loading Product...</p>
    }

    if (error || !product) {
        return (
            <div className="p-6">
                <p className="mb-4 text-red-600">
                    {error || "Product পাওয়া যায়নি।"}
                </p>

                <button
                    onClick={() => navigate("/products")}
                    className="rounded bg-gray-700 px-4 py-2 text-white"
                >
                    Back to Products
                </button>
            </div>
        );
    }


    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Product Details</h1>
                <button onClick={() => navigate("/products")} className="rounded bg-gray-600 hover:bg-gray-700 text-white px-4 py-2">Back</button>
            </div>
            <div className="max-w-3xl bg-white rounded-lg p-6 border shadow-sm">
                {/* Product Name */}
                <h2 className="mb-4 text-xl font-semibold">
                    {product.name}
                </h2>

                {/* Product Image: এখানে বসাবে */}
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="mb-6 h-64 w-64 rounded-xl object-cover"
                    />
                ) : (
                    <div className="mb-6 flex h-64 w-64 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                        No image available
                    </div>
                )}
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Product ID</p>
                        <p className="font-medium">{product.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Product Name</p>
                        <p className="font-medium">{product.slug}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Product Slug</p>
                        <p className="font-medium">{product.slug}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium">{product.category?.name ?? "No Category"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">৳{Number(product.price).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="font-medium">{product.stock}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium">{product.status === true ? "Active" : "Inactive"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Details</p>
                        <p className="font-medium">{product.description}</p>
                    </div>
                </div>
                <button onClick={() => navigate(`/products/${id}/edit`)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-6">Edit Product</button>
            </div>
        </div>
    )
}