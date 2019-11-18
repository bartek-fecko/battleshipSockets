import styled from 'styled-components';
import { borderColor } from '../styled';

export const ChatBodyWrapper = styled.div`
   display: flex;
   align-items: baseline;
   padding-left: 8px;
`;

export const ChatBodyText = styled.div`
   display: flex;
   justify-content: flex-end;
   flex-direction: column;
   max-width: 80%;
   min-width: 50%;
   border: 1px solid ${borderColor};
   border-radius: 5px;
   margin: 8px 8px 8px auto;
   padding: 8px;
`;

export const UserInfoItem = styled.span`
   font-size: 0.7em;
`;

export const UserInfo = styled.div`
   text-align: right;
   & > :last-child {
      display: none;
   }
   &:hover > :last-child{
      display: block;
   }
`;
