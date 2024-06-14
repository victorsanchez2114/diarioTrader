   // Función para guardar una operación en el almacenamiento local
function guardarOperacion() {
    const form = document.getElementById('operacionForm');
    const data = new FormData(form);

    let operacion = {};
    for (const [key, value] of data.entries()) {
        operacion[key] = value;
    }

    let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
    operaciones.push(operacion);
    localStorage.setItem('operaciones', JSON.stringify(operaciones));

    mostrarOperaciones();
    form.reset();
}

// Función para mostrar las operaciones guardadas en la tabla
function mostrarOperaciones() {
    const operacionesTable = document.getElementById('operacionesTable');
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

    // Limpiar tabla
    operacionesTable.innerHTML = `
        <tr>
            <th>Fecha y Hora</th>
            <th>Instrumento</th>
            <th>Tipo de Operación</th>
            <th>Precio de Entrada</th>
            <th>Precio de Salida</th>
            <th>Tamaño de la Posición</th>
            <th>Razón</th>
            <th>Estrategia</th>
            <th>Emociones</th>
            <th>Resultado</th>
        </tr>
    `;

    // Llenar tabla con operaciones
    operaciones.forEach(operacion => {
        const row = document.createElement('tr');
        for (const key in operacion) {
            if (operacion.hasOwnProperty(key)) {
                const cell = document.createElement('td');
                cell.textContent = operacion[key];
                row.appendChild(cell);
            }
        }
        operacionesTable.appendChild(row);
    });
}

// Mostrar operaciones al cargar la página
mostrarOperaciones();

// Escuchar el evento submit del formulario
document.getElementById('operacionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    guardarOperacion();
})