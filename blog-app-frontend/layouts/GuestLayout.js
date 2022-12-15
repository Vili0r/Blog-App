import Head from 'next/head';
import { Header, Footer } from '../components';

const GuestLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <Header />
            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default GuestLayout
