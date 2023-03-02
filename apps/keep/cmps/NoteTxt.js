export default {
  name: 'NodeTxt',
  props: ['info'],
  template: `
    <article class="note txt-note">
      <h3 class="note-title">{{info.title}}</h3>
      <p class="note-txt">{{info.txt}}</p>
    </article>
  `,

  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  },
  created() {

  },
  components: {

  },
  emits: [],
}