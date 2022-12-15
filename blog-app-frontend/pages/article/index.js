import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import axios from '../../lib/axios';
import AppLayout from "../../layouts/AppLayout";
import { ArticleTableDropdown, Pagination } from "../../components";

const ArticleIndex = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

    const getArticles = async () => {
      const params = {
        page: currentPage
      }

    const response = await axios.get('/api/articles', {params})
      setArticles(response.data.data);
      setPagination(response.data.meta);
    }

    useEffect(() => {
      getArticles();
    }, [currentPage]);

  return (
    <AppLayout>
          <Head>
            <title>Blog - Article</title>
          </Head> 
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white m-10">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex justify-between flex-grow flex-1">
                <h3 className="font-semibold text-lg text-blue-700">
                  Articles
                </h3>
                <Link href="/article/create">
                  <a className="py-2 px-3 hover:bg-rose-50 rounded-md outline">Add a new Article</a>
                </Link>
              </div>
            </div>
          </div>
        <div className="block w-full overflow-x-auto">
          {/* Articles table */}
          <table className="items-center w-full bg-transparent border-collapse table-auto">
            <thead>
              <tr>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  #
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Title
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Author
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Body
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Featured
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Category
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article.id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {index + 1}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {article.title_body}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {article.author.author.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {article.body_table}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {article.featured ? 'Yes' : 'No'}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {article.category.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <ArticleTableDropdown 
                      id={article.id}
                      slug={article.slug}
                      getArticles={getArticles}
                      featured={article.featured}
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

export default ArticleIndex;