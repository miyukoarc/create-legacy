import { RouteRaw } from './../menu/type'
import { firstForm } from './modules/firstForm'
import { secondForm } from './modules/secondForm'

export const secondaryRoutes: RouteRaw[] = [...firstForm, ...secondForm]
