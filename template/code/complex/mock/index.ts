import type { MockMethod } from 'vite-plugin-mock'
import { menuMock } from './modules/menu'
import { loginMock } from './modules/user'

export default [...loginMock, ...menuMock] as MockMethod[]
