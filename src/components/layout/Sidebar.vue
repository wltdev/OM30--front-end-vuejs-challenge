<script setup>
import { ref } from 'vue'

const menuIsExpended = ref(localStorage.getItem('menuIsExpended') === 'true')

const toogleMenu = () => {
  menuIsExpended.value = !menuIsExpended.value

  localStorage.setItem('menuIsExpended', menuIsExpended.value)
}
</script>

<template>
  <aside :class="`${menuIsExpended && 'is-expended'}`">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Logo" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toogle" @click="toogleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>

    <div class="menu">
      <router-link class="link" to="/">
        <span class="material-icons">home</span>
        <span class="menu-link-name">Home</span>
      </router-link>
      <router-link class="link" to="/about">
        <span class="material-icons">assignment</span>
        <span class="menu-link-name">About</span>
      </router-link>
    </div>

    <div class="menu-footer"></div>
    <div class="menu">
      <router-link class="link" to="/settings">
        <span class="material-icons">settings</span>
        <span class="menu-link-name">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--primary);
  color: var(--white);
  width: calc(2rem + 32px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1rem;

  transition: 0.2s ease-out;

  .menu-footer {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    transition: 0.2s ease-out;

    .menu-toogle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--white);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--white-two);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .link,
  .menu-link-name {
    /* opacity: 0; */
    transition: 0.3s ease-out;
  }

  h3 {
    color: var(--white-two);
    font-size: 0.825rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .link {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      padding: 0.5rem 1rem;
      /* transition: 0.2s ease-out; */

      .material-icons {
        font-size: 2rem;
        color: var(--white);
        transition: 0.2s ease-out;
      }

      .menu-link-name {
        color: var(--white);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--secondary);

        .material-icons .menu-link-name {
          color: var(--secondary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--white-two);
      }
    }
  }

  &.is-expended {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toogle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .link,
    .menu-link-name {
      opacity: 1;
    }

    .link {
      color: var(--white);
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 999;
  }

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }
}
</style>
