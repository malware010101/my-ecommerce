export const productSupls = [
    { id: 1, name: "Proteína Whey", description: "Proteína de suero de leche de alta calidad.", price: 899, image: "/public/Images/Supplements/Proteinas/proteina1.png", type: "Proteins" },
    { id: 2, name: 'Proteina Hidrolizada', description: 'Proteina hifrolizada de suero de leche de rapida digestion.', price: 1599, image: '/public/Images/Supplements/Proteinas/proteina2.png', type: 'Proteins' },
    { id: 3, name: 'Proteina Isolate', description: 'Proteina isolate de suero de leche de alta calidad.', price: 1190, image: '/public/Images/Supplements/Proteinas/proteina3.png', type: 'Proteins' },
    { id: 4, name: "Caseína Micelar", description: "Proteína de lenta digestión para la noche.", price: 850, image: "/public/Images/Supplements/imagen5.png", type: "Proteins" },
    { id: 5, name: "PreKlan", description: "Nuestra formula mas potente para aumentar la fuerza y el rendimiento.", price: 599, image: "/public/Images/Supplements/Preworks/prework1.png", type: "Pre-workouts" },
    { id: 6, name: "Gorilla Power", description: "Ayuda a aumentar la energia y concentracion durante el entrenamiento .", price: 550, image: "/public/Images/Supplements/Preworks/prework2.png", type: "Pre-workouts" },
    { id: 7, name: "TestoKlan", description: "Aumenta la produccion de testosterona para incrementar la fuerza y la masa muscular.", price: 750, image: "/public/Images/Supplements/Preworks/prework3.png", type: "Pre-workouts" },
    { id: 8, name: 'Creatina Monohidrata', description: 'Creatina monohidrata de alta calidad, que aumenta la fuerza y el rendimiento.', price: 599, image: '/public/Images/Supplements/Creatinas/creatina1.png', type: 'Creatine',
        // Nuevas propiedades
      details: 'La creatina monohidratada es uno de los suplementos más investigados y efectivos para mejorar el rendimiento deportivo y el crecimiento muscular. Aumenta la capacidad de tu cuerpo para producir energía rápidamente durante el ejercicio intenso.',
      benefits: [
        'Aumenta la fuerza y la potencia muscular.',
        'Mejora el rendimiento en ejercicios de alta intensidad.',
        'Ayuda a la recuperación muscular.',
        'Contribuye al aumento de la masa muscular.'
      ],
      variants: [
        { 
          label: 'Sabor Ponche', 
          thumbnail: '/public/Images/Supplements/Creatinas/creatina1.png', // Miniatura para el selector de abajo
          images: [
            { url: '/public/Images/Supplements/Creatinas/creatina1.png', alt: 'Vista frontal' },
            { url: '/public/Images/Supplements/Creatinas/creatina1.png', alt: 'Vista trasera' },
            { url: '/public/Images/Supplements/Creatinas/creatina1.png', alt: 'Tabla nutricional' }
          ]
        },
        { 
          label: 'Sabor Limón', 
          thumbnail: '/public/Images/Supplements/Creatinas/creatina2.png', // Miniatura para el selector de abajo
          images: [
            { url: '/public/Images/Supplements/Creatinas/creatina2.png', alt: 'Vista frontal' },
            { url: '/public/Images/Supplements/Creatinas/creatina2.png', alt: 'Vista trasera' },
            { url: '/public/Images/Supplements/Creatinas/creatina2.png', alt: 'Tabla nutricional' }
          ]
        }
      ]  },
    { id: 9, name: 'Creatina Polvo', description: 'Creatina polvo de alta calidad, que aumenta la fuerza y el rendimiento.', price: 599, image: '/public/Images/Supplements/Creatinas/creatina2.png', type: 'Creatine' },
    
  ];
 
  export const productClothes = [
    { id: 1, name: "Camiseta deportiva", description: "Camiseta deportiva de alta calidad.", price: 599, image: "/public/Images/Mens/mens1.png", type: "Sets", gender: "mens" },
    { id: 2, name: "Pantalon deportivo", description: "Pantalon deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/mens2.png", type: "Sets", gender: "mens" },
    { id: 3, name: "Pantalon deportivo", description: "Pantalon deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/mens3.png", type: "Sets", gender: "mens" },
    { id: 4, name: "Pantalon deportivo", description: "Pantalon deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/mens4.png", type: "Sets", gender: "mens" },
    { id: 5, name: "Pantalon deportivo", description: "Pantalon deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/mens5.png", type: "Sets", gender: "mens" },
    { id: 6, name: "Pantalon deportivo", description: "Pantalon deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/mens6.png", type: "Sets", gender: "mens" },
    { id: 7, name: "T-ShirtOversize ", description: "Playera Oversize de alta calidad.", price: 799, image: "/public/Images/Mens/T-shirts/t-shirt1.png", type: "T-Shirts", gender: "mens" },
    { id: 8, name: "T-Shirt Tirantes ", description: "Playera de tirantes de alta calidad.", price: 799, image: "/public/Images/Mens/T-shirts/t-shirt2.png", type: "T-Shirts", gender: "mens" },
    { id: 9, name: "T-Shirt Tirantes", description: "Playera de tirantes de alta calidad.", price: 799, image: "/public/Images/Mens/T-shirts/t-shirt3.png", type: "T-Shirts", gender: "mens" },
    { id: 10, name: "T-Shirt Oversize ", description: "Playera Oversize de alta calidad.", price: 799, image: "/public/Images/Mens/T-shirts/t-shirt4.png", type: "T-Shirts", gender: "mens" },
    { id: 11, name: "T-Shirt Oversize ", description: "Playera de Oversize de alta calidad.", price: 799, image: "/public/Images/Mens/T-shirts/t-shirtw1.png", type: "T-Shirts", gender: "womens" },
    { id: 12, name: "Jogger Deportivo ", description: "Jogger deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/Pants/pants1.png", type: "Pants", gender: "mens" },
    { id: 13, name: "Jogger Deportivo ", description: "Jogger deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/Pants/pants2.png", type: "Pants", gender: "mens" },
    { id: 14, name: "Jogger Deportivo ", description: "Jogger deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/Pants/pants3.png", type: "Pants", gender: "mens" },
    { id: 15, name: "Jogger Deportivo ", description: "Jogger deportivo de alta calidad.", price: 799, image: "/public/Images/Mens/Pants/pants4.png", type: "Pants", gender: "mens" },
];


  export const hndlAgregarAlCarrito = (product) => {
    console.log(`Producto agregado al carrito: ${product.name}`);
  };

   