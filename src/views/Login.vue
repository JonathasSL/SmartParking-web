<template lang="html">
	<div class="login h-100 w-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
		<form v-if="isLogin" class="form-login" @submit.prevent="login">
			<p v-show="loginFailed" class="text-center text-danger"><b>E-mail ou senha incorretos :(</b></p>
			<div class="form-row">
		    <div class="form-group col-md-12">
		      <label for="email">Email</label>
		      <input v-model="formLogin.email" type="email" required class="form-control form-control-lg" id="email" placeholder="douglas@exemplo.com">
		    </div>
		    <div class="form-group col-md-12">
		      <label for="password">Senha</label>
		      <input v-model="formLogin.password" type="password" required class="form-control form-control-lg" id="password" placeholder="******">
		    </div>
  		</div>
		  <button type="submit" class="btn btn-info btn-block btn-lg">Login</button>
		</form>
		<div v-else>
			<div class="btn-group _rounded shadow-sm w-100" role="group">
				<button title="Motorista" @click="registerUserType = true" type="button" class="w-50 btn btn-info d-flex justify-content-center align-items-center  _rounded-tl _rounded-bl">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"/>
						<path fill="#fff" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
						<circle fill="#fff" cx="7.5" cy="14.5" r="1.5"/>
						<circle fill="#fff" cx="16.5" cy="14.5" r="1.5"/>
					</svg>
					<span class="ml-2">Motorista</span>
				</button>
				<button title="Estacionamento" @click="registerUserType = false" type="button" class="w-50 btn btn-dark d-flex justify-content-center align-items-center _rounded-tr _rounded-br">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"/>
						<path fill="white" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
					</svg>
					<span class="ml-2">Estacionamento</span>
				</button>
			</div>
			<hr>
			<form v-if="registerUserType" class="form-register-driver" @submit.prevent="register">
				<div class="form-group">
					<label for="name">Nome</label>
					<input v-model="formRegister.driver.name" type="text" required class="form-control" id="name" placeholder="Douglas Adams da Silva Jr.">
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="email">Email</label>
						<input v-model="formRegister.driver.email" type="email" required class="form-control" id="email" placeholder="douglas@exemplo.com">
					</div>
					<div class="form-group col-md-6">
						<label for="password">Senha</label>
						<input v-model="formRegister.driver.password" type="password" required class="form-control" id="password" placeholder="******">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="cpf">CPF</label>
						<input v-model.number="formRegister.driver.cpf" type="number" class="form-control" id="cpf" placeholder="12345678900">
					</div>
					<div class="form-group col-md-6">
						<label for="phone">Telefone</label>
						<input v-model.number="formRegister.driver.phoneNumber" type="number" class="form-control" id="phone" placeholder="42987654321">
					</div>
				</div>
				<button type="submit" class="btn btn-info btn-block btn-lg">Cadastrar</button>
			</form>
			<form v-else class="form-register-parking" @submit.prevent="register">
				<div class="form-group">
					<label for="name">Nome</label>
					<input v-model="formRegister.parking.name" type="text" required class="form-control" id="name" placeholder="EstacionAí">
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="email">Email</label>
						<input v-model="formRegister.parking.email" type="email" required class="form-control" id="email" placeholder="estacionai@exemplo.com">
					</div>
					<div class="form-group col-md-6">
						<label for="password">Senha</label>
						<input v-model="formRegister.parking.password" type="password" required class="form-control" id="password" placeholder="******">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="cpf">CNPJ</label>
						<input v-model.number="formRegister.parking.cnpj" type="number" class="form-control" id="cpf" placeholder="12345678900">
					</div>
					<div class="form-group col-md-6">
						<label for="phone">Telefone</label>
						<input v-model.number="formRegister.parking.phoneNumber" type="number" class="form-control" id="phone" placeholder="42987654321">
					</div>
				</div>
				<div class="form-row">
				<div class="form-group col-md-6">
					<label for="lat">Latitude</label>
					<input v-model.number="formRegister.parking.latitude" type="text" class="form-control" id="lat" placeholder="12345678900">
				</div>
				<div class="form-group col-md-6">
					<label for="long">Longitude</label>
					<input v-model.number="formRegister.parking.longitude" type="text" class="form-control" id="long" placeholder="42987654321">
				</div>
			</div>
				<button type="submit" class="btn btn-block btn-lg" :class="registerUserType ? 'btn-info' : 'btn-dark'">Cadastrar</button>
			</form>
		</div>
		<button type="button" class="btn btn-link mt-4" @click="isLogin = !isLogin">
			{{isLogin ? 'Ainda não possuo cadastro' : 'Já possuo cadastro'}}
		</button>
	</div>
</template>

<script>
// TODO: verify if has a away to do this import as global
// Axios
import axios from 'axios';
// BUGFIX: same Vue CLI Service URL for CORS with Cue CLI proxy (look at "vue.config.js" file)
axios.defaults.baseURL = 'http://localhost:4242';

export default {
	name: 'login',
	data() {
		return {
			isLogin: true,
			loginFailed: false,
			registerUserType: true,
			formLogin: {},
			formRegister: {
				driver: {},
				parking: {},
			},
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},

		async login () {
			let user;

			// TODO: remove 404 console message
			await axios.post('/api/driver/login', this.formLogin)
				.then(response => {
					user = response.data;
					user.type = "driver";
				}).catch(async (e) => {
					await axios.post('/api/parking/login', this.formLogin)
						.then(response => {
							user = response.data;
							user.type = "parking";
						}).catch(e => {
							this.loginFailed = true;
						})
				})

			if (user) {
				this.$emit('logged', user);
				this.$emit('close');
				this.$destroy();
			}
		},

		register () {
			if (this.registerUserType) {
				axios.post('/api/driver', this.formRegister.driver)
					.then(response => {
						console.log(response);
					})
					.catch(console.log)
			} else {
				axios.post('/api/parking', this.formRegister.parking)
					.then(response => {
						console.log(response);
					})
					.catch(console.log)
			}
		},
	}
};
</script>

<style lang="css" scoped>
.login {
	background-color: #fff;
}

.exit {
	position: absolute;
	right: 0;
	top: 0;
	font-weight: 900;
	transition: .3s;
	cursor: pointer;
}

.exit:hover {
	color: indianred
}
</style>
