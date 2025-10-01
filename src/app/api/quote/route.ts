// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Quote from '@/models/Quote';
import { QuoteData } from '@/types/QuoteData';

// PATCH (update)
export const PATCH = async (req: NextRequest): Promise<Response> => {
    try {
        await checkAuthority();

        const payload: QuoteData = await req.json();

        await connectToDB();

        const updatedQuote = await Quote.findOneAndUpdate({}, payload, { new: true, runValidators: true });

        if (!updatedQuote) {
            return new Response('Quote Obj not found!', { status: 404 });
        }

        return new Response(JSON.stringify(updatedQuote), { status: 200 });
    } catch (error) {
        console.error('PATCH error:', error);
        return new Response('Failed to update the prompt', { status: 500 });
    }
};

// GET Request
export const GET = async (req: NextRequest) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Fetch all jobs from the database
        const quote = await Quote.findOne({});

        // Return JSON response
        return NextResponse.json(quote, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
    }
};
