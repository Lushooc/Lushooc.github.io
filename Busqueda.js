function buscar() {
    var busqueda = document.getElementById("busqueda").value;
    window.location.href = "resultados.html?busqueda=" + encodeURIComponent(busqueda);
  }