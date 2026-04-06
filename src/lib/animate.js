import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function fadeUp(el, delay = 0) {
    return gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay
    });
}

export function revealBatch(elements) {
    ScrollTrigger.batch(elements, {
        onEnter: (batch) => {
            gsap.from(batch, {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6
            });
        },
        once: true
    });
}