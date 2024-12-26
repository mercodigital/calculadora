// Formulario 1: IVA + Ganancias + Ingresos Brutos
function calcularFormulario1(event) {
    if (event) event.preventDefault();

    const monto1 = parseFloat(document.getElementById("monto1").value);

    if (isNaN(monto1) || monto1 <= 0) {
        document.getElementById("porcentajeIva1").value = "";
        document.getElementById("porcentajeGanancias1").value = "";
        document.getElementById("porcentajeIngresosBrutos1").value = "";
        document.getElementById("total1").value = "";
        return;
    }

    const iva = monto1 * 0.21;
    const ganancias = monto1 * 0.30;
    const ingresosBrutos = monto1 * 0.02;
    const total = monto1 + iva + ganancias + ingresosBrutos;

    document.getElementById("porcentajeIva1").value = iva.toFixed(2);
    document.getElementById("porcentajeGanancias1").value = ganancias.toFixed(2);
    document.getElementById("porcentajeIngresosBrutos1").value = ingresosBrutos.toFixed(2);
    document.getElementById("total1").value = total.toFixed(2);
}

// Formulario 2: IVA + Costo Fijo
document.addEventListener('DOMContentLoaded', function () {
    const montoInput = document.getElementById('monto2');
    const ivaInput = document.getElementById('porcentajeIva2');
    const costoFijoInput = document.getElementById('porcentajeFijo2');
    const totalInput = document.getElementById('total2');

    // Función para calcular el IVA, costo fijo y total
    function calcularValores() {
        const monto = parseFloat(montoInput.value);

        if (isNaN(monto) || monto <= 0) {
            ivaInput.value = '';
            costoFijoInput.value = '';
            totalInput.value = '';
            return;
        }

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

        const total = monto + iva + costoFijo;

        // Actualizar los campos de la interfaz
        ivaInput.value = iva.toFixed(2);
        costoFijoInput.value = costoFijo.toFixed(2);
        totalInput.value = total.toFixed(2);
    }

    // Escuchar el evento 'input' en el campo de monto para cálculos en tiempo real
    montoInput.addEventListener('input', calcularValores);

    // Lógica de envío del formulario
    const formulario2 = document.getElementById('formulario2');
    formulario2.addEventListener('submit', async (event) => {
        event.preventDefault();

        const monto2 = parseFloat(montoInput.value);
        const total2 = parseFloat(totalInput.value);

        if (isNaN(monto2) || monto2 <= 0) {
            alert('Por favor, ingrese un monto válido.');
            return;
        }

        const formData = new FormData();
        formData.append('monto2', monto2);
        formData.append('total2', total2);

        try {
            const response = await fetch('https://mkt.partners/calculadora.php', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Formulario enviado con éxito. Redirigiendo...');
                window.location.href = 'https://merco.agency';
            } else {
                alert('Error al enviar el formulario. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('No se pudo enviar el formulario. Intente más tarde.');
        }
    });
});
