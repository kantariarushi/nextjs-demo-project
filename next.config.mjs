/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_USER_NAME: process.env.MONGODB_USER_NAME,
        MONGODB_USER_PASSWORD: process.env.MONGODB_USER_PASSWORD,
        MONGODB_CLUSTER_NAME: process.env.MONGODB_CLUSTER_NAME
    }
};

export default nextConfig;
