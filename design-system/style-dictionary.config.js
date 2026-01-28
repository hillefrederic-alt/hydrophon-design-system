import StyleDictionary from 'style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    }
  }
};
