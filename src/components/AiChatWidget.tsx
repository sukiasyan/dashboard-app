import React, { useState, useRef, useEffect } from "react";
import {
  Fab,
  Dialog,
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Avatar,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {ChatMessages} from "@openrouter/sdk/models";
import {getAiResults} from "../AI/aiHandler";
import {SYSTEM_PROMPT} from "../AI/systemPrompt";
import { useNavigate } from "react-router-dom";


// export interface ChatMessage {
//   // id: number;
//   role: string;
//   content: string;
// }

// Map the "page" value from the AI response to your actual routes
const PAGE_ROUTES: Record<string, string> = {
  home: "/",
  sales: "/sales",
  retailers: "/retailers",
  brands: "/brands",
};

// Try to pull a JSON object out of the AI reply, even if wrapped in ```json fences
function tryParseAiJson(text: string): any | null {
  const cleaned = text.trim().replace(/^```json\s*|```$/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Swap this out for a real API call (e.g. fetch to your backend / OpenRouter) when ready.
async function getAssistantReply(userMsg: ChatMessages[]): Promise<string> {
 const responseFromAi = await getAiResults(userMsg)
  await new Promise((r) => setTimeout(r, 500));
  // return `You said: "${userText}". (Hook this up to a real AI endpoint to get actual answers.)`;

  return responseFromAi || "Sorry, I couldn't get a response.";
}

export default function AiChatWidget() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessages[]>([
    {  role: "system", content: SYSTEM_PROMPT },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
console.log('Function: AiChatWidget - Line 46 - ', messages);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async () => {
    const content = input.trim();
    if (!content || loading) return;

    // const userMsg: ChatMessage = { id: Date.now(), role: "user", content };
     const userMsg: ChatMessages = {  role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getAssistantReply([...messages, userMsg]);
      const parsed = tryParseAiJson(reply);

      if (parsed?.type === "ANALYTICS_QUERY" && parsed.page) {
        const route = PAGE_ROUTES[parsed.page];
        if (route) {
          setMessages((prev) => [
            ...prev,
            { role: "system", content: `Taking you to ${parsed.page}...` },
          ]);
          setOpen(false); // close the widget so the page is visible
          navigate(route, { state: parsed }); // <-- pass the whole object
          return;
        }
      }

      setMessages((prev) => [...prev, { role: "system", content: reply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "system", content: "Error contacting AI." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating action button, shown on every page */}
      <Fab
        color="primary"
        aria-label="Open AI chat"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1300,
          display: open ? "none" : "flex",
        }}
      >
        <ChatIcon />
      </Fab>

      {/* Floating dialog, anchored to bottom-right instead of full-screen modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        hideBackdrop
        disableScrollLock
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 24,
            right: 24,
            m: 0,
            width: 360,
            height: 520,
            maxHeight: "calc(100vh - 48px)",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
          },
        }}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "flex-end",
            alignItems: "flex-end",
          },
          pointerEvents: "none",
        }}
        slotProps={{
          backdrop: { sx: { display: "none" } },
        }}
      >
        <Box sx={{ pointerEvents: "auto", display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              bgcolor: "primary.main",
              color: "#fff",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SmartToyIcon fontSize="small" />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                AI Assistant
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 2, bgcolor: "#f5f6f8" }}>
            {messages.map((m) => (
              <Box
                key={m.content}
                sx={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                  gap: 1,
                }}
              >
                {m.role === "assistant" && (
                  <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main" }}>
                    <SmartToyIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                )}
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 1,
                    maxWidth: "75%",
                    borderRadius: 2,
                    bgcolor: m.role === "user" ? "primary.main" : "#fff",
                    color: m.role === "user" ? "#fff" : "text.primary",
                  }}
                >
                  <Typography variant="body2">{m.content === SYSTEM_PROMPT ? "Type your query ..." : m.content}</Typography>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main" }}>
                  <SmartToyIcon sx={{ fontSize: 16 }} />
                </Avatar>
                <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                  Typing...
                </Typography>
              </Box>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* Input */}
          <Box sx={{ display: "flex", gap: 1, p: 1.5, borderTop: "1px solid #e0e0e0" }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              multiline
              maxRows={3}
            />
            <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || loading}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
