import { Link, Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
    const location = useLocation();
    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories" },
        { name: "Orders", path: "/orders" },
        { name: "Customers", path: "/customers" },
    ];
    return (
        <div className="min-h-screen bg-gray-100">
            {/* header */}
            <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                <h1 className="text-xl font-bold text-gray-800">Admin panel</h1>
                <button onClick={() => alert("Logout Clicked")} className="rounded-lg bg-red-600 px-4 py-2  text-sm font-medium text-white hover:bg-red-700">Logout</button>
            </header>

            <div className="flex">
                {/* sidebar */}
                <aside className="w-64 min-h-[calc(100vh-4rem)] bg-gray-900 p-4">
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const active = location.pathname === item.path;

                            return (
                                <Link key={item.path} to={item.path}
                                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;