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

export const userState = atom({
  key: 'userState',
  default:{ rol: 'usuario'} ,
});