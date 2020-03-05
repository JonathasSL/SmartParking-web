<template lang="html">
	<nav class="navbar fixed-top shadow navbar-expand-lg navbar-light bg-light">
	  <a class="navbar-brand" href="#">
	  	<logo class="logo"></logo>
	  </a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>

	  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
	    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
	      <li class="nav-item">
					<router-link class="nav-link" to="/">
						<!-- <users-icon size="1.5x" class="custom-class"></users-icon> -->
						<span class="ml-2">Lugares</span>
					</router-link>
	      </li>
	      <li class="nav-item">
					<router-link class="nav-link" to="/vehicles">
						<!-- <users-icon size="1.5x" class="custom-class"></users-icon> -->
						<span class="ml-2">Meus veículos</span>
					</router-link>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
	      </li>
	    </ul>
	  </div>

		<div @click="$emit('login')" class="user p-2 _rounded-100">
			<user-icon size="2.3x" class="user-icon bg-dark text-white p-1 _rounded-100"></user-icon>
			<span class="px-2 pr-0">Entrar / Cadastrar</span>
		</div>
	</nav>
</template>

<script>
import logo from '@/components/Logo.vue';

import { UserIcon } from 'vue-feather-icons';

export default {
	name: 'navbar',
	components: {
		logo,
		UserIcon,
	},
}
</script>

<style lang="css" scoped>
.navbar {
	background-color: #eeeeee
}

.user {
	cursor: pointer;
}
</style>
