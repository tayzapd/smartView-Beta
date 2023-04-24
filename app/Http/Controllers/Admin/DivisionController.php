<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Division;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class DivisionController extends Controller
{
    public function show(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                return Division::get();
            }
        }
        catch(\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }
    
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|min:3|max:120',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        try {
            if(Gate::allows('admin-auth',Auth::user())) {
                $division = new Division;
                $division->name = $req->name;
                $division->remark = $req->remark;
                if($division->save()){
                    return response()->json(['status'=>true,'message'=>"Division created successfully."]);
                }
                
                return response()->json(['status'=>true,'message'=>"Division can't created!"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
    }

    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string|min:3|max:120',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        try {
            if(Gate::allows('admin-auth',Auth::user())) {
                $division = Division::find($req->id);
                $division->name = $req->name;
                $division->remark = $req->remark;
                if($division->update()){
                    return response()->json(['status'=>true,'message'=>"Division updated successfully."]);
                }
                
                return response()->json(['status'=>true,'message'=>"Division can't updated!"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
    }
    
    public function delete(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $division = Division::find($req->id);
                if($division->delete())
                {
                    return response()->json(['status'=>true,'message'=>"Division Deleted!"]);
                }
                return response()->json(['status'=>true,'message'=>"Division can't delete!, Try Again"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        

    }
    public function restore(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $division = Division::withTrashed()->find($req->id);
                if($division->restore()){
                    return response()->json(['status'=>true,'message'=>"Division restored."]);
                }
                
                return response()->json(['status'=>true,'message'=>"Division can't restore!"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }

    public function trashshow()
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $divisions = Division::onlyTrashed()->get();
                return response()->json(['status'=>true,'divisions'=>$divisions]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
    }

    public function restoreAll(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $divisions =Division::onlyTrashed();
                if($divisions->restore()){
                    return response()->json(['status'=>true,'message'=>"All Divisions restored."]);
                }
                
                return response()->json(['status'=>false,'message'=>"Divisions can't restore!"]);
                
            }
        }
        catch(\Throwable $th){
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }
}
