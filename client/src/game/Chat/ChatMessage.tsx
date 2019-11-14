import * as React from 'react';
import { ChatMessageWrapper } from './styled';

interface ChatMessageProps {
   text: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text }) => {

   return (
      <ChatMessageWrapper>
         {text}
      </ChatMessageWrapper>
   );
};

export default ChatMessage;
