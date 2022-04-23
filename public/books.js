new Swiper('.typeIMG',{
    navigation:{
        nextEl: '.swiper-button-next', 
        prevEl: '.swiper-button-prev',
        hideOnClick: true
    },


    coverflowEffect: {
        rotate: 0,
        depth: 0,
        slideShadows: false,
    },

    slideToClickedSlide: true,
    autoHeight: true,
    watchOverflow: true,
    effect: 'coverflow',
    freeMode: true,

    loop: true,
    slidesPerGroup: 1,
    slidesPerView: 3,
    spaceBetween: 20,
    speed: 700,

});