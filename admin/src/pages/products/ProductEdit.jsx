import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        status: true,
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, categoryResponse] =
                    await Promise.all([
                        getProduct(id),
                        getCategories(),
                    ]);
                const product =
                    productResponse.data.data ?? productResponse.data;
                const categoryData =
                    categoryResponse.data.data ?? categoryResponse.data;

                setCategories(categoryData);
                setFormData({
                    name: product.name ?? "",
                    slug: product.slug ?? "",
                    description: product.description ?? "",
                    price: product.price ?? "",
                    stock: product.stock ?? "",
                    status: Number(product.status) === 1,
                    category_id: String(product.category_id ?? product.category?.id ?? ""),
                });
                setPreview(product.image || "");
            } catch (error) {
                console.error("failed to load product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // update api next step

        setErrors({});
        setSaving(true);

        try {
            const data = new FormData();

            data.append("name", formData.name);
            data.append("slug", formData.slug);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("category_id", formData.category_id);
            data.append("status", formData.status ? "1" : "0");

            if (image) {
                data.append("image", image);
            }
            console.log("Status before submit:", formData.status);
            await updateProduct(id, data);
            console.log("Status sent:", formData.status ? "1" : "0");
            alert("Product Update Successfully");
            navigate("/products");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors ?? {});
                alert("Failed to update product.");
            }
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p className="p-6 text-gray-600">loading product ...</p>
    }

    return (
        <div>
            <h1 className="">Edit Product #{id}</h1>
            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.price[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category_id"
                            value={String(formData.category_id)}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={String(category.id)}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.category_id[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status ? "1" : "0"}
                            onChange={(e) =>
                                setFormData((previous) => ({
                                    ...previous,
                                    status: e.target.value === "1",
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        />
                    </div>
                    <div>
                        <label>Product Image</label>
                        {preview && (
                            <img src={preview} alt="Product Preview" className="mb-3 h-32 w-32 rounded-lg object-cover" />
                        )}
                        <input
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                            type="file" accept=".jpg, .jpeg, .png, .webp"
                            className="block w-full text-sm border p-2 rounded-lg border-gray-300"
                        />
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? "Updating..." : "Update Product"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="rounded-lg bg-gray-200 px-5 py-2 text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )

}
export default ProductEdit;