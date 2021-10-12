import React from "react"
import DogCard from "./DogCard"
import Loading from "../../common/Loading"
import { getAllDogs } from "../../lib/api"

function DogIndex(){

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


  const [formData, setFormData] = React.useState({
    breed: '',
    size: '',
    walkLength: '',
    isGoodWithChildren: false,
    isGoodWithCats: '',
    isCityDog: '',
  })

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({...formData, [e.target.name] : value })
  }

  const handleReset = (e) => {
    e.preventDefault()
    setFormData({
    breed: '',
    size: '',
    walkLength: '',
    isGoodWithChildren: false,
    isGoodWithCats: '',
    isCityDog: '',
    })
  }

  const filteredDogs = () => {
    return dogs.filter(dog => {

      return dog.breed.toLowerCase().includes(formData.breed.toLowerCase()) &&
      dog.size.toLowerCase().includes(formData.size.toLowerCase()) && 
      dog.walkLength.toString().toLowerCase().includes(formData.walkLength.toLowerCase()) 
      
    })

  }


  return (
    <>
    <div className="search-filter-wrapper">
      <form> 
      <div className="field">
      <label className="label">Search</label>
      <input 
          className="input" 
          placeholder="Search by breed"
          name="breed"
          onChange={handleChange}
          value={formData.breed}
        />
      </div> 
      <div className="field">
      <label className="label">Filter by Size</label> 
      <select 
            name="size"
            onChange={handleChange}
            value={formData.size}
            >
            <option value=""> Select an option</option>
            <option value="small"> Small</option>
            <option value="medium"> Medium</option>
            <option value="large"> Large</option>
          </select>
      </div>
      <div className="field">
      <label className="label">Filter by Walk length</label> 
      <select 
            name="walkLength"
            onChange={handleChange}
            value={formData.walkLength}
            >
            <option value=""> Select an option</option>
            <option value="0.5"> Half an hour</option>
            <option value="1"> An hour</option>
            <option value="2"> Two hours</option>
            <option value="3"> Three hours</option>
          </select>
      </div>
      <div className="field">
        <button className="button"
          onClick={handleReset}
        >Reset filters</button>
      </div>
      </form>
    </div>

    <section className="is-full-height">
      <div className="container">
        <div className="columns is-multiline">
        {isLoading && <Loading />}
        { (dogs && filteredDogs().map(dog => {
          return <DogCard key={dog.breed} dog={dog} />
        }))
        }
        </div>
      </div>
    </section>
    </>
  )


}

export default DogIndex