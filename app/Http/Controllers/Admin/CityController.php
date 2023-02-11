<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\City;
class CityController extends Controller
{
    public function show(Request $req)
    {
        return City::get();
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
        }else {
            $city = new division_id;
            $city->name = $req->name;
            $city->remark = $req->remark;
            if($shop->save()){
                return response()->json(['status'=>true,"City created successfully."]);
            }else {
                return response()->json(['status'=>true,"City can't created!"]);
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
        }else {
            $city = City::find($req->id);
            $city->name = $req->name;
            $city->division_id = $req->division_id;
            $city->remark = $req->remark;
            if($shop->update()){
                return response()->json(['status'=>true,"City updated successfully."]);
            }else {
                return response()->json(['status'=>true,"City can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        $city = City::find($req->id);
        if($city->delete())
        {
            return response()->json(['status'=>true,'Message'=>"City Deleted!"]);
        }
        else
        {
            return response()->json(['status'=>true,'Message'=>"City can't delete!, Try Again"]);
        }

    }
    public function restore(Request $req)
    {
        $city = City::withTrashed()->find($req->id);
        if($city->restore()){
            return response()->json(['status'=>true,"City restored."]);
        }else {
            return response()->json(['status'=>true,"City can't restore!"]);
        }
    }
}
