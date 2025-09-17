import hipertrofiaImg from '../../assets/ImagenesApp/hipertrofia.jpeg?url'
import perdidaGrasaImg from '../../assets/ImagenesApp/perdidaGrasa.jpeg?url'
import fuerzaImg from '../../assets/ImagenesApp/fuerza.jpeg?url'

export const objetivosImagenes = {
    'Hipertrofia' : hipertrofiaImg,
    'Perdida de Grasa' : perdidaGrasaImg,
    'Fuerza' : fuerzaImg
}



/**
 * Genera un ID único para la conversación entre dos usuarios.
 * El ID se genera de forma consistente sin importar el orden de los IDs.
 * @param {string} userAId
 * @param {string} userBId
 * @returns {string} El ID de la conversación.
 */
export const getChatId = (userAId, userBId) => {
    return [userAId, userBId].sort().join('_');
  };


export const soporteRepsChatId= 'chat_soporte_reps';