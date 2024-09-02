import '@/assets/css/style.css'
import '@/assets/fontawesome/css/fontawesome.css'
import '@/assets/fontawesome/css/brands.css'
import '@/assets/fontawesome/css/solid.css'

import SBButton from './components/SBButton.vue'

const Components = {
  SBButton,
}

const install = function (app) {
  if (install.installed) return
  install.installed = true

  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name])
  })
}

const plugin = {
  install,
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export { SBButton }

export default {
  install,
}
