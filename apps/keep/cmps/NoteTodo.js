export default {
  name: 'NoteTodo',
  props: ['info'],
  template: `
    <article class="note todo-note">
      <img :src="info.imgUrl" v-if="info.imgUrl"/>
      <h3 class="note-title">{{info.title}}</h3>
      <ul>
        <li v-for="item in getlist">{{item}}</li>
      </ul>
    </article>
  `,
  data() {
    return {
    }
  },
  computed: {
    getlist() {
      let list = this.info.list.map(item => item.txt)
      return list
    }
  }
}