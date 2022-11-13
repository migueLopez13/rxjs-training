<template>
  <v-container>
    <v-card>
      <v-card-title> Buscador de Usuarios de Github </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="search"
          placeholder="Buscar"
          @keyup.enter="searchUsers"
        />
        <v-btn color="blue" @click="searchUsers">Buscar</v-btn>
      </v-card-text>
    </v-card>

    <v-card v-if="showResults" class="mt-4" :loading="loading">
      <v-card-text>
        <template slot="progress">
          <v-progress-linear color="blue" indeterminate striped />
        </template>

        <v-list>
          <v-list-item v-for="(user, i) in userList" :key="i">
            <section class="d-flex justify-space-between">
              <article>
                <v-avatar :image="user.avatar_url" class="mr-2" />
                {{ user.login }}
              </article>
              <v-btn :href="user.html_url" target="_blank" color="blue">
                Link
              </v-btn>
            </section>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
// @ts-nocheck
import { ref } from "@vue/reactivity";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, mergeAll, take, catchError, tap } from "rxjs/operators";

const showResults = ref(false);
const userList = ref([]);
const search = ref("");
const loading = ref(false);

const searchUsers = () => {
  if (search.value.length > 2) {
    showResults.value = true;
    loading.value = true;
    userList.value = [];

    getGithubUsers(search.value)
      .pipe(
        tap((user) => {
          userList.value = [...userList.value, user];
        })
      )
      .subscribe(() => {
        loading.value = false;
      });
  }
};

const getGithubUsers = (user) => {
  return ajax.getJSON(`https://api.github.com/search/users?q=${user}`).pipe(
    map(({ items }) => items),
    mergeAll(),
    take(3),
    catchError((err) => of(err))
  );
};
</script>