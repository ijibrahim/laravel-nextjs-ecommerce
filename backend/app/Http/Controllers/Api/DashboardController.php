<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $latest = Product::with('category')->latest()->take(5)->get();
        return response()->json([
            'success' => true,
            'data' => [
                'total_products' => Product::count(),
                'total_categories' => Category::count(),
                'active_products' => Product::where('status', 1)->count(),
                'low_stock_products' => Product::where('stock', '<=', 5)->count(),
                'recent_products' => ProductResource::collection($latest),
                'low_stock_list' => Product::with('category:name,id')->where('stock', '<=', 5)->orderBy('stock', 'asc')->take(10)->get(),
            ],
        ]);
    }
}
