import axios from 'axios'

const URLBase = 'http://localhost:3001/api'

const getIntro = async () => {
    try {
      const response = await axios.get(`${URLBase}/users`, {headers: { 'Content-Type': 'application/json' }})
      console.log(response.data)
      return response.data
    } catch(error) {
      throw new Error(`There was an error fetching todos ${error}`)
    }
}

const getSingleUser = async (id: string) => {
    try {
       const response = await axios.get(`${URLBase}/users/${id}`)
       return response.data;
    } catch(err) {
        const error = err as Error;
        throw new Error('There was an error fetching a single user' + error)
    }
}



export { getIntro, getSingleUser }