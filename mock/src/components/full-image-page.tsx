import { deleteNote, getNote } from "../server/queries";

export default async function FullPageImageView(props: {
  filename: string;
  noteId: number;
}) {
  const note = await getNote(props.filename, props.noteId);
  return (
    <div className="w-8/12 rounded-[25px] bg-[#2EA84A] p-4 ">
      <div className="flex flex-row items-center gap-12">
        <div className="flex flex-col">
          <h2>
            <span className="text-4xl">{}</span>
          </h2>
          <span>{note.title}</span>
          <span>{note.content}</span>
        </div>
      </div>

      <p>
        Lorum ipsum dolor sit amet, consectetur adipiscing elit. vitae sapien et
        nunc lacinia gravida. Nullam ut nisl nec Integer at nunc ac libero
        tincidunt Sed nec libero nec odio lacinia ultricies. Nullam nec eros
        libero congue lacinia. Nullam nec eros non libero lacinia. Nullam nec
        eros non libero congue lacinia. Nullam eros non libero congue lacinia.
        Nullam eros non congue lacinia. Nullam nec eros non libero congue Nullam
        nec eros non libero congue lacinia. Nullam nec congue lacinia. Nullam
        nec eros non libero lacinia. Nullam nec eros non.
      </p>

      <div className="">
        <form>
          <button type="submit">Favorite</button>
        </form>
      </div>

      <div className="">
        <form>
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}
