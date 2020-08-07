import { Sensor } from "./SensorService";

const serverURL = "http://localhost:9000";

export interface Note {
  text: string;
  _id: string;
  timestamp: Date;
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

export const addNote = async (text: string) => {
  let note = {
    text: text
  }
  const posted = await fetch(`${serverURL}/sensors/east/notes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(note)
  });
  if (posted.status !== 200) {
    throw new Error("Error posting note!")
  }
  return posted.json() as Promise<Note>;
}

export const deleteNote = async (ID: string) => {
  const deleted = await fetch(`${serverURL}/sensors/east/notes/${ID}`, {
    method: 'DELETE',
  });
  if (deleted.status !== 200) {
    throw new Error("Error deleted note");
  }
  return deleted.json() as Promise<Note>;
}