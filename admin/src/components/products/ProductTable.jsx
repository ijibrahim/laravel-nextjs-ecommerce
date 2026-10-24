function ProductTable({ products, onEdit, onDelete, onView, pagination, page, setPage }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold">ID</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Name</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Image</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Category</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Price</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Stock</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                        <th scope="col" className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{product.id}</td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{product.name}</td>
                            <td className="items-center gap-3 px-4 py-2 font-medium text-gray-900">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />
                                ) : (
                                    <span className="text-sm text-gray-400">
                                        No image
                                    </span>
                                )}
                            </td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{product.category?.name}</td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{product.price}</td>
                            {/* <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{product.stock}</td> */}
                            <td className="px-6 py-2">
                                <span className={`rounded-full px-2.5 py-1 text-sm font-semibold ${Number(product.stock) <= 5 ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`}>
                                    {product.stock}.0

                                </span>
                            </td>
                            <td className="items-center gap-3 px-6 py-2 font-medium text-gray-900">{product.status ? "Active" : "Inactive"}</td>
                            <td className="px-6 py-2">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => onView(product.id)} className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">View</button>
                                    <button onClick={() => onEdit(product.id)} className="font-medium text-blue-600 hover:text-blue-800">Edit</button>
                                    <button onClick={() => onDelete(product.id)} className="font-medium text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between">
                <p>Showing {pagination.from ?? 0} to {pagination.to ?? 0} {" "}of {pagination.total} products</p>
                <div className="flex flex-wrap items-center gap-2">
                    <button disabled={page <= 1} onClick={() => setPage((previous) => previous - 1)} className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                    {Array.from({ length: pagination.last_page }, (_, index) => index + 1).map((pageNumber) => (
                        <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} className={`rounded-lg border px-3 py-2 text-sm ${page === pageNumber ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 hover:bg-gray-100"}`}>{pageNumber}</button>
                    ))}
                    <button disabled={page >= pagination.last_page} onClick={() => setPage((previous) => previous + 1)} className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                </div>
            </div>
        </div>

    )
}

export default ProductTable;