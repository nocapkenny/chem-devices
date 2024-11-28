<script setup>
import { computed } from 'vue';

const props = defineProps({
    title:{
        type: String,
        required: true,
    },
    id:{
        type: Number,
        required: true,
    },
    activeId:{
        type: Number,
        required: true,
    }
})

const tabClasses = computed(()=>({
    "window__tab window__tab--active":props.activeId === props.id,
    "window__tab":props.activeId !== props.id
}))

</script>

<template>
    <li :class="tabClasses">{{ props.title }}</li>
</template>
