import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return Response.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // In production, validate token against database
    // For now, we just check if token exists
    return Response.json({
      user: {
        id: 1,
        email: 'admin@developersmatrix.com',
        name: 'Admin',
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
