import React from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router'
import { addDog, initialDogData, characteristicsOptions } from '../../lib/api'
import ImageUploadField from '../../common/ImageUpload'
import Loading from '../../common/Loading'

function AddDog(){
  const [formData, setFormData]= React.useState(initialDogData)
  const [formErrors, setFormErrors] = React.useState(initialDogData)
  const isLoading = !formData 
  const history = useHistory()

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setFormData({ ...formData, [event.target.name]: value})
    setFormErrors({ ...formErrors, [event.target.name]: '' })
  }

  const handleMultiSelectChange = (selected, name) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    setFormData({ ...formData, [name]: selectedItems})
  }

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl })
  }

  const removeImage = () => {
    setFormData({ ...formData, image: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await addDog(formData)
      history.push('/dogs')
    } catch (error) {
      setFormErrors(error.response.data)
      console.log(formErrors)
    }
  }

  return (
    <section className="section">
    <div className="container">
      <div className="columns">
      {isLoading && <Loading />}
        <form className="column is-half is-offset-one-quarter box"
        onSubmit={handleSubmit}>
          <h3>Think we've missed a dog? Add your favourite!</h3>
          <div className="field">
            <label className="label">Breed</label>
            <div className="control">
            {formErrors.breed && 
              (<p className="error-text">{formErrors.breed}</p>)}
              <input
                className={`input ${formErrors.breed ? 'is-danger' : ''}`}
                placeholder="Breed"
                name="breed"
                onChange={handleChange}
                value={formData.breed}
              />
            </div>
          </div>
          <div className="field">
            <label className="label"> Origin</label>
            <div className="control">
            {formErrors.origin && 
              (<p className="error-text">{formErrors.origin}</p>)}
              <input
                className={`input ${formErrors.origin ? 'is-danger' : ''}`}
                placeholder="Origin"
                name="origin"
                onChange={handleChange}
                value={formData.origin}
              />
            </div>
            </div>
            <div className="field">
            <label className="label">Image</label>
            <div className="control">
            {formErrors.image && 
              (<p className="error-text">{formErrors.image}</p>)}
                <ImageUploadField
                  className={`input ${formErrors.image ? 'is-danger' : ''}`}
                  name="image"
                  onChange={handleImageUpload}
                  value={formData.image}
                />
                <div
                  onClick={removeImage}>
                  <button className="button is-danger" >
                    Remove Image
                  </button>
                </div>
              </div>
              </div>
              <div className="field">
            <label className="label">Description</label>
            <div className="control">
            {formErrors.description && 
              (<p className="error-text">{formErrors.description}</p>)}
              <input
                className={`textarea ${formErrors.description ? 'is-danger' : ''}`}
                type="textarea"
                placeholder="Breed description"
                name="description"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
            </div>
            <div className="field">
            <label className="label">Size</label> 
            {formErrors.size && 
              (<p className="error-text">{formErrors.size}</p>)}
            <div className={`select ${formErrors.description ? 'is-danger' : ''}`}>
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
      </div>
      <div className="field">
      <label className="label">Walk length</label> 
      {formErrors.walkLength && 
              (<p className="error-text">{formErrors.walkLength}</p>)}
      <div className={`select ${formErrors.walkLength ? 'is-danger' : ''}`}>
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
      </div>
      <div className="field">
              <label className="checkbox label">
                Good with children
                <input
                  type="checkbox"
                  name="isGoodWithChildren"
                  onChange={handleChange}
                  checked={formData.isGoodWithChildren}
                />
              </label>
            </div>
            <div className="field">
              <label className="checkbox label">
                Good with cats
                <input
                  type="checkbox"
                  name="isGoodWithCats"
                  onChange={handleChange}
                  checked={formData.isGoodWithCats}
                />
              </label>
            </div>
            <div className="field">
              <label className="checkbox label">
                Can live in a city
                <input
                  type="checkbox"
                  name="isCityDog"
                  onChange={handleChange}
                  checked={formData.isCityDog}
                />
              </label>
            </div>
        <div className="field">
              <label className="label">Characteristics</label>
              <div className="control">
                <Select
                  options={characteristicsOptions}
                  isMulti
                  onChange={selected =>
                    handleMultiSelectChange(selected, 'characteristics')
                  }
                  value={formData.characteristics.map(item => ({ label: item[0].toUpperCase() + item.substring(1), value: item }))}
                />
              </div>
            </div>
          <div className="field">
            <button type="submit" className="button is-fullwidth">Add Dog</button>
          </div>
        </form>
      </div>
    </div>
  </section>
  )




}

export default AddDog