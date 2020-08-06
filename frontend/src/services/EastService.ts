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

export const deleteNote = async (ID: number) => {
  const deleted = await fetch(`${serverURL}/sensors/east/notes/${ID.toString()}`, {
    method: 'DELETE',
  });
  if (deleted.status !== 200) {
    throw new Error("Error deleted note");
  }
  return deleted.json() as Promise<Note>;
}