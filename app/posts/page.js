import Head from 'next/head';
import { Fragment } from 'react';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '@/lib/posts-util';
// import { getAllPosts } from '../../lib/posts-util';

const DUMMY_POSTS = [
    {
        slug: 'getting-started-with-nextjs',
        title: 'Getting Started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is a the react framework for production - it makes building fullstack apps and sites a breeze and ship with build-in SSR.',
        date: '2022-02-10'
    },
    {
        slug: 'getting-started-with-nextjs2',
        title: 'Getting Started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is a the react framework for production - it makes building fullstack apps and sites a breeze and ship with build-in SSR.',
        date: '2022-02-10'
    },
    {
        slug: 'getting-started-with-nextjs3',
        title: 'Getting Started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is a the react framework for production - it makes building fullstack apps and sites a breeze and ship with build-in SSR.',
        date: '2022-02-10'
    },
    {
        slug: 'getting-started-with-nextjs4',
        title: 'Getting Started with next js',
        image: 'getting-started-nextjs.png',
        excerpt: 'NextJS is a the react framework for production - it makes building fullstack apps and sites a breeze and ship with build-in SSR.',
        date: '2022-02-10'
    }
]


function AllPostsPage(props) {
    const featuredPosts = getAllPosts();
    return (
        <Fragment>
            <Head>
                <title>All Posts</title>
                <meta
                    name='description'
                    content='A list of all programming-related tutorials and posts!'
                />
            </Head>
            <AllPosts posts={featuredPosts} />
        </Fragment>
    );
}

export default AllPostsPage;
