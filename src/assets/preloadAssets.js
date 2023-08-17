// Pour les images
const imagesContext = require.context('./images/', false, /\.(webp|png|jpg|jpeg|gif)$/);
const images = imagesContext.keys().map(imagesContext);

// Pour les icônes
const iconsContext = require.context('./icons/', false, /\.(webp|png|jpg|jpeg|gif|svg)$/);
const icons = iconsContext.keys().map(iconsContext);

// Pour les logos
const logosContext = require.context('./logo/', false, /\.(webp|png|jpg|jpeg|gif|svg)$/);
const logos = logosContext.keys().map(logosContext);

// Pour les vidéos (si elles sont de petite taille)
const videosContext = require.context('./videos/', false, /\.(mp4|webm|ogg)$/);
const videos = videosContext.keys().map(videosContext);

// Combine tous
const allAssets = [...images, ...icons, ...logos, ...videos];

export default allAssets;
