export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
        <article class="car-preview">
            <h2>{{ mail.from }}</h2>
            <h3>{{ mail.to }}</h3>
        </article>
    `,
}
