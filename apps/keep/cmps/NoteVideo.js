export default {
  name: 'NoteImg',
  props: ['info'],
  template: `
    <article class="note ing-note">
      <iframe style="width:100%" :src="embedUrl" v-if="info.videoUrl" />
      <h3 class="note-title">{{info.title}}</h3>
      <p class="note-txt">{{info.txt}}</p>
    </article>
  `,

  computed: {
    embedUrl() {
      const videoId = this.info.videoUrl.split('v=')[1]
      return `https://www.youtube.com/embed/${videoId}`
    }
  }
}