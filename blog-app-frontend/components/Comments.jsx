import React, {useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import axios from '../lib/axios';

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await axios.get(`/api/front-end/articles/${id}/comments`)
      setComments(response.data.data);
    }

  useEffect(() => {
    getComments()
  }, [id]);
  
  return (
    <>
      {comments.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg p-8 pb012 mb-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
              {comments.length}
              {' '}
              Comments
          </h3>
          {comments.map((comment) => (
            <div key={comment.create_at} className='border-b border-gray-100 mb-4 pb-4' >
                <p className='mb-4'>
                  <span className='font-semibold'>
                    {comment.name}
                    {' '}
                    on
                    {' '}
                    {moment(comment.create_at).format('MMM DD, YYYY')}
                  </span>
                </p>
                <p className='whitespace-pre-line text-gray-600 w-full'>
                  {parse(comment.content)}
                </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments