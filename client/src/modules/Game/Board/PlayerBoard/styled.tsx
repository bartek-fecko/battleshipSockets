import { BoardGridWrapper } from '#/game/Board/styled';
import styled from 'styled-components';

export const BoardWrapper = styled.div`
   padding: 0 30px 30px 10px;
`;

export const PlayerBoardGrid = styled(BoardGridWrapper) <{ inactive: boolean }>`
   z-index: ${({ inactive }) => inactive ? '-1' : '1'};
`;
