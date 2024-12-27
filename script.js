// Función para formatear inputs con "$" y redondear a dos decimales
function formatearConSimbolo(input) {
    let valor = input.value.replace(/[^\d.]/g, ""); // Eliminar caracteres que no sean números o punto decimal
    if (valor.includes(".")) {
        const [entero, decimal] = valor.split(".");
        valor = decimal.length > 2 ? `${entero}.${decimal.slice(0, 2)}` : valor;
    }
    input.value = valor ? `${parseFloat(valor).toFixed(2)} $` : ""; // Añadir "$" y limitar a dos decimales
}

// Función para convertir el valor del input a número
function obtenerValorNumerico(input) {
    return parseFloat(input.value.replace(/[$,]/g, "")); // Quitar "$" y convertir a número
}

// Formulario 1: IVA + Ganancias + Ingresos Brutos
function calcularFormulario1() {
    const monto1Input = document.getElementById("monto1");
    const monto1 = obtenerValorNumerico(monto1Input);

    if (isNaN(monto1) || monto1 <= 0) {
        document.getElementById("porcentajeIva1").value = "";
        document.getElementById("porcentajeGanancias1").value = "";
        document.getElementById("porcentajeIngresosBrutos1").value = "";
        document.getElementById("total1").value = "";
        return 0;  // Retornar 0 si el monto es inválido
    }

    const iva = monto1 * 0.21;
    const ganancias = monto1 * 0.30;
    const ingresosBrutos = monto1 * 0.02;
    const total = monto1 + iva + ganancias + ingresosBrutos;

    document.getElementById("porcentajeIva1").value = `${iva.toFixed(2)} $`;
    document.getElementById("porcentajeGanancias1").value = `${ganancias.toFixed(2)} $`;
    document.getElementById("porcentajeIngresosBrutos1").value = `${ingresosBrutos.toFixed(2)} $`;
    document.getElementById("total1").value = `${total.toFixed(2)} $`;

    return total;  // Devolver el total calculado
}

// Formulario 2: IVA + Costo Fijo
document.addEventListener('DOMContentLoaded', function () {
    const montoInput = document.getElementById("monto2");
    const ivaInput = document.getElementById("porcentajeIva2");
    const costoFijoInput = document.getElementById("porcentajeFijo2");
    const totalInput = document.getElementById("total2");
    const ahorroInput = document.getElementById("ahorro"); // Campo para mostrar el ahorro

    // Función para calcular los valores y el ahorro en tiempo real
    function calcularValores() {
        const monto = obtenerValorNumerico(montoInput);

        if (isNaN(monto) || monto <= 0) {
            ivaInput.value = "";
            costoFijoInput.value = "";
            totalInput.value = "";
            ahorroInput.value = "";
            return;
        }

        // Opción 2: IVA + Costo Fijo
        const iva = monto * 0.21;
        let costoFijo = 0;

        if (monto >= 500000 && monto < 1000000) {
            costoFijo = monto * 0.30;
        } else if (monto >= 1000000 && monto < 5000000) {
            costoFijo = monto * 0.23;
        } else if (monto >= 5000000 && monto < 10000000) {
            costoFijo = monto * 0.20;
        } else if (monto >= 10000000 && monto < 15000000) {
            costoFijo = monto * 0.19;
        } else if (monto >= 15000000 && monto < 50000000) {
            costoFijo = monto * 0.16;
        } else if (monto >= 50000000 && monto <= 150000000) {
            costoFijo = monto * 0.15;
        }

        const totalFormulario2 = monto + iva + costoFijo;

        // Opción 1: IVA + Ganancias + Ingresos Brutos
        const totalFormulario1 = calcularFormulario1();  // Esto te dará el total de Formulario 1

        // Calcular la diferencia o ahorro
        const diferencia = totalFormulario1 - totalFormulario2;

        // Mostrar resultados en los campos
        ivaInput.value = `${iva.toFixed(2)} $`;
        costoFijoInput.value = `${costoFijo.toFixed(2)} $`;
        totalInput.value = `${totalFormulario2.toFixed(2)} $`;
        ahorroInput.value = diferencia > 0 ? `${diferencia.toFixed(2)} $` : `0.00 $`; // Muestra la diferencia como ahorro
    }

    // Actualizar símbolo en tiempo real
    montoInput.addEventListener("input", function () {
        formatearConSimbolo(montoInput);  // Formatear el valor con el símbolo "$"
        calcularValores();  // Calcular los valores en tiempo real
    });

    // Lógica del formulario
    const formulario2 = document.getElementById("formulario2");
    formulario2.addEventListener("submit", (event) => {
        event.preventDefault();

        const monto = obtenerValorNumerico(montoInput);
        const total = obtenerValorNumerico(totalInput);

        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingrese un monto válido.");
            return;
        }

        console.log("Monto ingresado:", monto);
        console.log("Total calculado:", total);
    });
});

// Evento para Formulario 1 en tiempo real
document.getElementById("monto1").addEventListener("input", function () {
    formatearConSimbolo(this); // Formatear el input con el símbolo "$"
    calcularFormulario1(); // Actualizar el cálculo para Formulario 1
});
