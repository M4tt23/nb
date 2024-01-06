let recetas;

const recetasGuardadas = localStorage.getItem("recetas");

if (recetasGuardadas) {
    recetas = JSON.parse(recetasGuardadas);
} else {
    recetas = [];
}

window.onload = function () {
    mostrarRecetas();
};

function agregarReceta() {
    console.log('Función agregarReceta ejecutada');
    
    // Obtener valores del formulario
    const nombreReceta = document.getElementById("recipeName").value;
    const enlaceReceta = document.getElementById("recipeURL").value;
    const categoriaReceta = document.getElementById("recipeCategory").value;

    // Validar que ambos campos no estén vacíos
    if (!nombreReceta.trim() || !enlaceReceta.trim()) {
        alert("Por favor, ingresa un nombre de receta y un enlace.");
        return; // Detener la ejecución si falta algún campo
    }

    // Validar que el enlace sea una URL válida
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (!urlPattern.test(enlaceReceta)) {
        alert("Por favor, ingresa un enlace válido.");
        return; // Detener la ejecución si el enlace no es válido
    }

    // Crear un objeto de receta
    const nuevaReceta = {
        nombre: nombreReceta,
        enlace: enlaceReceta,
        categoria: categoriaReceta
    };

    // Agregar la receta a la lista
    recetas.push(nuevaReceta);

    // Guardar recetas en el almacenamiento local
    localStorage.setItem("recetas", JSON.stringify(recetas));

    // Limpiar el formulario
    document.getElementById("recipeName").value = "";
    document.getElementById("recipeURL").value = "";

    // Actualizar la visualización de las recetas
    mostrarRecetas();
}

function mostrarRecetas() {
    const recetasDiv = document.getElementById("recetas");
    recetasDiv.innerHTML = "";

    // Mostrar recetas por categoría
    ["salado", "dulce", "snack", "otro"].forEach(categoria => {
        const recetasCategoria = recetas.filter(receta => receta.categoria === categoria);

        if (recetasCategoria.length > 0) {
            const categoriaDiv = document.createElement("div");
            categoriaDiv.innerHTML = `<h2>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>`;

            recetasCategoria.forEach((receta, index) => {
                const recetaDiv = document.createElement("div");
                recetaDiv.innerHTML = `<p>${receta.nombre} - <a href="${receta.enlace}" target="_blank">Ver receta</a> <button onclick="eliminarReceta(${index})">Eliminar</button></p>`;
                categoriaDiv.appendChild(recetaDiv);
            });

            recetasDiv.appendChild(categoriaDiv);
        }
    });
}

function eliminarReceta(index) {
    // Eliminar la receta de la lista
    recetas.splice(index, 1);

    // Guardar recetas actualizadas en el almacenamiento local
    localStorage.setItem("recetas", JSON.stringify(recetas));

    // Actualizar la visualización de las recetas
    mostrarRecetas();
}
