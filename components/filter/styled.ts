import styled from '@emotion/styled';

interface mainProps {
  alumnifilter: string,
}

interface popupProps {
  alumnipopupfilter: string,
}

export const FilterMain = styled.div<mainProps>`
  position: absolute;
  visibility: ${(p) => p.alumnifilter === "true" ? "visible" : 'hidden'};
  opacity: ${(p) => p.alumnifilter === "true" ? '50%' : '0'};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: grey;
  cursor: pointer;
  transition: opacity 0.3s ease;
  :hover {
    cursor: pointer;
  }
  
`

export const FilterPopUp = styled.div<popupProps>`
  position: absolute;
  display: flex;
  visibility: ${(p) => p.alumnipopupfilter === "true" ? "visible" : 'hidden'};
  opacity: ${(p) => p.alumnipopupfilter === "true" ? '1' : "0"};
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
  transition: opacity 0.3s ease;
  
  @media all and (max-width: 32rem) {
  width: 100%;
  }
  
  @media all and (max-height: 32rem) {  
  height: 100%;
  }
`

export const FPUTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  height: 13%;
  //border: 1px solid blue;
`

export const FPUMain = styled.div`
  width: 100%;
  height: 87%;
`
export const FPUSelectMain = styled.div`
  display: flex;
  width: 100%;
  height: 85%;

  @media all and (max-width: 600px){
    flex-direction: column;
  }
`

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  
  @media all and (max-width: 600px){
    width: 100%;
    height: 50%;
    padding-bottom: 1rem;
  }
`

export const FPUInputsWrap = styled.div`
  width: 95%;
  height: 88%;
  border: 1px solid black;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
`

export const LabelMain = styled.label`
  display: flex;
  width: 100%;
  gap: 1rem;
  height: 30px;
  align-items: center;
  margin-bottom: 5px;
`

export const LineItem = styled.p`
  margin-left: 10px;
  display: flex;
  align-items: center;
`

export const FPUITitle = styled.h1`
  font-size: 15px;
  width: 100%;
  //padding-left: 3%;
  margin-bottom: 5px;
`

export const FPUITitleMain = styled.div`
width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const AllBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid black;
  background-color: white;
  color: black;
  
  cursor: pointer;
`

export const FPUBtns = styled.div`
  bottom: 0;
  width: 100%;
  height: 15%;
  //border: 1px solid blue;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  
`

export const FilterButton = styled.button`
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

export const FilterCancelButton = styled(FilterButton)`
background-color: white;
color: black;

:hover {
  background-color: black;
  color: white;
}
`

export const ToggleBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
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