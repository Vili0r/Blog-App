import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import axios from '../lib/axios';

const ArticleWidget = ({ categories, slug }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);

  const getRecentArticles = async () => {
    await axios
        .get('/api/front-end/articles-widget')
        .then(response => setRecentArticles(response.data.data));
  }

  useEffect(() => {
      getRecentArticles();
  },[]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
           {slug ? "Related Posts" : "Recent Posts"}
        </h3>
        {recentArticles.slice(0,3).map((article) => (
          <div key={article.id} className="flex items-center w-full mb-4">
              <div className="w-16 flex-none">
                  <img 
                      height="60px"
                      width="60px"
                      className="align-middle rounded-full"
                      src={`http://localhost:8000/${article.image}`}
                  />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-gray-500 font-xs">
                  {moment(article.created_at).format('MMM DD, YYYY')}
                </p>
                <Link href={`/article/${article.slug}`} key={article.id} className="text-md">
                    {article.title}
                </Link>
              </div>
          </div>
        ))}
    </div>
  )
}

export default ArticleWidget