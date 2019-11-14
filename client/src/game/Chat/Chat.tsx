import { appVariables } from '#/App';
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
      }
   };

   const addMessage = (allMessages: string[]) => setMessages(allMessages);

   socket.on('message', addMessage);

   return (
      <ChatWrapper>
         <ChatBody>
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
                  placeholder="Your message"
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
            <div style={{ display: 'none' }}>Icons made by
                <a href="https://www.flaticon.com/authors/smashicons"
                  title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"
                     title="Flaticon">www.flaticon.com</a>
            </div>
         </form>
      </ChatWrapper>
   );
};

export default Chat;