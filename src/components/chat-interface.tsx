
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/types/i18n';

interface ChatInterfaceProps {
  personaSlug: PersonaType;
  personaName: string; 
  PersonaIcon: LucideIcon;
  dictionary: Dictionary; // Could be an empty object {}
  lang: Locale;
}

export default function ChatInterface({ personaSlug, personaName, PersonaIcon, dictionary, lang }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessageTemplate = dictionary?.personaWelcome || "Hello! I'm {personaName}. What shall we talk about today?";
    setMessages([
      {
        id: crypto.randomUUID(),
        text: welcomeMessageTemplate.replace('{personaName}', personaName),
        sender: 'ai',
        personaName: personaName,
        timestamp: Date.now(),
      },
    ]);
  }, [personaName, dictionary?.personaWelcome]);

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

      const harmInput: DetectHarmfulBehaviorInput = { text: currentInput };
      const harmDetectionResult = await detectHarmfulBehavior(harmInput);
      if (harmDetectionResult.isHarmful) {
        const harmfulReasonTemplate = dictionary?.harmfulBehaviorReason || "Reason: {reason}. A notification would be sent.";
        toast({
          variant: 'destructive',
          title: dictionary?.harmfulBehaviorTitle || "Harmful Behavior Detected",
          description: harmfulReasonTemplate.replace('{reason}', harmDetectionResult.reason),
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        variant: 'destructive',
        title: dictionary?.genericErrorTitle || "Error",
        description: dictionary?.fetchError || "Could not get a response. Please try again.",
      });
       const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        text: dictionary?.aiErrorResponse || "I'm having trouble responding. Please try again.",
        sender: 'ai',
        personaName: personaName,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const chattingWithTemplate = dictionary?.chattingWith || "Chatting with {personaName}";
  const typeMessagePlaceholder = dictionary?.typeYourMessage || "Type your message...";
  const sendMessageLabel = dictionary?.sendMessage || "Send";

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] max-w-3xl mx-auto bg-card shadow-xl rounded-lg border border-border">
      <header className="p-4 border-b border-border flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-accent text-accent-foreground">
            <PersonaIcon className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-primary">{chattingWithTemplate.replace('{personaName}', personaName)}</h2>
      </header>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} PersonaIcon={PersonaIcon} lang={lang} />
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={typeMessagePlaceholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-grow text-base"
            aria-label={typeMessagePlaceholder}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !inputValue.trim()}
            className="bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent"
            aria-label={sendMessageLabel}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <SendHorizontal className="h-5 w-5" />
            )}
            <span className="sr-only">{sendMessageLabel}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
