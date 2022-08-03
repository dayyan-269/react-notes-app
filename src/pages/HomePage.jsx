import { useEffect, useState } from 'react'
import { getInitialData, showFormattedDate } from '../utils/data'

//  components
import Card from '../components/Card'
import RegularInput from '../components/inputs/RegularInput'
import RegularTextarea from '../components/inputs/RegularTextarea'
import RegularCheckbox from '../components/inputs/RegularCheckbox'
import PrimaryButton from '../components/buttons/PrimaryButton'
import Note from '../components/items/Note'

function HomePage() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    setNotes(getInitialData())
  }, [])

  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])

  useEffect(() => {
    setActiveNotes(notes.filter((note) => note.archived === false))
    setArchivedNotes(notes.filter((note) => note.archived === true))
  }, [notes])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [archive, setArchive] = useState(false)
  const [titleCount, setTitleCount] = useState(50)
  const [searchKeyword, setSearchKeyword] = useState('')

  // Event Listener for Input
  const searchInputListener = (e) => setSearchKeyword(e.target.value)
  const titleInputListener = (e) => setTitle(e.target.value)
  const contentInputListener = (e) => setContent(e.target.value)
  const archiveCheckListener = (e) => setArchive(e.target.checked)

  const resetNotes = () => {
    setSearchKeyword('')
    setActiveNotes(notes.filter((item) => item.archived === false))
    setArchivedNotes(notes.filter((item) => item.archived === true))
  }

  const resetInputForm = () => {
    setTitle('')
    setContent('')
    setArchive(false)
  }

  const insertNote = (e) => {
    e.preventDefault()

    const newNote = {
      id: Date.now(),
      title: title,
      body: content,
      createdAt: new Date().toISOString(),
      archived: archive,
    }

    setNotes([...notes, newNote])
    resetInputForm()
  }

  const filterNotes = () => {
    const keywordLower = searchKeyword.toLowerCase()

    if (keywordLower.length > 0) {
      const filteredActive = notes.filter((item) => {
        const titleLower = item.title.toLowerCase()
        return titleLower.includes(keywordLower) && item.archived === false
      })

      const filteredArchived = notes.filter((item) => {
        const titleLower = item.title.toLowerCase()
        return titleLower.includes(keywordLower) && item.archived === true
      })

      setActiveNotes(filteredActive)
      setArchivedNotes(filteredArchived)
    }
  }

  const deleteNoteHandler = (id) => {
    const newestNotes = notes.filter((note) => note.id !== id)
    setNotes(newestNotes)
  }

  const changeNoteStatusHandler = (id) => {
    const updatedNote = notes.map((note) => {
      if (note.id === id) {
        note.archived = !note.archived
      }
      return note
    })

    setNotes(updatedNote)
  }

  return (
    <main className="mx-auto w-3/5 py-5">
      <section aria-label="input form">
        <Card className="bg-white" headerCaption={'Insert New Data'}>
          <form onSubmit={(e) => insertNote(e)}>
            <div className="flex flex-col gap-3">
              <p className="text-end">
                {titleCount - title.length >= 0 ? titleCount - title.length : 0}{' '}
                character(s) remaining
              </p>
              <RegularInput
                description="Title"
                type="text"
                className="w-full"
                isRequired={true}
                value={title}
                onChange={titleInputListener}
              />
              <RegularTextarea
                description="Content"
                className="w-full"
                isRequired={true}
                value={content}
                onChange={contentInputListener}
              />
              <RegularCheckbox
                description="Is it archived?"
                checked={archive}
                onChange={archiveCheckListener}
              />
              <PrimaryButton
                description="Submit"
                className={`w-fit text-white ${
                  titleCount - title.length > 0 ? 'bg-green-600' : 'bg-gray-600'
                }`}
                type="submit"
                disabled={titleCount - title.length > 0 ? false : true}
              />
            </div>
          </form>
        </Card>
      </section>
      <section aria-label="search form">
        <Card className="mt-5 bg-white" headerCaption={'Catalog'}>
          <form method="GET">
            <div className="flex flex-row gap-2">
              <RegularInput
                description="Search"
                isRequired={true}
                className="flex-[10]"
                value={searchKeyword}
                onChange={searchInputListener}
              />
              <PrimaryButton
                onClick={filterNotes}
                description={'Search'}
                className="h-fit flex-1 bg-green-600 text-white"
                type={'button'}
              />
              <PrimaryButton
                description={'Reset'}
                className={`border-1 h-fit flex-1 text-white ${
                  searchKeyword
                    ? 'cursor-pointer bg-blue-400'
                    : 'cursor-not-allowed bg-gray-600'
                }`}
                disabled={searchKeyword ? false : true}
                onClick={resetNotes}
              />
            </div>
          </form>
        </Card>
      </section>
      <section aria-label="catalog active" className="mt-3">
        <h4 className="text-lg font-bold">Active Notes</h4>
        {activeNotes.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-4">
            {activeNotes.map((note) => {
              return (
                <Note
                  id={note.id}
                  key={note.id}
                  title={note.title}
                  content={note.body}
                  date={showFormattedDate(note.createdAt)}
                  archived={note.archived}
                  deleteHandler={deleteNoteHandler}
                  archiveHandler={changeNoteStatusHandler}
                />
              )
            })}
          </div>
        ) : (
          <p className="py-3 text-center">There's no active note</p>
        )}
      </section>
      <section aria-label="catalog archived" className="mt-3">
        <h4 className="text-lg font-bold">Archived Notes</h4>
        {archivedNotes.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-4">
            {archivedNotes.map((note) => {
              return (
                <Note
                  id={note.id}
                  key={note.id}
                  title={note.title}
                  content={note.body}
                  date={showFormattedDate(note.createdAt)}
                  archived={note.archived}
                  deleteHandler={deleteNoteHandler}
                  archiveHandler={changeNoteStatusHandler}
                />
              )
            })}
          </div>
        ) : (
          <p className="py-3 text-center">There's no archived note</p>
        )}
      </section>
    </main>
  )
}

export default HomePage
