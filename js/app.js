

 function updateTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;
    document.querySelector('.clock').textContent = time;
  }
  
  setInterval(updateTime, 1000);

  const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');

    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');

      if (nav.classList.contains('active')) {
        nav.style.display = 'flex';
      } else {
        nav.style.display = 'none';
      }
    });