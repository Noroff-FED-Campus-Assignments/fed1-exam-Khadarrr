window.addEventListener('load', function() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
  
    function showLoaderWrapper() {
      loaderWrapper.style.display = 'flex';
    }
  
    function hideLoaderWrapper() {
      loaderWrapper.style.display = 'none';
    }
    function performActions() {

      showLoaderWrapper();
  
     
      setTimeout(function() {
        hideLoaderWrapper();
      }, 500);
    }

    performActions();
  });
  