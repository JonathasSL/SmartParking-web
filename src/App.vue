<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<script>
export default {
	name: 'app',
};
</script>

<style>
/* Change this import to the local font files */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #303841;
	min-height: 100vh;
}

/* --- GLOBALS --- */
/* ~ Rounded ~ */
._rounded-100 {
  border-radius: 100px !important
}
._rounded {
  border-radius: 10px !important
}
._rounded-tl {
  border-top-left-radius: 10px !important
}
._rounded-tr {
  border-top-right-radius: 10px !important
}
._rounded-bl {
  border-bottom-left-radius: 10px !important
}
._rounded-br {
  border-bottom-right-radius: 10px !important
}

/* ~ Squared ~ */
._squared {
  border-radius: 0 !important
}
._squared-tl {
  border-top-left-radius: 0 !important
}
._squared-tr {
  border-top-right-radius: 0 !important
}
._squared-bl {
  border-bottom-left-radius: 0 !important
}
._squared-br {
  border-bottom-right-radius: 0 !important
}
</style>
