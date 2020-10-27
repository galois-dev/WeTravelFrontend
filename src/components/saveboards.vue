<template>
  <div>
    <header class="modal-card-head"></header>
    <section class="modal-card-body" v-if="boards">
      <div v-for="(board, i) in boards" :key="i" @click="addToBoard(board.pk)">
        {{ board.name }}
      </div>
    </section>
    <section v-else class="modal-card-body">
      😣 Theres no boards here, wanna add some? 😊
    </section>
    <section class="modal-card-foot">
      <b-input />
      <b-button @click="addBoard" />
    </section>
  </div>
</template>

<script>
export default {
  props: {
    boards: {
      type: Array,
      required: false,
    },
  },
  methods: {
    addToBoard(pk) {
      this.$emit("addToBoard", pk);
    },
  },
};
</script>
<style lang="scss" scoped></style>
