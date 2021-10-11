import axios from "axios"
import { getToken } from '../lib/auth'

const baseUrl = '/api'

export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
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

// * Auth requests

export function registerUser(formData){
  return axios.post(`${baseUrl}/register`, formData)
}

export function loginUser(formData){
  return axios.post(`${baseUrl}/login`, formData)
}

