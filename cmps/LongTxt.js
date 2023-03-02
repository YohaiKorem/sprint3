export default {
  name: 'LongTxt',
  props: {
    txt: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: false,
      default: 20,
    },
  },
  template: `
            <article class="long-txt">
               <p>{{displayTxt}}</p>
               <!-- <button class="btn-more" @click="isShown = !isShown" v-if="txt.length > length">
                Read {{isShown ? 'less' : 'more'}}
                </button> -->
            </article>
    `,
  data() {
    return {
      isShown: false,
    }
  },

  methods: {},
  computed: {
    displayTxt() {
      if (!this.isShown && this.txt.length > this.length)
        return this.txt.slice(0, this.length) + '...'
      return this.txt
    },
  },
}
