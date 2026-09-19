import Lottie from 'lottie-react';
import animationData from '../json_file/web-scraping.json';

/**
 * Aislado en su propio modulo para poder cargarlo con React.lazy: entre
 * lottie-web y el JSON de la animacion son ~700 kB que antes entraban en el
 * bundle inicial por una animacion decorativa que ni siquiera se ve al abrir.
 */
export default function ScrapingAnimation() {
    return <Lottie animationData={animationData} loop autoplay />;
}
