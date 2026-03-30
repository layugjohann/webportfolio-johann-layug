<template>
  <section class="container py-5" id="projects">
    <div class="text-center mb-4">
      <h2 class="fw-bold">My Projects</h2>
      <h4 class="text-muted">A preview of what I’ve built</h4>
    </div>

    <div class="project-scroll">
      <a
        v-for="project in projects"
        :key="project.id"
        :href="project.link"
        target="_blank"
        class="project-link"
      >
        <ProjectCard
          :title="project.title"
          :description="project.description"
          :img="project.img"
        />
      </a>
    </div>
  </section>
</template>

<script>
import projectsList from '../data/projects';
import ProjectCard from './ProjectsCard.vue';

export default {
  name: 'Projects',
  components: { ProjectCard },
  data() {
    return {
      projects: projectsList
    };
  }
};
</script>

<style scoped>
.project-scroll {
  display: flex;
  overflow-x: auto; /* horizontal scroll */
  gap: 1rem;
  padding: 1rem 0;
  scroll-behavior: smooth;
  justify-content: flex-start; /* aligns cards to left; use center if few cards */
}

.project-link {
  flex: 0 0 auto;  /* keeps cards inline for horizontal scroll */
  text-decoration: none;
}

/* Optional: custom scrollbar */
.project-scroll::-webkit-scrollbar {
  height: 8px;
}

.project-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.3);
  border-radius: 4px;
}
</style>