import React, { useState, useMemo } from "react";
import { SearchBox, Pagination, Badge, Button } from "../common/UIComponents";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export const DataTable = ({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = "Search records...",
  itemsPerPage = 5,
  actions
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  // Search filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((item) =>
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {searchable && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder={searchPlaceholder} className="w-full sm:w-72" />
          <span className="text-xs text-slate-500 self-end sm:self-center">
            Showing {sortedData.length} records
          </span>
        </div>
      )}

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`p-3.5 ${col.sortable !== false ? "cursor-pointer select-none hover:text-blue-600" : ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable !== false && (
                      <span className="opacity-60">
                        {sortConfig.key === col.key ? (
                          sortConfig.direction === "asc" ? (
                            <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="p-3.5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white/50 dark:bg-slate-900/50">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition">
                  {columns.map((col) => (
                    <td key={col.key} className="p-3.5 text-slate-800 dark:text-slate-200">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="p-8 text-center text-slate-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
