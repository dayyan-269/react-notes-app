function PrimaryButton({
  id,
  description,
  className,
  type = 'button',
  onClick,
  disabled,
}) {
  return (
    <button
      id={id}
      className={`rounded-sm bg-green-600 px-5 py-2 text-white duration-150 hover:-translate-y-1 hover:drop-shadow-2xl ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {description}
    </button>
  )
}

export default PrimaryButton
