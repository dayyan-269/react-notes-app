import { useEffect, useState } from 'react'
import {
  getInitialData,
  showFormattedDate,
} from '../utils/data'

//  components
import Card from '../components/Card'
import RegularInput from '../components/inputs/RegularInput'
import RegularTextarea from '../components/inputs/RegularTextarea'
import RegularCheckbox from '../components/inputs/RegularCheckbox'
import PrimaryButton from '../components/buttons/PrimaryButton'
import Note from '../components/items/Note'

function HomePage() {
  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])

  const setActiveData = () => {
    const activeNotesData = getInitialData().filter(
      (item) => item.archived == false
    )
    setActiveNotes(activeNotesData)
  }

  const setArchiveData = () => {
    const archivedNotesData = getInitialData().filter(
      (item) => item.archived == true
    )
    setArchivedNotes(archivedNotesData)
  }

  useEffect(setActiveData, [])
  useEffect(setArchiveData, [])

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [archive, setArchive] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  // Event Listener for Input
  const searchInputListener = (e) => setSearchKeyword(e.target.value)
  const titleInputListener = (e) => setTitle(e.target.value)
  const contentInputListener = (e) => setContent(e.target.value)
  const archiveCheckListener = (e) => setArchive(e.target.checked)

  const resetNotes = () => {
    setSearchKeyword('')
    setActiveData();
    setArchiveData();
  }

  const insertNote = () => {
    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      archived: archive,
      date: new Date().toISOString()
    };
  }

  const filterNotes = () => {
    const keywordLower = searchKeyword.toLowerCase()

    if (keywordLower.length > 0) {
      const filteredActive = activeNotes.filter((item) => {
        const titleLower = item.title.toLowerCase()
        return titleLower.includes(keywordLower)
      })

      const filteredArchived = archivedNotes.filter((item) => {
        const titleLower = item.title.toLowerCase()
        return titleLower.includes(keywordLower)
      })

      setActiveNotes(filteredActive)
      setArchivedNotes(filteredArchived)
    }
  }

  const deleteNote = () => {}

  const archiveNote = () => {}

  return (
    <main className="mx-auto w-3/5 py-5">
      <section aria-label="input form">
        <Card className="bg-white" headerCaption={'Insert New Data'}>
          <form method="post">
            <div className="flex flex-col gap-3">
              <RegularInput
                description="Title"
                type="text"
                className="w-full"
                isRequired={true}
                onChange={titleInputListener}
              />
              <RegularTextarea
                description="Content"
                className="w-full"
                isRequired={true}
                onChange={contentInputListener}
              />
              <RegularCheckbox description="Is it archived?" onChange={archiveCheckListener} />
              <PrimaryButton
                description="Submit"
                className="w-fit"
                type="button"
                onClick={insertNote}
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
                className="h-fit flex-1"
                type={'button'}
              />
              <PrimaryButton
                description={'Reset'}
                className={`border-1 h-fit flex-1 ${
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
