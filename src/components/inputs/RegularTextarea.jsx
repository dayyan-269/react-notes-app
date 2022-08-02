function RegularTextarea({
  description,
  cols,
  rows = 5,
  isRequired,
  className,
}) {
  return (
    <textarea
      className={`rounded-sm border border-gray-600 px-2 py-2 outline-1 outline-green-600 ${className}`}
      cols={cols}
      rows={rows}
      placeholder={description}
      required={isRequired}
    ></textarea>
  )
}

export default RegularTextarea
