const menuConfig = [
  { icon: 'assets/menu/conectar.png', text: 'Conectar' },
  { icon: 'assets/menu/conhecer.png', text: 'Conhecer' },
  { icon: 'assets/menu/envolver.png', text: 'Envolver' },
  { icon: 'assets/menu/converter.png', text: 'Convencer' },
  { icon: 'assets/menu/encantar.png', text: 'Encantar' },
];

let pendingMenuItem = null;

function setActiveMenuItem(activeItem, preserveDuringNavigation = false) {
  const menuList = document.getElementById('menuList');

  menuList.querySelectorAll('li.active').forEach(item => {
    item.classList.remove('active');
  });
  if (activeItem) activeItem.classList.add('active');
  pendingMenuItem = preserveDuringNavigation ? activeItem : null;
}

function updateActiveMenuItem() {
  const menuList = document.getElementById('menuList');
  const activationLine = window.innerHeight * 0.35;

  if (pendingMenuItem) {
    const pendingLink = pendingMenuItem.querySelector('a');
    const pendingTarget = document.getElementById(pendingLink.hash.slice(1));

    if (pendingTarget && pendingTarget.getBoundingClientRect().top > activationLine) {
      return;
    }
    pendingMenuItem = null;
  }

  let activeItem = null;

  menuList.querySelectorAll('li').forEach(item => {
    const link = item.querySelector('a');
    const target = document.getElementById(link.hash.slice(1));

    if (target && target.getBoundingClientRect().top <= activationLine) {
      activeItem = item;
    }
  });

  setActiveMenuItem(activeItem);
}

function clearPendingMenuItem() {
  pendingMenuItem = null;
}

function createMenu() {
  const menuList = document.querySelector('#sidebar > #menuList');

  menuConfig.forEach(item => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = item.icon;
    img.alt = item.text;
    const link = document.createElement('a');
    link.textContent = item.text;
    link.href = `#${item.text}`

    li.addEventListener('click', () => {
      setActiveMenuItem(li, true);
    });

    li.appendChild(img);
    li.appendChild(link);
    menuList.appendChild(li);
  });
}


createMenu();

const sidebar = document.getElementById('sidebar');
const desktopHoverQuery = window.matchMedia(
  '(hover: hover) and (pointer: fine) and (min-width: 769px) and (min-height: 601px)'
);

function clearSidebarHover() {
  sidebar.classList.remove('hovered');
  sidebar.style.removeProperty('box-shadow');
}

sidebar.addEventListener('mouseover', () => {
  if (desktopHoverQuery.matches) {
    sidebar.classList.add('hovered');
  }
});
sidebar.addEventListener('mouseout', event => {
  if (!desktopHoverQuery.matches || !event.relatedTarget || !event.relatedTarget.closest('#sidebar')) {
    clearSidebarHover();
  }
});
window.addEventListener('resize', () => {
  if (!desktopHoverQuery.matches) clearSidebarHover();
});

function updateSidebarVisibility() {
  if (window.matchMedia('(max-width: 768px), (max-width: 900px) and (max-height: 600px)').matches) {
    return;
  }

  const section5 = document.querySelector('.section-5');
  if (!section5) return;

  const shouldShow = section5.getBoundingClientRect().top <= 0;
  sidebar.style.opacity = shouldShow ? '1' : '0';
  sidebar.style.pointerEvents = shouldShow ? 'auto' : 'none';
}

window.addEventListener('scroll', updateSidebarVisibility, { passive: true });
window.addEventListener('resize', updateSidebarVisibility);
updateSidebarVisibility();


const menuList = document.getElementById('menuList');

window.addEventListener('scroll', updateActiveMenuItem, { passive: true });
window.addEventListener('resize', updateActiveMenuItem);
window.addEventListener('hashchange', updateActiveMenuItem);
window.addEventListener('load', updateActiveMenuItem, { once: true });
window.addEventListener('wheel', clearPendingMenuItem, { passive: true });
window.addEventListener('touchstart', clearPendingMenuItem, { passive: true });
window.addEventListener('pointerdown', clearPendingMenuItem, { passive: true });
window.addEventListener('keydown', event => {
  if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
    clearPendingMenuItem();
  }
});
updateActiveMenuItem();

menuList.addEventListener('mouseenter', () => {
  if (desktopHoverQuery.matches) {
    sidebar.style.boxShadow = '0 0 0 2000px rgba(0,0,0,0.5)';
  }
});

menuList.addEventListener('mouseleave', clearSidebarHover);