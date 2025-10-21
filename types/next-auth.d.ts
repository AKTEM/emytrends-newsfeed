import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username: string;
      roles: string[];
      accessToken: string;
      displayName: string;
    };
  }

  interface User {
    id: string;
    username: string;
    roles: string[];
    token: string;
    displayName: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    roles: string[];
    accessToken: string;
    displayName: string;
  }
}