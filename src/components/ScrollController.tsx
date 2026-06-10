import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollControllerProps {
  children: React.ReactNode;
}

export const ScrollController: React.FC<ScrollControllerProps> = ({ children }) => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    gsap.utils.toArray('.section').forEach((section: Element) => {
      gsap.fromTo(
        section,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    gsap.utils.toArray('.parallax-gem').forEach((gem: Element) => {
      gsap.to(gem, {
        y: -100,
        scrollTrigger: {
          trigger: gem,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray('.gold-accent').forEach((accent: Element) => {
      gsap.fromTo(
        accent,
        {
          width: 0,
        },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: accent,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};
