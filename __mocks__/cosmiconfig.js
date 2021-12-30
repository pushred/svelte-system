const { randomBytes } = require('crypto')
const { join } = require('path')

function cosmiconfigSync() {
  return {
    search: () => {
      return {
        config: {
          outputPath: join(
            process.cwd(),
            `test-build-${randomBytes(5).toString('hex')}`
          ),
          theme: {
            // colors

            colors: {
              black: '#000',
              white: '#fff',
              gray: {
                50: '#f7fafc',
                900: '#171923',
              },
            },

            // typography

            fonts: {
              body: 'sans-serif',
              heading: 'sans-serif',
            },

            fontSizes: {
              xs: '0.75rem',
              sm: '0.875rem',
              md: '1rem',
              lg: '1.5rem',
            },

            fontWeights: {
              normal: 400,
              bold: 700,
            },

            lineHeights: {
              normal: 'normal',
              none: 1,
              heading: 1.125,
              body: 1.5,
            },

            letterSpacings: {
              tight: '-0.025em',
              normal: 0,
              wide: '0.025em',
            },

            // breakpoints

            breakpoints: {
              sm: '30em',
              md: '48em',
              lg: '62em',
              xl: '80em',
            },

            // spacing

            space: {
              //0.5: '0.125rem',
              1: '0.25rem',
              //1.5: '0.375rem',
              2: '0.5rem',
            },

            // sizes

            sizes: {
              xs: '20rem',
              sm: '24rem',
              md: '28rem',
              lg: '32rem',
              full: '100%',
            },

            // border radius

            radii: {
              none: 0,
              sm: '0.125rem',
              base: '0.25rem',
              md: '0.375rem',
              lg: '0.5rem',
            },

            // z-index

            zIndicies: {
              base: 0,
              overlay: 1300,
            },

            // styles

            layerStyles: {
              panel: {
                backgroundColor: 'gray.50',
                padding: 1,
                width: 'full',
                zIndex: 'base',
              },
            },

            text: {
              body: {
                color: 'black',
                fontFamily: 'body',
                fontSize: 'md',
                fontWeight: 'normal',
                letterSpacing: 'normal',
                lineHeight: 'body',
              },
              h1: {
                color: 'black',
                fontFamily: 'body',
                fontSize: 'lg',
                fontWeight: 'bold',
                letterSpacing: 'tight',
              },
            },
          },
        },
      }
    },
  }
}

module.exports.cosmiconfigSync = cosmiconfigSync
