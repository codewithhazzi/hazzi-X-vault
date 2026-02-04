import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    try {
        const response = await fetch(`https://temp-mail-org4.p.rapidapi.com/mailbox/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'temp-mail-org4.p.rapidapi.com',
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || ''
            }
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json({ error: data.message || 'Failed to fetch emails' }, { status: response.status })
        }

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
