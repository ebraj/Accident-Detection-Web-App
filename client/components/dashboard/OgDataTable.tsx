"use client";
import React, { useState } from "react";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Accident, OgAccident, makeData } from "@/helpers/makeData";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type Props = {};

export default function OgDataTable({}: Props) {
  const {
    data: accidents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accidents"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8080/api/v1/accident/all");
      return await response.json();
    },
  });

  const sortedAccidents = React.useMemo(() => {
    if (accidents && accidents.datas) {
      return [...accidents.datas].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    return [];
  }, [accidents]);

  const columns = React.useMemo<ColumnDef<OgAccident, any>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "id",
        cell: (info) => info.getValue().slice(0, 5) + "...",
        header: () => <span>ID</span>,
        footer: () => <span>ID</span>,
      },
      {
        accessorFn: (row) => row.date,
        id: "date",
        cell: (info) => info.getValue(),
        header: () => <span>Date & Time</span>,
        footer: () => <span>Date & Time</span>,
      },
      {
        accessorFn: (row) => row.address,
        id: "address",
        cell: (info) => info.getValue(),
        header: () => <span>Address</span>,
        footer: () => <span>Address</span>,
      },

      // {
      //   accessorFn: (row) => row.city,
      //   id: "city",
      //   cell: (info) => info.getValue(),
      //   header: () => <span>City</span>,
      //   footer: () => <span>City</span>,
      // },
      // {
      //   accessorFn: (row) => row.latitude,
      //   id: "latitude",
      //   cell: (info) => info.getValue(),
      //   header: () => <span>Latitude</span>,
      //   footer: () => <span>Latitude</span>,
      // },
      // {
      //   accessorFn: (row) => row.longitude,
      //   id: "longitude",
      //   cell: (info) => info.getValue(),
      //   header: () => <span>Longitude</span>,
      //   footer: () => <span>Longitude</span>,
      // },
      {
        accessorFn: (row) => row.severityInPercentage,
        id: "severityInPercentage",
        cell: (info) => info.getValue(),
        header: () => <span>Severety(%)</span>,
        footer: () => <span>Severety(%)</span>,
      },
      {
        accessorFn: (row) => row.severity,
        id: "severity",
        cell: (info) => info.getValue(),
        header: () => <span>Severty</span>,
        footer: () => <span>Severty</span>,
      },
      {
        id: "details",
        cell: (info) => (
          <Link
            href={`accident/${info.row.original.id}`}
            className="flex items-center justify-center space-x-1 text-orange-600 font-bold underline"
          >
            <span>View</span>
            <span>
              <ArrowUpRight width={20} height={20} />
            </span>
          </Link>
        ),
        header: () => <span>View Details</span>,
        footer: () => <span>View Details</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: sortedAccidents || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-hidden">
      <h2 className="text-xl sm:text-2xl pb-5">Accident Datas</h2>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-500">
        <table className="lg:table-fixed bg-white border-collapse overflow-hidden w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="border px-4 py-2">
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="border px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pt-3 flex space-x-5 items-center">
          <div>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </button>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </button>
          </div>

          {/* <div>
            <p>Jump to page</p>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </div> */}
          <div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border border-gray-300 rounded px-5 py-2 bg-white"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <p className="font-bold">Page ~ </p>
            <p>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
