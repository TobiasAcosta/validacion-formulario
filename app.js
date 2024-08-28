
const firebaseConfig = {
    apiKey: "AIzaSyAU9zpOwmRzpkN771v3Q7SmP2noixrj3jM",
    authDomain: "datosformulario-cfc86.firebaseapp.com",
    projectId: "datosformulario-cfc86",
    storageBucket: "datosformulario-cfc86.appspot.com",
    messagingSenderId: "552280884696",
    appId: "1:552280884696:web:9623e0a375978572bc5ead",
    measurementId: "G-FZESGN7H3Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const form = document.getElementById('formulario');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'error! Introduce tu nombre';
        errorNombre.classList.add('error-message');
    }else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }
    //validar mail
    let entradaEmail = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    //patron de validacion
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!emailPattern.test(entradaEmail.value)){
        errorEmail.textContent = 'Error! Ingrese un email valido';
        errorEmail.classList.add('error-message');
    }else{
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }
    //validar contraseña
    let entradaPassword = document.getElementById('password');
    let errorPassword = document.getElementById('passwordError');
    //min 8 caracteres-max 15. al menos una mayus, una minuscula, un caracter especial y un numero
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    // al estar negado(!) si es false se convierte en true y entra en la funcion
    if(!passwordPattern.test(entradaPassword.value)){ 
        errorPassword.textContent = 'Min 8 caracteres-Máx 15. al menos una mayúscula, una minúscula, un número y un caracter especial ".-,*"'
        errorPassword.classList.add('error-message');
    }else{
        errorPassword.textContent = '';
        errorPassword.classList.remove('error-message');
    }
    //si todo los campos son validos enviar formulario
    if(!errorNombre.textContent && !errorEmail.textContent && !errorPassword.textContent ){
        // El BACKEND que recibe la informacion
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: entradaPassword.value
        })
        .then((docRef) => {
            alert('El formulario ha sido enviado con exíto!', docRef.id );
            form.reset();
        })
        .catch((error) => {
            alert(error);
        });
    }
})