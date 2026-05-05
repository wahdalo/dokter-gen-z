import { useEffect } from 'react';

export function useScrollReveal(enabled = true) {
    useEffect(() => {
        if (!enabled) return;

        const elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        elements.forEach((element) => {
            if (!element.classList.contains('is-visible')) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [enabled]);
}
