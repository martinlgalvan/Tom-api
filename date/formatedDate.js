export function getDate() {
  var fecha = new Date();
  
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses comienzan en 0, por lo que se suma 1
  var año = fecha.getFullYear();
  
  // Asegurarse de que el día y el mes tengan dos dígitos
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;
  
  var hora = fecha.getHours();
  var minutos = fecha.getMinutes();
  
  // Asegurarse de que los minutos tengan dos dígitos
  minutos = minutos < 10 ? '0' + minutos : minutos;
  
  var fechaFormateada = {
    fecha: dia + '/' + mes + '/' + año,
    hora: hora + ':' + minutos
  };
  
  return fechaFormateada;
}
