const DeleteButton = ({
  description,
  className,
  type = 'button',
  onclick,
  id,
}) => {
  return (
    <button
      id={id}
      className={`rounded-sm border-0 bg-green-600 px-5 py-2 text-white duration-150 hover:-translate-y-1 hover:drop-shadow-2xl ${className}`}
      type={type}
      onClick={onclick}
    >
      {description}
    </button>
  )
}

export default DeleteButton
