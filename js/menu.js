const menuConfig = [
  { icon: 'assets/menu/conectar.png', text: 'Conectar' },
  { icon: 'assets/menu/conhecer.png', text: 'Conhecer' },
  { icon: 'assets/menu/envolver.png', text: 'Envolver' },
  { icon: 'assets/menu/converter.png', text: 'Convencer' },
  { icon: 'assets/menu/encantar.png', text: 'Encantar' },
];

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
      img.style.filter = 'brightness(0) invert(1)';
      link.style.filter = 'brightness(0) invert(1)';
    });

    li.appendChild(img);
    li.appendChild(link);
    menuList.appendChild(li);
  });
}


createMenu();

const sidebar = document.getElementById('sidebar');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  sidebar.addEventListener('mouseover', () => {
    sidebar.classList.add('hovered');
  });
  sidebar.addEventListener('mouseout', event => {
    if (!event.relatedTarget || !event.relatedTarget.closest('#sidebar')) {
      sidebar.classList.remove('hovered');
    }
  });
}

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
const elementosParaEstilizar = document.querySelectorAll('#sidebar');

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  menuList.addEventListener('mouseenter', () => {
    elementosParaEstilizar.forEach(elemento => {
      elemento.style.boxShadow = '0 0 0 2000px rgba(0,0,0,0.5)';
    });
  });

  menuList.addEventListener('mouseleave', () => {
    elementosParaEstilizar.forEach(elemento => {
      elemento.style.boxShadow = 'none';
    });
  });
}