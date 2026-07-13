import React, { useState, useEffect, useRef } from 'react';
import { Box, Drawer, Fab, useMediaQuery, useTheme, Badge } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MovilNavBar from './AppTrainingNavBar/MovilNavBar';
import AppSidebar from './AppTrainingNavBar/AppSidebar';
import Chat from '../ContentApp/Chat';
import AdminChat from '../ContentApp/AdminChat';
import ChatIcon from '@mui/icons-material/Chat';
import { useAuth } from '../ContentApp/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import api from '../api';

const drawerWidth = 240;

export default function AppTrainingLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chatOpen, setChatOpen] = useState(false);
  const [currentChatOpenId, setCurrentChatOpenId] = useState(null);
  const { obtenerUsuarioActual, obtenerTokenActual } = useAuth();
  const currentUser = obtenerUsuarioActual();
  const isStaff = ['admin', 'staff'].includes(currentUser.rol.toLowerCase());
  const queryClient = useQueryClient();
  const socketRef = useRef(null);

  const [noLeidosPorChat, setNoLeidosPorChat] = useState({});

  const hndlToggleChat = () => setChatOpen(prev => !prev);

  const totalNoLeidos = Object.values(noLeidosPorChat).reduce((a, b) => a + b, 0);

  // ======================= WS GLOBAL =======================
  useEffect(() => {
    const token = obtenerTokenActual();
    if (!token) return;
    const chatId = isStaff ? 0 : currentUser.id;
    const ws = new WebSocket(`ws://localhost:8001/chat/ws/${chatId}?token=${token}`);
    socketRef.current = ws;

  ws.onopen = () => {
    if (import.meta.env.DEV) {
        console.log("WS global conectado");
    }
};

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "nuevo_mensaje") {
        const chat_id = data.mensaje.chat_id;

        if (!chatOpen || chat_id !== currentChatOpenId) {
          setNoLeidosPorChat(prev => ({
            ...prev,
            [chat_id]: (prev[chat_id] || 0) + 1
          }));
        }
        queryClient.invalidateQueries(["chatLista"]);
      }

      if (data.type === "total_no_leidos_por_chat") {
        // Recibimos totales desde backend y actualizamos sin resetear los otros chats
        setNoLeidosPorChat(prev => {
          const newState = { ...prev };
          Object.entries(data.totales).forEach(([chatId, total]) => {
            newState[chatId] = Math.max(newState[chatId] || 0, total);
          });
          return newState;
        });
      }
    };

  ws.onclose = () => {
    if (import.meta.env.DEV) {
        console.log("WS global cerrado");
    }
};

    return () => ws.close();
  }, [chatOpen, currentChatOpenId, isStaff, currentUser.id, obtenerTokenActual, queryClient]);

  // ======================= FETCH INICIAL =======================
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const { data } = await api.get("/chat/no-leidos-total");
        if (data.total_no_leidos) {
          setNoLeidosPorChat(prev => ({ ...prev, [isStaff ? 0 : currentUser.id]: data.total_no_leidos }));
        }
      } catch (e) {
        if (import.meta.env.DEV){
          console.error("Error fetch total no leidos", e);
        }
      }
    };
    fetchTotal();
  }, [isStaff, currentUser.id]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isMobile ? <MovilNavBar /> : <AppSidebar />}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: isMobile ? 0 : `${drawerWidth}px`, pt: isMobile ? '64px' : 0 }}>
        <Outlet />
      </Box>

      {/* BOTON FLOTANTE */}
      <Fab
        aria-label="chat"
        onClick={hndlToggleChat}
        sx={{
          bgcolor: 'rgb(0, 204, 255)',
          position: 'fixed',
          opacity: 0.7,
          bottom: 50,
          right: 26,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '&:hover': { bgcolor: 'rgb(0, 204, 255)' },
        }}
      >
        <Badge badgeContent={totalNoLeidos} color="primary" invisible={totalNoLeidos === 0}>
          <ChatIcon />
        </Badge>
      </Fab>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={chatOpen}
        onClose={hndlToggleChat}
        hideBackdrop
        PaperProps={{ sx: { width: isMobile || isStaff ? '100%' : 500, bgcolor: '#000', boxShadow: '-4px 0 10px rgba(0, 183, 255, 0.7)' } }}
      >
        {isStaff ? (
          <AdminChat onClose={hndlToggleChat} setCurrentChatOpenId={setCurrentChatOpenId} setNoLeidosPorChat={setNoLeidosPorChat} />
        ) : (
          <Chat onClose={hndlToggleChat} setCurrentChatOpenId={setCurrentChatOpenId} setNoLeidosPorChat={setNoLeidosPorChat} />
        )}
      </Drawer>
    </Box>
  );
}