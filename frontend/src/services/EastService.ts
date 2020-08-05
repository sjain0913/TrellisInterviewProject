import { Sensor } from "./SensorService";

const serverURL = "http://localhost:9000";

export interface Note {
  number: string;
  text: string;
  _id: string;
}

export const getInfo = async () => {
    const res = await fetch(`${serverURL}/sensors/east`);
    if (res.status !== 200) {
      throw new Error("Error fetching east info");
    }
    return res.json() as Promise<Sensor>;
  };

export const getNotes = async () => {
  const res = await fetch(`${serverURL}/sensors/east/notes`);
  if (res.status !== 200) {
    throw new Error("Error fetching east notes");
  }
  return res.json() as Promise<Note[]>;
};

export const getNoteNumber = async (noteNumber: number) => {
  const res = await fetch(`${serverURL}/sensors/east/notes/${noteNumber}`);
  if (res.status !== 200) {
    throw new Error("Error fetching east notes");
  }
  return res.json() as Promise<Note>;
}
