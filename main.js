// Importamos los usuarios desde la base de datos (puedes usar un archivo JSON en producción).
import { usuarios } from '/database.js';

// Mostrar usuarios en la consola (solo para depuración)
console.log(usuarios);

// Función para iniciar sesión
function iniciarSesion() {
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    // Buscar usuario y contraseña en el array de usuarios
    let auth = usuarios.find((item) => item.usuario === usuario && item.contrasena === contrasena);

    if (auth) {
        // Redirección con temporizador
        let timerInterval;
        Swal.fire({
            title: "Bienvenido",
            html: "Será redireccionado en <h1></h1> milisegundos.",
            timer: 1000,
            timerProgressBar: true,
            icon: 'success',
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("h1");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
                window.location.href = 'panel.html'; // Redirigir al panel
            }
        });
    } else {
        // Mostrar error si el usuario o contraseña son incorrectos
        Swal.fire({
            title: "Error",
            text: "Usuario y/o contraseña incorrectos.",
            icon: "error"
        });
    }
}

// Función para registrar un nuevo usuario
function registrarUsuario() {
    let usuario = document.getElementById("rusuario").value;
    let contrasena = document.getElementById("rcontrasena").value;
    let correo = document.getElementById("rcorreo").value;
    let nombre = document.getElementById("rnombre").value;
    let profesion = document.getElementById("rprofesion").value;

    // Verificar si los campos están completos
    if (!usuario || !contrasena || !correo || !nombre || !profesion) {
        Swal.fire({
            title: "Error",
            text: "Por favor, completa todos los campos.",
            icon: "error"
        });
        return;
    }

    // Crear un objeto con la información del usuario
    let nuevoUsuario = {
        usuario: usuario,
        contrasena: contrasena,
        correo: correo,
        nombre: nombre,
        profesion: profesion
    };

    // Agregar el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario);

    // Almacenar los usuarios en el localStorage para persistencia
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar mensaje de éxito
    Swal.fire({
        title: "Registrado",
        text: "Tu cuenta ha sido creada con éxito.",
        icon: "success"
    });

    // Regresar al formulario de login
    mostrarFormularioLogin();
}

// Mostrar el formulario de registro
function mostrarFormularioRegistro() {
    document.getElementById('form-login').style.display = 'none';
    document.getElementById('form-register').style.display = 'flex';
}

// Mostrar el formulario de login
function mostrarFormularioLogin() {
    document.getElementById('form-login').style.display = 'flex';
    document.getElementById('form-register').style.display = 'none';
}

// Escuchar eventos de botones
document.getElementById('btnLogin').addEventListener('click', mostrarFormularioRegistro);
document.getElementById('btnRegister').addEventListener('click', mostrarFormularioLogin);

// Verificar si el usuario ya está registrado
function cargarUsuarios() {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
        // Si hay usuarios en localStorage, cargarlos
        return JSON.parse(usuariosGuardados);
    }
    // Si no hay, usar los usuarios predeterminados
    return usuarios;
}

// Actualizar la lista de usuarios
usuarios = cargarUsuarios();



import { mostrarRecetasVegetarianas, mostrarRecetasNoVegetarianas } from './database.js';

document.addEventListener('DOMContentLoaded', function() {
    // Aquí va tu código
    document.getElementById('Vegetarianas').addEventListener('click', mostrarRecetasVegetarianas);
    document.getElementById('NoVegetarianas').addEventListener('click', mostrarRecetasNoVegetarianas);
    document.getElementById('Cerrar-Sesion').addEventListener('click', cerrarSesion);
});

function cerrarSesion(event) {
    event.preventDefault();
    alert("Has cerrado sesión.");
}
