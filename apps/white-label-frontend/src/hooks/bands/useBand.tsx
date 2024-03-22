

import axios from "axios";


export const getBand = async (bandId: number) => {
  const { data } = await axios.get(
    `/bands/${bandId}`
  );
  return data;
};

export default async function useBand(bandId: number) {
  
  return getBand(bandId);
}
