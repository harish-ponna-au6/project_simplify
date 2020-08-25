const containerVariants = {
  hidden: {
    opacity: 0,
    y: "-8vh"
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeInOut" }
  },
  exit: {
    x: "-8vh",
    transition: { duration: 1, ease: "easeInOut" }
  }
};

const navVariants = {
  hidden: {
    opacity: 0,
    y: "-28vh"
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export { containerVariants, navVariants };
