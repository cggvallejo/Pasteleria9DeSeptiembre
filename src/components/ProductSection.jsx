import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Heart } from 'lucide-react';
import { products } from '../data/products';

const categories = ['Todos', 'Pasteles', 'Roles', 'Cupcakes', 'Tartas', 'Petit Fours'];

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos'
    ? products
    : products.filter(p => p.category === activeCategory);

  const scrollToConcierge = (productName) => {
    const pedidosSection = document.getElementById('pedidos');
    if (pedidosSection) {
      pedidosSection.scrollIntoView({ behavior: 'smooth' });
      // Optional: prefill concierge if there's an input
      const msgInput = document.querySelector('textarea[name="comments"], textarea');
      if (msgInput) {
        msgInput.value = `Deseo solicitar información para el pedido de: ${productName}`;
      }
    }
  };

  return (
    <section id="tienda" className="section-py bg-soft">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md-flex-row justify-between items-center md-items-end text-center md-text-left mb-lg">
          <div>
            <span className="text-label block mb-xs text-accent font-bold tracking-widest uppercase flex items-center justify-center md-justify-start gap-1.5">
              <Sparkles size={16} /> Catálogo de Autor
            </span>
            <h2 className="text-h2">Nuestra Colección Boutique</h2>
            <p className="text-body text-soft mt-xs max-w-xl">
              Cada creación es elaborada diariamente en nuestro taller con ingredientes de origen certificado, chocolate de especialidad y técnicas de alta repostería.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-xs justify-center mt-md md-mt-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pill-option ${activeCategory === cat ? 'active' : ''}`}
                style={{ fontSize: '0.82rem', padding: '0.55rem 1.2rem', borderRadius: '50px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid product-grid grid-3 gap-lg">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="product-card bg-white flex flex-col justify-between group"
                style={{
                  borderRadius: 'var(--card-radius)',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(216, 112, 147, 0.12)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Image & Category */}
                <div>
                  <div className="product-image-container relative overflow-hidden" style={{ height: '290px' }}>
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />
                    
                    <span 
                      className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wider text-accent uppercase shadow-xs border border-pink-100"
                    >
                      {product.category}
                    </span>

                    {product.badge && (
                      <span 
                        className="absolute top-3 right-3 bg-accent text-white px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold tracking-wider uppercase shadow-sm"
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Body & Description */}
                  <div style={{ padding: '1.25rem' }}>
                    <div className="flex justify-between items-start mb-xs">
                      <h3 className="text-h3 font-serif text-main" style={{ fontSize: '1.15rem', lineHeight: '1.25' }}>
                        {product.name}
                      </h3>
                      <span className="sans font-bold text-accent shrink-0 ml-2" style={{ fontSize: '1.15rem' }}>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-body-sm text-soft leading-relaxed mb-md" style={{ opacity: 0.85, fontSize: '0.85rem' }}>
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
                  <button
                    onClick={() => scrollToConcierge(product.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary-pink text-accent hover:bg-accent hover:text-white transition-all duration-300 font-semibold text-[0.85rem] flex items-center justify-center gap-2 cursor-pointer border border-pink-200 shadow-xs"
                  >
                    <ShoppingBag size={16} /> Solicitud Concierge
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductSection;
