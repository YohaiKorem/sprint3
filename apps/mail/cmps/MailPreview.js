export default {
  name: 'MailPreview',
  props: ['mail'],
  template: `
        <article class="mail-preview">
        <span class="mail-labels">{{mail.labels}}</span>  
         <h2 class="mail-from">from: {{ mail.from }}</h2> <span class="mail-timestamp">sent at: {{mail.sentAt}}</span>
            <h3 class="mail-to">to: {{ mail.to }}</h3>
            <p class="mail-cotent">{{mail.body}}</p>

        </article>
    `,
}
