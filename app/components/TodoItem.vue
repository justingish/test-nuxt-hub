<script lang="ts" setup>
const emits = defineEmits(["toggle", "delete"]);

const props = defineProps<{
  todo: TodoItem;
}>();
</script>
<template>
  <div>
    <input
      :model-value="props.todo.done"
      type="checkbox"
      :checked="props.todo.done"
      @change="emits('toggle')"
    />
    <span
      :style="{ textDecoration: props.todo.done ? 'line-through' : 'none' }"
    >
      {{ todo.text }}
    </span>
    <button class="delete-btn" alt="Delete Item" @click="emits('delete')">
      X
    </button>
  </div>
</template>

<style lang="scss" scoped>
input {
  margin-right: 8px;
}

.delete-btn {
  margin-left: 8px;
  background-color: unset;
  border: none;
}
</style>
