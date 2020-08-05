import { Sensor } from "./SensorService";

const serverURL = "http://localhost:9000";

export interface Note {
  number: string;
  text: string;
  _id: string;
}

export const getInfo = async () => {
    const res = await fetch(`${serverURL}/sensors/south`);
    if (res.status !== 200) {
      throw new Error("Error fetching south info");
    }
    return res.json() as Promise<Sensor>;
  };

export const getNotes = async () => {
  const res = await fetch(`${serverURL}/sensors/south/notes`);
  if (res.status !== 200) {
    throw new Error("Error fetching south notes");
  }
  return res.json() as Promise<Note[]>;
};