document.querySelectorAll('.slider').forEach((n, i) => {
	window[`slider${i+1}`] = new Swiper(n, {
		freeMode: true,
		centeredSlides: true,
		direction: 'vertical',
		mousewheel: {
			enabled: true,
			sensitivity: 3,
		},
		slidesPerView: 1.75,
		slidesOffsetBefore: -125
	})
})
bindSwipers(slider1, slider2, slider3, slider4)

  // Находим все элементы с классом "imageContainer"
  const imageContainers = document.querySelectorAll('.imageContainer');

  // Добавляем обработчик события на клик для каждого элемента
  imageContainers.forEach(imageContainer => {
    imageContainer.addEventListener('click', function() {
      // Получаем URL сайта из атрибута данных "data-website"
      const url = imageContainer.dataset.website;

      // Открываем новую вкладку с указанным URL
      window.open(url, '_blank');
    });
  });