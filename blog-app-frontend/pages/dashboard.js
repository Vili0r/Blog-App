import AppLayout from '../layouts/AppLayout';
import Head from 'next/head';

import Widget from "../components/Widget";

const Dashboard = () => {
    return (
        <AppLayout>
            <Head>
                <title>Blog - Dashboard</title>
            </Head>

            <Widget />
        </AppLayout>
    )
}

export default Dashboard
