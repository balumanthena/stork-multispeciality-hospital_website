import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { UserRole } from './types'

// Map out direct URL prefixes to their generic required role access levels
// Note: More granular `hasPermission` checks happen at the Server Action / Component level. 
// Middleware is the blunt instrument to bounce fundamentally unauthorized ranks.
const ROUTE_PERMISSIONS: { path: string, roles: UserRole[] }[] = [
    { path: '/admin/settings', roles: ['super_admin'] },
    { path: '/admin/users', roles: ['super_admin'] }, // Hypothetical route map mapping
    { path: '/admin/services', roles: ['super_admin', 'admin'] },
    { path: '/admin/blogs', roles: ['super_admin', 'admin', 'editor'] },
    { path: '/admin/videos', roles: ['super_admin', 'admin', 'editor'] },
]

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

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

    const { data: { user } } = await supabase.auth.getUser()

    // Base Auth Paths
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
    const isAdminAuthPath =
        request.nextUrl.pathname.startsWith('/admin/login') ||
        request.nextUrl.pathname.startsWith('/admin/forgot-password') ||
        request.nextUrl.pathname.startsWith('/admin/reset-password')

    if (request.nextUrl.pathname === '/login') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
    }

    if (isAdminPath && !isAdminAuthPath) {
        // 1. Unauthenticated -> Login
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        // 2. Fetch Profile Role & Status
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('role, is_active')
            .eq('id', user.id)
            .single()

        // 3. If missing profile entirely or error, force logout edge case
        if (error || !profile) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            url.searchParams.set('error', error ? `DB Error: ${error.message}` : 'Profile not found')
            return NextResponse.redirect(url)
        }

        // 4. Suspended User (is_active = false)
        if (profile.is_active === false) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            url.searchParams.set('error', 'Account suspended by an Administrator.')
            return NextResponse.redirect(url)
        }

        // 5. Evaluate Route Role Requirements
        const currentRole = profile.role as UserRole
        let isAuthorized = true;

        for (const route of ROUTE_PERMISSIONS) {
            if (request.nextUrl.pathname.startsWith(route.path)) {
                if (!route.roles.includes(currentRole)) {
                    isAuthorized = false;
                    break;
                }
            }
        }

        // 6. Redirect unauthorized users back to the safe root dashboard.
        // E.g. an Editor trying to force map to /admin/settings gets bumped to /admin
        if (!isAuthorized && request.nextUrl.pathname !== '/admin') {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }
    }

    // 7. Already authenticated users trying to hit the login screen get sent to dashboard.
    if (isAdminAuthPath && user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, is_active')
            .eq('id', user.id)
            .single()

        if (profile && profile.is_active !== false) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images/).*)',
    ],
}
