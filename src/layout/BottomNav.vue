<template>
  <v-bottom-navigation v-model="value"
                       grow
                       id="bottom-nav"
                       class="elevation-0 light"
  >
    <v-btn v-for="link in links"
           :key="link.label"
           v-on:click="$router.push(link.route)"
           text
           :value="link.label"
           class="fill-height"
    >
      <span>
         {{ link.label }}
      </span>
      <v-icon>
        mdi-history
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNav",
  data() {
    return {
      value: 'Home',
      links: [
        {
          label: 'Home',
          route: '/'
        },
        {
          label: 'Calendar',
          route: '/calendar'
        },
        {
          label: 'Request',
          route: null
        },
        {
          label: 'Client',
          route: null
        },
        {
          label: 'Menu',
          route: null
        },
      ]
    }
  }
}
</script>

<style scoped>
#bottom-nav {
  border-top: 1px solid #F4F4F4 ;
}
</style>
