import { Sensor } from "./SensorService";

const serverURL = "http://localhost:9000";

export interface Note {
  number: string;
  text: string;
  _id: string;
}

export const getInfo = async () => {
    const res = await fetch(`${serverURL}/sensors/north`);
    if (res.status !== 200) {
      throw new Error("Error fetching north info");
    }
    return res.json() as Promise<Sensor>;
  };

export const getNotes = async () => {
  const res = await fetch(`${serverURL}/sensors/north/notes`);
  if (res.status !== 200) {
    throw new Error("Error fetching north notes");
  }
  return res.json() as Promise<Note[]>;
};