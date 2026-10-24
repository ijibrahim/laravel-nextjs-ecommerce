import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";
import ProductTable from "../../components/products/ProductTable";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/categoryApi";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        from: null,
        to: null,
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data.data || []);
            } catch (error) {
                console.error("Failed to load Categories:", error);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadProducts(search, categoryId, sort, page);
        }, 500);
        return () => clearTimeout(timer);
    }, [search, categoryId, sort, page]);

    const loadProducts = async (
        searchValue = "",
        selectCategory = "",
        sortValue = "latest",
        pageValue = 1,
    ) => {
        setLoading(true);
        setError("");
        try {
            const response = await getProducts({
                search: searchValue,
                category_id: selectCategory,
                sort: sortValue,
                page: pageValue,
            });
            setProducts(response.data.data || []);
            setPagination(response.data.meta || {
                current_page: 1,
                last_page: 1,
                total: 0,
                from: null,
                to: null,
            })
        } catch (error) {
            console.error(error);
            setError("Failed to load products.");
        }
        finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "are you sure you want to delete product?"
        );

        if (!confirmed) return;

        try {
            await deleteProduct(id);
            alert("product delete successfully!")
            await loadProducts();
        } catch (error) {
            console.error("failed to delete product", error);
            alert("Failed to delete product");
        }
    }

    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
    }
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Products
                </h1>

                {/* <div className="mb-6"> */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    placeholder="Search products by name or slug..."
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-65"
                />
                {/* </div> */}
                {/* <div className="mb-6"> */}
                {/* <label className="mb-2 block text-sm font-medium text-gray-700">
                        Filter by Category
                    </label> */}

                <select
                    value={categoryId}
                    onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none md:w-52"
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {/* </div> */}

                <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1) }}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none md:w-42"
                >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name_asc">Name: A to Z</option>
                    <option value="name_desc">Name: Z to A</option>
                </select>
                <button
                    onClick={() => navigate("/products/create")}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700"
                >
                    + Create Product
                </button>
            </div>

            <ProductTable
                products={products}
                onView={(id) => navigate(`/products/${id}`)}
                onEdit={(id) => navigate(`/products/${id}/edit`)}
                onDelete={(id) => handleDelete(id)}
                pagination={pagination}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}

export default ProductList;