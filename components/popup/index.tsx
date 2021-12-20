import React, { Dispatch } from 'react';
import { Popup } from 'react-map-gl';
import styled from 'styled-components';

interface Properties {
  color: string,
  name: string,
  class: string,
  employer: string,
  type: string,
  title: string,
}

interface Geometry {
  coordinates: string[],
  type: string,
}

type AlumniType = {
  properties: Properties,
  geometry: Geometry,
}

interface Props {
  popup: AlumniType,
  setPopup: Dispatch<any>;
}

const PopupMain = styled.div`
padding: 7px 20px;
  display: flex;
  flex-direction: column;
`

const Name = styled.p`
font-weight: bold;
  font-size: 20px;
`

const Year = styled.p`
font-size: 14px;
`

const JobMain = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 18px;
`

const Title = styled(Year)`
`

const Employer = styled(Year)`
margin-top: 1px;
  font-weight: bold;
`
// renders pop up component
const PopUp: React.FC<Props> = ({ popup, setPopup }) => {
  return (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={parseFloat(popup.geometry.coordinates[0])}
        latitude={parseFloat(popup.geometry.coordinates[1])}
        closeOnClick={false}
        onClose={setPopup}
      >
        <PopupMain>
          <Name>{popup.properties.name}</Name>
          <Year>{`Class of ${popup.properties.class}`}</Year>
          <JobMain>
            {popup.properties.employer && <Employer>{popup.properties.employer}</Employer>}
            {popup.properties.title && <Title>{popup.properties.title}</Title>}
          </JobMain>
        </PopupMain>
      </Popup>
  )
}

export default PopUp;