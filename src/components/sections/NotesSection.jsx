import { showFormattedDate } from '../../utils/data'
import Note from '../items/Note'

const NotesSection = ({
  sectionTitle,
  notes,
  deleteNoteHandler,
  changeNoteStatusHandler,
}) => {
  return (
    <section aria-label="catalog active" className="mt-3">
      <h4 className="text-lg font-bold">{sectionTitle}</h4>
      {notes.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-4">
          {notes.map((note) => {
            return (
              <Note
                id={note.id}
                key={note.id}
                title={note.title}
                content={note.body}
                date={showFormattedDate(note.createdAt)}
                archived={note.archived}
                deleteHandler={deleteNoteHandler}
                changeStatusHandler={changeNoteStatusHandler}
              />
            )
          })}
        </div>
      ) : (
        <p className="py-3 text-center">There's no active note</p>
      )}
    </section>
  )
}

export default NotesSection
