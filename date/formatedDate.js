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
  
  var segundos = fecha.getSeconds();
  
  // Asegurarse de que los segundos tengan dos dígitos
  segundos = segundos < 10 ? '0' + segundos : segundos;
  
  var fechaFormateada = {
    fecha: dia + '/' + mes + '/' + año,
    hora: hora + ':' + minutos + ':' + segundos + `${hora < 12 ? ' AM' : ' PM'}`
  };
  
  return fechaFormateada;
}
