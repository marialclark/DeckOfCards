
const Card = ({ image, name, style }) => {
  return (
    <div>
      <img 
        src={image} 
        alt={name} 
        style={{ ...style, margin: '10px', position: 'absolute' }}
        className="card" 
      /> 
    </div>
  )
}

export default Card;