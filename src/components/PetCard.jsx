import { View, Text } from "react-native";
import Button from "./Button";
import RecordPhoto from "./RecordPhoto";
import { photoUrl } from "../api";
import { styles } from "../styles/common";
import { useVeterinaria } from "../context/VeterinariaContext";

export default function PetCard({ mascota: m }) {
  const { clientes, session, busy, openForm, remove } = useVeterinaria();
  const role = session.user.rol;
  // El backend solo permite PATCH/DELETE de mascotas a admin y veterinario.
  const canManage = ["admin", "veterinario"].includes(role);
  return (
    <View style={styles.card}>
      <RecordPhoto
        key={m.foto || "sin-foto"}
        uri={photoUrl(m.foto)}
        label={"Foto de " + m.nombre}
      />
      <Text style={styles.subtitle}>{m.nombre}</Text>
      <Text>
        {m.especie} · {m.raza || "Sin raza registrada"}
      </Text>
      <Text>
        Dueño:{" "}
        {clientes.find((c) => String(c.id) === String(m.clientesId))?.nombre ||
          m.cliente?.nombre ||
          "Sin datos"}
      </Text>
      <Text>{m.historiaClinica || "Sin historia clínica"}</Text>
      {canManage && (
        <Button
          title="Editar mascota"
          disabled={busy}
          onPress={() => openForm("mascotas", m)}
        />
      )}
      {canManage && (
        <Button
          title="Eliminar mascota"
          danger
          disabled={busy}
          onPress={() => remove("mascotas", m)}
        />
      )}
    </View>
  );
}
