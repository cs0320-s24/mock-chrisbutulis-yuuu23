import { getNote } from "../../../../server/queries";
import { Modal } from "./Modal";
import FullPageImageView from "../../../full-image-page";

export default async function PositionModal({
  params: { id: noteId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(noteId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid note ID.");

  const note = await getNote(idAsNumber);
  return (
    <Modal>
      <FullPageImageView noteId={idAsNumber} />
    </Modal>
  );
}
