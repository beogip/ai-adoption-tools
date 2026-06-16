import type { Dict } from "./en";

export const es: Dict = {
  htmlLang: "es",
  footer: {
    before: "AI Adoption Tools · Hecho por Juan Gipponi · ¿Preguntas? ",
    linkText: "Escribime por LinkedIn",
    after: "",
    privacy: "Lo que escribís se queda en tu navegador — solo métricas anónimas y sin cookies.",
    legalLinkText: "Términos y privacidad",
    siblingText: "Del mismo autor:",
  },
  common: {
    backToTools: "Todas las tools",
    seeExamples: "Ver ejemplos",
    printPdf: "Imprimir / Guardar PDF",
    clearAll: "Borrar todo",
    langSwitchLabel: "View in English",
  },
  home: {
    pageTitle: "AI Adoption Tools · Tools gratuitas para adoptar IA con criterio",
    pageDesc: "Tools gratuitas para adoptar IA con criterio: armá prompts que funcionan y decidí qué conviene automatizar.",
    kicker: "Tools gratuitas",
    title: "AI Adoption Tools",
    lead: "Empezar a trabajar con AI no es automatizar todo. Es saber qué conviene delegarle y cómo pedírselo bien. Estas dos herramientas gratis te ayudan con las dos cosas, en ese orden.",
    craftTag: "Prompting",
    craftTitle: "CRAFT Builder",
    craftDesc:
      "Armá un prompt efectivo paso a paso (Contexto, Rol, Acción, Formato, Tono). Lo copiás y lo probás en tu IA.",
    processTag: "Automatización",
    processTitle: "Evaluador de procesos",
    processDesc:
      "Puntuá un proceso con 5 preguntas y descubrí si conviene automatizarlo, colaborar con IA o mantenerlo humano.",
    howTitle: "Cómo usarlas",
    howBody:
      "Cada tool guarda tu trabajo en tu navegador (tu trabajo no se envía a ningún servidor). Podés imprimir o guardar en PDF cuando termines.",
  },
  craft: {
    pageTitle: "CRAFT Builder · Armá prompts de IA efectivos",
    pageDesc:
      "Armá prompts efectivos paso a paso con el framework CRAFT: Contexto, Rol, Acción, Formato, Tono. Gratis y sin registro.",
    kicker: "Prompting",
    heroTitle: "CRAFT Builder",
    heroText: "Construí tu prompt con el framework CRAFT: Contexto, Rol, Acción, Formato, Tono.",
    lead: "Completá los campos de abajo. A medida que escribís, el prompt se arma solo y omite lo que dejes vacío. Cuando lo tengas, copialo y probalo en tu IA.",
    stepFields: "Los 5 campos CRAFT",
    fieldsGuide:
      "No todos son obligatorios: para tareas simples alcanza con Acción + Formato. Para tareas complejas, usá los 5.",
    fields: {
      contexto: {
        label: "C: Contexto",
        guide:
          "¿Qué información de fondo necesita la IA para entender tu pedido? Incluí: quién sos, para qué es esto, qué datos relevantes tiene que saber.",
        placeholder: "Escribí acá el contexto",
        examples: [
          "\"Soy product manager en una empresa de SaaS B2B con 500 clientes.\"",
          "\"Estoy preparando una presentación para el board de directores.\"",
          "\"Tenemos un equipo de 15 personas en 3 zonas horarias.\"",
        ],
      },
      rol: {
        label: "R: Rol",
        guide: "¿Quién debería ser la IA para esta tarea? Elegí un rol realista basado en personas reales (no \"gurú supremo\").",
        placeholder: "Escribí acá el rol",
        examples: [
          "Analista de datos senior",
          "Editor profesional de contenido",
          "Consultor de estrategia con 10 años de experiencia",
          "Profesor universitario explicando a alumnos de primer año",
          "Abogado corporativo revisando un contrato",
          "Project manager organizando tareas",
        ],
      },
      accion: {
        label: "A: Acción",
        guide: "¿Qué tarea específica debe realizar? Usá un verbo de acción. Sé lo más específico posible sobre qué querés que haga.",
        placeholder: "Escribí acá la acción",
        examples: [
          "Verbos de acción útiles: resumí, analizá, clasificá, extraé, generá, redactá, compará, evaluá, listá, traducí, reformulá, priorizá, identificá.",
        ],
      },
      formato: {
        label: "F: Formato",
        guide: "¿Cómo debería lucir el output?",
        placeholder: "Escribí acá el formato deseado",
        examples: [
          "Lista con bullets",
          "Tabla con columnas específicas",
          "Párrafo de X palabras",
          "Email listo para enviar",
          "JSON / datos estructurados",
          "Resumen ejecutivo de 3 líneas",
          "Presentación con N slides (título + bullets)",
          "Comparativa pro / contra",
        ],
      },
      tono: {
        label: "T: Tono",
        guide: "¿Qué voz debería usar la respuesta?",
        placeholder: "Escribí acá el tono",
        examples: [
          "Formal / profesional",
          "Casual / cercano",
          "Técnico / preciso",
          "Amigable / accesible",
          "Persuasivo / de ventas",
          "Neutral / objetivo",
          "Didáctico / explicativo",
        ],
      },
    },
    promptLabels: {
      contexto: "CONTEXTO",
      rol: "ROL",
      accion: "ACCIÓN",
      formato: "FORMATO",
      tono: "TONO",
    },
    stepPrompt: "Prompt armado (automático)",
    promptGuide:
      "Se arma solo con lo que escribiste arriba. Los campos vacíos se omiten. Copialo y probalo con tu IA.",
    promptEmpty: "Tu prompt va a aparecer acá a medida que completes los campos.",
    copyLabel: "Copiar prompt",
    copied: "Copiado",
    clearConfirm: "¿Borrar todo lo que cargaste en el template CRAFT?",
    disclaimer:
      "Herramienta educativa. Arma un prompt pero no ejecuta ninguna IA ni revisa su salida — revisá siempre lo que la IA devuelve antes de confiar en eso. Se ofrece “tal cual”, sin garantías.",
  },
  process: {
    pageTitle: "Evaluador de procesos · ¿Conviene automatizarlo con IA?",
    pageDesc:
      "Puntuá un proceso con 5 criterios y 3 banderas rojas para decidir: automatizar con IA, colaborar o mantener humano. Gratis y sin registro.",
    kicker: "Automatización",
    heroTitle: "Evaluador de procesos",
    heroText: "Cuándo automatizar un proceso con IA, y cuándo no. Puntuá 5 preguntas y revisá las banderas rojas.",
    lead: "No todas las tareas son buenos candidatos para IA. Puntuá un proceso del 1 al 5 en cada criterio: el total te ubica en una zona, y las tres banderas rojas te avisan cuándo frenar sin importar el puntaje.",
    stepProcess: "El proceso",
    metaProceso: "Proceso",
    metaProcesoPh: "Ej: clasificar tickets de soporte",
    metaArea: "Área / equipo",
    metaFecha: "Fecha",
    stepQuestions: "Las 5 preguntas",
    questionsGuide: "Puntuá cada criterio del 1 al 5. El total te ubica en una zona.",
    criteria: {
      repetible: {
        label: "1. ¿Es repetible y bien definida?",
        guide:
          "Una tarea que hacés siempre de la misma forma es ideal para IA. Una que cambia completamente cada vez es difícil de delegar.",
        low: "Cada vez es diferente",
        high: "Siempre los mismos pasos",
        ej1: "Score 1: \"Cada negociación con un proveedor es completamente diferente.\"",
        ej5: "Score 5: \"Clasifico 50 emails de soporte por día siempre con las mismas 4 categorías.\"",
      },
      verificable: {
        label: "2. ¿El output es fácilmente verificable?",
        guide:
          "Si podés revisar el resultado en menos de 5 minutos, la IA agrega valor. Si verificar toma tanto como hacerlo vos, no ahorra nada.",
        low: "Difícil de verificar",
        high: "Verificable en <5 min",
        ej1: "Score 1: \"Me genera un análisis legal y necesitaría un abogado para verificarlo.\"",
        ej5: "Score 5: \"Me genera un resumen de una reunión y puedo verificarlo con mis notas en 2 minutos.\"",
      },
      frecuencia: {
        label: "3. ¿Con qué frecuencia ocurre?",
        guide:
          "Tareas diarias dan más retorno que tareas trimestrales. Si algo lo hacés una vez al año, no vale la pena optimizar el prompt.",
        low: "Trimestral o menos",
        high: "Diario",
        ej1: "Score 1: \"Lo hago una vez al año.\"",
        ej5: "Score 5: \"Hago esto todos los días.\"",
      },
      costoError: {
        label: "4. ¿Cuál es el costo del error?",
        guide:
          "Si un error en el output no tiene consecuencias graves, es buen candidato. Si puede tener impacto legal o financiero, requiere supervisión estricta.",
        low: "Consecuencia grave",
        high: "Se corrige fácil",
        ej1: "Score 1 (alto costo): \"El reporte financiero que va a la junta directiva tiene un número mal.\"",
        ej5: "Score 5 (bajo costo): \"El borrador de un email interno tiene errores, lo corrijo y listo.\"",
      },
      complejidad: {
        label: "5. ¿Requiere decisiones adaptativas o solo sigue reglas?",
        guide:
          "Tareas que siguen reglas claras son ideales. Tareas que requieren juicio, empatía o contexto único son difíciles de delegar.",
        low: "Juicio experto",
        high: "Sigue reglas claras",
        ej1: "Score 1: \"Decidir si aprobar o rechazar un reclamo de un cliente importante de 15 años.\"",
        ej5: "Score 5: \"Clasificar facturas por monto y categoría según reglas fijas.\"",
      },
    },
    sinPuntuar: "Sin puntuar",
    stepResult: "Resultado",
    resultPlaceholder:
      "Puntuá las 5 preguntas para ver la clasificación (Automatizar / Colaborar con IA / Mantener humano).",
    totalSuffix: "/ 25",
    zones: {
      automatizar: {
        label: "Automatizar",
        meaning: "Excelente candidato. Podés delegar a IA con supervisión mínima.",
      },
      colaborar: { label: "Colaborar con IA", meaning: "Usar IA como asistente, siempre con revisión humana." },
      humano: { label: "Mantener humano", meaning: "Mejor hacelo vos. La IA no agrega valor o el riesgo es muy alto." },
    },
    capLowCriterion:
      "Tu total da para la zona Automatizar, pero un criterio en 1-2 es una debilidad que el resto no compensa. El resultado baja a Colaborar con IA:",
    capRedFlag:
      "Tu total da para la zona Automatizar, pero con una bandera roja activa la decisión final sigue siendo humana. El resultado baja a Colaborar con IA.",
    stepFlags: "Las tres banderas rojas",
    flagsGuide: "Sin importar el puntaje, si alguna de estas aplica, la respuesta es \"primero pensalo bien\".",
    flags: {
      datosConfidenciales: {
        label: "Datos confidenciales o sensibles",
        detail:
          "Si la tarea involucra información privada de clientes, datos médicos, legales o financieros, antes de mandar nada a una IA verificá las políticas de privacidad y de tratamiento de datos.",
      },
      consecuenciasLegales: {
        label: "Consecuencias legales o financieras",
        detail:
          "Si un error puede terminar en un juicio, una multa o una pérdida económica significativa, la IA puede asistir pero la decisión final siempre es humana.",
      },
      faltaSupervision: {
        label: "Falta de supervisión humana posible",
        detail: "Si nadie va a revisar el output antes de que tenga efecto, no es un buen caso para automatizar todavía.",
      },
    },
    flagActiveTitle: "Bandera roja activa",
    redFlagRule: "La IA automatiza tareas, no responsabilidad. Vos seguís siendo el dueño del resultado.",
    clearConfirm: "¿Borrar la evaluación de este proceso?",
    nextCraftText: "Siguiente paso:",
    nextCraftCta: "armá el prompt con el CRAFT Builder →",
    nextHumanText: "Esta queda en manos humanas. Si querés una segunda opinión sobre dónde encaja la IA en tu equipo,",
    nextHumanCta: "escribime por LinkedIn →",
    disclaimer:
      "Herramienta educativa, no asesoramiento legal, financiero ni profesional. El veredicto es una guía para tu criterio, no una decisión — la responsabilidad de lo que automatices sigue siendo tuya. Se ofrece “tal cual”, sin garantías.",
  },
  legal: {
    pageTitle: "Términos y privacidad · AI Adoption Tools",
    pageDesc:
      "Términos de uso, descargo de responsabilidad y privacidad de AI Adoption Tools — gratis, en el navegador, sin recolección de datos.",
    kicker: "Legal",
    heroTitle: "Términos y privacidad",
    heroText:
      "La versión corta y en criollo: herramientas gratis, ningún dato sale de tu navegador, sin garantías, y tus decisiones siguen siendo tuyas.",
    updated: "Última actualización: 15 de junio de 2026",
    intro:
      "AI Adoption Tools es un conjunto gratuito y open source de herramientas que corren en tu navegador — el CRAFT Builder y el Evaluador de procesos — publicado por Juan Gipponi. Al usar este sitio aceptás los términos de abajo. Si no estás de acuerdo, no uses las herramientas.",
    sections: [
      {
        heading: "Qué son estas herramientas",
        body: [
          "Ambas corren enteramente en tu navegador. Te ayudan a pensar: el CRAFT Builder arma un prompt con lo que escribís, y el Evaluador de procesos puntúa un proceso y sugiere si conviene automatizarlo, colaborar con IA o mantenerlo humano.",
          "No ejecutan ningún modelo de IA, no envían tus datos a ningún lado ni toman decisiones por vos. Cualquier resultado es un punto de partida para tu propio criterio.",
        ],
      },
      {
        heading: "No es asesoramiento profesional",
        body: [
          "El contenido y los resultados tienen fines únicamente educativos e informativos. No son asesoramiento legal, financiero, impositivo, médico ni de ningún otro tipo profesional, y no deben usarse como tal.",
          "El veredicto del Evaluador de procesos (“automatizar”, “colaborar con IA” o “mantener humano”) es una orientación general, no una recomendación adaptada a tu situación. Sos el único responsable de las decisiones que tomes y de revisar cualquier salida de IA antes de confiar en ella.",
        ],
      },
      {
        heading: "Sin garantías",
        body: [
          "Las herramientas se ofrecen “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas o implícitas, incluidas la idoneidad para un fin particular o la ausencia de errores. La lógica de puntuación es una heurística simple y puede dar resultados con los que no coincidas.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        body: [
          "En la máxima medida permitida por la ley, el autor no se responsabiliza por ninguna pérdida o daño derivado del uso o la confianza en estas herramientas o sus resultados. Las usás bajo tu propio riesgo.",
        ],
      },
      {
        heading: "Privacidad",
        body: [
          "Estas herramientas no recopilan datos personales. Todo lo que ingresás se guarda solo en el almacenamiento local de tu navegador para que tu trabajo sobreviva a una recarga; nunca sale de tu dispositivo ni se envía a ningún servidor. Si borrás los datos del navegador, se elimina.",
          "Para entender el uso, el sitio usa Vercel Web Analytics. Es respetuoso de la privacidad y agregado: no usa cookies, no guarda un identificador persistente y no recopila lo que ingresás ni datos personales — solo métricas anónimas como páginas vistas, origen del visitante, país y tipo de dispositivo. No hay cuentas, ni publicidad, ni otro rastreo de terceros.",
          "El sitio está alojado en Vercel, que además puede conservar registros técnicos estándar de las solicitudes (como direcciones IP) por seguridad y operación; consultá la <a href=\"https://vercel.com/legal/privacy-policy\" target=\"_blank\" rel=\"noopener\">política de privacidad de Vercel</a> para más detalle.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
          "El código fuente es open source bajo la Licencia MIT y está disponible en GitHub. La Licencia MIT rige el código; estos términos rigen tu uso del sitio publicado.",
        ],
      },
      {
        heading: "Cambios y contacto",
        body: [
          "Estos términos pueden actualizarse cada tanto; la fecha de “última actualización” de arriba refleja la versión vigente. ¿Preguntas? Escribime por LinkedIn o abrí un issue en GitHub.",
        ],
      },
    ],
    resourcesLabel: "Código y contacto:",
  },
};
