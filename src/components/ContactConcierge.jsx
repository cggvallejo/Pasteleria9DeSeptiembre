import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Calendar, 
  MapPin, 
  MessageCircle, 
  Navigation, 
  CheckCircle, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Heart,
  Users,
  CreditCard,
  Cake,
  FileText,
  ExternalLink
} from 'lucide-react';

const EVENT_TYPES = [
  { id: 'cumple', label: '🎂 Cumpleaños' },
  { id: 'boda', label: '💍 Boda / Aniversario' },
  { id: 'corporativo', label: '🍾 Evento Corporativo' },
  { id: 'mesapostres', label: '🧁 Mesa de Postres' },
  { id: 'antojo', label: '✨ Antojo Boutique' }
];

const GUEST_OPTIONS = [
  '8 - 12 personas',
  '15 - 25 personas',
  '30 - 50 personas',
  '50+ personas (Evento Grande)'
];

const FLAVOR_COLLECTIONS = [
  'Red Velvet Signature (Cacao & Queso Crema de Autor)',
  'Chocolate Belga 70% & Frutos Rojos',
  'Vainilla Orgánica de Papantla & Maracuyá',
  'Colección de Tartas & Macarons de Autor',
  'Diseño Personalizado / A Medida'
];

const PAYMENT_METHODS = [
  { id: 'Transferencia', label: '🏦 Transferencia Bancaria', detail: 'Descuento o cortesía especial' },
  { id: 'Tarjeta', label: '💳 Tarjeta de Crédito / Débito', detail: 'Pago seguro a distancia' },
  { id: 'Efectivo', label: '💵 Efectivo (Contra Entrega)', detail: 'Pago al recibir en Cancún' }
];

const ContactConcierge = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    eventType: '🎂 Cumpleaños',
    guests: '15 - 25 personas',
    flavor: 'Red Velvet Signature (Cacao & Queso Crema de Autor)',
    payment: 'Transferencia',
    address: '',
    locationUrl: '',
    dietary: 'Ninguna',
    details: ''
  });

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getMyLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setFormData((prev) => ({
            ...prev,
            locationUrl: googleMapsUrl,
            address: `Ubicación GPS (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) - Cancún`
          }));
          setLoadingLocation(false);
          setLocationDetected(true);
        },
        () => {
          alert('No se pudo detectar tu ubicación automática. Por favor ingresa tu dirección manualmente.');
          setLoadingLocation(false);
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización GPS.');
      setLoadingLocation(false);
    }
  };

  const openInMaps = () => {
    if (formData.address) {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(formData.address)}`, '_blank');
    }
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const phone = '529981894167';

    const message = 
      `✨ *SOLICITUD DE CONCIERGE - PASTELERÍA 9 DE SEPTIEMBRE* ✨\n\n` +
      `👤 *Cliente:* ${formData.name || 'Sin especificar'}\n` +
      `📞 *Contacto:* ${formData.phone || formData.email || 'No proporcionado'}\n` +
      `🎉 *Celebración:* ${formData.eventType}\n` +
      `📅 *Fecha del Evento:* ${formData.date || 'Por confirmar'}\n` +
      `👥 *Invitados / Porciones:* ${formData.guests}\n` +
      `🍰 *Colección / Sabor:* ${formData.flavor}\n` +
      `💳 *Método de Pago:* ${formData.payment}\n` +
      `📍 *Dirección de Entrega:* ${formData.address || 'Pendiente'}\n` +
      `${formData.locationUrl ? `🔗 *Ubicación GPS:* ${formData.locationUrl}\n` : ''}` +
      `${formData.dietary !== 'Ninguna' ? `🌿 *Restricción Especial:* ${formData.dietary}\n` : ''}` +
      `📝 *Notas & Detalles:* ${formData.details || 'Sin notas adicionales'}\n\n` +
      `_Enviado con elegancia desde la Web Oficial_`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="pedidos" className="section-py bg-soft relative overflow-hidden">
      <div className="container">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-label mb-xs block">Experiencia Concierge</span>
            <h2 className="text-h2 mb-sm">Diseñamos el Pastel de tus Sueños</h2>
            <p className="text-body text-soft">
              Cada creación es concebida como una obra de arte comestible. Completa este breve formulario concierge para recibir atención personalizada y confirmar la disponibilidad para tu fecha especial.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-2 gap-xl items-start">
          
          {/* Left Column: Brand Pillars & Live Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col gap-lg"
          >
            {/* Value Cards */}
            <div className="bg-white p-lg rounded-[20px] shadow-soft border border-[rgba(216,112,147,0.12)]">
              <h3 className="text-h3 mb-md flex items-center gap-sm">
                <Sparkles className="text-accent" size={22} /> Compromiso de Alta Pastelería
              </h3>
              
              <div className="flex flex-col gap-md">
                <div className="flex items-start gap-md">
                  <div className="bg-primary-pink p-3 rounded-full shrink-0">
                    <CheckCircle size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="sans font-semibold text-[0.95rem]">100% Personalizado y Artesanal</h4>
                    <p className="text-body-sm text-soft mt-xs">
                      Ingredientes premium importados, chocolates belgas de origen ético y mantequilla pura.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <div className="bg-primary-pink p-3 rounded-full shrink-0">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="sans font-semibold text-[0.95rem]">Entregas Gourmet en Cancún & Riviera Maya</h4>
                    <p className="text-body-sm text-soft mt-xs">
                      Transporte refrigerado especializado para asegurar la máxima estabilidad física y frescura.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <div className="bg-primary-pink p-3 rounded-full shrink-0">
                    <Clock size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="sans font-semibold text-[0.95rem]">Reserva Anticipada</h4>
                    <p className="text-body-sm text-soft mt-xs">
                      Sugerimos agendar con un mínimo de 48 a 72 horas para garantizar disponibilidad en agenda boutique.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="order-summary-box shadow-soft">
              <div className="flex items-center justify-between mb-sm">
                <span className="text-label text-accent font-bold flex items-center gap-xs">
                  <Sparkles size={14} /> Resumen de Tu Cotización Concierge
                </span>
                <span className="text-[0.7rem] bg-white px-2 py-1 rounded-full text-soft font-medium border border-gray-200">
                  Pre-visualización
                </span>
              </div>

              <div className="flex flex-wrap gap-xs mb-sm">
                <span className="summary-tag">
                  {formData.eventType}
                </span>
                <span className="summary-tag">
                  <Users size={12} /> {formData.guests}
                </span>
                <span className="summary-tag">
                  <Cake size={12} /> {formData.flavor.split('(')[0]}
                </span>
                {formData.date && (
                  <span className="summary-tag">
                    <Calendar size={12} /> {formData.date}
                  </span>
                )}
                <span className="summary-tag">
                  <CreditCard size={12} /> {formData.payment}
                </span>
              </div>

              <p className="text-[0.8rem] text-soft italic">
                Al presionar "Enviar Pedido vía WhatsApp", se abrirá una conversación directa con nuestro Chef Concierge conservando todos tus datos seleccionados.
              </p>
            </div>

          </motion.div>

          {/* Right Column: Redesigned Concierge Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="concierge-card-wrapper"
          >
            <form onSubmit={sendToWhatsApp} className="flex flex-col gap-lg">
              
              {/* Form Title */}
              <div>
                <span className="text-label text-accent mb-xs block">Formulario de Pedido Especial</span>
                <h3 className="text-h3">Confirma los Detalles de tu Pedido</h3>
              </div>

              {/* SECTION 1: Personal Info */}
              <div className="grid grid-2 gap-md">
                <div>
                  <label className="form-group-label">Nombre Completo *</label>
                  <div className="input-wrapper">
                    <User className="input-icon-left" size={18} />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Sofía Mendoza"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-premium"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-group-label">WhatsApp / Teléfono *</label>
                  <div className="input-wrapper">
                    <MessageCircle className="input-icon-left" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Ej. 998 123 4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-premium"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Event Type Pills */}
              <div>
                <label className="form-group-label mb-xs">Tipo de Celebración</label>
                <div className="pill-group">
                  {EVENT_TYPES.map((type) => (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => setFormData((prev) => ({ ...prev, eventType: type.label }))}
                      className={`pill-option ${formData.eventType === type.label ? 'active' : ''}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: Date & Guest Count */}
              <div className="grid grid-2 gap-md">
                <div>
                  <label className="form-group-label">Fecha del Evento *</label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon-left" size={18} />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="input-premium"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-group-label">Porciones / Invitados</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="input-premium input-premium-no-icon"
                  >
                    {GUEST_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SECTION 4: Flavor & Collection */}
              <div>
                <label className="form-group-label mb-xs">Colección o Sabor de Preferencia</label>
                <select
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleInputChange}
                  className="input-premium input-premium-no-icon"
                >
                  {FLAVOR_COLLECTIONS.map((flv) => (
                    <option key={flv} value={flv}>
                      {flv}
                    </option>
                  ))}
                </select>
              </div>

              {/* SECTION 5: Address with GPS Locator */}
              <div>
                <div className="flex justify-between items-center mb-xs">
                  <label className="form-group-label">Dirección de Entrega en Cancún / Riviera *</label>
                  {locationDetected && (
                    <span className="text-[0.72rem] text-accent font-semibold flex items-center gap-xs">
                      <CheckCircle size={12} /> GPS Detectado
                    </span>
                  )}
                </div>
                <div className="input-wrapper">
                  <MapPin className="input-icon-left" size={18} />
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    placeholder="Calle, número, fraccionamiento o residencia..."
                    onChange={handleInputChange}
                    className="input-premium pr-[100px]"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={getMyLocation}
                      title="Obtener mi ubicación GPS actual"
                      className="p-2 rounded-lg bg-white border border-gray-200 text-main hover:text-accent hover:border-pink-300 transition-all cursor-pointer shadow-xs"
                    >
                      <Navigation size={15} className={loadingLocation ? 'animate-spin text-accent' : ''} />
                    </button>
                    {formData.address && (
                      <button
                        type="button"
                        onClick={openInMaps}
                        title="Verificar en Google Maps"
                        className="p-2 rounded-lg bg-white border border-gray-200 text-main hover:text-accent hover:border-pink-300 transition-all cursor-pointer shadow-xs"
                      >
                        <ExternalLink size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 6: Payment Methods */}
              <div>
                <label className="form-group-label mb-xs">Método de Pago Preferido</label>
                <div className="grid grid-3 gap-xs">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setFormData((prev) => ({ ...prev, payment: pm.id }))}
                      className={`pill-option flex-col items-start justify-center p-md rounded-[16px] text-left transition-all ${
                        formData.payment === pm.id ? 'active' : ''
                      }`}
                      style={{ width: '100%', height: '100%', minHeight: '85px' }}
                    >
                      <span className="font-semibold text-[0.85rem] leading-tight block mb-1">{pm.label}</span>
                      <span className="pill-detail-text text-[0.72rem] font-normal leading-normal block">
                        {pm.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 7: Special Details / Textarea */}
              <div>
                <label className="form-group-label mb-xs">Detalles Especiales o Mensaje Dedicado</label>
                <div className="input-wrapper">
                  <FileText className="input-icon-left top-4" size={18} />
                  <textarea
                    name="details"
                    rows="3"
                    placeholder="Cuéntanos si deseas algún letrero de azúcar, colores de paleta específicos o velas especiales..."
                    value={formData.details}
                    onChange={handleInputChange}
                    className="input-premium"
                  ></textarea>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="btn-whatsapp-luxury mt-xs"
              >
                <MessageCircle size={22} />
                <span>Enviar Solicitud vía WhatsApp Directo</span>
              </motion.button>

              <div className="text-center mt-xs">
                <p className="text-[0.75rem] text-soft flex items-center justify-center gap-xs">
                  <ShieldCheck size={14} className="text-accent" /> Respuesta estimada en menos de 15 minutos durante horario boutique.
                </p>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactConcierge;
