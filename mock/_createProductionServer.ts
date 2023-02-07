import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mockApis from '.'

export function setupProdMockServer() {
  createProdMockServer(mockApis)
}
