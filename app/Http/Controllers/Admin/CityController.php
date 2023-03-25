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
        if(Gate::allows('admin-auth',Auth::user())){
            return City::with('division')->get();
        }
        
    }
    

    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'remark' => 'required|string',
            'division_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('admin-auth',Auth::user())) {
            $city = new City;
            $city->name = $req->name;
            $city->division_id = $req->division_id;
            $city->remark = $req->remark;
            if($city->save()){
                return response()->json(['status'=>true,'message'=>"City created successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"City can't created!"]);
            }
        }
    }
    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'remark' => 'required|string',
            'division_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        if(Gate::allows('admin-auth',Auth::user())) {
            $city = City::find($req->id);
            $city->name = $req->name;
            $city->division_id = $req->division_id;
            $city->remark = $req->remark;
            if($city->update()){
                return response()->json(['status'=>true,'message'=>"City updated successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"City can't updated!"]);
            }
        }
    }

    public function delete(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $city = City::find($req->id);
            if($city->delete())
            {
                return response()->json(['status'=>true,'message'=>"City Deleted!"]);
            }
            else
            {
                return response()->json(['status'=>true,'message'=>"City can't delete!, Try Again"]);
            }
    
        }
        
    }

    public function trashshow()
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $cities = City::onlyTrashed()->get();
            return response()->json(['status'=>true,'cities'=>$cities]);
            
        }
    }

    public function restore(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $city = City::withTrashed()->find($req->id);
            if($city->restore()){
                return response()->json(['status'=>true,'message'=>"City restored."]);
            }else {
                return response()->json(['status'=>true,'message'=>"City can't restore!"]);
            }
        }
        
    }

    public function restoreAll(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $cities = City::onlyTrashed();
            if($cities->restore()){
                return response()->json(['status'=>true,'message'=>"All Cities restored."]);
            }else {
                return response()->json(['status'=>false,'message'=>"Cities can't restore!"]);
            }
        }
        
    }
}
