<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Township;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;

class TownshipController extends Controller
{
    public function show(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            return Township::with('city')->get();
        }
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
        }
        if(Gate::allows('admin-auth',Auth::user())) {
            $township = new Township;
            $township->name = $req->name;
            $township->remark = $req->remark;
            $township->city_id = $req->city_id;
            if($township->save()){
                return response()->json(['status'=>true,'message'=>"Township created successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Township can't created!"]);
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
        }
        if(Gate::allows('admin-auth',Auth::user())) {
            $township = Township::find($req->id);
            $township->name = $req->name;
            $township->city_id = $req->city_id;
            $township->remark = $req->remark;
            if($township->update()){
                return response()->json(['status'=>true,'message'=>"Township updated successfully."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Township can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $township = Township::find($req->id);
            if($township->delete())
            {
                return response()->json(['status'=>true,'message'=>"Township Deleted!"]);
            }
            else
            {
                return response()->json(['status'=>true,'message'=>"Township can't delete!, Try Again"]);
            }
        }
        

    }
    public function restore(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $township = Township::withTrashed()->find($req->id);
            if($township->restore()){
                return response()->json(['status'=>true,'message'=>"Township restored."]);
            }else {
                return response()->json(['status'=>true,'message'=>"Township can't restore!"]);
            }
        }
    }

    public function trashshow()
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $townships = Township::onlyTrashed()->get();
            return response()->json(['status'=>true,'townships'=>$townships]);
            
        }
    }

    public function restoreAll(Request $req)
    {
        if(Gate::allows('admin-auth',Auth::user())){
            $townships =Township::onlyTrashed();
            if($townships->restore()){
                return response()->json(['status'=>true,'message'=>"All Townships restored."]);
            }else {
                return response()->json(['status'=>false,'message'=>"Townships can't restore!"]);
            }
        }
        
    }
}
