//variables

const carrito = document.querySelector('#carrito');

const listaCarrito = document.querySelector('#lista-carrito tbody');

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

//listar mis event listeners
registrarEvents();
function registrarEvents(){

     listaCursos.addEventListener('click', agregarCurso);

     //darle a la x para borrar un curso
     carrito.addEventListener('click', eliminarCurso);

     //vaciar carrito
     vaciarCarritoBtn.addEventListener('click', (e) =>{
          e.preventDefault();
          articulosCarrito = [];
          carritoHTML();
     });
}


function agregarCurso(e){

     e.preventDefault();

     if(e.target.classList.contains('agregar-carrito') ){
          const cursoSeleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(cursoSeleccionado);
     }

}

function eliminarCurso(e){
     
     if(e.target.classList.contains('borrar-curso')){
          const cursoId = e.target.getAttribute('data-id')

          //eliminar del arreglo

          articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

          // console.log(articulosCarrito);

          //llamar para actualizar html
          carritoHTML();
     };
     
}


function leerDatosCurso(curso){

     // console.log(curso);

     const informacion = {
          imagen: curso.querySelector('IMG').src,
          titulo: curso.querySelector('H4').textContent,
          profesor: curso.querySelector('P').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('A').getAttribute('data-id'),
          cantidad: 1
     }

     const existe = articulosCarrito.some( curso => curso.id === informacion.id );
     if(existe === true){
          const cursos = articulosCarrito.map( curso => {
               if(curso.id === informacion.id){
                    curso.cantidad++;
                    return curso;       //retorca articulo actualizado
               }
               else{
                    return curso;       //retorna los articulos que no son el que busco
               }
          })
          articulosCarrito = [...articulosCarrito];
     }
     else{
          articulosCarrito = [...articulosCarrito,informacion];
     }

     carritoHTML();

}
//mostrar en el carrito de compras

function carritoHTML(){

     //limpiar el html
     
     limpiarHtml();

     articulosCarrito.forEach( curso =>{
          //recorrer carrito y generar hmtl
          const {imagen,titulo,precio,cantidad,id} = curso;
          const row = document.createElement('TR');
          row.innerHTML = `
               <td>
                    <img src=${imagen} >
               </td>
               <td>
                    ${titulo}
               </td>
               <td>
                    ${precio}
               </td>
               <td>
                    ${cantidad}
               </td>
               <td>
                    <a href='#' class="borrar-curso" data-id=${id}>X</a>
               </td>
          `;
          listaCarrito.appendChild(row);        

     })

}

//eliminar los cursos

function limpiarHtml(){

     //mientras tenga un hijo va a ir borrando
     while(listaCarrito.firstChild){
          listaCarrito.removeChild(listaCarrito.firstChild)
     }


}