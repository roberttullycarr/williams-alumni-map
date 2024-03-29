import styled from '@emotion/styled';

export const PopupMain = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;

  .mapboxgl-popup-close-button{
    outline: none !important;
  }
`

export const Name = styled.p`
font-weight: bold;
  font-size: 20px;
  margin-bottom: .5rem;
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
