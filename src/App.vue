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
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold">Input</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <!-- Campos -->
          <SBInput v-model="object.basic" label="Input Básico" />
          <SBInput v-model="object.money" label="Input Dinheiro" type="money" />
          <SBInput v-model="object.mask" label="Input com Mascara" mask="###.###.###-##" />
          <SBInput v-model="object.password" label="Input Senha" type="password" />
          <SBInput v-model="object.counter" counter label="Input com Contandor" placeholder="Contador com limite" />
          <SBInput v-model="object.counterMax" counter :maxlength="10" label="Input com Contandor Máximo" placeholder="Contador com limite" />
          <SBInput v-model="object.counterMin" counter :minlength="10" label="Input com Contandor Mínimo" placeholder="Contador com limite" />
          <SBInput v-model="object.counterMinMax" counter :minlength="5" :maxlength="10" label="Input com Max e Mínimo" placeholder="Contador com limite" />
          <SBInput v-model="object.preIcon" label="Pre Icon" pre-icon="fa-wand-magic-sparkles" />
          <SBInput v-model="object.posIcon" label="Pos Icon" pos-icon="fa-star" />
          <SBInput v-model="object.posPreIcon" label="All Icon" pre-icon="fa-wand-magic-sparkles" pos-icon="fa-star" />
          <SBInput v-model="object.dense" dense label="Input Denso" />
          <SBInput v-model="object.outlined" outlined label="Input Outlined" />
        </div>
        <div class="grid grid-cols-4 gap-5 border-b py-3 my-3">
          <SBInput v-model="object.bgColor" bg-color="bg-blue-500" dark label="Input BG Cor Nomeado" />
          <SBInput v-model="object.borderColor" border-color="border-yellow-400" label="Input Outlined - Borda com cor nomeada" />
          <SBInput v-model="object.bgColor" bg-color="bg-blue-200" border-color="border-red-500" dark label="Input BG e Borda cor Nomeado" />
          <SBInput v-model="object.bgColorIcon" bg-color="bg-blue-500" pre-icon="fa-wand-magic-sparkles" dark label="Input BG Cor Nomeado e Icon" />
        </div>
      </SBCard>
      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold">DatePicker</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <SBDate v-model="object.date" label="Data" />
          <SBDate v-model="object.dateRange" label="Data com Range" range />
        </div>
      </SBCard>
      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold">Select</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <SBSelect v-model="object.selectSimples" label="Select Simples" :items="selectSimples" />
          <SBSelect v-model="object.selectObject" label="Select Objetos" :items="selectObject" />
          <SBSelect v-model="object.selectList" multiple label="Select Multiplo" :items="selectSimples" />
          <SBSelect v-model="object.selectCustom" label="Select Custom Props" prop-text="nome" prop-value="id" :items="pessoas" />
          <SBSelect v-model="object.selectCustomOption" label="Select Custom Option" prop-text="nome" prop-value="id" :items="pessoas">
            <template v-slot:option="{ item }"> {{ item.nome }} é um {{ item.classe }} </template>
          </SBSelect>
          <SBSelect v-model="object.selectCustomSelect" label="Select Custom Option e custom select" :items="pessoas" prop-value="id" box-size="max-h-64">
            <template v-slot:option="{ item }">
              <div class="flex items-center gap-1">
                <img src="https://wow.zamimg.com/images/wow/icons/large/inv_ability_skyriding_glyph.jpg" class="h-8 rounded-lg" />
                {{ item.nome }} é um {{ item.classe }}
              </div>
            </template>
            <template v-slot:selected="{ item }">
              <div class="flex items-center gap-1">
                <img src="https://wow.zamimg.com/images/wow/icons/large/inv_cape_special_treasure_c_01.jpg" class="h-6 rounded-lg" />
                {{ item.nome }} torce para {{ item.time }}
              </div>
            </template>
          </SBSelect>
        </div>
      </SBCard>
      <SBCard class="my-5 p-5">
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
      </SBCard>
      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold">Sliders</h1>
        <div class="border-y py-3 my-3">
          <SBSlider label="Slider" :min="0" :max="100" />
        </div>

        <h1 class="text-xl font-bold">Spinner</h1>
        <div class="grid grid-cols-4 gap-5 border-b py-3 my-3">
          <SBSpinner color="purple" />
          <SBSpinner color="699bf7" />
          <SBSpinner color="51414F" label="Analisando dados..." />
          <SBSpinner color="953553" label="Analisando dados..." />
        </div>

        <h1 class="text-xl font-bold">Modais</h1>
        <div class="grid grid-cols-4 gap-5 border-b py-3 my-3">
          <SBButton label="Modal Simples" blue @click="modalExample = true" />
          <SBButton label="Modal com Slots" blue @click="modalHeaderExample = true" />
          <SBButton label="Modal Personalizada" green @click="modalSpecial = true" />
        </div>

        <SBModal v-model="modalExample">
          <template v-slot:default> Modal Simples </template>
        </SBModal>

        <SBModal v-model="modalHeaderExample">
          <template v-slot:header>
            <div class="text-xl font-bold text-blue-700">Cabeçalho</div>
          </template>
          <template v-slot:default>
            <div class="py-5 my-5 border-y">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequatur eos obcaecati nobis, id eum asperiores? Labore, accusamus! Alias ipsa eos laborum
              ipsam repudiandae. Rem laboriosam placeat quasi officia eligendi!
            </div>
          </template>
          <template v-slot:footer>
            <SBButton label="Fechar" red @click="modalHeaderExample = false" />
          </template>
        </SBModal>

        <SBModal v-model="modalSpecial" class="p-0 border-0">
          <template v-slot:header>
            <div>
              <img src="https://pbs.twimg.com/media/Dj9rPOJU8AAyNin.jpg" />
            </div>
          </template>
          <template v-slot:default>
            <div class="p-3 flex flex-col gap-2">
              <p>
                <strong>World of Warcraft (WoW)</strong> é um MMORPG (Massively Multiplayer Online Role-Playing Game) lançado em 2004 pela Blizzard Entertainment. O jogo se passa
                no mundo de <em>Azeroth</em>, onde jogadores assumem o controle de personagens de diversas raças e classes, explorando um vasto universo de fantasia.
              </p>
              <p>
                No WoW, os jogadores podem se aventurar em masmorras, participar de batalhas épicas entre facções, completar missões e interagir com outros jogadores em um ambiente
                rico e imersivo. Com uma história envolvente e expansões regulares, World of Warcraft continua a ser um dos jogos online mais populares de todos os tempos.
              </p>
              <p>Se você é um fã de jogos de fantasia, World of Warcraft oferece uma experiência única, cheia de aventuras e desafios.</p>
            </div>
          </template>
          <template v-slot:footer>
            <div class="p-3 border-t flex gap-2">
              <SBButton label="BarraDois" yellow @click="modalSpecial = false" />
              <SBButton label="Fechar" red @click="modalSpecial = false" />
            </div>
          </template>
        </SBModal>
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold">Zoom</h1>
        <div class="grid grid-cols-4 gap-5 border-y py-3 my-3">
          <SBInputZoom v-model="object.zoom" label="Input Zoom Básico" prop-text="nome" prop-value="id" :items="pessoas" :headers="headers" />
          <SBInputZoom v-model="object.zoom2" label="Input Zoom Custom Select" prop-value="id" :items="pessoas" :headers="headers">
            <template v-slot:selected="{ item }"> {{ item.id }} {{ item.nome }} {{ item.time }} </template>
          </SBInputZoom>
          <SBInputZoom v-model="object.zoom3" label="Input Zoom selecionando objeto" prop-text="classe" :items="pessoas" :headers="headers" />
          <SBInputZoom v-model="object.zoom4" label="Input Zoom Custom Modal">
            <template v-slot:default> Teste de Modal </template>
          </SBInputZoom>
        </div>
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold mb-5">Exemplo de Tabela</h1>
        <SBTable :items="pessoas.slice(0, 3)" :headers="headers" />
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold mb-5" expanded>Exemplo de Tabela com expansão</h1>
        <SBTable :items="pessoas.slice(0, 3)" :headers="headers" expanded>
          <template v-slot:expanded>
            <div>
              <img src="https://pbs.twimg.com/media/Dj9rPOJU8AAyNin.jpg" class="w-full" />
            </div>
            <div class="p-3 flex flex-col gap-2">
              <p>
                <strong>World of Warcraft (WoW)</strong> é um MMORPG (Massively Multiplayer Online Role-Playing Game) lançado em 2004 pela Blizzard Entertainment. O jogo se passa
                no mundo de <em>Azeroth</em>, onde jogadores assumem o controle de personagens de diversas raças e classes, explorando um vasto universo de fantasia.
              </p>
            </div>
          </template>
        </SBTable>
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold mb-5">Exemplo de Tabela Densa</h1>
        <SBTable :items="pessoas.slice(0, 3)" :headers="headers" dense />
      </SBCard>

      <SBCard class="my-5 p-5">
        <SBForm v-model="valid" class="mb-3">
          <h1 class="pb-5 text-xl font-bold">Formulário com Regras de validação no front</h1>
          <div class="grid grid-cols-4 gap-5">
            <SBInput v-model="object.rules1" label="Regras a" :rules="[isFarofa, isPequeno]" />
            <SBInput v-model="object.rules2" label="Regras b" :rules="[isMonkey]" />
          </div>
        </SBForm>
        <SBButton label="Salvar" blue icon="fa-solid fa-floppy-disk" :disabled="!valid" @click="testSend()" />
        <SBButton label="Cancelar" red outlined icon="fa-solid fa-x" class="mx-2" />
        <SBButton label="Pensar Melhor" yellow icon="fa-solid fa-x" />
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-xl font-bold">Componentes Visuais</h1>
        <div class="grid grid-cols-4 gap-5 border-b py-3 my-3">
          <div>
            <SBBadge content="10">Teste 1</SBBadge>
          </div>
          <div>
            <SBBadge content="10" color="bg-indigo-500" dark class="mr-2">Teste com cor e dark</SBBadge>
          </div>
          <div>
            <SBPill color="bg-blue-500" dark> Teste de Pill 1 </SBPill>
          </div>
          <div>
            <SBPill color="bg-red-500" dark block> Teste de Pill 2 </SBPill>
          </div>
        </div>
      </SBCard>

      <SBCard class="my-5 p-5">
        <h1 class="text-2xl">TimeLine Componente</h1>
        <SBTimeline class="py-5" :items="history.slice(0, 3)">
          <template v-slot:date="{ item }">
            <div class="bg-blue-500 text-white rounded px-2 py-1 text-center">
              {{ item.date }}
            </div>
          </template>
          <template v-slot:content="{ item }">
            <SBCard class="p-5">
              {{ item.content }}
            </SBCard>
          </template>
        </SBTimeline>
      </SBCard>
    </div>
  </div>
</template>

<script>
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

export default {
  components: {
    SBBadge,
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
    SBPill,
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
    pessoas: [
      { id: 1, nome: 'Carlos Silva', idade: 28, time: 'Flamengo', classe: 'Guerreiro' },
      { id: 2, nome: 'Mariana Costa', idade: 22, time: 'São Paulo', classe: 'Maga' },
      { id: 3, nome: 'João Pereira', idade: 35, time: 'Palmeiras', classe: 'Paladino' },
      { id: 4, nome: 'Ana Souza', idade: 30, time: 'Corinthians', classe: 'Ladra' },
      { id: 5, nome: 'Bruno Oliveira', idade: 27, time: 'Vasco', classe: 'Arqueiro' },
      { id: 6, nome: 'Patrícia Mendes', idade: 24, time: 'Grêmio', classe: 'Barda' },
      { id: 7, nome: 'Rafael Lima', idade: 32, time: 'Internacional', classe: 'Guerreiro' },
      { id: 8, nome: 'Fernanda Rocha', idade: 26, time: 'Santos', classe: 'Druida' },
      { id: 9, nome: 'Lucas Almeida', idade: 29, time: 'Cruzeiro', classe: 'Mago' },
      { id: 10, nome: 'Julia Martins', idade: 21, time: 'Atlético Mineiro', classe: 'Feiticeira' },
      { id: 11, nome: 'Thiago Santos', idade: 33, time: 'Botafogo', classe: 'Monge' },
      { id: 12, nome: 'Larissa Fernandes', idade: 25, time: 'Fluminense', classe: 'Clériga' },
      { id: 13, nome: 'Vinícius Gomes', idade: 31, time: 'Bahia', classe: 'Bárbaro' },
      { id: 14, nome: 'Paula Ramos', idade: 23, time: 'Fortaleza', classe: 'Ranger' },
      { id: 15, nome: 'Eduardo Cardoso', idade: 34, time: 'Sport', classe: 'Necromante' },
      { id: 16, nome: 'Isabela Azevedo', idade: 20, time: 'Ceará', classe: 'Assassina' },
      { id: 17, nome: 'André Vieira', idade: 28, time: 'Atlético Paranaense', classe: 'Cavaleiro' },
      { id: 18, nome: 'Tatiana Souza', idade: 27, time: 'Chapecoense', classe: 'Caçadora' },
      { id: 19, nome: 'Renato Dias', idade: 32, time: 'Coritiba', classe: 'Samurai' },
      { id: 20, nome: 'Gabriela Monteiro', idade: 29, time: 'Avaí', classe: 'Bruxa' },
    ],
    headers: [
      { title: 'ID', field: 'id' },
      { title: 'Nome', field: 'nome' },
      { title: 'Idade', field: 'idade' },
      { title: 'Time', field: 'time' },
      { title: 'Classe', field: 'classe' },
    ],
    modalExample: false,
    modalHeaderExample: false,
    modalSpecial: false,
    valid: false,
    history: [
      { date: '2024', content: 'Chere' },
      { date: '2023', content: 'Chere' },
      { date: '2022', content: 'Chere' },
      { date: '2021', content: 'Chere' },
      { date: '2020', content: 'Chere' },
      { date: '2019', content: 'Chere' },
      { date: '2018', content: 'Chere' },
      { date: '2017', content: 'Chere' },
      { date: '2016', content: 'Chere' },
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
