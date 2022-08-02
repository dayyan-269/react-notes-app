function Card({ children, className, header }) {
  return (
    <div className={`rounded px-6 py-5 shadow-lg ${className}`}>
      <div>
        <h4 className="text-lg font-bold">{header}</h4>
      </div>
      <div className="pt-4 pb-3">{children}</div>
    </div>
  )
}

export default Card
