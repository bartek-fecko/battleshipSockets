import * as React from 'react';
import styled from 'styled-components';
// @ts-ignore-next-line: can't find path
import * as shipSvg from '../../cruise.svg';

const Wrapper = styled.div`
   display: flex;
   padding: 20px;
`;

const Logo = styled.div`
   font-weight: bold;
   align-self: flex-start;
   font-size: 2em;
   margin-left: 64px;
`;

const LogoImage = styled.img`
   font-weight: bold;
   align-self: flex-start;
   font-size: 2em;
   margin-left: 8px;
`;

const Nav: React.FC = () => {

   return (
      <Wrapper>
         <div style={{ display: 'none' }}>Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
            from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
         </div>
         <Logo>Battleship</Logo>
         <LogoImage
            src={shipSvg}
            width="32px"
            height="32px"
         />
      </Wrapper>
   );
};

export default Nav;
