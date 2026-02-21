
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create a supabase client for the server
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Get the user from the session
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Define admin paths
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
    const isAdminAuthPath =
        request.nextUrl.pathname.startsWith('/admin/login') ||
        request.nextUrl.pathname.startsWith('/admin/forgot-password') ||
        request.nextUrl.pathname.startsWith('/admin/reset-password')

    // Redirect root /login to /admin/login
    if (request.nextUrl.pathname === '/login') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
    }

    // Protect Admin Routes
    if (isAdminPath && !isAdminAuthPath) {
        // 1. Check if user is logged in
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        // 2. Check if user has allowed role in public.profiles
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const allowedRoles = ['super_admin', 'editor', 'content_manager', 'admin'] // Added 'admin' for backward compat if any data stuck

        if (!profile || !allowedRoles.includes(profile.role)) {
            // User is logged in but not authorized
            // Avoid infinite loop if they are stuck here, maybe redirect to home or show error
            // For now, redirect to login which handles signed-in state logic below
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }
    }

    // If user is already logged in and tries to go to login page, redirect to dashboard
    if (isAdminAuthPath && user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const allowedRoles = ['super_admin', 'editor', 'content_manager', 'admin']

        if (profile && allowedRoles.includes(profile.role)) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images/ (public images)
         */
        '/((?!_next/static|_next/image|favicon.ico|images/).*)',
    ],
}

