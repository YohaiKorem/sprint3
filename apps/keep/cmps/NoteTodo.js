export default {
  name: 'NoteTodo',
  props: ['info'],
  template: `
    <article class="note todo-note">
      <img :src="info.imgUrl" v-if="info.imgUrl"/>
      <h3 class="note-title">{{info.title}}</h3>
      <ul>
        <li v-for="item in info.list" :class="{ done: item.isDone }">{{item.txt}}</li>
      </ul>
    </article>
  `,
}