import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { tableData } from "../../mock-data/tableData";
import {
  NoData,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Table,
  TableCell,
  TableWrapper,
} from "./index.sc";

const CustomTable = () => {
  const [data, setData] = React.useState(() => [...tableData]);
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (props) => <TableCell>{props.getValue()}</TableCell>,
    },
    {
      header: "First Name",
      accessorKey: "first_name",
      cell: (props) => <TableCell>{props.getValue()}</TableCell>,
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
      cell: (props) => <TableCell>{props.getValue()}</TableCell>,
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (props) => <TableCell>{props.getValue()}</TableCell>,
    },
    {
      header: "Gender",
      accessorKey: "gender",
      cell: (props) => <TableCell>{props.getValue()}</TableCell>,
    },
    {
      header: "DOB",
      accessorKey: "dob",
      cell: (props) => <TableCell>{props.getValue()}</TableCell>,
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <TableWrapper>
      <Table cellSpacing="0" cellPadding="0">
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TR key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TH key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody>
          {table.getRowModel().rows.map((row) => (
            <TR key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TD key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TD>
              ))}
            </TR>
          ))}
        </TBody>
      </Table>
      {table.getRowModel().rows.length === 0 && (
        <NoData>No rows to display</NoData>
      )}
    </TableWrapper>
  );
};

export default CustomTable;
