import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mockApis from '../mock'

export function setupProdMockServer() {
  createProdMockServer(mockApis)
}
