'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import type { ChatMessage, PersonaType } from '@/types';
import { embodyPersona, type EmbodyPersonaInput } from '@/ai/flows/embody-persona';
import { detectHarmfulBehavior, type DetectHarmfulBehaviorInput } from '@/ai/flows/detect-harmful-behavior';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessageBubble from '@/components/chat-message-bubble';
import { useToast } from '@/hooks/use-toast';
import { SendHorizontal, Loader2, type LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatInterfaceProps {
  personaSlug: PersonaType;
  personaName: string;
  PersonaIcon: LucideIcon;
}

export default function ChatInterface({ personaSlug, personaName, PersonaIcon }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Welcome message
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        text: `Hello! I'm ${personaName}. What shall we talk about today?`,
        sender: 'ai',
        personaName: personaName,
        timestamp: Date.now(),
      },
    ]);
  }, [personaName]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const currentInput = inputValue.trim();
    if (!currentInput) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: currentInput,
      sender: 'user',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // AI Persona Response
      const personaInput: EmbodyPersonaInput = { persona: personaSlug, message: currentInput };
      const personaResponse = await embodyPersona(personaInput);
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: personaResponse.response,
        sender: 'ai',
        personaName: personaName,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Harmful Behavior Check
      const harmInput: DetectHarmfulBehaviorInput = { text: currentInput };
      const harmDetectionResult = await detectHarmfulBehavior(harmInput);
      if (harmDetectionResult.isHarmful) {
        toast({
          variant: 'destructive',
          title: 'Harmful Behavior Detected',
          description: `Reason: ${harmDetectionResult.reason}. A notification would be sent.`,
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not get a response from the character. Please try again.',
      });
      // Optionally add error message back to chat or allow resend
       const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: "I'm having a little trouble talking right now. Please try again in a moment!",
        sender: 'ai',
        personaName: personaName,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] max-w-3xl mx-auto bg-card shadow-xl rounded-lg border border-border">
      <header className="p-4 border-b border-border flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-accent text-accent-foreground">
            <PersonaIcon className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-primary">Chatting with {personaName}</h2>
      </header>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} PersonaIcon={PersonaIcon} />
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-grow text-base"
            aria-label="Chat message input"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
