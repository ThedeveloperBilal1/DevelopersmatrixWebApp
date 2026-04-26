import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface SalaryResult {
  min: number;
  max: number;
  median: number;
  currency: string;
  source: string;
  trend: string;
  trendPercent: number;
  insights: string;
}

export async function POST(request: Request) {
  try {
    const { role, location, experience } = await request.json();
    
    if (!role || !location) {
      return NextResponse.json({ error: 'Role and location are required' }, { status: 400 });
    }

    const zai = await ZAI.create();
    
    // Search for current salary data
    const searchQuery = `${role} salary ${location} ${new Date().getFullYear()} average compensation`;
    
    const searchResults = await zai.functions.invoke("web_search", {
      query: searchQuery,
      num: 5
    });

    // Use AI to analyze and extract salary information
    const searchContext = searchResults.map((r: { name: string; snippet: string }) => 
      `${r.name}: ${r.snippet}`
    ).join('\n');

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a salary data analyst. Extract salary information from search results and provide accurate salary estimates.
          
Return a JSON object with this exact format:
{
  "min": number (minimum salary in USD, no commas),
  "max": number (maximum salary in USD, no commas),
  "median": number (median/average salary in USD, no commas),
  "currency": "USD",
  "source": "source name",
  "trend": "up" | "down" | "stable",
  "trendPercent": number,
  "insights": "brief market insight"
}

If exact data isn't found, estimate based on role level and location cost of living.
Experience levels: junior (0-2 yrs), mid (2-5 yrs), senior (5+ yrs)
Adjust salaries accordingly: junior = 0.8x, mid = 1x, senior = 1.25x`
        },
        {
          role: 'user',
          content: `Search results for "${role} salary in ${location}":

${searchContext}

Extract salary data for a ${experience} level ${role} in ${location}. Return only the JSON object.`
        }
      ],
      temperature: 0.3
    });

    let salaryData;
    try {
      const content = completion.choices[0]?.message?.content || '';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        salaryData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch {
      // Fallback to estimated data based on role and location
      salaryData = getEstimatedSalary(role, location, experience);
    }

    return NextResponse.json({
      ...salaryData,
      lastUpdated: new Date().toISOString(),
      location,
      role,
      experience
    });

  } catch (error) {
    console.error('Salary API error:', error);
    return NextResponse.json({ error: 'Failed to fetch salary data' }, { status: 500 });
  }
}

function getEstimatedSalary(role: string, location: string, experience: string): SalaryResult {
  const baseSalaries: Record<string, number> = {
    'software engineer': 130000,
    'senior software engineer': 180000,
    'full stack developer': 135000,
    'frontend developer': 120000,
    'backend developer': 135000,
    'devops engineer': 145000,
    'product manager': 150000,
    'data scientist': 140000,
    'data engineer': 135000,
    'machine learning engineer': 160000,
    'software architect': 175000,
    'engineering manager': 190000,
    'tech lead': 165000,
    'qa engineer': 100000,
    'mobile developer': 125000,
  };

  const locationMultipliers: Record<string, number> = {
    'san francisco': 1.35,
    'new york': 1.25,
    'seattle': 1.20,
    'los angeles': 1.15,
    'boston': 1.15,
    'austin': 1.00,
    'denver': 0.95,
    'chicago': 0.95,
    'remote': 1.05,
    'miami': 0.95,
    'atlanta': 0.90,
    'dallas': 0.90,
  };

  const experienceMultipliers: Record<string, number> = {
    'junior': 0.75,
    'mid': 1.0,
    'senior': 1.30,
  };

  const roleKey = role.toLowerCase();
  const locationKey = location.toLowerCase();
  
  let baseSalary = baseSalaries[roleKey] || 120000;
  const locMult = locationMultipliers[locationKey] || 1.0;
  const expMult = experienceMultipliers[experience] || 1.0;
  
  const median = Math.round(baseSalary * locMult * expMult);
  const variance = Math.round(median * 0.15);
  
  return {
    min: median - variance,
    max: median + variance,
    median,
    currency: 'USD',
    source: 'Market Estimates',
    trend: 'stable',
    trendPercent: 5,
    insights: `${role} roles in ${location} are in high demand with competitive compensation packages.`
  };
}
