import React, {useState, useEffect, useRef} from 'react';
import InputError from './InputError';
import axios from '../lib/axios';

const CommentsForm = ({ id }) => {
  const [errors, setErrors] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage ] = useState(false);
  const storeDataEl = useRef();
  const [values, setValues] = useState({
    content: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    setValues({ ...values,
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
    });
  },[])

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const { checked: storeData } = storeDataEl.current;

    if(storeData){
      window.localStorage.setItem('name', values.name);
      window.localStorage.setItem('email', values.email);
    } else {
      window.localStorage.removeItem('name', values.name);
      window.localStorage.removeItem('email', values.email);
    }

    axios
        .post(`/api/front-end/articles/${id}/comments`, {
          'content': values.content,
          'name': values.name,
          'email': values.email
        })
        .then(response => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000)
        })
        .catch(error => setErrors(error.response.data.errors));
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit}>

        <div className='grid grid-cols-1 gap-4 mb-4'>
            <textarea   
                onChange={onChange} 
                className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
                placeholder="Comment.."
                name="content"
                id="content"
              />
            <InputError messages={errors.content} className="mt-2" />  
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
            <input 
              type="text"
              onChange={onChange}
              className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
              placeholder="Name.."
              name="name"
              id="name"
            />
            <InputError messages={errors.name} className="mt-2" />
            <input 
              type="email"
              onChange={onChange}
              className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
              placeholder="Email.."
              name="email"
              id="email"
            />
            <InputError messages={errors.email} className="mt-2" />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
            <div>
                <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" />
                <label className='text-gray-500 cursor-pointer ml-2' htmlFor="storeData">Store my e-mail and name for the next time I comment.</label>
            </div>
        </div>
        <div className='mt-8'>
            <button 
              type="submit" 
              className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
            >
              Post Comment
            </button>
            {showSuccessMessage && 
              <span 
                className='text-xl float-right font-semibold mt-3 text-green-500'
              >Comment submitted for review</span>
            }
        </div>
      </form>
    </div>
  )
}

export default CommentsForm