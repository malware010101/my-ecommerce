import { useQuery } from "@tanstack/react-query"; // 👈 FALTA ESTO
import api from "../../api";

export default function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get("/auth/users");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}