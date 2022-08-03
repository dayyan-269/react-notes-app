import Card from '../Card'
import PrimaryButton from '../buttons/PrimaryButton'

function Note({ id, title, content, date, archived, className = '', deleteHandler, archiveHandler }) {
  return (
    <Card className={`flex flex-col bg-white ${className}`} header={false}>
      <h4 className="text-lg font-bold text-green-700">{title}</h4>
      <p className="text-md mt-2 font-bold">{date}</p>
      <p className="mt-2 flex-1">{content}</p>
      <div className="mt-3 flex flex-row justify-evenly gap-3">
        <PrimaryButton
          id={id}
          description={'Delete'}
          className="flex-1 bg-red-600"
          onClick={() => deleteHandler(id)}
        />
        <PrimaryButton
          id={id}
          description={'Change Status'}
          className="flex-1 bg-yellow-400 text-black"
          onClick={() => archiveHandler(id)}
        />
      </div>
    </Card>
  )
}

export default Note
