import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '../lib/axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    await axios
        .get('/api/front-end/categories')
        .then(response => setCategories(response.data.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-2">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
           Categories
        </h3>
        {categories.slice(0,3).map((category) => (
          <Link href={`/categories/${category.slug}`} key={category.id} className="tex-md">
            <span className="cursor-pointer block pb-3 mb-3">
              {category.name}
            </span>
          </Link>
        ))}
    </div>
  )
}

export default Categories