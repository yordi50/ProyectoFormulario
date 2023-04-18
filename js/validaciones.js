export function valida(input){
    const tipoInput = input.dataset.tipo;

    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if(input.validity.valid ){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input)
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError",
]

const mensajesError = {
    nombre: {
        valueMissing: "Este campo de aquí no puede estar vacío"
    },
    email: {
        valueMissing: "ESte caso no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo es obligatorio",
        patternMismatch: "Al menos 6 caracteres, maximo 12,debe contener 1 letra mayuscula,un número y no puede contenerr caracteres especiales",
    },
    nacimiento: {
        valueMissing: "No ingreso su fecha de nacimiento",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXX 9 numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es de 10 a 40 caracteres direccion",
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es de 10 a 40 caracteres ciudad",
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es de 10 a 40 caracteres provincia",
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input)
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
           mensaje = mensajesError[tipoInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
};

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
        return(diferenciaFechas <= fechaActual);
}
