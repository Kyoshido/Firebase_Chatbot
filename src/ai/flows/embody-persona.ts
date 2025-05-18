'use server';
/**
 * @fileOverview This file defines a Genkit flow for embodying a chosen character persona (princess or knight) in a chatbot application.
 *
 * - `embodyPersona`: A function that takes a character choice and message as input and returns a response appropriate for children.
 * - `EmbodyPersonaInput`: The input type for the `embodyPersona` function, including the character persona and the user's message.
 * - `EmbodyPersonaOutput`: The return type for the `embodyPersona` function, containing the character's response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmbodyPersonaInputSchema = z.object({
  persona: z.enum(['princess', 'knight']).describe('The chosen character persona for the chat.'),
  personaName: z.string().describe('The name of the character persona.'),
  message: z.string().describe('The user message to be responded to by the persona.'),
});
export type EmbodyPersonaInput = z.infer<typeof EmbodyPersonaInputSchema>;

const EmbodyPersonaOutputSchema = z.object({
  response: z.string().describe('The character persona response to the user message.'),
});
export type EmbodyPersonaOutput = z.infer<typeof EmbodyPersonaOutputSchema>;

export async function embodyPersona(input: EmbodyPersonaInput): Promise<EmbodyPersonaOutput> {
  return embodyPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'embodyPersonaPrompt',
  input: {schema: EmbodyPersonaInputSchema},
  output: {schema: EmbodyPersonaOutputSchema},
  prompt: `You are a friendly chatbot. Your name is {{personaName}} and you are a {{persona}}. Your goal is to have an engaging conversation with children.

  Respond to the following message from the user, keeping your response appropriate for their age and understanding. The message from the user is:
  """{{message}}"""
  `,
});

const embodyPersonaFlow = ai.defineFlow(
  {
    name: 'embodyPersonaFlow',
    inputSchema: EmbodyPersonaInputSchema,
    outputSchema: EmbodyPersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
