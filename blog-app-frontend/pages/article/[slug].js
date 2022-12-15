import axios from "../../lib/axios";
import Head from "next/head";
import GuestLayout from "../../layouts/GuestLayout";

import { ArticleDetail, Categories, ArticleWidget, Author, Comments, CommentsForm } from '../../components';

const ArticleDetails = ({ article }) => {
    
  return (
    <GuestLayout>
        <Head>
            <title>Blog | {article.title}</title>
        </Head>
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <ArticleDetail article={article} />
                    <Author author={article.author} />
                    <CommentsForm id={article.id} />
                    <Comments id={article.id} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <ArticleWidget slug={article.slug} categories={article.categories?.map((category) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
  )
}

export default ArticleDetails;

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