const getPublicMessage = () => {
  return {
    text: "This is a public message.",
  };
};

const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

module.exports = {
  getPublicMessage,
  getAdminMessage,
};
