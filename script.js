function formatearInputConSimbolo(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('de-DE').format(value);
    input.value = formattedValue ? `${formattedValue}$` : '';
}

function calcularAmbosFormularios() {
    const monto1 = parseFloat(document.getElementById('monto1').value.replace(/\D/g, '')) || 0;

    // Cálculos para Formulario 1
    const iva1 = monto1 * 0.21;
    const ganancias1 = monto1 * 0.30;
    const ingresosBrutos1 = monto1 * 0.02;
    const total1 = monto1 + iva1 + ganancias1 + ingresosBrutos1;

    document.getElementById('porcentajeIva1').value = `${new Intl.NumberFormat('de-DE').format(Math.round(iva1))}$`;
    document.getElementById('porcentajeGanancias1').value = `${new Intl.NumberFormat('de-DE').format(Math.round(ganancias1))}$`;
    document.getElementById('porcentajeIngresosBrutos1').value = `${new Intl.NumberFormat('de-DE').format(Math.round(ingresosBrutos1))}$`;
    document.getElementById('total1').value = `${new Intl.NumberFormat('de-DE').format(Math.round(total1))}$`;

    // Cálculos para Formulario 2
    const iva2 = monto1 * 0.21;

    // Determinar costo operativo
    let costoOperativo = 0;
    let porcentajeCosto = '';
    
    if (monto1 >= 500000 && monto1 < 1000000) {
        costoOperativo = monto1 * 0.20;
        porcentajeCosto = '(+20%)';
    } 
    
    else if (monto1 >= 1000000 && monto1 < 5000000) {
        costoOperativo = monto1 * 0.18;
        porcentajeCosto = '(+18%)';
    } 
    
    else if (monto1 >= 5000000 && monto1 < 10000000) {
        costoOperativo = monto1 * 0.16;
        porcentajeCosto = '(+16%)';
    } 
    
    else if (monto1 >= 10000000 && monto1 < 15000000) {
        costoOperativo = monto1 * 0.15;
        porcentajeCosto = '(+15%)';
    } 
    
    else if (monto1 >= 15000000 && monto1 < 50000000) {
        costoOperativo = monto1 * 0.14;
        porcentajeCosto = '(+14%)';
    } 

    else if (monto1 >= 50000000 && monto1 < 150000000) {
        costoOperativo = monto1 * 0.13;
        porcentajeCosto = '(+13%)';
    } 
    
    else if (monto1 > 150000000) {
        costoOperativo = monto1 * 0.125;
        porcentajeCosto = '(+12,5%)';
    }

    const total2 = monto1 + iva2 + costoOperativo;

    document.getElementById('porcentajeIva2').value = `${new Intl.NumberFormat('de-DE').format(Math.round(iva2))}$`;
    document.getElementById('porcentajeFijo2').value = `${new Intl.NumberFormat('de-DE').format(Math.round(costoOperativo))}$`;
    document.getElementById('porcentajeFijo2Porcentaje').innerText = porcentajeCosto;
    document.getElementById('total2').value = `${new Intl.NumberFormat('de-DE').format(Math.round(total2))}$`;

    // Cálculo del ahorro
    const ahorro = Math.max(0, total1 - total2);
    document.getElementById('ahorro').value = `${new Intl.NumberFormat('de-DE').format(Math.round(ahorro))}$`;
}






























let btnWhatsApp = document.querySelector(".btnWhatsApp");
btnWhatsApp.addEventListener("click", function(){
    open("https://wa.me/+5491126083975");
  })