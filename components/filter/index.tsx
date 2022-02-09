import * as React from "react";
import { ToggleBtn, FilterMain, FPUTitle, FilterPopUp, FPUMain, FPUSelectMain, CategoryContainer, FPUITitle, FPUInputsWrap, LabelMain, LineItem, FPUBtns, FilterButton, FPUITitleMain, AllBtn } from './styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterOptions } from '../../Interfaces';


interface Props {
  years: number[],
  types: string[],
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>,
  filterOptions: FilterOptions,
}

const Filter: React.FC<Props> = ({ years, types, setFilterOptions }) => {
  const [alumniFilter, setAlumniFilter] = useState<any>(false);
  const [checkedYears, setCheckedYears] = useState<number[]>(years);
  const [checkedTypes, setCheckedTypes] = useState<string[]>(types);
  const [allYears, setAllYears] = useState<boolean>(true);
  const [allTypes, setAllTypes] = useState<boolean>(true);

  const clickHandler = () => alumniFilter === true ? setAlumniFilter(false) : setAlumniFilter(true);

  const submitHandler = () => {
    setFilterOptions({years: checkedYears, types: checkedTypes});
    clickHandler();
  }

  const changeHandler = (value: string | number) => {
    if (typeof value === 'number'){
      let itemID = checkedYears.indexOf(value);
      itemID === -1 ? checkedYears.push(value) : checkedYears.splice(itemID, 1);
    } else {
      let itemID = checkedTypes.indexOf(value);
      itemID === -1 ? checkedTypes.push(value) : checkedTypes.splice(itemID, 1);
    }
  };

  const yearHandler = () => {
    setAllYears(!allYears);
    allYears ? setCheckedYears([]) : setCheckedYears(years);
  }
    const typeHandler = () => {
    setAllTypes(!allTypes);
    allTypes ? setCheckedTypes([]) : setCheckedTypes(types);
  }

  return (
    <>
       {!alumniFilter? <ToggleBtn onClick={() => clickHandler()}>{'Filter'}</ToggleBtn> : null}
      <>
      <FilterMain onClick={() => clickHandler()} alumniFilter={alumniFilter}/>
      <FilterPopUp alumniPopupFilter={alumniFilter}>
        <FPUTitle>FILTER ALUMNI</FPUTitle>
        <FPUMain>
          <FPUSelectMain>
            <CategoryContainer>
              <FPUITitleMain>
                <FPUITitle>GRADUATION YEAR</FPUITitle>
                 <AllBtn onClick={yearHandler}>{checkedYears.length === years.length ? "✔︎" : ''}</AllBtn>
              </FPUITitleMain>
              <FPUInputsWrap>
                {years.map((year) =>
                      <LabelMain key={Math.random()}>
                        <input key={Math.random()} type='checkbox' placeholder='years' value={year}
                               defaultChecked={checkedYears.includes(year)}
                               onChange={() => changeHandler(year)}
                        />
                        <LineItem>{year}</LineItem>
                      </LabelMain>
                    )
                }
              </FPUInputsWrap>
            </CategoryContainer>
            <CategoryContainer>
              <FPUITitleMain>
                <FPUITitle>INDUSTRY</FPUITitle>
                <AllBtn onClick={typeHandler}>{checkedTypes.length === types.length ? "✔︎" : ""}</AllBtn>
              </FPUITitleMain>
              <FPUInputsWrap>
                {types.map((type) =>
                <LabelMain key={Math.random()}>
                  <input key={Math.random()} type='checkbox' placeholder='industry' value={type}
                         onChange={() => changeHandler(type)}
                         defaultChecked={checkedTypes.includes(type)}
                  />
                  <LineItem>{type}</LineItem>
                </LabelMain>
                )}
              </FPUInputsWrap>
            </CategoryContainer>
          </FPUSelectMain>
          <FPUBtns>
            <FilterButton onClick={submitHandler}>SAVE</FilterButton>
          </FPUBtns>
        </FPUMain>
      </FilterPopUp>
      </>
    </>
  )
}

export default Filter;