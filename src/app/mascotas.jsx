import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { useState } from "react";
import { Text } from "react-native";
import ListToolbar from "../components/ListToolbar";
import PetCard from "../components/PetCard";
import { useVeterinaria } from "../context/VeterinariaContext";
import { coincideBusqueda } from "../utils/buscar";

export default function Mascotas() {
  const access = useProtectedRoute();
  const { mascotas, loading } = useVeterinaria();
  const [search, setSearch] = useState("");
  if (access) return access;
  const visible = mascotas.filter((item) =>
    coincideBusqueda(search, [item.nombre]),
  );
  return (
    <>
      <ListToolbar kind="mascotas" search={search} setSearch={setSearch} />
      {visible.map((item) => (
        <PetCard mascota={item} key={item.id} />
      ))}
      {!loading && !mascotas.length && <Text>No hay registros todavía.</Text>}
    </>
  );
}