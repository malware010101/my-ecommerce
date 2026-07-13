import hipertrofiaImg from '../../assets/ImagenesApp/hipertrofia.jpeg?url'
import perdidaGrasaImg from '../../assets/ImagenesApp/perdidaGrasa.jpeg?url'
import fuerzaImg from '../../assets/ImagenesApp/fuerza.jpeg?url'
import funcionalImg from '../../assets/ImagenesApp/funcional.png?url'
import hiitImg from '../../assets/ImagenesApp/hiit.png?url'
import tabataImg from '../../assets/ImagenesApp/tabata.png?url'
import absImg from '../../assets/ImagenesApp/abs.png?url'

export const objetivosImagenes = {
    'Hipertrofia' : hipertrofiaImg,
    'Perdida de Grasa' : perdidaGrasaImg,
    'Fuerza' : fuerzaImg,
    'Entrenamiento Funcional' : funcionalImg,
    'HIIT' : hiitImg,
    'Tabata' : tabataImg,
    'Abs' : absImg
}



/**
 * Genera un id unico para la conversacion entre dos usuarios
 * el id se genera de forma consistente sin importar el orden de los ids
 * @param {string} userAId
 * @param {string} userBId
 * @returns {string} El id de la conversacio
 */
export const getChatId = (userAId, userBId) => {
    return [userAId, userBId].sort().join('_');
  };


export const soporteRepsChatId= 'chat_soporte_reps';

// AuthContext.jsx (o un archivo utils)
export const fetchUsuarioReal = async () => {
  try {
    const res = await api.get("/auth/me"); // tu endpoint que ya hiciste
    return res.data; // { id, nombre, rol, tiene_anamnesis }
  } catch (err) {
    console.error("Error obteniendo usuario real:", err);
    return null;
  }
};