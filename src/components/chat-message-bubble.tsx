import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; 
import { User, type LucideIcon } from 'lucide-react';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  PersonaIcon: LucideIcon;
}

export default function ChatMessageBubble({ message, PersonaIcon }: ChatMessageBubbleProps) {
  const isUser = message.sender === 'user';
  const IconComponent = isUser ? User : PersonaIcon;

  const formattedTimestamp = new Date(message.timestamp).toLocaleTimeString('cs', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <IconComponent className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-lg px-4 py-3 shadow',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-muted-foreground rounded-bl-none'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left"
        )}>
            {formattedTimestamp}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <IconComponent className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
