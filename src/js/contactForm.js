document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Проверяем, в какой директории находимся
      const currentPath = window.location.pathname;

      // Если находимся в корне (например, index.html)
      if (currentPath.endsWith('/index.html') || currentPath === '/' || currentPath === '/src/') {
        window.location.href = './pages/contactForm.html';
      } 
      // Если находимся в папке pages (например, aboutUs.html)
      else if (currentPath.includes('/pages/')) {
        window.location.href = '../pages/contactForm.html';
      }
    });
  });
});
