const Card = ({ children, className = '', header = true, headerCaption }) => {
  return (
    <div className={`rounded px-6 py-5 shadow-lg ${className}`}>
      {header ? (
        <div>
          <h4 className="text-lg font-bold">{headerCaption}</h4>
        </div>
      ) : (
        ''
      )}
      <div className="py-2">{children}</div>
    </div>
  )
}

export default Card
