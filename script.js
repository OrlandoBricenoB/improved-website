document.addEventListener('DOMContentLoaded', () => {
    
    // Agregar la clase loaded al body.
    document.body.classList.add('loaded')

    // Eliminar transición de background del body.
    // Ésto lo hice porque al cambiar el tamaño de la ventana, el rayo rehacía su transición.
    // Se veía feo.
    setTimeout(() => {
        document.body.style.transition = 'none'
    }, 1100)

    /*
        * Trabajos Realizados *
    */
    
    const works = document.querySelectorAll('.work')

    // Versión móvil de la web.
    let mobile = false

    const verifyWidth = () => {

        mobile = window.innerWidth < 991

        // Quitar el active a todos los works.
        if (!mobile) {
            works.forEach(work => {
                work.classList.remove('active')
            })
        }
    }
    verifyWidth()

    window.addEventListener('resize', () => { verifyWidth() })

    // Solo en móvil, abrir el work cada vez que sea visible.
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.8
    }

    // Observador de intersecciones.
    let observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            let elem = entry.target
            
            // Work Showcase In Mobile
            if (elem.classList.contains('work')) {
                // Solo para móviles
                if (!mobile) { return false }
                
                if (!elem.classList.contains('active')) {
                    if (entry.isIntersecting) {
                        elem.classList.add('active')
                    }
                }
            }

            if (elem.classList.contains('reveal')) {

                if (elem.classList.contains('showProject') && mobile) {
                    elem.classList.add('active')
                    return
                }

                if (!elem.classList.contains('active')) {
                    if (entry.isIntersecting) {
                        elem.classList.add('active')

                        // Eliminar los .5s al Business
                        if (elem.classList.contains('r-delay-5') && elem.classList.contains('business')) {

                            elem.addEventListener('transitionend', e => {
                                if (e.propertyName === 'opacity') {
                                    elem.classList.remove('r-delay-5')    
                                }
                            })

                        }
                    }
                }else {
                    if (!entry.isIntersecting) {
                        elem.classList.remove('active')
                    }
                }
            }

        })

    }, options)

    // Recorrer works y agregar observador.
    works.forEach(work => {
        observer.observe(work)
    })

    // Elementos con animaciones reveals, agregar a la lista del Observer.
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach(reveal => {
        observer.observe(reveal)
    })

    // En PC, tiene un contador de 5 segundos para cambiar active de los works.
    let i = 0
    setInterval(() => {

        if (mobile) return

        console.log('Timer')

        works.forEach(work => {
            work.classList.remove('active')
        })

        works[i].classList.add('active')

        i += 1
        if (i > works.length-1) i = 0

    }, 5000)

    /*
        * Travel Smooth on Links *
    */

    const links = document.querySelectorAll(".smooth")

    for (const link of links) link.addEventListener("click", clickHandler)

    function clickHandler(e) {
        e.preventDefault()
        
        const href = this.getAttribute("href")
        
        document.querySelector(href).scrollIntoView({
            behavior: "smooth"
        })
    }

    /*
        * Cambiar imagen en ShowProject | SlideShow * 
    */

    const images = [
        '../img/banner.png',
        '../img/banner.png',
        '../img/banner.png',
        '../img/banner.png'
    ]
    let imageIndex = 0

    const sProject = document.querySelector('.screen > img')

    setInterval(() => {
        sProject.classList.add('change')
    }, 5000)

    sProject.addEventListener('transitionend', () => {
        
        // Solo permitir 1 vez.
        if (!sProject.classList.contains('change')) return

        imageIndex += 1

        if (imageIndex > images.length-1) imageIndex = 0

        sProject.src = './public/ico/'+images[imageIndex]

        sProject.classList.remove('change')    
    })

    /*
        * Scroll add Sticky Class *
    */

    const header = document.querySelector('header')

    window.addEventListener('scroll', () => {

        if (window.scrollY > 60) {
            header.classList.add('sticky')
        }else {
            header.classList.remove('sticky')
        }

    })

})


