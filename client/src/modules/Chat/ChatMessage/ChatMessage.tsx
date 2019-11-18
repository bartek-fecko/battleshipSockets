import * as React from 'react';
import {
   ChatBodyText,
   ChatBodyWrapper,
   UserInfo,
   UserInfoItem,
} from './styled';

interface ChatMessageProps {
   message: {
      userName: string;
      message: string;
      date: string;
   };
}

const ChatMessage: React.FC<ChatMessageProps> = ({
   message: { userName, message: text, date },
}) => {
   return (
      <ChatBodyWrapper>
         <ChatBodyText>
            <UserInfo>
               <UserInfoItem>by <i>{userName}</i> </UserInfoItem>
               <UserInfoItem>{date.split(' ')[1]}</UserInfoItem>
               <UserInfoItem>{date.split(' ')[0]}</UserInfoItem>
            </UserInfo>
            {text}
         </ChatBodyText>
      </ChatBodyWrapper>
   );
};

export default ChatMessage;
