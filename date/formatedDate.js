export function getDate() {
  var fecha = new Date();
  
  var dia = fecha.getUTCDate();
  var mes = fecha.getUTCMonth() + 1; // Los meses comienzan en 0, por lo que se suma 1
  var año = fecha.getUTCFullYear();
  
  // Asegurarse de que el día y el mes tengan dos dígitos
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;
  
  var hora = fecha.getUTCHours() - 3; // Restar 3 horas para obtener la hora en GMT-3
  
  // Asegurarse de que la hora esté dentro del rango de 0 a 23
  hora = hora < 0 ? 24 + hora : hora;
  
  var minutos = fecha.getUTCMinutes();
  
  // Asegurarse de que los minutos tengan dos dígitos
  minutos = minutos < 10 ? '0' + minutos : minutos;
  
  var segundos = fecha.getUTCSeconds();
  
  // Asegurarse de que los segundos tengan dos dígitos
  segundos = segundos < 10 ? '0' + segundos : segundos;
  
  var horaFormateada = hora + ':' + minutos + ':' + segundos;
  
  var fechaFormateada = {
    fecha: dia + '/' + mes + '/' + año,
    hora: horaFormateada
  };
  
  return fechaFormateada;
}
