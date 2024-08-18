// app/api/calories/route.ts
import { NextResponse } from 'next/server';
import { insertCalories } from '../../app/lib/db'; // Ensure the correct import path

export async function POST(request: Request) {
    try {
      const { userId, date, calories } = await request.json();
      
      console.log('Request Data:', { userId, date, calories });
  
      if (!userId || !date || !calories) {
        console.log('Missing required fields');
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }
  
      const result = await insertCalories(userId, date, calories);
      console.log('Insert Result:', result);
  
      return NextResponse.json(result);
    } catch (error) {
      console.error('Error submitting calorie data:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
  