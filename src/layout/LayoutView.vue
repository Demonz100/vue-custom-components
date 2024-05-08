<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink> | 
        <RouterLink to="/about">About</RouterLink> | 
        <RouterLink to="/table">Table</RouterLink> | 
        <RouterLink to="/select">Select</RouterLink> |
        <RouterLink to="/currency">Currency</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">

</script>