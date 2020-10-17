
<template>
  <!-- <p class="heading-title">Bank Account Details</p> -->

  <div class="main-container">
    <div class="parent">
      <div class="child-one">
        <div class="heading">
          <Header />
        </div>
      </div>

      <div class="child-two">
        <p class="heading-title">Update your photo</p>

        <div class="photo-container">
          <div class="photo-parent">
            <img ref="imgDisplay" src="../../assets/css/images/no-product.svg" alt />
          </div>
          <span class="camera-icon">
            <img @click="takePicture" src="../../assets/css/images/noun_Camera_3546601.svg" alt />
          </span>

          <p class="direction">Click the camera icon to add a photo</p>
        </div>
      </div>
    </div>

    <input
      ref="pictureTrigger"
      type="file"
      @change="insertAnImage($event)"
      hidden
      id="img"
      name="img"
      accept="image/*"
    />
    <Spinner v-if="apiCall" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";
import { mapState } from "vuex";
import Spinner from "~/components/Spinner.vue";

export default Vue.extend({
  components: {
    Header,
    Spinner
  },
  data() {
    return {
      passport: "../../assets/css/images/no-product.svg",
      apiCall: false
    };
  },
  middleware: "authenticated",
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    console.log(this.user.passport, typeof this.user.passport);
    this.user.passport == "null"
      ? "../../assets/css/images/no-product.svg"
      : this.user.passport;
  },
  methods: {
    takePicture() {
      (this.$refs.pictureTrigger as HTMLInputElement).click();
    },
    insertAnImage(event: Event | any) {
      if (event.target["files"][0].size > 2000000) {
        this.$nuxt.$emit("GeneralError", {
          message: "Please upload pictures less than 2.0MB",
          variant: "danger"
        });
        return;
      }
      this.passport = event.target["files"][0];
      let reader: FileReader;
      if (FileReader) {
        // check if the filereader api is supported by browser
        reader = new FileReader();
        reader.onload = (event: any) => {
          (this.$refs
            .imgDisplay as HTMLImageElement).src = `${event.target["result"]}`;
        };
        reader.readAsDataURL(event.target["files"][0]);
      }

      this.uploadPhoto();
    },

    async uploadPhoto() {
      const { passport } = this.$data;
      const formData = new FormData();
      let formToSubmit = { ...this.user };
      formToSubmit.passport = this.passport;
      for (let key in formToSubmit) {
        formData.append(key, formToSubmit[key]);
      }
      this.apiCall = true;
      try {
        let response: Response | any = await fetch(
          `${this.$store.state.url}agent/settings`,
          {
            body: formData,
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`
            }
          }
        );

        response = await response.json();
        const { data } = response;
        this.$store.dispatch("setLoggedInUser", data);
        // this.$store.dispatch("setApiCallState", false);
        this.apiCall = false;
        this.$nuxt.$emit("SuccessNotification", {
          message: "Passport photo updated successfully",
          variant: "success"
        });
        // setTimeout(() => {
        //   this.$router.push("/settings");
        // }, 2000);
      } catch (error) {
        this.$nuxt.$emit("GeneralError", {
          message: "Upload your picture. Please try again later",
          variant: "danger"
        });
        this.apiCall = false;
        setTimeout(() => {
          this.$nuxt.$emit("SwitchOffNotification");
        }, 3000);
      }
    }
  }
});
</script>

<style scoped>
.parent {
  grid-template-rows: 10vh 75vh 1vh;
}

div.child-two {
  grid-row: 2/3;
  padding: 12px;

  align-items: center;
  grid-gap: 5px;
}
div.child-two div,
div.child-two fieldset {
  color: rgba(20, 0, 204, 0.789);
  border-radius: 5px;
  padding: 2px;
  max-width: 100%;
}

.heading-title {
  text-align: center;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  width: 26%;
}

div.child-two .photo-container {
  width: 100%;
  height: 80%;

  padding: 10px;
  position: relative;
  overflow: hidden;
}

.photo-parent {
  height: 200px;
  width: 200px;
  border: 1px solid rgb(136, 136, 136, 0.2);
  border-radius: 99px !important;
  margin: 20px auto;
}

.camera-icon {
  position: absolute;
  height: 70px;
  width: 70px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  top: 46%;
  right: 15%;
  background-color: rgb(136, 136, 136, 0.2);
}

.direction {
  margin-top: 40px;
  color: black;
}

.photo-parent img {
  object-fit: cover;
  height: 100%;
}
</style>