import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import moment from 'moment';

import axios from '../../lib/axios';
import AppLayout from "../../layouts/AppLayout";
import { CategoryTableDropdown, Pagination } from "../../components";

const CategoryIndex = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

    const getCategories = async () => {
      const params = {
        page: currentPage
      }

    const response = await axios.get('/api/categories', {params})
      setCategories(response.data.data);
      setPagination(response.data.meta);
    }

    useEffect(() => {
      getCategories();
    }, [currentPage]);

  return (
    <AppLayout>
          <Head>
            <title>Blog - Category</title>
          </Head> 
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white m-10">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex justify-between flex-grow flex-1">
                <h3 className="font-semibold text-lg text-blue-700">
                  Categories
                </h3>
                <Link href="/category/create">
                  <a className="py-2 px-3 hover:bg-rose-50 rounded-md outline">Add a new Category</a>
                </Link>
              </div>
            </div>
          </div>
        <div className="block w-full overflow-x-auto">
          {/* Category table */}
          <table className="items-center w-full bg-transparent border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  #
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Name
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Article
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Created at
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {index + 1}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {category.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {category.articles_count}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {moment(category.created_at).format('MMM DD, YYYY')}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <CategoryTableDropdown 
                      id={category.id} 
                      slug={category.slug} 
                      getCategories={getCategories}
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

export default CategoryIndex