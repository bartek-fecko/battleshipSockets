import { notReadyToPlayMessage } from '#/game/Board/constants';
import { BoardGridWrapper } from '#/game/Board/styled';
import styled from 'styled-components';

export const EnemyPlayerBoardGrid = styled(BoardGridWrapper)<{ readyToPlay?: boolean }>`
   &:after {
      content: "${notReadyToPlayMessage}";
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: ${({ readyToPlay }) => readyToPlay ? 'none' : 'block'};
   }
`;

export const TurnInformation = styled.div`
   font-size: 0.8em;
   margin: 8px 0;
`;

export const MyTurn = styled(TurnInformation)`
   color: green;
`;

export const EnemyTurn = styled(TurnInformation)`
   color: red;
`;
