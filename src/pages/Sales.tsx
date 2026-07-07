import {useEffect, useState} from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Box, Typography, TextField } from "@mui/material";
import { sales } from "../data/sales";
import { useLocation } from "react-router-dom";

// Simulated API payload
// const responseData = {
//   type: "ANALYTICS_QUERY",
//   page: "sales",
//   metrics: ["sales"],
//   filters: {
//     date_from: "2023-09-25",
//     date_to: "2023-10-01"
//   },
//   sort: {
//     field: "sales", // Maps to 'amount' in your rows
//     direction: "asc"
//   },
//   limit: 10
// };

const columns: GridColDef[] = [
  { field: "product", headerName: "Product", flex: 1, minWidth: 150 },
  { field: "brand", headerName: "Brand", flex: 1, minWidth: 130 },
  { field: "retailer", headerName: "Retailer", flex: 1, minWidth: 140 },
  { field: "region", headerName: "Region", flex: 1, minWidth: 140 },
  { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 110, type: "number" },
  {
    field: "amount",
    headerName: "Amount ($)",
    flex: 1,
    minWidth: 130,
    type: "number",
    valueFormatter: (value: number) =>
        value?.toLocaleString("en-US", { style: "currency", currency: "USD" }),
  },
  {
    field: "date",
    headerName: "Sale Date",
    flex: 1,
    minWidth: 140,
    type: "date",
    valueGetter: (value) => new Date(value)
  },
];

function Toolbar() {
  return (
      <GridToolbarContainer sx={{ p: 1.5, gap: 1 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
  );
}

export default function Sales() {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [query, setQuery] = useState<any>(location.state ?? null);

  useEffect(() => {
    if (location.state) {
      setQuery(location.state);
      // optionally: fetch/filter data here based on query.filters, query.sort, query.limit
    }
  }, [location.state]);

  console.log('query - ', query);

  // 1. Process Filtering (Search + API Dates)
  const filteredRows = sales
      .filter((item) => {
      //   // Apply your existing client-side quick search first
        const matchesSearch = Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());

        if (!matchesSearch) return false;

        // Extract API date boundaries
        const fromDate = query?.filters?.date_from;
        const toDate = query?.filters?.date_to;
        const countryFilter = query?.filters?.country;
        const retailerFilter = query?.filters?.retailer;
        const brandFilter = query?.filters?.brand;

        const itemDate = item.date; // assuming ISO string format 'YYYY-MM-DD'

        // Date evaluation checks
        if (fromDate && itemDate < fromDate) return false;
        if (toDate && itemDate > toDate) return false;

        // Country (Region) filter
        if (countryFilter) {
          const filterValues = Array.isArray(countryFilter) ? countryFilter : [countryFilter];
          const lowercasedFilters = filterValues.map(v => v.toLowerCase());
          if (!lowercasedFilters.includes(item.region.toLowerCase())) return false;
        }

        // Retailer filter
        if (retailerFilter) {
          const filterValues = Array.isArray(retailerFilter) ? retailerFilter : [retailerFilter];
          const lowercasedFilters = filterValues.map(v => v.toLowerCase());
          if (!lowercasedFilters.includes(item.retailer.toLowerCase())) return false;
        }

        // Brand filter
        if (brandFilter) {
          const filterValues = Array.isArray(brandFilter) ? brandFilter : [brandFilter];
          const lowercasedFilters = filterValues.map(v => v.toLowerCase());
          if (!lowercasedFilters.includes(item.brand.toLowerCase())) return false;
        }

        return true;
      })
      // 2. Process Sorting dynamically based on API instructions
      .sort((a, b) => {
        const apiSortField = query?.sort?.field;
        const direction = query?.sort?.direction || "asc";

        // Map API metric naming variations over to local properties safely
        const fieldMapping: Record<string, string> = {
          sales: "amount",
          quantity: "quantity"
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
      // 3. Enforce the array slice window size limit constraint
      .slice(0, query?.limit || undefined);

  const totalAmount = filteredRows.reduce((sum, s) => sum + s.amount, 0);
  const totalQty = filteredRows.reduce((sum, s) => sum + s.quantity, 0);

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Sales
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Total amount: {totalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          {"  ·  "}Total quantity: {totalQty.toLocaleString()}
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