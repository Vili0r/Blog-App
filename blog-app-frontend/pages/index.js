import Head from 'next/head';
import axios from '../lib/axios';
import { ArticleCard, ArticleWidget, Categories } from '../components';
import { useState, useEffect } from 'react';
import GuestLayout from '../layouts/GuestLayout';
import FeaturedArticles from '../sections/FeaturedArticles';

export default function Home() {

    const [articles, setArticles] = useState([]);

    const getArticles = async () => {
        await axios
            .get('/api/front-end/articles')
            .then(response => setArticles(response.data.data));
    }

    useEffect(() => {
      getArticles();
    }, []);

    return (
        <GuestLayout>

            <div className="container mx-auto px-10 mb-8 mt-8">
                <Head>
                    <title>Blog | Home</title>
                </Head>

                <FeaturedArticles />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    <div className="lg:col-span-8 col-span-1">
                        {articles.slice(0,10).map((article) => <ArticleCard article={article} key={article.id} />)}
                    </div>
                    <div className="lg:col-span-4 col-span-1">
                        <div className="lg:sticky relative top-8">
                            <ArticleWidget />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}