<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'image' => ['required', 'image'],
            'title' => 'required', 'min:3', 'max:30'. Rule::unique('artilces', 'title')->ignore($this->title),
            'body' => ['required', 'min:3'],
            'published_at' => ['required'],
            'category_id' => ['required'],
        ];
    }

    public function attributes()
    {
        return [
            'category_id' => 'category'
        ];
    }
}
