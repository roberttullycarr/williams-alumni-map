import React, { useState } from 'react'
import styled from "@emotion/styled";
import { ICategories } from '../../Interfaces';
import { MarkerMain } from '../Markers/styled';

interface IKeyProps {
  categories: ICategories[];
}

const Key = ({ categories }: IKeyProps) => {
  const [keyOpen, setKeyOpen] = useState(false);

  return (
    <KeyWrapper keyOpen={keyOpen}>
      <KeyButton onClick={() => setKeyOpen(!keyOpen)}>
        <img src='/door-key-icon.svg' style={{ height: "50%"}} />
      </KeyButton>
      <KeyMain>
        <KeyBody>
          {
            categories && categories.map((category, i) => {
              return (
                <CategoryMain key={i}>
                  <MarkerMain color={category.color} />
                  {category.name}
                </CategoryMain>
              )
            })
          }
        </KeyBody>
      </KeyMain>
    </KeyWrapper>
  )
}

export default Key;

interface IKeyWrapperProps {
  keyOpen: boolean;
}

const KeyWrapper = styled.div<IKeyWrapperProps>`
  position: absolute;
  left: ${({keyOpen}) => keyOpen ? "-1px" : "-250px"};
  top: 50%;
  transform: translateY(-50%);
  transition: left .25s ease-in;
`

const KeyButton = styled.button`
  width: 35px;
  height: 30px;
  position: absolute;
  right: -34px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1 !important;
  background: white;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;


`

const KeyMain = styled.div`
  background: white;
  border: 1px solid black;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 250px;
`

const KeyBody = styled.div`
  display: grid;
  flex: 1;
  /* border: 1px solid green; */
  grid-template-columns: repeat(1fr);
  grid-column-gap: .5rem;
  grid-row-gap: .5rem;
`

const CategoryMain = styled.div`
/* border: 1px solid red; */
display: flex;
align-items: center;
gap: .5rem;
`



