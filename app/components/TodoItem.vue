<script lang="ts" setup>
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const emits = defineEmits(["toggle"]);

const props = defineProps<{
  todo: Todo;
}>();
</script>
<template>
  <div>
    <input
      :model-value="props.todo.done"
      type="checkbox"
      :checked="props.todo.done"
      @click="emits('toggle')"
    />
    <span
      :style="{ textDecoration: props.todo.done ? 'line-through' : 'none' }"
    >
      {{ todo.text }}
    </span>
  </div>
</template>

<style></style>
