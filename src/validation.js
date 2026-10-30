// Espejo de los DTO de NestJS (create-cliente.dto.ts y create-mascota.dto.ts).
// La validación definitiva sigue siendo la del servidor.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function len(value, min, max, label) {
  const n = String(value ?? "").trim().length;
  if (n < min || n > max)
    return label + ": entre " + min + " y " + max + " caracteres.";
  return "";
}

export function validate(kind, v) {
  if (kind === "clientes") {
    return (
      len(v.nombre, 2, 50, "Nombre") ||
      len(v.apellido, 2, 50, "Apellido") ||
      (/^\d{7,10}$/.test(String(v.documento ?? "").trim())
        ? ""
        : "Documento: 7 a 10 dígitos.") ||
      len(v.direccion, 1, 50, "Dirección") ||
      len(v.localidad, 1, 50, "Localidad") ||
      len(v.telefono, 1, 20, "Teléfono") ||
      (EMAIL.test(String(v.email ?? "").trim())
        ? ""
        : "Ingresá un correo electrónico válido.")
    );
  }
  return (
    len(v.nombre, 1, 50, "Nombre") ||
    len(v.especie, 1, 50, "Especie") ||
    len(v.raza, 1, 50, "Raza") ||
    (/^\d+$/.test(String(v.clientesId ?? "")) ? "" : "Elegí un dueño.")
  );
}
