import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import axios from '../../lib/axios';
import AppLayout from "../../layouts/AppLayout";
import Head from 'next/head';
import Link from 'next/link';
import { Pagination, CommentTableDropdown } from "../../components";

const CommentIndex = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const getComments = async () => {
    const params = {
        page: currentPage
      }

    const response = await axios.get('/api/comments', {params})
      setComments(response.data.data);
      setPagination(response.data.meta);
    }

  useEffect(() => {
    getComments();
  }, [currentPage]);
  
  return (
    <AppLayout>
          <Head>
            <title>Blog - Comments</title>
          </Head> 
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white m-10">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex justify-between flex-grow flex-1">
                <h3 className="font-semibold text-lg text-blue-700">
                  Comments
                </h3>
              </div>
            </div>
          </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Name
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Email
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Approved
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Article
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Content
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Create At
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {comment.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {comment.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {comment.approved ? 'Yes' : 'No'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {comment.article.title}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {comment.content}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {moment(comment.create_at).format('MMM DD, YYYY')}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <CommentTableDropdown 
                      articleId={comment.article.id}
                      commentId={comment.id}
                      getComments={getComments}
                      approved={comment.approved}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 mb-3 ml-3">
              <Pagination 
                  pagination={pagination} 
                  pageChanged={(page) => setCurrentPage(page)} 
              />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default CommentIndex