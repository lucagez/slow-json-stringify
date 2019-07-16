const data = {
  0: {
    schema: {
      a: 'string',
      b: 'string',
    },
    obj: {
      a: 'hello',
      b: 'world!',
    },
  },

  1: {
    schema: {
      a: {
        b: 'string',
        c: 'string',
      },
      d: 'string',
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
      a: 'boolean',
      b: {
        c: 'string',
        d: 'number',
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
      a: 'string',
      b: 'number',
      c: 'boolean',
      d: {
        e: {
          f: 'number',
          g: {
            h: 'boolean',
            i: 'number',
          },
          l: {
            m: {
              n: {
                o: {
                  p: {
                    q: 'number',
                  },
                },
              },
            },
            r: 'string',
          },
        },
        s: 'boolean',
        t: {
          u: 'number',
          w: {
            x: {
              y: {
                z: 'string',
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
      a: 'string',
      b: 'string',
    },
    obj: {
      a: 'hello',
      b: undefined,
    },
  },

  5: {
    schema: {
      a: {
        b: 'string',
        c: 'string',
      },
      d: 'string',
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
      a: 'boolean',
      b: {
        c: 'string',
        d: 'number',
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
      a: 'string',
      b: 'number',
      c: 'boolean',
      d: {
        e: {
          f: 'number',
          g: {
            h: 'boolean',
            i: 'number',
          },
          l: {
            m: {
              n: {
                o: {
                  p: {
                    q: 'number',
                  },
                },
              },
            },
            r: 'string',
          },
        },
        s: 'boolean',
        t: {
          u: 'number',
          w: {
            x: {
              y: {
                z: 'string',
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
