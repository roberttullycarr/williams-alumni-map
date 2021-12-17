import * as React from "react";
import styled from 'styled-components';
import { ToggleBtn, FilterMain, FPUTitle, FilterPopUp, FPUMain, FPUSelectMain, CategoryContainer, FPUITitle, FPUInputsWrap, LabelMain, LineItem, FPUBtns, FilterButton } from './styled';
import { Dispatch, useState } from 'react';

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