module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://college-dashboard-backend.onrender.com/:path*',
            
          },
        ]
      },
  };