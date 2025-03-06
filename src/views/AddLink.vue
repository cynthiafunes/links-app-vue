<template>
    <div>
      <h2>Añadir Nuevo Enlace</h2>
      
      <p v-if="error" class="error">{{ error }}</p>
      
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Título:</label>
          <input
            type="text"
            id="title"
            v-model="title"
            required
          />
        </div>
        
        <div>
          <label for="url">URL:</label>
          <input
            type="url"
            id="url"
            v-model="url"
            required
          />
        </div>
        
        <div>
          <label for="description">Descripción:</label>
          <textarea
            id="description"
            v-model="description"
          ></textarea>
        </div>
        
        <div>
          <label for="tags">Etiquetas (separadas por comas):</label>
          <input
            type="text"
            id="tags"
            v-model="tagsInput"
            placeholder="ej. tecnología, programación, vue"
          />
        </div>
        
        <div class="form-buttons">
          <button type="submit">Guardar</button>
          <button type="button" @click="$router.push('/')">Cancelar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { createLink } from '../api'
  
  export default {
    name: 'AddLinkPage',
    data() {
      return {
        title: '',
        url: '',
        description: '',
        tagsInput: '',
        error: null
      }
    },
    methods: {
      async handleSubmit() {
        if (!this.title.trim() || !this.url.trim()) {
          this.error = 'Por favor completa los campos obligatorios'
          return
        }
  
        const tags = this.tagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag !== '')
  
        try {
          await createLink({ title: this.title, url: this.url, description: this.description, tags })
          alert('Enlace añadido correctamente')
          this.$router.push('/')
        } catch (err) {
          this.error = 'Error al crear el enlace. Por favor intenta de nuevo.'
          console.error(err)
        }
      }
    }
  }
  </script>