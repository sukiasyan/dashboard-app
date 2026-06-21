import { useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Box, Typography, TextField } from "@mui/material";
import { sales } from "../data/sales";

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
  { field: "date", headerName: "Sale Date", flex: 1, minWidth: 140, type: "date",
    valueGetter: (value) => new Date(value) },
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

  const filteredRows = sales.filter((s) =>
    Object.values(s).join(" ").toLowerCase().includes(search.toLowerCase())
  );

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
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
