import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 * Adds meta tags and SEO optimization to pages
 */
const SEO = ({
  title = 'SmartTour360 - India\'s Premier Travel Booking Platform',
  description = 'Book flights, trains, buses, and curated tours across 200+ Indian destinations with AI-powered safety ratings. Experience seamless travel planning with SmartTour360.',
  keywords = 'travel booking, India tourism, flight booking, train tickets, bus booking, tour packages, travel planner, Indian destinations, holiday packages',
  image = '/og-image.jpg',
  url = window.location.href,
  type = 'website',
  author = 'SmartTour360',
  noindex = false,
  canonical = window.location.href,
}) => {
  const siteName = 'SmartTour360';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#f97316" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="SmartTour360" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icon-192.png" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default SEO;
