// src/ai/flows/detect-harmful-behavior.ts
'use server';
/**
 * @fileOverview Detects harmful behavior in chat conversations and triggers notifications.
 *
 * - detectHarmfulBehavior - A function that checks chat content for harmful keywords.
 * - DetectHarmfulBehaviorInput - The input type for the detectHarmfulBehavior function.
 * - DetectHarmfulBehaviorOutput - The return type for the detectHarmfulBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectHarmfulBehaviorInputSchema = z.object({
  text: z.string().describe('The chat message to analyze.'),
});
export type DetectHarmfulBehaviorInput = z.infer<typeof DetectHarmfulBehaviorInputSchema>;

const DetectHarmfulBehaviorOutputSchema = z.object({
  isHarmful: z.boolean().describe('Whether the message indicates harmful behavior.'),
  reason: z.string().describe('The reason why the message is considered harmful, if applicable.'),
});
export type DetectHarmfulBehaviorOutput = z.infer<typeof DetectHarmfulBehaviorOutputSchema>;

export async function detectHarmfulBehavior(input: DetectHarmfulBehaviorInput): Promise<DetectHarmfulBehaviorOutput> {
  return detectHarmfulBehaviorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectHarmfulBehaviorPrompt',
  input: {schema: DetectHarmfulBehaviorInputSchema},
  output: {schema: DetectHarmfulBehaviorOutputSchema},
  prompt: `You are an AI safety assistant. Your task is to analyze chat messages and determine if they contain any indication of self-harm or harmful behavior.

  Here are some keywords which represent harmful behavior: harm, kill, hurt, suicide, die, death.

  Analyze the following message:
  {{text}}

  Determine if the message contains harmful content. If it does, set isHarmful to true and provide a reason. Otherwise, set isHarmful to false.
  `,
});

const detectHarmfulBehaviorFlow = ai.defineFlow(
  {
    name: 'detectHarmfulBehaviorFlow',
    inputSchema: DetectHarmfulBehaviorInputSchema,
    outputSchema: DetectHarmfulBehaviorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
