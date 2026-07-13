import React from "react";
import { Box, Button, Chip, Container, Divider, Typography } from "@mui/material";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import homereps from "../assets/ImagenesLanding/homereps.png";
import workoutreps from "../assets/ImagenesLanding/workoutreps.png";
import ejerciciosreps from "../assets/ImagenesLanding/ejerciciosreps.png";
import actividadreps from "../assets/ImagenesLanding/actividadreps.png";
import completereps from "../assets/ImagenesLanding/completereps.png";
import motornutrireps from "../assets/ImagenesLanding/motornutrireps.png";
import nutrireps from "../assets/ImagenesLanding/nutrireps.png";
import pesajereps from "../assets/ImagenesLanding/pesajereps.png";
import historialreps from "../assets/ImagenesLanding/historialreps.png";
import graficosreps from "../assets/ImagenesLanding/graficosreps.png";
import SectionLayout from "../components/Landing/SectionLayout";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import AppMockup from "../components/Landing/AppMockup";
import MockupItem from "../components/Landing/MockupItem";
import MockupStack from "../components/Landing/MockupStack";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import MockupEnergyBackground from "../components/Landing/Effects/MockupEnergyBackground";
import { Socials } from "../Config/socials";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 980,
              mx: "auto",
              textAlign: "center",
              borderBottom: "1px solid rgba(255,255,255,.08)",
            }}
          >
            {/* Badge */}

            <Chip
              icon={<AutoAwesomeOutlinedIcon />}
              label="LA EVOLUCIÓN DEL FITNESS"
              sx={{
                mb: 5,
                px: 1,
                height: 32,
                color: "#5CA4FF",
                fontWeight: 700,
                fontSize: ".65rem",
                letterSpacing: ".08em",
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.08)",

                "& .MuiChip-icon": {
                  color: "#5CA4FF",
                },
              }}
            />

            {/* Título */}

            <Typography
              sx={{
                fontWeight: 700,
                lineHeight: .95,
                letterSpacing: "-.05em",
                fontSize: {
                  xs: "3rem",
                  sm: "4rem",
                  md: "6rem",
                },
              }}
            >
              Entrenamiento y
              <br />
              nutrición{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(180deg,#5EA6FF,#8EBEFF)",

                  WebkitBackgroundClip: "text",

                  WebkitTextFillColor: "transparent",
                }}
              >
                basado en datos.
              </Box>
            </Typography>

            {/* Descripción */}

            <Typography
              sx={{
                mt: 5,

                maxWidth: 820,

                mx: "auto",

                color: "rgba(255,255,255,.62)",

                lineHeight: 1.65,

                fontSize: {
                  xs: "1.05rem",
                  md: "1.55rem",
                },
              }}
            >
              Rutinas con metodologías avanzadas, un motor de nutrición
              inteligente y análisis detallado de tu progreso.
              Diseñado para maximizar resultados.
            </Typography>

            {/* Botón */}
            <Button
              component="a"
              href={Socials.whatsapp}
              target="_blank"
              endIcon={<WhatsAppIcon sx={{ fontSize: ".5rem" }} />}
              sx={{
              mb: { xs: 6, md: 8, },
              px: { xs: 2,md: 2.6,},
              height: { xs: 38, md: 40,},
              mt: { xs: 4, md: 6, },
              minWidth: 0,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: ".15px",
              fontSize: { xs: ".7rem", md: ".84rem", },
              color: "#fff",
              background:
                "linear-gradient(180deg,#3F8CFF 0%, #2E6CF6 100%)",
              boxShadow:
                "0 6px 22px rgba(41,118,255,.28)",
              transition: ".25s",
              "& .MuiButton-endIcon": {
                ml: 0.5,
                transition: ".25s",
              },
              "&:hover": {
                background:
                  "linear-gradient(180deg,#4B96FF 0%, #3577FF 100%)",
            
                transform: "translateY(-1px)",
            
                boxShadow:
                  "0 10px 26px rgba(41,118,255,.38)",
              },
              "&:hover .MuiButton-endIcon": {
                transform: "translateX(3px)",
              },
            }}
            >
              Más información
            </Button>
          </Box>
        <SectionLayout 
        chip= 'PROGRAMAS'
        icon= {<AssignmentSharpIcon/>}
        title= 'Programas de entrenamiento'
        description= 'Descubre nuestros programas de entrenamiento creados para ti, en base a fundamentos biomecanicos, estudios y años de experiencia.'
        checks={[
          'Multiples programas.',
          'Metodologias avanzadas.',
          'Para todos los objetivos.',
          'Asigncion base a tus datos.',
          'Programas personalizados',
          'Acompaniamiento remoto real 24/7.',
        ]}
        media= {
          <MockupEnergyBackground>
          <MockupStack count= {1}>
            <MockupItem image= {homereps} />
          </MockupStack>
          </MockupEnergyBackground>
        }
        reverse= {false}
        />
        <Divider  />
        <SectionLayout 
        chip= 'RUTINAS'
        icon= {<FitnessCenterRoundedIcon />}
        title= 'Domina cada ejercicio'
        description= 'Visualiza cada ejercicio, serie, repeticion, metodologia y descanso de tus rutinas. Nuestro sistema asegura que realices cada ejercicio correctamente a travez de nuestros videos demostrativos de cada ejercicio.'
        checks={[
          'Visualiza tus rutinas.',
          'Videos demostrativos.',
          'Comunicacion directa con nuestro equipo de atletas.',
        ]}
        media= {
          <MockupEnergyBackground>
          <MockupStack count= {2}>
            <MockupItem image= {workoutreps} />
            <MockupItem image= {ejerciciosreps} />
          </MockupStack>
          </MockupEnergyBackground>
        }
        reverse= {true}
        />
         <Divider  />
        <SectionLayout 
        chip= 'SEGUIMIENTO'
        icon= {<AutoAwesomeOutlinedIcon />}
        title= 'Tu historial de actividad'
        description= 'Cada rutina completada cuenta. Nuestro sistema guarda tu historial de entrenamiento para que puedas saber que rutina hiciste dias pasados. Ademas, tu historial aporta informacion valiosa a nuestros atletas para monitorear tu actividad y preescribir tus rutinas posteriores de manera mas eficiente y precisa.'
        checks={[
          'Visualizacion detallada.',
          'Seguimiento constante.',
          'Histrorial de rutinas.',
          'Premios por tus rutinas completadas.',
        ]}
        media= {
          <MockupEnergyBackground>
          <MockupStack count= {2}>
            <MockupItem image= {completereps} />
            <MockupItem image= {actividadreps} />
          </MockupStack>
          </MockupEnergyBackground>
        }
        reverse= {false}
        />

        <Divider  />

        <SectionLayout 
        chip= 'BETA'
        icon= {<AutoAwesomeOutlinedIcon />}
        title= 'Motor de nutricion inteligente'
        description= 'Calcula tu programa alimenticio con nuestro algoritmo de nutricion inteligente, que en base a tus datos calcula tus macro nutrientes necesarios para alcanzar tus objetivos.'
        checks={[
          'Calculo de macro nutrientes.',
          'Distribucion de macro y micro nutrientes.',
          '3 opciones de menus.',
          'En base a tus datos.',
          'Adaptado a disponibiladad de consumo.',
        ]}
        media= {
          <MockupEnergyBackground>
          <MockupStack count= {2}>
            <MockupItem image= {motornutrireps} />
            <MockupItem image= {nutrireps} />
          </MockupStack>
          </MockupEnergyBackground>
        }
        reverse= {true}
        />
        <Divider  />

        <SectionLayout
        chip= 'PESAJES'
        icon= {<AutoGraphIcon/>}
        title= 'Registra tus resultados'
        description= 'Lleva un registro de tus logros con nuestra funcionalidad para subir tus resultados como pesos, avances y eveidencia fotografica de tus cambios esteticos. Ademas, puedes analizar pesajes anteriores y comparar tus avances en graficos. Asi mismo nuestros atletas estan siempre pendientes de tus avances y podran preescribirte de una manera mas precisa en base a tus resultados.'
        checks={[
          'Registra peso, masa muscular, grasa corporal e imc.',
          'Carga tus fotografias de evidencia.',
          'Graficos comparativos.',
          'Guarda cada pesaje registrado para analisis.',
        ]}
        media= {
          <MockupEnergyBackground>
          <MockupStack count= {3}>
            <MockupItem image= {pesajereps} />
            <MockupItem image= {graficosreps} />
            <MockupItem image= {historialreps} />
          </MockupStack>
          </MockupEnergyBackground>
        }
        reverse= {false}
        />

        <Divider  />

        <SectionLayout
        alignItems= 'center'
        justifyContent= 'center'
        chip= 'CONTACTANOS'
        title= '¿ESTAS LISTO PARA EMPEZAR?'
        description='¡No lo pienses mas!, pregunta por tu membresia y te ayudaremos a elegir la mejor opcion para ti.'
        reverse= {false}
        action={
          <Button
              component="a"
              href={Socials.whatsapp}
              target="_blank"
              fullWidth
              endIcon={<WhatsAppIcon sx={{ fontSize: ".5rem" }} />}
              sx={{
              px: { xs: 2,md: 2.6,},
              mr: { md: 20, lg: 20, },
              height: { xs: 48, md: 40,},
              minWidth: 0,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: ".15px",
              fontSize: { xs: "1rem", md: ".1.2rem", },
              color: "#fff",
              background:
                "linear-gradient(180deg,#3F8CFF 0%, #2E6CF6 100%)",
              boxShadow:
                "0 6px 22px rgba(41,118,255,.28)",
              transition: ".25s",
              "& .MuiButton-endIcon": {
                ml: 0.5,
                transition: ".25s",
              },
              "&:hover": {
                background:
                  "linear-gradient(180deg,#4B96FF 0%, #3577FF 100%)",
            
                transform: "translateY(-1px)",
            
                boxShadow:
                  "0 10px 26px rgba(41,118,255,.38)",
              },
              "&:hover .MuiButton-endIcon": {
                transform: "translateX(3px)",
              },
            }}
            >
              Contactanos
            </Button>
        }
        />
        </Container>
      </Box>
    </>
  );
}