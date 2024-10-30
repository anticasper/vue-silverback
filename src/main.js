import '@/assets/css/style.css'

import SBBadge from './components/SBBadge.vue'
import SBBreadcrumb from './components/SBBreadcrumb.vue'
import SBButton from './components/SBButton.vue'
import SBCalendar from './components/SBCalendar.vue'
import SBCard from './components/SBCard.vue'
import SBCheck from './components/SBCheck.vue'
import SBDate from './components/SBDate.vue'
import SBForm from './components/SBForm.vue'
import SBIconButton from './components/SBIconButton.vue'
import SBInput from './components/SBInput.vue'
import SBInputFile from '@/components/SBInputFile.vue'
import SBInputZoom from './components/SBInputZoom.vue'
import SBLabel from './components/SBLabel.vue'
import SBLoader from './components/SBLoader.vue'
import SBModal from './components/SBModal.vue'
import SBNavButton from './components/SBNavButton.vue'
import SBNavigationBar from './components/SBNavigationBar.vue'
import SBPill from './components/SBPill.vue'
import SBRadio from './components/SBRadio.vue'
import SBRadioGroup from './components/SBRadioGroup.vue'
import SBSelect from './components/SBSelect.vue'
import SBSlider from './components/SBSlider.vue'
import SBStatusCircle from './components/SBStatusCircle.vue'
import SBStatusPill from './components/SBStatusPill.vue'
import SBTable from './components/SBTable.vue'
import SBTextArea from './components/SBTextArea.vue'
import SBTimeline from './components/SBTimeline.vue'
import SBTitle from './components/SBTitle.vue'
import SBToast from './components/SBToast.vue'
import SBToolTip from './components/SBToolTip.vue'
import SBSpinner from './components/SBSpinner.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.component('sb-badge', SBBadge)
app.component('sb-breadcrumb', SBBreadcrumb)
app.component('sb-button', SBButton)
app.component('sb-calendar', SBCalendar)
app.component('sb-card', SBCard)
app.component('sb-check', SBCheck)
app.component('sb-date', SBDate)
app.component('sb-form', SBForm)
app.component('sb-icon-button', SBIconButton)
app.component('sb-input', SBInput)
app.component('sb-input-file', SBInputFile)
app.component('sb-input-zoom', SBInputZoom)
app.component('sb-label', SBLabel)
app.component('sb-loader', SBLoader)
app.component('sb-modal', SBModal)
app.component('sb-nav-button', SBNavButton)
app.component('sb-navigation-bar', SBNavigationBar)
app.component('sb-pill', SBPill)
app.component('sb-radio', SBRadio)
app.component('sb-radio-group', SBRadioGroup)
app.component('sb-slider', SBSlider)
app.component('sb-select', SBSelect)
app.component('sb-status-circle', SBStatusCircle)
app.component('sb-status-pill', SBStatusPill)
app.component('sb-table', SBTable)
app.component('sb-text-area', SBTextArea)
app.component('sb-timeline', SBTimeline)
app.component('sb-title', SBTitle)
app.component('sb-toast', SBToast)
app.component('sb-tool-tip', SBToolTip)
app.component('sb-spiiner', SBSpinner)

app.mount('#app')
