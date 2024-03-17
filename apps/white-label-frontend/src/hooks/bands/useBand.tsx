
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getBand = async (bandId: number) => {
  const { data } = await axios.get(
    `http://localhost:3001/bands/${bandId}`
  );
  return data;
};

export default function usePost(bandId: number) {
  return useQuery(["getBand", bandId], () => getPostById(bandId));
}
