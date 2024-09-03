/* eslint-disable */
<template>
  <div class="bg-gray-900 h-full py-5">
    <div class="container mx-auto">
      <SBCard class="p-5">
        <img src="@/assets/silverback.png" />
        <hr class="my-3" />
        <SBTitle title="Vue Silverback">
          <template v-slot:breadcrumb>
            <SBBreadcrumb :bread="bread" />
          </template>
          <template v-slot:default>
            <SBButton blue>Botão de Ação</SBButton>
          </template>
        </SBTitle>
        <h1 class="text-xl font-bold">Input</h1>
        {{ object.mask }}
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <!-- Campos -->
          <SBInput v-model="object.basic" label="Input Básico" />
          <SBInput v-model="object.money" label="Input Dinheiro" type="money" />
          <SBInput v-model="object.mask" label="Input com Mascara" mask="###.###.###-##" />
          <SBInput v-model="object.password" label="Input Senha" type="password" />
          <SBInput v-model="object.counter" counter label="Input com Contandor" placeholder="Contador com limite" />
          <SBInput
            v-model="object.counterMax"
            counter
            :maxlength="10"
            label="Input com Contandor Máximo"
            placeholder="Contador com limite" />
          <SBInput
            v-model="object.counterMin"
            counter
            :minlength="10"
            label="Input com Contandor Mínimo"
            placeholder="Contador com limite" />
          <SBInput
            v-model="object.counterMinMax"
            counter
            :minlength="5"
            :maxlength="10"
            label="Input com Max e Mínimo"
            placeholder="Contador com limite" />
          <SBInput v-model="object.preIcon" label="Pre Icon" pre-icon="fa-wand-magic-sparkles" />
          <SBInput v-model="object.posIcon" label="Pos Icon" pos-icon="fa-star" />
          <SBInput v-model="object.posPreIcon" label="All Icon" pre-icon="fa-wand-magic-sparkles" pos-icon="fa-star" />
          <SBInput v-model="object.dense" dense label="Input Denso" />
          <SBInput v-model="object.outlined" outlined label="Input Outlined" />
        </div>
        <SBSpinner color="purple" />
        <SBSpinner color="red" />
        <SBSpinner color="699bf7" />
        <SBSpinner color="51414F" label="Analizando dados..." />
        <SBSpinner color="953553" label="Analizando dados..." />

        <div class="grid grid-cols-4 gap-5 border-b py-3 my-3">
          <SBInput v-model="object.bgColor" bg-color="bg-blue-500" dark label="Input BG Cor Nomeado" />
          <SBInput
            v-model="object.borderColor"
            border-color="border-yellow-400"
            label="Input Outlined - Borda com cor nomeada" />
          <SBInput
            v-model="object.bgColor"
            bg-color="bg-blue-200"
            border-color="border-red-500"
            dark
            label="Input BG e Borda cor Nomeado" />
          <SBInput
            v-model="object.bgColorIcon"
            bg-color="bg-blue-500"
            pre-icon="fa-wand-magic-sparkles"
            dark
            label="Input BG Cor Nomeado e Icon" />
        </div>
        <h1 class="text-xl font-bold">DatePicker</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <SBDate v-model="object.date" label="Data" />
          <SBDate v-model="object.dateRange" label="Data com Range" range />
        </div>
        <h1 class="text-xl font-bold">Select</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <SBSelect v-model="object.selectSimples" label="Select Simples" :items="selectSimples" />
          <SBSelect v-model="object.selectObject" label="Select Objetos" :items="selectObject" />
          <SBSelect v-model="object.selectList" multiple label="Select Multiplo" :items="selectSimples" />
        </div>
        <h1 class="text-xl font-bold">Checkbox e Radio</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <SBCheck v-model="object.check" label="Checkbox" status="Ativo" />
          <SBRadioGroup label="Radio Group">
            <SBRadio v-model="object.radio" label="Banana" value="Banana" />
            <SBRadio v-model="object.radio" label="Maça" value="Maça" />
            <SBRadio v-model="object.radio" label="Laranja" value="Laranja" />
          </SBRadioGroup>
        </div>
        <h1 class="text-xl font-bold">Textarea</h1>
        <div class="border-y py-3 my-3">
          <SBTextArea label="Texto" />
        </div>

        <div class="border-y py-3 my-3">
          <SBSlider label="Slider" :min="13" :max="26" />
        </div>

        <SBForm v-model="valid" class="mb-3">
          <h1 class="py-5 text-xl font-bold">Formulário com Regras de validação no front</h1>
          <div class="grid grid-cols-4 gap-5">
            <SBInput v-model="object.rules1" label="Regras a" :rules="[isFarofa, isPequeno]" />
            <SBInput v-model="object.rules2" label="Regras b" :rules="[isMonkey]" />
          </div>
        </SBForm>
        <SBButton label="Salvar" blue icon="fa-solid fa-floppy-disk" :disabled="!valid" @click="testSend()" />
        <SBButton label="Cancelar" red outlined icon="fa-solid fa-x" class="mx-2" />
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-2xl">TimeLine Componente</h1>
        <SBTimeline class="p-5" :items="history">
          <template v-slot:date="{ item }">
            <div class="bg-blue-500 text-white rounded px-2 py-1">
              {{ item.date }}
            </div>
          </template>
          <template v-slot:box="{ item }">
            <SBCard class="mb-5 p-5">
              {{ item.box }}
            </SBCard>
          </template>
        </SBTimeline>
      </SBCard>
      <SBModal v-model="modalExample">
        <template v-slot:default> ERRO </template>
      </SBModal>
    </div>
  </div>
</template>

<script>
import SBBreadcrumb from './components/SBBreadcrumb.vue'
import SBButton from './components/SBButton.vue'
import SBCalendar from './components/SBCalendar.vue'
import SBCard from './components/SBCard.vue'
import SBCheck from './components/SBCheck.vue'
import SBDate from './components/SBDate.vue'
import SBForm from './components/SBForm.vue'
import SBIconButton from './components/SBIconButton.vue'
import SBInput from './components/SBInput.vue'
import SBInputZoom from './components/SBInputZoom.vue'
import SBLabel from './components/SBLabel.vue'
import SBLoader from './components/SBLoader.vue'
import SBModal from './components/SBModal.vue'
import SBNavButton from './components/SBNavButton.vue'
import SBNavigationBar from './components/SBNavigationBar.vue'
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

export default {
  components: {
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
    SBSlider,
    SBStatusCircle,
    SBStatusPill,
    SBTable,
    SBTextArea,
    SBTimeline,
    SBTitle,
    SBToast,
    SBToolTip,
    SBSpinner,
  },
  name: 'App',
  data: () => ({
    bread: [
      { title: 'Base', name: '' },
      { title: 'Primatas', name: '' },
    ],
    route: 'screen',
    typeName: 'Programa',
    groupText: null,
    object: {},
    title: null,
    loader: false,
    selectSimples: [
      'Atlético Mineiro',
      'Bahia',
      'Botafogo',
      'Corinthians',
      'Coritiba',
      'Cruzeiro',
      'Cuiabá',
      'Flamengo',
      'Fluminense',
      'Fortaleza',
      'Grêmio',
      'Internacional',
      'Palmeiras',
      'Red Bull Bragantino',
      'Santos',
      'São Paulo',
      'Vasco da Gama',
      'América Mineiro',
      'Athletico Paranaense',
      'Goiás',
    ],
    selectObject: [
      { label: 'Atlético Mineiro', value: 15 },
      { label: 'Bahia', value: 4 },
      { label: 'Botafogo', value: 9 },
      { label: 'Corinthians', value: 30 },
      { label: 'Coritiba', value: 6 },
      { label: 'Cruzeiro', value: 21 },
      { label: 'Cuiabá', value: 1 },
      { label: 'Flamengo', value: 45 },
      { label: 'Fluminense', value: 11 },
      { label: 'Fortaleza', value: 7 },
      { label: 'Grêmio', value: 15 },
      { label: 'Internacional', value: 12 },
      { label: 'Palmeiras', value: 36 },
      { label: 'Red Bull Bragantino', value: 2 },
      { label: 'Santos', value: 22 },
      { label: 'São Paulo', value: 27 },
      { label: 'Vasco da Gama', value: 20 },
      { label: 'América Mineiro', value: 4 },
      { label: 'Athletico Paranaense', value: 8 },
      { label: 'Goiás', value: 4 },
    ],
    modalExample: false,
    valid: false,
    history: [
      { date: '2024', box: 'Chere' },
      { date: '2023', box: 'Chere' },
      { date: '2022', box: 'Chere' },
      { date: '2021', box: 'Chere' },
      { date: '2020', box: 'Chere' },
      { date: '2019', box: 'Chere' },
      { date: '2018', box: 'Chere' },
      { date: '2017', box: 'Chere' },
      { date: '2016', box: 'Chere' },
    ],
  }),
  methods: {
    isFarofa(e) {
      if (e == 'farofa') {
        return false
      } else {
        return 'Não é farofa'
      }
    },
    isMonkey(e) {
      if (e == 'macaco') {
        return false
      } else {
        return 'Não é Macaco'
      }
    },
    isPequeno(e) {
      if (e && e.length > 3) {
        return false
      } else {
        return 'Pouca Farofa'
      }
    },
    testSend() {
      if (!this.valid) {
        this.modalExample = true
      }
    },
  },
}
</script>
