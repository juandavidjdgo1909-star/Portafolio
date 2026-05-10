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
  profile: {
    name: 'Juan',
    role: 'Desarrollador en formación',
    avatar: 'JG',
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
      link: '#'
    },
    {
      title: 'Landing interactiva',
      description: 'Página visual con secciones modernas y botones animados.',
      tech: 'TailwindCSS, JavaScript',
      link: '#'
    }
  ],
  projectsDone: [
    {
      title: 'Calculadora web',
      description: 'Herramienta simple para practicar lógica y eventos.',
      tech: 'HTML, CSS, JavaScript',
      link: '#'
    },
    {
      title: 'Sitio personal inicial',
      description: 'Primera versión de mi portafolio personal.',
      tech: 'HTML, CSS',
      link: '#'
    }
  ],
  contact: {
    email: 'juan@email.com',
    phone: '+57 300 000 0000',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    whatsapp: 'https://wa.me/573000000000'
  }
};

let portfolio = JSON.parse(localStorage.getItem(storageKey)) || defaultPortfolio;
let activeTab = 'progress';
let canEdit = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const navAvatar = $('#navAvatar');
const navName = $('#navName');
const heroName = $('#heroName');
const heroRole = $('#heroRole');
const heroIntro = $('#heroIntro');
const heroAvatar = $('#heroAvatar');
const heroCard = $('#heroCard');
const statsList = $('#statsList');
const aboutIntro = $('#aboutIntro');
const aboutGoal = $('#aboutGoal');
const aboutWorkList = $('#aboutWorkList');
const aboutTechList = $('#aboutTechList');
const aboutStory = $('#aboutStory');
const skillsList = $('#skillsList');
const learningList = $('#learningList');
const projectsGrid = $('#projectsGrid');
const contactCards = $('#contactCards');
const themeButton = $('#themeButton');
const editButton = $('#editButton');
const editorModal = $('#editorModal');
const closeEditor = $('#closeEditor');
const loginForm = $('#loginForm');
const editForm = $('#editForm');
const passwordInput = $('#passwordInput');
const loginMessage = $('#loginMessage');
const saveMessage = $('#saveMessage');
const saveToast = $('#saveToast');

function savePortfolio() {
  localStorage.setItem(storageKey, JSON.stringify(portfolio));
}

function renderPortfolio() {
  navAvatar.textContent = portfolio.profile.avatar;
  navName.textContent = portfolio.profile.name;
  heroName.textContent = portfolio.profile.name;
  heroRole.textContent = portfolio.profile.role;
  heroIntro.textContent = portfolio.profile.intro;
  heroAvatar.textContent = portfolio.profile.avatar;
  renderAbout();

  statsList.innerHTML = getAutomaticStats().map((stat) => `
    <div class="flex items-center justify-between rounded-2xl bg-white/10 p-4 transition hover:scale-105 hover:bg-white/15">
      <span class="font-bold text-slate-300">${stat.label}</span>
      <span class="text-2xl font-black">${stat.value}</span>
    </div>
  `).join('');

  skillsList.innerHTML = portfolio.skills.map((skill) => `
    <span class="rounded-full border border-emerald-500/40 px-4 py-2 font-bold text-emerald-600 transition hover:-translate-y-1 hover:scale-105 hover:bg-emerald-500 hover:text-slate-950 dark:text-emerald-400">${skill}</span>
  `).join('');

  learningList.innerHTML = portfolio.learning.map((item) => `
    <p class="rounded-xl bg-slate-100 p-4 font-semibold transition hover:translate-x-2 hover:bg-emerald-500 hover:text-slate-950 dark:bg-slate-800">${item}</p>
  `).join('');

  renderProjects();
  renderContact();
}

function getAutomaticStats() {
  const totalProjects = portfolio.projectsInProgress.length + portfolio.projectsDone.length;

  return [
    { label: 'Proyectos', value: totalProjects < 10 ? `0${totalProjects}` : String(totalProjects) },
    { label: 'Tecnologías', value: String(portfolio.skills.length) },
    { label: 'Aprendiendo', value: String(portfolio.learning.length) }
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
    <p class="rounded-2xl bg-white p-3 font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">${item}</p>
  `).join('');

  aboutTechList.innerHTML = splitTechnologies(techText).map((item) => `
    <span class="rounded-full border border-emerald-500/40 px-4 py-2 font-bold text-emerald-600 transition hover:-translate-y-1 hover:bg-emerald-500 hover:text-slate-950 dark:text-emerald-400">${item}</span>
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

  projectsGrid.innerHTML = projects.map((project) => `
    <article class="animate-fadeUp rounded-2xl border border-slate-300 bg-slate-100 p-6 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-slate-800 dark:bg-slate-950">
      <p class="text-sm font-bold text-emerald-500">${project.tech}</p>
      <h3 class="mt-3 text-2xl font-black">${project.title}</h3>
      <p class="mt-3 leading-7 text-slate-600 dark:text-slate-400">${project.description}</p>
      <a class="mt-5 inline-block font-bold text-emerald-500" href="${project.link}" target="_blank" rel="noreferrer">Ver proyecto</a>
    </article>
  `).join('');
}

function renderContact() {
  const contact = portfolio.contact;
  const items = [
    ['Email', contact.email, `mailto:${contact.email}`],
    ['Teléfono', contact.phone, `tel:${contact.phone}`],
    ['GitHub', contact.github, contact.github],
    ['LinkedIn', contact.linkedin, contact.linkedin],
    ['WhatsApp', 'Enviar mensaje', contact.whatsapp]
  ];

  contactCards.innerHTML = items.map(([label, text, link]) => `
    <a class="rounded-2xl border border-slate-300 bg-white p-5 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-emerald-500/20 dark:border-slate-800 dark:bg-slate-900" href="${link}" target="_blank" rel="noreferrer">
      <span class="text-sm font-bold text-emerald-500">${label}</span>
      <p class="mt-2 break-words text-lg font-black">${text}</p>
    </a>
  `).join('');
}

function fillForm() {
  editForm.name.value = portfolio.profile.name;
  editForm.role.value = portfolio.profile.role;
  editForm.avatar.value = portfolio.profile.avatar;
  editForm.intro.value = portfolio.profile.intro;
  editForm.about.value = portfolio.profile.about;
  editForm.skills.value = portfolio.skills.join(', ');
  editForm.learning.value = portfolio.learning.join('\n');
  editForm.projectsInProgress.value = projectsToText(portfolio.projectsInProgress);
  editForm.projectsDone.value = projectsToText(portfolio.projectsDone);
  editForm.doneLinks.value = portfolio.projectsDone.map((project) => project.link).join('\n');
  editForm.email.value = portfolio.contact.email;
  editForm.phone.value = portfolio.contact.phone;
  editForm.github.value = portfolio.contact.github;
  editForm.linkedin.value = portfolio.contact.linkedin;
  editForm.whatsapp.value = portfolio.contact.whatsapp;
}

function projectsToText(projects) {
  return projects.map((project) => `${project.title} | ${project.description} | ${project.tech}`).join('\n');
}

function textToProjects(text) {
  return text.split('\n').filter(Boolean).map((line) => {
    const parts = line.split('|').map((part) => part.trim());

    return {
      title: parts[0] || 'Proyecto',
      description: parts[1] || 'Descripción del proyecto.',
      tech: parts[2] || 'Tecnologías',
      link: parts[3] || '#'
    };
  });
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
  editorModal.classList.remove('hidden');
  editorModal.classList.add('grid');

  if (canEdit) {
    loginForm.classList.add('hidden');
    editForm.classList.remove('hidden');
    fillForm();
  } else {
    loginForm.classList.remove('hidden');
    editForm.classList.add('hidden');
  }
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
    loginForm.classList.add('hidden');
    editForm.classList.remove('hidden');
    loginMessage.textContent = '';
    fillForm();
  } else {
    loginMessage.textContent = 'Contraseña incorrecta.';
  }
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  portfolio.profile.name = editForm.name.value;
  portfolio.profile.role = editForm.role.value;
  portfolio.profile.avatar = editForm.avatar.value || 'J';
  portfolio.profile.intro = editForm.intro.value;
  portfolio.profile.about = editForm.about.value;
  portfolio.skills = editForm.skills.value.split(',').map((skill) => skill.trim()).filter(Boolean);
  portfolio.learning = editForm.learning.value.split('\n').map((item) => item.trim()).filter(Boolean);
  portfolio.projectsInProgress = textToProjects(editForm.projectsInProgress.value);
  portfolio.projectsDone = textToProjects(editForm.projectsDone.value);
  const doneLinks = editForm.doneLinks.value.split('\n').map((link) => link.trim());
  portfolio.projectsDone = portfolio.projectsDone.map((project, index) => ({
    ...project,
    link: doneLinks[index] || '#'
  }));
  portfolio.contact.email = editForm.email.value;
  portfolio.contact.phone = editForm.phone.value;
  portfolio.contact.github = editForm.github.value;
  portfolio.contact.linkedin = editForm.linkedin.value;
  portfolio.contact.whatsapp = editForm.whatsapp.value;

  savePortfolio();
  renderPortfolio();
  saveMessage.textContent = '';
  closeEditModal();
  showSaveToast();
});

$$('.tabButton').forEach((button) => {
  button.addEventListener('click', () => {
    activeTab = button.dataset.tab;

    $$('.tabButton').forEach((item) => {
      item.classList.remove('bg-emerald-500', 'text-slate-950');
    });

    button.classList.add('bg-emerald-500', 'text-slate-950');
    renderProjects();
  });
});

document.querySelectorAll('.inputEdit').forEach((input) => {
  input.className += ' rounded-xl border border-slate-300 bg-slate-100 p-3 outline-none dark:border-slate-700 dark:bg-slate-800';
});

applyTheme();
createBackgroundLines();
drawBackground();
animateHeroCard();
renderPortfolio();
startScrollAnimations();
