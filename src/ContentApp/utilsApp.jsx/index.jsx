export const ORDEN_COMIDAS = [
  "desayuno",
  "almuerzo",
  "colacion",
  "comida",
  "snack",
  "cena"
];


export const ORDEN_INGREDIENTES = [
  "proteina",
  "carbohidrato",
  "grasa",
  "vegetal"
];

export const UNIDADES_CORTAS = {
  pieza: "pza",
  piezas: "pza",
  cucharada: "cda",
  cucharadas: "cda",
  gramo: "g",
  gramos: "g",
  g: "g",
  fraccion: "pza",
  taza: "tza",
};

export function formatearIngrediente(item) {
  // Caso libre / al gusto
  if (item.cantidad === "libre") {
    return `Libre al gusto de ${item.ingrediente}`;
  }

  const unidadCorta =
    UNIDADES_CORTAS[item.unidad?.toLowerCase()] || item.unidad;

  return `${item.cantidad} ${unidadCorta} de ${item.ingrediente}`;
}

