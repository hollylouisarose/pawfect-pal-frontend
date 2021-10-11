export function setToken(token){
  window.localStorage.setItem('token', token)
}

export function getToken(token) {
  return window.localStorage.getItem('token')
}

function getPayload(){
  const token = getToken()
  if(!token) return false
  const parts = token.split('.')
  if(parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
}

export function isAuthenticated() {
  const payload = getPayload()
  if(!payload) return false

}

export function getUserId(){
  const payload = getPayload()
  return payload.sub
}
