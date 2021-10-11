import React from 'react'
import { getAllDogs } from '../../lib/api'
import Loading from '../../common/Loading'
import { getUserId } from '../../lib/auth'


function DogFavourite(){

  const [dogs, setDogs] = React.useState(null)
  const isLoading = !dogs



  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllDogs()
        setDogs(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const filteredDogs = () => {
    const userId = getUserId()
    return dogs.filter(dog => {
    return dog.favouritedBy.includes(userId)

    })

  }

  // * need to reverse function below

  // const handleFavourite = async () => {
  //   const userId = getUserId()
  //   setDogData(dogData.favouritedBy.push(userId))
  //   console.log(dogData)
  //   console.log(dogId)
  //   try {
  //     await favouriteDog(dogId, dogData) 
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   history.push('/favourites')
  // } 

  return (
  <section className="is-full-height">
      <div className="container">
        <div className="columns is-multiline">
        {isLoading && <Loading />}
        { (dogs && filteredDogs().map(dog => {
          return (
            <div className="column is-one-quarter-desktop is-one-third-tablet">
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
                <button 
                // onClick={handleRemove}
                className="button">Remove</button>
              </div>
            </div>
      </div>
          )
        }))
        }
        </div>
      </div>
    </section>
)


}

export default DogFavourite