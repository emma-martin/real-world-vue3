<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetail' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['id'],
  created() {
    this.$store.dispatch('fetchEvent', this.id).catch((error) => {
      if (error.response && error.response.status == 404) {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error },
        })
      } else {
        this.$router.push({ name: 'NetworkError' })
      }
    })
  },
  computed: {
    ...mapState(['event']),
  },
}
</script>
