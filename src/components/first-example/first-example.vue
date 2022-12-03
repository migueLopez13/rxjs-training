<template>
  <v-container>
    <v-btn color="blue" class="mb-4" @click="handleClick">
      Recibir datos
    </v-btn>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title> Tabla Patos </v-card-title>
          <v-card-text>
            <v-list v-for="(duck, i) in duckList" :key="i">
              <v-list-item>
                {{ duck }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title> Tabla Osos </v-card-title>
          <v-card-text>
            <v-list v-for="(bear, i) in bearList" :key="i">
              <v-list-item>
                {{ bear }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// @ts-nocheck
import { from, of, tap, delay, concatMap } from "rxjs";
import { ref } from "vue";
import { Animals } from "./../../mock/animals";

const animals$ = from(Animals).pipe(
  concatMap((item) => of(item).pipe(delay(2000)))
);

const bearList = ref([]);
const duckList = ref([]);

const handleClick = () => {
  animals$.pipe(tap(setAnimalListByBreed)).subscribe();
};

const setAnimalListByBreed = (animal) => {
  animal.breed === "bear"
    ? (bearList.value = [...bearList.value, animal])
    : (duckList.value = [...duckList.value, animal]);
};
</script>
