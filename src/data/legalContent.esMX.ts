import type { LegalRoutePath, SiteConfig } from '../types/site';
import { formatMxnPrice, formatUsdPrice } from '../lib/checkout';

export interface LegalSectionBlock {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocumentContent {
  path: LegalRoutePath;
  title: string;
  subtitle: string;
  blocks: LegalSectionBlock[];
}

function fieldOrPending(value: string, label: string): string {
  const trimmed = value.trim();
  return trimmed ? trimmed : `[Pendiente de configuración comercial: ${label}]`;
}

export function getLegalDocuments(config: SiteConfig): Record<LegalRoutePath, LegalDocumentContent> {
  const ownerName = fieldOrPending(config.legalName || config.brandName, 'nombre o razón social del responsable');
  const address = fieldOrPending(config.businessAddress, 'domicilio comercial');
  const taxId = fieldOrPending(config.taxId, 'identificación fiscal aplicable');
  const email = fieldOrPending(config.supportEmail, 'correo electrónico de contacto');
  const phone = config.supportPhone.trim()
    ? config.supportPhone.trim()
    : 'No habilitado / sujeto a configuración comercial';
  const mxnFormatted = formatMxnPrice(config.priceMXN);
  const priceSummary = mxnFormatted
    ? `${formatUsdPrice(config.priceUSD)} (${mxnFormatted} MXN)`
    : `${formatUsdPrice(config.priceUSD)} (el importe equivalente final en pesos mexicanos se muestra directamente en el checkout de Cakto antes de confirmar tu pago)`;

  const activeTrackers: string[] = [];
  if (config.metaPixelId.trim()) activeTrackers.push('Meta Pixel (publicidad, únicamente con consentimiento)');
  if (config.googleAnalyticsId.trim()) activeTrackers.push('Google Analytics 4 (analítica, únicamente con consentimiento)');
  if (config.googleAdsId.trim()) activeTrackers.push('Google Ads (medición de campañas, únicamente con consentimiento)');
  if (config.googleTagManagerId.trim()) activeTrackers.push('Google Tag Manager (gestión de etiquetas condicionada al consentimiento)');

  return {
    '/aviso-de-privacidad': {
      path: '/aviso-de-privacidad',
      title: 'Aviso de Privacidad',
      subtitle:
        'Información sobre el tratamiento de datos personales aplicable a personas usuarias ubicadas en los Estados Unidos Mexicanos.',
      blocks: [
        {
          heading: '1. Identidad y domicilio del responsable',
          paragraphs: [
            `Responsable del tratamiento: ${ownerName}.`,
            `Domicilio comercial: ${address}.`,
            `Correo electrónico de contacto para asuntos de privacidad: ${email}.`,
            'La oferta de este producto digital se realiza mediante comercio electrónico dirigido a personas consumidoras en México. La publicación comercial definitiva requiere completar y verificar los datos de identificación y domicilio del responsable antes de su puesta en marcha.',
          ],
        },
        {
          heading: '2. Datos personales que se tratan y datos que no se recaban',
          paragraphs: [
            'Este sitio informativo y comercial no cuenta con formularios de registro, inicio de sesión ni expedientes clínicos. Durante tu navegación únicamente pueden tratarse datos técnicos de conexión, preferencias de cookies y parámetros de atribución de campaña (como identificadores UTM) cuando apliquen.',
            'No solicitamos ni almacenamos en este sitio datos financieros, números de tarjeta bancaria, información clínica, peso corporal, diagnósticos médicos ni datos personales sensibles.',
            'Cuando decides avanzar a la compra, los datos necesarios para procesar el pago y entregar el archivo digital (como nombre, correo electrónico de entrega y método de pago) son recabados y tratados directamente por la plataforma de pagos Cakto dentro de su propio entorno seguro.',
          ],
        },
        {
          heading: '3. Finalidades primarias y secundarias del tratamiento',
          paragraphs: ['En relación con la operación de esta página, las finalidades se dividen de la siguiente manera:'],
          bullets: [
            'Finalidades primarias (necesarias): mostrar correctamente el contenido del sitio, recordar tus preferencias de consentimiento sobre cookies, canalizar de forma segura el enlace hacia el checkout de Cakto y atender solicitudes enviadas a nuestros canales de soporte.',
            'Finalidades secundarias (opcionales y sujetas a tu consentimiento expreso): medir el desempeño de la página mediante analítica web y evaluar la eficacia de campañas publicitarias digitales cuando hayas aceptado las categorías correspondientes en el panel de cookies.',
          ],
        },
        {
          heading: '4. Bases de consentimiento y tecnologías de rastreo',
          paragraphs: [
            'Los mecanismos opcionales de analítica o publicidad permanecen bloqueados de forma predeterminada hasta que otorgues tu autorización expresa a través del banner de cookies o del panel de preferencias.',
            'Puedes aceptar, rechazar o configurar tus preferencias de manera granular en cualquier momento sin que ello impida consultar la información del producto.',
          ],
        },
        {
          heading: '5. Transferencias y procesamiento por terceros',
          paragraphs: [
            'Para procesar la transacción comercial y efectuar la entrega digital del producto, la operación de pago se realiza mediante Cakto bajo sus propias medidas de seguridad, términos y avisos de privacidad.',
            'Asimismo, en caso de habilitar herramientas opcionales de medición o publicidad y contar con tu consentimiento previo, los proveedores correspondientes pueden recibir eventos técnicos de navegación sin incluir datos médicos, de salud ni información bancaria.',
          ],
        },
        {
          heading: '6. Medidas de seguridad y criterios de conservación',
          paragraphs: [
            'Aplicamos medidas técnicas razonables acordes con una página web estática y ligera, incluyendo transmisión cifrada mediante HTTPS y ausencia de almacenamiento local de datos sensibles o bancarios en el navegador.',
            'Tu elección de consentimiento de cookies se conserva localmente en tu navegador bajo una versión identificada para respetar tus preferencias mientras no las modifiques o elimines.',
          ],
        },
        {
          heading: '7. Derechos ARCO, revocación y limitación de uso',
          paragraphs: [
            'De conformidad con la legislación mexicana aplicable en materia de protección de datos personales en posesión de los particulares, puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición (derechos ARCO), así como revocar tu consentimiento o solicitar la limitación del uso y divulgación de tus datos.',
            `Para presentar una solicitud, envía un mensaje al correo ${email} indicando tu nombre, el medio para comunicarte la respuesta, la descripción clara del derecho que deseas ejercer y cualquier elemento que facilite localizar tu interacción o compra.`,
            'Para modificar o revocar el consentimiento de cookies y rastreadores en este sitio, también puedes utilizar directamente el enlace «Preferencias de privacidad» ubicado en el pie de página.',
          ],
        },
        {
          heading: '8. Cambios al aviso y fecha de actualización',
          paragraphs: [
            'Cualquier modificación sustancial a este Aviso de Privacidad se publicará en esta misma ruta indicando la fecha de última actualización.',
            `Última actualización de referencia: ${config.legalUpdatedAt}. Documento modelo sujeto a validación jurídica final del titular antes de su publicación comercial.`,
          ],
        },
      ],
    },
    '/terminos-y-condiciones': {
      path: '/terminos-y-condiciones',
      title: 'Términos y Condiciones de Uso y Compra',
      subtitle:
        'Condiciones comerciales aplicables a la adquisición de la guía digital en formato PDF desde México.',
      blocks: [
        {
          heading: '1. Identificación del proveedor',
          paragraphs: [
            `Titular u oferente: ${ownerName}.`,
            `Domicilio comercial: ${address}.`,
            `Identificación fiscal aplicable: ${taxId}.`,
            `Correo de atención y soporte: ${email}. Teléfono de referencia: ${phone}.`,
          ],
        },
        {
          heading: '2. Objeto de la contratación y descripción del producto',
          paragraphs: [
            `Los presentes Términos y Condiciones regulan la compra de la guía digital «${config.productName}», consistente en un documento electrónico descargable en formato PDF de ${config.productPageCount} páginas con fines exclusivamente educativos e informativos sobre organización alimentaria y hábitos saludables.`,
            'No se trata de un servicio médico, consulta nutricional personalizada ni envío de productos físicos.',
          ],
        },
        {
          heading: '3. Requisitos de compra y verificación previa',
          paragraphs: [
            'La compra está dirigida a personas mayores de 18 años con capacidad legal para contratar. Antes de confirmar tu pago en el checkout, te recomendamos verificar que tu correo electrónico esté escrito correctamente, ya que a través de dicho medio se gestiona el acceso digital.',
          ],
        },
        {
          heading: '4. Precio, moneda, impuestos y formas de pago',
          paragraphs: [
            `El precio comercial publicado para este producto digital es de ${priceSummary} en modalidad de pago único, sin suscripciones ni cargos recurrentes.`,
            'Los impuestos, cargos por conversión cambiaria o comisiones aplicables según el país o medio de pago elegido serán informados de forma clara y previa en la pantalla de pago de Cakto antes de que autorices la operación.',
            'Las formas de pago disponibles son exclusivamente las habilitadas y visibles al momento de iniciar tu compra dentro del checkout de Cakto.',
          ],
        },
        {
          heading: '5. Condiciones de entrega y acceso digital',
          paragraphs: [
            config.deliveryTerms.trim()
              ? config.deliveryTerms.trim()
              : '[Pendiente de configuración comercial: especificar el flujo y plazo exacto de entrega digital confirmado en tu cuenta de Cakto, normalmente mediante envío automático del acceso al correo electrónico tras la acreditación del pago.]',
          ],
        },
        {
          heading: '6. Licencia de uso personal y propiedad intelectual',
          paragraphs: [
            'La compra otorga una licencia personal, no exclusiva e intransferible para descargar y consultar el archivo PDF en tus dispositivos propios o imprimirlo para uso doméstico.',
            'Queda prohibida la reproducción comercial, reventa, distribución pública, publicación en sitios de terceros o compartición masiva no autorizada del contenido, conforme a la legislación aplicable en materia de derechos de autor.',
          ],
        },
        {
          heading: '7. Soporte, cancelaciones y derechos del consumidor',
          paragraphs: [
            `Para asistencia técnica sobre la recepción o descarga del archivo, puedes escribir a ${email}.`,
            'Las solicitudes de cancelación o reembolso se rigen por lo dispuesto en nuestra Política de Cancelaciones y Reembolsos y por las disposiciones obligatorias de protección al consumidor vigentes en México, las cuales no se entienden restringidas por este documento.',
          ],
        },
        {
          heading: '8. Legislación aplicable y solución de controversias',
          paragraphs: [
            'En operaciones celebradas con personas consumidoras residentes en los Estados Unidos Mexicanos, se respetarán los derechos irrenunciables previstos por la Ley Federal de Protección al Consumidor y la normativa aplicable al comercio electrónico.',
            'Ante cualquier inconformidad, te invitamos a contactar primero a nuestro canal de soporte para procurar una solución directa y expedita, sin perjuicio de tu derecho a acudir ante la Procuraduría Federal del Consumidor (PROFECO) o las instancias competentes conforme a derecho.',
          ],
        },
      ],
    },
    '/politica-de-cookies': {
      path: '/politica-de-cookies',
      title: 'Política de Cookies y Tecnologías Similares',
      subtitle:
        'Detalle transparente sobre las cookies y mecanismos de almacenamiento local utilizados en este sitio.',
      blocks: [
        {
          heading: '1. ¿Qué son las cookies y tecnologías similares?',
          paragraphs: [
            'Las cookies y el almacenamiento local del navegador (como localStorage o sessionStorage) son pequeños archivos o registros que permiten recordar elecciones técnicas del visitante, mantener el funcionamiento básico del sitio y, únicamente cuando existe autorización previa, medir métricas agregadas de navegación.',
          ],
        },
        {
          heading: '2. Categorías implementadas en este sitio',
          paragraphs: ['Clasificamos estas tecnologías en cuatro categorías independientes:'],
          bullets: [
            'Cookies y almacenamiento necesarios (siempre activos): indispensables para guardar tu elección de consentimiento de cookies y permitir la navegación fluida entre la página principal y los documentos legales.',
            'Cookies de preferencias (opcionales, desactivadas por defecto): reservadas para recordar ajustes no esenciales de experiencia si llegaran a habilitarse.',
            'Cookies analíticas (opcionales, desactivadas por defecto): permiten conocer de forma agregada cómo interactúan las personas visitantes con la página para mejorar su claridad y rendimiento.',
            'Cookies publicitarias (opcionales, desactivadas por defecto): permiten medir la eficacia de anuncios y campañas digitales sin enviar información médica, de salud ni datos personales identificables.',
          ],
        },
        {
          heading: '3. Servicios de terceros configurados actualmente',
          paragraphs: [
            activeTrackers.length > 0
              ? `Actualmente se encuentran configurados en la aplicación los siguientes identificadores opcionales (todos bloqueados hasta tu autorización): ${activeTrackers.join('; ')}.`
              : 'En la configuración actual no existen identificadores de rastreo publicitario o analítico de terceros activos ni cargados. Ningún script de medición opcional se ejecuta mientras sus identificadores no estén configurados y tú no otorgues consentimiento explícito.',
          ],
        },
        {
          heading: '4. Conservación y administración del consentimiento',
          paragraphs: [
            'Tu registro de consentimiento se guarda en el navegador bajo una versión identificada para no solicitar tu decisión repetidamente en cada carga, salvo que cambiemos la política o tú restablezcas los datos del navegador.',
            'Puedes aceptar todas las categorías, rechazar las opcionales con la misma facilidad o ajustar tus preferencias en cualquier momento desde el enlace «Preferencias de privacidad» en el pie de página.',
          ],
        },
      ],
    },
    '/cancelaciones-y-reembolsos': {
      path: '/cancelaciones-y-reembolsos',
      title: 'Política de Cancelaciones y Reembolsos',
      subtitle:
        'Criterios transparentes para reportar incidencias de entrega digital, cancelaciones y solicitudes de reembolso.',
      blocks: [
        {
          heading: '1. Principio de claridad y derechos del consumidor',
          paragraphs: [
            'Esta política se formula en apego a la transparencia comercial y con pleno respeto a los derechos obligatorios que amparan a las personas consumidoras en México conforme a la Ley Federal de Protección al Consumidor.',
            'No aplicamos cláusulas absolutas que nieguen de forma automática cualquier derecho de reclamación o revisión, ni inventamos plazos de garantía comercial no autorizados.',
          ],
        },
        {
          heading: '2. Condiciones comerciales de cancelación y reembolso',
          paragraphs: [
            config.refundTerms.trim()
              ? config.refundTerms.trim()
              : '[Pendiente de validación comercial y jurídica antes de publicar: define aquí los plazos exactos y supuestos aplicables junto con las reglas operativas vigentes en Cakto para productos digitales en PDF.]',
          ],
        },
        {
          heading: '3. Fallas en la entrega digital o acceso al PDF',
          paragraphs: [
            'Si realizaste tu pago correctamente y no recibiste el correo con el enlace de descarga o acceso al archivo PDF, o si el archivo presenta un error técnico que impida su apertura, tienes derecho a recibir asistencia prioritaria para restablecer el acceso o tramitar la solución que corresponda.',
          ],
        },
        {
          heading: '4. Procedimiento para solicitar soporte o reembolso',
          paragraphs: ['Para revisar cualquier incidencia o solicitud, envía un mensaje con los siguientes datos:'],
          bullets: [
            'Nombre completo utilizado en la compra.',
            'Correo electrónico registrado al momento del pago en Cakto.',
            'Comprobante o número de referencia de la transacción emitido por Cakto.',
            'Descripción breve del motivo de la solicitud o falla técnica detectada.',
          ],
        },
        {
          heading: '5. Canales de atención',
          paragraphs: [
            `Canal de soporte designado: ${email}.`,
            'Las solicitudes relacionadas con cargos procesados directamente por la pasarela Cakto también pueden canalizarse conforme a los comprobantes y mecanismos de atención proporcionados en el recibo de compra de la plataforma.',
          ],
        },
      ],
    },
    '/aviso-legal-y-salud': {
      path: '/aviso-legal-y-salud',
      title: 'Aviso Legal y de Salud',
      subtitle:
        'Alcance educativo e informativo del contenido nutricional y límites de responsabilidad.',
      blocks: [
        {
          heading: '1. Naturaleza educativa del contenido',
          paragraphs: [
            'El contenido de este producto tiene fines educativos e informativos. No sustituye una consulta médica, nutricional ni otro tipo de atención profesional individualizada. Los resultados pueden variar según las circunstancias de cada persona.',
          ],
        },
        {
          heading: '2. Alcances y limitaciones',
          paragraphs: ['Al adquirir o consultar esta guía digital, ten presente que:'],
          bullets: [
            'No constituye diagnóstico médico ni evaluación clínica.',
            'No sustituye tratamientos médicos, farmacológicos ni planes nutricionales terapéuticos.',
            'No prescribe dietas personalizadas ni garantiza pérdida de peso o cambios físicos determinados.',
            'Las necesidades alimentarias, energéticas y de nutrientes cambian según la edad, actividad física, antecedentes y estado de salud de cada persona.',
          ],
        },
        {
          heading: '3. Cuándo consultar a un profesional de la salud',
          paragraphs: [
            'Si estás embarazada, en periodo de lactancia, vives con diabetes, hipertensión, enfermedad renal, alergias o intolerancias alimentarias, tomas medicamentos que modifican la glucosa o metabolismo, tienes antecedentes de trastornos de la conducta alimentaria o presentas cualquier condición médica, debes consultar a un médico o nutriólogo acreditado antes de implementar cambios en tu alimentación.',
            'Asimismo, ante cualquier síntoma o reacción adversa frente a un alimento sugerido en los ejemplos de menú, omítelo de inmediato y busca valoración profesional.',
          ],
        },
      ],
    },
  };
}
