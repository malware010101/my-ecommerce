// src/components/Chat/Chat.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, TextField, InputAdornment } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Send as SendIcon } from '@mui/icons-material';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState, usersDataState, chatConversationsState } from './hooks/estadoGlobal';
import { getChatId, soporteRepsChatId } from './UtilsApp/helper';
import CloseIcon from '@mui/icons-material/Close';

export default function Chat({ onClose }) {
    const currentUser = useRecoilValue(userState);
    const allUsers = useRecoilValue(usersDataState);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMensaje, setNewMensaje] = useState('');
    const [currentChatId, setCurrentChatId] = useState(null); 
    const [allConversacion, setAllConversacion] = useRecoilState(chatConversationsState);

    const isUsario = currentUser.rol === 'usuario' || currentUser.rol === 'pro';

    useEffect(() => {
        if (isUsario) {
            setCurrentChatId(soporteRepsChatId);
        }
    }, [isUsario]);

    const usersForChat = allUsers.filter(user => user.rol !== 'admin' && user.id !== currentUser.id);

    // Usa el estado para la conversación actual
    const currentConversation = allConversacion[currentChatId] || [];

    const hndlSendMensaje = () => {
        if (newMensaje.trim() === '' || !currentChatId) return;

        const timestamp = new Date().toISOString();
        const mensajeObj = {
            id: Date.now(),
            text: newMensaje,
            senderId: currentUser.id,
            timestamp: timestamp,
        };

        setAllConversacion(prevConversations => ({
            ...prevConversations,
            [currentChatId]: [...(prevConversations[currentChatId] || []), mensajeObj],
        }));

        setNewMensaje('');
    };

    const hndlSelectUser = (user) => {
        setSelectedUser(user);
        // Establece el ID del chat individual
        setCurrentChatId(getChatId(currentUser.id, user.id));
    };

    const hndlBackToList = () => {
        setSelectedUser(null);
        setCurrentChatId(null);
    };

    const renderChatContent = () => {
        if (isUsario) {
            return (
                <Box sx={{  height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center',  bgcolor: 'rgb(0, 204, 255)' }}>
                        <Typography variant="h6" p= {1} fontWeight={'bold'} ml= {2} color= {'#fff'}>SOPORTE REPS</Typography>
                        <IconButton onClick={onClose} sx={{ ml: 'auto', color: '#fff' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1, bgcolor: '#000', color: '#fff' }}>
                        {currentConversation.map((msg, index) => (
                            <Box key={msg.id} sx={{ textAlign: msg.senderId === currentUser.id ? 'right' : 'left', mb: 1 }}>
                                <Box sx={{ display: 'inline-block', bgcolor: msg.senderId === currentUser.id ? 'rgb(0, 204, 255)' : '#444', p: 1, borderRadius: '10px' }}>
                                    <Typography color="white">{msg.text}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Escribe un mensaje..."
                        value={newMensaje}
                        onChange={(e) => setNewMensaje(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && hndlSendMensaje()}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={hndlSendMensaje} edge="end">
                                        <SendIcon style ={{ color: 'rgb(0, 204, 255)' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                bgcolor: '#000',
                                color: '#fff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: ' rgb(0, 204, 255)', 
                                    borderRadius: '20px'
                                    
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgb(0, 204, 255)', 
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgb(0, 204, 255)', 
                                },
                            }

                        }}
                    />
                </Box>
            );
        }

        if (selectedUser) {
            return (
                <Box sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgb(0, 204, 255)', p: 1 }}>
                        <IconButton onClick={hndlBackToList} sx={{ mr: 1 }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Avatar src={`/api/avatars/${selectedUser.id}`} />
                        <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>{selectedUser.nombre}</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0, mb: 0, bgcolor: '#000', color: '#fff' }}>
                        {currentConversation.map((msg, index) => (
                            <Box key={msg.id} sx={{ textAlign: msg.senderId === currentUser.id ? 'right' : 'left', mb: 1 }}>
                                <Box sx={{ display: 'inline-block', bgcolor: msg.senderId === currentUser.id ? 'rgb(0, 204, 255)' : '#444', p: 1, borderRadius: '10px' }}>
                                    <Typography color="white">{msg.text}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <TextField
                        sx={{ bgcolor: '#000', color: '#fff' }}
                        fullWidth
                        variant="outlined"
                        placeholder="Escribe un mensaje..."
                        value={newMensaje}
                        onChange={(e) => setNewMensaje(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && hndlSendMensaje()}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={hndlSendMensaje} edge="end">
                                        <SendIcon style={{ color: 'rgb(0, 204, 255)' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                bgcolor: '#000',
                                color: '#fff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: ' rgb(0, 204, 255)', 
                                    borderRadius: '20px',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgb(0, 204, 255)', 
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgb(0, 204, 255)', 
                                },
                            }
                        }}
                    />
                </Box>
            );
        }

        return (
            <Box sx={{ p: 0,height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx= {{ display: 'flex', alignItems: 'left', bgcolor: ' rgb(0, 204, 255)', color: '#fff', }}>
                <Typography variant="h5" mb={1} ml={2} mt= {2} fontWeight={'bold'}>Mensajes</Typography>
                
                </Box>
                <List sx= {{ flexGrow: 1,  bgcolor: '#000', color: '#fff'}}>
                    {usersForChat.map(user => (
                        <ListItem button key={user.id} onClick={() => hndlSelectUser(user)}>
                            <ListItemAvatar >
                                <Avatar >{user.nombre[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.nombre}  />
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {renderChatContent()}
        </Box>
    );
}