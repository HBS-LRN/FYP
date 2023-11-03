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
            
            // // Generate a unique image name
            // $iconImageName = Str::random(32) . "." . $request->iconImage->getClientOriginalExtension();
            // $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
            // // Specify the absolute path

            // $absolutePath = public_path('../react/assets/img/icon');
            
            // // Ensure the directory exists
            // if (!File::exists($absolutePath)) {
            //     File::makeDirectory($absolutePath, 0755, true);
            // }

            // Create Product

            $data = $request->validated();
            if ($request->hasFile('iconImage')) {
                $data['iconImage'] = $request->file('iconImage')->store('images', 'public');
               
            }
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('images', 'public');
               
            }
            Category::create($data);

            // // Specify the relative path
            // $relativePathIcon = '../react/assets/img/icon/' . $iconImageName;
            // $relativePath = '../react/assets/img/icon/' . $imageName;

            // // Save Image using file_put_contents
            // file_put_contents($relativePathIcon, file_get_contents($request->iconImage));
            // file_put_contents($relativePath, file_get_contents($request->imageName));
            
          
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
                $storage = Storage::disk('../react/assets/img/icon/');
      
                // Old image delete
                if($storage->exists($category->image))
                    $storage->delete($category->image);
                
                // Generate a unique image name
                $imageName = Str::random(32) . "." . $request->image->getClientOriginalExtension();
                
                // Specify the absolute path
                $absolutePath = public_path('../react/assets/img/icon');
                
                // Ensure the directory exists
                if (!File::exists($absolutePath)) {
                    File::makeDirectory($absolutePath, 0755, true);
                }

                $relativePath = '../react/assets/img/icon/' . $imageName;

                // Save Image using file_put_contents
                file_put_contents($relativePath, file_get_contents($request->image));
            }
      
            
            $category->save();
      
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
