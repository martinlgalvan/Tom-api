export function getDate() {
  var fecha = new Date();
  
  // Ajustar la fecha para UTC-3
  fecha.setUTCHours(fecha.getUTCHours() - 3);
  
  var dia = fecha.getUTCDate();
  var mes = fecha.getUTCMonth() + 1; // Los meses comienzan en 0, por lo que se suma 1
  var año = fecha.getUTCFullYear();
  
  // Asegurarse de que el día y el mes tengan dos dígitos
  dia = dia.toString().padStart(2, '0');
  mes = mes.toString().padStart(2, '0');
  
  var hora = fecha.getUTCHours();
  var minutos = fecha.getUTCMinutes().toString().padStart(2, '0');
  var segundos = fecha.getUTCSeconds().toString().padStart(2, '0');
  
  var horaFormateada = hora + ':' + minutos + ':' + segundos;

  var indicacionHorario = hora < 12 ? 'AM' : 'PM';
  
  var fechaFormateada = {
    fecha: dia + '/' + mes + '/' + año,
    hora: horaFormateada + ' ' + indicacionHorario
  };
  
  return fechaFormateada;
}


