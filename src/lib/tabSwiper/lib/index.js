import keyboard from './tabSwiper';
const tabSwiper = {
    install (Vue, options) {
        Vue.component('tabSwiper', keyboard)
    }
}

export default tabSwiper;