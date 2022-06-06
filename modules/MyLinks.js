/* eslint-disable linebreak-style */
export default function MyLinks(link) {
  link.addEventListener('click', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      sec.classList.add('hide');
      if (sec.classList.contains('showElement')) {
        sec.classList.remove('showElement');
      }
    });
    const section = document.querySelector(`section.${link.classList[1]}`);
    section.classList.add('showElement');
  });
}