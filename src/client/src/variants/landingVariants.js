const containerVariants = {
  hidden: {
    opacity: 1,
    x: 0
  },
  visible: {
    opacity: 1,
    x: 0
  }
};
const carouselVariants = {
  hidden: {
    opacity: 0,
    x: "-100vw"
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: 0.7,
      duration: 1,
      ease: "easeInOut"
    }
  }
};
const usersVariants = {
  hidden: {
    opacity: 0,
    x: "100vw"
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: 0.7,
      duration: 1,
      ease: "easeInOut"
    }
  }
};
const welcomeVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { delay: 2, duration: 2, ease: "easeInOut" }
  }
};
const aboutVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { delay: 2, duration: 2, ease: "easeInOut" }
  }
};

export {
  carouselVariants,
  usersVariants,
  containerVariants,
  aboutVariants,
  welcomeVariants
};
