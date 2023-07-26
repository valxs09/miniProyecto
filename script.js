const productosContainer = document.getElementById("productosContainer");
const modalAgregar = document.getElementById("modalAgregar");
const modalActualizar = document.getElementById("modalActualizar");
const formularioAgregar = document.getElementById("formularioAgregar");
const formularioActualizar = document.getElementById("formularioActualizar");
const btnAgregar = document.getElementById("btnAgregar");
const closeBtns = document.getElementsByClassName("close");
const productos = [];

btnAgregar.onclick = function() {
    modalAgregar.style.display = "block";
}

for (let i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        modalAgregar.style.display = "none";
        modalActualizar.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modalAgregar || event.target == modalActualizar) {
        modalAgregar.style.display = "none";
        modalActualizar.style.display = "none";
    }
}

formularioAgregar.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const descripcion = document.getElementById("descripcionProducto").value;
    const precio = document.getElementById("precioProducto").value;
    const imagen = document.getElementById("imagenProducto").files[0];

    const producto = {
        id: productos.length + 1,
        nombre,
        descripcion,
        precio,
        imagenURL: URL.createObjectURL(imagen)
    };

    productos.push(producto);
    agregarProducto(producto);

    formularioAgregar.reset();
    modalAgregar.style.display = "none";
});

formularioActualizar.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById("productoId").value);
    const nombre = document.getElementById("nombreProductoActualizar").value;
    const descripcion = document.getElementById("descripcionProductoActualizar").value;
    const precio = document.getElementById("precioProductoActualizar").value;
    const imagen = document.getElementById("imagenProductoActualizar").files[0];

    const producto = productos.find(p => p.id === id);
    if (producto) {
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.imagenURL = URL.createObjectURL(imagen);

        actualizarProducto(producto);
    }

    modalActualizar.style.display = "none";
});

function agregarProducto(producto) {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList.add("producto");
    nuevoProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
        <img src="${producto.imagenURL}" alt="${producto.nombre}">
        <button class="btnEditar" data-id="${producto.id}">Editar</button>
        <button class="btnEliminar" data-id="${producto.id}">Eliminar</button>
    `;
    
    productosContainer.appendChild(nuevoProducto);

    const btnEditar = nuevoProducto.getElementsByClassName("btnEditar")[0];
    const btnEliminar = nuevoProducto.getElementsByClassName("btnEliminar")[0];

    btnEditar.onclick = function() {
        const id = parseInt(btnEditar.getAttribute("data-id"));
        const producto = productos.find(p => p.id === id);
        if (producto) {
            cargarDatosProducto(producto);
            modalActualizar.style.display = "block";
        }
    }

    btnEliminar.onclick = function() {
        const id = parseInt(btnEliminar.getAttribute("data-id"));
        const productoIndex = productos.findIndex(p => p.id === id);
        if (productoIndex !== -1) {
            productos.splice(productoIndex, 1);
            nuevoProducto.remove();
        }
    }
}

function actualizarProducto(producto) {
    const productoElement = productosContainer.querySelector(`.producto .btnEditar[data-id="${producto.id}"]`);
    if (productoElement) {
        const h3 = productoElement.parentNode.getElementsByTagName("h3")[0];
        const p = productoElement.parentNode.getElementsByTagName("p")[0];
        const precio = productoElement.parentNode.getElementsByTagName("p")[1];
        const img = productoElement.parentNode.getElementsByTagName("img")[0];

        h3.textContent = producto.nombre;
        p.textContent = producto.descripcion;
        precio.textContent = `Precio: $${producto.precio}`;
        img.src = producto.imagenURL;
        img.alt = producto.nombre;
    }
}

function cargarDatosProducto(producto) {
    document.getElementById("productoId").value = producto.id;
    document.getElementById("nombreProductoActualizar").value = producto.nombre;
    document.getElementById("descripcionProductoActualizar").value = producto.descripcion;
    document.getElementById("precioProductoActualizar").value = producto.precio;
}


const producto1 = {
    id: 1,
    nombre: "Anillos de esmeralda",
    descripcion: "Con piedra preciosa",
    precio: 429.00,
    imagenURL: "anillo.jpg"
};


const producto2 = {
    id: 3,
    nombre: "Aretes",
    descripcion: "Aretes de perlas blancas",
    precio: 399.00,
    imagenURL: "aretes.jpg"
};

const producto3 = {
    id: 2,
    nombre: "Anillo",
    descripcion: "Anillo con piedra verde",
    precio: 599.00,
    imagenURL: "anillo2.jpg"
};

productos.push(producto1, producto2, producto3);
agregarProducto(producto1);
agregarProducto(producto2);
agregarProducto(producto3);

