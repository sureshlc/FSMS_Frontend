import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
export const Table = styled.table`
  width: 100%;
  height: 100%;
  /* table-layout: fixed; */
  border-collapse: collapse;
`;
export const THead = styled.thead`
  position: sticky;
  top: -1px;
`;
export const TBody = styled.tbody``;
export const TR = styled.tr`
  border: 1px solid #c2ccd9;
  background: #eaecf4;
`;
export const TH = styled.th`
  width: 14rem;
  height: 2.5rem;
  font-size: 0.85rem;
  border-right: 1px solid #c2ccd9;
`;
export const TD = styled.td`
  width: 14rem;
  height: 2.5rem;
  border: 1px solid #c2ccd9;
  background: #fff;
`;
export const TableCell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;
export const NoData = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c2ccd9;
`;
