import React, {useState, useEffect} from 'react';
import axios from '../lib/axios';

const Widget = () => {
    const [totalUsers, setTotalUsers] = useState([]);
    const [totalArticles, setTotalArticles] = useState([]);
    const [totalComments, setTotalComments] = useState([]);

    const getTotalUsers = async () => {
        await axios
            .get('/api/total-users')
            .then(response => setTotalUsers(response.data));
    }

    const getTotalArticles = async () => {
        await axios
            .get('/api/total-articles')
            .then(response => setTotalArticles(response.data));
    }

    const getTotalComments = async () => {
        await axios
            .get('/api/total-comments')
            .then(response => setTotalComments(response.data));
    }

    useEffect(() => {
        getTotalUsers();
        getTotalArticles();
        getTotalComments();
      }, []);

  return (
    <div className="container mt-12 m-3">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total users
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                    {totalUsers.users}
                </div>
            </div>
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total Articles
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                    {totalArticles.articles}
                </div>
            </div>
            <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
                <div className="text-sm font-medium text-gray-500 truncate">
                    Total Comments
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                    {totalComments.comments}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Widget