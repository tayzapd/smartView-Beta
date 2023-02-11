<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function show(Request $req)
    {
        return Division::get();
    }
    public function create(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string',
            'remark' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $division = new Division;
            $division->name = $req->name;
            $division->remark = $req->remark;
            if($shop->save()){
                return response()->json(['status'=>true,"Division created successfully."]);
            }else {
                return response()->json(['status'=>true,"Division can't created!"]);
            }
        }
    }
    public function update(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'id'=> 'required',
            'name' => 'required|string',
            'remark' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }else {
            $division = Division::find($req->id);
            $division->name = $req->name;
            $division->remark = $req->remark;
            if($shop->update()){
                return response()->json(['status'=>true,"Division updated successfully."]);
            }else {
                return response()->json(['status'=>true,"Division can't updated!"]);
            }
        }
    }
    public function delete(Request $req)
    {
        $division = Division::find($req->id);
        if($division->delete())
        {
            return response()->json(['status'=>true,'Message'=>"Division Deleted!"]);
        }
        else
        {
            return response()->json(['status'=>true,'Message'=>"Division can't delete!, Try Again"]);
        }

    }
    public function restore(Request $req)
    {
        $division = Division::withTrashed()->find($req->id);
        if($division->restore()){
            return response()->json(['status'=>true,"Division restored."]);
        }else {
            return response()->json(['status'=>true,"Division can't restore!"]);
        }
    }
}
