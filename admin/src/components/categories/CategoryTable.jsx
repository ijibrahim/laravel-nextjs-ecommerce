import Header from "../../Header";

function CategoryTable({ categories, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-700">
                    <tr>
                        <th className="px-6 py-4 font-semibold">ID</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Slug</th>
                        <th className="px-6 py-4 font-semibold">Created At</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{category.id}</td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{category.name}</td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{category.slug}</td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{category.created_at}</td>
                            <td className="px-6 py-2">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => onEdit(category.id)} className="font-medium text-blue-600 hover:text-blue-800">Edit</button>
                                    <button onClick={() => onDelete(category.id)} className="font-medium text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Header />
        </div>
    )
}

export default CategoryTable;