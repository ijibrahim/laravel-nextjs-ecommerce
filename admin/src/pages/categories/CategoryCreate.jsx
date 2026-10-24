import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../api/categoryApi";

function CategoryCreate() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            await createCategory(formData);
            alert("Category Create successfully!");
            navigate("/categories");
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
            <h1 className="text-2xl font-bold text-gray-800">Create Product</h1>
            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
                        <input value={formData.name} onChange={handleChange} type="text" name="name" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" placeholder="Enter Category Name" />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
                        )}
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Slug</label>
                        <input value={formData.slug} onChange={handleChange} type="text" name="slug" className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" placeholder="Enter your slug" />
                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-600">{errors.slug[0]}</p>
                        )}
                    </div>
                </div>
                <div className="mt-3 flex gap-3">
                    <button disabled={loading} type="submit" className="rounded-lg bg-blue-700 px-4 py-2 text-white text-sm font-medium hover:bg-blue-800">
                        {loading ? "Creating..." : "Create Category"}
                    </button>
                    <button onClick={() => navigate("/categories")} type="button" className="rounded-lg bg-gray-400 px-4 py-2 text-white text-sm font-medium hover:bg-gray-500">Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default CategoryCreate;