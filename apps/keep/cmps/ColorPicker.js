export default {
  name: 'ColorPicker',
  props: ['note'],

  template: `
  <article class="color-picker flex justify-between">
      <div v-for="(color, idx) in colors"
      @click.prevent="changeColor(color)" 
      :style="{background: color }" className="color-icon" :key="idx"></div>
  </article>
`,
  data() {
    return {
      colors: ['#41425e', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']
    }
  },

  methods: {
    changeColor(color) {
      this.$emit('updateColor', color);
    }
  },
  computed: {

  },
  created() {

  },
  components: {

  },
  emits: [],
}