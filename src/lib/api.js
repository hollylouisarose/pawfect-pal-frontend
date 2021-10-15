import axios from "axios"
import { getToken } from '../lib/auth'
import { baseUrl } from "../config"

export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * Global variables

export const initialDogData = {
  breed: '',
  origin: '',
  image: '',
  description:'',
  size: '',
  walkLength: null,
  isGoodWithCats: false,
  isGoodWithChildren: false,
  isCityDog: false,
  characteristics: [],
}

export const characteristicsOptions = [
  {value: 'Lively', label: 'Lively'},
  {value: 'Devoted', label: 'Devoted'},
  {value: 'Alert', label: 'Alert'},
  {value: 'Playful', label: 'Playful'},
  {value: 'Sensitive', label: 'Sensitive'},
  {value: 'Intelligent', label: 'Intelligent'},
  {value: 'Friendly', label: 'Friendly'},
  {value: 'Gentle', label: 'Gentle'},
  {value: 'Confident', label: 'Confident'},
  {value: 'Active', label: 'Active'},
  {value: 'Protective', label: 'Protective'},
]

export const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

export const initialLoginState = {
  email: '',
  password: '',
}

// * Dog requests

export function getAllDogs(){
  return axios.get(`${baseUrl}/dogs`)
}

export function getSingleDog(dogId){
  return axios.get(`${baseUrl}/dogs/${dogId}`)
}

export function favouriteDog(dogId, dogData){
  return axios.post(`${baseUrl}/dogs/${dogId}/favourite`, dogData, getHeaders())
}

export function addComment(dogId, formData){
  return axios.post(`${baseUrl}/dogs/${dogId}/comments`, formData, getHeaders())
}

export function deleteComment(dogId, commentId){
  return axios.delete(`${baseUrl}/dogs/${dogId}/comments/${commentId}`, getHeaders())
}

export function addDog(formData){
  return axios.post(`${baseUrl}/dogs`, formData, getHeaders())
}

export function editDog(formData, dogId){
  return axios.put(`${baseUrl}/dogs/${dogId}`, formData, getHeaders())
}

export function deleteDog(dogId){
  return axios.delete(`${baseUrl}/dogs/${dogId}`, getHeaders())
}

// * Auth requests

export function registerUser(formData){
  return axios.post(`${baseUrl}/register`, formData)
}

export function loginUser(formData){
  return axios.post(`${baseUrl}/login`, formData)
}

// * Centre requests

export function getAllCentres(){
  return axios.get(`${baseUrl}/centres`)
}
