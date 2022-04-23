<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <BottomNav></BottomNav>
  </v-app>
</template>

<script>

import BottomNav from "@/layout/BottomNav";
export default {
  name: 'App',
  components: {BottomNav}
};
</script>
