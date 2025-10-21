import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    try {
      // Safe middleware execution
      return;
    } catch (error) {
      console.error('Middleware error:', error);
      return;
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        try {
          // Protect dashboard routes - require author role
          if (req.nextUrl.pathname.startsWith('/dashboard')) {
            return token?.roles?.includes('author') ?? false;
          }
          
          // For other protected routes, just require authentication
          return !!token;
        } catch (error) {
          console.error('Authorization error:', error);
          return false;
        }
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/posts/:path*'
  ]
};