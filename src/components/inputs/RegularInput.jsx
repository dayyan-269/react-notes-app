function RegularInput({
  description,
  type,
  className = '',
  isRequired = false,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      className={`rounded-sm border border-gray-600 px-3 py-2 outline-1 outline-green-600 ${className}`}
      placeholder={description}
      required={isRequired}
      value={value}
      onChange={onChange}
    />
  )
}

export default RegularInput
