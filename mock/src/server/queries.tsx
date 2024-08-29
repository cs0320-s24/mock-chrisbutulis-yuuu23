interface Note {
  id: number;
  title: string;
  content: string;
}

const noteMap = new Map<string, Map<Number, Note>>();

export async function getNote(filename: string, id: number) {
  const note = noteMap.get(filename)?.get(id);

  if (!note) throw new Error("Note not found.");

  return note;
}

export async function deleteNote(filename: string, id: number) {
  const note = noteMap.get(filename)?.get(id);

  if (!note) throw new Error("Note not found.");

  noteMap.get("file name")!.delete(id);
  return note;
}
