import { gsap } from 'gsap'
import Lenis from 'lenis'

import { DrawSVGPlugin } from 'gsap/all'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin)

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
	const heroTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.f-hero_section',
			start: '5% top',
			end: 'bottom bottom',
			scrub: 1,
		},
	})
	heroTl.to('.f-hero_accent', {
		scale: 5,
		y: '10%',
	})

	// FILTRATION
	const elements = 8 // Количество элементов
	const fullCircle = 1 // Полный круг в GSAP

	// Создаём массив для хранения ScrollTrigger объектов
	const scrollTriggers = []

	for (let i = 0; i < elements; i++) {
		const start = i / elements // Начальная позиция (доля круга)
		const end = start + fullCircle / 2 // Конечная позиция (половина круга)
		const duration = 10 + (i % 2 === 0 ? 0.2 * i : -0.2 * i)

		// Движение элемента по кругу
		gsap.to(`.filtration_el.is--0${i + 1}`, {
			motionPath: {
				path: '.filtration-path',
				align: '.filtration-path',
				alignOrigin: [0.5, 0.5],
				autoRotate: false,
				start: start,
				end: end,
			},
			duration: 15,
			ease: 'linear',
			repeat: -1,
			yoyo: true,
			onUpdate: () => {
				if (scrollTriggers[i]) {
					scrollTriggers[i].refresh()
				}
			},
		})

		// Создаём ScrollTrigger для каждого элемента
		const scrollTrigger = ScrollTrigger.create({
			trigger: `.filtration_el.is--0${i + 1}`, // Каждый элемент как триггер
			start: 'center center+=3%', // Точка старта
			end: 'center center-=3%', // Точка завершения
			horizontal: true, // Включаем горизонтальный скролл
			onEnter: () => {
				gsap.to(`.filtration_el.is--0${i + 1}`, {
					opacity: 0,
					scale: 0,
					duration: 0.4,
				})
			},
			onLeave: () => {
				gsap.to(`.filtration_el.is--0${i + 1}`, {
					opacity: 1,
					scale: 1,
					duration: 0.4,
				})
			},
			onEnterBack: () => {
				gsap.to(`.filtration_el.is--0${i + 1}`, {
					opacity: 0,
					scale: 0,
					duration: 0.4,
				})
			},
			onLeaveBack: () => {
				gsap.to(`.filtration_el.is--0${i + 1}`, {
					opacity: 1,
					scale: 1,
					duration: 0.4,
				})
			},
		})

		// Сохраняем ScrollTrigger объект
		scrollTriggers.push(scrollTrigger)
	}

	gsap.to('.filtration_el', {
		scale: 1.35,
		duration: 1,
		repeat: -1,
		yoyo: true,
		ease: 'power1.inOut'
	});

	const natureNums = document.querySelectorAll('.f-nums_card .text-68px')

	natureNums.forEach(numText => {
		const num = numText.textContent.replace(/\D/g, '')
		const nonNums = numText.textContent.replace(/\d/g, '')

		numText.innerHTML = `<span class="number">${num}</span>${nonNums}`

		gsap.fromTo(
			numText.querySelector('.number'),
			{
				innerText: 0,
			},
			{
				innerText: num,
				duration: 3,
				ease: 'none',
				scrollTrigger: {
					trigger: '.f-nums_section',
					start: 'top bottom',
					end: 'bottom center',
				},
				onUpdate: function () {
					numText.querySelector('.number').innerText = Math.floor(
						numText.querySelector('.number').innerText
					)
				},
			}
		)
	})
})
