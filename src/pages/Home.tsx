import { Box, Typography, Paper } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome to the Dashboard
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          This is the home page. Use the menu on the left to navigate to Sales, Retailers, or Brands.
        </Typography>
      </Paper>
    </Box>
  );
}
