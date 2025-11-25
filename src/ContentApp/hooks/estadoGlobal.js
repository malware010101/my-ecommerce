import { atom } from 'recoil';

const programasKey = 'programas_de_entrenamiento';
const usersKey = 'usuarios_app_reps'; 

const getInitialState = (key, defaultData) => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error(`Error al parsear los datos de localStorage para la clave ${key}:`, e);
      return defaultData; 
    }
  }
  return defaultData; 
};

export const programasState = atom({
  key: 'programasState',
  default: getInitialState(programasKey, []), 
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem(programasKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const userState = atom({
  key: 'userState',
  default: { 
    rol: 'visitante',
    id: null,
    nombre: '',
    programasAsignados: []
  },
});

// const initialUsers = [
//   { id: 'usr_001', nombre: 'mario Ponce', rol: 'usuario', programasAsignados: [] },
//   { id: 'usr_002', nombre: 'Ana Lopez', rol: 'usuario', programasAsignados: [] },
//   { id: 'usr_003', nombre: 'Maria Garcia', rol: 'usuario', programasAsignados: [] },
//   { id: 'usr_004', nombre: 'Lucero Aranzazu', rol: 'pro', programasAsignados: [] },
//   { id: 'usr_005', nombre: 'Nancy Perez', rol: 'pro', programasAsignados: [] },
//   { id: 'usr_006', nombre: 'Robe Mendez', rol: 'pro', programasAsignados: [] },
//   // amdins y coachs
//   { id: 'adm_001', nombre: 'admin', rol: 'admin', programasAsignados: [] },
//   { id: 'ch_001', nombre: 'coach', rol: 'coach', programasAsignados: [] },
// ];

export const usersDataState = atom({
  key: 'usersDataState',
  default: getInitialState(usersKey, []), 
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem(usersKey, JSON.stringify(newValue));
      });
    },
  ],
});

const localStorageEffect = key => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset 
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const chatConversationsState = atom({
  key: 'chatConversationsState',
  default: {}, 
  effects: [
    localStorageEffect('chat_conversations_reps')
  ]
});
