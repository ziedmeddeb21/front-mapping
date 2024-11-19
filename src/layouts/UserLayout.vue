<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff"   class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>JSON Mapping</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
          v-model="drawer"

          :width="300"
          :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>


            <q-item  clickable v-ripple to="/user/mapping-rules" tag="router-link" >
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Mapping Rules
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/user/mapper" tag="router-link">
              <q-item-section avatar>
                <q-icon name="swap_horiz" />
              </q-item-section>

              <q-item-section>
                Mapper
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                Account
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Zied Meddeb</div>
            <div>@TeamWill</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container style="margin:50px">
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>
