import SBBreadcrumb from '@/components/SBBreadcrumb.vue'
import SBButton from '@/components/SBButton.vue'
import SBCalendar from '@/components/SBCalendar.vue'
import SBCard from '@/components/SBCard.vue'
import SBCheck from '@/components/SBCheck.vue'
import SBDate from '@/components/SBDate.vue'
import SBForm from '@/components/SBForm.vue'
import SBIconButton from '@/components/SBIconButton.vue'
import SBInput from '@/components/SBInput.vue'
import SBInputZoom from '@/components/SBInputZoom.vue'
import SBLabel from '@/components/SBLabel.vue'
import SBLoader from '@/components/SBLoader.vue'
import SBModal from '@/components/SBModal.vue'
import SBNavButton from '@/components/SBNavButton.vue'
import SBNavigationBar from '@/components/SBNavigationBar.vue'
import SBRadio from '@/components/SBRadio.vue'
import SBRadioGroup from '@/components/SBRadioGroup.vue'
import SBSelect from '@/components/SBSelect.vue'
import SBStatusCircle from '@/components/SBStatusCircle.vue'
import SBStatusPill from '@/components/SBStatusPill.vue'
import SBTable from '@/components/SBTable.vue'
import SBTextArea from '@/components/SBTextArea.vue'
import SBTimeline from '@/components/SBTimeline.vue'
import SBTitle from '@/components/SBTitle.vue'
import SBToast from '@/components/SBToast.vue'
import SBToolTip from '@/components/SBToolTip.vue'

const Components = {
  SBBreadcrumb,
  SBButton,
  SBCalendar,
  SBCard,
  SBCheck,
  SBDate,
  SBForm,
  SBIconButton,
  SBInput,
  SBInputZoom,
  SBLabel,
  SBLoader,
  SBModal,
  SBNavButton,
  SBNavigationBar,
  SBRadio,
  SBRadioGroup,
  SBSelect,
  SBStatusCircle,
  SBStatusPill,
  SBTable,
  SBTextArea,
  SBTimeline,
  SBTitle,
  SBToast,
  SBToolTip,
}

const install = function (app) {
  if (install.installed) return
  install.installed = true

  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name])
  })
}

export default {
  install,
}

export {
  SBBreadcrumb,
  SBButton,
  SBCalendar,
  SBCard,
  SBCheck,
  SBDate,
  SBForm,
  SBIconButton,
  SBInput,
  SBInputZoom,
  SBLabel,
  SBLoader,
  SBModal,
  SBNavButton,
  SBNavigationBar,
  SBRadio,
  SBRadioGroup,
  SBSelect,
  SBStatusCircle,
  SBStatusPill,
  SBTable,
  SBTextArea,
  SBTimeline,
  SBTitle,
  SBToast,
  SBToolTip,
}
