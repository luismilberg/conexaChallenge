const BUSINESS = 'business';

const ROUTES = [
    {
        url: `/${BUSINESS}`,
        proxy: {
            target: `${process.env.BUSINESS_URL}`,
            changeOrigin: true,
            logger: console,
            pathRewrite: function(path, req) {
                return path.replace(`/${BUSINESS}`, '');
            },
        }
    },
    {
        url: `/`,
        proxy: {
            target: `${process.env.LOGIN_URL}`,
            changeOrigin: true,
            logger: console,
        }
    },
]

exports.ROUTES = ROUTES;