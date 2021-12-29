import React, { Dispatch } from 'react';
import { Popup } from 'react-map-gl';
import { AlumniType } from '../../Interfaces';
import { PopupMain, Name, Year, JobMain, Employer, Title } from './styled';

interface Props {
  popup: AlumniType,
  setPopup: Dispatch<React.SetStateAction<AlumniType | null>>;
}

// renders pop up component
const PopUp: React.FC<Props> = ({ popup, setPopup }) => {
  return (
      <Popup
        tipSize={5}
        offsetLeft={6}
        offsetTop={6}
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