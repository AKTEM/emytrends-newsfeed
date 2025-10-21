import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

export interface WordPressUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  roles: string[];
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'WordPress',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const siteUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'https://emytrends.com';
          const response = await fetch(`${siteUrl}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error('WordPress login error:', {
              status: response.status,
              statusText: response.statusText,
              data: data,
              url: `${siteUrl}/wp-json/jwt-auth/v1/token`
            });
            return null;
          }

          // Fetch user details with the token
          const userResponse = await fetch(`${siteUrl}/wp-json/wp/v2/users/me`, {
            headers: {
              'Authorization': `Bearer ${data.token}`,
            },
          });

          const userData = await userResponse.json();

          if (!userResponse.ok) {
            console.error('Failed to fetch user data:', {
              status: userResponse.status,
              statusText: userResponse.statusText,
              data: userData,
              url: `${siteUrl}/wp-json/wp/v2/users/me`,
              token: data.token ? 'Present' : 'Missing'
            });
            return null;
          }

          return {
            id: userData.id.toString(),
            name: userData.name,
            email: userData.email,
            username: userData.slug,
            displayName: userData.name,
            roles: userData.roles || ['subscriber'],
            token: data.token,
          };
        } catch (error) {
          console.error('Authentication error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            error: error,
            credentials: {
              username: credentials.username,
              passwordProvided: !!credentials.password
            }
          });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || '';
        token.username = (user as any).username || '';
        token.roles = (user as any).roles || ['subscriber'];
        token.accessToken = (user as any).token || '';
        token.displayName = (user as any).displayName || user.name || '';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = (token.id as string) || '';
        session.user.username = (token.username as string) || '';
        session.user.roles = (token.roles as string[]) || ['subscriber'];
        session.user.accessToken = (token.accessToken as string) || '';
        session.user.displayName = (token.displayName as string) || session.user.name || '';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
};