/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_USER_NAME: process.env.MONGODB_USER_NAME,
        MONGODB_USER_PASSWORD: process.env.MONGODB_USER_PASSWORD,
        MONGODB_CLUSTER_NAME: process.env.MONGODB_CLUSTER_NAME,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    },
    reactStrictMode: true
};

export default nextConfig;
