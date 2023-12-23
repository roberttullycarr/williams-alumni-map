import styled from '@emotion/styled';

export const MarkerMain = styled.div`
  border: 1px solid ${props => props.color};
  background-color: ${props => props.color};
  border-radius: 50%;
  width: 12px;
  height: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  :hover {
    cursor: pointer;
    transform: scale(150%);
    border: 1px solid black;
  }
`

export const ClusterMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: black;
  font-size: 12px;
  color: white;
  border-radius: 50%;
  cursor: pointer;
`