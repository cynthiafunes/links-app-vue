<!-- src/views/Home.vue -->
<template>
    <div>
      <h2>Todos los Enlaces</h2>
      
      <div class="tag-filter">
        <label>
          Filtrar por etiqueta:
          <select v-model="selectedTag" @change="loadLinks">
            <option value="">Todas las etiquetas</option>
            <option v-for="tag in tags" :key="tag.id" :value="tag.name">{{ tag.name }}</option>
          </select>
        </label>
      </div>
  
      <p v-if="loading">Cargando enlaces...</p>
      <p v-else-if="error" class="error">{{ error }}</p>
      <p v-else-if="links.length === 0">No se encontraron enlaces.</p>
      
      <div v-else class="links-list">
        <div v-for="link in links" :key="link.id" class="link-card">
          <h3>
            <router-link :to="`/link/${link.id}`">{{ link.title }}</router-link>
          </h3>
          <p>{{ link.description || '' }}</p>
          <p>
            <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.url }}</a>
          </p>
          <div>
            <span v-for="tag in link.tags" :key="tag.id" class="tag">{{ tag.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { fetchLinks, fetchTags } from '../api'
  
  export default {
    name: 'HomePage',
    data() {
      return {
        links: [],
        tags: [],
        selectedTag: '',
        loading: true,
        error: null
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        try {
          this.loading = true
          await this.loadLinks()
          await this.loadTags()
          this.error = null
        } catch (err) {
          this.error = 'Error al cargar datos. Por favor intenta de nuevo.'
          console.error(err)
        } finally {
          this.loading = false
        }
      },
      async loadLinks() {
        try {
          this.links = await fetchLinks(this.selectedTag)
        } catch (err) {
          this.error = 'Error al cargar enlaces.'
          console.error(err)
        }
      },
      async loadTags() {
        try {
          this.tags = await fetchTags()
        } catch (err) {
          this.error = 'Error al cargar etiquetas.'
          console.error(err)
        }
      }
    }
  }
  </script>