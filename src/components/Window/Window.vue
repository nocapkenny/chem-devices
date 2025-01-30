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
  <div class="flex justify-center items-center h-screen">
    <div v-auto-animate class="w-[1200px] min-h-600 bg-white rounded-custom shadow-custom relative">
      <Loader class="!absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" v-if="deviceStore.isLoading"/>
      <ul v-if="deviceStore.devices && !deviceStore.isLoading" class="flex" v-auto-animate>
        <WindowTab
          v-for="category in deviceStore.devices.categories"
          @click="deviceStore.setChars(category.category_id)"
          :id="category.category_id"
          :title="category.category_name"
          :activeId="deviceStore.charId"
        />
      </ul>
      <div class="py-[30px] w-[900px] my-[30px] mx-auto border-[4px] border-bluora rounded-custom flex flex-col items-center" v-if="deviceStore.devices && !deviceStore.isLoading">
        <h3 class="text-center text-[30px] mb-[20px] font-bold">{{ deviceStore.devices.name }}</h3>
        <p class="text-center mb-[50px]">{{ deviceStore.devices.descr }}</p>
        <div v-for="(char, index) in deviceStore.chars.characteristics" :key="index" class="flex justify-center flex-wrap m-auto w-[300px]">
          <input
            :placeholder="char"
            v-model="data[char]"
            class="mb-[30px] border-none bg-primary p-[10px] rounded-[15px] outline-none focus:bg-bluora"
          />
        </div>
        <!-- <button :disabled="isDisabled" @click="saveData" :class="isDisabled ? 'window__box-btn window__box-btn--disabled' : 'window__box-btn'">Добавить</button> -->
        <button @click="clearData" class="w-[300px] btn">Очистить</button>
      </div>
      <button v-if="deviceStore.devices && !deviceStore.isLoading" @click="postData" class="block w-[500px] mx-auto btn">Рассчитать</button>
      <p v-if="errorMessage != ''" class="text-center text-error mb-[30px]">{{ errorMessage }}</p>
    </div>
  </div>
</template>


