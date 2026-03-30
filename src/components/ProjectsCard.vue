<template>
  <div class="card project-card bg-secondary bg-opacity-25 border-0 rounded-4 p-3">
    <img v-if="img" :src="img" class="project-img" :alt="title" />
    <div class="card-body text-center">
      <h5 class="fw-bold text-muted">{{ title }}</h5>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, default: "" },
  },
};
</script>

<style scoped>
.project-card {
  width: 300px;
  min-height: 500px;       /* ensures cards are mostly uniform */
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.project-img {
  width: 100%;
  height: 260px;            /* fixed image height */
  object-fit: cover;        /* ensures screenshots fit neatly */
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.card-body {
  flex: 1;                   /* fills remaining space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.description {
  margin-top: 0.5rem;
  overflow-wrap: break-word; /* wraps long words */
  word-break: break-word;
  white-space: normal;       /* allows line breaks */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .project-card {
    width: 80vw;
    max-width: 300px;
    min-height: 480px;       /* adjust for smaller screens */
  }

  .project-img {
    height: 220px;
  }
}
</style>