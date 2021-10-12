import React from 'react'
import { useParams } from 'react-router-dom'
import { favouriteDog, getSingleDog, addComment } from '../../lib/api'
import { getUserId, isAuthenticated} from '../../lib/auth'


function DogShowCard( { dog }){
  const [dogData, setDogData] = React.useState({
    favouritedBy: [],
  })
  const [formData, setFormData] = React.useState({
    text: '',
  })
  const { dogId } = useParams()
  const favouriteButton = document.querySelector('#favourite')
  const isAuth = isAuthenticated()
  // todo: add owner can edit dog button
  // const owner = isOwner()

  React.useEffect(() => {
    const getData = async () => {
        try {
          const response = await getSingleDog(dogId)
          setDogData(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      getData()
    }, [dogId])

  const handleFavourite = async () => {
    const userId = getUserId()
    setDogData(dogData.favouritedBy.push(userId))
    console.log(dogData)
    console.log(dogId)
    try {
      await favouriteDog(dogId, dogData) 
      favouriteButton.innerHTML = 'Added'
    } catch (error) {
      console.log(error)
    }
  } 


  const handleChange = (event) =>{
    setFormData({...formData, [event.target.name] : event.target.value})
    console.log(formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await addComment(dogId, formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {dog && (
      <div key={dog.breed}>
        <h2>{dog.breed}</h2>
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
              <img src={dog.image} alt={dog.breed} />
              </figure>
            </div>
            <div className="column is-half">
              <div className="content-dogshow">
              <h5>Origin</h5>
              <p>{dog.origin}</p>
              </div>
              <div className="content-dogshow">
              <h5>About the {dog.breed}</h5>
              <p>{dog.description}</p>
              </div>
              <div className="content-dogshow">
              <h5>Essential info: </h5>
                {dog.isGoodWithCats && <p> 😺 Can live with cats.</p>}
                {!dog.isGoodWithCats && <p> 😿 Can't live with cats.</p>}
                {dog.isCityDog && <p> 🏢 Can live in a city.</p>}
                {!dog.isCityDog && <p> 🌳 Better in the countryside.</p>}
                {dog.isGoodWithChildren && <p> 🧒 Good with children.</p>}
                {!dog.isGoodWithChildren && <p> 👩 Better in a child free home.</p>}
              </div>
              <div className="content-dogshow">
              <h5>Characteristics</h5>
              {dog.characteristics && dog.characteristics.map(item =>{
                return (
                  <ul key={item}>
                    <li>
                    <p>💗 {item}</p> 
                    </li>
                  </ul> 
                  )
              })}
              </div>
              <div className="cta">
              {isAuth && (
                <>
                  <button 
                  className="button"
                  onClick={handleFavourite}
                  name="favouritedBy"
                  id="favourite">
                  Add to Favourites
                  </button>
                  <form 
                  className="column is-half"
                  onSubmit={handleSubmit}
                  >
                    <div className="field">
                      <label className="label">
                        Leave a comment 🐾
                      </label>
                      <input
                      type="textarea"
                      className="textarea"
                      onChange={handleChange}
                      name="text"
                      value={formData.text}
                      />
                      <button className="button">
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
              {!isAuth && (
              <div className="content-dogshow">
              <p>Like this dog? Sign up or login to add them to your favourites!</p>
              <a className="backtodogs" href="/dogs">
                Back to dogs
              </a>
              </div>
              )}
              </div>
            </div>
        </div>
        </div>  
    )}  
    </>     
  )


}

export default DogShowCard