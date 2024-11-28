<script setup>
import { onMounted, ref } from "vue";
import WindowTab from "../WindowTab/WindowTab.vue";
import Loader from "../Loader/Loader.vue";
import { useDeviceStore } from "@/stores/DeviceStore";

const deviceStore = useDeviceStore();
const data = ref({})
const errorMessage = ref('')


//очистка всех полей
const clearData = () => {
  data.value = {}
}

//проверка заполнения всех полей и отправка на сервер
const postData = async () => {
  const allFields = deviceStore.devices.categories.flatMap(category => category.characteristics);
  const isValid = allFields.every(field => data.value[field]?.trim());

  if (!isValid) {
    errorMessage.value = 'Вы заполнили не все поля!';
    return;
  }

  errorMessage.value = '';
  
  const formData = {
    data: data.value
  }

  await deviceStore.postData(formData)

  clearData()
};

//получение данных об аппарате. подразумевается что сюда пропсом будет передаваться айди нужного аппарата
onMounted(() => {
  deviceStore.getDevices();
});

</script>

<template>
  <div class="window">
    <div v-auto-animate class="window__inner">
      <Loader class="window__loader" v-if="deviceStore.isLoading" />
      <ul v-if="deviceStore.devices && !deviceStore.isLoading" class="window__tabs" v-auto-animate>
        <WindowTab
          v-for="category in deviceStore.devices.categories"
          @click="deviceStore.setChars(category.category_id)"
          :id="category.category_id"
          :title="category.category_name"
          :activeId="deviceStore.charId"
        />
      </ul>
      <div class="window__box" v-if="deviceStore.devices && !deviceStore.isLoading">
        <h3 class="window__box-title">{{ deviceStore.devices.name }}</h3>
        <p class="window__box-descr">{{ deviceStore.devices.descr }}</p>
        <div v-for="(char, index) in deviceStore.chars.characteristics" :key="index" class="window__box-inputs">
          <input
            :placeholder="char"
            v-model="data[char]"
            class="window__box-input"
          />
        </div>
        <!-- <button :disabled="isDisabled" @click="saveData" :class="isDisabled ? 'window__box-btn window__box-btn--disabled' : 'window__box-btn'">Добавить</button> -->
        <button @click="clearData" class="window__box-btn">Очистить</button>
      </div>
      <button v-if="deviceStore.devices && !deviceStore.isLoading" @click="postData" class="window__btn">Рассчитать</button>
      <p v-if="errorMessage != ''" class="window__error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss" src="/src/components/Window/Window.scss" />

