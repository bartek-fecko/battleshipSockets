import * as React from 'react';
import { WinnerModalWrapper } from './styled';

interface WinnerModalProps {
   isWinner: boolean;
}
const WinnerModal: React.FC<WinnerModalProps> = ({ children, isWinner }) => {
   const [display, setDisplay] = React.useState(true);

   const onDisplay = () => {
      setDisplay(false);
   };

   return (
      display && (
         <WinnerModalWrapper
            isWinner={isWinner}
            onClick={onDisplay}
         >{children}</WinnerModalWrapper>
      ));
};

export default WinnerModal;
