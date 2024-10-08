const menuLinks = document.querySelectorAll('header nav ul li a');

menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const offsetTop = targetElement.offsetTop;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth' // O behavior já faz o scroll suave
    });
  });
});


// Seleciona todas as seções a serem animadas
const sectionsToAnimate = document.querySelectorAll('.formacao, .projetos, .quemsoueu');

// Seleciona a .presentation-container separadamente para ativar ao carregar a página
const presentationContainer = document.querySelector('.presentation-container');

// Cria o observador de interseção
const observer = new IntersectionObserver(entries => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('show'); // Adiciona a classe 'show' quando a seção entra em foco
} else {
 entry.target.classList.remove('show'); // Remove a classe 'show' se a seção sair do foco
 }
 });
}, {
 threshold: 0.1 // Define quando a animação será ativada (10% da seção visível)
});

// Flag para controlar o estado de rolagem
let isScrolling = false;

// Função para ativar o observador apenas quando a página estiver rolando
const handleScroll = () => {
if (!isScrolling) {
isScrolling = true;

// Adiciona o observador a cada seção apenas uma vez
 sectionsToAnimate.forEach(section => {
observer.observe(section);
});

// Remove o evento de scroll após a ativação
 window.removeEventListener('scroll', handleScroll);
 }
};

// Adiciona o evento de scroll
window.addEventListener('scroll', handleScroll);

// Ativa o efeito da .presentation-container ao carregar a página
window.addEventListener('load', () => {
presentationContainer.classList.add('show');
});



document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.querySelector('body');
  const menuLinks = mobileMenu.querySelectorAll('a'); // Seleciona todos os links dentro do menu

  // Mostrar o menu
  menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      // Adicionar ou remover a classe menu-open no body
      if (mobileMenu.classList.contains('active')) {
          // body.style.overflow = 'hidden'; // Se necessário, bloqueia o scroll quando o menu está aberto
          body.addEventListener('click', outsideClickListener);
      } else {
          // body.style.overflow = ''; // Reseta a propriedade de overflow ao fechar o menu
          body.removeEventListener('click', outsideClickListener);
      }
  });

  // Fechar o menu ao clicar fora dele
  function outsideClickListener(event) {
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
          mobileMenu.classList.remove('active');
          body.style.overflow = ''; // Reseta o overflow quando o menu fecha
          body.removeEventListener('click', outsideClickListener);
      }
  }

  // Fechar o menu ao clicar em qualquer link dentro do menu
  menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          body.style.overflow = ''; // Reseta o overflow quando o menu fecha
      });
  });
});
