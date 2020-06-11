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
                <strong>Vagas totais:</strong> {{ parking.amount_parking_spots }}<br>
                <strong>Vagas disponiveis:</strong> {{ parking.available_parking_spots }}<br>
                <strong>Preço por hora:</strong> R$ {{ parking.price_per_hour }}
              </p>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button v-if="user && user.type == 'driver'" type="button" class="btn btn-outline-primary" @click="booking">Reservar</button>
              <button type="button" class="btn btn-primary" @click="close">Fechar</button>
            </slot>
          </div>
        </div>
      </div>
      <booking @close="isBookingVisible = false" v-if="isBookingVisible" 
        :token="this.token" :user="this.user" :parking="this.parking"
        class="booking-container h-100 w-100" />
    </div>
    
  </transition>  
</template>

<script>
import booking from '@/components/Booking.vue';
import Request from 'axios-request-handler';

  export default {
    name: 'modal',
    components: {
      booking,
    },
    props: {
      parking: {
        type: Object,
      },
      user: { 
        type: Object,
      },
      token: {
        type: String,
      }
    },
    data() {
      return {
        isBookingVisible: false,
      }      
    },
    mounted() {
      this.startPoll();      
    },
    methods: {
      close(event) {
        this.$emit('close');
      },
      async booking() {
        this.showBooking();
      },
      showBooking() {
			  this.isBookingVisible = !this.isBookingVisible;
      },
      startPoll() {
        if (this.parking.id == undefined) {
          return;
        }
        const url = `https://tisv-smartparking.herokuapp.com/parkings/?public=${this.parking.id}`;
        const parkingPoll = new Request(url);
        parkingPoll.poll(5000).get((response) => {
          const park = response.data.filter(n => {
            return n.id == this.parking.id;
          });
          this.parking = park.pop();
          console.log(this.parking)
        });
      },
    },
    
  };
</script>

<style lang="css" scoped>
.booking-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999999
}

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
  width: 500px;
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