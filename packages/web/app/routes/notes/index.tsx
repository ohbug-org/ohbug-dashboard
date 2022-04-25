import { Link } from '@remix-run/react'

export default function NoteIndexPage() {
  return (
    <p>
      No note selected. Select a note on the left, or{' '}
      <Link
        className="text-blue-500 underline"
        to="new"
      >
        create a new note.
      </Link>
    </p>
  )
}
