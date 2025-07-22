import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useImperativeHandle, type JSX, type Ref } from "react";

interface DataTableProps<TData extends { id: number }, TValue> {
  title: string;
  tableButtons?: JSX.Element;
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  ref?: Ref<unknown>;
}

function DataTable<TData extends { id: number }, TValue>({
  title,
  tableButtons,
  columns,
  data,
  ref,
}: DataTableProps<TData, TValue>) {
  useImperativeHandle(
    ref,
    () => {
      return {
        table,
      };
    },
    []
  );
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getRowId: (row) => String(row.id),
  });

  return (
    <div className="rounded-md border">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">{title}</div>
        <div className="flex gap-2">{tableButtons}</div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
