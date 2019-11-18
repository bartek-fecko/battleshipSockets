import styled, { keyframes } from 'styled-components';

export const WelcomeWrapper = styled.div`
   width: 100vw;
   height: 100vh;
   background-color: rgba(0,0,0,0.8);
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   z-index: 999;
`;

export const slideUp = keyframes`
   0% {
      opacity: 0;
      transform: translateY(100%);
   }
   100% {
      opacity: 1;
      transform: translateY(0%);
   }
`;

export const WelcomeBody = styled.div`
   text-align: center;
   background: white;
   animation: ${slideUp} 1.5s;
   padding: 200px 0;
   width: 90vw;
`;

export const NameInput = styled.input`
   padding: 5px 15px;
`;

export const SubmitButton = styled.button`
   padding: 5px 15px;
   cursor: pointer;
   background: white;
   color: orange;
   outline: none;
   border: 1px solid orange;
   font-family: Roboto, San-Serif;
   font-size: 0.9em;
   border-radius: 4px;
   border-left: 0;
   border-bottom-left-radius: 0;
   border-top-left-radius: 0;
`;

export const NameWrapper = styled.div`
   display: flex;
   justify-content: center;
`;

export const InputError = styled.div`
   color: red;
   margin: 8px;
   min-height: calc(1em + (8px * 2));
`;
