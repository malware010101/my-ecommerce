import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Supplements from '../pages/Supplements/index.jsx';
import Clothes from '../pages/Clothes/index.jsx';
import Athletes from '../pages/Athletes/index.jsx';
import DetalleProductos from '../pages/Detalle/DetalleProductos.jsx';
import LoginApp from '../ContentApp/LoginApp/index.jsx';
import SuscriptionApp from '../ContentApp/SuscriptionApp/index.jsx';
import HomeApp from '../ContentApp/HomeApp/index.jsx';
import AppTrainingLayout from '../components/AppTrainingLayout.jsx';
import Workout from '../ContentApp/Workout/index.jsx';
import Porfile from '../ContentApp/Porfile/index.jsx';
import Nutrition from '../ContentApp/Nutrition/index.jsx';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/supplements/product/:id" element={<DetalleProductos />} />
      <Route path="/clothes/product/:id" element={<DetalleProductos />} />
      <Route path="/supplements" element={<Supplements />} />
      <Route path="/supplements/:category" element={<Supplements />} /> 
      <Route path="/clothes" element={<Clothes />} />
      <Route path="/clothes/:category" element={<Clothes />} /> 
      <Route path="/athletes" element={<Athletes />} />

      <Route path="/apptraining/login" element={<LoginApp />} />
       <Route path="/apptraining/suscription" element={<SuscriptionApp />} />
      {/* Rutas para la app */}
      <Route path="/apptraining" element={<AppTrainingLayout />}>
        {/* Rutas anidadas de la aplicación */}
        <Route path="home" element={<HomeApp />} />
        <Route path= "workout" element={<Workout />} />
        <Route path="nutrition" element={<Nutrition />} />
        <Route path="profile" element={<Porfile />} />
       
      </Route>
    </Routes>
  );
}
