import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory, updateCategory } from "../../api/categoryApi";



export default function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    });
    console.log(formData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await getCategory(id);
                // setLoading(true);
                const categoryData = categoryResponse.data.data ? categoryResponse.data.data : {};

                console.log(categoryResponse.data.data);

                setFormData({
                    name: categoryData.name ?? "",
                    slug: categoryData.slug ?? "",
                })

            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSaving(true);

        try {
            await updateCategory(id, formData);
            alert("Category Update Successfully!");
            navigate("/categories");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors ?? "");
                alert("Failed to update category");
            } else {
                alert('Failed to update category. Please try again.');
            };
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="p-6 text-gray-600">Loading Category...</p>;
    }


    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Category Edit</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-gray-800 font-medium text-sm">Name</label>
                        <input value={formData.name} onChange={handleChange} type="text" name="name" className="bg-white border rounded-lg border-gray-300 px-4 py-2 w-full focus:border-blue-500 focus:outline-none" />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-800 font-medium text-sm">Slug</label>
                        <input value={formData.slug} onChange={handleChange} type="text" name="slug" className="bg-white border rounded-lg border-gray-300 px-4 py-2 w-full focus:border-blue-500 focus:outline-none" />
                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.slug[0]}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-3 flex gap-3">
                    <button disabled={saving} type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white">
                        {saving ? 'Updating...' : 'Edit Category'}
                    </button>
                    <button onClick={() => navigate("/categories")} type="button" className="bg-gray-400 hover:bg-gray-500 px-6 py-2 rounded-lg text-white">Cancel</button>
                </div>
            </form>
        </div>
    )
}