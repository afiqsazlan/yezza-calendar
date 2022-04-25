<template>
  <v-bottom-navigation v-model="value"
                       grow
                       id="bottom-nav"
                       class="elevation-0 light px-2"
  >
    <v-btn v-for="link in links"
           :key="link.label"
           v-on:click.prevent="goTo(link.routeName)"
           text
           :value="currentRouteName"
           class="fill-height pt-5"
    >
      <span class="bottom-nav-menu-label pt-1"
            :style="getLabelStyle(link.routeName)"
      >
         {{ link.label }}
      </span>

      <v-icon :color="getIconColor(link.routeName)">
        ${{ link.iconName }}
      </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>

export default {
  name: "BottomNav",
  data() {
    return {

      currentRouteName: null,

      svg: require('@/assets/logo.svg'),
      value: 'Home',
      links: [
        {
          name: 'home',
          label: 'Home',
          routeName: 'home',
          iconName: 'navHome'
        },
        {
          name: 'calendar',
          label: 'Calendar',
          routeName: 'calendar',
          iconName: 'navCalendar'
        },
        {
          name: 'request',
          label: 'Request',
          routeName: 'request',
          iconName: 'navRequest'
        },
        {
          name: 'client',
          label: 'Client',
          routeName: 'client',
          iconName: 'navClient'
        },
        {
          name: 'menu',
          label: 'Menu',
          routeName: 'menu',
          iconName: 'navMenu'
        },
      ]
    }
  },
  created() {
    this.setCurrentRouteName()
  },
  methods: {
    goTo(routeName) {

      if (this.currentRouteName === routeName) return;

      this.$router.push({name: routeName}).catch(failure => {
        console.log('Unable to navigate there. Redirected to /calendar')
      })

      this.setCurrentRouteName()
    },
    setCurrentRouteName() {
      this.currentRouteName = this.$router.currentRoute.name;
    },
    isCurrentRoute(routeName) {
      return this.currentRouteName === routeName;
    },
    getLabelStyle(routeName) {
      return this.isCurrentRoute(routeName)
          ? {color: '#2B2525'}
          : {color: '#848484'}
    },
    getIconColor(routeName) {
      return this.isCurrentRoute(routeName)
          ? '#2B2525'
          : '#848484'
    }
  }
}
</script>

<style scoped>
#bottom-nav {
  border-top: 1px solid #F4F4F4;
}

.bottom-nav-menu-label {
  font-size: 9px;
}
</style>
