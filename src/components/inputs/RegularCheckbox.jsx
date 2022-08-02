function RegularCheckbox({ description }) {
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor="check">{description}</label>
      <input type="checkbox" id="check" />
    </div>
  )
}

export default RegularCheckbox
