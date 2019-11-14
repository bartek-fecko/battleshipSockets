import styled, { keyframes } from 'styled-components';
import { pickerWidth } from './consants';

export const borderColor = '#d9d9d9';

export const ChatWrapper = styled.div`
   align-self: flex-start;
`;

export const ChatBody = styled.div`
   height: 300px;
   border: 1px solid ${borderColor};
   overflow-y: scroll;
`;

export const ChatMessageWrapper = styled.div`
   display: flex;
   justify-content: flex-end;
   max-width: 60%;
   border: 1px solid ${borderColor};
   border-radius: 5px;
   margin: 8px 8px 8px auto;
   padding: 8px;
`;

export const Input = styled.input`
   padding: 8px 16px;
   border-radius: 5px;
   width: ${pickerWidth}px;
   border: 1px solid ${borderColor};
`;

export const PickerWrapper = styled.div<{ show: boolean }>`
   display: ${({ show }) => show ? 'block' : 'none'};
   position: relative;
`;

export const InputWithPicker = styled.div`
   display: flex;
   background: #eee;
   align-items: center;
`;

export const pulse = keyframes`
   0% {
       transform: scale(0.95);
       box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
   }

   70% {
       transform: scale(1);
       box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
   }

   100% {
       transform: scale(0.95);
       box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
   }
`;

export const PickerButton = styled.img`
   margin: 0 8px;
   border-radius: 50%;
   cursor: pointer;
   box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
   transform: scale(1);
   &:hover {
      animation: ${pulse} 2s infinite;
   }
`;
