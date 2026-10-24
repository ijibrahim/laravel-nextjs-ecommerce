import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productApi";
import { useEffect } from "react";
import { getCategories } from "../../api/categoryApi";

function ProductCreate() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data.data || response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        status: true,
        category_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked!");
        setErrors({});
        setLoading(true);

        try {
            console.log("Form data:", formData);
            console.log("Selected image:", image);
            const data = new FormData();
            data.append("name", formData.name);
            data.append("slug", formData.slug);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("status", formData.status ? "1" : "0");
            data.append("category_id", formData.category_id);

            if (image) {
                console.log("Sending API request...");
                data.append("image", image);
            }
            console.log("After image check");
            await createProduct(data);

            alert("Product created Successfully!");
            navigate("/products");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
                        )}
                    </div>
                    {/* slug */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-600">{errors.slug[0]}</p>
                        )}
                    </div>
                    {/* price */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
                        {(errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price[0]}</p>
                        ))}
                    </div>
                    {/* Stock */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Stock
                        </label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
                        {(errors.stock && (
                            <p className="mt-1 text-sm text-red-600">{errors.stock[0]}</p>
                        ))}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Select Category
                        </label>
                        <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {(errors.category_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.category_id[0]}</p>
                        ))}
                    </div>
                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2"></textarea>

                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setImage(file);
                                    setPreview(URL.createObjectURL(file));
                                } else {
                                    setImage(null);
                                    setPreview("");
                                }
                            }}
                            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                            type="file"
                            name="image"
                            className="block w-full rounded-lg border border-gray-300 p-2"
                        />
                        {
                            preview && (
                                <img src={preview} alt="Product Preview" className="mt-3 h-32 w-32 rounded-lg border object-cover" />
                            )
                        }
                    </div>

                </div>
                <div className="mt-6 flex gap-3">
                    <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700">
                        {loading ? 'Creating...' : 'Product Create'}
                    </button>
                    <button type="button" onClick={() => navigate("/products")} className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-600 hover:bg-gray-300">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ProductCreate;