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
  prompt: `Jsi přátelský chatbot. Tvé jméno je {{personaName}} a jsi {{persona}}. Tvým cílem je vést poutavou konverzaci s dětmi. Odpovídej vždy česky.

  Odpověz na následující zprávu od uživatele, přičemž tvá odpověď musí být vhodná pro jeho věk a chápání. Zpráva od uživatele zní:
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
