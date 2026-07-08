export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeMetadata: false,
          removeEditorsNSData: false,
          cleanupNumericValues: false,
        },
      },
    },
  ],
};
