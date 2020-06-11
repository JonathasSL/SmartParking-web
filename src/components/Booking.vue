<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>

          <div class="modal-header">
            <slot name="header">
              <h3>{{ parking.parking_name }}</h3>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p>
                <strong>Endereço:</strong> {{ parking.full_address }}<br>
                <strong>Vagas disponiveis:</strong> {{ parking.available_parking_spots }}<br>
                <strong>Horário de abertura:</strong> {{ parking.opening_time }}<br>
                <strong>Horário de fechamento:</strong> {{ parking.closing_time }}<br>
              </p>
            </slot>
          </div>

          <form class="form-create" @submit.prevent="confirmBooking">
            <div class="form-row">
              <div class="form-group col-md-6">          
                <label for="totalTime">Tempo total:</label>          
                <input v-model="totalTime" type="number" required class="form-control" id="totalTime" min="1">
              </div>
              <div class="form-group col-md-6">          
                <label for="entryTime">Hora de entrada:</label>          
                <input v-model="reservation.book_to" type="datetime-local" :min="parking.opening_time" :max="parking.closing_time" 
                  required class="form-control" id="entryTime">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">          
                <label for="price">Preço por hora (em R$):</label>          
                <input v-model="parking.price_per_hour" disabled type="number" class="form-control" id="price" min="1">
              </div>
              <div class="form-group col-md-6">          
                <label for="totalValue">Valor total aproximado (em R$): </label>          
                <input v-model="totalValue" disabled type="number" class="form-control" id="totalValue" min="1">
              </div> 	             
            </div>           

            <div class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn btn-outline-primary" @click="close">Cancelar</button>
                <button v-if="user" type="submit" class="btn btn-primary">Confirmar</button>
              </slot>
            </div>
          </form>          
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'booking',
    props: {
      parking: {
        type: Object,
      },
      user: { 
        type: Object,
      },
      token: {
        type: String,
      },
    }, 
    data() {
      return {
        totalValue: 0,
        totalTime: 0,
        reservation: {
          book_to: null,
          parking: null,
          driver: null,
        },
      }
    },
    mounted() {
      this.reservation.parking = this.parking.id;
      this.reservation.driver = this.user.id;
    },
    watch: {
      totalTime(calculate) {
        this.totalValue = (this.totalTime * this.parking.price_per_hour);
      }        
    },
    methods: {
      close(event) {
        this.$emit('close');
      },
      confirmBooking() {
        this.reservation.book_to = this.reservation.book_to.replace("T", " ");
        axios.post(`bookings/`, this.reservation, {
          headers: { 'Authorization': 'Token '+ this.token }
        }).then((response) => {
          alert("Reserva realizada com sucesso!");
          this.$emit('close');
        }).catch(error => {
          alert(`${error.response.data['401 - Não Autorizado']}`)
        });
      },      
    },
  };
</script>

<style lang="css" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 530px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #00adb5;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>