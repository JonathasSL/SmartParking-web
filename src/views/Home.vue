<template>
  <div class="home vh-100 vw-100">
    <div class="d-flex h-100 w-100">
			<nav class="navbar fixed-top shadow-sm navbar-expand-lg navbar-light bg-light">
			  <a class="navbar-brand" href="#">
			  	<logo class="logo"></logo>
			  </a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			  </button>

			  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
			    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
			      <!-- <li class="nav-item">
							<router-link class="nav-link" to="/">
								<span class="ml-2">Estacionamentos</span>
							</router-link>
			      </li> -->
			      <li v-if="user && user.type == 'driver'" @click="showVehicleList = true" class="nav-item nav-link">
							<a class="nav-link" href="#">
								<!-- <img src="@/assets/icon/car.svg" alt=""> -->
								<!-- <users-icon size="1.5x" class="custom-class"></users-icon> -->
								<span class="ml-2">Meus veículos</span>
							</a>
			      </li>
			      <li v-if="user && user.type != 'driver'" @click="showSpotList = true" class="nav-item">
							<a class="nav-link" href="#">
								<!-- <img src="@/assets/icon/rectangles.svg" alt=""> -->
								<!-- <users-icon size="1.5x" class="custom-class"></users-icon> -->
								<span class="ml-2">Minhas vagas</span>
							</a>
			      </li>
						<li v-if="user && user.type != 'driver'" @click="showGarage = true" class="nav-item">
							<a class="nav-link" href="#">
								<span class="ml-2">Garagem</span>
							</a>
			      </li>
						<li v-if="user && user.type != 'driver'" @click="showPriceTable = true" class="nav-item">
							<a class="nav-link" href="#">
								<span class="ml-2">Tabela de Preços</span>
							</a>
						</li>
			    </ul>
			  </div>

				<div @click="!user ? showLogin = true : ''" class="user p-2 _rounded-100">
					<user-icon size="2.3x" class="user-icon bg-dark text-white p-1 _rounded-100"></user-icon>
					<div v-if="user" class="btn-group _rounded shadow-sm" role="group">

						<button title="Perfil" class="user btn px-4 shadow-sm _rounded-tr _rounded-br">
							{{user.name}}
						</button>
						<button title="logout" @click="user = null" type="button" class="logout btn btn-dark _rounded ml-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path fill="none" d="M0 0h24v24H0V0z"/>
								<path fill="white" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
							</svg>
						</button>
					</div>
					<span v-else class="px-2 pr-0">Entrar / Cadastrar</span>
				</div>
			</nav>
      <main class="h-100 w-100 bg-dark">
				<GmapMap
					ref="mapRef"
				  :center="{lat: -19.9296346, lng:-43.9375731}"
				  :zoom="15"
				  map-type-id="roadmap"
				  style="width: 100%; height: 100%"
				>
				  <GmapMarker
				    :key="index"
				    v-for="(m, index) in markers"
				    :position="m.position"
				    :clickable="true"
				    :draggable="true"
				    @click="center=m.position"
				  />
				</GmapMap>
				<!-- <GmapInfoWindow
					:key="index"
					v-for="(i, index) in infos"
					:position="i.position"
					:content="i.content"
				/> -->
			</GmapMap>
      </main>
    </div>
    <Login @close="showLogin = false" @logged="logged" v-if="showLogin" class="login-container h-100 w-100"></Login>
    <VehicleList @close="showVehicleList = false" v-if="showVehicleList" :userId="this.user.id" class="vehicle-list-container h-100 w-100"></VehicleList>
    <SpotList @close="showSpotList = false" v-if="showSpotList" :userId="this.user.id" class="vehicle-list-container h-100 w-100"></SpotList>
    <Garage @close="showGarage = false" v-if="showGarage" :userId="this.user.id" class="vehicle-list-container h-100 w-100"></Garage>
		<PriceTable @close="showPriceTable = false" v-if="showPriceTable" :userId="this.user.id" class="vehicle-list-container h-100 w-100"></PriceTable>
	</div>
</template>

<script>
// @ is an alias to /src
import { UserIcon } from 'vue-feather-icons';

import navbar from '@/components/Navbar.vue';

import logo from '@/components/Logo.vue';

import Login from '@/views/Login.vue';
import VehicleList from '@/components/VehicleList.vue';
import SpotList from '@/components/SpotList.vue';
import Garage from '@/components/Garage.vue';
import PriceTable from '@/components/PriceTable.vue';

// Axios
import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
  name: 'home',
  components: {
		navbar,
		UserIcon,
		logo,
    Login,
		VehicleList,
		SpotList,
		Garage,
		PriceTable,
  },
	created () {
		this.getMap().then(map => {
			this.markers = map.markers;
			this.infos = map.infos;
		});
	},
  data() {
    return {
      showLogin: false,
			showVehicleList: false,
			showSpotList: false,
			showGarage: false,
			showPriceTable: false,
			showCars: false,
			user: null,
			infos: [],
			markers: [],
			// markers: [{
			// 	position: {
			// 		lat: -19.9296346,
			// 		lng: -43.9375731,
			// 	}
			// }]
			// center: null,
    }
  },
	methods: {
		logged(user) {
			console.log("Usuário:", user);
			this.user = user;
		},

		create() {

		},

		getMap () {
			return axios.get('/api/parking')
				.then(response => {
					let parkings = response.data;
					let markers = []
					let infos = []
					for (let parking of parkings) {
						if (parking.latitude && parking.longitude) {
							markers.push({
								position: {
									lat: parking.latitude,
									lng: parking.longitude,
								}
							});
							infos.push({
								position: {
									lat: parking.latitude,
									lng: parking.longitude,
								},
								content: "OLA MUNDO"
							});
						}
					}

					return {
						markers: markers,
						infos: infos,
					};
				}).catch(e => {
					console.log(e);
				})
		},
	}
};
</script>

<style scoped>
.right {
  position: absolute;
  right: 0;
  top: 0
}

.cars {
	background-color: #fff;
}

.user {
	font-weight: 500;
	cursor: pointer;
}

.login-container, .vehicle-list-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999
}

.logout {
	transition: .3s;
}

.logout:hover{
	background-color: indianred;
	border-color: indianred;
}


main {
  background-image: url('~@/assets/img/map.png');
	background-position: center;
	/* background-size: cover; */
	background-repeat: none;
  position: relative;
}
</style>
