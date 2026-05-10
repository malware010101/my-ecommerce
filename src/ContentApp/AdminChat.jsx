import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, List, ListItemButton, ListItemText, Badge, Divider, TextField, IconButton, InputAdornment } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from "../api";
import { useAuth } from "./AuthContext";

export default function AdminChat({ onClose, setCurrentChatOpenId, setNoLeidosPorChat }) {
  const { obtenerUsuarioActual, obtenerTokenActual } = useAuth();
  const currentUser = obtenerUsuarioActual();
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMensaje, setNewMensaje] = useState("");
  const queryClient = useQueryClient();

  const { data: chats = [] } = useQuery({
    queryKey: ["chatLista"],
    queryFn: async () => (await api.get("/chat/lista")).data
  });

  const { data: chatData } = useQuery({
    queryKey: ["chatAdmin", selectedChatId],
    queryFn: async () => (await api.get(`/chat/${selectedChatId}`)).data,
    enabled: !!selectedChatId
  });

  const mensajes = chatData?.mensajes || [];

  const sendMutation = useMutation({
    mutationFn: async () => {
      if (!newMensaje.trim()) return;
      await api.post(`/chat/mensaje?chat_id=${selectedChatId}`, { contenido: newMensaje });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatAdmin", selectedChatId]);
      queryClient.invalidateQueries(["chatLista"]);
      setNewMensaje("");
    }
  });

  // Marcar leídos solo chat abierto
  useEffect(() => {
    if (!chatData || !selectedChatId) return;
    const hayNoLeidos = chatData.mensajes.some(msg => !msg.leido && msg.remitente_id !== currentUser.id);
    if (hayNoLeidos) {
      api.post(`/chat/${selectedChatId}/marcar-leido`);
      setNoLeidosPorChat(prev => ({ ...prev, [selectedChatId]: 0 }));
    }
  }, [chatData, selectedChatId, currentUser.id, setNoLeidosPorChat]);

  // WS para nuevos mensajes
  useEffect(() => {
    if (!selectedChatId) return;
    const token = obtenerTokenActual();
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8001/chat/ws/${selectedChatId}?token=${token}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "nuevo_mensaje") {
        const chat_id = data.mensaje.chat_id;
        if (chat_id !== selectedChatId) {
          setNoLeidosPorChat(prev => ({ ...prev, [chat_id]: (prev[chat_id] || 0) + 1 }));
        }
        queryClient.invalidateQueries(["chatAdmin", selectedChatId]);
        queryClient.invalidateQueries(["chatLista"]);
      }
    };

    ws.onopen = () => console.log("✅ Admin WS conectado");
    ws.onclose = () => console.log("❌ Admin WS cerrado");

    return () => ws.close();
  }, [selectedChatId, obtenerTokenActual, queryClient, setNoLeidosPorChat]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [mensajes]);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#000" }}>
      <Box sx={{ width: "30%", borderRight: "1px solid #333", overflowY: "auto" }}>
        <Typography p={2} fontWeight="bold" color="white">Chats</Typography>
        <List>
          {chats.map(chat => (
            <React.Fragment key={chat.chat_id}>
              <ListItemButton onClick={async () => {
                setSelectedChatId(chat.chat_id);
                setCurrentChatOpenId(chat.chat_id);
                await api.post(`/chat/${chat.chat_id}/marcar-leido`);
                setNoLeidosPorChat(prev => ({ ...prev, [chat.chat_id]: 0 }));
                queryClient.invalidateQueries(["chatLista"]);
              }}>
                <ListItemText primary={chat.usuario_nombre} secondary={chat.ultimo_mensaje} primaryTypographyProps={{ color: "white" }} secondaryTypographyProps={{ color: "#aaa" }} />
                {chat.no_leidos > 0 && <Badge badgeContent={chat.no_leidos} color="primary" />}
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {!selectedChatId ? (
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography color="gray">Selecciona un chat</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              {mensajes.map(msg => (
                <Box key={msg.id} sx={{ textAlign: msg.remitente_id === currentUser.id ? "right" : "left", mb: 1 }}>
                  <Box sx={{ display: "inline-block", bgcolor: msg.remitente_id === currentUser.id ? "rgb(0,204,255)" : "#444", p: 1, borderRadius: "10px" }}>
                    <Typography color="white">{msg.contenido}</Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <TextField
              fullWidth
              placeholder="Responder..."
              value={newMensaje}
              onChange={e => setNewMensaje(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMutation.mutate()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => sendMutation.mutate()}>
                      <SendIcon sx={{ color: 'rgb(0,204,255)' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}