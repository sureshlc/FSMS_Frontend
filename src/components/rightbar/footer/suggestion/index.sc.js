import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  // gap: 0.5rem;
  max-width: 67.5rem;
  max-height: 4rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
  }
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0;
  background: transparent;
`;

export const Box = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  min-width: calc(5.125rem - 41.6px);
  max-height: 2.313rem;
  min-height: calc(2.13rem - 10.67px);
  background: white;
  color: #383874;
  border-radius: 3.75rem;
  border: 1px solid #a2aed4;
  padding: 6px 20px 6px 20px;
  white-space: nowrap;
  margin: 0.3125rem;
  cursor: pointer;
  &.selected {
    background: ${({ theme }) => theme.main};
    color: #ffffff;

    &:hover {
      color: #ffffff;
    }
  }
  &:hover:not(.selected) {
    // border: 1px solid ${({ theme }) => theme.main};
    color: ${({ theme }) => theme.main};
  }

  &:hover {
    // border : 1px solid ${({ theme }) => theme.main} ;
    color: ${({ theme }) => theme.main};
  }
`;