'use server'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import axios from 'axios'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    console.log('Cookie:', cookie)
    const session = await decrypt(cookie)
    console.log('Session:', session)
    // Session: {
    //     userId: 'user@gamil.com',
    //     expiresAt: '2025-01-24T05:52:28.247Z',
    //     iat: 1737093148,
    //     exp: 1737697948
    //   }
    if (!session.userId) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId, role: session.role }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const userData = await axios.get(`http://localhost:3001/userdetail/${session.userId}`)
        console.log("getUser", userData.data);
        return userData.data
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})