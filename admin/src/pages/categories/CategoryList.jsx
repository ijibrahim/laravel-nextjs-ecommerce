import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../api/categoryApi";
import CategoryTable from "../../components/categories/CategoryTable";
import { useNavigate } from "react-router-dom";
import Header from "../../Header";

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data.data || []);
        }
        catch (error) {
            console.error(error);
            setError("Failed to load categories.");
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete category?");
        if (!confirmed) return

        try {
            await deleteCategory(id);
            alert('Category delete Successfully');
            await loadCategories();
        } catch (error) {
            console.error("Failed to delete category", error);
            alert("Failed to delete!")
        }
    };

    if (loading) {
        return <h2>loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-2xl font-bold text-gray-800">Category List</h1>
                <button onClick={() => navigate("/categories/create")} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">Create Category</button>
            </div>
            <CategoryTable
                categories={categories}
                onEdit={(id) => navigate(`/categories/${id}/edit`)}
                onDelete={(id) => handleDelete(id)}
            />
            <Header />
        </div>
    )
}

export default CategoryList;