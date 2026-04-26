import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: Request) {
  try {
    const { type, data, prompt } = await request.json();
    
    const zai = await ZAI.create();
    
    let systemPrompt = 'You are a helpful AI assistant that generates professional content.';
    let userPrompt = prompt || '';
    
    switch (type) {
      case 'resume-summary':
        systemPrompt = 'You are an expert resume writer. Generate a compelling professional summary that highlights key achievements and career goals. Keep it concise (2-3 sentences) and impactful.';
        userPrompt = `Write a professional resume summary for a ${data.position || 'professional'}${data.company ? ` at ${data.company}` : ''}. Key skills: ${data.skills?.join(', ') || 'various professional skills'}. Make it impactful and ATS-friendly.`;
        break;
        
      case 'prompt-test':
        systemPrompt = 'You are a helpful AI assistant. Respond helpfully and thoroughly to the user\'s request.';
        userPrompt = prompt || data?.prompt || 'Help me with this task.';
        break;
        
      case 'email':
        systemPrompt = 'You are an expert email writer. Write clear, professional, and effective emails.';
        userPrompt = prompt || data?.prompt || 'Write a professional email.';
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
    
    return NextResponse.json({ content });
    
  } catch (error) {
    console.error('AI Generate API error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate content',
      content: 'Unable to generate content at this time. Please try again.' 
    }, { status: 500 });
  }
}
