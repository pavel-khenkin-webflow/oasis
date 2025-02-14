import { gsap } from 'gsap'
import Lenis from 'lenis'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/all'
import { setupHeaderAnimations } from '../../utils/header'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

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

	// MENU OPEN/CLOSE
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

	// HERO ---------------------------------------------------------
	//уход с хедера  
	gsap.set('[data-aqua]', { left: '64.3em', top: '26em' })
	gsap.to('[data-aqua]', 
		{ 
		left: '30em',
		top: '110em',
		duration: .95,
		ease: "power2.inOut",
		scrollTrigger: {
		  trigger: '.section_hero-top',
		  start: '1% top', // Начинается в самом верху страницы
		  end: '1% top', // Заканчивается на высоте 5em
		  toggleActions: "play none none reverse"
		}
	});

	gsap.set('[data-aqua2]', { left: '48%', bottom: '-100%' })
	gsap.to('[data-aqua2]', 
		{
		left: '48%',
		bottom: '0%',
		// duration: 0.5, // Плавность движения
		ease: "power3.inOut",
		immediateRender: false,
		scrollTrigger: {
		  trigger: '.section_hero-bot',
		  start: '85% bottom', 
		  markers: true,
		  end: '98% bottom', 
		  toggleActions: "play none none reverse"
		}
	  });
	  	  
		gsap.to('[data-aqua2]', {
			scale: 0, // Используем scale вместо transform
			ease: "power2.inOut",
			scrollTrigger: {
				trigger: '.section_hero-bot',
				start: 'bottom bottom', // Точка триггера одна, анимация срабатывает только здесь
				toggleActions: "play none none reverse",
				markers: true
			}
			});
	  

	const herorl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_hero-top',
			start: 'top top',
			end: 'bottom bottom',
			scrub: 2,
		},
	})

	if (document.querySelector('.hero_bottle')) {
		herorl.to('.hero_bottle', {
			y: '-50%',
		})
	}
	herorl.to(
		'.hero_bg-text',
		{
			x: '-10%',
		},
		'<'
	)
	const heroTextSplit = new SplitText('#hero-text', {
		type: 'words, chars',
	})
	gsap.to(heroTextSplit.chars, {
		color: '#FFF',
		stagger: 0.1,
		scrollTrigger: {
			trigger: '.section_hero-bot',
			start: 'top center',
			end: 'center center',
			scrub: true,
		},
	})
	const video = document.querySelector('.fitr_video video')
	if (document.querySelector('.fitr_video video')) {
		ScrollTrigger.create({
			trigger: '.section_filtr',
			start: 'top center',
			end: 'bottom center',
			onEnter: () => video.play(),
			onLeave: () => video.pause(),
			onEnterBack: () => video.play(),
			onLeaveBack: () => video.pause(),
		})
	}
	const aboutIcons = document.querySelectorAll('.about_card-icon-box')
	aboutIcons.forEach(card => {
		const path = card.querySelector('circle')
		gsap.set(path, {
			drawSVG: '0%',
		})

		gsap.to(path, {
			drawSVG: '100%',
			duration: 2,
			ease: 'power1.out',
			scrollTrigger: {
				trigger: '.about_track',
				start: 'top center',
				end: 'bottom center',
				scrub: true,
			},
		})
	})

	mm.add('(min-width: 768px)', () => {
		// ABOUT ------------------------------------------------------
		const pagNums = document.querySelectorAll('.about_pagination-item')
		const aboutCard01 = document.querySelector('[a-data-card="01"]')
		const aboutCard02 = document.querySelector('[a-data-card="02"]')
		const aboutBottle = document.querySelector('.about_bottle')

		const aboutTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.about_track',
				start: 'center center',
				end: 'bottom center',
				// markers: true,

				onEnter: () => {
					aboutTl.add(() => {
						pagNums[0].classList.remove('is--active')
						pagNums[1].classList.add('is--active')
						aboutCard02.style.visibility = 'visible'
					})
					aboutTl.to(aboutCard01, {
						opacity: 0,
						duration: 0.5,
						ease: 'power1.out',
					})
					aboutTl.to(
						aboutCard02,
						{
							opacity: 1,
							duration: 0.5,
							ease: 'power1.out',
						},
						'<'
					)
					/*aboutTl.to(
						aboutBottle,
						{
							rotation: 12,
							duration: 0.5,
							ease: 'power1.out',
						},
						'<'
					)*/
					aboutTl.add(() => {
						aboutCard01.style.visibility = 'hidden'
					})
				},

				onLeaveBack: () => {
					aboutTl.add(() => {
						pagNums[1].classList.remove('is--active')
						pagNums[0].classList.add('is--active')
						aboutCard01.style.visibility = 'visible'
					})
					aboutTl.to(aboutCard01, {
						opacity: 1,
						duration: 0.5,
						ease: 'power1.out',
					})
					aboutTl.to(
						aboutCard02,
						{
							opacity: 0,
							duration: 0.5,
							ease: 'power1.out',
						},
						'<'
					)
					/*aboutTl.to(
						aboutBottle,
						{
							rotation: 0,
							duration: 0.5,
							ease: 'power1.out',
						},
						'<'
					)*/
					aboutTl.add(() => {
						aboutCard02.style.visibility = 'hidden'
					})
				},
			},
		})
		// TYPES
		const typeCards = document.querySelectorAll('.types_card')

		typeCards.forEach(card => {
			const cardVideo = card.querySelector('video')
			card.addEventListener('mouseenter', () => {
				if (cardVideo) {
					cardVideo.play()
				}
			})
			card.addEventListener('mouseleave', () => {
				cardVideo.pause()
			})
		})
	})

	mm.add('(max-width: 766px)', () => {
		// TYPES
		const typeVideos = document.querySelectorAll('.types_card video')

		typeVideos.forEach(video => {
			ScrollTrigger.create({
				trigger: '.section_types',
				start: 'top top',
				end: 'bottom top',
				onEnter: () => {
					video.play()
				},
				onLeave: () => {
					video.pause()
				},
				onLeaveBack: () => {
					video.play()
				},
				onEnterBack: () => {
					video.play()
				},
				scrub: true,
			})
		})
	})

	// FILTRATION ----------------------------------------------
	const filtrCards = document.querySelectorAll('.filtr_cards')
	const filtrTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_filtr',
			start: 'top top',
			end: 'center center',
			scrub: true,
		},
	})
	filtrTl.to('.filtr_bg-circle', {
		scale: 1,
	})
	filtrTl.to(
		'.filtr_bg-image',
		{
			scale: 1,
		},
		'<'
	)
	filtrTl.to(
		'.filtr_bottle',
		{
			scale: 1,
		},
		'<'
	)
	mm.add('(min-width: 767px)', () => {
		ScrollTrigger.create({
			trigger: '.filtr_content-box',
			start: 'center center',
			onEnter: () => {
				filtrCards.forEach(card => {
					card.classList.add('is--show')
				})
			},
			onLeaveBack: () => {
				filtrCards.forEach(card => {
					card.classList.remove('is--show')
				})
			},
		})
	})

	// FILTERS CARDS -------------------------------
	const filtersCards = document.querySelectorAll('.filtr_card')

	filtersCards.forEach((card, index) => {
		const cardContent = card.querySelector('.filtr_card-content')
		const cardContentHeight = cardContent.scrollHeight

		card.addEventListener('click', () => {
			card.classList.toggle('is--show')

			if (card.classList.contains('is--show')) {
				gsap.to(cardContent, {
					height: cardContentHeight,
					duration: 0.4,
					ease: 'power1.out',
				})
			} else {
				gsap.to(cardContent, {
					height: 0,
					duration: 0.4,
					ease: 'power1.in',
				})
			}
		})

		// Открываем 2-ю и 5-ю карточки при загрузке страницы
		mm.add('(min-width: 767px)', () => {
			if (index === 1 || index === 4) {
				card.classList.add('is--show')
				gsap.to(cardContent, {
					height: cardContentHeight,
					duration: 0.4,
					ease: 'power1.out',
				})
			}
		})
		mm.add('(max-width: 766px)', () => {
			if (index === 0) {
				card.classList.add('is--show')
				gsap.to(cardContent, {
					height: cardContentHeight,
					duration: 0.4,
					ease: 'power1.out',
				})
			}
		})
	})

	// NATURE
	const natureNums = document.querySelectorAll('.nature_nums-card .text-48px')

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
				duration: 2,
				ease: 'none',
				scrollTrigger: {
					trigger: '.section_nature',
					start: 'top top',
					end: 'bottom bottom',
				},
				onUpdate: function () {
					numText.querySelector('.number').innerText = Math.floor(
						numText.querySelector('.number').innerText
					)
				},
			}
		)
	})

	// TABS
	const tabs = document.querySelectorAll('.products_tab')
	const tabCards = document.querySelectorAll('.products_card')

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const tabValue = tab.getAttribute('data-tab')

			tabs.forEach(t => t.classList.remove('is--active'))
			tab.classList.add('is--active')

			tabCards.forEach(card => {
				const cardValue = card.getAttribute('data-product')

				if (cardValue === tabValue) {
					gsap.set(card, { visibility: 'visible' })
					gsap.to(card, {
						opacity: 1,
						duration: 0.5,
						overwrite: 'auto',
					})
				} else {
					gsap.to(card, {
						opacity: 0,
						duration: 0.5,
						onComplete: () => {
							gsap.set(card, { visibility: 'hidden' })
						},
						overwrite: 'auto',
					})
				}
			})
		})
	})

	document.querySelector('.products_tab').click()

	// GET TOUCH
	const sLinks = document.querySelectorAll('.contact_s-link-box')
	sLinks.forEach(link => {
		const path = link.querySelector('circle')
		gsap.set(path, {
			drawSVG: '0%',
		})

		link.addEventListener('mouseenter', function () {
			gsap.to(path, {
				drawSVG: '100%',
				duration: 0.5,
				ease: 'power1.out',
			})
		})
		link.addEventListener('mouseleave', function () {
			gsap.to(path, {
				drawSVG: '0%',
				duration: 0.5,
				ease: 'power1.out',
			})
		})
	})

	// MAP ------------------------------------------
	const mapTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_map',
			start: 'top center',
		},
	})
	mapTl.from('.map_point', {
		scale: 0,
		duration: 0.4,
		ease: 'power1.out',
	})
	mapTl.from('#about-icon-01', {
		drawSVG: '0%',
		duration: 3,
		ease: 'power1.inOut',
	})
})
