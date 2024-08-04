<template>
  <div class="createProduct">
    <modal
      :header="'Create Product'"
      :isShow="showModal"
      v-if="showModal"
      @close="showModal = false"
    >
      <product-form :product="product" v-on:submit-form="productAction" />
    </modal>
  </div>
</template>
<script>
import Modal from "../../shared/Modal.vue";
import ProductForm from "./ProductForm";
import axios from "axios";
import {
  errorToaster,
  successToaster,
} from "../../shared/service/ErrorHandler";

let token = localStorage.getItem("token");

export default {
  name: "createProduct",
  components: { Modal, ProductForm },
  data() {
    return {
      product: new Object(),
      showModal: false,
    };
  },
  methods: {
    showModalForm: function () {
      this.showModal = true;
    },

    productAction: function (product) {
      axios
        .post(`${process.env.VUE_APP_BASE_URL}/products`, product, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.showModal = false;
          successToaster(
            "Product created Successfully",
            `${product.productName} has been added sucessfully`
          );
        })
        .catch((error) => {
          this.showLoader = false;
          console.log(error);
          errorToaster("Invalid Credentials", "");
        });
    },
  },
};
</script>
<style lang="css"></style>
