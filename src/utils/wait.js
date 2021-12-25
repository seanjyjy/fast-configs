async function wait() {
  await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export default wait;
