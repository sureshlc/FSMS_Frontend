import styled from "styled-components";

export const L3ViewWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
`;
export const L3HeaderWrp = styled.div`
  width: 100%;
  height: 5rem;
  padding: 0 1.9rem;
`;
export const L3Body = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0 1.9rem;
`;
export const GraphView = styled.div`
  width: 100%;
  height: 16rem;
  background-color: #f3f7fc;
  padding: 1.5rem 2.5rem;
`;
export const TableView = styled.div`
  width: 100%;
  height: calc(100% - 16rem);
  /* min-height: calc(100% - 16rem); */
  background-color: #f3f7fc;
  padding: 1rem 0.9rem;
`;
