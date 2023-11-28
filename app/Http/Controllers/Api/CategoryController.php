<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; 
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{


    public function index()
    {
        $categories = Category::all(); 
        return response()->json($categories);
    }

    public function store(CategoryStoreRequest $request)
    {
        try {

            $data = $request->validated();
            if ($request->hasFile('iconImage')) {
                $data['iconImage'] = $request->file('iconImage')->store('images', 'public');
               
            }
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('images', 'public');
               
            }
            Category::create($data);     

            // Return Json Response
            return response()->json([
                'message' => "Category successfully created."
            ], 200);
        } catch (\Exception $e) {
           
            return response()->json([
                'message' => 'Something went really wrong!',
            ], 500);
        }
    }
    
    public function show($id)
    {
        $category = Category::find($id);
        
        if (!$category) {
            return response()->json([
                'message' => 'Category not found.'
            ], 404);
        }

        return response()->json($category);
    }

    public function update(CategoryStoreRequest $request)
    {

        try {

            $data=$request->validated();
            
            // Find category
            $category = Category::find($request->id);
    
            if (!$category) {
                return response()->json([
                    'message' => 'Category Not Found.'
                ], 404);
            }

            $category->name = $request->input('name');
        
            // Check if a new image is provided
            if ($request->hasFile('image')) {
                // Store the new image
                $newImage = $request->file('image')->store('images', 'public');
    
                // Log the file details (you can check your Laravel logs for this)
                \Log::info('New Image Details:', ['file' => $newImage]);
    
                // Delete the old image if it exists
                Storage::disk('public')->delete($category->image);
    
                // Assign the new image path to the category
                $category->image = $newImage;
            }
    
            if ($request->hasFile('iconImage')) {
                // Store the new icon image
                $newIconImage = $request->file('iconImage')->store('images', 'public');
    
                // Log the file details (you can check your Laravel logs for this)
                \Log::info('New Icon Image Details:', ['file' => $newIconImage]);
    
                // Delete the old icon image if it exists
                Storage::disk('public')->delete($category->iconImage);
    
                // Assign the new icon image path to the category
                $category->iconImage = $newIconImage;
            }
    
            // Save the changes
            $category->save();
    
            // Return Json Response
            return response()->json([
                'message' => $category
            ], 200);
        } catch (\Exception $e) {
            
            // Return Json Response
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        // Delete an ingredient
        $category = Category::find($id);
        if ($category) {
            $category->delete();
        }
        return response()->json($category);
    } 

}
