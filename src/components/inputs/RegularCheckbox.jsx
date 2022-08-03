function RegularCheckbox({ description, checked, onChange }) {
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor="check">{description}</label>
      <input type="checkbox" id="check" checked={checked} onChange={onChange} />
    </div>
  )
}

export default RegularCheckbox
