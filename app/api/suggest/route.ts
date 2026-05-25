import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, contact, topic, language, description } = await request.json();
  if (!name || !topic || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  try {
    await resend.emails.send({
      from: 'Vord Suggestions <onboarding@resend.dev>',
      to: 'oluwafemimartins1212@gmail.com',
      subject: `New Suggestion: ${topic}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Contact:</strong> ${contact || 'Not provided'}</p>
             <p><strong>Language:</strong> ${language}</p>
             <p><strong>Description:</strong><br/>${description}</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send suggestion' }, { status: 500 });
  }
}