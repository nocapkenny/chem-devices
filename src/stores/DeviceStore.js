import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDeviceStore = defineStore('deviceStore', () => {
  //states
  const devices = ref()
  const isLoading = ref(false)
  const chars = ref()
  const charId = ref(1)

  //actions
  const throttling = () => { //функция для искусственной задержки отображения компонента
    const minLoadingTime = 800;
    isLoading.value = true
    const loadData = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    Promise.all([
      loadData,
      new Promise((resolve) => setTimeout(resolve, minLoadingTime)),
    ]).then(() => {
      isLoading.value = false;

    });
  };

  const setChars = (id) => {
    chars.value = devices.value.categories[id - 1];
    charId.value = id;
  };
  const getDevices = async () => {
    try{
      const { data } = await axios.get('https://6746e3e838c8741641d4909d.mockapi.io/api/window/devices')
      devices.value = data[0]
    } catch(err){
      console.error(err)
    } finally{
      throttling()
      setChars(1)
    }
  }

  const postData = async (formData) => {
    try{
      const { data } = await axios.post('https://6746e3e838c8741641d4909d.mockapi.io/api/window/chars',
        formData,
        {
          header: {
            "Content-Type": "multipart/form-data",
          }
        })
        console.log(data)
    } catch(err){
      console.error(err)
    } finally{
      throttling()
    }
  }
  


  return { devices, getDevices, isLoading, chars, charId, setChars, postData }
})
