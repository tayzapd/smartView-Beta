<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Township;
use Illuminate\Support\Facades\Validator;

class TownshipController extends Controller
{
    public function show(Request $req)
    {
        return Township::with('city')->get();
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'remark' => 'required|string',
            'city_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $township = new Township;
            $township->name = $req->name;
            $township->remark = $req->remark;
            $township->city_id = $req->city_id;
            if($township->save()){
                return response()->json(['status'=>true,"Township created successfully."]);
            }else {
                return response()->json(['status'=>true,"Township can't created!"]);
            }
        }
    }
    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'remark' => 'required|string',
            'city_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $township = Township::find($req->id);
            $township->name = $req->name;
            $township->city_id = $req->city_id;
            $township->remark = $req->remark;
            if($township->update()){
                return response()->json(['status'=>true,"Township updated successfully."]);
            }else {
                return response()->json(['status'=>true,"Township can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        $township = Township::find($req->id);
        if($township->delete())
        {
            return response()->json(['status'=>true,'Message'=>"Township Deleted!"]);
        }
        else
        {
            return response()->json(['status'=>true,'Message'=>"Township can't delete!, Try Again"]);
        }

    }
    public function restore(Request $req)
    {
        $township = Township::withTrashed()->find($req->id);
        if($township->restore()){
            return response()->json(['status'=>true,"Township restored."]);
        }else {
            return response()->json(['status'=>true,"Township can't restore!"]);
        }
    }
}
