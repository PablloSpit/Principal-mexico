import type { FAQItem } from '../types/site';

export const LANDING_COPY = {
  header: {
    links: [
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Contenido', href: '#contenido' },
      { label: 'Beneficios', href: '#beneficios' },
      { label: 'Precio', href: '#precio' },
    ],
    ctaLabel: 'Comenzar ahora',
  },
  hero: {
    headline: 'Organiza tu alimentación saludable durante 30 días, sin complicaciones',
    subheadline:
      'La guía digital de 61 páginas pensada para la cocina mexicana que te ayuda a planear comidas prácticas, equilibrar tus platos y construir hábitos sostenibles a tu ritmo.',
    ctaPrimary: 'QUIERO ACCEDER AL PLAN',
    ctaSecondary: 'Conoce más ↓',
    bottomHighlight: 'Edición México · 61 páginas en PDF · Pago único en Cakto',
    heroPhotoAlt:
      'Plato equilibrado mexicano con pollo a la plancha, aguacate, nopales con jitomate, frijoles negros y tortillas de maíz.',
    coverAlt:
      'Portada oficial del Plan de Nutrición y Pérdida de Peso Saludable en 30 Días',
  },
  featuredBar: {
    heading: 'Una guía diseñada para tu vida diaria en México',
    items: [
      'Formato PDF · 61 páginas',
      'Ingredientes de México',
      '30 días paso a paso',
      'Sin contar calorías',
      'Pago único · Cakto',
    ],
  },
  howItWorks: {
    eyebrow: 'Cómo funciona',
    title: 'Tu rutina alimentaria diaria en 3 pasos simples',
    steps: [
      {
        number: '01',
        title: 'Aprende el criterio práctico sin dietas extremas',
        description:
          'Olvídate de calcular calorías o eliminar la tortilla y los frijoles. La guía te muestra cómo armar un plato equilibrado a simple vista, leer sellos frontales en el súper y reconocer señales reales de hambre y saciedad.',
        imageSrc: '/images/ebook/page-3.webp',
        imageSrcSet: '/images/ebook/page-3-600w.webp 600w, /images/ebook/page-3.webp 1200w',
        imageAlt: 'Vista en celular del índice real del programa de 30 días',
      },
      {
        number: '02',
        title: 'Consulta cada día en una sola página',
        description:
          'Del Día 01 al Día 30 cuentas con desayuno, comida, cena y colación opcional orientativos, además de notas para adelantar ingredientes desde la noche previa y tres recetas base multiusos.',
        imageSrc: '/images/ebook/page-23.webp',
        imageSrcSet: '/images/ebook/page-23-600w.webp 600w, /images/ebook/page-23.webp 1200w',
        imageAlt: 'Vista en celular de la página real del Día 01 con menú completo y hábito diario',
      },
      {
        number: '03',
        title: 'Adapta compras, sustituciones y comidas fuera',
        description:
          'Organiza el súper con la lista por categorías, cambia ingredientes al instante con la tabla de sustituciones y aplica criterios realistas cuando comas en fondas o fuera de casa.',
        imageSrc: '/images/ebook/page-53.webp',
        imageSrcSet: '/images/ebook/page-53-600w.webp 600w, /images/ebook/page-53.webp 1200w',
        imageAlt: 'Vista en celular de la lista de compras y tabla práctica de sustituciones',
      },
    ],
  },
  mealsAndContent: {
    eyebrow: 'Contenido del plan',
    title: 'Menús reales con sabor cotidiano de México',
    cards: [
      {
        id: 'card-menus',
        category: 'Desayunos y comidas',
        title: 'Platillos de casa',
        imageSrc: '/images/editorial/huevos-mexicana.webp',
        imageSrcSet:
          '/images/editorial/huevos-mexicana-640w.webp 640w, /images/editorial/huevos-mexicana.webp 1200w',
        imageAlt:
          'Huevos a la mexicana con tortillas de maíz calientes, papaya fresca y café negro sobre mesa natural.',
        attributes: [
          { icon: 'calendar', bold: '30 días', text: 'organizados página por página' },
          { icon: 'utensils', bold: '3 recetas base', text: 'frijoles, pollo y lentejas' },
          { icon: 'leaf', bold: 'Ingredientes locales', text: 'económicos y accesibles' },
        ],
      },
      {
        id: 'card-tools',
        category: 'Organización práctica',
        title: 'Planeación flexible',
        imageSrc: '/images/editorial/tacos-pescado.webp',
        imageSrcSet:
          '/images/editorial/tacos-pescado-640w.webp 640w, /images/editorial/tacos-pescado.webp 1200w',
        imageAlt:
          'Tacos de pescado asado con repollo, aguacate, cilantro y limón sobre plato de cerámica artesanal.',
        attributes: [
          { icon: 'shopping', bold: 'Lista de compras', text: 'ordenada por categorías' },
          { icon: 'refresh', bold: 'Sustituciones', text: 'si falta algún ingrediente' },
          { icon: 'book', bold: 'Guía en fondas', text: 'para comer fuera sin culpa' },
        ],
      },
    ],
    checklistTitle: 'Herramientas incluidas:',
    checklistItems: [
      'Armado visual del plato',
      'Lectura de sellos en México',
      'Frijoles de la olla base',
      'Pollo y lentejas multiusos',
      'Compras inteligentes de 3 días',
      'Conservación segura (4 °C / -18 °C)',
      'Señales de hambre y saciedad',
      'Registro semanal de hábitos',
      'Calendario imprimible de 30 días',
    ],
    bottomLinkLabel: 'Ver acceso y precio completo →',
  },
  outcomesAndGallery: {
    eyebrow: 'Beneficios cotidianos',
    title: 'Cuando ordenas tu semana, comer bien deja de pesar',
    outcomes: [
      {
        title: 'Sin improvisación diaria',
        text: 'Dejas atrás el desgaste de abrir el refrigerador cansado y sin saber qué preparar para la comida o la cena.',
        tag: '— Organización semanal',
      },
      {
        title: 'Presupuesto optimizado',
        text: 'Compras conectadas al menú de la semana para aprovechar tus básicos en México y evitar desperdicios.',
        tag: '— Compras inteligentes',
      },
      {
        title: 'Sin prohibiciones extremas',
        text: 'Conservas alimentos familiares como tortillas de maíz, frijoles, nopales y salsas caseras dentro de un balance práctico.',
        tag: '— Alimentación realista',
      },
      {
        title: 'Autonomía más allá del día 30',
        text: 'Al concluir las cuatro semanas te llevas un método claro para repetir tus combinaciones favoritas de forma sostenible.',
        tag: '— Hábitos a largo plazo',
      },
    ],
    galleryTiles: [
      {
        src: '/images/ebook/page-1.webp',
        srcSet: '/images/ebook/page-1-600w.webp 600w, /images/ebook/page-1.webp 1200w',
        alt: 'Portada oficial del Plan de Nutrición y Pérdida de Peso Saludable en 30 Días',
        isCover: true,
      },
      {
        src: '/images/editorial/hero-meal.webp',
        srcSet: '/images/editorial/hero-meal-640w.webp 640w, /images/editorial/hero-meal.webp 1200w',
        alt: 'Pollo a la plancha con aguacate, nopales, frijoles negros y tortillas de maíz',
        isCover: false,
      },
      {
        src: '/images/editorial/fresh-prep.webp',
        srcSet: '/images/editorial/fresh-prep-640w.webp 640w, /images/editorial/fresh-prep.webp 1200w',
        alt: 'Ingredientes frescos mexicanos sobre tabla de madera y lino natural',
        isCover: false,
      },
      {
        src: '/images/editorial/sopa-lentejas.webp',
        srcSet: '/images/editorial/sopa-lentejas-640w.webp 640w, /images/editorial/sopa-lentejas.webp 1200w',
        alt: 'Sopa casera de lentejas con verduras y ensalada verde con aguacate',
        isCover: false,
      },
      {
        src: '/images/editorial/huevos-mexicana.webp',
        srcSet: '/images/editorial/huevos-mexicana-640w.webp 640w, /images/editorial/huevos-mexicana.webp 1200w',
        alt: 'Huevos a la mexicana con tortillas de maíz y papaya fresca',
        isCover: false,
      },
      {
        src: '/images/editorial/calm-table.webp',
        srcSet: '/images/editorial/calm-table-720w.webp 720w, /images/editorial/calm-table.webp 1400w',
        alt: 'Desayuno mexicano tranquilo con avena, papaya, agua simple y tortillas',
        isCover: false,
      },
    ],
  },
  pricing: {
    eyebrow: 'Acceso digital y transparencia',
    title: 'Empieza tu plan de 30 días sin suscripciones',
    audienceCard: {
      name: '¿Es para ti?',
      headline: 'Guía práctica',
      subtitle: 'Diseñada para personas adultas que buscan orden y hábitos reales.',
      items: [
        { included: true, text: 'Claridad semanal sin improvisar comidas' },
        { included: true, text: 'Ingredientes familiares y accesibles en México' },
        { included: true, text: 'Sin conteo de calorías ni dietas extremas' },
        { included: false, text: 'No sustituye consulta médica ni dieta clínica' },
      ],
      ctaLabel: 'Ver preguntas frecuentes',
    },
    offerCard: {
      name: 'Plan 30 Días · E-book PDF',
      subtitle: 'Pago único · Sin renovaciones automáticas',
      items: [
        'Guía digital PDF (61 páginas, edición México)',
        '30 menús diarios + 3 recetas base multiusos',
        'Lista de compras, sustituciones y calendario',
        'Entrega digital segura a través de Cakto',
      ],
      ctaLabel: 'QUIERO ACCEDER A MI PLAN',
    },
    asideNote:
      'El importe total en pesos mexicanos (MXN) se muestra en el checkout de Cakto antes de confirmar tu compra. Contenido educativo; si vives con alguna condición médica o embarazo, consulta a un profesional de la salud.',
    features: [
      {
        icon: 'shield',
        title: 'Pago único seguro',
        text: 'Adquieres la guía completa una sola vez en Cakto, sin mensualidades ni cargos ocultos.',
      },
      {
        icon: 'leaf',
        title: 'Cocina mexicana real',
        text: 'Menús orientativos con tortilla de maíz, frijoles, nopales, aguacate, huevo, pollo y fruta.',
      },
      {
        icon: 'sliders',
        title: 'Cero rigidez calórica',
        text: 'Porciones visuales y tabla de sustituciones para adaptar todo a tu presupuesto.',
      },
      {
        icon: 'smartphone',
        title: 'Siempre disponible',
        text: 'Consulta el PDF desde tu celular en el súper, en tableta o imprime el calendario.',
      },
    ],
  },
  finalCta: {
    title: 'Comienza hoy tu plan de 30 días',
    text: 'Organiza tus comidas, simplifica tus compras y construye hábitos alimentarios sostenibles con una guía práctica pensada para México. Un solo pago y acceso digital en formato PDF.',
    ctaLabel: 'COMENZAR MI PLAN DE 30 DÍAS',
    note: 'Pago único de US$ 29.90 · Gestión segura en Cakto',
    photoAlt:
      'Mesa mexicana tranquila con papaya fresca, tazón de avena con nueces y jarra de agua.',
  },
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-include',
    question: '¿Qué incluye el plan de 30 días?',
    answer:
      'Incluye la guía digital completa en PDF (61 páginas) con fundamentos de plato equilibrado, lectura de sellos frontales en México, tres recetas base (frijoles de la olla, pollo con verduras y lentejas con verduras), un recorrido de 30 días página por página, lista de compras por categorías, tabla de sustituciones, guía para comer fuera de casa y calendario imprimible.',
  },
  {
    id: 'faq-format',
    question: '¿Cómo recibo el material y en qué dispositivos puedo verlo?',
    answer:
      'Es un producto 100 % digital en formato PDF (no es libro impreso). Una vez confirmado tu pago en Cakto, recibes el acceso en el correo electrónico que registres para abrirlo en celular, tableta o computadora, o imprimir las hojas de apoyo.',
  },
  {
    id: 'faq-ingredients',
    question: '¿Se requieren ingredientes costosos o difíciles de encontrar en México?',
    answer:
      'No. Todos los ejemplos y recetas base priorizan alimentos accesibles en mercados, tianguis y supermercados de México, como tortilla de maíz, frijoles, lentejas, huevo, pollo, aguacate, nopales, jitomate, calabacitas, avena y fruta de temporada.',
  },
  {
    id: 'faq-payment',
    question: '¿El pago es único y cómo se muestra el precio en pesos mexicanos (MXN)?',
    answer:
      'Sí, es un pago único de US$ 29.90 sin mensualidades ni suscripciones. Al ingresar al checkout de Cakto verás el importe total actualizado en pesos mexicanos (MXN) y los métodos de pago disponibles antes de confirmar tu compra.',
  },
  {
    id: 'faq-weight-loss',
    question: '¿Este plan sustituye consulta médica o garantiza pérdida de peso?',
    answer:
      'No. El contenido es exclusivamente educativo e informativo y no garantiza resultados específicos ni sustituye la valoración de un médico o nutriólogo. Los resultados varían según el contexto y hábitos de cada persona.',
  },
  {
    id: 'faq-support',
    question: '¿Dónde consulto soporte y políticas de cancelación o reembolso?',
    answer:
      'Al pie de esta página encuentras los enlaces directos a nuestro Aviso de privacidad, Términos y condiciones, Política de cookies, Aviso legal y de salud y Cancelaciones y reembolsos, atendidos conforme a la legislación aplicable y las reglas de Cakto.',
  },
];
