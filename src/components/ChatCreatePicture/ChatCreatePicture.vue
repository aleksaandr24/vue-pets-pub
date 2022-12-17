<template>
  <div
    class="creation-picture"
  >
    <label
      for="chatPicture"
      class="creation-picture__label"
    />
    <input
      @change="uploadFile"
      id="chatPicture"
      name="chatPicture"
      type="file"
      accept=".jpg, .jpeg, .png"
      class="creation-picture__input"
    />
    <img
      :src="chatImg"
      width="50"
      height="50"
      class="creation-picture__img"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'ChatCreatePicture',

  emits: ['uploadChatPicture'],

  setup(props, { emit }) {
    const chatImg = ref('')
    const base64Image = ref('')

    const getBase64FromUrl = async (url) => {
      const data = await fetch(url)
      const blob = await data.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          const base64data = reader.result
          resolve(base64data)
        }
      })
    }

    onMounted(() => {
      if (chatImg.value === '') {
        chatImg.value = 'https://loremflickr.com/50/50'
        getBase64FromUrl(chatImg.value).then(res => {
          base64Image.value = res
          emit('uploadChatPicture', base64Image)
        })
      }
    })

    const uploadFile = (e) => {
      const file = e.target.files[0] || e.dataTransfer.files[0]
      if (['image/jpeg', 'image/png'].includes(file.type)) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const img = new Image()
        img.src = window.URL.createObjectURL(file)
        img.onload = () => {
          const maxWidth = 50
          const maxHeight = 50
          let width = img.width
          let height = img.height
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
          }
          canvas.width = width
          canvas.height = height
          context.drawImage(img, 0, 0, width, height)
          base64Image.value = canvas.toDataURL('image/jpeg')
          chatImg.value = base64Image.value
          emit('uploadChatPicture', base64Image)
        }
      }
    }

    return {
      chatImg,
      base64Image,
      uploadFile
    }
  }
}
</script>

<style lang="scss" src="./ChatCreatePicture.scss"/>