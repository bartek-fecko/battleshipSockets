import { appVariables } from '#/config/appConstants';
import * as React from 'react';
import { NameInputErrors, nameMaxLength } from './constants';
import {
   InputError,
   NameInput,
   NameWrapper,
   SubmitButton,
   WelcomeBody,
   WelcomeWrapper,
} from './styled';

const WelcomeScreen: React.FC = () => {
   const socket = appVariables.socket;
   const [display, setDisplay] = React.useState(true);
   const [inputError, setInputError] = React.useState('');
   const [name, setName] = React.useState('');

   const submitHandler = () => {
      if (!name) {
         setInputError(NameInputErrors.NoName);
         return;
      }
      if (!inputError) {
         socket.emit('setUserName', { name, id: socket.id });
         setDisplay(false);
      }
   };

   const inputNameHandler = (e: React.ChangeEvent) => {
      setInputError('');
      const nameLength = (e.target as HTMLInputElement).value;
      if (nameLength.trim().length > nameMaxLength) {
         setInputError(NameInputErrors.NameToLoong);
         return;
      }
      if (!nameLength.trim().length) {
         setInputError(NameInputErrors.NoName);
         return;
      }
      setName(nameLength);
   };

   return (
      display && (
         <WelcomeWrapper>
            <WelcomeBody>
               <h2>Welcome to battleship game.</h2>
               <p>To start a game, please give me your name.</p>
               <NameWrapper>
                  <NameInput
                     type="text"
                     placeholder="Your name"
                     value={name}
                     onChange={inputNameHandler}
                  />
                  <SubmitButton onClick={submitHandler}>WYŚLIJ</SubmitButton>
               </NameWrapper>
               {inputError && <InputError>{inputError}</InputError>}
            </WelcomeBody>
         </WelcomeWrapper>
      ));
};

export default WelcomeScreen;
