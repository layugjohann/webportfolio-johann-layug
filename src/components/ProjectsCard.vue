<template>
  <div class="win98-window project-card">

    <!-- Title Bar -->
    <div class="win98-titlebar">
      <div class="title-left">
        <span class="window-icon">▣</span>
        <span class="window-title">{{ title }}.exe</span>
      </div>

      <div class="window-controls">
        <button class="control-btn" aria-label="Minimize">_</button>
        <button class="control-btn" aria-label="Maximize">□</button>
        <button class="control-btn close-btn" aria-label="Close">×</button>
      </div>
    </div>

    <!-- Menu Bar -->
    <div class="win98-menu">
      <span><u>F</u>ile</span>
      <span><u>V</u>iew</span>
      <span><u>P</u>roject</span>
      <span><u>H</u>elp</span>
    </div>

    <!-- Project Image -->
    <div v-if="img" class="image-window">
      <img
        :src="img"
        class="project-img"
        :alt="title"
      />
    </div>

    <!-- Project Content -->
    <div class="card-body">
      <h5 class="project-title">
        {{ title }}
      </h5>

      <p class="description">
        {{ description }}
      </p>
    </div>

    <!-- Status Bar -->
    <div class="status-bar">
      <div class="status-section">
        Ready
      </div>

      <div class="status-section">
        {{ title }}.exe
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProjectCard",

  props: {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
/* ================================
   MAIN WINDOW
================================ */

.project-card {
  width: 320px;
  min-height: 500px;

  display: flex;
  flex-direction: column;

  background: #c0c0c0;

  padding: 3px;

  box-sizing: border-box;

  /* Windows 98 raised border */
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;

  box-shadow:
    inset -1px -1px #808080,
    inset 1px 1px #dfdfdf;

  font-family:
    "Courier New",
    monospace;

  color: #000000;
}


/* ================================
   TITLE BAR
================================ */

.win98-titlebar {
  min-height: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 3px 3px 3px 6px;

  background: linear-gradient(
    90deg,
    #000080,
    #1084d0
  );

  color: #ffffff;
}

.title-left {
  display: flex;
  align-items: center;

  gap: 6px;

  min-width: 0;
}

.window-icon {
  font-size: 16px;
}

.window-title {
  font-size: 14px;
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* ================================
   WINDOW CONTROLS
================================ */

.window-controls {
  display: flex;
  gap: 2px;

  margin-left: 6px;
}

.control-btn {
  width: 24px;
  height: 22px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #c0c0c0;

  color: #000000;

  font-family: Arial, sans-serif;
  font-weight: bold;

  cursor: pointer;

  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #000000;
  border-bottom: 2px solid #000000;
}

.control-btn:active {
  border-top: 2px solid #000000;
  border-left: 2px solid #000000;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}


/* ================================
   MENU BAR
================================ */

.win98-menu {
  display: flex;
  align-items: center;

  gap: 16px;

  min-height: 32px;

  padding: 4px 8px;

  font-size: 13px;
}

.win98-menu span {
  cursor: default;
}


/* ================================
   IMAGE FRAME
================================ */

.image-window {
  margin: 0 5px;

  background: #ffffff;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;

  overflow: hidden;
}

.project-img {
  display: block;

  width: 100%;
  height: 250px;

  object-fit: cover;

  image-rendering: auto;
}


/* ================================
   PROJECT CONTENT
================================ */

.card-body {
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 16px 12px;

  text-align: left;
}

.project-title {
  margin: 0 0 10px;

  font-size: 18px;
  font-weight: bold;

  color: #000000;
}

.description {
  margin: 0;

  font-size: 14px;
  line-height: 1.5;

  color: #000000;

  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}


/* ================================
   STATUS BAR
================================ */

.status-bar {
  display: grid;

  grid-template-columns:
    1fr
    auto;

  gap: 3px;

  padding: 3px;
}

.status-section {
  padding: 3px 6px;

  font-size: 11px;

  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}


/* ================================
   RESPONSIVE
================================ */

@media (max-width: 768px) {
  .project-card {
    width: 80vw;
    max-width: 320px;

    min-height: 470px;
  }

  .project-img {
    height: 220px;
  }

  .win98-menu {
    gap: 12px;

    font-size: 12px;
  }

  .window-title {
    font-size: 12px;
  }
}
</style>