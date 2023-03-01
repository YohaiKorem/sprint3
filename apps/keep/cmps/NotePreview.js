export default {
  props: ['note'],
  template: `
      <article class="note-preview"></article>
          <img :src="note.thumbnail">
          <h3>{{ note.title }}</h3>
          <p>{{ formattedCurrency }}</p>
      </article>
  `,

  computed: {
    formattedCurrency() {
      const { amount, currencyCode } = this.note.listPrice
      return Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
    }
  },
}