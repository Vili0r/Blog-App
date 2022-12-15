import Head from "next/head";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

import Swal from 'sweetalert2';

import AppLayout from "../../../layouts/AppLayout";
import axios from '../../../lib/axios';
import InputError from '../../../components/InputError';


const ArticleEdit = ({ article }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState([]);
  const [values, setValues] = useState({
    title: article.title,
    body: article.body,
    category_id: article.category_id,
    published_at: article.published_at,
  });

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const onBody = (value) => {
    setValues({ ...values,
      body:value
    });
  }

  const getCategories = async () => {
    await axios
        .get('/api/front-end/categories')
        .then(response => setCategories(response.data.data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(loading) return;

    setErrors({});
    setLoading(true);

    let postData = new FormData();
    postData.append('title', values.title);
    postData.append('body', values.body);
    postData.append('category_id', values.category_id);
    postData.append('published_at', values.published_at);
    postData.append('image', image);
    postData.append('_method', 'PUT');

    axios.post(`/api/articles/${article.id}`, postData)
        .then(response => { 
            Swal.fire({
                icon: 'success',
                title: 'Post edited successfully!'
            });
            router.push('/article')
        })
        .catch(error => {
          setErrors(error.response.data.errors)
          Swal.fire({
              icon: 'error',
              title: error.response.data.message
          });
        })
        .finally(() => setLoading(false));
  } 

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <AppLayout>
        <Head>
          <title>Blog | Edit Article</title>
        </Head>
        <section className="w-full p-6 bg-white rounded-md shadow-md m-10">
          <h2 className="text-lg font-semibold text-gray-700 capitalize mb-4">Edit Article</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                  <label className="text-gray-700" htmlFor="title">Title</label>
                  <input id="title" name="title" value={values.title} type="text" onChange={onChange} className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                  <InputError messages={errors.title} className="mt-2" />
              </div>

              <div>
                  <label className="text-gray-700" htmlFor="body">Body</label>
                  <ReactQuill
                    theme="snow"
                    value={values.body}
                    onChange={onBody}
                    className="h-96"
                  />
                  <InputError messages={errors.body} className="mt-2" />
              </div>

              <div className="pt-20">
                  <label className="text-gray-700" htmlFor="category_id">Select category</label>
                  <select value={values.category_id} onChange={onChange} name="category_id" className="block w-full px-4 py-2 mb-6 mt-1 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                    <option>-- Select Category --</option>
                    {categories.map((category) => {
                        return <option key={category.id} value={category.id} >{category.name}</option>
                    })}
                </select>
                <InputError messages={errors.category_id} className="mt-2" />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="published_at">Date to be published</label>
                  <input id="published_at" value={values.published_at} name="published_at" type="date" onChange={onChange} className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                  <InputError messages={errors.published_at} className="mt-2" />
              </div>

              <div>
                  <label className="text-gray-700" htmlFor="cover_image">Upload Cover Image</label>
                  <input 
                    id="image" 
                    name="image" 
                    type="file" 
                    onChange={e => setImage(e.target.files[0])} 
                    className="block w-full px-4 py-2 mt-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                  <InputError messages={errors.image} className="mt-2" />
              </div>

              <div className="flex justify-end mt-6">
                <button type="submit" className="px-3 py-2 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" disabled={loading}>
                    <svg role="status" className={`w-4 h-4 mr-2 mb-1 text-gray-200 animate-spin dark:text-gray-600 fill-white inline ${!loading ? 'hidden' : ''}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span>Update</span>
                </button>
              </div>
          </form>
      </section>
    </AppLayout>
  )
}

export default ArticleEdit

export const getStaticPaths = async () => {
  const response = await axios.get("/api/front-end/articles");

  return {
      fallback: false,
      paths: response.data.data.map(article => ({
          params: {slug: article.slug}
      }))
  }
}

export const getStaticProps = async ({params}) => {
  const response = await axios.get(`/api/front-end/articles-show/${params.slug}`);
  
  return {
      props:{
          article: response.data.data
      },
  }
}