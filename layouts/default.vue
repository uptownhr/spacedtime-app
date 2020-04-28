<template>
  <main>
    <header>
      <nav>
        <ul>
          <li><nuxt-link to="/">Dashboard</nuxt-link></li>
          <li><nuxt-link to="/my-cards">My Cards</nuxt-link></li>
        </ul>
      </nav>
    </header>
    <nuxt />
  </main>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  header nav {
    margin-bottom: 0rem;
  }
}

a.nuxt-link-exact-active {
  text-decoration: underline;
  color: black;
}
</style>
