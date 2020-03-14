const { attr } = require('../dist/sjs');

const data = {
  0: {
    schema: {
      a: attr('string'),
      b: attr('string'),
    },
    obj: {
      a: 'hello',
      b: 'world!',
    },
  },

  1: {
    schema: {
      a: {
        b: attr('string'),
        c: attr('string'),
      },
      d: attr('string'),
    },
    obj: {
      a: {
        b: 'hello',
        c: 'world',
      },
      d: '!',
    },
  },

  2: {
    schema: {
      a: attr('boolean'),
      b: {
        c: attr('string'),
        d: attr('number'),
      },
    },
    obj: {
      a: true,
      b: {
        c: 'hello',
        d: 45,
      },
    },
  },

  3: {
    schema: {
      a: attr('string'),
      b: attr('number'),
      c: attr('boolean'),
      d: {
        e: {
          f: attr('number'),
          g: {
            h: attr('boolean'),
            i: attr('number'),
          },
          l: {
            m: {
              n: {
                o: {
                  p: {
                    q: attr('number'),
                  },
                },
              },
            },
            r: attr('string'),
          },
        },
        s: attr('boolean'),
        t: {
          u: attr('number'),
          w: {
            x: {
              y: {
                z: attr('string'),
              },
            },
          },
        },
      },
    },
    obj: {
      a: 'h',
      b: 1,
      c: false,
      d: {
        e: {
          f: 213,
          g: {
            h: true,
            i: 4,
          },
          l: {
            m: {
              n: {
                o: {
                  p: {
                    q: 42,
                  },
                },
              },
            },
            r: 'ermete',
          },
        },
        s: null,
        t: {
          u: 394214,
          w: {
            x: {
              y: {
                z: 'str',
              },
            },
          },
        },
      },
    },
  },

  4: {
    schema: {
      a: attr('string'),
      b: attr('string'),
    },
    obj: {
      a: 'hello',
      b: undefined,
    },
  },

  5: {
    schema: {
      a: {
        b: attr('string'),
        c: attr('string'),
      },
      d: attr('string'),
    },
    obj: {
      a: {
        b: undefined,
        c: 'world',
      },
      d: undefined,
    },
  },

  6: {
    schema: {
      a: attr('boolean'),
      b: {
        c: attr('string'),
        d: attr('number'),
      },
    },
    obj: {
      a: true,
      b: {
        c: undefined,
        d: undefined,
      },
    },
  },

  7: {
    schema: {
      a: attr('string'),
      b: attr('number'),
      c: attr('boolean'),
      d: {
        e: {
          f: attr('number'),
          g: {
            h: attr('boolean'),
            i: attr('number'),
          },
          l: {
            m: {
              n: {
                o: {
                  p: {
                    q: attr('number'),
                  },
                },
              },
            },
            r: attr('string'),
          },
        },
        s: attr('boolean'),
        t: {
          u: attr('number'),
          w: {
            x: {
              y: {
                z: attr('string'),
              },
            },
          },
        },
      },
    },
    obj: {
      a: 'h',
      b: 1,
      c: undefined,
      d: {
        e: {
          f: 213,
          g: {
            h: undefined,
            i: 4,
          },
          l: {
            m: {
              n: {
                o: {
                  p: {
                    q: undefined,
                  },
                },
              },
            },
            r: undefined,
          },
        },
        s: null,
        t: {
          u: undefined,
          w: {
            x: {
              y: {
                z: undefined,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = data;
