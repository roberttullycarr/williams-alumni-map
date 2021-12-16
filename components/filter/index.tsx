import * as React from "react";
import styled from 'styled-components';
import { Dispatch, useState } from 'react';


const FilterMain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: grey;
  opacity: 50%;
  cursor: pointer;
  
  :hover {
    cursor: pointer;
  }
`

const FilterPopUp = styled.div`
position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 999999;
  width: 60%;
  height: 65%;
  background-color: white;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 2.5% 3%;
`

const FPUTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  height: 13%;
  //border: 1px solid blue;
`

const FPUMain = styled.div`
  width: 100%;
  height: 87%;
`
const FPUSelectMain = styled.div`
  display: flex;
  width: 100%;
  height: 85%;
  //border: 1px solid green;
`

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  //border: 1px solid purple;
`

const FPUInputsWrap = styled.div`
  width: 95%;
  height: 88%;
  border: 1px solid black;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`

const LabelMain = styled.label`
display: flex;
  width: 100%;
  //border: 1px solid red;
  height: 30px;
  align-items: center;
  margin-bottom: 5px;
`

const LineItem = styled.p`
  margin-left: 10px;
  display: flex;
  align-items: center;
`

const FPUITitle = styled.h1`
  font-size: 15px;
  width: 100%;
  padding-left: 3%;
  margin-bottom: 5px;
`

const FPUBtns = styled.div`
  bottom: 0;
  width: 100%;
  height: 15%;
  //border: 1px solid blue;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
`

const FilterButton = styled.button`
  height: 75%;
  width: 90px;
  background-color: black;
  color: white;
  border: 1px solid black;
  margin-right: 10px;
  
  :hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }
`

const ToggleBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000000;
  width: 80px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  
  :hover {
    border: 2px solid black;
    cursor: pointer;
  }
`

interface Props {
  years: number[],
  types: string[],
  setFilterOptions: Dispatch<any>,
  filterOptions: any,
}

const Filter: React.FC<Props> = ({ years, types, setFilterOptions }) => {
  const [filter, setFilter] = useState<boolean>(false);
  const [checkedYears, setCheckedYears] = useState<number[]>([]);
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]);

  const clickHandler = () => !filter ? setFilter(true) : setFilter(false);

  const submitHandler = () => {
    setFilterOptions({years: checkedYears, types: checkedTypes});
    console.log(years);
    clickHandler();
  }

  const changeHandler = (e: any, value: any) => {
    if (typeof value === 'number'){
      let itemID = checkedYears.indexOf(value);
      if (itemID === -1){
        checkedYears.push(value)
      } else {
        checkedYears.splice(itemID, 1);
      }
    } else {
      let itemID = checkedTypes.indexOf(value);
      if (itemID === -1){
        checkedTypes.push(value)
      } else {
        checkedTypes.splice(itemID, 1);
      }
    }
  };

  const clearHandler = () => {
    console.log(years);
    setCheckedYears(years);
    setCheckedTypes(types);
  }

    const selectAllHandler = () => {
    setCheckedYears([]);
    setCheckedTypes([]);
  }


  return (
    <>
       {!filter ? <ToggleBtn onClick={clickHandler}>Filter</ToggleBtn> : null}
      {filter ?
      <>
      <FilterMain onClick={clickHandler}/>
      <FilterPopUp>
        <FPUTitle>FILTER ALUMNI</FPUTitle>
        <FPUMain>
          <FPUSelectMain>
            <CategoryContainer>
              <FPUITitle>GRADUATION YEAR</FPUITitle>
              <FPUInputsWrap>
                {years.map((year, id) =>
                      <LabelMain>
                        <input key={Math.random()} type='checkbox' placeholder='years' value={year}
                               defaultChecked={!checkedYears.includes(year)}
                               onChange={(e) => changeHandler(e, year)}
                        />
                        <LineItem>{year}</LineItem>
                      </LabelMain>
                    )
                }
              </FPUInputsWrap>
            </CategoryContainer>
            <CategoryContainer>
              <FPUITitle>INDUSTRY</FPUITitle>
              <FPUInputsWrap>
                {types.map((type, id) =>
                <LabelMain>
                  <input key={Math.random()} type='checkbox' placeholder='industry' value={type}
                         onChange={(e) => changeHandler(e, type)}
                         defaultChecked={!checkedTypes.includes(type)}
                  />
                  <LineItem>{type}</LineItem>
                </LabelMain>
                )}
              </FPUInputsWrap>
            </CategoryContainer>
          </FPUSelectMain>
          <FPUBtns>
            <FilterButton onClick={clearHandler}>CLEAR ALL</FilterButton>
            <FilterButton onClick={selectAllHandler}>SELECT ALL</FilterButton>
            <FilterButton onClick={submitHandler}>SAVE</FilterButton>
          </FPUBtns>
        </FPUMain>
      </FilterPopUp>
      </>
        : null}
    </>
  )
}

export default Filter;