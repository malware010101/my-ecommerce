import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, TextField, InputAdornment } from '@mui/material';
import { Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { useAuth } from './AuthContext';

export default function Chat({ onClose, setCurrentChatOpenId, setNoLeidosPorChat }) {
  const { obtenerUsuarioActual, obtenerTokenActual } = useAuth();
  const currentUser = obtenerUsuarioActual();
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [newMensaje, setNewMensaje] = useState('');
  const queryClient = useQueryClient();

  const { data: miChat } = useQuery({
    queryKey: ["miChat"],
    queryFn: async () => (await api.get("/chat/mi-chat")).data
  });

  const { data: chatData } = useQuery({
    queryKey: ["chat", miChat?.id],
    queryFn: async () => (await api.get(`/chat/${miChat.id}`)).data,
    enabled: !!miChat?.id
  });

  const mensajes = chatData?.mensajes || [];

  const sendMutation = useMutation({
    mutationFn: async () => {
      if (!newMensaje.trim()) return;
      await api.post("/chat/mensaje", { contenido: newMensaje });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chat", miChat?.id]);
      setNewMensaje("");
    }
  });

  const marcarLeidoMutation = useMutation({
    mutationFn: async () => {
      if (!miChat?.id) return;
      await api.post(`/chat/${miChat.id}/marcar-leido`);
    },
    onSuccess: () => {
      setNoLeidosPorChat(prev => ({ ...prev, [miChat.id]: 0 }));
      queryClient.invalidateQueries(["chat", miChat?.id]);
    }
  });

  useEffect(() => {
    if (!chatData || !miChat?.id) return;
    const hayNoLeidos = chatData.mensajes.some(msg => !msg.leido && msg.remitente_id !== currentUser.id);
    if (hayNoLeidos) marcarLeidoMutation.mutate();
  }, [chatData, miChat?.id]);

  useEffect(() => {
    if (!miChat?.id) return;
    const token = obtenerTokenActual();
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8001/chat/ws/${miChat.id}?token=${token}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "nuevo_mensaje") {
        const chat_id = data.mensaje.chat_id;
        if (chat_id !== miChat.id) {
          setNoLeidosPorChat(prev => ({ ...prev, [chat_id]: (prev[chat_id] || 0) + 1 }));
        } else {
          marcarLeidoMutation.mutate();
        }
        queryClient.invalidateQueries(["chat", miChat.id]);
      }
    };

    return () => ws.close();
  }, [miChat?.id, obtenerTokenActual, queryClient]);

  if (!miChat) return null;
  const handleSend = () => sendMutation.mutate();
 
  
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgb(0,204,255)' }}>
        <Typography variant="h6" p={1} ml={2} fontWeight="bold" color="#fff">SOPORTE REPS</Typography>
        <IconButton onClick={onClose} sx={{ ml: 'auto', color: '#fff' }}><CloseIcon /></IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, bgcolor: '#000' }}>
        {mensajes.map(msg => (
          <Box key={msg.id} sx={{ textAlign: msg.remitente_id === currentUser.id ? 'right' : 'left', mb: 1 }}>
            <Box sx={{ display: 'inline-block', bgcolor: msg.remitente_id === currentUser.id ? 'rgb(0,204,255)' : '#444', p: 1, borderRadius: '10px' }}>
              <Typography color="white">{msg.contenido}</Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <TextField
        fullWidth
        placeholder="Escribe un mensaje..."
        value={newMensaje}
        onChange={e => setNewMensaje(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend}><SendIcon sx={{ color: 'rgb(0,204,255)' }} /></IconButton>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
}