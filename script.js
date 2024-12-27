// Función para formatear números con puntos y símbolo
function formatarNumeroConSimbolo(valor) {
    // Convertir el valor en número y asegurarse de que sea entero
    let numero = parseInt(valor, 10);
    if (isNaN(numero)) {
        return ""; // Si no es un número válido, regresamos vacío
    }

    // Formatear el número con separadores de miles
    return numero.toLocaleString('es-AR') + '$';
}

// Obtener el valor numérico de un input, sin formato
function obtenerValorNumerico(input) {
    return parseInt(input.value.replace(/\./g, '').replace(/\$/g, '').trim(), 10) || 0;
}

// Función para los cálculos en el primer formulario
function calcularFormulario1(event) {
    event.preventDefault(); // Para prevenir el envío del formulario

    const monto1Input = document.getElementById("monto1");
    const monto1 = obtenerValorNumerico(monto1Input);

    // Si el monto es menor o igual a cero, salimos
    if (monto1 <= 0) {
        document.getElementById("porcentajeIva1").value = "";
        document.getElementById("porcentajeGanancias1").value = "";
        document.getElementById("porcentajeIngresosBrutos1").value = "";
        document.getElementById("total1").value = "";
        document.getElementById("porcentajeAplicado").textContent = ""; // Limpiar el porcentaje

        return;
    }

    // Calcular IVA, ganancias e ingresos brutos
    const iva = monto1 * 0.21;
    const ganancias = monto1 * 0.30;
    const ingresosBrutos = monto1 * 0.02;

    // Calcular total
    const total = monto1 + iva + ganancias + ingresosBrutos;

    // Mostrar los resultados en los inputs correspondientes
    document.getElementById("porcentajeIva1").value = formatarNumeroConSimbolo(iva);
    document.getElementById("porcentajeGanancias1").value = formatarNumeroConSimbolo(ganancias);
    document.getElementById("porcentajeIngresosBrutos1").value = formatarNumeroConSimbolo(ingresosBrutos);
    document.getElementById("total1").value = formatarNumeroConSimbolo(total);
}

// Función para los cálculos en el segundo formulario con costos operativos dinámicos
function calcularFormulario2() {
    const monto2Input = document.getElementById("monto2");
    const monto2 = obtenerValorNumerico(monto2Input);

    // Si el monto es menor o igual a cero, salimos
    if (monto2 <= 0) {
        document.getElementById("porcentajeIva2").value = "";
        document.getElementById("porcentajeFijo2").value = "";
        document.getElementById("total2").value = "";
        document.getElementById("ahorro").value = "";
        return;
    }

    // Calcular IVA
    const iva = monto2 * 0.21;
    
    // Determinar porcentaje de costo operativo en base al monto
    let porcentajeCostoOperativo = 0;
      let porcentajeTexto = ""

    if (monto2 >= 500000 && monto2 < 1000000) {
        porcentajeCostoOperativo = 0.30; // 30% para montos entre 500000 y 1000000
        porcentajeTexto = "(+30%)";
    } else if (monto2 >= 1000000 && monto2 < 5000000) {
        porcentajeCostoOperativo = 0.23; // 23% para montos entre 1000000 y 5000000
        porcentajeTexto = "(+23%)";
    } else if (monto2 >= 5000000 && monto2 < 10000000) {
        porcentajeCostoOperativo = 0.20; // 20% para montos entre 5000000 y 10000000
        porcentajeTexto = "(+20%)";
    } else if (monto2 >= 10000000 && monto2 < 15000000) {
        porcentajeCostoOperativo = 0.19; // 19% para montos entre 10000000 y 15000000
        porcentajeTexto = "(+19%)";
    } else if (monto2 >= 15000000 && monto2 < 50000000) {
        porcentajeCostoOperativo = 0.16; // 16% para montos entre 15000000 y 50000000
        porcentajeTexto = "(+16%)";
    } else if (monto2 >= 50000000 && monto2 < 150000000) {
        porcentajeCostoOperativo = 0.15; // 15% para montos entre 50000000 y 150000000
        porcentajeTexto = "(+15%)";
    } else if (monto2 > 50000000) {
        porcentajeCostoOperativo = 0.15; // 15% para montos entre 50000000 y 150000000
        porcentajeTexto = "(+0%)";
    }

    // Mostrar el porcentaje aplicado
    document.getElementById("porcentajeAplicado").textContent = `${porcentajeTexto}`;

    // Calcular costo operativo
    const costoOperativo = monto2 * porcentajeCostoOperativo;

    // Calcular total y ahorro
    const total = monto2 + iva + costoOperativo;
    
    // Obtener el total del primer formulario
    const total1 = obtenerValorNumerico(document.getElementById("total1"));
    
    // Calcular ahorro como diferencia entre total1 y total2
    let ahorro = total1 - total;

    // Si el ahorro es negativo, lo dejamos en 0
    if (ahorro < 0) {
        ahorro = 0;
    }

    // Mostrar los resultados
    document.getElementById("porcentajeIva2").value = formatarNumeroConSimbolo(iva);
    document.getElementById("porcentajeFijo2").value = formatarNumeroConSimbolo(costoOperativo);
    document.getElementById("total2").value = formatarNumeroConSimbolo(total);
    document.getElementById("ahorro").value = formatarNumeroConSimbolo(ahorro);
}

// Función que formatea los números dentro de los inputs cuando se escribe
function formatearInputConSimbolo(input) {
    let valor = input.value.replace(/\./g, ''); // Eliminar puntos si los hay
    valor = valor.replace(/\$/g, ''); // Eliminar signo '$' si existe

    if (isNaN(valor) || valor === "") {
        input.value = "";
        return;
    }

    // Añadir puntos de separador de miles
    const valorFormateado = parseInt(valor).toLocaleString('es-AR') + '$';
    input.value = valorFormateado;

    // Llamar a calcularFormulario1 para que se realicen los cálculos
    if (input.id === 'monto1') {
        calcularFormulario1(event);
    }
}
