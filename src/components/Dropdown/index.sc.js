import { css, styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 2rem;
  background-color: ${({ disable }) => (!disable ? "#fff" : "#E8E8E8")};
  border-radius: 3px;
  border: 1px solid ${({ color, open }) => (open ? color : "#d9d9d9")};
  position: relative;
  height: 32px;
  color: ${({ disable }) => (!disable ? "#2F3446" : "#A1AAB3")};
  cursor: ${({ disable }) => (!disable ? "pointer" : "not-allowed")};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 10px;
  padding: 3.04px 3.04px 3.04px 0;
  gap: 0.625rem;
  .dropdown-arrow-icon path {
    fill: ${({ color, disable }) => (!disable ? color : "#A1AAB3")};
  }
`;

export const Title = styled.div`
  color: #141630;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: -0.02125rem;
  margin: auto 0;
  text-transform: capitalize;
  white-space: nowrap;
  ${({ placeholder }) =>
    placeholder &&
    css`
      color: #909aa4;
      font-weight: 400;
    `}
  ${({ isString, arrow }) =>
    isString
      ? css`
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          width: ${({ arrow }) => (arrow ? "calc(100% - 1.25rem)" : "100%")};
        `
      : css`
          display: flex;
          align-items: center;
        `}
`;

export const ItemsContainer = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #f2f6fa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 14px;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: row;
  font-size: 0.875rem;
`;
export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 7px;
`;
export const Symbol = styled.span`
  color: #e20074;
  margin-right: 0.25rem;
`;
