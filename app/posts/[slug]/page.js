import { notFound } from 'next/navigation';
import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/posts-util';

// Generate static paths for posts
export async function generateStaticParams() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

    return slugs.map((slug) => ({ slug }));
}

// Set metadata dynamically
export async function generateMetadata({ params }) {
    const { slug } = params;
    try {
        const postData = getPostData(slug);

        if (!postData) {
            return { title: 'Post Not Found', description: 'The post you are looking for does not exist.' };
        }

        return {
            title: postData.title,
            description: postData.excerpt,
        };
    } catch (error) {
        return { title: 'Error', description: 'Something went wrong while loading the post.' };
    }
}

// Post detail page component
export default async function PostDetailPage({ params }) {
    const { slug } = params;

    const postData = getPostData(slug);

    if (!postData) {
        notFound(); // Render a 404 page if the post is not found
    }

    return <PostContent post={postData} />;
}
