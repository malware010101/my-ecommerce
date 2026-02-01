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
