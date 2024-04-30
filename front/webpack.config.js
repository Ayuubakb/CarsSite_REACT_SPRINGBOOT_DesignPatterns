import path from 'path';

export const resolve = {
    fallback: {
        "https": require.resolve("https-browserify"),
        "querystring": require.resolve("querystring-es3")
    }
};