<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\City;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class CityController extends Controller
{
    public function show(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                return City::with('division')->get();
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }
    

    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|min:3|max:120',
            'division_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        try {
            if(Gate::allows('admin-auth',Auth::user())) {
                $city = new City;
                $city->name = $req->name;
                $city->division_id = $req->division_id;
                $city->remark = $req->remark;
                if($city->save()){
                    return response()->json(['status'=>true,'message'=>"City created successfully."]);
                }
                
                return response()->json(['status'=>true,'message'=>"City can't created!"]);
                
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
            'division_id' => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        
        try {
            if(Gate::allows('admin-auth',Auth::user())) {
                $city = City::find($req->id);
                $city->name = $req->name;
                $city->division_id = $req->division_id;
                $city->remark = $req->remark;
                if($city->update()){
                    return response()->json(['status'=>true,'message'=>"City updated successfully."]);
                }
                
                return response()->json(['status'=>true,'message'=>"City can't updated!"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
    }

    public function delete(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $city = City::find($req->id);
                if($city->delete())
                {
                    return response()->json(['status'=>true,'message'=>"City Deleted!"]);
                }
                
                return response()->json(['status'=>true,'message'=>"City can't delete!, Try Again"]);
        
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }

    public function trashshow()
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $cities = City::onlyTrashed()->get();
                return response()->json(['status'=>true,'cities'=>$cities]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
    }

    public function restore(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $city = City::withTrashed()->find($req->id);
                if($city->restore()){
                    return response()->json(['status'=>true,'message'=>"City restored."]);
                }
                
                return response()->json(['status'=>true,'message'=>"City can't restore!"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }

    public function restoreAll(Request $req)
    {
        try {
            if(Gate::allows('admin-auth',Auth::user())){
                $cities = City::onlyTrashed();
                if($cities->restore()){
                    return response()->json(['status'=>true,'message'=>"All Cities restored."]);
                }
                
                return response()->json(['status'=>false,'message'=>"Cities can't restore!"]);
                
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message'=>"Something is wrong!"]);
        }
        
    }
}
