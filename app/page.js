import Image from "next/image";
import styles from "./page.module.css";
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { Fragment } from "react";
import Head from "next/head";
import '../styles/globals.css';
import { getFeaturedPosts } from '../lib/posts-util';

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

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  return (
    <Fragment>
      <Head>
        <title>Rushi's Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
}
