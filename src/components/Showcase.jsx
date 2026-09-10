import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { galleryData } from '../data/galleryData';

const categories = ['Todos', 'Pasteles', 'Roles', 'Cupcakes', 'Tartas', 'Petit Fours'];

const Showcase = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredImages = filter === 'Todos' 
    ? galleryData 
    : galleryData.filter(img => img.category === filter);

  const displayedImages = filteredImages.slice(0, visibleCount);

  // Close with ESC key and navigation with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight' && selectedItem) {
        handleNext(e);
      } else if (e.key === 'ArrowLeft' && selectedItem) {
        handlePrev(e);
      }
    };

    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, filteredImages]);

  const handleOpenLightbox = (item) => {
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  const handleNext = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredImages.findIndex(i => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedItem(filteredImages[nextIndex]);
  };

  const handlePrev = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredImages.findIndex(i => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedItem(filteredImages[prevIndex]);
  };

  const sendWhatsAppInquiry = (title) => {
    const text = encodeURIComponent(`¡Hola! Me encantó el diseño de "${title}" que vi en su galería web. ¿Podrían darme más información y disponibilidad para un pedido especial?`);
    window.open(`https://wa.me/5215512345678?text=${text}`, '_blank');
  };

  return (
    <section id="galeria" className="section-py bg-soft flex justify-center items-center w-full">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        
        {/* Gallery Title & Header Centered */}
        <div className="text-center max-w-2xl mx-auto mb-lg">
          <span className="text-label mb-xs block text-accent tracking-widest uppercase font-bold flex items-center justify-center gap-1.5">
            <Sparkles size={16} /> Vitrina Fotográfica de Estudio
          </span>
          <h2 className="text-h2 mb-sm font-serif">Nuestra Colección de Autor</h2>
          <p className="text-body-lg text-soft opacity-85 leading-relaxed">
            Cada creación de nuestro taller capturada en tomas profesionales de estudio gourmet, resaltando texturas, ingredientes nobles y detalles artesanales únicos.
          </p>
        </div>

        {/* Filter Pills Centered */}
        <div className="flex justify-center items-center gap-xs flex-wrap mb-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setVisibleCount(12);
              }}
              className={`pill-option ${filter === cat ? 'active' : ''}`}
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.85rem',
                borderRadius: '50px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Centered */}
        <motion.div 
          layout
          className="grid grid-4 gap-lg justify-center items-stretch max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {displayedImages.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
                className="gallery-card bg-white text-left flex flex-col justify-between group cursor-pointer"
                onClick={() => handleOpenLightbox(item)}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(216, 112, 147, 0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div>
                  <div style={{ height: '270px', overflow: 'hidden', position: 'relative' }}>
                    <motion.img 
                      src={item.src} 
                      alt={item.title}
                      loading="lazy"
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.5 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-wider text-accent border border-pink-100 shadow-xs">
                      {item.category}
                    </span>

                    {/* Quick View Hover Icon */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/95 text-main px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye size={14} className="text-accent" /> Ver en Detalle
                      </span>
                    </div>
                  </div>

                  <div className="card-content" style={{ padding: '1.25rem' }}>
                    <h3 className="text-h3 font-serif mb-xs text-main" style={{ fontSize: '1.05rem', lineHeight: '1.3' }}>
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-soft leading-relaxed" style={{ opacity: 0.85, fontSize: '0.82rem' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button if more items are available in current filter */}
        {filteredImages.length > visibleCount && (
          <div className="mt-xl flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="btn-outline text-accent border-accent hover:bg-accent hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-xs"
            >
              Cargar Más Creaciones ({filteredImages.length - visibleCount} restantes)
            </button>
          </div>
        )}

        {/* Luxury Product Detail Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="luxury-lightbox-overlay"
              onClick={handleCloseLightbox}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 28, stiffness: 350 }}
                className="luxury-lightbox-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="luxury-lightbox-grid">
                  
                  {/* Left Column: Media with Navigation */}
                  <div className="luxury-lightbox-media">
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                    />
                    
                    {/* Navigation Buttons */}
                    <button
                      onClick={handlePrev}
                      className="luxury-lightbox-nav-btn prev"
                      title="Anterior (Flecha izquierda)"
                      aria-label="Anterior"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="luxury-lightbox-nav-btn next"
                      title="Siguiente (Flecha derecha)"
                      aria-label="Siguiente"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>

                  {/* Right Column: Editorial Product Information */}
                  <div className="luxury-lightbox-content">
                    <div>
                      {/* Header with Category Badge & Close Button */}
                      <div className="luxury-lightbox-header">
                        <span className="luxury-category-badge">
                          <Sparkles size={12} /> {selectedItem.category}
                        </span>
                        <button
                          onClick={handleCloseLightbox}
                          className="luxury-close-btn"
                          title="Cerrar (Esc)"
                          aria-label="Cerrar modal"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Title & Divider */}
                      <h3 className="luxury-lightbox-title">
                        {selectedItem.title}
                      </h3>
                      <div className="luxury-lightbox-divider"></div>
                      
                      {/* Description */}
                      <p className="luxury-lightbox-desc">
                        {selectedItem.description}
                      </p>

                      {/* Feature Card */}
                      <div className="luxury-feature-card">
                        <div className="luxury-feature-title">
                          <Sparkles size={14} className="text-accent" /> Elaboración de Alta Repostería
                        </div>
                        <p className="luxury-feature-text">
                          Cada pieza es diseñada artesanalmente bajo pedido con ingredientes nobles de origen certificado y técnicas tradicionales.
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="luxury-lightbox-actions">
                      <button
                        onClick={() => sendWhatsAppInquiry(selectedItem.title)}
                        className="btn-luxury-quote"
                      >
                        <MessageCircle size={18} /> Cotizar este Diseño
                      </button>
                      <button
                        onClick={handleCloseLightbox}
                        className="btn-back-gallery"
                      >
                        <ArrowLeft size={14} /> Volver a la vitrina
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Showcase;
