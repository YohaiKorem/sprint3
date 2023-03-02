export default {
  name: 'NoteTxt',
  props: ['info'],
  template: `
    <article class="note txt-note">
      <h3 class="note-title">{{info.title}}</h3>
      <p class="note-txt">{{info.txt}}</p>
    </article>
  `,
}