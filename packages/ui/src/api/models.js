import client from './client'

const getAllModels = () => client.get('/models')

export default {
    getAllModels
}
