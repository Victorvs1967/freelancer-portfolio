import * as functions from './modules/functions.js';

// Constans
const STICKY_START_SCROLL = 40,
  HEADER_SCROLLED_CLASS = 'header_scrolled',
  MENU_LINK_ACTIVE = 'header-nav__link_active',
  MENU_OPENED_CLASS = 'burger-menu_opened',
  SCROLL_STEP = 0.1;

// Toggle menu active
const toggleMenu = item => {
  const logo = document.querySelector('.header-nav__logo'),
    // arrows = document.querySelectorAll('.arrow-link'),
    links = document.querySelectorAll(item);

  logo.addEventListener('click', () => {
    links.forEach(link => link.classList.remove(MENU_LINK_ACTIVE));
    links[0].classList.add(MENU_LINK_ACTIVE);
  });

  // arrows.forEach(link =>
  //   link.addEventListener('click', () =>
  //     links.forEach(link =>
  //       link.classList.remove(MENU_LINK_ACTIVE))));

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(link => link.classList.remove(MENU_LINK_ACTIVE));
      link.classList.add(MENU_LINK_ACTIVE);
    });
  });
};

// Burger menu support
const body = document.querySelector('body'),
  control = document.querySelector('.burger-menu__control'),
  burger = document.querySelector('.burger__item'),
  close = document.querySelector('.close__item'),
  links = document.querySelectorAll('.main-nav__link');

const openMenu = () => {
  body.classList.add(MENU_OPENED_CLASS);
  burger.style.display = 'none';
  close.style.display = 'block';
};

const closeMenu = () => {
  body.classList.remove(MENU_OPENED_CLASS);
  burger.style.display = 'block';
  close.style.display = 'none';
};

const burgerMenu = () => {
  control.addEventListener('click', () => body.classList.contains(MENU_OPENED_CLASS) ? closeMenu() : openMenu());
  // links.forEach(link => link.addEventListener('click', () => closeMenu()));
};

// Sticky header
const stickyHeader = () => {
  const header = document.querySelector('.header');
  if (
    window.scrollY >= STICKY_START_SCROLL
    && !header.classList.contains(HEADER_SCROLLED_CLASS)
  ) {
    header.classList.add(HEADER_SCROLLED_CLASS);
  } if (
    window.scrollY < STICKY_START_SCROLL
    && header.classList.contains(HEADER_SCROLLED_CLASS)
  ) {
    header.classList.remove(HEADER_SCROLLED_CLASS);
  };
};

// Scroll to
const scrollTo = () => {
  const scrollDownButton = document.getElementById('scroll-down'),
    scrollToContent = document.getElementById('content');

  let currenttScroll = window.scrollY;
  let scrollAnimationId;

  const startAnimationScroll = newScrollY => {
    const deltaScroll = newScrollY - currenttScroll;
    currenttScroll += deltaScroll * SCROLL_STEP;
    window.scrollTo(0, currenttScroll);

    if (Math.abs(deltaScroll) > 1) {
      scrollAnimationId = window.requestAnimationFrame(() => startAnimationScroll(newScrollY));
    } else {
      window.scrollTo(0, newScrollY);
      stopAnimationScroll();
    }
  };

  const stopAnimationScroll = () => {
    window.cancelAnimationFrame(scrollAnimationId);
    scrollAnimationId = undefined;
  };

  scrollDownButton.addEventListener('click', () => {
    stopAnimationScroll();

    currenttScroll = window.scrollY;
    startAnimationScroll(scrollToContent.offsetTop);

  });
};

// Initial functions
// scrollTo();
// stickyHeader();
// window.addEventListener('scroll', () => stickyHeader());
toggleMenu('.header-nav__link');
// burgerMenu();

functions.isWebp();