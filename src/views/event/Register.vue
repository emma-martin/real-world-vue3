<template>
  <p>Regstration form here</p>
  <button class="button" @click="register">Register Me!</button>
</template>
<script>
export default {
  props: ['event'],
  inject: ['GlobalStore'],
  methods: {
    register() {
      // Assuming successful API call to register them
      // If registration API call is successful
      this.GlobalStore.flashMessage =
        'You are successfully registered for ' + this.event.title
      setTimeout(() => {
        // After 3 seconds remove it
        this.GlobalStore.flashMessage = ''
      }, 3000)
      // Push back to the event details
      this.$router.push({
        name: 'EventDetail',
      })
    },
  },
}
</script>
