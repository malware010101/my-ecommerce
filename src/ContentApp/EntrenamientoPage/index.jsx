import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import ProgramDetails from "../ProgramDetails.jsx";
import { Container, Typography } from "@mui/material";

export default function EntrenamientoPage() {
  const [programa, setPrograma] = useState({});
  const { entrenamientoId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntrenamiento = async () => {
      try {
        const res = await api.get(
          `/entrenamiento/programas/activo/${entrenamientoId}`
        );
        setPrograma(res.data); // <-- ahora res.data incluye entrenamiento_id, fecha_inicio, fecha_fin y programa
      } catch (error) {
        console.error("Error cargando entrenamiento", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrenamiento();
  }, [entrenamientoId]);

  if (loading) {
    return (
      <Container>
        <Typography color="#ccc">Cargando rutina...</Typography>
      </Container>
    );
  }

  if (!programa || !programa.programa?.dias?.length) {
    return (
      <Container>
        <Typography color="error">Entrenamiento no encontrado</Typography>
      </Container>
    );
  }

  return <ProgramDetails entrenamiento={programa} />;
}
