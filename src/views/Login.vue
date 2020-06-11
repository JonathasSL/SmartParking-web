<template lang="html">
	<div class="login h-100 w-100 d-flex flex-column justify-content-center align-items-center">
		<h1 class="exit mb-0 mt-3 mr-4" @click="close">
			X
		</h1>
		<form v-if="isLogin" class="form-login" @submit.prevent="login">
			<p v-show="loginFailed" class="text-center text-danger"><b>E-mail ou senha incorretos :(</b></p>
			<div class="btn-group _rounded shadow-sm w-100" role="group">
				<button title="Motorista" @click="loginType = true" type="button" class="w-50 btn btn-info d-flex justify-content-center align-items-center  _rounded-tl _rounded-bl">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"/>
						<path fill="#fff" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
						<circle fill="#fff" cx="7.5" cy="14.5" r="1.5"/>
						<circle fill="#fff" cx="16.5" cy="14.5" r="1.5"/>
					</svg>
					<span class="ml-2">Motorista</span>
				</button>
				<button title="Estacionamento" @click="loginType = false" type="button" class="w-50 btn btn-dark d-flex justify-content-center align-items-center _rounded-tr _rounded-br">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path fill="none" d="M0 0h24v24H0V0z"/>
						<path fill="white" d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
					</svg>
					<span class="ml-2">Estacionamento</span>
				</button>
			</div>
			<hr>
			<div class="form-row">
				<div class="form-group col-md-12">
					<label for="email">Email</label>
					<input v-model="formLogin.username" type="text" required class="form-control form-control-lg" id="email" placeholder="douglas@exemplo.com">
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
						<input v-model.number="formRegister.driver.phone" type="number" class="form-control" id="phone" placeholder="42987654321">
					</div>
				</div>
				<button type="submit" class="btn btn-info btn-block btn-lg">Cadastrar</button>
			</form>
			<form v-else class="form-register-parking" @submit.prevent="register">
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="name">Seu Nome</label>
						<input v-model="formRegister.parking.name" type="text" required class="form-control" id="name" placeholder="Douglas Adams da Silva Jr.">
					</div>
					<div class="form-group col-md-6">
						<label for="email">Email</label>
						<input v-model="formRegister.parking.email" type="email" required class="form-control" id="email" placeholder="estacionai@exemplo.com">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="phone">Telefone</label>
						<input v-model.number="formRegister.parking.phone" type="number" class="form-control" id="phone" placeholder="32621010">
					</div>
					<div class="form-group col-md-6">
						<label for="password">Senha</label>
						<input v-model="formRegister.parking.password" type="password" required class="form-control" id="password" placeholder="******">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="name">Nome do Estacionamento</label>
						<input v-model="formRegister.parking.parking_name" type="text" required class="form-control" id="name" placeholder="EstacionAí">
					</div>
					<div class="form-group col-md-6">
						<label for="cpf">CNPJ</label>
						<input v-model.number="formRegister.parking.cnpj" type="number" class="form-control" id="cpf" placeholder="12345678900">
					</div>					
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="place">Logradouro</label>
						<input v-model.trim="formRegister.parking.place" type="text" class="form-control" placeholder="Av. Brasil">
					</div>				
					<div class="form-group col-md-3">
						<label for="place_number">Número do logradouro</label>
						<input v-model.number="formRegister.parking.place_number" type="number" class="form-control" id="place_number" placeholder="10">
					</div>
					<div class="form-group col-md-3">
						<label for="complement">Complemento</label>
						<input v-model.trim="formRegister.parking.complement" type="text" class="form-control" id="complement" placeholder="201">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="country">País</label>
						<input v-model.trim="formRegister.parking.country" type="text" class="form-control" id="country" placeholder="Brasil">
					</div>
					<div class="form-group col-md-4">
						<label for="state">Estado</label>
						<input v-model.trim="formRegister.parking.state" type="text" class="form-control" id="state" placeholder="Minas Gerais">
					</div>
					<div class="form-group col-md-4">
						<label for="city">Cidade</label>
						<input v-model.trim="formRegister.parking.city" type="text" class="form-control" id="city" placeholder="Belo Horizonte">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="opening_time">Horário de abertura</label>
						<input v-model="formRegister.parking.opening_time" type="time" class="form-control" id="opening_time" placeholder="12345678900">
					</div>
					<div class="form-group col-md-3">
						<label for="closing_time">Horário de fechamento</label>
						<input v-model="formRegister.parking.closing_time" type="time" class="form-control" id="closing_time" placeholder="42987654321">
					</div>
					<div class="form-group col-md-3">
						<label for="price_per_hour">Preço por hora: R$</label>
						<input v-model.number="formRegister.parking.price_per_hour" type="number" class="form-control" placeholder="2,00">
					</div>
					<div class="form-group col-md-3">
						<label for="price_per_hour">Total de vagas:</label>
						<input v-model.number="formRegister.parking.amount_parking_spots" type="number" class="form-control" placeholder="30">
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
import openStreetService from '../services/openStreetService';
import registerService from '../services/registerService';
import constants from '../constants';
import axios from 'axios';

export default {
	name: 'login',
	data() {
		return {
			isLogin: true,
			loginFailed: false,
			loginType: true,
			registerUserType: true,
			formLogin: {},
			formRegister: {
				driver: {},
				parking: {},
			},
			token: "",
		}
	},
	methods: {
		close() {
			this.$emit('close');
		},		
		async login() {
			let user;
			if (this.loginType == true) {
				await axios.post('login/driver/', this.formLogin)
					.then(response => {
						this.token = response.data.token;					
					}).then(async () => {
						await axios.get('drivers/', {
							headers: { 'Authorization': 'Token '+ this.token  }
						}).then(response => {
							user = response.data[0];
							user.type = "driver";
						})
					}).catch(e => {
						this.loginFailed = true;
					})
			} else {
				await axios.post('login/parking/', this.formLogin)
				.then(response => {
					this.token = response.data.token;
				}).then(async () => {
						await axios.get('parkings/', {
							headers: { 'Authorization': 'Token '+ this.token }
						}).then(response => {
							user = response.data[0];
							user.type = "parking";
						})
					}).catch(e => {
						this.loginFailed = true;
					})
			}
			if (user) {
				this.$emit('logged', user, this.token);
				this.$emit('close');
				this.$destroy();
			}
		},

		async register () {
			let user;
			if (this.registerUserType) {
				await registerService.registerDriver(this.formRegister.driver)
					.then(response => {
						user = response.data;
						user.type = "driver";
            alert(constants.MSGS.REGISTER_SUCCESSFULL);
					})
					.catch(err => {alert(constants.MSGS.REGISTER_FAIL)});
			} else {
				let fullAddress = this.formatAddress();
				const response =  await openStreetService.search(fullAddress);
				this.formRegister.parking.latitude = response.data[0].lat;
				this.formRegister.parking.longitude = response.data[0].lon;
				await registerService.registerParking(this.formRegister.parking)
					.then(response => {
						user = response.data;
						user.type = "parking";
						alert(constants.MSGS.REGISTER_SUCCESSFULL);
					})
					.catch(err => {alert(constants.MSGS.REGISTER_FAIL)});
      }
      this.isLogin = true;
		},
		formatAddress() {
			return `${this.formRegister.parking.place} ${this.formRegister.parking.place_number} ${this.formRegister.parking.city} ${this.formRegister.parking.state} ${this.formRegister.parking.country}`
		}
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
