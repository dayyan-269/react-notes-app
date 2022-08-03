const PrimaryButton = ({
  id,
  description,
  className,
  type = 'button',
  onClick,
  onSubmit,
  disabled,
}) => {
  return (
    <button
      id={id}
      className={`rounded-sm px-5 py-2 duration-150 hover:-translate-y-1 hover:drop-shadow-2xl ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onSubmit={onSubmit}
    >
      {description}
    </button>
  )
}

export default PrimaryButton
