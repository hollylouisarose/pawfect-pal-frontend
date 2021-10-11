import { Link} from 'react-router-dom'


function DogCard({ dog }){

  return (
  
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/dogs/${dog._id}`}>
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">{dog.breed}</div>
              </div>
              <div className="card-image">
                <figure className="image image-is-1by1">
                  <img src={dog.image} alt={dog.breed} />
                </figure>
              </div>
              <div className="card-content">
                <h4>Essential Info</h4>
                <div className="essential-info">
                {dog.isGoodWithCats && <h5> 😺 I can live with cats.</h5>}
                {!dog.isGoodWithCats && <h5> 😿 I can't live with cats.</h5>}
                {dog.isCityDog && <h5> 🏢 I'm city ready.</h5>}
                {!dog.isCityDog && <h5> 🌳 Countryside suits me.</h5>}
                {dog.isGoodWithChildren && <h5> 🧒 I am good with children.</h5>}
                {!dog.isGoodWithChildren && <h5> 👩 I prefer a child free home.</h5>}
                </div>
              </div>
            </div>
          </Link>
      </div>
  )

}

export default DogCard