import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: Request) {
  try {
    const { name, email, company, service, budget, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // Use AI to format a professional email
    const emailContent = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an email formatter. Create a professional email notification for a contact form submission. 
          Format the email to be clear, professional, and easy to read. Include all the details provided by the user.`
        },
        {
          role: 'user',
          content: `Create an email notification for this contact form submission:
          
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service Interested In: ${service}
Budget Range: ${budget || 'Not specified'}
Message: ${message}

Format this as a professional business inquiry email to be sent to sy.bilalshah@gmail.com. Include:
1. A clear subject line
2. All contact details
3. The message formatted nicely
4. A suggested next step

Return ONLY the formatted email text, nothing else.`
        }
      ],
      temperature: 0.3
    });

    const formattedEmail = emailContent.choices[0]?.message?.content || `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service: ${service}
Budget: ${budget || 'Not specified'}

Message:
${message}
    `;

    // Log the submission (in production, you'd send an actual email)
    console.log('=== New Contact Form Submission ===');
    console.log(formattedEmail);
    console.log('================================');
    console.log('Would be sent to: sy.bilalshah@gmail.com');

    // In a production environment, you would integrate with an email service like:
    // - Resend, SendGrid, Mailgun, AWS SES, etc.
    // For now, we'll return success and log the submission

    // Store submission in a file for reference
    const submission = {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      service,
      budget,
      message,
      emailContent: formattedEmail
    };

    // You could also use the AI to generate a quick auto-response
    const autoResponse = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Generate a brief, professional auto-response message thanking the user for their inquiry and letting them know you will respond within 24-48 hours.'
        },
        {
          role: 'user',
          content: `User ${name} from ${company || 'a company'} inquired about ${service}.`
        }
      ],
      temperature: 0.5
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      autoResponse: autoResponse.choices[0]?.message?.content || 'Thank you for your inquiry! We will get back to you within 24-48 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
