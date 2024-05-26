var editar = document.getElementById("edite");
var ver = document.getElementById("see");
var regresar = document.getElementById("close");

var f = document.querySelector(".editarEvento");
var s = document.querySelector(".seeEventos");

function closeEdit() {
    f.style.display = "none";
}

function closeSee() {
    s.style.display = "none";
}


ver.addEventListener('click', function(event){
    s.style.display = "block";
    fetch('/agenda-tree')
    .then(response => response.text())
    .then(tree => {
        document.getElementById('agenda-tree').innerHTML = tree;
    })
    .catch(error => console.error('Error fetching agenda tree:', error));
    
    console.log("nothing");
})
/*
regresar.addEventListener('click', function(event){
    console.log("nothing");
})
*/
editar.addEventListener('click', function(event){

    f.style.display = "block";

    fetch('/agenda-editar')
    .then(response => response.text())
    .then(tree => {
        document.getElementById('editarEvento').innerHTML = tree;
    })
    .catch(error => console.error('Error fetching agenda tree:', error));
    
    console.log("nothing");
});





document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const descripcion = document.querySelector('textarea[name="descripcion"]').value;
  
    const data = { title, fecha, hora, descripcion };
  
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data),
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});