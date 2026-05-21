const password = '65771344';
const storageKey = 'portafolioJuan';
const backgroundCanvas = document.querySelector('#animatedBackground');
const backgroundContext = backgroundCanvas.getContext('2d');
let backgroundLines = [];

if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname);
  window.scrollTo(0, 0);
}

const defaultPortfolio = {
  content: {
    nav: {
      about: 'Sobre mi',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    hero: {
      eyebrow: 'Disponible para crear, aprender y mejorar',
      primaryCta: 'Ver proyectos',
      secondaryCta: 'Contactarme'
    },
    about: {
      eyebrow: 'Sobre mi',
      title: 'Lo que soy y hacia dónde voy',
      introLabel: 'Presentación',
      goalLabel: 'Enfoque',
      workLabel: '¿Qué hago?',
      techLabel: 'Tecnologías',
      storyLabel: 'Mi camino'
    },
    skills: {
      eyebrow: 'Habilidades',
      title: 'Herramientas que uso',
      learningTitle: 'Estoy aprendiendo'
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Trabajos en proceso y terminados',
      progressTab: 'En proceso',
      doneTab: 'Terminados',
      linkLabel: 'Ver proyecto'
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Hablemos de la próxima idea',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      whatsappLabel: 'WhatsApp',
      whatsappText: 'Enviar mensaje'
    },
    stats: {
      projects: 'Proyectos',
      technologies: 'Tecnologías',
      learning: 'Aprendiendo'
    },
    footer: 'Hecho con Node.js, Express, JavaScript vanilla y TailwindCSS.'
  },
  profile: {
    name: 'Juan',
    role: 'Desarrollador en formación',
    avatar: 'JG',
    image: './img/hero-workspace.jpg',
    intro: 'Construyo experiencias digitales con enfoque en diseño responsive, código limpio y soluciones útiles.',
    about: 'Hola, soy Juan David, desarrollador web apasionado por crear páginas modernas, funcionales y visualmente atractivas. Me gusta aprender constantemente y convertir ideas en proyectos reales. ¿Que hago?: -. Desarrollo web frontend y backend -. Diseño de interfaces modernas -. Creación de sistemas y paneles administrativos -. Bases de datos y APIs -. Experiencia con proyectos reales Tecnologias que utilizo: HTML CSS TailwindCSS JavaScript Python Node.js Express.js MongoDB GitHub Blender Me considero una persona creativa, responsable y enfocada en mejorar cada día. Disfruto resolver problemas, aprender nuevas tecnologías y trabajar en proyectos que representen retos reales. Empecé en la programación creando pequeños proyectos personales y con el tiempo fui desarrollando páginas más completas, aprendiendo tanto diseño como lógica de programación. Mi objetivo es seguir creciendo como desarrollador, crear proyectos innovadores y trabajar en plataformas modernas que mezclen diseño, rendimiento y buena experiencia de usuario.'
  },
  skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'TailwindCSS', 'Git'],
  learning: [
    'APIs con Node.js y Express',
    'Animaciones con JavaScript',
    'Diseño responsive',
    'Buenas prácticas de programación'
  ],
  projectsInProgress: [
    {
      title: 'Panel de tareas personal',
      description: 'Aplicación para organizar metas, tareas y avances diarios.',
      tech: 'Node.js, Express, JavaScript',
      link: '#',
      image: './img/project-laptop.jpg'
    },
    {
      title: 'Landing interactiva',
      description: 'Página visual con secciones modernas y botones animados.',
      tech: 'TailwindCSS, JavaScript',
      link: '#',
      image: './img/hero-workspace.jpg'
    }
  ],
  projectsDone: [
    {
      title: 'Calculadora web',
      description: 'Herramienta simple para practicar lógica y eventos.',
      tech: 'HTML, CSS, JavaScript',
      link: '#',
      image: './img/project-laptop.jpg'
    },
    {
      title: 'Sitio personal inicial',
      description: 'Primera versión de mi portafolio personal.',
      tech: 'HTML, CSS',
      link: '#',
      image: './img/hero-workspace.jpg'
    }
  ],
  contact: {
    email: 'juan@email.com',
    phone: '+57 300 000 0000',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    whatsapp: 'https://wa.me/573000000000'
  },
  customContacts: []
};

let portfolio = hydratePortfolio(JSON.parse(localStorage.getItem(storageKey)) || {});
let activeTab = 'progress';
let canEdit = false;
let editMode = false;
let activeEditor = '';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const navAboutLink = $('#navAboutLink');
const navSkillsLink = $('#navSkillsLink');
const navProjectsLink = $('#navProjectsLink');
const navContactLink = $('#navContactLink');
const navAvatar = $('#navAvatar');
const navName = $('#navName');
const heroEyebrow = $('#heroEyebrow');
const heroName = $('#heroName');
const heroRole = $('#heroRole');
const heroIntro = $('#heroIntro');
const primaryCta = $('#primaryCta');
const secondaryCta = $('#secondaryCta');
const heroImage = $('#heroImage');
const heroAvatar = $('#heroAvatar');
const heroCard = $('#heroCard');
const statsList = $('#statsList');
const aboutEyebrow = $('#aboutEyebrow');
const aboutTitle = $('#aboutTitle');
const aboutIntroLabel = $('#aboutIntroLabel');
const aboutIntro = $('#aboutIntro');
const aboutGoalLabel = $('#aboutGoalLabel');
const aboutGoal = $('#aboutGoal');
const aboutWorkLabel = $('#aboutWorkLabel');
const aboutWorkList = $('#aboutWorkList');
const aboutTechLabel = $('#aboutTechLabel');
const aboutTechList = $('#aboutTechList');
const aboutStoryLabel = $('#aboutStoryLabel');
const aboutStory = $('#aboutStory');
const skillsEyebrow = $('#skillsEyebrow');
const skillsTitle = $('#skillsTitle');
const skillsList = $('#skillsList');
const learningTitle = $('#learningTitle');
const learningList = $('#learningList');
const projectsEyebrow = $('#projectsEyebrow');
const projectsTitle = $('#projectsTitle');
const progressTab = $('#progressTab');
const doneTab = $('#doneTab');
const projectsGrid = $('#projectsGrid');
const contactEyebrow = $('#contactEyebrow');
const contactTitle = $('#contactTitle');
const contactCards = $('#contactCards');
const footerText = $('#footerText');
const profileEditor = $('#profileEditor');
const aboutEditor = $('#aboutEditor');
const skillsEditor = $('#skillsEditor');
const learningEditor = $('#learningEditor');
const projectsEditor = $('#projectsEditor');
const contactEditor = $('#contactEditor');
const themeButton = $('#themeButton');
const editButton = $('#editButton');
const editorModal = $('#editorModal');
const closeEditor = $('#closeEditor');
const loginForm = $('#loginForm');
const passwordInput = $('#passwordInput');
const loginMessage = $('#loginMessage');
const saveToast = $('#saveToast');

function savePortfolio() {
  localStorage.setItem(storageKey, JSON.stringify(portfolio));
}

function hydratePortfolio(savedPortfolio) {
  return deepMerge(structuredClone(defaultPortfolio), savedPortfolio);
}

function deepMerge(target, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = deepMerge(target[key] || {}, value);
    } else if (value !== undefined) {
      target[key] = value;
    }
  });

  return target;
}

function renderPortfolio() {
  renderStaticContent();
  navAvatar.textContent = portfolio.profile.avatar;
  navName.textContent = portfolio.profile.name;
  heroName.textContent = portfolio.profile.name;
  heroRole.textContent = portfolio.profile.role;
  heroIntro.textContent = portfolio.profile.intro;
  heroImage.src = safeUrl(portfolio.profile.image || './img/hero-workspace.jpg');
  heroAvatar.textContent = portfolio.profile.avatar;
  renderAbout();

  statsList.innerHTML = getAutomaticStats().map((stat) => `
    <div class="flex items-center justify-between rounded-2xl bg-white/10 p-4 transition hover:scale-105 hover:bg-white/15">
      <span class="font-bold text-slate-300">${stat.label}</span>
      <span class="text-2xl font-black">${stat.value}</span>
    </div>
  `).join('');

  skillsList.innerHTML = portfolio.skills.map((skill) => `
    <span class="rounded-full border border-emerald-500/40 px-4 py-2 font-bold text-emerald-600 transition hover:-translate-y-1 hover:scale-105 hover:bg-emerald-500 hover:text-slate-950 dark:text-emerald-400">${escapeHtml(skill)}</span>
  `).join('');

  learningList.innerHTML = portfolio.learning.map((item) => `
    <p class="rounded-xl bg-slate-100 p-4 font-semibold transition hover:translate-x-2 hover:bg-emerald-500 hover:text-slate-950 dark:bg-slate-800">${escapeHtml(item)}</p>
  `).join('');

  renderProjects();
  renderContact();
  renderInlineEditors();
}

function renderStaticContent() {
  const content = portfolio.content;

  navAboutLink.textContent = content.nav.about;
  navSkillsLink.textContent = content.nav.skills;
  navProjectsLink.textContent = content.nav.projects;
  navContactLink.textContent = content.nav.contact;
  heroEyebrow.textContent = content.hero.eyebrow;
  primaryCta.textContent = content.hero.primaryCta;
  secondaryCta.textContent = content.hero.secondaryCta;
  aboutEyebrow.textContent = content.about.eyebrow;
  aboutTitle.textContent = content.about.title;
  aboutIntroLabel.textContent = content.about.introLabel;
  aboutGoalLabel.textContent = content.about.goalLabel;
  aboutWorkLabel.textContent = content.about.workLabel;
  aboutTechLabel.textContent = content.about.techLabel;
  aboutStoryLabel.textContent = content.about.storyLabel;
  skillsEyebrow.textContent = content.skills.eyebrow;
  skillsTitle.textContent = content.skills.title;
  learningTitle.textContent = content.skills.learningTitle;
  projectsEyebrow.textContent = content.projects.eyebrow;
  projectsTitle.textContent = content.projects.title;
  progressTab.textContent = content.projects.progressTab;
  doneTab.textContent = content.projects.doneTab;
  contactEyebrow.textContent = content.contact.eyebrow;
  contactTitle.textContent = content.contact.title;
  footerText.textContent = content.footer;
}

function getAutomaticStats() {
  const totalProjects = portfolio.projectsInProgress.length + portfolio.projectsDone.length;

  return [
    { label: portfolio.content.stats.projects, value: totalProjects < 10 ? `0${totalProjects}` : String(totalProjects) },
    { label: portfolio.content.stats.technologies, value: String(portfolio.skills.length) },
    { label: portfolio.content.stats.learning, value: String(portfolio.learning.length) }
  ];
}

function renderAbout() {
  const about = portfolio.profile.about;
  const normalizedAbout = about.replace(/\s+/g, ' ').trim();
  const workText = getTextBetween(normalizedAbout, ['¿Que hago?:', '¿Qué hago?:', '¿Que hago?', '¿Qué hago?'], ['Tecnologias que utilizo:', 'Tecnologías que utilizo:']);
  const techText = getTextBetween(normalizedAbout, ['Tecnologias que utilizo:', 'Tecnologías que utilizo:'], ['Me considero']);
  const introText = getTextBefore(normalizedAbout, ['¿Que hago?:', '¿Qué hago?:', '¿Que hago?', '¿Qué hago?']);
  const goalText = getTextFrom(normalizedAbout, ['Me considero']);
  const storyText = getTextFrom(normalizedAbout, ['Disfruto resolver']);
  const shortGoal = goalText.replace(storyText, '').trim();

  aboutIntro.textContent = introText || normalizedAbout;
  aboutGoal.textContent = shortGoal || 'Creativo, responsable y enfocado en mejorar cada día.';
  aboutStory.textContent = storyText || 'Disfruto resolver problemas, aprender nuevas tecnologías y trabajar en proyectos que representen retos reales.';

  aboutWorkList.innerHTML = splitList(workText).map((item) => `
    <p class="rounded-2xl bg-white p-3 font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">${escapeHtml(item)}</p>
  `).join('');

  aboutTechList.innerHTML = splitTechnologies(techText).map((item) => `
    <span class="rounded-full border border-emerald-500/40 px-4 py-2 font-bold text-emerald-600 transition hover:-translate-y-1 hover:bg-emerald-500 hover:text-slate-950 dark:text-emerald-400">${escapeHtml(item)}</span>
  `).join('');
}

function getTextBefore(text, markers) {
  const position = findFirstMarker(text, markers);
  return position === -1 ? text : text.slice(0, position).trim();
}

function getTextFrom(text, markers) {
  const position = findFirstMarker(text, markers);
  return position === -1 ? '' : text.slice(position).trim();
}

function getTextBetween(text, startMarkers, endMarkers) {
  const start = findFirstMarker(text, startMarkers);

  if (start === -1) {
    return '';
  }

  const startMarker = startMarkers.find((marker) => text.includes(marker)) || '';
  const contentStart = start + startMarker.length;
  const rest = text.slice(contentStart);
  const end = findFirstMarker(rest, endMarkers);

  return end === -1 ? rest.trim() : rest.slice(0, end).trim();
}

function findFirstMarker(text, markers) {
  const positions = markers.map((marker) => text.indexOf(marker)).filter((position) => position !== -1);
  return positions.length ? Math.min(...positions) : -1;
}

function splitList(text) {
  const items = text.split('-.').map((item) => item.replace(/^[-:.\s]+/, '').trim()).filter(Boolean);
  return items.length ? items : ['Desarrollo web frontend y backend', 'Diseño de interfaces modernas', 'Creación de sistemas y paneles administrativos'];
}

function splitTechnologies(text) {
  const items = text.replace(/^[:.\s]+/, '').trim().split(/\s+/).filter(Boolean);
  return items.length ? items : portfolio.skills;
}

function renderProjects() {
  const projects = activeTab === 'progress' ? portfolio.projectsInProgress : portfolio.projectsDone;

  projectsGrid.innerHTML = projects.map((project, index) => `
    <article class="group animate-fadeUp overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-white/10 dark:bg-slate-950">
      <div class="relative h-56 overflow-hidden bg-slate-900">
        <img class="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105" src="${safeUrl(project.image || './img/project-laptop.jpg')}" alt="${escapeHtml(project.title)}" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
        <p class="absolute bottom-4 left-4 rounded-full border border-emerald-400/30 bg-slate-950/70 px-3 py-1 text-sm font-bold text-emerald-300 backdrop-blur">${escapeHtml(project.tech)}</p>
      </div>
      <div class="p-6">
        <h3 class="text-2xl font-black">${escapeHtml(project.title)}</h3>
        <p class="mt-3 leading-7 text-slate-600 dark:text-slate-400">${escapeHtml(project.description)}</p>
        <a class="mt-5 inline-block font-bold text-emerald-500" href="${safeUrl(project.link)}" target="_blank" rel="noreferrer">${escapeHtml(portfolio.content.projects.linkLabel)}</a>
      </div>
      ${editMode ? `
        <div class="px-6 pb-6 flex flex-wrap gap-2">
          <button class="inlineEditButton" data-editor="project:${activeTab}:${index}">Editar</button>
          <button class="inlineDeleteButton" data-delete-project="${activeTab}:${index}">Eliminar</button>
        </div>
        ${activeEditor === `project:${activeTab}:${index}` ? projectForm('edit', activeTab, index) : ''}
      ` : ''}
    </article>
  `).join('');
}

function renderContact() {
  const contact = portfolio.contact;
  const content = portfolio.content.contact;
  const items = [
    [content.emailLabel, contact.email, `mailto:${contact.email}`],
    [content.phoneLabel, contact.phone, `tel:${contact.phone}`],
    [content.githubLabel, contact.github, contact.github],
    [content.linkedinLabel, contact.linkedin, contact.linkedin],
    [content.whatsappLabel, content.whatsappText, contact.whatsapp]
  ];

  contactCards.innerHTML = items.map(([label, text, link]) => `
    <a class="rounded-2xl border border-slate-300 bg-white p-5 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-slate-800 dark:bg-slate-900" href="${safeUrl(link)}" target="_blank" rel="noreferrer">
      <span class="text-sm font-bold text-emerald-500">${escapeHtml(label)}</span>
      <p class="mt-2 break-words text-lg font-black">${escapeHtml(text)}</p>
    </a>
  `).join('') + portfolio.customContacts.map((item, index) => `
    <article class="rounded-2xl border border-slate-300 bg-white p-5 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-slate-800 dark:bg-slate-900">
      <a href="${safeUrl(item.link)}" target="_blank" rel="noreferrer">
        <span class="text-sm font-bold text-emerald-500">${escapeHtml(item.label)}</span>
        <p class="mt-2 break-words text-lg font-black">${escapeHtml(item.text)}</p>
      </a>
      ${editMode ? `
        <div class="mt-5 flex flex-wrap gap-2">
          <button class="inlineEditButton" data-editor="customContact:${index}">Editar</button>
          <button class="inlineDeleteButton" data-delete-contact="${index}">Eliminar</button>
        </div>
        ${activeEditor === `customContact:${index}` ? customContactForm('edit', index) : ''}
      ` : ''}
    </article>
  `).join('');
}

function renderInlineEditors() {
  clearInlineEditors();
  editButton.textContent = editMode ? 'Cerrar edición' : 'Editar';

  if (!editMode) {
    return;
  }

  profileEditor.innerHTML = `
    <div class="mt-5 flex flex-wrap gap-2">
      <button class="inlineEditButton" data-editor="profile">Editar perfil</button>
      <button class="inlineEditButton" data-editor="siteText">Editar textos de la página</button>
    </div>
    ${activeEditor === 'profile' ? profileForm() : ''}
    ${activeEditor === 'siteText' ? siteTextForm() : ''}
  `;

  aboutEditor.innerHTML = `
    <div class="mt-6 flex flex-wrap gap-2">
      <button class="inlineEditButton" data-editor="about">Editar sobre mi</button>
    </div>
    ${activeEditor === 'about' ? aboutForm() : ''}
  `;

  skillsEditor.innerHTML = `
    <div class="mt-5 flex flex-wrap gap-2">
      <button class="inlineEditButton" data-editor="skills">Editar habilidades</button>
      <button class="inlineEditButton" data-editor="addSkill">Añadir habilidad</button>
    </div>
    ${activeEditor === 'skills' ? listForm('skills', 'Habilidades', portfolio.skills.join('\n')) : ''}
    ${activeEditor === 'addSkill' ? addItemForm('skill', 'Nueva habilidad') : ''}
  `;

  learningEditor.innerHTML = `
    <div class="mt-5 flex flex-wrap gap-2">
      <button class="inlineEditButton" data-editor="learning">Editar aprendizaje</button>
      <button class="inlineEditButton" data-editor="addLearning">Añadir aprendizaje</button>
    </div>
    ${activeEditor === 'learning' ? listForm('learning', 'Estoy aprendiendo', portfolio.learning.join('\n')) : ''}
    ${activeEditor === 'addLearning' ? addItemForm('learningItem', 'Nuevo aprendizaje') : ''}
  `;

  projectsEditor.innerHTML = `
    <div class="mt-5 flex flex-wrap gap-2">
      <button class="inlineEditButton" data-editor="addProject:${activeTab}">Añadir proyecto</button>
    </div>
    ${activeEditor === `addProject:${activeTab}` ? projectForm('add', activeTab) : ''}
  `;

  contactEditor.innerHTML = `
    <div class="mt-5 flex flex-wrap gap-2">
      <button class="inlineEditButton" data-editor="contact">Editar contacto</button>
      <button class="inlineEditButton" data-editor="addContact">Añadir contacto</button>
    </div>
    ${activeEditor === 'contact' ? contactForm() : ''}
    ${activeEditor === 'addContact' ? customContactForm('add') : ''}
  `;
}

function clearInlineEditors() {
  [profileEditor, aboutEditor, skillsEditor, learningEditor, projectsEditor, contactEditor].forEach((editor) => {
    editor.innerHTML = '';
  });
}

function profileForm() {
  return `
    <form class="inlineForm" data-form="profile">
      <div class="grid gap-3 md:grid-cols-3">
        ${field('name', 'Nombre', portfolio.profile.name)}
        ${field('role', 'Rol', portfolio.profile.role)}
        ${field('avatar', 'Avatar', portfolio.profile.avatar, 'text', '2')}
      </div>
      ${field('image', 'Imagen principal', portfolio.profile.image)}
      ${textareaField('intro', 'Introducción', portfolio.profile.intro)}
      ${formActions()}
    </form>
  `;
}

function aboutForm() {
  return `
    <form class="inlineForm" data-form="about">
      ${textareaField('about', 'Sobre mi', portfolio.profile.about, 'min-h-48')}
      ${formActions()}
    </form>
  `;
}

function siteTextForm() {
  const content = portfolio.content;

  return `
    <form class="inlineForm" data-form="siteText">
      <div class="grid gap-3 md:grid-cols-2">
        ${field('navAbout', 'Nav: sobre mi', content.nav.about)}
        ${field('navSkills', 'Nav: habilidades', content.nav.skills)}
        ${field('navProjects', 'Nav: proyectos', content.nav.projects)}
        ${field('navContact', 'Nav: contacto', content.nav.contact)}
        ${field('heroEyebrow', 'Frase superior', content.hero.eyebrow)}
        ${field('primaryCta', 'Botón principal', content.hero.primaryCta)}
        ${field('secondaryCta', 'Botón secundario', content.hero.secondaryCta)}
        ${field('aboutEyebrow', 'Etiqueta sobre mi', content.about.eyebrow)}
        ${field('aboutTitle', 'Título sobre mi', content.about.title)}
        ${field('aboutIntroLabel', 'Label presentación', content.about.introLabel)}
        ${field('aboutGoalLabel', 'Label enfoque', content.about.goalLabel)}
        ${field('aboutWorkLabel', 'Label qué hago', content.about.workLabel)}
        ${field('aboutTechLabel', 'Label tecnologías', content.about.techLabel)}
        ${field('aboutStoryLabel', 'Label mi camino', content.about.storyLabel)}
        ${field('skillsEyebrow', 'Etiqueta habilidades', content.skills.eyebrow)}
        ${field('skillsTitle', 'Título habilidades', content.skills.title)}
        ${field('learningTitle', 'Título aprendizaje', content.skills.learningTitle)}
        ${field('projectsEyebrow', 'Etiqueta proyectos', content.projects.eyebrow)}
        ${field('projectsTitle', 'Título proyectos', content.projects.title)}
        ${field('progressTab', 'Tab en proceso', content.projects.progressTab)}
        ${field('doneTab', 'Tab terminados', content.projects.doneTab)}
        ${field('projectLinkLabel', 'Texto link proyecto', content.projects.linkLabel)}
        ${field('contactEyebrow', 'Etiqueta contacto', content.contact.eyebrow)}
        ${field('contactTitle', 'Título contacto', content.contact.title)}
        ${field('emailLabel', 'Label email', content.contact.emailLabel)}
        ${field('phoneLabel', 'Label teléfono', content.contact.phoneLabel)}
        ${field('githubLabel', 'Label GitHub', content.contact.githubLabel)}
        ${field('linkedinLabel', 'Label LinkedIn', content.contact.linkedinLabel)}
        ${field('whatsappLabel', 'Label WhatsApp', content.contact.whatsappLabel)}
        ${field('whatsappText', 'Texto WhatsApp', content.contact.whatsappText)}
        ${field('statsProjects', 'Estadística proyectos', content.stats.projects)}
        ${field('statsTechnologies', 'Estadística tecnologías', content.stats.technologies)}
        ${field('statsLearning', 'Estadística aprendiendo', content.stats.learning)}
      </div>
      ${textareaField('footer', 'Footer', content.footer)}
      ${formActions()}
    </form>
  `;
}

function listForm(type, label, value) {
  return `
    <form class="inlineForm" data-form="${type}">
      ${textareaField('items', label, value, 'min-h-36')}
      <p class="text-sm font-semibold text-slate-500 dark:text-slate-400">Escribe un item por línea.</p>
      ${formActions()}
    </form>
  `;
}

function addItemForm(type, label) {
  return `
    <form class="inlineForm" data-form="${type}">
      ${field('item', label, '')}
      ${formActions('Añadir')}
    </form>
  `;
}

function projectForm(mode, tab, index = -1) {
  const projects = tab === 'progress' ? portfolio.projectsInProgress : portfolio.projectsDone;
  const project = mode === 'edit' ? projects[index] : { title: '', description: '', tech: '', link: '', image: './img/project-laptop.jpg' };

  return `
    <form class="inlineForm" data-form="project" data-mode="${mode}" data-tab="${tab}" data-index="${index}">
      <div class="grid gap-3 md:grid-cols-2">
        ${field('title', 'Título', project.title)}
        ${field('tech', 'Tecnologías', project.tech)}
      </div>
      ${textareaField('description', 'Descripción', project.description)}
      ${field('link', 'Link', project.link)}
      ${field('image', 'Imagen del proyecto', project.image || './img/project-laptop.jpg')}
      ${formActions(mode === 'edit' ? 'Guardar proyecto' : 'Añadir proyecto')}
    </form>
  `;
}

function contactForm() {
  return `
    <form class="inlineForm" data-form="contact">
      <div class="grid gap-3 md:grid-cols-2">
        ${field('email', 'Email', portfolio.contact.email)}
        ${field('phone', 'Teléfono', portfolio.contact.phone)}
        ${field('github', 'GitHub', portfolio.contact.github)}
        ${field('linkedin', 'LinkedIn', portfolio.contact.linkedin)}
        ${field('whatsapp', 'WhatsApp', portfolio.contact.whatsapp)}
      </div>
      ${formActions()}
    </form>
  `;
}

function customContactForm(mode, index = -1) {
  const contact = mode === 'edit'
    ? portfolio.customContacts[index]
    : { label: '', text: '', link: '' };

  return `
    <form class="inlineForm" data-form="customContact" data-mode="${mode}" data-index="${index}">
      <div class="grid gap-3 md:grid-cols-3">
        ${field('label', 'Nombre del contacto', contact.label)}
        ${field('text', 'Texto visible', contact.text)}
        ${field('link', 'Link', contact.link)}
      </div>
      ${formActions(mode === 'edit' ? 'Guardar contacto' : 'Añadir contacto')}
    </form>
  `;
}

function field(name, label, value, type = 'text', maxlength = '') {
  const limit = maxlength ? ` maxlength="${maxlength}"` : '';
  return `
    <label class="grid gap-2 font-bold">
      ${label}
      <input class="inlineInput" name="${name}" type="${type}" value="${escapeHtml(value)}"${limit} />
    </label>
  `;
}

function textareaField(name, label, value, extraClass = 'min-h-24') {
  return `
    <label class="grid gap-2 font-bold">
      ${label}
      <textarea class="inlineInput ${extraClass}" name="${name}">${escapeHtml(value)}</textarea>
    </label>
  `;
}

function formActions(label = 'Guardar') {
  return `
    <div class="flex flex-wrap gap-2">
      <button class="rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950" type="submit">${label}</button>
      <button class="inlineCancelButton" type="button" data-cancel-editor>Cancelar</button>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeUrl(value) {
  const url = String(value || '').trim();

  if (!url) {
    return '#';
  }

  if (url.startsWith('./') || url.startsWith('/') || url.startsWith('#')) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsedUrl.protocol) ? url : '#';
  } catch {
    return '#';
  }
}

function applyTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}

function createBackgroundLines() {
  backgroundCanvas.width = window.innerWidth;
  backgroundCanvas.height = window.innerHeight;

  const totalLines = Math.floor(window.innerWidth / 26);

  backgroundLines = Array.from({ length: totalLines }, () => ({
    x: Math.random() * backgroundCanvas.width,
    y: Math.random() * backgroundCanvas.height,
    length: 50 + Math.random() * 130,
    speed: 0.25 + Math.random() * 0.9,
    opacity: 0.08 + Math.random() * 0.18
  }));
}

function drawBackground() {
  const isDark = document.documentElement.classList.contains('dark');
  backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

  backgroundLines.forEach((line) => {
    const gradient = backgroundContext.createLinearGradient(line.x, line.y, line.x, line.y + line.length);

    if (isDark) {
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
      gradient.addColorStop(0.5, `rgba(16, 185, 129, ${line.opacity})`);
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
    } else {
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0)');
      gradient.addColorStop(0.5, `rgba(16, 185, 129, ${line.opacity})`);
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    }

    backgroundContext.beginPath();
    backgroundContext.strokeStyle = gradient;
    backgroundContext.lineWidth = 1;
    backgroundContext.moveTo(line.x, line.y);
    backgroundContext.lineTo(line.x, line.y + line.length);
    backgroundContext.stroke();

    line.y += line.speed;

    if (line.y > backgroundCanvas.height + line.length) {
      line.y = -line.length;
      line.x = Math.random() * backgroundCanvas.width;
    }
  });

  requestAnimationFrame(drawBackground);
}

function animateHeroCard() {
  const time = Date.now() / 1000;
  const moveX = Math.sin(time * 1.1) * 34;
  const moveY = Math.cos(time * 1.4) * 10;
  const rotate = Math.sin(time * 0.9) * 2;

  heroCard.style.transform = `translateX(${moveX}px) translateY(${moveY}px) rotate(${rotate}deg)`;

  requestAnimationFrame(animateHeroCard);
}

function startScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });
}

themeButton.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.addEventListener('resize', createBackgroundLines);

editButton.addEventListener('click', () => {
  if (canEdit) {
    editMode = !editMode;
    activeEditor = '';
    renderPortfolio();
    return;
  }

  editorModal.classList.remove('hidden');
  editorModal.classList.add('grid');
  loginForm.classList.remove('hidden');
});

closeEditor.addEventListener('click', () => {
  closeEditModal();
});

function closeEditModal() {
  editorModal.classList.add('hidden');
  editorModal.classList.remove('grid');
}

function showSaveToast() {
  saveToast.classList.remove('hidden', 'opacity-0', '-translate-x-6', 'translate-y-4');
  saveToast.classList.add('opacity-100', 'translate-x-0', 'translate-y-0');

  setTimeout(() => {
    saveToast.classList.add('opacity-0', '-translate-x-6', 'translate-y-4');
  }, 2200);

  setTimeout(() => {
    saveToast.classList.add('hidden');
  }, 2600);
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (passwordInput.value === password) {
    canEdit = true;
    editMode = true;
    activeEditor = '';
    loginMessage.textContent = '';
    closeEditModal();
    renderPortfolio();
  } else {
    loginMessage.textContent = 'Contraseña incorrecta.';
  }
});

document.addEventListener('click', (event) => {
  const editTrigger = event.target.closest('[data-editor]');
  const cancelTrigger = event.target.closest('[data-cancel-editor]');
  const deleteProjectTrigger = event.target.closest('[data-delete-project]');
  const deleteContactTrigger = event.target.closest('[data-delete-contact]');

  if (editTrigger) {
    activeEditor = editTrigger.dataset.editor;
    renderPortfolio();
  }

  if (cancelTrigger) {
    activeEditor = '';
    renderPortfolio();
  }

  if (deleteProjectTrigger) {
    const [tab, indexText] = deleteProjectTrigger.dataset.deleteProject.split(':');
    const projects = tab === 'progress' ? portfolio.projectsInProgress : portfolio.projectsDone;
    projects.splice(Number(indexText), 1);
    activeEditor = '';
    persistAndRender();
  }

  if (deleteContactTrigger) {
    portfolio.customContacts.splice(Number(deleteContactTrigger.dataset.deleteContact), 1);
    activeEditor = '';
    persistAndRender();
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('.inlineForm');

  if (!form) {
    return;
  }

  event.preventDefault();
  saveInlineForm(form);
});

function saveInlineForm(form) {
  const data = new FormData(form);
  const formType = form.dataset.form;

  if (formType === 'profile') {
    portfolio.profile.name = data.get('name').trim() || 'Juan';
    portfolio.profile.role = data.get('role').trim() || 'Desarrollador en formación';
    portfolio.profile.avatar = data.get('avatar').trim() || 'J';
    portfolio.profile.image = data.get('image').trim() || './img/hero-workspace.jpg';
    portfolio.profile.intro = data.get('intro').trim();
  }

  if (formType === 'about') {
    portfolio.profile.about = data.get('about').trim();
  }

  if (formType === 'siteText') {
    saveSiteText(data);
  }

  if (formType === 'skills') {
    portfolio.skills = linesToItems(data.get('items'));
  }

  if (formType === 'skill') {
    addUniqueItem(portfolio.skills, data.get('item'));
  }

  if (formType === 'learning') {
    portfolio.learning = linesToItems(data.get('items'));
  }

  if (formType === 'learningItem') {
    addUniqueItem(portfolio.learning, data.get('item'));
  }

  if (formType === 'project') {
    saveProjectForm(form, data);
  }

  if (formType === 'contact') {
    portfolio.contact.email = data.get('email').trim();
    portfolio.contact.phone = data.get('phone').trim();
    portfolio.contact.github = data.get('github').trim();
    portfolio.contact.linkedin = data.get('linkedin').trim();
    portfolio.contact.whatsapp = data.get('whatsapp').trim();
  }

  if (formType === 'customContact') {
    saveCustomContactForm(form, data);
  }

  activeEditor = '';
  persistAndRender();
}

function saveCustomContactForm(form, data) {
  const contact = {
    label: data.get('label').trim() || 'Contacto',
    text: data.get('text').trim() || 'Ver enlace',
    link: data.get('link').trim() || '#'
  };

  if (form.dataset.mode === 'edit') {
    portfolio.customContacts[Number(form.dataset.index)] = contact;
  } else {
    portfolio.customContacts.push(contact);
  }
}

function saveSiteText(data) {
  portfolio.content.nav.about = data.get('navAbout').trim();
  portfolio.content.nav.skills = data.get('navSkills').trim();
  portfolio.content.nav.projects = data.get('navProjects').trim();
  portfolio.content.nav.contact = data.get('navContact').trim();
  portfolio.content.hero.eyebrow = data.get('heroEyebrow').trim();
  portfolio.content.hero.primaryCta = data.get('primaryCta').trim();
  portfolio.content.hero.secondaryCta = data.get('secondaryCta').trim();
  portfolio.content.about.eyebrow = data.get('aboutEyebrow').trim();
  portfolio.content.about.title = data.get('aboutTitle').trim();
  portfolio.content.about.introLabel = data.get('aboutIntroLabel').trim();
  portfolio.content.about.goalLabel = data.get('aboutGoalLabel').trim();
  portfolio.content.about.workLabel = data.get('aboutWorkLabel').trim();
  portfolio.content.about.techLabel = data.get('aboutTechLabel').trim();
  portfolio.content.about.storyLabel = data.get('aboutStoryLabel').trim();
  portfolio.content.skills.eyebrow = data.get('skillsEyebrow').trim();
  portfolio.content.skills.title = data.get('skillsTitle').trim();
  portfolio.content.skills.learningTitle = data.get('learningTitle').trim();
  portfolio.content.projects.eyebrow = data.get('projectsEyebrow').trim();
  portfolio.content.projects.title = data.get('projectsTitle').trim();
  portfolio.content.projects.progressTab = data.get('progressTab').trim();
  portfolio.content.projects.doneTab = data.get('doneTab').trim();
  portfolio.content.projects.linkLabel = data.get('projectLinkLabel').trim();
  portfolio.content.contact.eyebrow = data.get('contactEyebrow').trim();
  portfolio.content.contact.title = data.get('contactTitle').trim();
  portfolio.content.contact.emailLabel = data.get('emailLabel').trim();
  portfolio.content.contact.phoneLabel = data.get('phoneLabel').trim();
  portfolio.content.contact.githubLabel = data.get('githubLabel').trim();
  portfolio.content.contact.linkedinLabel = data.get('linkedinLabel').trim();
  portfolio.content.contact.whatsappLabel = data.get('whatsappLabel').trim();
  portfolio.content.contact.whatsappText = data.get('whatsappText').trim();
  portfolio.content.stats.projects = data.get('statsProjects').trim();
  portfolio.content.stats.technologies = data.get('statsTechnologies').trim();
  portfolio.content.stats.learning = data.get('statsLearning').trim();
  portfolio.content.footer = data.get('footer').trim();
}

function saveProjectForm(form, data) {
  const project = {
    title: data.get('title').trim() || 'Proyecto',
    description: data.get('description').trim() || 'Descripción del proyecto.',
    tech: data.get('tech').trim() || 'Tecnologías',
    link: data.get('link').trim() || '#',
    image: data.get('image').trim() || './img/project-laptop.jpg'
  };
  const projects = form.dataset.tab === 'progress' ? portfolio.projectsInProgress : portfolio.projectsDone;

  if (form.dataset.mode === 'edit') {
    projects[Number(form.dataset.index)] = project;
  } else {
    projects.push(project);
  }
}

function linesToItems(value) {
  return String(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function addUniqueItem(items, value) {
  const item = String(value).trim();

  if (item && !items.includes(item)) {
    items.push(item);
  }
}

function persistAndRender() {
  savePortfolio();
  renderPortfolio();
  showSaveToast();
}

$$('.tabButton').forEach((button) => {
  button.addEventListener('click', () => {
    activeTab = button.dataset.tab;

    $$('.tabButton').forEach((item) => {
      item.classList.remove('bg-emerald-500', 'text-slate-950');
    });

    button.classList.add('bg-emerald-500', 'text-slate-950');
    activeEditor = '';
    renderPortfolio();
  });
});

applyTheme();
createBackgroundLines();
drawBackground();
animateHeroCard();
renderPortfolio();
startScrollAnimations();
