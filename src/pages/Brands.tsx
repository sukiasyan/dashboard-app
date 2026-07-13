import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Box, Typography, TextField } from "@mui/material";
import { brands } from "../data/brands";
import { useLocation } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "name", headerName: "Brand Name", flex: 1, minWidth: 150 },
  { field: "category", headerName: "Category", flex: 1, minWidth: 140 },
  { field: "country", headerName: "Country", flex: 1, minWidth: 130 },
  { field: "founded", headerName: "Founded", flex: 1, minWidth: 110, type: "number" },
  { field: "date", headerName: "Partnership Date", flex: 1, minWidth: 150, type: "date",
    valueGetter: (value) => new Date(value) },
  { field: "partnersCount", headerName: "Partners", flex: 1, minWidth: 110, type: "number" },
  { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
];

function Toolbar() {
  return (
    <GridToolbarContainer sx={{ p: 1.5, gap: 1 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function Brands() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [query, setQuery] = useState<any>(location.state ?? null);

  useEffect(() => {
    if (location.state) {
      setQuery(location.state);
    }
  }, [location.state]);

  // 1. Process Filtering (Search + AI Filters)
  const filteredRows = brands
    .filter((item) => {
      // Quick search
      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      // Extract AI query boundaries
      const fromDate = query?.filters?.date_from;
      const toDate = query?.filters?.date_to;
      const countryFilter = query?.filters?.country;

      const itemDate = item.date;

      // Date evaluation checks
      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;

      // Country filter
      if (countryFilter) {
        const filterValues = Array.isArray(countryFilter) ? countryFilter : [countryFilter];
        const lowercasedFilters = filterValues.map(v => v.toLowerCase());
        if (!lowercasedFilters.includes(item.country.toLowerCase())) return false;
      }

      return true;
    })
    // 2. Process Sorting dynamically based on AI instructions
    .sort((a, b) => {
      const apiSortField = query?.sort?.field;
      const direction = query?.sort?.direction || "asc";

      // Map API metric naming variations over to local properties safely
      const fieldMapping: Record<string, string> = {
        sales: "partnersCount",
        performance: "partnersCount",
        partners: "partnersCount"
      };

      const targetField = fieldMapping[apiSortField] || apiSortField;

      // Safeguard against missing keys
      if (!targetField || !(targetField in a)) return 0;

      const valueA = a[targetField as keyof typeof a];
      const valueB = b[targetField as keyof typeof b];

      // Standard Javascript sorting logic wrapper
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    })
    // 3. Enforce the limit constraint
    .slice(0, query?.limit || undefined);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Brands
      </Typography>
      <TextField
        size="small"
        placeholder="Quick search across all columns..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, width: 320, bgcolor: "background.paper" }}
      />
      <Box sx={{ height: 600, width: "100%", bgcolor: "background.paper" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          slots={{ toolbar: Toolbar }}
          initialState={{
            pagination: { paginationModel: { pageSize: query?.limit || 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
