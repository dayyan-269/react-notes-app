function RegularCheckbox({ description, onChange }) {
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor="check">{description}</label>
      <input type="checkbox" id="check" onChange={onChange} />
    </div>
  )
}

export default RegularCheckbox
