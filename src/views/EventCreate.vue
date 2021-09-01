<template>
  <h1>Create an event</h1>

  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <BaseSelect
        :options="categories"
        v-model="event.category"
        label="Select a category"
      />
      <fieldset>
        <legend>Name & describe your event</legend>

        <BaseInput v-model="event.title" label="Title" type="text" />
        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
        />
      </fieldset>
      <fieldset>
        <legend>Where is your event?</legend>
        <BaseInput v-model="event.location" label="Location" type="text" />
      </fieldset>

      <fieldset>
        <legend>When is your event?</legend>
        <BaseInput v-model="event.date" label="Date" type="text" />
        <BaseInput v-model="event.time" label="Time" type="text" />
      </fieldset>

      <button class="button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import UniqueID from '../composables/UniqueID'

export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
      },
    }
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        id: UniqueID().getID(),
        organizer: this.$store.state.user,
      }
      this.$store
        .dispatch('createEvent', event)
        .then(() => {
          this.$router.push({
            name: 'EventDetail',
            params: { id: event.id },
          })
        })
        .catch((error) => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error },
          })
        })
    },
  },
}
</script>
