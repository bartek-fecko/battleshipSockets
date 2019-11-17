import { appVariables } from '#/config/appConstants';
// @ts-ignore-next-line: can't find path
import * as smileSvg from '#/public/happy.svg';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import * as React from 'react';
import ChatMessage from './ChatMessage';
import { pickerWidth } from './consants';
import {
   ChatBody,
   ChatWrapper,
   Input,
   InputWithPicker,
   PickerButton,
   PickerWrapper,
} from './styled';

const Chat: React.FC = () => {
   const [userMessage, setUserMessage] = React.useState('');
   const [messages, setMessages] = React.useState<string[]>([]);
   const [showPicker, setShowPicker] = React.useState(false);
   const socket = appVariables.socket;
   const chatBodyRef = React.useRef<HTMLDivElement>();

   React.useEffect(() => {
      scrollChat();
   }, []);

   const handleInputChange = (e) => {
      setUserMessage(e.target.value);
   };

   const handleShowPicker = () => {
      setShowPicker(!showPicker);
   };

   const addEmoji = (e) => {
      const emoji = e.native;
      setUserMessage(userMessage + emoji);
   };

   const onInputKeyDown = (e: React.KeyboardEvent) => {
      if (e.keyCode === 13) {
         e.preventDefault();
         if (!userMessage.trim()) {
            return;
         }
         socket.emit('message', userMessage);
         setUserMessage('');
         setShowPicker(false);
      }
   };

   const scrollChat = () => {
      if (chatBodyRef && chatBodyRef.current) {
         chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
   };

   const addMessage = (allMessages: string[]) => {
      setMessages(allMessages);
      scrollChat();
   };

   socket.on('message', addMessage);

   return (
      <ChatWrapper>
         <ChatBody ref={chatBodyRef}>
            {messages.map((message, i) => (
               <ChatMessage key={i} text={message} />
            ))}
         </ChatBody>
         <form>
            <PickerWrapper
               show={showPicker}
            >
               <Picker
                  set="facebook"
                  showPreview={false}
                  showSkinTones={false}
                  size={200}
                  onSelect={addEmoji}
                  style={{
                     position: 'absolute',
                     transform: 'translateY(-100%)',
                     width: `${pickerWidth}px`,
                  }}
               />
            </PickerWrapper>
            <InputWithPicker>
               <Input
                  type="text"
                  value={userMessage}
                  onChange={handleInputChange}
                  placeholder="Your message. Hit enter to send."
                  onKeyDown={onInputKeyDown}
               />
               <PickerButton
                  src={smileSvg}
                  width={24}
                  height={24}
                  alt="emoji picker button"
                  onClick={handleShowPicker}
               />
            </InputWithPicker>
         </form>
      </ChatWrapper>
   );
};

export default Chat;
