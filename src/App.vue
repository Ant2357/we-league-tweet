<template>
  <TheHeader />
  <router-view/>
  <TheFooter />
</template>

<script lang="ts">
import 'bulma/css/bulma.css';

import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TheHeader,
    TheFooter
  },
});
</script>
