import { gsap } from 'gsap'
import Lenis from 'lenis'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/all'
import Swiper from 'swiper'
import { Autoplay, Controller } from 'swiper/modules'
import { setupHeaderAnimations } from '../../utils/header'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const mm = gsap.matchMedia()

document.addEventListener('DOMContentLoaded', function () {
	// Initialize Lenis
	const lenis = new Lenis()

	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add(time => {
		lenis.raf(time * 1000)
	})

	gsap.ticker.lagSmoothing(0)

	// Match media
	let mm = gsap.matchMedia()

	// Header
	const burger = document.querySelector('.burger')
	const headerMenu = document.querySelector('.header-menu')
	const headerLinks = headerMenu.querySelectorAll('.header_link')
	let menuOpen = false

	setupHeaderAnimations()

	// HEADER ANIMATION
	gsap.to('.header', {
		backgroundColor: 'rgba(211, 232, 245, 0.8)',
		duration: 0.4,
		ease: 'power1',
		scrollTrigger: {
			trigger: 'body',
			start: '100px top',
			toggleActions: 'play none none reverse',
		},
	})

	burger.addEventListener('click', () => {
		if (menuOpen) {
			gsap.to(headerMenu, {
				opacity: 0,
				duration: 0.4,
				ease: 'power1.out',
				onComplete: function () {
					headerMenu.style.visibility = 'hidden'
					document.body.classList.remove('is--lock')
				},
			})
		} else {
			document.body.classList.add('is--lock')
			headerMenu.style.visibility = 'visible'
			gsap.to(headerMenu, {
				opacity: 1,
				duration: 0.4,
				ease: 'power1.out',
			})
		}
		menuOpen = !menuOpen
	})
	headerLinks.forEach(link => {
		if (link) {
			link.addEventListener('click', function () {
				burger.click()
			})
		}
	})

	// HERO

	mm.add('(min-width: 767px)', function () {
		// cards init
		const heroTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.section_d-hero',
				start: '10% top',
				end: 'bottom bottom',
				toggleActions: 'play none reverse reverse',
			},
		})
		heroTl.to('.d-hero_card', {
			opacity: 1,
			duration: 0.05,
		})
		heroTl.from('.d-hero_card', {
			x: index => (index % 2 === 0 ? '-100vw' : '100vw'),
			duration: 0.7,
			ease: 'power1.inOut',
			stagger: 0.2,
		})
		// cards move
		const moveTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.d-hero_track',
				start: 'top+=40% top',
				end: 'bottom bottom',
				scrub: true,
			},
		})

		// Получаем карточки в обратном порядке
		const cards = gsap.utils.toArray('.d-hero_card').reverse()

		// Анимация
		cards.forEach((card, index) => {
			const nextCard = cards[index + 1] // Следующая карточка

			// Улетает текущая карточка
			moveTl.to(
				card,
				{
					y: '-100vh', // Улетает вверх
					duration: 1, // Длительность движения
					ease: 'power1.inOut',
				},
				index * 1
			) // Смещение времени для последовательности

			// Следующая карточка поворачивается на 0 градусов
			if (nextCard) {
				moveTl.to(
					nextCard,
					{
						rotation: 0, // Поворот на 0 градусов
						duration: 1, // Длительность совпадает с временем улетания
						ease: 'power1.out',
					},
					index * 1
				) // Синхронизация с началом улетания текущей карточки
			}
		})
	})

	mm.add('(max-width: 766px)', function () {
		gsap.to('.d-cards', {
			x: () => {
				// Получаем ширину родительского элемента
				const parentWidth =
					document.querySelector('.d-cards_wrapper').offsetWidth
				// Получаем ширину дочернего элемента
				const childWidth = document.querySelector('.d-cards').scrollWidth

				// Возвращаем расстояние, на которое нужно сдвинуть дочерний элемент
				return -(childWidth - parentWidth)
			},
			ease: 'none', // Равномерное движение
			scrollTrigger: {
				trigger: '.d-cards_wrapper', // Триггер — родительский элемент
				start: 'top top', // Начало скролла
				end: 'bottom bottom', // Конец скролла
				scrub: true, // Связь с прокруткой
			},
		})
	})

	// CLIENTS SLIDER ==================================
	Swiper.use([Controller])
	const clientsSwiper = new Swiper('#c-slider-01', {
		modules: [Autoplay],
		slidesPerView: 1.9,
		centeredSlides: true,
		spaceBetween: 16,
		loop: true,
		loopAdditionalSlides: 2,
		speed: 800,
		autoplay: {
			delay: 400,
		},
		virtual: {
			enabled: true,
		},
		breakpoints: {
			767: {
				slidesPerView: 4.5,
				spaceBetween: 24,
			},
		},
	})

	const clientsSwiper02 = new Swiper('#c-slider-02', {
		slidesPerView: 1.9,
		centeredSlides: true,
		spaceBetween: 16,
		loop: true,
		loopAdditionalSlides: 2,
		virtual: {
			enabled: true,
		},
		breakpoints: {
			767: {
				slidesPerView: 4.5,
				spaceBetween: 24,
			},
		},
	})

	// Связываем слайдеры
	clientsSwiper.controller.control = clientsSwiper02
	clientsSwiper02.controller.control = clientsSwiper

	// RUN LINES
	const imagesWrapper = document.querySelectorAll('.d-divider_line')

	imagesWrapper.forEach(wrapper => {
		gsap.to(wrapper, {
			xPercent: -100,
			repeat: -1,
			duration: 25,
			ease: 'linear',
		})
	})
})
