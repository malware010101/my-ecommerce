import { atom } from 'recoil';

const localStorageKey = 'programas_de_entrenamiento';

const getInitialState = () => {
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error("Error al parsear los datos de localStorage:", e);
      return []; 
    }
  }
  return []; 
};

export const programasState = atom({
  key: 'programasState',
  default: getInitialState(), 
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem(localStorageKey, JSON.stringify(newValue));
      });
    },
  ],
});

// ESTADO DE USUARIO ACTUALIZADO
export const userState = atom({
  key: 'userState',
  default: { 
    rol: 'visitante', // Un nuevo rol inicial para usuarios no autenticados
    id: null,
    nombre: '',
    programasAsignados: []
  },
});

export const usersDataState = atom({
  key: 'usersDataState',
  default: [
      { id: 'usr_001', nombre: 'mario Ponce', rol: 'usuario', programasAsignados: [] },
      { id: 'usr_002', nombre: 'Ana Lopez', rol: 'usuario', programasAsignados: [] },
      { id: 'usr_003', nombre: 'Maria Garcia', rol: 'usuario', programasAsignados: [] },
      // admins y coachs
      { id: 'adm_001', nombre: 'admin', rol: 'admin', programasAsignados: [] },
      { id: 'ch_001', nombre: 'coach', rol: 'coach', programasAsignados: [] },
  ]
});
