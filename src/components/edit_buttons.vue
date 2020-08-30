<template>
  <div class="edit_root">
    <span
      class="edit-field animate__animated animate__fadeInLeft"
      v-if="!editing"
      @click="emitEdit"
    >
      edit
      <b-icon class="material-icons" size="is-small" icon="launch"
        >launch</b-icon
      >
    </span>
    <span v-else class="edit_root animate__animated animate__fadeInRight">
      <b-button
        type="is-success"
        icon-right="check"
        size="is-small"
        v-if="editing"
        @click="emitSave"
      />
      <b-button
        type="is-danger"
        size="is-small"
        icon-right="delete"
        v-if="editing"
        @click="emitClose"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    editing: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    emitSave() {
      this.$emit("save");
    },
    emitClose() {
      this.$emit("close");
    },
    emitEdit() {
      this.$emit("edit");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables";
$margins: 2px;
.edit_root {
  animation-duration: 150ms;
  color: $primary;
  margin: auto;
  bottom: 0;
  margin-bottom: $margins;
  margin-right: $margins;
  display: inline-flex;
  button {
    margin: 2px;
    & + button {
      margin: 2px;
    }
    @include phone {
      margin-bottom: 0px;
    }
  }
}
</style>
