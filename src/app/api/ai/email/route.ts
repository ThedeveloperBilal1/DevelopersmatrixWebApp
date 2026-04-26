import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: Request) {
  try {
    const { mode, data } = await request.json();
    
    const zai = await ZAI.create();
    
    let systemPrompt = '';
    let userPrompt = '';
    
    switch (mode) {
      case 'draft':
        systemPrompt = `You are an expert email writer. Generate a professional email based on the user's requirements.
Return a JSON object with:
{
  "subject": "email subject line",
  "body": "email body with proper formatting",
  "tone": "the tone used",
  "suggestions": ["optional tips for improvement"]
}`;
        userPrompt = `Write an email with:
- Purpose: ${data.purpose}
- Recipient: ${data.recipient || 'Sir/Madam'}
- Key points: ${data.keyPoints}
- Tone: ${data.tone}

Generate a complete, ready-to-send email.`;
        break;
        
      case 'rewrite':
        systemPrompt = `You are an expert email editor. Rewrite the email to improve it based on the specified improvements and tone.
Return a JSON object with:
{
  "subject": "improved subject line",
  "body": "rewritten email body",
  "tone": "the tone used",
  "suggestions": ["what was improved"]
}`;
        userPrompt = `Rewrite this email:
${data.originalEmail}

Improvements to make: ${data.improvements?.join(', ') || 'general improvement'}
Target tone: ${data.tone}`;
        break;
        
      case 'reply':
        systemPrompt = `You are an expert at writing email replies. Generate an appropriate response based on the reply type.
Return a JSON object with:
{
  "subject": "reply subject (usually Re: original subject)",
  "body": "reply body",
  "tone": "the tone used"
}`;
        userPrompt = `Reply to this email:
${data.originalEmail}

Reply type: ${data.replyType}
Additional notes: ${data.additionalNotes || 'none'}`;
        break;
        
      case 'tone':
        systemPrompt = `You are an expert at adjusting email tone while preserving the message.
Return a JSON object with:
{
  "subject": "subject line",
  "body": "email body with adjusted tone",
  "tone": "the new tone"
}`;
        userPrompt = `Adjust the tone of this email to be more ${data.targetTone}:

${data.originalEmail}`;
        break;
    }
    
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7
    });
    
    const content = completion.choices[0]?.message?.content || '';
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return NextResponse.json(result);
      }
    } catch (e) {
      // Fall through to default response
    }
    
    // Fallback response
    return NextResponse.json({
      subject: `Re: ${data.purpose || 'Your Email'}`,
      body: content,
      tone: data.tone || 'professional',
      suggestions: ['Review and personalize before sending']
    });
    
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ error: 'Failed to generate email' }, { status: 500 });
  }
}
