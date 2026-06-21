import { useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarFilterButton, GridToolbarColumnsButton } from "@mui/x-data-grid";
import { Box, Typography, TextField } from "@mui/material";
import { retailers } from "../data/retailers";

const columns: GridColDef[] = [
  { field: "name", headerName: "Retailer Name", flex: 1, minWidth: 160 },
  { field: "country", headerName: "Country", flex: 1, minWidth: 130 },
  { field: "city", headerName: "City", flex: 1, minWidth: 130 },
  { field: "date", headerName: "Onboarded Date", flex: 1, minWidth: 140, type: "date",
    valueGetter: (value) => new Date(value) },
  { field: "storesCount", headerName: "Stores", flex: 1, minWidth: 100, type: "number" },
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

export default function Retailers() {
  const [search, setSearch] = useState("");

  const filteredRows = retailers.filter((r) =>
    Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Retailers
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
