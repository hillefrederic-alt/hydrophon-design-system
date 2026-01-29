import StyleDictionary from 'style-dictionary';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    // Development outputs
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
    },
    // Distribution outputs
    'dist-css': {
      transformGroup: 'css',
      buildPath: 'dist/tokens/css/',
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
    'dist-scss': {
      transformGroup: 'scss',
      buildPath: 'dist/tokens/scss/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables'
        }
      ]
    },
    'dist-json': {
      transformGroup: 'js',
      buildPath: 'dist/tokens/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        }
      ]
    }
  }
};
