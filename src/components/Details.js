import "../scss/styles/details.scss"
const Details = ({ heading, value }) => {
  return (
    <div className="detailsContainer">
      <p>{heading}</p>
      <strong>{value}</strong>
    </div>
  )
}

export default Details
