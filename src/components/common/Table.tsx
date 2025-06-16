import React, { useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";
import "../Styles/Table.css";
import Button from "./Button";
import { useDebounce } from "@/hooks/useDebounce";

type Column<T> = {
  header: any;
  accessor: keyof T;
  cellRenderer?: (value: any, row: T) => React.ReactNode;
};

type Props = {
  data: any[];
  columns: Column<any>[];
  enableSearch?: boolean;
  enableSort?: boolean;
  enableFilter?: boolean;
  enablePagination?: boolean;
  filterOptions?: { label: string; value: string }[];
  handleSearch?: (value: string) => void;
  handleFilter?: (value: string) => void;
};

const Table = ({
  data,
  columns,
  enableSearch = true,
  enableSort = true,
  enableFilter = true,
  enablePagination = true,
  filterOptions = [],
  handleSearch,
  handleFilter,
}: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const debouncedSearch = useDebounce(search, 500);

  const filtered = useMemo(() => {
    let result = [...data];
    if (enableSort) {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
    }

    return result;
  }, [data, search, statusFilter, sortAsc]);

  useEffect(() => {
    if (handleSearch) {
      handleSearch(search);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (handleFilter) {
      handleFilter(statusFilter);
    }
  }, [statusFilter]);

  const paginated = useMemo(() => {
    if (!enablePagination) return filtered;
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, enablePagination]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="interactive-table">
      <div className="toolbar">
        {enableSearch && (
          <div style={{ width: "60%" }}>
            <Input
              type="text"
              name="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
            />
          </div>
        )}

        {enableFilter && filterOptions && (
          <div style={{ width: "20%" }}>
            <Dropdown
              options={filterOptions}
              value={{ label: statusFilter, value: statusFilter }}
              onChange={(option) => setStatusFilter(option.value)}
              placeholder="Select Status"
              enableSearch={true}
              //   label="Filter by Status"
            />
          </div>
        )}

        {enableSort && (
          <div style={{ width: "12%" }}>
            <Button
              variant="outline"
              size="md"
              className="sort"
              onClick={() => setSortAsc((prev) => !prev)}
            >
              Sort: {sortAsc ? "Oldest" : "Newest"}
            </Button>
          </div>
        )}
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.accessor)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No data found</td>
            </tr>
          ) : (
            paginated.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={String(col.accessor)}>
                    {col.cellRenderer
                      ? col.cellRenderer(row[col.accessor], row)
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {enablePagination && totalPages > 1 && (
        <div className="pagination">
          <Button
            variant="primary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <span>
            {page} / {totalPages}
          </span>
          <Button
            variant="primary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Table;
