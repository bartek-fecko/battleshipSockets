import styled from 'styled-components';

export const WinnerModalWrapper = styled.div<{ isWinner: boolean }>`
   width: 100vw;
   position: fixed;
   text-align: center;
   background-color: ${({ isWinner }) => isWinner ? '#006d0099' : 'rgba(0, 0, 0, 0.89)'};
   top: 0;
   left: 0;
   padding: 0 16px;
   margin: 0;
   color: white;
   font-size: 2em;
   line-height: 1.5;
   z-index: 100;
   cursor: pointer;
`;
