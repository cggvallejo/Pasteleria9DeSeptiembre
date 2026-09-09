import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Heart } from 'lucide-react';
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

  const handleOpenLightbox = (item) => {
    setSelectedItem(item);
  };

  const handleCloseLightbox = () => {
    setSelectedItem(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex(i => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedItem(filteredImages[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
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

        {/* Studio Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
              onClick={handleCloseLightbox}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                style={{ border: '1px solid rgba(216, 112, 147, 0.2)' }}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseLightbox}
                  className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-main p-2 rounded-full shadow-md transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Left Side: HD Studio Image */}
                <div className="md:w-3/5 bg-soft relative flex items-center justify-center overflow-hidden" style={{ minHeight: '340px' }}>
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover max-h-[500px]"
                  />
                  
                  {/* Prev / Next Navigation Arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-main p-2 rounded-full shadow-md transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-main p-2 rounded-full shadow-md transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Right Side: Details & Actions */}
                <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between text-left">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-pink-50 border border-pink-100 mb-3">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-h2 font-serif text-main mb-3" style={{ fontSize: '1.45rem', lineHeight: '1.2' }}>
                      {selectedItem.title}
                    </h3>
                    <p className="text-body text-soft leading-relaxed mb-6" style={{ fontSize: '0.92rem' }}>
                      {selectedItem.description}
                    </p>

                    <div className="bg-soft/60 rounded-2xl p-4 mb-6 border border-pink-100/60">
                      <div className="flex items-center gap-2 text-xs font-semibold text-main mb-1">
                        <Sparkles size={14} className="text-accent" /> Elaboración de Autor
                      </div>
                      <p className="text-xs text-soft opacity-80 leading-normal">
                        Cada pedido se elabora bajo encargo con ingredientes orgánicos y decoración artesanal personalizada.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => sendWhatsAppInquiry(selectedItem.title)}
                      className="btn-primary w-full py-3 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle size={18} /> Cotizar este Diseño
                    </button>
                    <button
                      onClick={handleCloseLightbox}
                      className="w-full py-2.5 px-4 rounded-xl text-xs text-soft hover:text-main font-medium transition-colors text-center"
                    >
                      Seguir explorando galería
                    </button>
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
