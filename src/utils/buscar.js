const normalizar = (texto) =>
  String(texto ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .trim();

// Distancia de edición (cuenta como 1 error: sobrar, faltar, cambiar o intercambiar letras)
const distancia = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
};

const coincide = (palabra, palabrasTexto) =>
  palabrasTexto.some((p) => {
    if (p.includes(palabra)) return true; // "gom" encuentra "gomez"
    const margen = palabra.length <= 3 ? 0 : palabra.length <= 6 ? 1 : 2;
    const inicio = p.slice(0, palabra.length);
    return distancia(palabra, p) <= margen || distancia(palabra, inicio) <= margen;
  });

// campos: lista de textos donde buscar, ej. [cliente.nombre, cliente.apellido]
export const coincideBusqueda = (busqueda, campos) => {
  const palabras = normalizar(busqueda).split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return true;
  const palabrasTexto = normalizar(campos.join(" ")).split(/\s+/).filter(Boolean);
  return palabras.every((palabra) => coincide(palabra, palabrasTexto));
};