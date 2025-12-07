const DEFAULT_EXTERNAL_IMAGE_HOST = "nishispo-dev-bucket.s3.amazonaws.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: `${process.env.APP_SUB_FOLDER_BASE_PATH}`,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: `${process.env.EXTERNAL_IMAGE_HOST || DEFAULT_EXTERNAL_IMAGE_HOST}`,
      },
    ],
  },
};

export default nextConfig;
