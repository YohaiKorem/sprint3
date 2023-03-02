export default {
  name: 'NoteTxt',
  props: ['info'],
  template: `
    <article class="note txt-note">
      <img :src="info.imgUrl" v-if="info.imgUrl"/>
      <h3 class="note-title">{{info.title}}</h3>
      <p class="note-txt">{{info.txt}}</p>
    </article>
  `,
}