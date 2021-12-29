import styled from 'styled-components';

export const PopupMain = styled.div`
padding: 7px 28px 7px 20px;
  display: flex;
  flex-direction: column;
`

export const Name = styled.p`
font-weight: bold;
  font-size: 20px;
`

export const Year = styled.p`
font-size: 14px;
`

export const JobMain = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 18px;
`

export const Title = styled(Year)`
`

export const Employer = styled(Year)`
margin-top: 1px;
  font-weight: bold;
`
