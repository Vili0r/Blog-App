<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $role = $request->user()->roles()->with('permissions')
                ->get()
                ->pluck('permissions')
                ->flatten()
                ->pluck('name')
                ->unique()
                ->values()
                ->toArray();
                
        return [
            // $this->merge(Arr::except(parent::toArray($request), [
            //     'create_at', 'updated_at', 'email_verified_at'
            // ]))
            'id' => $this->id,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'roles' => $role ?? ''
        ];
    }
}
