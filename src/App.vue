<script setup>
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item
          title="RxJs Example"
          subtitle="Miguel Angel López Ariza"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <router-link to="/example-1">
          <v-list-item title="Example-1" />
        </router-link>
        <router-link to="/example-2">
          <v-list-item title="Example-2" />
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

