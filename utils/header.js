import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function setupHeaderAnimations() {
	const navComponent = document.querySelector('.header')
	if (!navComponent) return

	// Инициализация позиции заголовка
	gsap.set(navComponent, { y: '0%' })

	let lastScrollTop = 0

	// Обработчик прокрутки
	window.addEventListener('scroll', () => {
		let currentScroll = window.pageYOffset || document.documentElement.scrollTop

		if (currentScroll > lastScrollTop) {
			// Скролл вниз - скрываем шапку
			gsap.to(navComponent, {
				y: '-100%',
				duration: 0.2,
				ease: 'linear',
			})
		} else {
			// Скролл вверх - показываем шапку
			gsap.to(navComponent, {
				y: '0%',
				duration: 0.2,
				ease: 'linear',
			})
		}

		lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
	})
}
