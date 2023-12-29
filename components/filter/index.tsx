import * as React from "react";
import { ToggleBtn, FilterMain, FPUTitle, FilterPopUp, FPUMain, FPUSelectMain, CategoryContainer, FPUITitle, FPUInputsWrap, LabelMain, LineItem, FPUBtns, FilterButton, FPUITitleMain, AllBtn, FilterCancelButton } from './styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterOptions, ICategories } from '../../Interfaces';
import { MarkerMain } from "../Markers/styled";


interface IFilterProps {
  years: number[],
  categoryNames: string[],
  categories: ICategories[],
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>,
  filterOptions: FilterOptions,
}

const Filter = ({ years, categoryNames, categories, setFilterOptions }: IFilterProps) => {
  const [alumniFilter, setAlumniFilter] = useState<boolean>(false);
  const [checkedYears, setCheckedYears] = useState<number[]>(years);
  const [checkedCategories, setCheckedCategories] = useState(categoryNames);
  const [allYears, setAllYears] = useState<boolean>(true);
  const [allCategories, setAllCategories] = useState<boolean>(true);

  const clickHandler = () => alumniFilter === true ? setAlumniFilter(false) : setAlumniFilter(true);

  const submitHandler = () => {
    setFilterOptions({years: checkedYears, categories: checkedCategories});
    clickHandler();
  }

  const yearChangeHandler = (value: number) => {
      let itemID = checkedYears.indexOf(value);
      itemID === -1 ? checkedYears.push(value) : checkedYears.splice(itemID, 1);
  };

  const categoryChangeHandler = (value: string) => {
    let itemID = checkedCategories.indexOf(value);
    itemID === -1 ? checkedCategories.push(value) : checkedCategories.splice(itemID, 1);
  }

  const yearHandler = () => {
    setAllYears(!allYears);
    allYears ? setCheckedYears([]) : setCheckedYears(years);
  }
    const typeHandler = () => {
    setAllCategories(!allCategories);
    allCategories ? setCheckedCategories([]) : setCheckedCategories(categoryNames);
  }

  return (
    <>
       {!alumniFilter? <ToggleBtn onClick={() => clickHandler()}>{'Filter'}</ToggleBtn> : null}
      <>
      <FilterMain onClick={() => clickHandler()} alumnifilter={`${alumniFilter}`}/>
      <FilterPopUp alumnipopupfilter={`${alumniFilter}`}>
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
                               onChange={() => yearChangeHandler(year)}
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
                <AllBtn onClick={typeHandler}>{checkedCategories.length === categoryNames.length ? "✔︎" : ""}</AllBtn>
              </FPUITitleMain>
              <FPUInputsWrap>
                {categoryNames.map((category) =>
                {
                  const categoryObj = categories.find(x => x.name === category);
                  const color = categoryObj ? categoryObj.color : null;
                  return (
                    <LabelMain key={Math.random()}>
                      <input key={Math.random()} type='checkbox' placeholder='industry' value={category}
                             onChange={() => categoryChangeHandler(category)}
                             defaultChecked={checkedCategories.includes(category)}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%"}}>
                        <LineItem>{category}</LineItem>
                        {color && <MarkerMain color={color} />}
                      </div>
                    </LabelMain>
                  )
                }
                )}
              </FPUInputsWrap>
            </CategoryContainer>
          </FPUSelectMain>
          <FPUBtns>
            <FilterButton onClick={submitHandler}>SAVE</FilterButton>
            <FilterCancelButton onClick={clickHandler}>CANCEL</FilterCancelButton>
          </FPUBtns>
        </FPUMain>
      </FilterPopUp>
      </>
    </>
  )
}

export default Filter;