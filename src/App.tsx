import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import AiChatWidget from "./components/AiChatWidget";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Retailers from "./pages/Retailers";
import Brands from "./pages/Brands";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "#f5f6f8" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/retailers" element={<Retailers />} />
            <Route path="/brands" element={<Brands />} />
          </Routes>
        </Box>
      </Box>
      {/* Mounted once here, so it floats over every page/route */}
      <AiChatWidget />
    </BrowserRouter>
  );
}
