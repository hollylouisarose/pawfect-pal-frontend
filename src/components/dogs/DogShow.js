import React from 'react'
import { useParams } from 'react-router-dom'

import { getSingleDog } from '../../lib/api'
import DogShowCard from './DogShowCard'
import Loading from '../../common/Loading'

function DogShow(){

  const { dogId } = useParams()
  const [dog, setDog] = React.useState(null)
  const isLoading = !dog

  React.useEffect(() => {
    const getData = async () => {

      try {
        const response = await getSingleDog(dogId)
        setDog(response.data)
      } catch (err) {
        console.log(err)
      }

    }
    getData()
  }, [dogId])

return(
  <section className="section">
    <div className="container">
      {isLoading && <Loading />}
      {dog && <DogShowCard 
      key={dog.breed} dog={dog} 
      /> }
    </div>
  </section>
)

}

export default DogShow



