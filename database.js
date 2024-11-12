// Función para mostrar recetas vegetarianas
export function mostrarRecetasVegetarianas() {
    console.log("Mostrando recetas vegetarianas");
    document.getElementById('recetas-vegetarianas').style.display = 'flex';
    document.getElementById('recetas-no-vegetarianas').style.display = 'none';
}

// Función para mostrar recetas no vegetarianas
export function mostrarRecetasNoVegetarianas() {
    console.log("Mostrando recetas no vegetarianas");
    document.getElementById('recetas-no-vegetarianas').style.display = 'flex';
    document.getElementById('recetas-vegetarianas').style.display = 'none';
}
