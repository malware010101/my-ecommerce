import { atom } from 'recoil';

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

export const userState = atom({
  key: 'userState',
  default: {
    rol: 'visitante',
    id: null,
    nombre: '',
    programasAsignados: []
  },
  effects: [
    localStorageEffect('user_state_reps')
  ]
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



