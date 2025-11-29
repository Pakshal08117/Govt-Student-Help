// Problem Solver - Provides complete solutions with step-by-step guidance
import { schemes } from '@/data/schemes';

export interface ProblemSolution {
  problem: string;
  schemes: any[];
  howToApply: string;
  documents: string[];
  timeline: string;
  helpline: string;
}

// Comprehensive problem patterns with solutions
export function solveProblem(userInput: string, lang: string = 'en'): string {
  const lowerInput = userInput.toLowerCase();
  let solution = '';

  // Detect problem and provide complete solution
  
  // HEALTH PROBLEMS
  if (lowerInput.match(/sick|illness|disease|hospital|treatment|operation|surgery|medicine|doctor|बीमार|आजार|उपचार|रुग्णालय|इलाज|बीमारी|अस्पताल|दवा/i)) {
    solution = solveHealthProblem(userInput, lang);
  }
  
  // EDUCATION PROBLEMS
  else if (lowerInput.match(/school|college|education|study|fees|admission|शाळा|शिक्षण|फी|प्रवेश|स्कूल|शिक्षा/i)) {
    solution = solveEducationProblem(userInput, lang);
  }
  
  // FARMING PROBLEMS
  else if (lowerInput.match(/farm|crop|irrigation|seeds|fertilizer|खेती|पीक|शेती|बियाणे|किसान|फसल/i)) {
    solution = solveFarmingProblem(userInput, lang);
  }
  
  // MONEY/FINANCIAL PROBLEMS
  else 