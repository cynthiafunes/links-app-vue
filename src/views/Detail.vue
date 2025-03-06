<template>
    <div class="link-detail">
      <p v-if="loading">Cargando detalles del enlace...</p>
      <p v-else-if="error" class="error">{{ error }}</p>
      <p v-else-if="!link">No se encontró el enlace.</p>
      
      <template v-else>
        <h2>{{ link.title }}</h2>
        <p>{{ link.description || '' }}</p>
        <p>
          <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.url }}</a>
        </p>
        
        <div>
          <span v-for="tag in link.tags" :key="tag.id" class="tag">{{ tag.name }}</span>
        </div>
        
        <div class="vote-section">
          <h3>Votar por este enlace</h3>
          <p>Votos actuales: <strong>{{ totalVotes }}</strong></p>
          <button @click="handleVote">Me gusta</button>
        </div>
        
        <div class="comments-section">
          <h3>Comentarios</h3>
          
          <p v-if="!link.comments || link.comments.length === 0">Aún no hay comentarios.</p>
          
          <div v-else>
            <div v-for="comment in link.comments" :key="comment.id" class="comment">
              <p>{{ comment.text }}</p>
              <small>Por: {{ comment.userName }}</small>
            </div>
          </div>
          
          <h4>Añadir un Comentario</h4>
          <form @submit.prevent="handleSubmitComment">
            <div>
              <label for="userName">Tu Nombre:</label>
              <input
                type="text"
                id="userName"
                v-model="userName"
                required
              />
            </div>
            <div>
              <label for="commentText">Comentario:</label>
              <textarea
                id="commentText"
                v-model="commentText"
                required
              ></textarea>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
  
        <button @click="$router.push('/')">Volver a la lista</button>
      </template>
    </div>
  </template>
  
  <script>
  import { fetchLinkById, addComment, addVote } from '../api'
  
  export default {
    name: 'DetailPage',
    data() {
      return {
        link: null,
        userName: '',
        commentText: '',
        loading: true,
        error: null
      }
    },
    computed: {
      totalVotes() {
        if (!this.link || !this.link.votes) {
          return 0
        }
        return this.link.votes.reduce((sum, vote) => sum + vote.value, 0)
      }
    },
    created() {
      this.loadLink()
    },
    methods: {
      async loadLink() {
        try {
          this.loading = true
          this.link = await fetchLinkById(this.$route.params.id)
          this.error = null
        } catch (err) {
          this.error = 'Error al cargar los detalles del enlace.'
          console.error(err)
        } finally {
          this.loading = false
        }
      },
      async handleVote() {
        try {
          await addVote(this.$route.params.id)
          await this.loadLink()
          alert('Voto registrado correctamente')
        } catch (err) {
          alert('Error al registrar el voto')
          console.error(err)
        }
      },
      async handleSubmitComment() {
        if (!this.userName.trim() || !this.commentText.trim()) {
          alert('Por favor completa todos los campos')
          return
        }
  
        try {
          await addComment(this.$route.params.id, { 
            userName: this.userName, 
            text: this.commentText 
          })
          await this.loadLink()
          this.userName = ''
          this.commentText = ''
          alert('Comentario añadido correctamente')
        } catch (err) {
          alert('Error al añadir el comentario')
          console.error(err)
        }
      }
    }
  }
  </script>