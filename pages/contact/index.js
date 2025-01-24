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
		backgroundColor: 'rgba(14, 14, 14, 0.8)',
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
					gsap.to('.header', {
						backgroundColor: 'rgba(14, 14, 14, 0.8)',
						duration: 0.4,
						ease: 'power1',
					})
					gsap.to('.header_logo', {
						color: '#ffffff',
						duration: 0.4,
						ease: 'power1',
					})
					gsap.to('.header_small-link', {
						color: '#ffffff',
						duration: 0.4,
						ease: 'power1',
					})
					headerMenu.style.visibility = 'hidden'
					document.body.classList.remove('is--lock')
				},
			})
		} else {
			document.body.classList.add('is--lock')
			headerMenu.style.visibility = 'visible'
			gsap.to('.header', {
				backgroundColor: 'rgba(14, 14, 14, 0.0)',
				duration: 0.4,
				ease: 'power1',
			})
			gsap.to(headerMenu, {
				delay: 0.05,
				opacity: 1,
				duration: 0.4,
				ease: 'power1.out',
			})
			gsap.to('.header_logo', {
				color: '#0e0e0e',
				duration: 0.4,
				ease: 'power1',
			})
			gsap.to('.header_small-link', {
				color: '#0e0e0e',
				duration: 0.4,
				ease: 'power1',
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
