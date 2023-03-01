export default {
  name: 'NodeTxt',
  props: ['info'],
  template: `
    <article class="note txt-note">
      <h2>{{info.title}}</h2>
      <h3>{{info.txt}}</h3>
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