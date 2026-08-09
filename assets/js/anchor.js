// Add target="_blank" for the links to outside of the site
[...document.querySelectorAll('a')]
  .filter(link => link.hostname != window.location.hostname)
  .forEach(link => link.target = '_blank');
