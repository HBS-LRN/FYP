<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; 

class CategoryController extends Controller
{


    public function index()
    {
        $categories = Category::all(); // Replace => with =
        return response()->json($categories);
    }


    public function store(CategoryStoreRequest $request)
    {
        try {
            $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
      
            // Create Product
            Category::create([
                'name' => $request->name,
                'image' => $imageName,

            ]);
      
            // Save Image in Storage folder
            Storage::disk('react/assets/img/icon')->put($imageName, file_get_contents($request->image));

            // Return Json Response
            return response()->json([
                'message' => "Categroy successfully created."
            ],200);
        } catch (\Exception $e) {
            \Log::error('Category creation/update failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went really wrong!',
            ], 500);
        }

    }

    public function update(Request $request, $id)
    {
        try {
            // Find product
            $category = Category::find($id);
            if(!$category){
              return response()->json([
                'message'=>'Category Not Found.'
              ],404);
            }
      
            //echo "request : $request->image";
            $category->name = $request->name;
        
      
            if($request->image) {
 
                // Public storage
                $storage = Storage::disk('react\assets\img\icon');
      
                // Old iamge delete
                if($storage->exists($product->image))
                    $storage->delete($product->image);
      
                // Image name
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $product->image = $imageName;
      
                // Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }
      
            // Update Product
            $product->save();
      
            // Return Json Response
            return response()->json([
                'message' => "Product successfully updated."
            ],200);
        } catch (\Exception $e) {
            // Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
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
