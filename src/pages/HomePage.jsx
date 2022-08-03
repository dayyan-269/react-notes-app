import { useEffect, useMemo, useState } from 'react'
import { getInitialData } from '../utils/data'

//  components
import InputSection from '../components/sections/InputSection'
import SearchSection from '../components/sections/SearchSection'
import NotesSection from '../components/sections/NotesSection'

const HomePage = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    setNotes(getInitialData())
  }, [])

  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])

  useMemo(() => {
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
  const titleInputListener = (e) => {
    const title = e.target.value

    if (title.length <= titleCount) {
      setTitle(title)
    }
  }
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
      <InputSection
        title={title}
        titleCount={titleCount}
        titleInputListener={titleInputListener}
        content={content}
        contentInputListener={contentInputListener}
        archive={archive}
        archiveCheckListener={archiveCheckListener}
        onSubmit={insertNote}
      />
      <SearchSection
        searchKeyword={searchKeyword}
        searchInputListener={searchInputListener}
        filterListener={filterNotes}
        resetListener={resetNotes}
      />
      <NotesSection
        sectionTitle={'Active Notes'}
        notes={activeNotes}
        deleteNoteHandler={deleteNoteHandler}
        changeNoteStatusHandler={changeNoteStatusHandler}
      />
      <NotesSection
        sectionTitle={'Archived Notes'}
        notes={archivedNotes}
        deleteNoteHandler={deleteNoteHandler}
        changeNoteStatusHandler={changeNoteStatusHandler}
      />
    </main>
  )
}

export default HomePage
