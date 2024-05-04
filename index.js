//express
const express = require('express');
const app = express();
const PORT = 3500; // puede cambiar

//bienvenida 
let bienvenida1 = [
    {nombre: 'Royer Ivam', apellidos: 'Mamani Garcia', profesion:'Responsable de Sistemas'},

];
//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Juan', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Juan'},
    {id: 3 , nombre: 'Levitico', autor: 'Pedro'},
];
//manejo de JSON
app.use(express.json());
//endpoint de bienvenida
app.get('/bienvenida', (req, res) => {
   
    res.json(bienvenida1);
    
});
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})

// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 obtener libros por autor
app.get('/libros-autor/:autor',(req, res) => {
    const autorCapturado = (req.params.autor);
    console.log(autorCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.autor === autorCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
//endpoint 6 cantidad total de libros
app.get('/cantidad-total', (req, res) => {
    // Validar si el array no está vacío
    if (!librosBiblicos.length) {
        res.json(0);
      }
      // Contar la cantidad de libros
  let cantidadTotalLibros = 0;
  for (const libro of librosBiblicos) {
    cantidadTotalLibros++;
  }

    res.json(`Cantidad total de libros: ${cantidadTotalLibros}`);
});
//endpoint 7 libros por nombre que contenga el texto "Juan"
app.get('/libros-nombre/:nombre',(req, res) => {
    const nombreCapturado = (req.params.nombre);
    console.log(nombreCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.nombre === nombreCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
//endpoint 8 Ordenar libros por nombre
app.get('/ordenar-libros', (req, res) => {
    function ordenarLibrosPorNombre(a, b) {
        if (a.nombre < b.nombre) return -1;
        if (a.nombre > b.nombre) return 1;
        return 0;
      }
      
      // Ordenar el array de libros
      librosBiblicos.sort(ordenarLibrosPorNombre);
    res.json(librosBiblicos);
});
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});
