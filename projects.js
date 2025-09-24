
(function(){
  // Создаём контейнер один раз
  function getToastContainer(){
    let c = document.querySelector('.toast-container');
    if(!c){
      c = document.createElement('div');
      c.className = 'toast-container';
      c.setAttribute('aria-live', 'polite');   // доступность
      c.setAttribute('aria-atomic', 'true');
      document.body.appendChild(c);
    }
    return c;
  }

  // Публичная функция
  window.showToast = function(message, type = 'info', opts = {}){
    const { duration = 3500, actionText = null, onAction = null } = opts;
    const container = getToastContainer();

    const toast = document.createElement('div');
    toast.className = 'toast ' + (type ? `toast--${type}` : '');
    toast.role = 'status';

    // Контент
    const msg = document.createElement('div');
    msg.className = 'toast__msg';
    msg.textContent = message;

    const close = document.createElement('button');
    close.className = 'toast__close';
    close.type = 'button';
    close.textContent = actionText || 'OK';

    // Действие: если передали actionText + onAction — выполним колбэк, иначе просто закрыть
    close.addEventListener('click', () => {
      if (typeof onAction === 'function') onAction();
      dismissToast(toast);
    });

    toast.appendChild(msg);
    toast.appendChild(close);
    container.appendChild(toast);

    // Автоскрытие
    const timer = setTimeout(() => dismissToast(toast), duration);

    // При наведении — поставить на паузу
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => {
      // если не закрыт — запустим короткий дотаймер
      if (document.body.contains(toast)) {
        setTimeout(() => dismissToast(toast), 1200);
      }
    });

    // Закрытие с анимацией
    function dismissToast(el){
      el.style.animation = 'toast-out .25s ease forwards';
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }

    return toast; // на случай, если захочешь управлять извне
  };
})();
