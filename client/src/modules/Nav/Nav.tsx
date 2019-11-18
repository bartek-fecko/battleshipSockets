import { appVariables } from '#/config/appConstants';
// @ts-ignore-next-line: can't find path
import * as shipSvg from '#/public/cruise.svg';
import * as React from 'react';
import { Logo, LogoImage, LogoWrapper, NavWrapper, TotalPlayers } from './styled';

const Nav: React.FC = () => {
   const [totalPlayers, setTotalPlayers] = React.useState();
   const socket = appVariables.socket;

   socket.on('totalUsers', (allPlayers: number) => setTotalPlayers(allPlayers));

   return (
      <NavWrapper>
         <LogoWrapper>
            <div style={{ display: 'none' }}>Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
               from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
            <Logo>Battleship</Logo>
            <LogoImage src={shipSvg} />
         </LogoWrapper>
         <TotalPlayers>
            {totalPlayers} online players
         </TotalPlayers>
      </NavWrapper>
   );
};

export default Nav;
