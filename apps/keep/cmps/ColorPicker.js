export default {
  name: 'ColorPicker',
  props: ['note'],

  template: `
  <article class="color-picker flex justify-between">
      <div v-for="(color, idx) in colors"
      @click.prevent="changeColor(color)" 
      :style="{backgroundColor: color }" className="color-icon" :key="idx"></div>
  </article>
`,
  data() {
    return {
      colors: ['#ffffff', '#F28B82', '#FBBC04', '#FFF475', '#CCFF90', '#A7FFEB', '#CBF0F8', '#AECBFA', '#D7AEFB', '#FDCFE8', '#E6C9A8', '#E8EAED']
    }
  },

  methods: {
    changeColor(color) {
      this.$emit('updateColor', color);
    }
  },

  emits: ['updateColor'],
}