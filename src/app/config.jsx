import { useProtectedRoute } from "../hooks/useProtectedRoute";
import { View, Text } from "react-native";
import Button from "../components/Button";
import { styles } from "../styles/common";
import { useVeterinaria } from "../context/VeterinariaContext";

export default function Config() {
  const access = useProtectedRoute();
  const { session, logout, refresh, loading, busy } = useVeterinaria();
  if (access) return access;
  return (
    <View style={styles.card}>
      <Text style={styles.subtitle}>Ajustes</Text>
      <Text style={styles.label}>Usuario</Text>
      <Text>{session.user.email}</Text>
      <Text style={styles.label}>Rol</Text>
      <Text>{session.user.rol}</Text>
      <Button
        title="Actualizar datos"
        onPress={refresh}
        disabled={loading || busy}
      />
      <Button title="Cerrar sesión" danger onPress={logout} disabled={busy} />
    </View>
  );
}
