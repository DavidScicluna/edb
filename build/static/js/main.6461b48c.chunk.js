(this.webpackJsonpedb = this.webpackJsonpedb || []).push([
  [0],
  {
    435: function (e, t, n) {},
    436: function (e, t, n) {},
    447: function (e, t, n) {},
    448: function (e, t, n) {},
    449: function (e, t, n) {
      'use strict';
      n.r(t);
      var o = n(1),
        a = n(61),
        i = n.n(a),
        r = n(20),
        c = n(165),
        s = n(247),
        l = n(568),
        d = n(569),
        u = n(151),
        b = n(3),
        g = n(7),
        j = n.n(g),
        h = n(11),
        p = n(2),
        v = n(42),
        O = n(494),
        f = n(495),
        m = n(44),
        x = function (e) {
          var t = Object(o.useState)(!1),
            n = Object(p.a)(t, 2),
            a = n[0],
            i = n[1];
          return {
            css: {
              thumbnail: {
                opacity: a ? 0 : 1,
                visibility: a ? 'hidden' : 'visible',
                transition: ''.concat(e.transition.duration.slower, ' ').concat(e.transition.easing['ease-in-out'])
              },
              fullSize: {
                opacity: a ? 1 : 0,
                visibility: a ? 'visible' : 'hidden',
                transition: ''.concat(e.transition.duration.slower, ' ').concat(e.transition.easing['ease-in-out'])
              }
            },
            isLoaded: a,
            handleIsLoaded: function (e) {
              i(e);
            }
          };
        },
        y = n(578),
        A = function (e) {
          return Object(y.a)(e);
        },
        w = r.c,
        k = n(24),
        C = n.n(k),
        S = n(8),
        D = n.n(S),
        E = (function () {
          var e = Object(h.a)(
            j.a.mark(function e(t) {
              return j.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        new Promise(function (e) {
                          return D.a.delay(e, 1250);
                        })
                      );
                    case 2:
                      return e.abrupt('return', t);
                    case 3:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        L = C.a.create({ baseURL: 'https://api.themoviedb.org/3' });
      L.interceptors.request.use(function (e) {
        return (
          e.headers.Authorization ||
            (e.headers.Authorization = 'Bearer '.concat(
              'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjg3MDE1OTQ5Y2VjMTNmYjE3YTI2ZTUwYjRmMDU0YSIsInN1YiI6IjVlYTFkN2QxNzEzZWQ0MDAxZjUxMDhlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fB3G8fg8jYkeCUdkHvnrqUqk08uzsCaXV6Lu7b13KZE'
            )),
          e
        );
      }),
        L.interceptors.response.use(E);
      var _ = L,
        B = n(90),
        M = Object(B.b)({
          name: 'app',
          initialState: { data: { sortDirection: 'desc' }, ui: { displayMode: 'grid', sidebarMode: 'expanded' } },
          reducers: {
            toggleDisplayMode: function (e, t) {
              e.ui.displayMode = t.payload;
            },
            toggleSortDirection: function (e, t) {
              e.data.sortDirection = t.payload;
            },
            toggleSidebarMode: function (e, t) {
              e.ui.sidebarMode = t.payload;
            }
          }
        }),
        T = M.actions,
        z = T.toggleDisplayMode,
        I = T.toggleSortDirection,
        F = T.toggleSidebarMode,
        Q = M.reducer,
        N = Object(B.b)({
          name: 'options',
          initialState: { data: { data: { genres: { movie: [], tv: [] } }, hasDownloaded: !1 } },
          reducers: {
            setMovieGenres: function (e, t) {
              e.data.data.genres.movie = t.payload;
            },
            setTVGenres: function (e, t) {
              e.data.data.genres.tv = t.payload;
            },
            toggleHasDownloaded: function (e, t) {
              e.data.hasDownloaded = t.payload;
            }
          }
        }),
        Y = N.actions,
        W = Y.setMovieGenres,
        P = Y.setTVGenres,
        R = Y.toggleHasDownloaded,
        G = N.reducer,
        V = { expanded: 266, collapsed: 58 },
        H = function (e) {
          return {
            transition: ''.concat(e.transition.duration['ultra-slow'], ' ').concat(e.transition.easing['ease-in-out'])
          };
        },
        J = n(276),
        Z = n(579),
        U = n(493),
        q = n(492),
        X = n(21),
        K = n.n(X),
        $ = n(479),
        ee = n(480),
        te = n(481),
        ne = n(482),
        oe = n(483),
        ae = n(484),
        ie = n(485),
        re = n(486),
        ce = n(487),
        se = n(488),
        le = n(489),
        de = n(490),
        ue = [
          { label: 'Home', path: '/', iconActive: $.a, icon: ee.a },
          { label: 'Search', path: '/search', iconActive: te.a, icon: ne.a },
          {
            label: 'Trending',
            path: '/trending',
            iconActive: oe.a,
            icon: ae.a,
            children: [
              { label: 'Trending Movies', path: '/trending/movie', renderChild: !1 },
              { label: 'Trending TV', path: '/trending/tv', renderChild: !1 },
              { label: 'Trending People', path: '/trending/person', renderChild: !1 }
            ]
          },
          {
            label: 'Movies',
            path: '/movies',
            iconActive: ie.a,
            icon: re.a,
            children: [
              { label: 'Popular', path: '/movies/popular', renderChild: !0 },
              { label: 'Upcoming', path: '/movies/upcoming', renderChild: !0 },
              { label: 'Now Playing', path: '/movies/now-playing', renderChild: !0 },
              { label: 'Top Rated', path: '/movies/top-rated', renderChild: !0 }
            ]
          },
          {
            label: 'TV Shows',
            path: '/tv',
            iconActive: ce.a,
            icon: se.a,
            children: [
              { label: 'Popular', path: '/tv/popular', renderChild: !0 },
              { label: 'Airing Today', path: '/tv/airing-today', renderChild: !0 },
              { label: 'On at the moment', path: '/tv/on-tv', renderChild: !0 },
              { label: 'Top Rated', path: '/tv/top-rated', renderChild: !0 }
            ]
          },
          { label: 'People', path: '/people', iconActive: le.a, icon: de.a }
        ],
        be = ue,
        ge = n(47),
        je = n(28),
        he = n(0),
        pe = function (e) {
          var t = Object(v.e)(),
            n = e.children,
            o = e.to,
            a = e.isDisabled,
            i = void 0 !== a && a,
            r = e.isFullWidth,
            c = void 0 !== r && r,
            s = Object(je.a)(e, ['children', 'to', 'isDisabled', 'isFullWidth']),
            l = (function (e) {
              return {
                'width': arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? '100%' : 'auto',
                'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                '&:hover': { textDecoration: 'none' },
                '&:focus': { boxShadow: 'none' }
              };
            })(t, c);
          return Object(he.jsx)(
            q.a,
            Object(b.a)(
              Object(b.a)({}, s),
              {},
              {
                as: m.b,
                to: Object(b.a)({}, o),
                onClick: i
                  ? function (e) {
                      return e.preventDefault();
                    }
                  : void 0,
                sx: Object(b.a)({}, l),
                children: n
              }
            )
          );
        },
        ve = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(ge.g)(),
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.children,
            r = e.label,
            c = e.path,
            s = o.pathname === c,
            l =
              !!i &&
              i.every(function (e) {
                return e.renderChild;
              });
          return Object(he.jsxs)(Z.c, {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            children: [
              Object(he.jsx)(pe, {
                to: { pathname: c },
                isDisabled: s,
                children: Object(he.jsx)(U.a, {
                  cursor: s ? 'default' : 'pointer',
                  align: 'left',
                  color: s
                    ? ''.concat(a, '.').concat('light' === n ? 400 : 500)
                    : 'light' === n
                    ? 'gray.400'
                    : 'gray.500',
                  fontSize: 'md',
                  fontWeight: 'semibold',
                  textTransform: 'uppercase',
                  sx: {
                    transition: ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out'])
                  },
                  _focus: { boxShadow: 'none' },
                  _hover: {
                    color: s
                      ? ''.concat(a, '.').concat('light' === n ? 500 : 400)
                      : 'light' === n
                      ? 'gray.900'
                      : 'gray.50'
                  },
                  children: r
                })
              }),
              i && i.length > 0 && l
                ? i.map(function (e, i) {
                    return Object(he.jsx)(
                      pe,
                      {
                        to: { pathname: e.path },
                        isDisabled: o.pathname === e.path,
                        children: Object(he.jsx)(U.a, {
                          cursor: o.pathname === e.path ? 'default' : 'pointer',
                          align: 'left',
                          color:
                            o.pathname === e.path
                              ? ''.concat(a, '.').concat('light' === n ? 400 : 500)
                              : 'light' === n
                              ? 'gray.400'
                              : 'gray.500',
                          fontSize: 'md',
                          fontWeight: 'medium',
                          textTransform: 'capitalize',
                          sx: {
                            transition: ''
                              .concat(t.transition.duration.faster, ' ')
                              .concat(t.transition.easing['ease-out'])
                          },
                          _focus: { boxShadow: 'none' },
                          _hover: {
                            color:
                              o.pathname === e.path
                                ? ''.concat(a, '.').concat('light' === n ? 500 : 400)
                                : 'light' === n
                                ? 'gray.900'
                                : 'gray.50'
                          },
                          children: e.label
                        })
                      },
                      i
                    );
                  })
                : null
            ]
          });
        },
        Oe = function () {
          var e = Object(v.e)(),
            t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            backgroundColor: 'light' === t ? 'gray.100' : 'gray.800',
            spacing: 4,
            p: 4,
            mt: 4,
            children: [
              o
                ? Object(he.jsx)(Z.c, {
                    width: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    spacing: 4,
                    children: be.map(function (e, t) {
                      return Object(he.jsx)(ve, Object(b.a)({}, e), t);
                    })
                  })
                : Object(he.jsx)(Z.a, {
                    width: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    spacing: 2,
                    children: be.map(function (e, t) {
                      return Object(he.jsx)(ve, Object(b.a)({}, e), t);
                    })
                  }),
              Object(he.jsx)(f.a, {
                width: '100%',
                height: '2px',
                backgroundColor: 'light' === t ? 'gray.200' : 'gray.700'
              }),
              Object(he.jsxs)(Z.b, {
                width: '100%',
                direction: o ? 'column' : 'row',
                justifyContent: 'space-between',
                children: [
                  Object(he.jsx)(U.a, {
                    align: 'center',
                    color: 'light' === t ? 'gray.400' : 'gray.500',
                    fontSize: 'md',
                    fontWeight: 'medium',
                    children: '\xa9 '.concat(K()().format('YYYY'), ' EDB, All rights reserved.')
                  }),
                  Object(he.jsxs)(U.a, {
                    align: 'center',
                    color: 'light' === t ? 'gray.400' : 'gray.500',
                    fontSize: 'md',
                    fontWeight: 'medium',
                    children: [
                      'Made by',
                      ' ',
                      Object(he.jsx)(q.a, {
                        color: 'light' === t ? 'gray.400' : 'gray.500',
                        fontWeight: 'semibold',
                        href: 'https://davidscicluna.com',
                        isExternal: !0,
                        sx: {
                          transition: ''
                            .concat(e.transition.duration.faster, ' ')
                            .concat(e.transition.easing['ease-out'])
                        },
                        _focus: { boxShadow: 'none' },
                        _hover: { color: ''.concat(a, '.').concat('light' === t ? 500 : 400) },
                        children: 'davidscicluna.com'
                      })
                    ]
                  })
                ]
              })
            ]
          });
        },
        fe = n(501),
        me = n(581),
        xe = n(87),
        ye = n(504),
        Ae = n(510),
        we = n(496),
        ke = n(498),
        Ce = n(497),
        Se = n(168),
        De = Object(o.forwardRef)(function (e, t) {
          var n = Object(v.e)(),
            o = Object(J.c)().colorMode,
            a = (function (e, t) {
              var n = t.color,
                o = void 0 === n ? 'gray' : n,
                a = t.size,
                i = void 0 === a ? 'md' : a,
                r = t.variant,
                c = void 0 === r ? 'contained' : r,
                s = t.isLoading,
                l = void 0 !== s && s,
                d = t.isLight,
                u = void 0 !== d && d;
              return {
                button: {
                  back: {
                    'cursor': 'pointer',
                    'width': 'auto',
                    'height': 'auto',
                    'minWidth': 'auto',
                    'minHeight': 'auto',
                    'maxWidth': 'none',
                    'maxHeight': 'none',
                    'opacity': 1,
                    'borderStyle': 'solid',
                    'borderWidth': '0',
                    'borderRadius': 'sm' === i ? 'base' : 'md' === i ? 'md' : 'lg',
                    'padding': 0,
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:focus': { boxShadow: 'none' },
                    '&:active .icon_button_front': {
                      transform:
                        'icon' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    },
                    '& .MuiSvgIcon-root': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  front: {
                    cursor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderStyle: 'solid',
                    borderWidth: 'icon' !== c ? ('sm' !== i ? '2px 2px 0' : '1px 1px 0') : '0',
                    borderRadius: 'inherit',
                    padding: 'sm' === i ? e.space[0.5] : 'md' === i ? e.space[1] : e.space[1.5],
                    transform: 'icon' !== c ? 'translateY('.concat('sm' !== i ? '-4px' : '-3px', ')') : 'none',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  disabled: {
                    'cursor': 'not-allowed',
                    'opacity': l ? 1 : 0.5,
                    '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                      { '& .icon_button_front': { opacity: 1 } },
                    '& .icon_button_front': {
                      transform:
                        'icon' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    },
                    '&:hover .icon_button_front': {
                      cursor: 'not-allowed',
                      opacity: l ? 1 : 0.5,
                      transform:
                        'icon' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    },
                    '&:active .icon_button_front': {
                      cursor: 'not-allowed',
                      opacity: l ? 1 : 0.5,
                      transform:
                        'icon' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    }
                  },
                  icon: {
                    display: 'block',
                    fontSize: ''.concat('sm' === i || 'md' === i ? e.fontSizes.xl : e.fontSizes['2xl'], ' !important')
                  }
                },
                light: {
                  back: {
                    contained: {
                      'backgroundColor': ''.concat(o, '.').concat(u ? 400 : 600),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 400 : 600),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 300 : 500),
                          backgroundColor: ''.concat(o, '.').concat(u ? 300 : 500),
                          color: 'gray.50'
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 400 : 600),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 300 : 500),
                          backgroundColor: ''.concat(o, '.').concat(u ? 300 : 500),
                          color: 'gray.50'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': ''.concat(o, '.').concat(u ? 200 : 400),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 300 : 500),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: ''.concat(o, '.').concat(u ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 300 : 500),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: ''.concat(o, '.').concat(u ? 300 : 500)
                        }
                      }
                    },
                    icon: {
                      'backgroundColor': 'transparent',
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(u ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(u ? 300 : 500)
                        }
                      }
                    }
                  },
                  front: {
                    contained: {
                      borderColor: ''.concat(o, '.').concat(u ? 200 : 400),
                      backgroundColor: ''.concat(o, '.').concat(u ? 200 : 400),
                      color: 'gray.50'
                    },
                    outlined: {
                      borderColor: ''.concat(o, '.').concat(u ? 200 : 400),
                      backgroundColor: 'gray.50',
                      color: ''.concat(o, '.').concat(u ? 200 : 400)
                    },
                    icon: {
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                      color: ''.concat(o, '.').concat(u ? 200 : 400)
                    }
                  },
                  disabled: {
                    contained: {
                      'backgroundColor': 'gray.'.concat(u ? 400 : 600),
                      '& .icon_button_front': {
                        borderColor: 'gray.'.concat(u ? 200 : 400),
                        backgroundColor: 'gray.'.concat(u ? 200 : 400),
                        color: 'gray.50'
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(u ? 400 : 600),
                          '& .icon_button_front': {
                            borderColor: 'gray.'.concat(u ? 300 : 500),
                            backgroundColor: 'gray.'.concat(u ? 300 : 500),
                            color: 'gray.50'
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(u ? 400 : 600),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 300 : 500),
                          backgroundColor: 'gray.'.concat(u ? 300 : 500),
                          color: 'gray.50'
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(u ? 400 : 600),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 300 : 500),
                          backgroundColor: 'gray.'.concat(u ? 300 : 500),
                          color: 'gray.50'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': 'gray.'.concat(u ? 200 : 400),
                      '& .icon_button_front': {
                        borderColor: 'gray.'.concat(u ? 200 : 400),
                        backgroundColor: 'gray.50',
                        color: 'gray.'.concat(u ? 200 : 400)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(u ? 300 : 500),
                          '& .icon_button_front': {
                            borderColor: 'gray.'.concat(u ? 300 : 500),
                            backgroundColor: 'gray.50',
                            color: 'gray.'.concat(u ? 300 : 500)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(u ? 300 : 500),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: 'gray.'.concat(u ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(u ? 300 : 500),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: 'gray.'.concat(u ? 300 : 500)
                        }
                      }
                    },
                    icon: {
                      'backgroundColor': 'transparent',
                      '& .icon_button_front': {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        color: 'gray.'.concat(u ? 200 : 400)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'transparent',
                          '& .icon_button_front': {
                            borderColor: 'transparent',
                            backgroundColor: 'transparent',
                            color: 'gray.'.concat(u ? 300 : 500)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(u ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(u ? 300 : 500)
                        }
                      }
                    }
                  }
                },
                dark: {
                  back: {
                    contained: {
                      'backgroundColor': ''.concat(o, '.').concat(u ? 500 : 300),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 500 : 300),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 600 : 400),
                          backgroundColor: ''.concat(o, '.').concat(u ? 600 : 400),
                          color: 'gray.900'
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 500 : 300),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 600 : 400),
                          backgroundColor: ''.concat(o, '.').concat(u ? 600 : 400),
                          color: 'gray.900'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': ''.concat(o, '.').concat(u ? 700 : 500),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 600 : 400),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: ''.concat(o, '.').concat(u ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(u ? 600 : 400),
                        '& .icon_button_front': {
                          borderColor: ''.concat(o, '.').concat(u ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: ''.concat(o, '.').concat(u ? 600 : 400)
                        }
                      }
                    },
                    icon: {
                      'backgroundColor': 'transparent',
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(u ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(u ? 600 : 400)
                        }
                      }
                    }
                  },
                  front: {
                    contained: {
                      borderColor: ''.concat(o, '.').concat(u ? 700 : 500),
                      backgroundColor: ''.concat(o, '.').concat(u ? 700 : 500),
                      color: 'gray.900'
                    },
                    outlined: {
                      borderColor: ''.concat(o, '.').concat(u ? 700 : 500),
                      backgroundColor: 'gray.900',
                      color: ''.concat(o, '.').concat(u ? 700 : 500)
                    },
                    icon: {
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                      color: ''.concat(o, '.').concat(u ? 700 : 500)
                    }
                  },
                  disabled: {
                    contained: {
                      'backgroundColor': 'gray.'.concat(u ? 500 : 300),
                      '& .icon_button_front': {
                        borderColor: 'gray.'.concat(u ? 700 : 500),
                        backgroundColor: 'gray.'.concat(u ? 700 : 500),
                        color: 'gray.900'
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(u ? 500 : 300),
                          '& .icon_button_front': {
                            borderColor: 'gray.'.concat(u ? 600 : 400),
                            backgroundColor: 'gray.'.concat(u ? 600 : 400),
                            color: 'gray.900'
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(u ? 500 : 300),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 600 : 400),
                          backgroundColor: 'gray.'.concat(u ? 600 : 400),
                          color: 'gray.900'
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(u ? 500 : 300),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 600 : 400),
                          backgroundColor: 'gray.'.concat(u ? 600 : 400),
                          color: 'gray.900'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': 'gray.'.concat(u ? 700 : 500),
                      '& .icon_button_front': {
                        borderColor: 'gray.'.concat(u ? 700 : 500),
                        backgroundColor: 'gray.900',
                        color: 'gray.'.concat(u ? 700 : 500)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(u ? 600 : 400),
                          '& .icon_button_front': {
                            borderColor: 'gray.'.concat(u ? 600 : 400),
                            backgroundColor: 'gray.900',
                            color: 'gray.'.concat(u ? 600 : 400)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(u ? 600 : 400),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: 'gray.'.concat(u ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(u ? 600 : 400),
                        '& .icon_button_front': {
                          borderColor: 'gray.'.concat(u ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: 'gray.'.concat(u ? 600 : 400)
                        }
                      }
                    },
                    icon: {
                      'backgroundColor': 'transparent',
                      '& .icon_button_front': {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        color: 'gray.'.concat(u ? 700 : 500)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'transparent',
                          '& .icon_button_front': {
                            borderColor: 'transparent',
                            backgroundColor: 'transparent',
                            color: 'gray.'.concat(u ? 600 : 400)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(u ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        '& .icon_button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(u ? 600 : 400)
                        }
                      }
                    }
                  }
                }
              };
            })(n, e),
            i = D.a.omit(e, 'isLight'),
            r = i.colorMode,
            c = i.icon,
            s = i.isDisabled,
            l = void 0 !== s && s,
            d = i.isLoading,
            u = void 0 !== d && d,
            g = i.size,
            j = void 0 === g ? 'md' : g,
            h = i.variant,
            p = void 0 === h ? 'contained' : h,
            O = Object(je.a)(i, ['colorMode', 'icon', 'isDisabled', 'isLoading', 'size', 'variant']),
            f = r || o;
          return Object(he.jsx)(
            we.a,
            Object(b.a)(
              Object(b.a)({}, O),
              {},
              {
                ref: t,
                isDisabled: u || l,
                variant: 'unstyled',
                sx: Object(b.a)({}, D.a.merge(a.button.back, a[f].back[p])),
                _disabled: Object(b.a)({}, D.a.merge(a.button.disabled, a[f].disabled[p])),
                children: Object(he.jsx)(ke.a, {
                  className: 'icon_button_front',
                  sx: Object(b.a)({}, D.a.merge(a.button.front, a[f].front[p])),
                  children: u
                    ? Object(he.jsx)(Ce.a, {
                        thickness: 'sm' === j ? '2px' : 'md' === j ? '3px' : '4px',
                        size: j,
                        speed: n.transition.duration.slow,
                        sx: Object(b.a)({}, D.a.merge(a.button.icon))
                      })
                    : Object(he.jsx)(Se.a, { as: c, sx: Object(b.a)({}, D.a.merge(a.button.icon)) })
                })
              }
            )
          );
        }),
        Ee = De,
        Le = n(453),
        _e = n(502),
        Be = n(503),
        Me = n(89),
        Te = n.n(Me),
        ze = n(49),
        Ie = n.n(ze),
        Fe = n(570),
        Qe = n(248),
        Ne = n.n(Qe),
        Ye = n(62),
        We = { open: !1, title: '', mediaType: 'movie', mediaItem: void 0 },
        Pe = { open: !1, mediaType: 'movie', mediaItem: void 0 },
        Re = { open: !1, mediaType: 'movie', mediaItem: void 0 },
        Ge = {
          ui: {
            listsModal: Object(b.a)({}, We),
            descriptionModal: Object(b.a)({}, Pe),
            quickViewModal: Object(b.a)({}, Re),
            isDisplayModalOpen: !1,
            isSplashscreenOpen: !0
          }
        },
        Ve = Object(B.b)({
          name: 'modals',
          initialState: Ge,
          reducers: {
            toggleList: function (e, t) {
              e.ui.listsModal = t.payload;
            },
            toggleDescription: function (e, t) {
              e.ui.descriptionModal = t.payload;
            },
            toggleQuickView: function (e, t) {
              e.ui.quickViewModal = t.payload;
            },
            toggleDisplay: function (e, t) {
              e.ui.isDisplayModalOpen = t.payload;
            },
            toggleSplashscreen: function (e, t) {
              e.ui.isSplashscreenOpen = t.payload;
            }
          }
        }),
        He = Ve.actions,
        Je = He.toggleList,
        Ze = He.toggleDescription,
        Ue = He.toggleQuickView,
        qe = He.toggleDisplay,
        Xe = He.toggleSplashscreen,
        Ke = Ve.reducer,
        $e = {
          data: {
            recentSearches: [],
            recentlyViewed: { movies: [], tv: [], people: [] },
            liked: { movies: [], tv: [], people: [] },
            lists: [
              {
                id: Object(Fe.a)(),
                label: 'Watchlist',
                description:
                  "A collection of movies and tv shows that I'm looking forward to watching and hopefully re-watch \ud83e\udd73 \ud83e\udd13",
                date: K()(new Date()).toISOString(),
                results: { movies: [], tv: [] }
              }
            ],
            reviews: { user: [], other: [] }
          },
          ui: { theme: { color: 'blue', background: 'light' } }
        },
        et = Object(B.b)({
          name: 'user',
          initialState: $e,
          reducers: {
            setTheme: function (e, t) {
              e.ui.theme = t.payload;
            },
            setRecentSearches: function (e, t) {
              e.data.recentSearches = t.payload;
            },
            setRecentlyViewed: function (e, t) {
              e.data.recentlyViewed = t.payload;
            },
            setLiked: function (e, t) {
              e.data.liked = t.payload;
            },
            setLists: function (e, t) {
              e.data.lists = t.payload;
            },
            setUserReviews: function (e, t) {
              e.data.reviews.user = t.payload;
            },
            setOtherReviews: function (e, t) {
              e.data.reviews.other = t.payload;
            }
          }
        }),
        tt = et.actions,
        nt = tt.setTheme,
        ot = tt.setRecentSearches,
        at = (tt.setRecentlyViewed, tt.setLiked),
        it = tt.setLists,
        rt = tt.setUserReviews,
        ct = tt.setOtherReviews,
        st = et.reducer,
        lt = Object(Ye.b)({ app: Q, options: G, modals: Ke, user: st }),
        dt = lt,
        ut = { key: 'root', storage: Ne.a, blacklist: ['modals'] },
        bt = Object(c.a)(ut, dt),
        gt = Object(B.a)({ reducer: bt, devTools: !1 }),
        jt = gt,
        ht = n(500),
        pt = {
          none: 0,
          solid: 'solid',
          dashed: 'dashed',
          solid1: '1px solid',
          solid2: '2px solid',
          dashed1: '1px dashed',
          dashed2: '2px dashed'
        },
        vt = { none: '0', sm: '5px', base: '10px', md: '12.5px', lg: '15px', xl: '20px', full: '9999px' },
        Ot = Object(b.a)(
          Object(b.a)(
            {},
            {
              'max': 'max-content',
              'min': 'min-content',
              'full': '100%',
              '3xs': '14rem',
              '2xs': '16rem',
              'xs': '20rem',
              'sm': '24rem',
              'md': '28rem',
              'lg': '32rem',
              'xl': '36rem',
              '2xl': '42rem',
              '3xl': '48rem',
              '4xl': '56rem',
              '5xl': '64rem',
              '6xl': '72rem',
              '7xl': '80rem',
              '8xl': '90rem'
            }
          ),
          {},
          { container: { sm: '640px', md: '960px', lg: '1280px', xl: '1920px' } }
        ),
        ft = Ot,
        mt = {
          0: 0,
          0.25: '0.125rem',
          0.5: '0.25rem',
          0.75: '0.375rem',
          1: '0.5rem',
          1.25: '0.625rem',
          1.5: '0.75rem',
          1.75: '0.875rem',
          2: '1rem',
          2.25: '1.125rem',
          2.5: '1.25rem',
          2.75: '1.375rem',
          3: '1.5rem',
          3.25: '1.625rem',
          3.5: '1.75rem',
          3.75: '1.875rem',
          4: '2rem',
          4.25: '2.125rem',
          4.5: '2.25rem',
          4.75: '2.375rem',
          5: '2.5rem',
          5.25: '2.625rem',
          5.5: '2.75rem',
          5.75: '2.875rem',
          6: '3rem',
          6.25: '3.125rem',
          6.5: '3.25rem',
          6.75: '3.375rem',
          7: '3.5rem',
          7.25: '3.625rem',
          7.5: '3.75rem',
          7.75: '3.875rem',
          8: '4rem',
          8.25: '4.125rem',
          8.5: '4.25rem',
          8.75: '4.375rem',
          9: '4.5rem',
          9.25: '4.625rem',
          9.5: '4.75rem',
          9.75: '4.875rem',
          10: '5rem',
          10.25: '5.125rem',
          10.5: '5.25rem',
          10.75: '5.375rem',
          11: '5.5rem',
          11.25: '5.625rem',
          11.5: '5.75rem',
          11.75: '5.875rem',
          12: '6rem',
          12.25: '6.125rem',
          12.5: '6.25rem',
          12.75: '6.375rem',
          13: '6.5rem',
          13.25: '6.625rem',
          13.5: '6.75rem',
          13.75: '6.875rem',
          14: '7rem',
          14.25: '7.125rem',
          14.5: '7.25rem',
          14.75: '7.375rem',
          15: '7.5rem',
          15.25: '7.625rem',
          15.5: '7.75rem',
          15.75: '7.875rem'
        },
        xt = {
          property: {
            common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            colors: 'background-color, border-color, color, fill, stroke',
            dimensions: 'width, height',
            position: 'left, right, top, bottom',
            background: 'background-color, background-image, background-position'
          },
          easing: {
            'ease-in': 'cubic-bezier(0.5, 0, 0.75, 0)',
            'ease-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
            'ease-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)'
          },
          duration: {
            'ultra-fast': '50ms',
            'faster': '100ms',
            'fast': '200ms',
            'normal': '250ms',
            'slow': '500ms',
            'slower': '750ms',
            'ultra-slow': '1000ms'
          }
        },
        yt = xt,
        At = {
          fonts: { body: 'Work Sans, sans-serif', heading: 'Work Sans, serif', mono: 'Roboto Mono, monospace' },
          fontSizes: {
            'xs': '0.75rem',
            'sm': '0.875rem',
            'md': '1rem',
            'lg': '1.125rem',
            'xl': '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '3.75rem',
            '7xl': '4.5rem',
            '8xl': '6rem',
            '9xl': '8rem'
          }
        },
        wt = {
          hide: -1,
          auto: 'auto',
          base: 0,
          docked: 10,
          dropdown: 1e3,
          sticky: 1100,
          banner: 1200,
          overlay: 1300,
          toast: 1350,
          modal: 1400,
          popover: 1500,
          skipLink: 1600,
          tooltip: 1800
        },
        kt = {
          borders: pt,
          zIndices: wt,
          radii: vt,
          space: mt,
          sizes: ft,
          transition: yt,
          fonts: At.fonts,
          fontSizes: At.fontSizes
        },
        Ct = n(499),
        St = {
          global: function (e) {
            return {
              'body': {
                fontFamily: 'body',
                color: Object(Ct.a)('gray.900', 'gray.50')(e),
                bg: Object(Ct.a)('gray.50', 'gray.900')(e),
                transition: ''.concat(yt.duration.slower, ' ').concat(yt.easing['ease-in-out']),
                overflowX: 'hidden',
                lineHeight: 'short'
              },
              '*::placeholder': { color: Object(Ct.a)('gray.400', 'gray.500')(e) },
              '*, *::before, &::after': { borderColor: Object(Ct.a)('gray.200', 'gray.700')(e), wordWrap: 'break-word' }
            };
          }
        },
        Dt = St,
        Et = Object(b.a)(
          { styles: Dt, config: { cssVarPrefix: 'chakra', initialColorMode: 'light', useSystemColorMode: !1 } },
          kt
        ),
        Lt = Object(ht.a)(Object(b.a)({}, Et)),
        _t = [
          { value: '01', label: 'January' },
          { value: '02', label: 'February' },
          { value: '03', label: 'March' },
          { value: '04', label: 'April' },
          { value: '05', label: 'May' },
          { value: '06', label: 'June' },
          { value: '07', label: 'July' },
          { value: '08', label: 'August' },
          { value: '09', label: 'September' },
          { value: '10', label: 'October' },
          { value: '11', label: 'November' },
          { value: '12', label: 'December' }
        ],
        Bt = function (e, t) {
          return parseInt(D.a.replace(e, t));
        },
        Mt = function (e) {
          return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        Tt = function (e) {
          return e.split('\n'[0]).filter(function (e) {
            return '\r' !== e;
          });
        },
        zt = function (e, t) {
          return jt
            .getState()
            .options.data.data.genres[t].filter(function (t) {
              return e.includes(t.id);
            })
            .map(function (e) {
              return e.name;
            })
            .filter(function (e) {
              return e;
            })
            .join(', ');
        },
        It = function () {
          return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        },
        Ft = function (e, t) {
          if ('full' === t) {
            var n = e.split('-'),
              o = _t.find(function (e) {
                return e.value === n[1];
              });
            return ''
              .concat(n[2], ' ')
              .concat(null === o || void 0 === o ? void 0 : o.label, ' ')
              .concat(n[0]);
          }
          return e.split('-')['year' === t ? 0 : 'month' === t ? 1 : 2];
        },
        Qt = function (e) {
          var t = e / 60,
            n = Math.floor(t),
            o = 60 * (t - n),
            a = Math.round(o);
          return [n > 0 ? ''.concat(n, 'hr') : void 0, a > 0 ? ''.concat(a, 'm') : void 0]
            .filter(function (e) {
              return e;
            })
            .join(' ');
        },
        Nt = function (e) {
          return e / 1e3;
        },
        Yt = function (e, t, n) {
          var o = !1;
          return !o && e && e.isActive && (o = !0), o || D.a.isEmpty(t) || (o = !0), o || D.a.isEmpty(n) || (o = !0), o;
        },
        Wt = function (e) {
          switch (e) {
            case 'orange':
              return 'orange';
            case 'yellow':
              return 'yellow';
            case 'green':
              return 'green';
            case 'teal':
              return 'teal';
            case 'cyan':
              return 'cyan';
            case 'purple':
              return 'purple';
            case 'pink':
              return 'pink';
            default:
              return 'blue';
          }
        },
        Pt = function (e, t, n) {
          return Ie.a.stringifyUrl({
            url: ''
              .concat('https://source.boringavatars.com', '/')
              .concat(e, '/')
              .concat(t, '/')
              .concat(''.concat(n, '-').concat(Object(Fe.a)()).split(' ').join('')),
            query: {
              colors: [
                Lt.colors.red[t],
                Lt.colors.orange[t],
                Lt.colors.yellow[t],
                Lt.colors.green[t],
                Lt.colors.teal[t],
                Lt.colors.blue[t],
                Lt.colors.cyan[t],
                Lt.colors.purple[t],
                Lt.colors.pink[t]
              ].join(','),
              square: !0
            }
          });
        },
        Rt = function (e) {
          var t = e.style.overflow;
          (t && 'visible' !== t) || (e.style.overflow = 'hidden');
          var n = e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight;
          return (e.style.overflow = t), n;
        },
        Gt = function (e, t) {
          return D.a.range(25, e, t);
        },
        Vt = n(575),
        Ht = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.children,
            a = e.colorMode,
            i = e.closeDelay,
            r = e.openDelay,
            c = e.shouldWrapChildren,
            s = void 0 !== c && c,
            l = Object(je.a)(e, ['children', 'colorMode', 'closeDelay', 'openDelay', 'shouldWrapChildren']),
            d = a || n;
          return It()
            ? o
            : Object(he.jsx)(
                Vt.a,
                Object(b.a)(
                  Object(b.a)({}, l),
                  {},
                  {
                    arrowSize: 8,
                    color: 'light' === d ? 'gray.50' : 'gray.900',
                    backgroundColor: 'light' === d ? 'gray.700' : 'gray.200',
                    closeDelay: i || Bt(t.transition.duration.slow, 'ms'),
                    openDelay: r || Bt(t.transition.duration.normal, 'ms'),
                    hasArrow: !0,
                    sx: {
                      '& .chakra-tooltip__arrow': {
                        backgroundColor: ''.concat(
                          'light' === d ? t.colors.gray[700] : t.colors.gray[200],
                          ' !important'
                        )
                      }
                    },
                    children: s ? Object(he.jsx)('span', { style: { width: '100%' }, children: o }) : o
                  }
                )
              );
        },
        Jt = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(ge.g)(),
            a = w(function (e) {
              return e.app.ui.sidebarMode;
            }),
            i = w(function (e) {
              return e.user.ui.theme.color;
            }),
            r = e.label,
            c = e.path,
            s = e.isLastChild,
            l = void 0 !== s && s,
            d = e.sidebarMode,
            u = Object(Le.a)(),
            g = Object(p.a)(u, 2),
            j = g[0],
            h = g[1],
            O = d || a,
            m = (function (e, t) {
              var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
              return {
                common: {
                  child: {
                    'cursor': 'pointer',
                    'backgroundColor': 'transparent',
                    'borderRadius':
                      arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
                        ? 'base'
                        : o
                        ? '0 0 '.concat(e.radii.base, ' ').concat(e.radii.base)
                        : 'none',
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '& .chakra-text': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  link: {
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:hover': { textDecoration: 'none' },
                    '&:focus': { boxShadow: 'none' }
                  }
                },
                light: {
                  child: {
                    'backgroundColor': n ? ''.concat(t, '.400') : 'transparent',
                    '& .chakra-text': { color: n ? 'gray.50' : 'gray.400' },
                    '&:hover': {
                      'backgroundColor': n ? ''.concat(t, '.500') : 'gray.200',
                      '& .chakra-text': { color: n ? 'gray.50' : 'gray.900' }
                    }
                  }
                },
                dark: {
                  child: {
                    'backgroundColor': n ? ''.concat(t, '.500') : 'transparent',
                    '& .chakra-text': { color: n ? 'gray.900' : 'gray.500' },
                    '&:hover': {
                      'backgroundColor': n ? ''.concat(t, '.400') : 'gray.700',
                      '& .chakra-text': { color: n ? 'gray.900' : 'gray.50' }
                    }
                  }
                }
              };
            })(t, i, o.pathname === c, 'expanded' === O, l);
          return Object(he.jsx)(pe, {
            to: { pathname: c || '' },
            isFullWidth: !0,
            isDisabled: !c,
            sx: Object(b.a)({}, m.common.link),
            children: Object(he.jsx)(Ht, {
              'aria-label': 'collapsed' === O ? r : '',
              'width': '100%',
              'label': 'collapsed' === O ? r : '',
              'isOpen': j,
              'isDisabled': 'expanded' === O,
              'placement': 'right',
              'gutter': 16,
              'children': Object(he.jsxs)(Z.a, {
                width: '100%',
                spacing: '12px',
                children: [
                  'expanded' === O
                    ? Object(he.jsx)(f.a, {
                        width: '2px',
                        height: '42px',
                        backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
                      })
                    : null,
                  Object(he.jsx)(Z.a, {
                    width: '100%',
                    justifyContent: 'expanded' === O ? 'flex-start' : 'center',
                    px: 'expanded' === O ? 2 : 1,
                    py: 1,
                    onMouseEnter: function () {
                      return h.on();
                    },
                    onMouseLeave: function () {
                      return h.off();
                    },
                    spacing: 0,
                    sx: Object(b.a)({}, D.a.merge(m.common.child, m[n].child)),
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      fontSize: 'expanded' === O ? 'md' : 'sm',
                      fontWeight: 'semibold',
                      whiteSpace: 'nowrap',
                      textTransform: 'expanded' === O ? 'capitalize' : 'uppercase',
                      children:
                        'expanded' === O
                          ? r
                          : (function () {
                              var e = r.split(' '),
                                t = '';
                              return (
                                e.forEach(function (e) {
                                  e && (t += e[0]);
                                }),
                                t
                              );
                            })()
                    })
                  })
                ]
              })
            })
          });
        },
        Zt = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            a = Object(ge.g)(),
            i = w(function (e) {
              return e.user.ui.theme.color;
            }),
            r = e.children,
            c = e.label,
            s = e.path,
            l = e.icon,
            d = e.iconActive,
            u = e.sidebarMode,
            g = e.onClick,
            j = Object(Le.a)(),
            h = Object(p.a)(j, 2),
            O = h[0],
            m = h[1],
            x = Object(Le.a)(),
            y = Object(p.a)(x, 2),
            A = y[0],
            k = y[1],
            C = Object(Le.a)(),
            S = Object(p.a)(C, 2),
            E = S[0],
            L = S[1],
            _ = a.pathname === s,
            B =
              !!r &&
              r.some(function (e) {
                return a.pathname === e.path;
              }),
            M =
              !!r &&
              r.every(function (e) {
                return e.renderChild;
              }),
            T = (function (e, t) {
              var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                i = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
                r = arguments.length > 6 && void 0 !== arguments[6] && arguments[6];
              return {
                common: {
                  container: {
                    borderRadius: 'base',
                    transition: ''
                      .concat(e.transition.duration['ultra-slow'], ' ')
                      .concat(e.transition.easing['ease-in-out'])
                  },
                  main: {
                    'cursor': 'pointer',
                    'borderRadius': !i && r && a ? ''.concat(e.radii.base, ' ').concat(e.radii.base, ' 0 0') : 'base',
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '& .chakra-icon': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    },
                    '& .chakra-text': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  link: {
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  }
                },
                light: {
                  container: { backgroundColor: !i && r && a ? 'gray.200' : 'transparent' },
                  main: {
                    'backgroundColor': o ? 'transparent' : n ? ''.concat(t, '.400') : 'transparent',
                    '& .chakra-icon': { color: o ? ''.concat(t, '.400') : n ? 'gray.50' : 'gray.400' },
                    '& .chakra-text': { color: o ? ''.concat(t, '.400') : n ? 'gray.50' : 'gray.400' },
                    '&:hover': {
                      'backgroundColor': o ? 'gray.200' : n ? ''.concat(t, '.500') : 'gray.200',
                      '& .chakra-icon': { color: o ? ''.concat(t, '.500') : n ? 'gray.50' : 'gray.900' },
                      '& .chakra-text': { color: o ? ''.concat(t, '.500') : n ? 'gray.50' : 'gray.900' }
                    }
                  }
                },
                dark: {
                  container: { backgroundColor: !i && r && a ? 'gray.700' : 'transparent' },
                  main: {
                    'backgroundColor': o ? 'transparent' : n ? ''.concat(t, '.500') : 'transparent',
                    '& .chakra-icon': { color: o ? ''.concat(t, '.500') : n ? 'gray.900' : 'gray.400' },
                    '& .chakra-text': { color: o ? ''.concat(t, '.500') : n ? 'gray.900' : 'gray.400' },
                    '&:hover': {
                      'backgroundColor': o ? 'gray.700' : n ? ''.concat(t, '.400') : 'gray.700',
                      '& .chakra-icon': { color: o ? ''.concat(t, '.400') : n ? 'gray.900' : 'gray.50' },
                      '& .chakra-text': { color: o ? ''.concat(t, '.400') : n ? 'gray.900' : 'gray.50' }
                    }
                  }
                }
              };
            })(t, i, _, B, M, 'expanded' === u, !!r && O),
            z = Object(o.useCallback)(
              D.a.debounce(function () {
                m.toggle();
              }, 250),
              [m]
            );
          return (
            Object(o.useEffect)(
              function () {
                (!_ && !B) || O || z();
              },
              [_, B, O]
            ),
            Object(o.useEffect)(
              function () {
                O && z();
              },
              [u]
            ),
            Object(he.jsxs)(Z.c, {
              width: '100%',
              spacing: 'expanded' === u ? 2 : 0,
              sx: Object(b.a)({}, D.a.merge(T.common.container, T[n].container)),
              onClick: g
                ? function () {
                    return g();
                  }
                : void 0,
              children: [
                Object(he.jsx)(Ht, {
                  'aria-label': 'collapsed' === u ? c : '',
                  'width': '100%',
                  'label': 'collapsed' === u ? c : '',
                  'isOpen': A,
                  'isDisabled': 'expanded' === u,
                  'placement': 'right',
                  'shouldWrapChildren': !0,
                  'gutter': 16,
                  'children': Object(he.jsx)(pe, {
                    to: { pathname: s || '' },
                    isFullWidth: !0,
                    isDisabled: !s || E,
                    sx: Object(b.a)({}, T.common.link),
                    children: Object(he.jsxs)(Z.a, {
                      width: '100%',
                      justifyContent: 'space-between',
                      px: 'expanded' === u ? 2 : 1,
                      py: 1,
                      spacing: 2,
                      onMouseEnter: function () {
                        return k.on();
                      },
                      onMouseLeave: function () {
                        return k.off();
                      },
                      sx: Object(b.a)({}, D.a.merge(T.common.main, T[n].main)),
                      children: [
                        Object(he.jsxs)(Z.a, {
                          width: '100%',
                          spacing: 2,
                          children: [
                            Object(he.jsx)(Se.a, {
                              as: _ || B ? d : l,
                              sx: { fontSize: ''.concat(t.fontSizes['2xl'], ' !important') }
                            }),
                            Object(he.jsx)(_e.a, {
                              in: 'expanded' === u,
                              unmountOnExit: !0,
                              delay: { enter: Nt(Bt(t.transition.duration.slow, 'ms')), exit: 0 },
                              children: Object(he.jsx)(U.a, {
                                align: 'left',
                                fontSize: 'xl',
                                fontWeight: 'semibold',
                                whiteSpace: 'nowrap',
                                children: c
                              })
                            })
                          ]
                        }),
                        r && M
                          ? Object(he.jsx)(_e.a, {
                              in: 'expanded' === u,
                              unmountOnExit: !0,
                              delay: { enter: Nt(Bt(t.transition.duration.slow, 'ms')), exit: 0 },
                              children: Object(he.jsx)(Se.a, {
                                as: Te.a,
                                sx: {
                                  fontSize: ''.concat(t.fontSizes.xl, ' !important'),
                                  transform: 'rotate('.concat(O ? '90deg' : '0deg', ')')
                                },
                                onClick: function () {
                                  return m.toggle();
                                },
                                onMouseEnter: function () {
                                  return L.on();
                                },
                                onMouseLeave: function () {
                                  return L.off();
                                }
                              })
                            })
                          : null
                      ]
                    })
                  })
                }),
                r && M
                  ? Object(he.jsx)(Be.a, {
                      in: O,
                      unmountOnExit: !0,
                      style: { width: '100%' },
                      children: Object(he.jsxs)(Z.c, {
                        width: '100%',
                        spacing: 0,
                        pl: 'expanded' === u ? 3.5 : 0,
                        pr: 'expanded' === u ? 2 : 0,
                        mb: 'expanded' === u ? 1 : 0,
                        children: [
                          'collapsed' === u
                            ? Object(he.jsx)(f.a, {
                                width: '100%',
                                height: '2px',
                                backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
                              })
                            : null,
                          r.map(function (e, t) {
                            return Object(he.jsx)(
                              Jt,
                              { label: e.label, path: e.path, isLastChild: t === r.length - 1 },
                              e.label
                            );
                          })
                        ]
                      })
                    })
                  : null
              ]
            })
          );
        },
        Ut = function (e) {
          var t = e.size,
            n = void 0 === t ? 'md' : t,
            o = Object(v.e)(),
            a = Object(J.c)().colorMode,
            i = (function (e, t) {
              var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'md';
              return {
                common: {
                  cursor: 'pointer',
                  width: 'sm' === n ? '40px' : '100px',
                  minHeight: '40px',
                  alignSelf: 'flex-start',
                  border: 'solid2',
                  borderRadius: 'sm' === n || 'md' === n ? 'base' : 'lg',
                  fontFamily: '"Pacifico", cursive',
                  fontSize: 'sm' === n ? 'lg' : 'md' === n ? '4xl' : '6xl',
                  fontWeight: 'bold',
                  lineHeight: 'sm' === n ? '20px' : 'md' === n ? '40px' : '75px',
                  textTransform: 'lowercase',
                  paddingTop: 'sm' === n ? 0.5 : 1,
                  paddingBottom: 'sm' === n ? 0.5 : 1,
                  paddingLeft: 'sm' === n ? 1 : 2,
                  paddingRight: 'sm' === n ? 1 : 2,
                  transition: [
                    'width, '
                      .concat(e.transition.duration['ultra-slow'], ' ')
                      .concat(e.transition.easing['ease-in-out']),
                    'padding, '
                      .concat(e.transition.duration['ultra-slow'], ' ')
                      .concat(e.transition.easing['ease-in-out']),
                    'font-size, '
                      .concat(e.transition.duration['ultra-slow'], ' ')
                      .concat(e.transition.easing['ease-in-out']),
                    'background-color '
                      .concat(e.transition.duration.faster, ' ')
                      .concat(e.transition.easing['ease-out']),
                    'border-color '.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    'color '.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  ]
                    .filter(function (e) {
                      return e;
                    })
                    .join(', ')
                },
                light: {
                  'backgroundColor': ''.concat(t, '.400'),
                  'borderColor': ''.concat(t, '.400'),
                  'color': 'gray.50',
                  '&:hover': {
                    backgroundColor: ''.concat(t, '.500'),
                    borderColor: ''.concat(t, '.500'),
                    color: 'gray.50'
                  }
                },
                dark: {
                  'backgroundColor': ''.concat(t, '.500'),
                  'borderColor': ''.concat(t, '.500'),
                  'color': 'gray.900',
                  '&:hover': {
                    backgroundColor: ''.concat(t, '.400'),
                    borderColor: ''.concat(t, '.400'),
                    color: 'gray.900'
                  }
                }
              };
            })(
              o,
              w(function (e) {
                return e.user.ui.theme.color;
              }),
              n
            );
          return Object(he.jsx)(ke.a, { sx: Object(b.a)({}, D.a.merge(i.common, i[a])), children: 'edb' });
        },
        qt = function (e) {
          var t = e.navItems,
            n = e.sidebarMode,
            o = Object(J.c)().colorMode,
            a = w(function (e) {
              return e.app.ui.sidebarMode;
            }),
            i = n || a;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 2,
            children: [
              Object(he.jsx)(pe, {
                to: { pathname: '/' },
                style: { alignSelf: 'flex-start' },
                children: Object(he.jsx)(Ut, { size: 'expanded' === i ? 'md' : 'sm' })
              }),
              Object(he.jsx)(f.a, {
                width: '100%',
                height: '2px',
                backgroundColor: 'light' === o ? 'gray.200' : 'gray.700'
              }),
              Object(he.jsx)(Z.c, {
                width: '100%',
                children: t.map(function (e) {
                  return Object(he.jsx)(Zt, Object(b.a)(Object(b.a)({}, e), {}, { sidebarMode: i }), e.label);
                })
              })
            ]
          });
        },
        Xt = function () {
          var e = Object(J.c)().colorMode,
            t = Object(fe.a)(),
            n = t.isOpen,
            a = t.onOpen,
            i = t.onClose,
            r = Object(ge.g)();
          return (
            Object(o.useEffect)(
              function () {
                return i();
              },
              [r]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Ee, { 'aria-label': 'Open Menu', 'icon': ye.a, 'onClick': a, 'variant': 'icon' }),
                Object(he.jsxs)(me.a, {
                  isOpen: n,
                  blockScrollOnMount: !1,
                  placement: 'left',
                  onClose: i,
                  children: [
                    Object(he.jsx)(xe.g, {}),
                    Object(he.jsx)(me.b, {
                      backgroundColor: 'light' === e ? 'gray.50' : 'gray.900',
                      children: Object(he.jsxs)(xe.b, {
                        position: 'relative',
                        py: 1,
                        px: 1,
                        children: [
                          Object(he.jsx)(Ee, {
                            'aria-label': 'Close modal?',
                            'position': 'absolute',
                            'top': 1,
                            'right': 1,
                            'icon': Ae.a,
                            'onClick': function () {
                              return i();
                            },
                            'variant': 'icon'
                          }),
                          Object(he.jsx)(qt, { navItems: be, sidebarMode: 'expanded' })
                        ]
                      })
                    })
                  ]
                })
              ]
            })
          );
        },
        Kt = n(567),
        $t = n(518),
        en = n(580),
        tn = n(511),
        nn = n(512),
        on = n(513),
        an = n(514),
        rn = n(515),
        cn = n(516),
        sn = function () {
          var e = Object(J.c)().colorMode,
            t = Object(fe.a)(),
            n = t.isOpen,
            a = t.onOpen,
            i = t.onClose,
            c = Object(r.b)(),
            s = Object(ge.g)(),
            l = [
              { label: 'Liked', path: '/liked', iconActive: tn.a, icon: nn.a },
              { label: 'Lists', path: '/lists', iconActive: on.a, icon: an.a },
              {
                label: 'Display',
                iconActive: rn.a,
                icon: cn.a,
                onClick: function () {
                  return c(qe(!0));
                }
              }
            ];
          return (
            Object(o.useEffect)(
              function () {
                return i();
              },
              [s]
            ),
            Object(he.jsxs)(Kt.a, {
              isOpen: n,
              placement: 'bottom-end',
              gutter: 12,
              onOpen: a,
              onClose: i,
              children: [
                Object(he.jsx)(Kt.c, {
                  children: Object(he.jsx)($t.a, { cursor: 'pointer', name: 'Test User', size: 'md' })
                }),
                Object(he.jsx)(en.a, {
                  children: Object(he.jsx)(Kt.b, {
                    width: 'auto',
                    minWidth: '225px',
                    border: 'solid2',
                    borderColor: 'light' === e ? 'gray.200' : 'gray.700',
                    borderRadius: 'lg',
                    backgroundColor: 'light' === e ? 'gray.50' : 'gray.900',
                    boxShadow: 'none',
                    p: 2,
                    sx: { '&:focus': { boxShadow: 'none' } },
                    children: Object(he.jsxs)(Z.c, {
                      width: '100%',
                      spacing: 2,
                      children: [
                        Object(he.jsxs)(Z.a, {
                          width: '100%',
                          justifyContent: 'flex-start',
                          spacing: 1,
                          children: [
                            Object(he.jsx)($t.a, { cursor: 'pointer', name: 'Test User', size: 'md' }),
                            Object(he.jsx)(U.a, {
                              align: 'left',
                              color: 'light' === e ? 'gray.900' : 'gray.50',
                              fontSize: 'md',
                              fontWeight: 'semibold',
                              children: 'Test User'
                            })
                          ]
                        }),
                        Object(he.jsx)(f.a, {
                          width: '100%',
                          height: '2px',
                          border: 'solid1',
                          borderColor: 'light' === e ? 'gray.200' : 'gray.700'
                        }),
                        Object(he.jsx)(Z.c, {
                          width: '100%',
                          spacing: 1,
                          children: l.map(function (e) {
                            return Object(he.jsx)(
                              Zt,
                              Object(b.a)(Object(b.a)({}, e), {}, { sidebarMode: 'expanded' }),
                              e.label
                            );
                          })
                        })
                      ]
                    })
                  })
                })
              ]
            })
          );
        },
        ln = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(O.a)('(min-width: 1280px)'),
            a = Object(p.a)(o, 1)[0],
            i = H(t),
            r = e.width,
            c = e.left;
          return Object(he.jsxs)(Z.a, {
            width: r,
            maxWidth: r,
            position: 'fixed',
            top: '0px',
            left: c,
            zIndex: 800,
            justifyContent: a ? 'flex-end' : 'space-between',
            backgroundColor: 'light' === n ? 'gray.50' : 'gray.900',
            borderBottom: 'solid2',
            borderBottomColor: 'light' === n ? 'gray.200' : 'gray.700',
            px: 2,
            py: 1,
            sx: Object(b.a)({}, i),
            children: [a ? null : Object(he.jsx)(Xt, {}), Object(he.jsx)(sn, {})]
          });
        },
        dn = n(271),
        un = Object(o.forwardRef)(function (e, t) {
          var n = Object(v.e)(),
            o = Object(J.c)().colorMode,
            a = (function (e, t) {
              var n = t.color,
                o = void 0 === n ? 'gray' : n,
                a = t.size,
                i = void 0 === a ? 'md' : a,
                r = t.variant,
                c = void 0 === r ? 'contained' : r,
                s = t.isFullWidth,
                l = void 0 !== s && s,
                d = t.isLoading,
                u = void 0 !== d && d,
                b = t.isLight,
                g = void 0 !== b && b;
              return {
                button: {
                  back: {
                    'cursor': 'pointer',
                    'width': l ? '100%' : 'auto',
                    'height': 'auto',
                    'minWidth': 'auto',
                    'minHeight': 'auto',
                    'maxWidth': 'none',
                    'maxHeight': 'none',
                    'opacity': 1,
                    'borderStyle': 'solid',
                    'borderWidth': '0',
                    'borderRadius': 'sm' === i ? 'base' : 'md' === i ? 'md' : 'lg',
                    'padding': 0,
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:focus': { boxShadow: 'none' },
                    '&:active .button_front': {
                      transform:
                        'text' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    },
                    '& .MuiSvgIcon-root': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  front: {
                    cursor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'semibold',
                    fontSize: 'sm' === i ? 'xs' : 'md' === i ? 'sm' : 'md',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    borderStyle: 'solid',
                    borderWidth: 'text' !== c ? ('sm' !== i ? '2px 2px 0' : '1px 1px 0') : '0',
                    borderRadius: 'inherit',
                    padding:
                      'sm' === i
                        ? ''.concat(e.space[0.75], ' ').concat(e.space[1.5])
                        : 'md' === i
                        ? ''.concat(e.space[1], ' ').concat(e.space[2])
                        : ''.concat(e.space[1.5], ' ').concat(e.space[3]),
                    transform: 'text' !== c ? 'translateY('.concat('sm' !== i ? '-4px' : '-3px', ')') : 'none',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  disabled: {
                    'cursor': 'not-allowed',
                    'opacity': u ? 1 : 0.5,
                    '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                      { '& .button_front': { opacity: 1 } },
                    '& .button_front': {
                      transform:
                        'text' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    },
                    '&:hover .button_front': {
                      cursor: 'not-allowed',
                      opacity: u ? 1 : 0.5,
                      transform:
                        'text' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    },
                    '&:active .button_front': {
                      cursor: 'not-allowed',
                      opacity: u ? 1 : 0.5,
                      transform:
                        'text' !== c
                          ? 'translateY('.concat('contained' === c ? '0px' : 'sm' !== i ? '-2px' : '-1px', ')')
                          : 'none'
                    }
                  },
                  icon: {
                    display: 'block',
                    fontSize: ''.concat(
                      'sm' === i ? e.fontSizes.sm : 'md' === i ? e.fontSizes.md : e.fontSizes.lg,
                      ' !important'
                    )
                  }
                },
                light: {
                  back: {
                    contained: {
                      'backgroundColor': ''.concat(o, '.').concat(g ? 400 : 600),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 400 : 600),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 300 : 500),
                          backgroundColor: ''.concat(o, '.').concat(g ? 300 : 500),
                          color: 'gray.50'
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 400 : 600),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 300 : 500),
                          backgroundColor: ''.concat(o, '.').concat(g ? 300 : 500),
                          color: 'gray.50'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': ''.concat(o, '.').concat(g ? 200 : 400),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 300 : 500),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: ''.concat(o, '.').concat(g ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 300 : 500),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: ''.concat(o, '.').concat(g ? 300 : 500)
                        }
                      }
                    },
                    text: {
                      'backgroundColor': 'transparent',
                      'borderColor': 'transparent',
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        'borderColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(g ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        'borderColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(g ? 300 : 500)
                        }
                      }
                    }
                  },
                  front: {
                    contained: {
                      borderColor: ''.concat(o, '.').concat(g ? 200 : 400),
                      backgroundColor: ''.concat(o, '.').concat(g ? 200 : 400),
                      color: 'gray.50'
                    },
                    outlined: {
                      borderColor: ''.concat(o, '.').concat(g ? 200 : 400),
                      backgroundColor: 'gray.50',
                      color: ''.concat(o, '.').concat(g ? 200 : 400)
                    },
                    text: {
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                      color: ''.concat(o, '.').concat(g ? 200 : 400)
                    }
                  },
                  disabled: {
                    contained: {
                      'backgroundColor': 'gray.'.concat(g ? 400 : 600),
                      '& .button_front': {
                        borderColor: 'gray.'.concat(g ? 200 : 400),
                        backgroundColor: 'gray.'.concat(g ? 200 : 400),
                        color: 'gray.50'
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(g ? 400 : 600),
                          '& .button_front': {
                            borderColor: 'gray.'.concat(g ? 300 : 500),
                            backgroundColor: 'gray.'.concat(g ? 300 : 500),
                            color: 'gray.50'
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(g ? 400 : 600),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 300 : 500),
                          backgroundColor: 'gray.'.concat(g ? 300 : 500),
                          color: 'gray.50'
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(g ? 400 : 600),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 300 : 500),
                          backgroundColor: 'gray.'.concat(g ? 300 : 500),
                          color: 'gray.50'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': 'gray.'.concat(g ? 200 : 400),
                      '& .button_front': {
                        borderColor: 'gray.'.concat(g ? 200 : 400),
                        backgroundColor: 'gray.50',
                        color: 'gray.'.concat(g ? 200 : 400)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(g ? 300 : 500),
                          '& .button_front': {
                            borderColor: 'gray.'.concat(g ? 300 : 500),
                            backgroundColor: 'gray.50',
                            color: 'gray.'.concat(g ? 300 : 500)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(g ? 300 : 500),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: 'gray.'.concat(g ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(g ? 300 : 500),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: 'gray.'.concat(g ? 300 : 500)
                        }
                      }
                    },
                    text: {
                      'backgroundColor': 'transparent',
                      '& .button_front': {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        color: 'gray.'.concat(g ? 200 : 400)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'transparent',
                          '& .button_front': {
                            borderColor: 'transparent',
                            backgroundColor: 'transparent',
                            color: 'gray.'.concat(g ? 300 : 500)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(g ? 300 : 500)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(g ? 300 : 500)
                        }
                      }
                    }
                  }
                },
                dark: {
                  back: {
                    contained: {
                      'backgroundColor': ''.concat(o, '.').concat(g ? 500 : 300),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 500 : 300),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 600 : 400),
                          backgroundColor: ''.concat(o, '.').concat(g ? 600 : 400),
                          color: 'gray.900'
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 500 : 300),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 600 : 400),
                          backgroundColor: ''.concat(o, '.').concat(g ? 600 : 400),
                          color: 'gray.900'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': ''.concat(o, '.').concat(g ? 700 : 500),
                      '&:hover': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 600 : 400),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: ''.concat(o, '.').concat(g ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': ''.concat(o, '.').concat(g ? 600 : 400),
                        '& .button_front': {
                          borderColor: ''.concat(o, '.').concat(g ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: ''.concat(o, '.').concat(g ? 600 : 400)
                        }
                      }
                    },
                    text: {
                      'backgroundColor': 'transparent',
                      'borderColor': 'transparent',
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        'borderColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(g ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        'borderColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: ''.concat(o, '.').concat(g ? 600 : 400)
                        }
                      }
                    }
                  },
                  front: {
                    contained: {
                      borderColor: ''.concat(o, '.').concat(g ? 700 : 500),
                      backgroundColor: ''.concat(o, '.').concat(g ? 700 : 500),
                      color: 'gray.900'
                    },
                    outlined: {
                      borderColor: ''.concat(o, '.').concat(g ? 700 : 500),
                      backgroundColor: 'gray.900',
                      color: ''.concat(o, '.').concat(g ? 700 : 500)
                    },
                    text: {
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                      color: ''.concat(o, '.').concat(g ? 700 : 500)
                    }
                  },
                  disabled: {
                    contained: {
                      'backgroundColor': 'gray.'.concat(g ? 500 : 300),
                      '& .button_front': {
                        borderColor: 'gray.'.concat(g ? 700 : 500),
                        backgroundColor: 'gray.'.concat(g ? 700 : 500),
                        color: 'gray.900'
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(g ? 500 : 300),
                          '& .button_front': {
                            borderColor: 'gray.'.concat(g ? 600 : 400),
                            backgroundColor: 'gray.'.concat(g ? 600 : 400),
                            color: 'gray.900'
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(g ? 500 : 300),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 600 : 400),
                          backgroundColor: 'gray.'.concat(g ? 600 : 400),
                          color: 'gray.900'
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(g ? 500 : 300),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 600 : 400),
                          backgroundColor: 'gray.'.concat(g ? 600 : 400),
                          color: 'gray.900'
                        }
                      }
                    },
                    outlined: {
                      'backgroundColor': 'gray.'.concat(g ? 700 : 500),
                      '& .button_front': {
                        borderColor: 'gray.'.concat(g ? 700 : 500),
                        backgroundColor: 'gray.900',
                        color: 'gray.'.concat(g ? 700 : 500)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'gray.'.concat(g ? 600 : 400),
                          '& .button_front': {
                            borderColor: 'gray.'.concat(g ? 600 : 400),
                            backgroundColor: 'gray.900',
                            color: 'gray.'.concat(g ? 600 : 400)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'gray.'.concat(g ? 600 : 400),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: 'gray.'.concat(g ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'gray.'.concat(g ? 600 : 400),
                        '& .button_front': {
                          borderColor: 'gray.'.concat(g ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: 'gray.'.concat(g ? 600 : 400)
                        }
                      }
                    },
                    text: {
                      'backgroundColor': 'transparent',
                      '& .button_front': {
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        color: 'gray.'.concat(g ? 700 : 500)
                      },
                      '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                        {
                          'backgroundColor': 'transparent',
                          '& .button_front': {
                            borderColor: 'transparent',
                            backgroundColor: 'transparent',
                            color: 'gray.'.concat(g ? 600 : 400)
                          }
                        },
                      '&:hover': {
                        'backgroundColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(g ? 600 : 400)
                        }
                      },
                      '&:active': {
                        'backgroundColor': 'transparent',
                        '& .button_front': {
                          borderColor: 'transparent',
                          backgroundColor: 'transparent',
                          color: 'gray.'.concat(g ? 600 : 400)
                        }
                      }
                    }
                  }
                }
              };
            })(n, e),
            i = D.a.omit(e, 'isLight'),
            r = i.children,
            c = i.colorMode,
            s = i.leftIcon,
            l = i.rightIcon,
            d = i.isDisabled,
            u = void 0 !== d && d,
            g = i.isFullWidth,
            j = void 0 !== g && g,
            h = i.isLoading,
            p = void 0 !== h && h,
            O = i.size,
            f = void 0 === O ? 'md' : O,
            m = i.variant,
            x = void 0 === m ? 'contained' : m,
            y = Object(je.a)(i, [
              'children',
              'colorMode',
              'leftIcon',
              'rightIcon',
              'isDisabled',
              'isFullWidth',
              'isLoading',
              'size',
              'variant'
            ]),
            A = c || o,
            w = function () {
              switch (f) {
                case 'sm':
                  return 0.5;
                case 'lg':
                  return 1.5;
                default:
                  return 1;
              }
            };
          return Object(he.jsx)(
            dn.a,
            Object(b.a)(
              Object(b.a)({}, y),
              {},
              {
                ref: t,
                isDisabled: p || u,
                isFullWidth: j,
                variant: 'unstyled',
                sx: Object(b.a)({}, D.a.merge(a.button.back, a[A].back[x])),
                _disabled: Object(b.a)({}, D.a.merge(a.button.disabled, a[A].disabled[x])),
                children: Object(he.jsx)(ke.a, {
                  className: 'button_front',
                  sx: Object(b.a)({}, D.a.merge(a.button.front, a[A].front[x])),
                  children: p
                    ? Object(he.jsx)(Ce.a, {
                        thickness: 'sm' === f ? '2px' : 'md' === f ? '3px' : '4px',
                        size: f,
                        speed: n.transition.duration.slow,
                        sx: Object(b.a)({}, D.a.merge(a.button.icon))
                      })
                    : Object(he.jsxs)(he.Fragment, {
                        children: [
                          s
                            ? Object(he.jsx)(Se.a, {
                                as: s,
                                mr: r ? w() : 0,
                                sx: Object(b.a)({}, D.a.merge(a.button.icon))
                              })
                            : null,
                          r,
                          l
                            ? Object(he.jsx)(Se.a, {
                                as: l,
                                ml: r ? w() : 0,
                                sx: Object(b.a)({}, D.a.merge(a.button.icon))
                              })
                            : null
                        ]
                      })
                })
              }
            )
          );
        }),
        bn = un,
        gn = n(253),
        jn = n.n(gn),
        hn = n(34),
        pn = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            a = Object(O.a)('(max-width: 600px)'),
            i = Object(p.a)(a, 1)[0],
            r = e.children,
            c = e.actions,
            s = e.title,
            l = e.colorMode,
            d = e.isConfirm,
            u = void 0 !== d && d,
            g = e.isOpen,
            j = e.onClose,
            h = e.size,
            f = Object(je.a)(e, [
              'children',
              'actions',
              'title',
              'colorMode',
              'isConfirm',
              'isOpen',
              'onClose',
              'size'
            ]),
            m = Object(Le.a)(),
            x = Object(p.a)(m, 2),
            y = x[0],
            A = x[1],
            w = l || n,
            k = ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out']);
          return (
            Object(hn.d)(
              function () {
                return A.off();
              },
              g ? null : 1e3
            ),
            Object(o.useEffect)(
              function () {
                g && A.on();
              },
              [g]
            ),
            y
              ? Object(he.jsxs)(
                  xe.a,
                  Object(b.a)(
                    Object(b.a)({}, f),
                    {},
                    {
                      isOpen: g,
                      onClose: j,
                      blockScrollOnMount: !0,
                      preserveScrollBarGap: !0,
                      motionPreset: 'scale',
                      scrollBehavior: 'inside',
                      size: i && !u ? 'full' : h,
                      children: [
                        Object(he.jsx)(xe.g, {}),
                        Object(he.jsxs)(xe.c, {
                          backgroundColor: 'light' === w ? 'gray.50' : 'gray.900',
                          borderRadius: 'full' === h || (i && !u) ? 'none' : 'xl',
                          m: i && u ? 2 : 0,
                          sx: { transition: k },
                          children: [
                            Object(he.jsx)(xe.f, {
                              px: 2,
                              py: 1.25,
                              borderBottom: 'solid2',
                              borderBottomColor: 'light' === w ? 'gray.200' : 'gray.700',
                              sx: { transition: k },
                              children: Object(he.jsxs)(Z.a, {
                                justifyContent: 'space-between',
                                children: [
                                  'string' !== typeof s
                                    ? s
                                    : Object(he.jsx)(U.a, {
                                        align: 'left',
                                        fontSize: 'xl',
                                        fontWeight: 'semibold',
                                        color: 'light' === w ? 'gray.900' : 'gray.50',
                                        children: s
                                      }),
                                  Object(he.jsx)(Ee, {
                                    'aria-label': 'Close modal?',
                                    'colorMode': w,
                                    'icon': jn.a,
                                    'onClick': function () {
                                      return j();
                                    },
                                    'variant': 'icon'
                                  })
                                ]
                              })
                            }),
                            Object(he.jsx)(xe.b, { p: 0, children: r }),
                            c
                              ? Object(he.jsxs)(xe.e, {
                                  justifyContent: 'space-between',
                                  p: 2,
                                  borderTop: 'solid2',
                                  borderTopColor: 'light' === w ? 'gray.200' : 'gray.700',
                                  sx: { transition: k },
                                  children: [
                                    Object(he.jsx)(bn, {
                                      colorMode: w,
                                      onClick: function () {
                                        return j();
                                      },
                                      size: 'sm',
                                      variant: 'outlined',
                                      children: 'Cancel'
                                    }),
                                    c
                                  ]
                                })
                              : null
                          ]
                        })
                      ]
                    }
                  )
                )
              : null
          );
        },
        vn = function () {
          var e,
            t = Object(J.c)().colorMode,
            n = Object(r.b)(),
            o = w(function (e) {
              return e.modals.ui.descriptionModal;
            }),
            a = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(pn, {
            title: ''.concat(o.mediaItem ? '"'.concat(o.mediaItem.title, '"') : 'Unknown', ' description'),
            actions: Object(he.jsx)(pe, {
              to: {
                pathname: '/'
                  .concat(Pe.mediaType, '/')
                  .concat(null === (e = o.mediaItem) || void 0 === e ? void 0 : e.id)
              },
              children: Object(he.jsx)(bn, {
                color: Wt(a),
                size: 'sm',
                children: 'View '.concat(o.mediaItem ? '"'.concat(o.mediaItem.title, '"') : '')
              })
            }),
            isOpen: o.open,
            onClose: function () {
              return n(Ze(Object(b.a)({}, Pe)));
            },
            isCentered: !0,
            size: '2xl',
            children: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: 'lg',
              fontWeight: 'normal',
              px: 3,
              py: 2,
              children: o.mediaItem ? o.mediaItem.description : 'N/A'
            })
          });
        },
        On = n(25),
        fn = n(519),
        mn = n(520),
        xn = function (e) {
          var t = e.colorMode;
          return Object(he.jsx)(f.a, {
            width: '100%',
            height: '2px',
            backgroundColor: 'light' === t ? 'gray.200' : 'gray.700'
          });
        },
        yn = function (e) {
          var t = e.footer,
            n = Object(je.a)(e, ['footer']);
          return Object(he.jsx)(
            Z.a,
            Object(b.a)(
              Object(b.a)({}, n),
              {},
              { width: '100%', alignItems: 'stretch', justifyContent: 'stretch', children: t }
            )
          );
        },
        An = function (e) {
          var t = e.actions,
            n = e.colorMode,
            o = e.title,
            a = Object(je.a)(e, ['actions', 'colorMode', 'title']);
          return Object(he.jsxs)(
            Z.a,
            Object(b.a)(
              Object(b.a)({}, a),
              {},
              {
                width: '100%',
                justifyContent: 'space-between',
                children: [
                  o
                    ? 'string' === typeof o
                      ? Object(he.jsx)(U.a, {
                          align: 'left',
                          color: 'light' === n ? 'gray.400' : 'gray.500',
                          fontSize: 'lg',
                          fontWeight: 'semibold',
                          children: o
                        })
                      : o
                    : null,
                  t || null
                ]
              }
            )
          );
        },
        wn = function (e) {
          var t,
            n,
            o = Object(v.e)(),
            a = Object(J.c)().colorMode,
            i = D.a.omit(e, ['color', 'isFullWidth']),
            r = i.children,
            c = i.box,
            s = i.colorMode,
            l = i.hasDivider,
            d = void 0 === l || l,
            u = i.variant,
            g = void 0 === u ? 'outlined' : u,
            j = Object(je.a)(i, ['children', 'box', 'colorMode', 'hasDivider', 'variant']),
            h = (function (e, t) {
              var n = t.color,
                o = void 0 === n ? 'gray' : n,
                a = t.isFullWidth,
                i = void 0 !== a && a;
              return {
                card: {
                  outlined: {
                    width: i ? '100%' : 'auto',
                    height: 'auto',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    borderRadius: 'lg',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  transparent: {
                    width: i ? '100%' : 'auto',
                    height: 'auto',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  }
                },
                light: {
                  outlined: {
                    'backgroundColor': 'transparent',
                    'borderColor': 'gray' === o ? 'gray.200' : ''.concat(o, '.400'),
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderColor: 'gray' === o ? 'gray.200' : ''.concat(o, '.400')
                    },
                    '&:active': {
                      backgroundColor: 'transparent',
                      borderColor: 'gray' === o ? 'gray.200' : ''.concat(o, '.400')
                    }
                  },
                  transparent: {
                    'backgroundColor': 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    '&:active': { backgroundColor: 'transparent' }
                  }
                },
                dark: {
                  outlined: {
                    'backgroundColor': 'transparent',
                    'borderColor': 'gray' === o ? 'gray.700' : ''.concat(o, '.500'),
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderColor: 'gray' === o ? 'gray.700' : ''.concat(o, '.500')
                    },
                    '&:active': {
                      backgroundColor: 'transparent',
                      borderColor: 'gray' === o ? 'gray.700' : ''.concat(o, '.500')
                    }
                  },
                  transparent: {
                    'backgroundColor': 'transparent',
                    '&:hover': { backgroundColor: 'transparent' },
                    '&:active': { backgroundColor: 'transparent' }
                  }
                }
              };
            })(o, e),
            p = s || a;
          return Object(he.jsxs)(
            Z.c,
            Object(b.a)(
              Object(b.a)({}, j),
              {},
              {
                divider: d ? Object(he.jsx)(xn, { colorMode: p }) : void 0,
                spacing: 0,
                sx: Object(b.a)({}, D.a.merge(h.card[g], h[p][g])),
                children: [
                  (null === (t = r.header) || void 0 === t ? void 0 : t.title) ||
                  (null === (n = r.header) || void 0 === n ? void 0 : n.actions)
                    ? Object(he.jsx)(
                        An,
                        Object(b.a)(
                          Object(b.a)({}, null === c || void 0 === c ? void 0 : c.header),
                          {},
                          { actions: r.header.actions, colorMode: p, title: r.header.title }
                        )
                      )
                    : null,
                  Object(he.jsx)(
                    f.a,
                    Object(b.a)(
                      Object(b.a)({}, null === c || void 0 === c ? void 0 : c.body),
                      {},
                      { width: '100%', children: r.body }
                    )
                  ),
                  r.footer
                    ? Object(he.jsx)(
                        yn,
                        Object(b.a)(
                          Object(b.a)({}, null === c || void 0 === c ? void 0 : c.footer),
                          {},
                          { footer: r.footer }
                        )
                      )
                    : null
                ]
              }
            )
          );
        },
        kn = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = (function (e, t) {
              var n = t.color,
                o = void 0 === n ? 'gray' : n,
                a = t.isFullWidth,
                i = void 0 !== a && a,
                r = t.isLight,
                c = void 0 !== r && r,
                s = t.isClickable,
                l = void 0 === s || s;
              return {
                card: {
                  back: {
                    'cursor': 'pointer',
                    'width': i ? '100%' : 'auto',
                    'height': 'auto',
                    'opacity': 1,
                    'border': 'none',
                    'borderRadius': 'lg',
                    'padding': 0,
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:focus': { boxShadow: 'none' },
                    '&:active .card_front': { transform: l ? 'translateY(0)' : 'translateY(-2px)' },
                    '& .MuiSvgIcon-root': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  front: {
                    cursor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'stretch',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    borderRadius: 'inherit',
                    transform: 'translateY(-2px)',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  disabled: {
                    'cursor': 'not-allowed',
                    'opacity': 0.5,
                    '& .card_front': { opacity: 1, transform: 'translateY(0)' },
                    '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                      { '& .card_front': { opacity: 1 } },
                    '&:hover .card_front': { cursor: 'not-allowed', opacity: 1, transform: 'translateY(0)' },
                    '&:active .card_front': { cursor: 'not-allowed', opacity: 1, transform: 'translateY(0)' }
                  }
                },
                light: {
                  back: {
                    'backgroundColor': ''.concat(o, '.').concat(c ? 200 : 400),
                    '&:hover': {
                      'backgroundColor': ''.concat(o, '.').concat(c ? 300 : 500),
                      '& .card_front': {
                        borderColor: ''.concat(o, '.').concat(c ? 300 : 500),
                        backgroundColor: 'gray.50',
                        color: ''.concat(o, '.').concat(c ? 300 : 500)
                      }
                    },
                    '&:active': {
                      'backgroundColor': ''.concat(o, '.').concat(c ? 300 : 500),
                      '& .card_front': {
                        borderColor: ''.concat(o, '.').concat(c ? 300 : 500),
                        backgroundColor: 'gray.50',
                        color: ''.concat(o, '.').concat(c ? 300 : 500)
                      }
                    }
                  },
                  front: {
                    borderColor: ''.concat(o, '.').concat(c ? 200 : 400),
                    backgroundColor: 'gray.50',
                    color: ''.concat(o, '.').concat(c ? 200 : 400)
                  },
                  disabled: {
                    'backgroundColor': 'gray.50',
                    '& .card_front': {
                      borderColor: 'gray.'.concat(c ? 200 : 400),
                      backgroundColor: 'gray.50',
                      color: 'gray.'.concat(c ? 200 : 400)
                    },
                    '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                      {
                        'backgroundColor': 'gray.50',
                        '& .card_front': {
                          borderColor: 'gray.'.concat(c ? 300 : 500),
                          backgroundColor: 'gray.50',
                          color: 'gray.'.concat(c ? 300 : 500)
                        }
                      },
                    '&:hover': {
                      'backgroundColor': 'gray.50',
                      '& .card_front': {
                        borderColor: 'gray.'.concat(c ? 300 : 500),
                        backgroundColor: 'gray.50',
                        color: 'gray.'.concat(c ? 300 : 500)
                      }
                    },
                    '&:active': {
                      'backgroundColor': 'gray.50',
                      '& .card_front': {
                        borderColor: 'gray.'.concat(c ? 300 : 500),
                        backgroundColor: 'gray.50',
                        color: 'gray.'.concat(c ? 300 : 500)
                      }
                    }
                  }
                },
                dark: {
                  back: {
                    'backgroundColor': ''.concat(o, '.').concat(c ? 700 : 500),
                    '&:hover': {
                      'backgroundColor': ''.concat(o, '.').concat(c ? 600 : 400),
                      '& .card_front': {
                        borderColor: ''.concat(o, '.').concat(c ? 600 : 400),
                        backgroundColor: 'gray.900',
                        color: ''.concat(o, '.').concat(c ? 600 : 400)
                      }
                    },
                    '&:active': {
                      'backgroundColor': ''.concat(o, '.').concat(c ? 600 : 400),
                      '& .card_front': {
                        borderColor: ''.concat(o, '.').concat(c ? 600 : 400),
                        backgroundColor: 'gray.900',
                        color: ''.concat(o, '.').concat(c ? 600 : 400)
                      }
                    }
                  },
                  front: {
                    borderColor: ''.concat(o, '.').concat(c ? 700 : 500),
                    backgroundColor: 'gray.900',
                    color: ''.concat(o, '.').concat(c ? 700 : 500)
                  },
                  disabled: {
                    'backgroundColor': 'transparent',
                    '& .card_front': {
                      borderColor: 'gray.'.concat(c ? 700 : 500),
                      backgroundColor: 'gray.900',
                      color: 'gray.'.concat(c ? 700 : 500)
                    },
                    '&:hover[disabled], :hover[aria-disabled=true], :hover[data-disabled], [data-hover][data-disabled]':
                      {
                        'backgroundColor': 'transparent',
                        '& .card_front': {
                          borderColor: 'gray.'.concat(c ? 600 : 400),
                          backgroundColor: 'gray.900',
                          color: 'gray.'.concat(c ? 600 : 400)
                        }
                      },
                    '&:hover': {
                      'backgroundColor': 'transparent',
                      '& .card_front': {
                        borderColor: 'gray.'.concat(c ? 600 : 400),
                        backgroundColor: 'gray.900',
                        color: 'gray.'.concat(c ? 600 : 400)
                      }
                    },
                    '&:active': {
                      'backgroundColor': 'transparent',
                      '& .card_front': {
                        borderColor: 'gray.'.concat(c ? 600 : 400),
                        backgroundColor: 'gray.900',
                        color: 'gray.'.concat(c ? 600 : 400)
                      }
                    }
                  }
                }
              };
            })(t, e),
            a = D.a.omit(e, ['color', 'isFullWidth', 'isLight', 'isClickable']),
            i = a.children,
            r = a.colorMode,
            c = a.isDisabled,
            s = void 0 !== c && c,
            l = Object(je.a)(a, ['children', 'colorMode', 'isDisabled']),
            d = r || n;
          return Object(he.jsx)(f.a, {
            sx: s
              ? Object(b.a)({}, D.a.merge(o.card.back, o.card.disabled, o[d].back, o[d].disabled))
              : Object(b.a)({}, D.a.merge(o.card.back, o[d].back)),
            children: Object(he.jsx)(
              f.a,
              Object(b.a)(
                Object(b.a)({}, l),
                {},
                { className: 'card_front', sx: Object(b.a)({}, D.a.merge(o.card.front, o[d].front)), children: i }
              )
            )
          });
        },
        Cn = function (e) {
          var t = Object(v.e)(),
            n = e.label,
            o = e.value,
            a = e.icon,
            i = e.color,
            r = e.background,
            c = e.isActive,
            s = void 0 !== c && c,
            l = e.onClick;
          return Object(he.jsx)(kn, {
            color: s ? Wt(i) : 'gray',
            colorMode: r,
            isFullWidth: !0,
            onClick: l
              ? function () {
                  return l(o);
                }
              : void 0,
            p: 2,
            children: Object(he.jsxs)(Z.a, {
              width: '100%',
              justifyContent: 'center',
              spacing: 1,
              children: [
                Object(he.jsx)(Se.a, { as: a, sx: { fontSize: ''.concat(t.fontSizes['2xl'], ' !important') } }),
                Object(he.jsx)(U.a, {
                  align: 'center',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                  textTransform: 'uppercase',
                  children: n
                })
              ]
            })
          });
        },
        Sn = [
          { label: 'Light', value: 'light', icon: fn.a },
          { label: 'Dark', value: 'dark', icon: mn.a }
        ],
        Dn = function (e) {
          var t = e.form,
            n = t.watch('color');
          return Object(he.jsx)(On.a, {
            control: t.control,
            name: 'background',
            render: function (e) {
              var o = e.field.value;
              return Object(he.jsx)(wn, {
                box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
                colorMode: o,
                isFullWidth: !0,
                px: 2,
                pt: 1.5,
                pb: 2,
                children: {
                  header: { title: 'Background' },
                  body: Object(he.jsx)(Z.a, {
                    width: '100%',
                    spacing: 2,
                    children: Sn.map(function (e) {
                      return Object(he.jsx)(
                        Cn,
                        Object(b.a)(
                          Object(b.a)({}, e),
                          {},
                          {
                            color: n,
                            background: o,
                            isActive: o === e.value,
                            onClick: function () {
                              return t.setValue('background', e.value, { shouldDirty: !0 });
                            }
                          }
                        ),
                        e.value
                      );
                    })
                  })
                }
              });
            }
          });
        },
        En = n(582),
        Ln = n(116),
        _n = n.n(Ln),
        Bn = function (e) {
          var t = Object(v.e)(),
            n = e.label,
            o = e.value,
            a = e.background,
            i = e.isActive,
            r = e.onClick,
            c = Object(Le.a)(),
            s = Object(p.a)(c, 2),
            l = s[0],
            d = s[1];
          return Object(he.jsx)(Ht, {
            'aria-label': i ? 'Current color: '.concat(n) : 'Set color to '.concat(n),
            'colorMode': a,
            'isOpen': l,
            'isDisabled': i,
            'label': i ? 'Current color: '.concat(n) : 'Set color to '.concat(n),
            'placement': 'top',
            'shouldWrapChildren': !0,
            'gutter': 8,
            'children': Object(he.jsx)(kn, {
              color: i ? Wt(o) : 'gray',
              colorMode: a,
              onClick:
                !i && r
                  ? function () {
                      return r(o);
                    }
                  : void 0,
              onMouseEnter: function () {
                return d.on();
              },
              onMouseLeave: function () {
                return d.off();
              },
              p: 2,
              children: Object(he.jsxs)(Z.c, {
                width: '100%',
                spacing: 0.75,
                children: [
                  Object(he.jsx)(f.a, {
                    sx: {
                      width: t.fontSizes['6xl'],
                      height: t.fontSizes['6xl'],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: ''.concat(o, '.400'),
                      borderRadius: 'full'
                    },
                    children: Object(he.jsx)(_e.a, {
                      in: i,
                      unmountOnExit: !0,
                      children: Object(he.jsx)(Se.a, {
                        as: _n.a,
                        sx: {
                          fontSize: ''.concat(t.fontSizes['4xl'], ' !important'),
                          color: 'light' === a ? 'gray.50' : 'gray.900'
                        }
                      })
                    })
                  }),
                  Object(he.jsx)(U.a, { align: 'center', fontSize: 'sm', fontWeight: 'medium', children: n })
                ]
              })
            })
          });
        },
        Mn = [
          { label: 'Orange', value: 'orange' },
          { label: 'Yellow', value: 'yellow' },
          { label: 'Green', value: 'green' },
          { label: 'Teal', value: 'teal' },
          { label: 'Blue', value: 'blue' },
          { label: 'Cyan', value: 'cyan' },
          { label: 'Purple', value: 'purple' },
          { label: 'Pink', value: 'pink' }
        ],
        Tn = function (e) {
          var t = e.form,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = t.watch('background');
          return Object(he.jsx)(On.a, {
            control: t.control,
            name: 'color',
            render: function (e) {
              var n = e.field.value;
              return Object(he.jsx)(wn, {
                box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
                colorMode: a,
                isFullWidth: !0,
                px: 2,
                pt: 1.5,
                pb: 2,
                children: {
                  header: { title: 'Color' },
                  body: Object(he.jsx)(En.a, {
                    width: '100%',
                    columns: o ? 2 : 4,
                    spacing: 2,
                    children: Mn.map(function (e, o) {
                      return Object(he.jsx)(
                        Bn,
                        Object(b.a)(
                          Object(b.a)({}, e),
                          {},
                          {
                            background: a,
                            isActive: e.value === n,
                            onClick: function () {
                              return t.setValue('color', e.value, { shouldDirty: !0 });
                            }
                          }
                        ),
                        o
                      );
                    })
                  })
                }
              });
            }
          });
        },
        zn = function () {
          var e = Object(J.c)().toggleColorMode,
            t = Object(r.b)(),
            n = w(function (e) {
              return e.modals.ui.isDisplayModalOpen;
            }),
            o = w(function (e) {
              return e.user.ui.theme;
            }),
            a = Object(On.e)({ defaultValues: Object(b.a)({}, o) }),
            i = a.watch('color'),
            c = a.watch('background'),
            s = Object(On.f)({ control: a.control }),
            l = s.isDirty,
            d = s.dirtyFields,
            u = function () {
              a.reset(Object(b.a)({}, o)), t(qe(!1));
            };
          return Object(he.jsx)(pn, {
            title: 'Edit Application Theme',
            actions: Object(he.jsx)(bn, {
              colorMode: c,
              color: Wt(i),
              isDisabled: !l,
              onClick: a.handleSubmit(function (n) {
                return (
                  (o = n),
                  u(),
                  t(Xe(!0)),
                  t(nt(o)),
                  a.reset(Object(b.a)({}, o)),
                  d.background && e(),
                  void setTimeout(function () {
                    return t(Xe(!1));
                  }, 5e3)
                );
                var o;
              }),
              size: 'sm',
              children: 'Save'
            }),
            colorMode: c,
            isOpen: n,
            onClose: u,
            isCentered: !0,
            size: '2xl',
            children: Object(he.jsxs)(Z.c, {
              spacing: 2,
              p: 2,
              children: [Object(he.jsx)(Tn, { form: a }), Object(he.jsx)(Dn, { form: a })]
            })
          });
        },
        In = n(4),
        Fn = n(134),
        Qn = n(521),
        Nn = n(522),
        Yn = n(523),
        Wn = n(104),
        Pn = function (e) {
          var t = e.renderButton,
            n = e.title,
            o = e.description,
            a = e.isOpen,
            i = void 0 !== a && a,
            r = e.onClose;
          return Object(he.jsx)(pn, {
            title: n,
            actions: t,
            isConfirm: !0,
            isOpen: i,
            isCentered: !0,
            onClose: r,
            size: 'md',
            children: Object(he.jsx)(U.a, { align: 'left', fontSize: 'md', fontWeight: 'normal', p: 2, children: o })
          });
        },
        Rn = n(60),
        Gn = { label: '', description: '' },
        Vn = Rn.b().shape({ label: Rn.c().required().label('Label'), description: Rn.c().label('Description') }),
        Hn = [
          'Action Movies',
          'DC Movies',
          'Leonardo DiCaprio',
          'Classics',
          'Comedy',
          'Mafia Movies & TV Shows',
          'Jennifer Lawrence',
          'Johnny Depp',
          'Angelina Jolie'
        ],
        Jn = Hn[Math.floor(Math.random() * Hn.length)],
        Zn = function (e) {
          var t = e.isOpen,
            n = e.onClose,
            o = Object(fe.a)(),
            a = o.isOpen,
            i = o.onOpen,
            c = o.onClose,
            s = Object(r.b)(),
            l = w(function (e) {
              return e.user.data.lists;
            }),
            d = w(function (e) {
              return e.user.ui.theme.color;
            }),
            u = Object(On.e)({ defaultValues: Gn, reValidateMode: 'onSubmit', resolver: Object(Wn.a)(Vn) }),
            g = Object(On.f)({ control: u.control }).isDirty,
            j = function (e) {
              u.reset(Object(b.a)({}, Gn)), n(e);
            };
          return Object(he.jsxs)(he.Fragment, {
            children: [
              Object(he.jsx)(pn, {
                title: 'Create a new List',
                actions: Object(he.jsx)(bn, {
                  color: Wt(d),
                  isDisabled: !g,
                  onClick: u.handleSubmit(function (e) {
                    return (function (e) {
                      var t = Object(Fe.a)();
                      s(
                        it(
                          [].concat(Object(In.a)(l), [
                            {
                              id: t,
                              label: e.label,
                              description: (null === e || void 0 === e ? void 0 : e.description) || '',
                              date: K()(new Date()).toISOString(),
                              results: { movies: [], tv: [] }
                            }
                          ])
                        )
                      ),
                        j(t);
                    })(e);
                  }),
                  size: 'sm',
                  children: 'Submit List'
                }),
                isOpen: t,
                onClose: function () {
                  g ? i() : j();
                },
                isCentered: !0,
                size: 'lg',
                children: Object(he.jsxs)(Z.c, {
                  spacing: 3,
                  p: 2,
                  children: [
                    Object(he.jsx)(On.a, {
                      control: u.control,
                      name: 'label',
                      render: function (e) {
                        var t = e.field,
                          n = t.onChange,
                          o = t.value,
                          a = t.name,
                          i = e.fieldState.error;
                        return Object(he.jsxs)(Fn.a, {
                          id: a,
                          isRequired: !0,
                          children: [
                            Object(he.jsx)(Qn.a, { fontSize: 'sm', mb: 1, children: 'Name' }),
                            Object(he.jsx)(Nn.a, {
                              autoComplete: 'off',
                              border: 'solid2',
                              errorBorderColor: 'red.400',
                              focusBorderColor: ''.concat(Wt(d), '.400'),
                              isInvalid: Boolean(i),
                              fontSize: 'md',
                              name: a,
                              placeholder: 'Try "'.concat(Jn, '"'),
                              onChange: n,
                              size: 'lg',
                              value: o,
                              px: 2,
                              _focus: { boxShadow: 'none' }
                            }),
                            Object(he.jsx)(Be.a, {
                              in: Boolean(i),
                              unmountOnExit: !0,
                              children: Object(he.jsx)(Fn.b, {
                                mt: 1,
                                children: null === i || void 0 === i ? void 0 : i.message
                              })
                            })
                          ]
                        });
                      }
                    }),
                    Object(he.jsx)(On.a, {
                      control: u.control,
                      name: 'description',
                      render: function (e) {
                        var t = e.field,
                          n = t.onChange,
                          o = t.value,
                          a = t.name,
                          i = e.fieldState.error;
                        return Object(he.jsxs)(Fn.a, {
                          id: a,
                          children: [
                            Object(he.jsx)(Qn.a, { fontSize: 'sm', mb: 1, children: 'Description (Optional)' }),
                            Object(he.jsx)(Yn.a, {
                              autoComplete: 'off',
                              border: 'solid2',
                              errorBorderColor: 'red.400',
                              focusBorderColor: ''.concat(Wt(d), '.400'),
                              isInvalid: Boolean(i),
                              fontSize: 'md',
                              name: a,
                              onChange: n,
                              size: 'lg',
                              value: o,
                              px: 2,
                              _focus: { boxShadow: 'none' }
                            }),
                            Object(he.jsx)(Be.a, {
                              in: Boolean(i),
                              unmountOnExit: !0,
                              children: Object(he.jsx)(Fn.b, {
                                mt: 1,
                                children: null === i || void 0 === i ? void 0 : i.message
                              })
                            })
                          ]
                        });
                      }
                    })
                  ]
                })
              }),
              Object(he.jsx)(Pn, {
                renderButton: Object(he.jsx)(bn, {
                  color: Wt(d),
                  onClick: function () {
                    return c(), void j();
                  },
                  size: 'sm',
                  children: 'Close'
                }),
                title: 'Unsaved data!',
                description:
                  'Are you sure you want to close the modal, the data inserted will be lost unless you save it!',
                isOpen: a,
                onClose: c
              })
            ]
          });
        },
        Un = n(524),
        qn = n(525),
        Xn = function (e) {
          var t = e.id,
            n = e.label,
            o = e.description,
            a = e.date,
            i = e.results,
            r = e.isSelected,
            c = void 0 !== r && r,
            s = e.onClick,
            l = Object(v.e)(),
            d = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(kn, {
            color: c ? Wt(d) : 'gray',
            isFullWidth: !0,
            onClick: function () {
              return s(t, c);
            },
            px: 2,
            py: 1,
            children: Object(he.jsxs)(Z.a, {
              width: '100%',
              justifyContent: 'space-between',
              spacing: 2,
              children: [
                Object(he.jsxs)(Z.c, {
                  width: 'calc(100% - 46px)',
                  alignItems: 'flex-start',
                  spacing: 0,
                  children: [
                    Object(he.jsx)(U.a, {
                      align: 'left',
                      fontSize: 'md',
                      fontWeight: 'semibold',
                      textTransform: 'capitalize',
                      children: n
                    }),
                    o && o.length > 0
                      ? Object(he.jsx)(U.a, {
                          width: 'auto',
                          maxWidth: '100%',
                          align: 'left',
                          fontSize: 'xs',
                          fontWeight: '400',
                          textTransform: 'capitalize',
                          isTruncated: !0,
                          children: o
                        })
                      : null,
                    Object(he.jsx)(U.a, {
                      align: 'left',
                      fontSize: 'xs',
                      fontWeight: '400',
                      textTransform: 'capitalize',
                      children: ''
                        .concat(
                          i.movies.length + i.tv.length > 0
                            ? ''.concat(i.movies.length + i.tv.length, ' items  \u2022 ')
                            : ''
                        )
                        .concat(i.movies.length + i.tv.length > 0 ? 'Updated' : 'Created', ' ')
                        .concat(K()(a).fromNow())
                    })
                  ]
                }),
                Object(he.jsx)(Se.a, {
                  as: c ? Un.a : qn.a,
                  sx: { fontSize: ''.concat(l.fontSizes['3xl'], ' !important') }
                })
              ]
            })
          });
        },
        Kn = function () {
          var e = Object(fe.a)(),
            t = e.isOpen,
            n = e.onOpen,
            a = e.onClose,
            i = Object(r.b)(),
            c = w(function (e) {
              return e.modals.ui.listsModal;
            }),
            s = w(function (e) {
              return e.user.data.lists;
            }),
            l = w(function (e) {
              return e.user.ui.theme.color;
            }),
            d = Object(o.useState)([]),
            u = Object(p.a)(d, 2),
            g = u[0],
            j = u[1],
            h = function (e, t) {
              j(
                t
                  ? g.filter(function (t) {
                      return t !== e;
                    })
                  : [].concat(Object(In.a)(g), [e])
              );
            },
            v = function () {
              j([]), i(Je(Object(b.a)({}, We)));
            };
          return (
            Object(o.useEffect)(
              function () {
                c.open || v();
              },
              [c.open]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(pn, {
                  title: 'Add "'.concat(c.title, '" to a list'),
                  actions:
                    g.length > 0
                      ? Object(he.jsx)(bn, {
                          color: Wt(l),
                          onClick: function () {
                            return (function () {
                              if (c.mediaItem && c.mediaItem.id && c.mediaType) {
                                var e = Object(In.a)(s);
                                g.forEach(function (t) {
                                  e = e.map(function (e) {
                                    var n = Object(b.a)({}, e.results);
                                    switch (c.mediaType) {
                                      case 'movie':
                                        var o = Object(b.a)(
                                          Object(b.a)({}, c.mediaItem),
                                          {},
                                          { dateAdded: K()(new Date()).toISOString() }
                                        );
                                        n.movies = [].concat(Object(In.a)(n.movies), [o]);
                                        break;
                                      case 'tv':
                                        var a = Object(b.a)(
                                          Object(b.a)({}, c.mediaItem),
                                          {},
                                          { dateAdded: K()(new Date()).toISOString() }
                                        );
                                        n.tv = [].concat(Object(In.a)(n.tv), [a]);
                                    }
                                    return e.id === t
                                      ? Object(b.a)(
                                          Object(b.a)({}, e),
                                          {},
                                          { date: K()(new Date()).toISOString(), results: Object(b.a)({}, n) }
                                        )
                                      : e;
                                  });
                                }),
                                  i(it(Object(In.a)(e))),
                                  v();
                              }
                            })();
                          },
                          size: 'sm',
                          children: 'Save to List'.concat(g.length > 1 ? 's' : '')
                        })
                      : Object(he.jsx)(bn, {
                          color: Wt(l),
                          onClick: function () {
                            return n();
                          },
                          size: 'sm',
                          children: 'Create a new List'
                        }),
                  isOpen: c.open,
                  onClose: function () {
                    return i(Je(Object(b.a)({}, We)));
                  },
                  isCentered: !0,
                  size: '2xl',
                  children: Object(he.jsx)(Z.c, {
                    spacing: 2,
                    p: 2,
                    children: s.map(function (e) {
                      return Object(he.jsx)(
                        Xn,
                        Object(b.a)(Object(b.a)({}, e), {}, { isSelected: g.includes(e.id), onClick: h }),
                        e.id
                      );
                    })
                  })
                }),
                Object(he.jsx)(Zn, {
                  isOpen: t,
                  onClose: function (e) {
                    a(), e && h(e, !1);
                  }
                })
              ]
            })
          );
        },
        $n = n(571),
        eo = n(508),
        to = n(526),
        no = n.p + 'static/media/blue.1d509f7b.svg',
        oo = n.p + 'static/media/cyan.c2fe5dfc.svg',
        ao = n.p + 'static/media/green.3e21cb04.svg',
        io = n.p + 'static/media/orange.dee38c41.svg',
        ro = n.p + 'static/media/pink.02d59418.svg',
        co = n.p + 'static/media/purple.f3183aac.svg',
        so = n.p + 'static/media/teal.9e1779fc.svg',
        lo = n.p + 'static/media/yellow.175e6d76.svg',
        uo = { blue: no, cyan: oo, green: ao, orange: io, pink: ro, purple: co, teal: so, yellow: lo },
        bo = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object($n.a)({ 'base': '75%', 'sm': '75%', 'md': '50%', 'lg': '50%', 'xl': '30%', '2xl': '30%' }),
            o = e.button,
            a = void 0 === o ? void 0 : o,
            i = e.hasIllustration,
            r = void 0 === i || i,
            c = e.label,
            s = e.description,
            l = e.size,
            d = void 0 === l ? 'md' : l,
            u = e.variant,
            b = void 0 === u ? 'transparent' : u,
            g = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(eo.a, {
            in: !0,
            style: { width: '100%' },
            children: Object(he.jsx)(wn, {
              isFullWidth: !0,
              variant: b,
              p: (function () {
                if (r)
                  switch (d) {
                    case 'xs':
                      return 1;
                    case 'sm':
                      return 2;
                    case 'lg':
                      return 4;
                    case 'xl':
                      return 6;
                    default:
                      return 3;
                  }
                else
                  switch (d) {
                    case 'xs':
                      return 1;
                    case 'sm':
                      return 2;
                    case 'lg':
                      return 6;
                    case 'xl':
                      return 8;
                    default:
                      return 4;
                  }
              })(),
              children: {
                body: Object(he.jsxs)(Z.c, {
                  width: '100%',
                  spacing: 2,
                  children: [
                    r
                      ? Object(he.jsx)(to.a, {
                          maxWidth: n,
                          alt: 'Empty illustration',
                          src: (function () {
                            switch (g) {
                              case 'blue':
                                return uo.blue;
                              case 'cyan':
                                return uo.cyan;
                              case 'green':
                                return uo.green;
                              case 'orange':
                                return uo.orange;
                              case 'pink':
                                return uo.pink;
                              case 'purple':
                                return uo.purple;
                              case 'teal':
                                return uo.teal;
                              case 'yellow':
                                return uo.yellow;
                              default:
                                return '';
                            }
                          })()
                        })
                      : null,
                    c || s
                      ? Object(he.jsxs)(Z.c, {
                          spacing: 0,
                          children: [
                            c
                              ? Object(he.jsx)(U.a, {
                                  align: 'center',
                                  fontSize: 'md',
                                  fontWeight: 'semibold',
                                  color: 'light' === t ? 'gray.900' : 'gray.50',
                                  children: c
                                })
                              : null,
                            s
                              ? Object(he.jsx)(U.a, {
                                  align: 'center',
                                  fontSize: 'xs',
                                  color: 'light' === t ? 'gray.400' : 'gray.500',
                                  children: s
                                })
                              : null
                          ]
                        })
                      : null,
                    a || null
                  ]
                })
              }
            })
          });
        },
        go = n(536),
        jo = n(527),
        ho = n(528),
        po = n(529),
        vo = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.activeType,
            a = e.onClose,
            i = e.onGalleryClick,
            r = Object(Le.a)(),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(Le.a)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            j = function (e) {
              e.preventDefault();
              var t = document;
              t.exitFullscreen
                ? t.exitFullscreen()
                : t.webkitExitFullscreen
                ? t.webkitExitFullscreen()
                : t.mozCancelFullScreen
                ? t.mozCancelFullScreen()
                : t.msExitFullscreen
                ? t.msExitFullscreen()
                : (console.error('Fullscreen API is not supported.'), g.on()),
                l.off();
            },
            h = [
              Object(he.jsx)(
                Ee,
                {
                  'aria-label': 'Close modal',
                  'icon': Ae.a,
                  'onClick': function (e) {
                    return (function (e) {
                      s && j(e), a();
                    })(e);
                  },
                  'variant': 'icon'
                },
                'close_button'
              ),
              Object(he.jsx)(
                Ee,
                {
                  'aria-label': 'Open Gallery',
                  'icon': jo.a,
                  'onClick': function () {
                    return i();
                  },
                  'variant': 'icon'
                },
                'gallery_button'
              ),
              b || 'video' === o
                ? null
                : Object(he.jsx)(
                    Ee,
                    {
                      'aria-label': s ? 'Exit fullscreen ' : 'Enter fullscreen',
                      'icon': s ? ho.a : po.a,
                      'onClick': s
                        ? function (e) {
                            return j(e);
                          }
                        : function (e) {
                            return (function (e) {
                              e.preventDefault();
                              var t = document.documentElement;
                              t.requestFullscreen
                                ? t.requestFullscreen()
                                : t.webkitRequestFullscreen
                                ? t.webkitRequestFullscreen()
                                : t.mozRequestFullScreen
                                ? t.mozRequestFullScreen()
                                : t.msRequestFullscreen
                                ? t.msRequestFullscreen()
                                : (console.error('Fullscreen API is not supported.'), g.on()),
                                l.on();
                            })(e);
                          },
                      'variant': 'icon'
                    },
                    'fullscreen_button'
                  )
            ].filter(function (e) {
              return e;
            });
          return n
            ? Object(he.jsx)(Z.a, {
                position: 'absolute',
                top: 1,
                right: 1,
                zIndex: 2,
                backgroundColor: 'transparent',
                spacing: 0,
                children: h.reverse()
              })
            : Object(he.jsx)(Z.c, {
                position: 'absolute',
                top: 1,
                right: 1,
                zIndex: 2,
                backgroundColor: 'transparent',
                spacing: 0,
                children: h
              });
        },
        Oo = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(v.e)(),
            a = Object(J.c)().colorMode,
            i = x(n),
            r = i.css,
            c = i.handleIsLoaded,
            s = e.mediaType,
            l = e.alt,
            d = e.thumbnailSrc,
            u = e.fullSrc,
            g = e.onError,
            j = e.onLoad,
            h = Object(je.a)(e, ['mediaType', 'alt', 'thumbnailSrc', 'fullSrc', 'onError', 'onLoad']),
            O = Object(o.useState)(''),
            f = Object(p.a)(O, 2),
            m = f[0],
            y = f[1],
            A = Object(o.useCallback)(
              D.a.debounce(function () {
                var e = Pt('person' === s ? 'beam' : 'marble', 'light' === a ? 400 : 500, l);
                y(e);
              }, 500),
              []
            );
          return (
            Object(o.useEffect)(function () {
              return A();
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(
                  to.a,
                  Object(b.a)(
                    Object(b.a)({}, h),
                    {},
                    {
                      ref: t,
                      alt: ''.concat(l, ' thumbnail'),
                      position: 'absolute',
                      onError: g
                        ? function (e) {
                            return g(e);
                          }
                        : void 0,
                      onLoad: j
                        ? function (e) {
                            return j(e);
                          }
                        : void 0,
                      src: d,
                      fallbackSrc:
                        'light' === a
                          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA55pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMS0xMC0zMDwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD5lOGRkMDBmYi0yN2M0LTRiMTMtYjhhMi1mNzBhY2ViYzczYWY8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+RGF2aWQgU2NpY2x1bmE8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz56SLLDAAAH9ElEQVR4nO3VsRGAIADAQGT/Kaks3UCGoPDM/U+QLte6n3cAAL82vw4AAM4ZOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AAQYOgAEGDoABBg6AARsasAHoSNJ1GYAAAAASUVORK5CYII='
                          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA55pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMS0xMC0zMDwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD4wOWQ2MTJjMi04ZjNiLTQyMTktODQyOC0zMGE0NGUzYTdhODc8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+RGF2aWQgU2NpY2x1bmE8L3BkZjpBdXRob3I+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz79/GU0AAAH9UlEQVR4nO3VMRGAMADAwFI/nbGAf0NURAeO3L+CbLnW/bwDAPi1+XUAAHDO0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASDA0AEgwNABIMDQASBgA3VXBZNBP/ggAAAAAElFTkSuQmCC',
                      sx: Object(b.a)({}, r.thumbnail)
                    }
                  )
                ),
                Object(he.jsx)(
                  to.a,
                  Object(b.a)(
                    Object(b.a)({}, h),
                    {},
                    {
                      ref: t,
                      alt: l,
                      position: 'absolute',
                      onError: function (e) {
                        c(!0), g && g(e);
                      },
                      onLoad: function (e) {
                        c(!0), j && j(e);
                      },
                      src: u,
                      fallbackSrc: m,
                      sx: Object(b.a)({}, r.fullSize)
                    }
                  )
                )
              ]
            })
          );
        },
        fo = function (e) {
          var t = Object($n.a)({
              'base': 'calc(100% - 2rem)',
              'sm': 'calc(100% - 2rem)',
              'md': 'calc(100% - 4rem)',
              'lg': 'calc(100% - 8rem)',
              'xl': 'calc(100% - 16rem)',
              '2xl': 'calc(100% - 32rem)'
            }),
            n = e.name,
            o = e.path,
            a = e.mediaType;
          return Object(he.jsx)(Oo, {
            alt: ''.concat(n ? '"'.concat(n, '"') : '', ' image'),
            width: t,
            maxWidth: 'none',
            height: 'auto',
            mediaType: a,
            borderRadius: 'xl',
            thumbnailSrc: ''.concat('https://image.tmdb.org/t/p', '/w300').concat(o),
            fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(o)
          });
        },
        mo = n(505),
        xo = n(530),
        yo = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.label,
            a = e.color,
            i = void 0 === a ? 'gray' : a,
            r = e.size,
            c = void 0 === r ? 'sm' : r,
            s = Object(je.a)(e, ['label', 'color', 'size']);
          return Object(he.jsx)(
            xo.a,
            Object(b.a)(
              Object(b.a)({}, s),
              {},
              {
                color: (function () {
                  switch (i) {
                    case 'gray':
                      return 'gray.'.concat('light' === n ? '900' : '50');
                    default:
                      return ''.concat(i, '.600');
                  }
                })(),
                background: (function () {
                  switch (i) {
                    case 'gray':
                      return 'gray.'.concat('light' === n ? '200' : '700');
                    default:
                      return ''.concat(i, '.50');
                  }
                })(),
                variant: 'subtle',
                fontSize: 'xs' === c ? '10px' : 'sm' === c ? 'xs' : 'md' === c ? 'sm' : 'lg',
                fontWeight: 'bold',
                lineHeight: 'none',
                px: 'xs' === c || 'sm' === c ? 0.5 : 'md' === c ? 0.75 : 1,
                py: 'xs' === c || 'sm' === c ? 0.25 : 0.5,
                sx: {
                  transition: ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out'])
                },
                children: o
              }
            )
          );
        },
        Ao = function (e) {
          var t = e.children,
            n = e.title,
            o = e.total,
            a = Object(O.a)('(max-width: 600px)'),
            i = Object(p.a)(a, 1)[0],
            r = Object(O.a)('(max-width: 340px)'),
            c = Object(p.a)(r, 1)[0];
          return Object(he.jsx)(wn, {
            box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
            isFullWidth: !0,
            variant: 'transparent',
            children: {
              header: {
                title: n,
                actions: o > 0 ? Object(he.jsx)(yo, { label: String(o), size: i ? 'sm' : 'md' }) : void 0
              },
              body: Object(he.jsx)(En.a, {
                width: '100%',
                columns: [c ? 1 : 2, 2, 3, 4, 5, 6],
                spacing: 2,
                children: t
              })
            }
          });
        },
        wo = n(531),
        ko = n(532),
        Co = n(103),
        So = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(hn.a)(t).height,
            a = Object(v.e)(),
            i = Object(J.c)().colorMode,
            r = Object(Co.a)({ threshold: [0.2, 0.4, 0.6, 0.8, 1], unobserveOnEnter: !0 }),
            c = r.observe,
            s = r.inView,
            l = e.children,
            d = e.width,
            u = void 0 === d ? '100%' : d,
            g = e.borderRadius,
            j = void 0 === g ? 'base' : g,
            h = e.ratio,
            O = void 0 === h ? 2 / 3 : h,
            m = e.icon,
            x = e.isDisabled,
            y = void 0 !== x && x,
            A = e.isActive,
            w = void 0 !== A && A,
            k = e.onClick,
            C = Object(je.a)(e, [
              'children',
              'width',
              'borderRadius',
              'ratio',
              'icon',
              'isDisabled',
              'isActive',
              'onClick'
            ]),
            S = Object(Le.a)(),
            D = Object(p.a)(S, 2),
            E = D[0],
            L = D[1];
          return Object(he.jsx)(f.a, {
            ref: c,
            as: wo.a,
            width: u,
            minWidth: u,
            maxWidth: u,
            borderRadius: j,
            ratio: O,
            children: Object(he.jsx)(eo.a, {
              in: w || s,
              unmountOnExit: !0,
              style: { width: 'inherit' },
              children: Object(he.jsx)(
                f.a,
                Object(b.a)(
                  Object(b.a)({}, C),
                  {},
                  {
                    ref: t,
                    width: 'inherit',
                    borderRadius: j,
                    onClick:
                      l && !y && k
                        ? function () {
                            return k();
                          }
                        : void 0,
                    onMouseEnter:
                      l && !y
                        ? function () {
                            return L.on();
                          }
                        : void 0,
                    onMouseLeave:
                      l && !y
                        ? function () {
                            return L.off();
                          }
                        : void 0,
                    children: Object(he.jsx)(wo.a, {
                      ratio: O,
                      children: Object(he.jsxs)(he.Fragment, {
                        children: [
                          Object(he.jsx)(eo.a, {
                            in: !y,
                            unmountOnExit: !0,
                            style: { width: '100%', height: '100%' },
                            children: Object(he.jsx)(ke.a, {
                              width: '100%',
                              height: '100%',
                              position: 'absolute',
                              zIndex: 1,
                              borderRadius: j,
                              sx: {
                                cursor: 'pointer',
                                backgroundColor:
                                  E || w
                                    ? 'light' === i
                                      ? 'rgba(0, 0, 0, 0.4)'
                                      : 'rgba(255, 255, 255, 0.2)'
                                    : 'transparent',
                                transition: ''
                                  .concat(a.transition.duration.faster, ' ')
                                  .concat(a.transition.easing['ease-in-out'])
                              },
                              children: Object(he.jsx)(eo.a, {
                                in: E || w,
                                unmountOnExit: !0,
                                children: Object(he.jsx)(Se.a, {
                                  as: w ? ko.a : m || ne.a,
                                  color: 'light' === i ? 'gray.50' : 'gray.900',
                                  sx: {
                                    fontSize: ''.concat(
                                      n > 375 ? a.fontSizes['7xl'] : a.fontSizes['6xl'],
                                      ' !important'
                                    )
                                  }
                                })
                              })
                            })
                          }),
                          l
                        ]
                      })
                    })
                  }
                )
              )
            })
          });
        },
        Do = function (e) {
          var t = e.photo,
            n = e.name,
            o = e.type,
            a = e.mediaType,
            i = e.isActive,
            r = void 0 !== i && i,
            c = e.onClickImage;
          return Object(he.jsx)(So, {
            borderRadius: 'lg',
            ratio: 1,
            isActive: r,
            onClick: function () {
              return c(t.file_path, o);
            },
            children: Object(he.jsx)(Oo, {
              alt: ''.concat(n ? '"'.concat(n, '"') : '', ' image'),
              maxWidth: 'none',
              height: '100%',
              borderRadius: 'base',
              mediaType: a,
              thumbnailSrc: ''.concat('https://image.tmdb.org/t/p', '/w45').concat(t.file_path),
              fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(t.file_path)
            })
          });
        },
        Eo = n(163),
        Lo = n.n(Eo),
        _o = n(118),
        Bo =
          (n(435),
          function (e) {
            var t = e.video,
              n = e.isActive,
              o = void 0 !== n && n,
              a = e.onClickVideo,
              i = Object(Le.a)(),
              r = Object(p.a)(i, 2),
              c = r[0],
              s = r[1],
              l = {
                playerVars: {
                  autoplay: c ? 1 : 0,
                  controls: 0,
                  color: 'white',
                  enablejsapi: 1,
                  disablekb: 1,
                  mute: 1,
                  fs: 0,
                  loop: 1,
                  modestbranding: 1,
                  showinfo: 0
                }
              };
            return Object(he.jsx)(f.a, {
              borderRadius: 'lg',
              onMouseEnter: o
                ? void 0
                : function () {
                    return s.on();
                  },
              onMouseLeave: o
                ? void 0
                : function () {
                    return s.off();
                  },
              children: Object(he.jsx)(So, {
                borderRadius: 'lg',
                ratio: 1,
                icon: Lo.a,
                isActive: o,
                onClick: function () {
                  return a(t.key, 'video');
                },
                children: Object(he.jsx)(_o.a, {
                  videoId: t.key,
                  className: 'VideoGalleryFrame',
                  containerClassName: 'VideoGalleryContainer',
                  opts: l
                })
              })
            });
          }),
        Mo = function (e) {
          var t = e.isOpen,
            n = e.name,
            o = e.activePath,
            a = e.photos,
            i = e.backdrops,
            r = e.videos,
            c = e.mediaType,
            s = e.onClick,
            l = e.onClose;
          return Object(he.jsx)(pn, {
            title: 'Gallery',
            isOpen: t,
            onClose: l,
            isCentered: !0,
            size: 'full',
            children: Object(he.jsxs)(Z.c, {
              width: '100%',
              p: 2,
              spacing: 10,
              children: [
                Object(he.jsx)(mo.a, {
                  in: a && a.length > 0,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsx)(Ao, {
                    title: 'Photos',
                    total: (null === a || void 0 === a ? void 0 : a.length) || 0,
                    children: Object(he.jsx)(he.Fragment, {
                      children:
                        null === a || void 0 === a
                          ? void 0
                          : a.map(function (e, t) {
                              return Object(he.jsx)(
                                Do,
                                {
                                  photo: e,
                                  name: n,
                                  type: 'photo',
                                  mediaType: c,
                                  isActive: e.file_path === o,
                                  onClickImage: s
                                },
                                t
                              );
                            })
                    })
                  })
                }),
                Object(he.jsx)(mo.a, {
                  in: i && i.length > 0,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsx)(Ao, {
                    title: 'Backdrops',
                    total: (null === i || void 0 === i ? void 0 : i.length) || 0,
                    children: Object(he.jsx)(he.Fragment, {
                      children:
                        null === i || void 0 === i
                          ? void 0
                          : i.map(function (e, t) {
                              return Object(he.jsx)(
                                Do,
                                {
                                  photo: e,
                                  name: n,
                                  type: 'backdrop',
                                  mediaType: c,
                                  isActive: e.file_path === o,
                                  onClickImage: s
                                },
                                t
                              );
                            })
                    })
                  })
                }),
                Object(he.jsx)(mo.a, {
                  in: r && r.length > 0,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsx)(Ao, {
                    title: 'Videos',
                    total: (null === r || void 0 === r ? void 0 : r.length) || 0,
                    children: Object(he.jsx)(he.Fragment, {
                      children:
                        null === r || void 0 === r
                          ? void 0
                          : r.map(function (e, t) {
                              return Object(he.jsx)(Bo, { video: e, isActive: e.key === o, onClickVideo: s }, t);
                            })
                    })
                  })
                })
              ]
            })
          });
        },
        To = function (e) {
          var t = Object($n.a)({
              'base': 'calc(100% - 2rem)',
              'sm': 'auto',
              'md': 'auto',
              'lg': 'auto',
              'xl': 'auto',
              '2xl': 'auto'
            }),
            n = Object($n.a)({
              'base': 'auto',
              'sm': 'calc(100% - 8rem)',
              'md': 'calc(100% - 6rem)',
              'lg': 'calc(100% - 6rem)',
              'xl': 'calc(100% - 6rem)',
              '2xl': 'calc(100% - 8rem)'
            }),
            o = e.name,
            a = e.path,
            i = e.mediaType;
          return Object(he.jsx)(Oo, {
            alt: ''.concat(o ? '"'.concat(o, '"') : '', ' image'),
            width: t,
            maxWidth: 'none',
            height: n,
            borderRadius: 'xl',
            mediaType: i,
            thumbnailSrc: ''.concat('https://image.tmdb.org/t/p', '/w92').concat(a),
            fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(a)
          });
        },
        zo =
          (n(436),
          function (e) {
            var t = e.path;
            return Object(he.jsx)(_o.a, {
              videoId: t,
              className: 'VideoViewerFrame',
              containerClassName: 'VideoViewerContainer'
            });
          }),
        Io = n(563),
        Fo = n(535),
        Qo = (n(437), n(533)),
        No = n(534),
        Yo = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.current,
            o = e.total,
            a = e.onNavigation;
          return Object(he.jsxs)(Z.a, {
            position: 'absolute',
            bottom: 1,
            right: 1,
            zIndex: 2,
            backgroundColor: 'transparent',
            spacing: 0,
            children: [
              Object(he.jsx)(Ee, {
                'aria-label': 'Previous photo',
                'icon': Qo.a,
                'isDisabled': n <= 1,
                'onClick': function () {
                  return a('prev');
                },
                'variant': 'icon'
              }),
              Object(he.jsx)(U.a, {
                align: 'center',
                color: 'light' === t ? 'gray.400' : 'gray.500',
                fontSize: 'md',
                children: ''.concat(n, ' / ').concat(o)
              }),
              Object(he.jsx)(Ee, {
                'aria-label': 'Next photo',
                'icon': No.a,
                'isDisabled': n >= o,
                'onClick': function () {
                  return a('next');
                },
                'variant': 'icon'
              })
            ]
          });
        },
        Wo = function (e) {
          var t = Object(v.e)(),
            n = e.renderSlide,
            a = e.isGalleryOpen,
            i = e.activePath,
            r = e.data,
            c = e.onSwiper,
            s = e.onSlideChange,
            l = e.onNavigation,
            d = e.onClose,
            u = Object(o.useState)(0),
            b = Object(p.a)(u, 2),
            g = b[0],
            j = b[1],
            h = Object(o.useCallback)(
              function (e) {
                if (!a)
                  switch (null === e || void 0 === e ? void 0 : e.key) {
                    case 'ArrowLeft':
                      g >= 1 && l('prev');
                      break;
                    case 'ArrowRight':
                      g <= ((null === r || void 0 === r ? void 0 : r.length) || 0) && l('next');
                  }
              },
              [a, r, i, l]
            ),
            O = Object(o.useCallback)(
              function () {
                j(
                  (r.findIndex(function (e) {
                    return e.file_path === i || e.key === i;
                  }) || 0) + 1
                );
              },
              [r, i, j]
            );
          return (
            Object(hn.b)('keydown', h),
            Object(o.useEffect)(
              function () {
                return O();
              },
              [i]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Io.a, {
                  allowSlideNext: g <= ((null === r || void 0 === r ? void 0 : r.length) || 0),
                  allowSlidePrev: g >= 1,
                  spaceBetween: 96,
                  slidesPerView: 1,
                  onUpdate: function (e) {
                    return c(e);
                  },
                  onSwiper: function (e) {
                    return c(e);
                  },
                  onSlideChange: function (e) {
                    return s(e);
                  },
                  onTouchEnd: function (e) {
                    return (function (e) {
                      It() && void 0 === e.swipeDirection && d();
                    })(e);
                  },
                  children:
                    null === r || void 0 === r
                      ? void 0
                      : r.map(function (e, o) {
                          return Object(he.jsx)(
                            Fo.a,
                            {
                              children: Object(he.jsx)(mo.a, {
                                in: g - 1 === o,
                                offsetY: '10vh',
                                delay: Nt(Bt(t.transition.duration.slow, 'ms')),
                                unmountOnExit: !0,
                                children: Object(he.jsx)(ke.a, {
                                  width: '100vw',
                                  height: '100vh',
                                  position: 'relative',
                                  children: n(e)
                                })
                              })
                            },
                            o
                          );
                        })
                }),
                Object(he.jsx)(Yo, {
                  current: g,
                  total: (null === r || void 0 === r ? void 0 : r.length) || 0,
                  onNavigation: l
                })
              ]
            })
          );
        },
        Po = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(fe.a)(),
            a = n.isOpen,
            i = n.onOpen,
            r = n.onClose,
            c = e.isOpen,
            s = e.name,
            l = e.selected,
            d = e.photos,
            u = e.backdrops,
            b = e.videos,
            g = e.mediaType,
            j = e.onClose,
            h = Object(o.useState)(),
            v = Object(p.a)(h, 2),
            O = v[0],
            f = v[1],
            m = Object(o.useState)(''),
            x = Object(p.a)(m, 2),
            y = x[0],
            A = x[1],
            w = Object(o.useState)(),
            k = Object(p.a)(w, 2),
            C = k[0],
            S = k[1],
            D = [].concat(Object(In.a)(d || []), Object(In.a)(u || []), Object(In.a)(b || [])),
            E = Object(o.useCallback)(
              function (e) {
                O && O.slideTo(e, 0);
              },
              [O]
            ),
            L = Object(o.useCallback)(
              function (e) {
                switch (e) {
                  case 'prev':
                    (null === O || void 0 === O ? void 0 : O.allowSlidePrev) && O.slidePrev(500);
                    break;
                  case 'next':
                    (null === O || void 0 === O ? void 0 : O.allowSlideNext) && O.slideNext(500);
                }
              },
              [O]
            ),
            _ = Object(o.useCallback)(
              function (e) {
                var t = D.find(function (t, n) {
                    return n === e.activeIndex;
                  }),
                  n =
                    (null === t || void 0 === t ? void 0 : t.file_path) ||
                    (null === t || void 0 === t ? void 0 : t.key) ||
                    '',
                  o = (
                    null === d || void 0 === d
                      ? void 0
                      : d.some(function (e) {
                          return e.file_path === n;
                        })
                  )
                    ? 'photo'
                    : (
                        null === u || void 0 === u
                          ? void 0
                          : u.some(function (e) {
                              return e.file_path === n;
                            })
                      )
                    ? 'backdrop'
                    : (
                        null === b || void 0 === b
                          ? void 0
                          : b.some(function (e) {
                              return e.key === n;
                            })
                      )
                    ? 'video'
                    : '';
                n && A(n), o && S(o);
              },
              [D, d, u, b, A, S]
            );
          return (
            Object(o.useEffect)(
              function () {
                O &&
                  l &&
                  l.asset &&
                  l.type &&
                  D &&
                  D.length > 0 &&
                  (A(l.asset),
                  S(l.type),
                  E(
                    (null === D || void 0 === D
                      ? void 0
                      : D.findIndex(function (e) {
                          return e.file_path === l.asset || e.key === l.asset;
                        })) || 0
                  ));
              },
              [O, l]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(xe.a, {
                  isOpen: c,
                  onClose: j,
                  motionPreset: 'scale',
                  scrollBehavior: 'inside',
                  size: 'full',
                  children: Object(he.jsx)(xe.c, {
                    backgroundColor: 'light' === t ? 'gray.50' : 'gray.900',
                    borderRadius: 'none',
                    m: 0,
                    children: Object(he.jsxs)(xe.b, {
                      position: 'relative',
                      p: 0,
                      children: [
                        Object(he.jsx)(vo, {
                          activeType: C,
                          onClose: j,
                          onGalleryClick: function () {
                            return i();
                          }
                        }),
                        Object(he.jsx)(Wo, {
                          renderSlide: function (e) {
                            return 'photo' === C
                              ? Object(he.jsx)(To, { name: s, path: e.file_path, mediaType: g })
                              : 'backdrop' === C
                              ? Object(he.jsx)(fo, { name: s, path: e.file_path, mediaType: g })
                              : Object(he.jsx)(zo, { path: e.key });
                          },
                          isGalleryOpen: a,
                          activePath: y,
                          data: D,
                          onSwiper: function (e) {
                            return f(e);
                          },
                          onSlideChange: _,
                          onNavigation: L,
                          onClose: j
                        })
                      ]
                    })
                  })
                }),
                Object(he.jsx)(Mo, {
                  isOpen: a,
                  activePath: y,
                  name: s,
                  photos: d,
                  backdrops: u,
                  videos: b,
                  mediaType: g,
                  onClick: function (e, t) {
                    var n = D.findIndex(function (t) {
                      return t.file_path === e || t.key === e;
                    });
                    A(e), S(t), E(n), r();
                  },
                  onClose: r
                })
              ]
            })
          );
        },
        Ro = n(565),
        Go = { speed: Bt(Lt.transition.duration.slower, 'ms') / 750 },
        Vo = function (e, t, n) {
          return 'light' === n ? ('start' === e ? 'gray.200' : 'gray.400') : 'start' === e ? 'gray.700' : 'gray.500';
        },
        Ho = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.children,
            a = (e.color, e.isLoaded),
            i = void 0 !== a && a,
            r = e.type,
            c = void 0 === r ? 'default' : r,
            s = Object(je.a)(e, ['children', 'color', 'isLoaded', 'type']);
          return Object(he.jsx)(
            Ro.a,
            Object(b.a)(
              Object(b.a)(Object(b.a)({}, s), Go),
              {},
              {
                isLoaded: i,
                fadeDuration: 'default' !== c || i ? 0 : Bt(t.transition.duration.normal, 'ms') / 250,
                startColor: Vo('start', 0, n),
                endColor: Vo('end', 0, n),
                children: o
              }
            )
          );
        },
        Jo = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.name,
            a = e.path,
            i = e.mediaType,
            r = e.isLoading,
            c = void 0 !== r && r,
            s = e.onClickPoster,
            l = Object(Le.a)(),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1];
          return Object(he.jsx)(So, {
            borderRadius: 'lg',
            ratio: n ? 1 : 2 / 3,
            isDisabled: c || u,
            onClick: a
              ? function () {
                  return s(a, 'photo');
                }
              : void 0,
            children: Object(he.jsx)(Ho, {
              isLoaded: !c,
              borderRadius: 'lg',
              children: Object(he.jsx)(Oo, {
                alt: ''
                  .concat(o ? '"'.concat(o, '"') : '', ' ')
                  .concat('movie' === i ? 'movie' : 'tv' === i ? 'tv show' : 'profile', ' poster'),
                mediaType: i,
                maxWidth: 'none',
                height: n ? 'auto' : '100%',
                width: n ? '100%' : 'auto',
                borderRadius: 'lg',
                onError: function () {
                  return b.on();
                },
                onLoad: function () {
                  return b.off();
                },
                thumbnailSrc: ''
                  .concat('https://image.tmdb.org/t/p', '/')
                  .concat('person' === i ? 'w45' : 'w92')
                  .concat(a),
                fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(a)
              })
            })
          });
        },
        Zo = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.children,
            a = (e.color, e.isLoaded),
            i = void 0 !== a && a,
            r = e.offsetY,
            c = Object(je.a)(e, ['children', 'color', 'isLoaded', 'offsetY']);
          return Object(he.jsx)(
            Ho,
            Object(b.a)(
              Object(b.a)(Object(b.a)({}, c), Go),
              {},
              {
                isLoaded: i,
                type: 'text',
                startColor: Vo('start', 0, n),
                endColor: Vo('end', 0, n),
                children: Object(he.jsx)(mo.a, {
                  in: i,
                  offsetY: r,
                  delay: Bt(t.transition.duration.faster, 'ms') / 250,
                  children: o
                })
              }
            )
          );
        },
        Uo = function (e) {
          var t = e.children,
            n = e.label,
            o = Object(je.a)(e, ['children', 'label']),
            a = Object(J.c)().colorMode;
          return Object(he.jsxs)(
            Z.c,
            Object(b.a)(
              Object(b.a)({}, o),
              {},
              {
                alignItems: 'flex-start',
                spacing: 0,
                children: [
                  Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === a ? 'gray.400' : 'gray.500',
                    fontSize: 'md',
                    fontWeight: 'semibold',
                    children: n
                  }),
                  t
                ]
              }
            )
          );
        },
        qo = n(259),
        Xo = n.n(qo),
        Ko = { rating: null, count: null },
        $o = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.rating,
            o = void 0 === n ? Ko : n,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = e.iconFontsize,
            c = e.textFontsize;
          return Object(he.jsxs)(ke.a, {
            backgroundColor: 'transparent',
            p: 0,
            children: [
              Object(he.jsx)(Se.a, { as: Xo.a, color: 'yellow.400', sx: { fontSize: ''.concat(r, ' !important') } }),
              Object(he.jsx)(Zo, {
                offsetY: 8,
                isLoaded: !i,
                ml: 0.5,
                children: Object(he.jsx)(U.a, {
                  color: 'light' === t ? 'gray.900' : 'gray.50',
                  fontSize: c,
                  fontWeight: 'medium',
                  sx: { lineHeight: 'normal' },
                  children: D.a.round((null === o || void 0 === o ? void 0 : o.rating) || 0, 1) || 'N/A'
                })
              })
            ]
          });
        },
        ea = Gt(100, 3),
        ta = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object($n.a)({ 'base': '12px', 'sm': '12px', 'md': '15px', 'lg': '15px', 'xl': '15px', '2xl': '15px' }),
            a = Object($n.a)({
              'base': t.fontSizes['2xl'],
              'sm': t.fontSizes['2xl'],
              'md': t.fontSizes['3xl'],
              'lg': t.fontSizes['3xl'],
              'xl': t.fontSizes['3xl'],
              '2xl': t.fontSizes['3xl']
            }),
            i = e.title,
            r = e.rating,
            c = e.date,
            s = e.certification,
            l = e.genres,
            d = e.runtime,
            u = e.isLoading,
            b = void 0 === u || u;
          return Object(he.jsxs)(Z.c, {
            alignItems: 'flex-start',
            wrap: 'wrap',
            spacing: b ? 1 : 0,
            children: [
              Object(he.jsxs)(Z.a, {
                spacing: 0.75,
                children: [
                  Object(he.jsx)(Zo, {
                    offsetY: o,
                    isLoaded: !b,
                    children: Object(he.jsxs)(U.a, {
                      align: 'left',
                      color: 'light' === n ? 'gray.900' : 'gray.50',
                      fontSize: ['2xl', '2xl', '3xl', '3xl', '3xl', '3xl'],
                      fontWeight: 'bold',
                      children: [
                        i || 'Movie Title',
                        ' ',
                        Object(he.jsx)(xo.a, {
                          height: ['28px', '28px', '35px', '35px', '35px', '35px'],
                          background: 'transparent',
                          p: 0,
                          children: Object(he.jsx)($o, {
                            rating: r,
                            isLoading: b,
                            iconFontsize: a,
                            textFontsize: ['lg', 'lg', 'xl', 'xl', 'xl', 'xl']
                          })
                        })
                      ]
                    })
                  }),
                  Object(he.jsx)(mo.a, {
                    in: b,
                    offsetY: '10px',
                    unmountOnExit: !0,
                    children: Object(he.jsx)($o, {
                      rating: { rating: 5.5, count: 0 },
                      isLoading: !0,
                      iconFontsize: a,
                      textFontsize: ['lg', 'lg', 'xl', 'xl', 'xl', 'xl']
                    })
                  })
                ]
              }),
              Object(he.jsxs)(Z.a, {
                spacing: b ? 1 : 0,
                wrap: 'wrap',
                divider: Object(he.jsx)(U.a, {
                  align: 'left',
                  color: 'light' === n ? 'gray.400' : 'gray.500',
                  fontSize: 'sm',
                  mx: 1,
                  children: '\u2022'
                }),
                children: [
                  Object(he.jsx)(Zo, {
                    offsetY: 7,
                    isLoaded: !b,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === n ? 'gray.400' : 'gray.500',
                      fontSize: 'sm',
                      children: c || 'N/A'
                    })
                  }),
                  Object(he.jsx)(Zo, {
                    offsetY: 7,
                    isLoaded: !b,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === n ? 'gray.400' : 'gray.500',
                      fontSize: 'sm',
                      children: s || 'N/A'
                    })
                  }),
                  Object(he.jsx)(Z.a, {
                    wrap: 'wrap',
                    spacing: b ? 1 : 0,
                    divider: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === n ? 'gray.400' : 'gray.500',
                      fontSize: 'sm',
                      pr: 0.75,
                      children: ','
                    }),
                    children:
                      !b && l
                        ? l.map(function (e, o) {
                            return Object(he.jsx)(
                              mo.a,
                              {
                                in: !0,
                                offsetY: 7,
                                delay: Bt(t.transition.duration.faster, 'ms') / 250,
                                children: Object(he.jsx)(U.a, {
                                  align: 'left',
                                  color: 'light' === n ? 'gray.400' : 'gray.500',
                                  fontSize: 'sm',
                                  children: e.name
                                })
                              },
                              o
                            );
                          })
                        : D.a.range(0, 2).map(function (e, t) {
                            return Object(he.jsx)(
                              Zo,
                              {
                                width: ''.concat(ea[Math.floor(Math.random() * ea.length)], 'px'),
                                height: '19px',
                                offsetY: 7
                              },
                              t
                            );
                          })
                  }),
                  Object(he.jsx)(Zo, {
                    offsetY: 7,
                    isLoaded: !b,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === n ? 'gray.400' : 'gray.500',
                      fontSize: 'sm',
                      children: b ? '1hr 15m' : Qt(d || 0)
                    })
                  })
                ]
              })
            ]
          });
        },
        na = function (e) {
          var t = Object(fe.a)(),
            n = t.isOpen,
            o = t.onOpen,
            a = t.onClose,
            i = Object(r.b)(),
            c = w(function (e) {
              return e.user.data.lists;
            }),
            s = e.renderButton,
            l = e.title,
            d = e.mediaType,
            u = e.mediaItem,
            g = u
              ? c.filter(function (e) {
                  switch (d) {
                    case 'movie':
                      return e.results.movies.some(function (e) {
                        return e.id === u.id;
                      });
                    case 'tv':
                      return e.results.tv.some(function (e) {
                        return e.id === u.id;
                      });
                    default:
                      return;
                  }
                })
              : void 0,
            j = !!(g && (g.length || 0) > 0),
            h = function (e) {
              i(
                it(
                  c.map(function (t) {
                    if (e.includes(t)) {
                      var n = Object(b.a)({}, t.results);
                      switch (d) {
                        case 'movie':
                          n.movies =
                            n.movies.filter(function (e) {
                              return e.id !== (null === u || void 0 === u ? void 0 : u.id);
                            }) || [];
                          break;
                        case 'tv':
                          n.tv =
                            n.tv.filter(function (e) {
                              return e.id !== (null === u || void 0 === u ? void 0 : u.id);
                            }) || [];
                      }
                      return Object(b.a)(Object(b.a)({}, t), {}, { results: Object(b.a)({}, n) });
                    }
                    return t;
                  })
                )
              );
            };
          return Object(he.jsxs)(he.Fragment, {
            children: [
              s({
                lists: g,
                isBookmarked: j,
                onClick:
                  j && g && ((null === g || void 0 === g ? void 0 : g.length) || 0) > 0
                    ? g.length > 1
                      ? function () {
                          return o();
                        }
                      : function () {
                          return h(g);
                        }
                    : function () {
                        u && i(Je({ open: !0, title: l, mediaType: d, mediaItem: Object(b.a)({}, u) }));
                      }
              }),
              Object(he.jsx)(Pn, {
                renderButton: Object(he.jsx)(bn, {
                  color: 'red',
                  onClick: function () {
                    return h(g || []), void a();
                  },
                  size: 'sm',
                  children: 'Remove'
                }),
                title: 'Remove "'.concat(l, '" ').concat(d, ' from lists?'),
                description: 'Are you sure you want to remove "'
                  .concat(l, '" ')
                  .concat(d, ' from ')
                  .concat(
                    null === g || void 0 === g
                      ? void 0
                      : g
                          .map(function (e) {
                            return '"'.concat(e.label, '"');
                          })
                          .filter(function (e) {
                            return e;
                          })
                          .join(', '),
                    ' lists?'
                  ),
                isOpen: n,
                onClose: a
              })
            ]
          });
        },
        oa = function (e) {
          var t = Object(r.b)(),
            n = w(function (e) {
              return e.user.data.liked;
            }),
            o = e.renderButton,
            a = e.mediaType,
            i = e.mediaItem,
            c =
              !(!n || !i) &&
              ('movie' === a
                ? n.movies.some(function (e) {
                    return e.id === i.id;
                  })
                : 'tv' === a
                ? n.tv.some(function (e) {
                    return e.id === i.id;
                  })
                : n.people.some(function (e) {
                    return e.id === i.id;
                  }));
          return o({
            isLiked: c,
            onClick: c
              ? function () {
                  return (function () {
                    var e = Object(b.a)({}, n);
                    switch (a) {
                      case 'movie':
                        e.movies = e.movies.filter(function (e) {
                          return e.id !== (null === i || void 0 === i ? void 0 : i.id);
                        });
                        break;
                      case 'tv':
                        e.tv = e.tv.filter(function (e) {
                          return e.id !== (null === i || void 0 === i ? void 0 : i.id);
                        });
                        break;
                      case 'person':
                        e.people = e.people.filter(function (e) {
                          return e.id !== (null === i || void 0 === i ? void 0 : i.id);
                        });
                    }
                    t(at(Object(b.a)({}, e)));
                  })();
                }
              : function () {
                  return (function () {
                    var e = Object(b.a)({}, n);
                    switch (a) {
                      case 'movie':
                        var o = Object(b.a)(Object(b.a)({}, i), {}, { dateAdded: K()(new Date()).toISOString() });
                        e.movies = [].concat(Object(In.a)(e.movies), [o]);
                        break;
                      case 'tv':
                        var r = Object(b.a)(Object(b.a)({}, i), {}, { dateAdded: K()(new Date()).toISOString() });
                        e.tv = [].concat(Object(In.a)(e.tv), [r]);
                        break;
                      case 'person':
                        var c = Object(b.a)(Object(b.a)({}, i), {}, { dateAdded: K()(new Date()).toISOString() });
                        e.people = [].concat(Object(In.a)(e.people), [c]);
                    }
                    t(at(Object(b.a)({}, e)));
                  })();
                }
          });
        },
        aa = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(J.c)().colorMode,
            a = Object(hn.a)(t).height,
            i = w(function (e) {
              return e.user.ui.theme.color;
            }),
            r = e.title,
            c = e.isLoading,
            s = void 0 !== c && c,
            l = e.mediaItem;
          return Object(he.jsxs)(Z.a, {
            ref: t,
            width: '100%',
            divider: Object(he.jsx)(f.a, {
              width: '2px',
              height: a,
              backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
            }),
            spacing: 2,
            children: [
              Object(he.jsx)(na, {
                renderButton: function (e) {
                  var t = e.lists,
                    n = e.isBookmarked,
                    o = e.onClick;
                  return Object(he.jsx)(bn, {
                    color: n ? Wt(i) : 'gray',
                    isFullWidth: !0,
                    isDisabled: s || !l,
                    onClick: function () {
                      return o();
                    },
                    size: 'md',
                    variant: 'outlined',
                    children: n
                      ? 'In '.concat(
                          t && 1 === ((null === t || void 0 === t ? void 0 : t.length) || 0)
                            ? ''.concat(t[0].label ? '"'.concat(t[0].label, '" list') : '')
                            : 'lists'
                        )
                      : 'Add to a list'
                  });
                },
                title: r || '',
                mediaType: 'movie',
                mediaItem: l ? Object(b.a)({}, l) : void 0
              }),
              Object(he.jsx)(oa, {
                renderButton: function (e) {
                  var t = e.isLiked,
                    n = e.onClick;
                  return Object(he.jsx)(bn, {
                    color: t ? 'red' : 'gray',
                    isFullWidth: !0,
                    isDisabled: s || !l,
                    leftIcon: t ? tn.a : nn.a,
                    onClick: function () {
                      return n();
                    },
                    size: 'md',
                    variant: 'outlined',
                    children: t ? 'Liked' : 'Like'
                  });
                },
                mediaType: 'movie',
                mediaItem: l ? Object(b.a)({}, l) : void 0
              })
            ]
          });
        },
        ia = Gt(200, 4),
        ra = function (e) {
          var t,
            n = Object(J.c)().colorMode,
            o = Object(O.a)('(max-width: 600px)'),
            a = Object(p.a)(o, 1)[0],
            i = e.budget,
            r = e.revenue,
            c = e.originalLanguage,
            s = e.languages,
            l = e.isLoading,
            d = void 0 === l || l,
            u = [
              {
                label: 'Budget',
                children: Object(he.jsx)(Zo, {
                  offsetY: 8,
                  isLoaded: !d,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === n ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children: i ? '$'.concat(Mt(i)) : d ? '1,000,000' : 'N/A'
                  })
                })
              },
              {
                label: 'Revenue',
                children: Object(he.jsx)(Zo, {
                  offsetY: 8,
                  isLoaded: !d,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === n ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children: r ? '$'.concat(Mt(r)) : d ? '1,000,000' : 'N/A'
                  })
                })
              },
              {
                label: 'Language',
                children: Object(he.jsx)(Zo, {
                  width: d ? ''.concat(ia[Math.floor(Math.random() * ia.length)], 'px') : 'auto',
                  offsetY: 8,
                  isLoaded: !d,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === n ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children:
                      (null === s ||
                      void 0 === s ||
                      null ===
                        (t = s.find(function (e) {
                          return e.iso_639_1 === c;
                        })) ||
                      void 0 === t
                        ? void 0
                        : t.english_name) || 'N/A'
                  })
                })
              }
            ];
          return Object(he.jsx)(Z.b, {
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'stretch',
            direction: a ? 'column' : 'row',
            spacing: a ? 2 : 4,
            children: u.map(function (e, t) {
              return e.children
                ? Object(he.jsx)(
                    Uo,
                    {
                      width: a ? '100%' : 'auto',
                      maxWidth: a ? '100%' : ''.concat(100 / 3, '%'),
                      flex: 1,
                      label: e.label,
                      children: e.children
                    },
                    t
                  )
                : null;
            })
          });
        },
        ca = function (e) {
          var t = e.overview,
            n = e.isLoading,
            o = void 0 === n || n,
            a = Object(J.c)().colorMode;
          return o
            ? Object(he.jsx)(Z.c, {
                width: '100%',
                spacing: 1,
                children: D.a.range(0, 2).map(function (e, t) {
                  return Object(he.jsx)(
                    Zo,
                    {
                      width: '100%',
                      offsetY: 6,
                      isLoaded: !o,
                      children: Object(he.jsx)(U.a, {
                        align: 'left',
                        fontSize: 'xs',
                        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                      })
                    },
                    t
                  );
                })
              })
            : Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === a ? 'gray.900' : 'gray.50',
                fontSize: 'md',
                isTruncated: !0,
                whiteSpace: 'normal',
                sx: { 'display': '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical' },
                children: t
              });
        },
        sa = function (e) {
          var t,
            n = Object(J.c)().colorMode,
            o = e.movie,
            a = e.isLoading,
            i = void 0 === a || a,
            r = e.isError,
            c = void 0 !== r && r;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            maxWidth: '100%',
            alignItems: 'flex-start',
            spacing: 4,
            children: [
              Object(he.jsxs)(Z.c, {
                width: '100%',
                maxWidth: '100%',
                alignItems: 'flex-start',
                spacing: 2,
                children: [
                  Object(he.jsx)(ta, {
                    title: null === o || void 0 === o ? void 0 : o.title,
                    rating: {
                      rating: (null === o || void 0 === o ? void 0 : o.vote_average) || null,
                      count: (null === o || void 0 === o ? void 0 : o.vote_count) || null
                    },
                    date: null === o || void 0 === o ? void 0 : o.release_date,
                    genres: null === o || void 0 === o ? void 0 : o.genres,
                    runtime: null === o || void 0 === o ? void 0 : o.runtime,
                    isLoading: i
                  }),
                  Object(he.jsx)(_e.a, {
                    in:
                      ((null === o || void 0 === o || null === (t = o.tagline) || void 0 === t ? void 0 : t.length) ||
                        0) > 0,
                    unmountOnExit: !0,
                    children: Object(he.jsx)(Uo, {
                      width: '100%',
                      label: 'Tagline',
                      children: Object(he.jsx)(Zo, {
                        offsetY: 8,
                        isLoaded: !i,
                        children: Object(he.jsx)(U.a, {
                          align: 'left',
                          color: 'light' === n ? 'gray.900' : 'gray.50',
                          fontSize: 'md',
                          fontStyle: 'italic',
                          children: null === o || void 0 === o ? void 0 : o.tagline
                        })
                      })
                    })
                  }),
                  Object(he.jsx)(Uo, {
                    width: '100%',
                    label: 'Overview',
                    children: Object(he.jsx)(ca, {
                      overview: null === o || void 0 === o ? void 0 : o.overview,
                      isLoading: i
                    })
                  }),
                  Object(he.jsx)(ra, {
                    budget: null === o || void 0 === o ? void 0 : o.budget,
                    revenue: null === o || void 0 === o ? void 0 : o.revenue,
                    originalLanguage: null === o || void 0 === o ? void 0 : o.original_language,
                    languages: null === o || void 0 === o ? void 0 : o.spoken_languages,
                    isLoading: i
                  })
                ]
              }),
              Object(he.jsx)(_e.a, {
                in: !c,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(aa, {
                  title: null === o || void 0 === o ? void 0 : o.title,
                  isLoading: i,
                  mediaItem: o
                    ? {
                        adult: o.adult,
                        poster_path: o.poster_path,
                        overview: o.overview,
                        release_date: o.release_date,
                        id: o.id,
                        original_language: o.original_language,
                        original_title: o.original_title,
                        title: o.title,
                        backdrop_path: o.backdrop_path,
                        popularity: o.popularity,
                        video: o.video,
                        vote_average: o.vote_average,
                        vote_count: o.vote_count,
                        genre_ids: o.genres.map(function (e) {
                          return e.id;
                        })
                      }
                    : void 0
                })
              })
            ]
          });
        },
        la = function (e) {
          var t,
            n,
            a,
            i,
            r = C.a.CancelToken.source(),
            c = Object(fe.a)(),
            s = c.isOpen,
            l = c.onOpen,
            d = c.onClose,
            u = Object(O.a)('(max-width: 600px)'),
            b = Object(p.a)(u, 1)[0],
            g = e.id,
            v = Object(o.useState)(),
            m = Object(p.a)(v, 2),
            x = m[0],
            y = m[1],
            A = Object(go.a)(
              ['movie-'.concat(g), g],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            _.get('/movie/'.concat(g), {
                              params: { append_to_response: 'release_dates' },
                              cancelToken: r.token
                            })
                          );
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            w = Object(go.a)(
              ['movie-images-'.concat(g), g],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/movie/'.concat(g, '/images'), { cancelToken: r.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            k = function (e) {
              y(e), l();
            };
          return (
            Object(o.useEffect)(function () {
              return function () {
                return r.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                b
                  ? Object(he.jsxs)(Z.c, {
                      width: '100%',
                      maxWidth: '100%',
                      spacing: 2,
                      p: 2,
                      children: [
                        Object(he.jsx)(Jo, {
                          name: (null === (t = A.data) || void 0 === t ? void 0 : t.title) || '',
                          path: (null === (n = A.data) || void 0 === n ? void 0 : n.poster_path) || '',
                          mediaType: 'movie',
                          isLoading: A.isFetching || A.isLoading,
                          onClickPoster: k
                        }),
                        Object(he.jsx)(sa, {
                          movie: A.data,
                          isLoading: A.isFetching || A.isLoading,
                          isError: A.isError
                        })
                      ]
                    })
                  : Object(he.jsxs)(Z.a, {
                      width: '100%',
                      maxWidth: '100%',
                      spacing: 2,
                      p: 2,
                      children: [
                        Object(he.jsx)(f.a, {
                          width: '40%',
                          maxWidth: '40%',
                          children: Object(he.jsx)(Jo, {
                            name: (null === (a = A.data) || void 0 === a ? void 0 : a.title) || '',
                            path: (null === (i = A.data) || void 0 === i ? void 0 : i.poster_path) || '',
                            mediaType: 'movie',
                            isLoading: A.isFetching || A.isLoading,
                            onClickPoster: k
                          })
                        }),
                        Object(he.jsx)(f.a, {
                          width: '60%',
                          maxWidth: '60%',
                          children: Object(he.jsx)(sa, {
                            movie: A.data,
                            isLoading: A.isFetching || A.isLoading,
                            isError: A.isError
                          })
                        })
                      ]
                    }),
                w.isSuccess
                  ? Object(he.jsx)(Po, {
                      isOpen: s,
                      selected: { type: 'photo', asset: x },
                      photos: Object(In.a)(w.data.posters || []),
                      backdrops: Object(In.a)(w.data.posters || []),
                      mediaType: 'person',
                      onClose: d
                    })
                  : null
              ]
            })
          );
        },
        da = n(16),
        ua = n.n(da),
        ba = function (e) {
          var t = e.biography,
            n = e.isLoading,
            a = void 0 !== n && n,
            i = Object(o.useRef)(null),
            r = Object(J.c)().colorMode,
            c = Object(Le.a)(),
            s = Object(p.a)(c, 2),
            l = s[0],
            d = s[1],
            u = Object(hn.e)().width,
            b = Object(hn.a)(i).height,
            g = Object(o.useState)(),
            j = Object(p.a)(g, 2),
            h = j[0],
            v = j[1],
            O = Object(o.useCallback)(
              D.a.debounce(function (e) {
                e ? v(e.offsetHeight) : O(i.current);
              }, 250),
              [i]
            );
          return (
            Object(o.useEffect)(
              function () {
                O(i.current);
              },
              [u]
            ),
            Object(he.jsx)(wn, {
              box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
              isFullWidth: !0,
              px: 2,
              pt: 1.5,
              pb: 2,
              children: {
                header: {
                  title: 'Biography',
                  actions: Object(he.jsx)(_e.a, {
                    in: (h || 0) > 44,
                    unmountOnExit: !0,
                    children: Object(he.jsx)(bn, {
                      isDisabled: a,
                      onClick: function () {
                        return d.toggle();
                      },
                      size: 'sm',
                      variant: 'text',
                      children: 'Read '.concat(l ? 'Less' : 'More')
                    })
                  })
                },
                body: a
                  ? Object(he.jsx)(Z.c, {
                      width: '100%',
                      spacing: 1,
                      children: D.a.range(0, 3).map(function (e, t) {
                        return Object(he.jsx)(
                          Zo,
                          {
                            width: '100%',
                            offsetY: 6,
                            isLoaded: !a,
                            children: Object(he.jsx)(U.a, {
                              align: 'left',
                              fontSize: 'xs',
                              children: 'Lorem ipsum dolor sit amet'
                            })
                          },
                          t
                        );
                      })
                    })
                  : Object(he.jsx)(Be.a, {
                      in: l,
                      startingHeight: (h || 44) >= 44 ? 44 : b || 44,
                      children: Object(he.jsx)(Z.c, {
                        ref: i,
                        width: '100%',
                        alignItems: 'flex-start',
                        spacing: 2,
                        children: Tt(t)
                          .filter(function (e) {
                            return e;
                          })
                          .map(function (e, t) {
                            return Object(he.jsx)(
                              U.a,
                              {
                                align: 'left',
                                color: 'light' === r ? 'gray.900' : 'gray.50',
                                fontSize: 'md',
                                fontWeight: 'medium',
                                children: e
                              },
                              t
                            );
                          })
                      })
                    })
              }
            })
          );
        },
        ga = n(537),
        ja = n(538),
        ha = n(539),
        pa = function (e) {
          var t = (function (e, t) {
              var n = t.defaultColor,
                o = t.color,
                a = t.isDisabled,
                i = void 0 !== a && a;
              return {
                common: {
                  link: {
                    'cursor': 'pointer',
                    'width': 'auto',
                    'height': 'auto',
                    'minWidth': 'auto',
                    'minHeight': 'auto',
                    'maxWidth': 'none',
                    'maxHeight': 'none',
                    'display': 'flex',
                    'alignItems': 'center',
                    'justifyContent': 'center',
                    'padding': e.space[1],
                    'opacity': i ? 0.5 : 1,
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    'color': n,
                    '&:hover': { color: o },
                    '&:focus': { boxShadow: 'none' },
                    '& svg': {
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  icon: { display: 'block', fontSize: ''.concat(e.fontSizes['2xl'], ' !important') }
                }
              };
            })(Object(v.e)(), e),
            n = e.name,
            o = e.type,
            a = e.href,
            i = e.icon,
            r = e.isDisabled,
            c = void 0 !== r && r,
            s = Object(he.jsx)(Ho, {
              isLoaded: !c,
              children: Object(he.jsx)(Se.a, { as: i, sx: Object(b.a)({}, D.a.merge(t.common.icon)) })
            });
          return c
            ? Object(he.jsx)(f.a, { p: 1, children: s })
            : Object(he.jsx)(q.a, {
                'aria-label': ''.concat(n ? '"'.concat(n, '"') : '', ' ').concat(o, ' link'),
                'href': c ? '' : a,
                'isExternal': !0,
                'sx': Object(b.a)({}, t.common.link),
                'children': s
              });
        },
        va = function () {
          return Object(he.jsx)('svg', {
            'xmlns': 'http://www.w3.org/2000/svg',
            'aria-hidden': 'true',
            'role': 'img',
            'width': '24px',
            'height': '24px',
            'preserveAspectRatio': 'xMidYMid meet',
            'viewBox': '0 0 448 512',
            'children': Object(he.jsx)('path', {
              d: 'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1.2-.3.3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9c1.7 7.6 1.4 16.3 1.4 24.4c0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9c-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2c21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2.3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7c-6 0-4.9 8.9-4.9 12.7c0 .6-1.1 39.6 1.1 44.7c.8 1.6 2.2 2.4 3.8 2.4c7.8 0 6.2-9 6.2-14.4z',
              fill: 'currentColor'
            })
          });
        },
        Oa = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.socials,
            a = e.name,
            i = e.color,
            r = e.isLoading,
            c = void 0 !== r && r;
          return Object(he.jsxs)(he.Fragment, {
            children: [
              (null === o || void 0 === o ? void 0 : o.facebook_id)
                ? Object(he.jsx)(pa, {
                    defaultColor: i,
                    color: '#4267B2',
                    name: a,
                    href: 'https://www.facebook.com/'.concat(o.facebook_id),
                    type: 'Facebook',
                    icon: ga.a,
                    isDisabled: c
                  })
                : null,
              (null === o || void 0 === o ? void 0 : o.twitter_id)
                ? Object(he.jsx)(pa, {
                    defaultColor: i,
                    color: '#1DA1F2',
                    name: a,
                    href: 'https://www.twitter.com/'.concat(o.twitter_id),
                    type: 'Twitter',
                    icon: ja.a,
                    isDisabled: c
                  })
                : null,
              (null === o || void 0 === o ? void 0 : o.instagram_id)
                ? Object(he.jsx)(pa, {
                    defaultColor: i,
                    color: 'light' === n ? t.colors.gray[900] : t.colors.gray[50],
                    name: a,
                    href: 'https://www.instagram.com/'.concat(o.instagram_id),
                    type: 'Instagram',
                    icon: ha.a,
                    isDisabled: c
                  })
                : null,
              (null === o || void 0 === o ? void 0 : o.imdb_id)
                ? Object(he.jsx)(pa, {
                    defaultColor: i,
                    color: '#F5C518',
                    name: a,
                    href: 'https://www.imdb.com/name/'.concat(o.imdb_id),
                    type: 'IMDB',
                    icon: va,
                    isDisabled: c
                  })
                : null
            ]
          });
        },
        fa = function (e) {
          var t = Object(O.a)('(max-width: 768px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.orientation,
            a = void 0 === o ? 'vertical' : o,
            i = Object(je.a)(e, ['orientation']),
            r = n ? 'horizontal' : a;
          return Object(he.jsx)(Z.b, {
            direction: 'vertical' === r ? 'column' : 'row',
            spacing: 0,
            children: Object(he.jsx)(Oa, Object(b.a)({}, i))
          });
        },
        ma = function (e) {
          var t = e.children,
            n = e.alt,
            o = Object(v.e)(),
            a = Object(J.c)().colorMode;
          return Object(he.jsxs)(f.a, {
            width: '100%',
            height: ['150px', '150px', '200px', '250px', '300px', '350px'],
            position: 'relative',
            borderRadius: 'md',
            sx: {
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat',
              backgroundImage: 'url('.concat(Pt('pixel', 'light' === a ? 500 : 400, n), ')')
            },
            children: [
              Object(he.jsx)(f.a, { position: 'absolute', top: o.space[2], right: o.space[2], children: t.socials }),
              Object(he.jsx)(f.a, {
                position: 'absolute',
                bottom: ['-37.5px', '-37.5px', '-50px', '-62.5px', '-75px', '-87.5px'],
                left: ['37.5px', '37.5px', '50px', '62.5px', '75px', '87.5px'],
                children: t.poster
              })
            ]
          });
        },
        xa = function (e) {
          var t,
            n = Object(J.c)().colorMode,
            o = e.birthday,
            a = e.place_of_birth,
            i = e.deathday,
            r = e.isLoading,
            c = void 0 !== r && r,
            s = e.isError,
            l = void 0 !== s && s;
          return Object(he.jsx)(_e.a, {
            in: !!c || (!l && (null === (t = o || '') || void 0 === t ? void 0 : t.length) > 0),
            unmountOnExit: !0,
            children: Object(he.jsx)(Zo, {
              offsetY: 7,
              isLoaded: !c,
              children: Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === n ? 'gray.400' : 'gray.500',
                fontSize: 'sm',
                children: 'Born on '
                  .concat(K()(o || '', 'YYYY-MM-DD').format('LL'))
                  .concat(a ? ' in '.concat(a) : '')
                  .concat(i ? ' - '.concat(K()(i || '', 'YYYY-MM-DD').format('LL')) : '', ' (')
                  .concat(K()(i || new Date()).diff(K()(o || '', 'YYYY-MM-DD'), 'years'), ' years old)')
              })
            })
          });
        },
        ya = n(540),
        Aa = n(541),
        wa = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            a = (function (e, t) {
              var n = t.isDisabled,
                o = void 0 !== n && n;
              return {
                arrow: { content: '""', width: '30px', height: '100%', display: 'block', pointerEvents: 'none' },
                light: {
                  left: {
                    background: o
                      ? 'transparent'
                      : 'linear-gradient(to right, '.concat(e.colors.gray[50], ' 25%, rgba(0, 0, 0, 0) 75%)')
                  },
                  right: {
                    background: o
                      ? 'transparent'
                      : 'linear-gradient(to left, '.concat(e.colors.gray[50], ' 25%, rgba(0, 0, 0, 0) 75%)')
                  }
                },
                dark: {
                  left: {
                    background: o
                      ? 'transparent'
                      : 'linear-gradient(to right, '.concat(e.colors.gray[900], ' 25%, rgba(0, 0, 0, 0) 75%)')
                  },
                  right: {
                    background: o
                      ? 'transparent'
                      : 'linear-gradient(to left, '.concat(e.colors.gray[900], ' 25%, rgba(0, 0, 0, 0) 75%)')
                  }
                }
              };
            })(t, e),
            i = e.direction,
            r = e.isDisabled,
            c = void 0 !== r && r,
            s = e.reset,
            l = void 0 !== s && s,
            d = e.onScrollClick,
            u = Object(Le.a)(),
            g = Object(p.a)(u, 2),
            j = g[0],
            h = g[1];
          return (
            Object(hn.c)(
              function () {
                return d(i);
              },
              j ? 25 : null
            ),
            Object(o.useEffect)(
              function () {
                (l || c) && h.off();
              },
              [l, c]
            ),
            Object(he.jsx)(ke.a, {
              width: 'auto',
              height: '100%',
              position: 'absolute',
              left: 'left' === i ? 0 : void 0,
              right: 'right' === i ? 0 : void 0,
              zIndex: 1,
              backgroundColor: 'transparent',
              _after: 'left' === i ? Object(b.a)({}, D.a.merge(a.arrow, a[n][i])) : void 0,
              _before: 'right' === i ? Object(b.a)({}, D.a.merge(a.arrow, a[n][i])) : void 0,
              children: Object(he.jsx)(_e.a, {
                in: !c,
                unmountOnExit: !0,
                style: { height: '100%' },
                children: Object(he.jsx)(ke.a, {
                  height: '100%',
                  backgroundColor: 'light' === n ? 'gray.50' : 'gray.900',
                  children: Object(he.jsx)(Ee, {
                    'aria-label': 'Scroll '.concat(i),
                    'icon': 'left' === i ? ya.a : Aa.a,
                    'onClick': function (e) {
                      return (function (e) {
                        e.preventDefault(), d(i);
                      })(e);
                    },
                    'onMouseDown': function (e) {
                      return (function (e) {
                        e.preventDefault(), 0 === e.button ? h.on() : h.off();
                      })(e);
                    },
                    'onMouseUp': function (e) {
                      return (function (e) {
                        e.preventDefault(), h.off();
                      })(e);
                    },
                    'size': 'sm',
                    'variant': 'icon'
                  })
                })
              })
            })
          );
        },
        ka = { left: !0, right: !1 },
        Ca = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(hn.e)().width,
            a = Object(ge.g)(),
            i = e.children,
            r = e.width,
            c = e.spacing,
            s = e.isLoading,
            l = void 0 !== s && s,
            d = Object(o.useState)(ka),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            j = Object(o.useState)(!1),
            h = Object(p.a)(j, 2),
            v = h[0],
            O = h[1],
            f = Object(o.useCallback)(
              D.a.debounce(function (e) {
                if (e) {
                  var n = e.scrollLeft + e.offsetWidth,
                    o = 0 === e.scrollLeft,
                    a = 0 === e.scrollLeft ? e.scrollWidth <= e.offsetWidth : n >= e.scrollWidth;
                  g({ left: o, right: a }), O(!(!o && !a));
                } else f(t.current);
              }, 50),
              [t, g, O]
            ),
            m = Object(o.useCallback)(
              function (e) {
                t &&
                  t.current &&
                  (t.current.scrollLeft = 'left' === e ? t.current.scrollLeft - 10 : t.current.scrollLeft + 10);
              },
              [t]
            );
          return (
            Object(o.useEffect)(
              function () {
                O(!0);
              },
              [a]
            ),
            Object(o.useEffect)(
              function () {
                f(t.current);
              },
              [n, l]
            ),
            Object(he.jsxs)(Z.a, {
              width: r || '100%',
              maxWidth: r || '100%',
              height: '100%',
              position: 'relative',
              spacing: 0,
              children: [
                Object(he.jsx)(wa, { direction: 'left', isDisabled: b.left, reset: v, onScrollClick: m }),
                Object(he.jsx)(Z.a, {
                  ref: t,
                  width: '100%',
                  maxWidth: '100%',
                  overflowX: 'auto',
                  spacing: c || 1,
                  onLoad: function () {
                    return f(t.current);
                  },
                  onScroll: function () {
                    return f(t.current);
                  },
                  sx: { 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } },
                  children: i
                }),
                Object(he.jsx)(wa, { direction: 'right', isDisabled: b.right, reset: v, onScrollClick: m })
              ]
            })
          );
        },
        Sa = Gt(200, 4),
        Da = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.departments,
            o = e.isLoading,
            a = void 0 !== o && o;
          return Object(he.jsx)(Ca, {
            isLoading: a,
            children: Object(he.jsx)(Z.a, {
              width: '100%',
              maxWidth: '100%',
              divider: Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === t ? 'gray.400' : 'gray.500',
                fontSize: 'md',
                mx: 0.75,
                children: '\u2022'
              }),
              children: Object(In.a)(a ? D.a.range(0, 4) : n).map(function (e, n) {
                return Object(he.jsx)(
                  Zo,
                  {
                    width: a ? ''.concat(Sa[Math.floor(Math.random() * Sa.length)], 'px') : 'auto',
                    offsetY: 9.5,
                    isLoaded: !a,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === t ? 'gray.400' : 'gray.500',
                      fontSize: 'md',
                      whiteSpace: 'nowrap',
                      children: 'number' !== typeof e ? e : 'Lorem'
                    })
                  },
                  n
                );
              })
            })
          });
        },
        Ea = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = e.name,
            i = e.path,
            r = e.isLoading,
            c = void 0 !== r && r,
            s = e.isError,
            l = void 0 !== s && s,
            d = e.onClickPoster,
            u = Object(Le.a)(),
            b = Object(p.a)(u, 2),
            g = b[0],
            j = b[1];
          return Object(he.jsx)(So, {
            width: o ? '100%' : ['125px', '125px', '175px', '225px', '275px', '325px'],
            border: o ? 'none' : '4px',
            borderColor: 'light' === t ? 'gray.50' : 'gray.900',
            borderRadius: o ? 'base' : 'full',
            ratio: 1,
            isDisabled: c || l || g,
            onClick: i
              ? function () {
                  return d(i);
                }
              : void 0,
            children: Object(he.jsx)(Ho, {
              isLoaded: !c,
              borderRadius: o ? 'base' : 'full',
              children: Object(he.jsx)(Oo, {
                width: '100%',
                alt: ''.concat(a ? '"'.concat(a, '"') : '', ' profile poster'),
                mediaType: 'person',
                onError: function () {
                  return j.on();
                },
                onLoad: function () {
                  return j.off();
                },
                thumbnailSrc: ''.concat('https://image.tmdb.org/t/p', '/w45').concat(i),
                fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(i)
              })
            })
          });
        },
        La = [
          'calc(100% - 162.5px)',
          'calc(100% - 162.5px)',
          'calc(100% - 225px)',
          'calc(100% - 287.5px)',
          'calc(100% - 350px)',
          'calc(100% - 412.5px)'
        ],
        _a = ['162.5px', '162.5px', '225px', '287.5px', '350px', '412.5px'],
        Ba = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = e.person,
            i = e.departments,
            r = e.socials,
            c = e.isLoading,
            s = void 0 !== c && c,
            l = e.isError,
            d = void 0 !== l && l,
            u = e.onClickPoster;
          return Object(he.jsx)(wn, {
            isFullWidth: !0,
            p: 2,
            children: {
              body: Object(he.jsxs)(Z.c, {
                width: '100%',
                alignItems: 'stretch',
                spacing: 2,
                children: [
                  o
                    ? Object(he.jsx)(Ea, {
                        name: null === a || void 0 === a ? void 0 : a.name,
                        path: null === a || void 0 === a ? void 0 : a.profile_path,
                        isLoading: s,
                        isError: d,
                        onClickPoster: u
                      })
                    : Object(he.jsx)(ma, {
                        alt: ''.concat((null === a || void 0 === a ? void 0 : a.name) || 'Person', ' background'),
                        children: {
                          poster: Object(he.jsx)(Ea, {
                            name: null === a || void 0 === a ? void 0 : a.name,
                            path: null === a || void 0 === a ? void 0 : a.profile_path,
                            isLoading: s,
                            isError: d,
                            onClickPoster: u
                          }),
                          socials: Object(he.jsx)(fa, {
                            socials: r,
                            name: null === a || void 0 === a ? void 0 : a.name,
                            color: 'light' === t ? 'gray.50' : 'gray.900',
                            isLoading: s
                          })
                        }
                      }),
                  Object(he.jsxs)(Z.c, {
                    width: o ? '100%' : La,
                    maxWidth: o ? '100%' : La,
                    position: 'relative',
                    left: o ? 0 : _a,
                    alignItems: 'flex-start',
                    spacing: 2,
                    children: [
                      Object(he.jsxs)(Z.c, {
                        width: '100%',
                        maxWidth: '100%',
                        alignItems: 'flex-start',
                        spacing: s ? 0.5 : 0,
                        children: [
                          Object(he.jsx)(Zo, {
                            offsetY: o ? 12 : 18,
                            isLoaded: !s,
                            children: Object(he.jsx)(U.a, {
                              align: 'left',
                              color: 'light' === t ? 'gray.900' : 'gray.50',
                              fontSize: o ? '2xl' : '4xl',
                              fontWeight: 'bold',
                              children: (null === a || void 0 === a ? void 0 : a.name) || 'Unknown'
                            })
                          }),
                          Object(he.jsx)(Da, { departments: i, isLoading: s })
                        ]
                      }),
                      Object(he.jsx)(xa, {
                        birthday: null === a || void 0 === a ? void 0 : a.birthday,
                        place_of_birth: null === a || void 0 === a ? void 0 : a.place_of_birth,
                        deathday: null === a || void 0 === a ? void 0 : a.deathday,
                        isLoading: s,
                        isError: d
                      }),
                      Object(he.jsx)(_e.a, {
                        in: !d,
                        unmountOnExit: !0,
                        style: { width: o ? '100%' : 'auto' },
                        children: Object(he.jsx)(oa, {
                          renderButton: function (e) {
                            var t = e.isLiked,
                              n = e.onClick;
                            return Object(he.jsx)(bn, {
                              color: t ? 'red' : 'gray',
                              isFullWidth: o,
                              isDisabled: s || !a,
                              leftIcon: t ? tn.a : nn.a,
                              onClick: function () {
                                return n();
                              },
                              size: 'md',
                              variant: 'outlined',
                              children: t ? 'Liked' : 'Like'
                            });
                          },
                          mediaType: 'person',
                          mediaItem: a
                        })
                      })
                    ]
                  })
                ]
              })
            }
          });
        },
        Ma = n.p + 'static/media/blue.8d4e0da3.svg',
        Ta = n.p + 'static/media/cyan.1082f641.svg',
        za = n.p + 'static/media/green.1fbf3586.svg',
        Ia = n.p + 'static/media/orange.085621da.svg',
        Fa = n.p + 'static/media/pink.83cbc8fa.svg',
        Qa = n.p + 'static/media/purple.aab5c0f3.svg',
        Na = n.p + 'static/media/teal.be7f7952.svg',
        Ya = n.p + 'static/media/yellow.e55569bc.svg',
        Wa = { blue: Ma, cyan: Ta, green: za, orange: Ia, pink: Fa, purple: Qa, teal: Na, yellow: Ya },
        Pa = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object($n.a)({ 'base': '75%', 'sm': '75%', 'md': '50%', 'lg': '50%', 'xl': '30%', '2xl': '30%' }),
            o = e.button,
            a = void 0 === o ? void 0 : o,
            i = e.hasIllustration,
            r = void 0 === i || i,
            c = e.label,
            s = e.description,
            l = e.size,
            d = void 0 === l ? 'md' : l,
            u = e.variant,
            b = void 0 === u ? 'transparent' : u,
            g = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(eo.a, {
            in: !0,
            style: { width: '100%' },
            children: Object(he.jsx)(wn, {
              isFullWidth: !0,
              variant: b,
              p: (function () {
                if (r)
                  switch (d) {
                    case 'xs':
                      return 1;
                    case 'sm':
                      return 2;
                    case 'lg':
                      return 4;
                    case 'xl':
                      return 6;
                    default:
                      return 3;
                  }
                else
                  switch (d) {
                    case 'xs':
                      return 1;
                    case 'sm':
                      return 2;
                    case 'lg':
                      return 6;
                    case 'xl':
                      return 8;
                    default:
                      return 4;
                  }
              })(),
              children: {
                body: Object(he.jsxs)(Z.c, {
                  width: '100%',
                  spacing: 2,
                  children: [
                    r
                      ? Object(he.jsx)(to.a, {
                          maxWidth: n,
                          alt: 'Error illustration',
                          src: (function () {
                            switch (g) {
                              case 'blue':
                                return Wa.blue;
                              case 'cyan':
                                return Wa.cyan;
                              case 'green':
                                return Wa.green;
                              case 'orange':
                                return Wa.orange;
                              case 'pink':
                                return Wa.pink;
                              case 'purple':
                                return Wa.purple;
                              case 'teal':
                                return Wa.teal;
                              case 'yellow':
                                return Wa.yellow;
                              default:
                                return '';
                            }
                          })()
                        })
                      : null,
                    c || s
                      ? Object(he.jsxs)(Z.c, {
                          spacing: 0,
                          children: [
                            c
                              ? Object(he.jsx)(U.a, {
                                  align: 'center',
                                  fontSize: 'md',
                                  fontWeight: 'semibold',
                                  color: 'light' === t ? 'gray.900' : 'gray.50',
                                  children: c
                                })
                              : null,
                            s
                              ? Object(he.jsx)(U.a, {
                                  align: 'center',
                                  fontSize: 'xs',
                                  color: 'light' === t ? 'gray.400' : 'gray.500',
                                  children: s
                                })
                              : null
                          ]
                        })
                      : null,
                    a || null
                  ]
                })
              }
            })
          });
        },
        Ra = n(572),
        Ga = n(274),
        Va = n(164),
        Ha = n.n(Va),
        Ja = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(O.a)('(max-width: 600px)'),
            a = Object(p.a)(o, 1)[0],
            i = w(function (e) {
              return e.user.ui.theme.color;
            }),
            r = e.id,
            c = e.mediaType,
            s = e.title,
            l = e.subtitle,
            d = e.date;
          return Object(he.jsxs)(Z.a, {
            justifyContent: 'space-between',
            width: '100%',
            spacing: 2,
            children: [
              Object(he.jsxs)(Z.c, {
                alignItems: 'flex-start',
                spacing: 0,
                children: [
                  Object(he.jsx)(Z.a, {
                    spacing: 2,
                    children: Object(he.jsx)(pe, {
                      to: { pathname: '/'.concat(c, '/').concat(r) },
                      children: Object(he.jsxs)(U.a, {
                        align: 'left',
                        color: 'light' === n ? 'gray.900' : 'gray.50',
                        fontSize: a ? 'sm' : 'md',
                        fontWeight: 'semibold',
                        sx: {
                          transition: ''
                            .concat(t.transition.duration.faster, ' ')
                            .concat(t.transition.easing['ease-out'])
                        },
                        _focus: { boxShadow: 'none' },
                        _hover: { color: ''.concat(i, '.').concat('light' === n ? 500 : 400) },
                        children: [
                          a ? ''.concat(s, ' ') : s,
                          d
                            ? d &&
                              (function (e) {
                                return K()(new Date()).isBefore(K()(e, 'YYYY-MM-DD'));
                              })(d)
                              ? Object(he.jsx)(yo, {
                                  label: 'In Production',
                                  color: Wt(i),
                                  size: a ? 'xs' : 'sm',
                                  ml: a ? 0 : 1
                                })
                              : null
                            : Object(he.jsx)(yo, {
                                label: 'Announced',
                                color: Wt(i),
                                size: a ? 'xs' : 'sm',
                                ml: a ? 0 : 1
                              })
                        ]
                      })
                    })
                  }),
                  Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === n ? 'gray.400' : 'gray.500',
                    fontSize: a ? 'xs' : 'sm',
                    children: l
                  })
                ]
              }),
              d
                ? Object(he.jsx)(U.a, {
                    align: 'right',
                    color: 'light' === n ? 'gray.400' : 'gray.500',
                    fontSize: a ? 'xs' : 'sm',
                    children: Ft(d || '', 'year')
                  })
                : null
            ]
          });
        },
        Za = function (e) {
          var t = e.movies;
          return Object(he.jsx)(he.Fragment, {
            children: (function () {
              var e = ua()(
                  t.filter(function (e) {
                    return e.release_date;
                  }),
                  'release_date',
                  { reverse: !0 }
                ),
                n = ua()(
                  t.filter(function (e) {
                    return !e.release_date;
                  }),
                  'title',
                  { reverse: !0 }
                );
              return [].concat(Object(In.a)(n), Object(In.a)(e));
            })().map(function (e) {
              return Object(he.jsx)(
                Ja,
                {
                  id: e.id,
                  mediaType: 'movie',
                  title: e.title,
                  subtitle: e.character ? 'As '.concat(e.character) : 'Unknown',
                  date: e.release_date
                },
                e.id
              );
            })
          });
        },
        Ua = function (e) {
          var t = e.tv;
          return Object(he.jsx)(he.Fragment, {
            children: (function () {
              var e = ua()(
                  t.filter(function (e) {
                    return !e.first_air_date;
                  }),
                  'name',
                  { reverse: !0 }
                ),
                n = ua()(
                  t.filter(function (e) {
                    return e.first_air_date;
                  }),
                  'first_air_date',
                  { reverse: !0 }
                );
              return [].concat(Object(In.a)(e), Object(In.a)(n));
            })().map(function (e) {
              return Object(he.jsx)(
                Ja,
                {
                  id: e.id,
                  mediaType: 'tv',
                  title: e.name,
                  subtitle: ''
                    .concat(
                      (null === e || void 0 === e ? void 0 : e.episode_count)
                        ? ''.concat(e.episode_count, ' episodes as')
                        : 'As',
                      ' '
                    )
                    .concat(e.character ? e.character : 'Unknown'),
                  date: e.first_air_date
                },
                e.id
              );
            })
          });
        },
        qa = function (e) {
          var t = e.movies;
          return Object(he.jsx)(he.Fragment, {
            children: (function () {
              var e = ua()(
                  t.filter(function (e) {
                    return e.release_date;
                  }),
                  'release_date',
                  { reverse: !0 }
                ),
                n = ua()(
                  t.filter(function (e) {
                    return !e.release_date;
                  }),
                  'title',
                  { reverse: !0 }
                );
              return [].concat(Object(In.a)(n), Object(In.a)(e));
            })().map(function (e) {
              return Object(he.jsx)(
                Ja,
                {
                  id: e.id,
                  mediaType: 'movie',
                  title: e.title,
                  subtitle: e.job ? e.job : 'Unknown',
                  date: e.release_date
                },
                e.id
              );
            })
          });
        },
        Xa = function (e) {
          var t = e.tv;
          return Object(he.jsx)(he.Fragment, {
            children: (function () {
              var e = ua()(
                  t.filter(function (e) {
                    return !e.first_air_date;
                  }),
                  'name',
                  { reverse: !0 }
                ),
                n = ua()(
                  t.filter(function (e) {
                    return e.first_air_date;
                  }),
                  'first_air_date',
                  { reverse: !0 }
                );
              return [].concat(Object(In.a)(e), Object(In.a)(n));
            })().map(function (e) {
              return Object(he.jsx)(
                Ja,
                {
                  id: e.id,
                  mediaType: 'tv',
                  title: e.name,
                  subtitle: ''
                    .concat(
                      (null === e || void 0 === e ? void 0 : e.episode_count)
                        ? ''.concat(e.episode_count, ' episodes as')
                        : 'As',
                      ' '
                    )
                    .concat(e.job),
                  date: e.first_air_date
                },
                e.id
              );
            })
          });
        },
        Ka = function (e) {
          var t = e.children,
            n = e.title,
            o = e.total,
            a = Object(O.a)('(max-width: 600px)'),
            i = Object(p.a)(a, 1)[0];
          return Object(he.jsx)(wn, {
            box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
            isFullWidth: !0,
            variant: 'transparent',
            children: {
              header: { title: n, actions: Object(he.jsx)(yo, { label: String(o), size: i ? 'sm' : 'md' }) },
              body: Object(he.jsx)(Z.c, { width: '100%', spacing: 2, children: t })
            }
          });
        },
        $a = function (e) {
          var t,
            n,
            o,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            g,
            j,
            h,
            f,
            m,
            x = Object(v.e)(),
            y = Object(J.c)().colorMode,
            A = Object(O.a)('(max-width: 600px)'),
            k = Object(p.a)(A, 1)[0],
            C = (function (e, t) {
              var n = t.isExpanded,
                o = void 0 !== n && n;
              return {
                common: {
                  accordion: {
                    width: '100%',
                    border: 'none',
                    borderRadius: 'lg',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  button: {
                    'width': '100%',
                    'display': 'flex',
                    'justifyContent': 'space-between',
                    'backgroundColor': 'transparent',
                    'padding': ''.concat(e.space[1.5], ' ').concat(e.space[2]),
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:focus': { boxShadow: 'none' }
                  },
                  icon: {
                    'transform': o ? 'rotate(360deg)' : 'rotate(270deg)',
                    '&.MuiSvgIcon-root': {
                      fontSize: 'xl',
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  },
                  panel: {
                    padding: ''
                      .concat(e.space[0.5], ' ')
                      .concat(e.space[2], ' ')
                      .concat(e.space[2], ' ')
                      .concat(e.space[2]),
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  }
                },
                light: {
                  accordion: {
                    'backgroundColor': o ? 'gray.100' : 'transparent',
                    '&:hover': {
                      'backgroundColor': 'gray.100',
                      '& .chakra-accordion__button': { backgroundColor: 'transparent' },
                      '& .MuiSvgIcon-root': { color: 'gray.900' }
                    }
                  }
                },
                dark: {
                  accordion: {
                    'backgroundColor': o ? 'gray.800' : 'transparent',
                    '&:hover': {
                      'backgroundColor': 'gray.800',
                      '& .chakra-accordion__button': { backgroundColor: 'transparent' },
                      '& .MuiSvgIcon-root': { color: 'gray.50' }
                    }
                  }
                }
              };
            })(x, e),
            S = w(function (e) {
              return e.user.ui.theme.color;
            }),
            E = e.label,
            L = e.credits,
            _ = e.isExpanded;
          return Object(he.jsxs)(Ra.c, {
            sx: Object(b.a)({}, D.a.merge(C.common.accordion, C[y].accordion)),
            children: [
              Object(he.jsx)(Ga.a, {
                children: Object(he.jsx)('span', { id: ''.concat(E.toLowerCase(), '-accordion') })
              }),
              Object(he.jsxs)(Ra.b, {
                sx: Object(b.a)({}, D.a.merge(C.common.button)),
                children: [
                  Object(he.jsxs)(U.a, {
                    textAlign: 'left',
                    color: 'light' === y ? 'gray.900' : 'gray.50',
                    fontSize: k ? 'xl' : '2xl',
                    fontWeight: 'semibold',
                    children: [
                      k ? ''.concat(E, ' ') : E,
                      Object(he.jsx)(yo, {
                        label: ''.concat(
                          ((null === (t = L.cast) || void 0 === t || null === (n = t.movie) || void 0 === n
                            ? void 0
                            : n.length) || 0) +
                            ((null === (o = L.cast) || void 0 === o || null === (a = o.tv) || void 0 === a
                              ? void 0
                              : a.length) || 0) +
                            ((null === (i = L.crew) || void 0 === i || null === (r = i.movie) || void 0 === r
                              ? void 0
                              : r.length) || 0) +
                            ((null === (c = L.crew) || void 0 === c || null === (s = c.tv) || void 0 === s
                              ? void 0
                              : s.length) || 0)
                        ),
                        color: _ ? Wt(S) : 'gray',
                        size: k ? 'md' : 'lg',
                        ml: k ? 0 : 2
                      })
                    ]
                  }),
                  Object(he.jsx)(Se.a, {
                    as: Ha.a,
                    color: 'light' === y ? 'gray.400' : 'gray.500',
                    sx: Object(b.a)({}, D.a.merge(C.common.icon))
                  })
                ]
              }),
              Object(he.jsx)(Ra.d, {
                sx: Object(b.a)({}, D.a.merge(C.common.panel)),
                children: Object(he.jsx)(Z.c, {
                  width: '100%',
                  spacing: 6,
                  children:
                    'Actor' === E
                      ? Object(he.jsxs)(he.Fragment, {
                          children: [
                            (null === (l = L.cast) || void 0 === l ? void 0 : l.movie) &&
                            (null === (d = L.cast) || void 0 === d ? void 0 : d.movie.length) > 0
                              ? Object(he.jsx)(Ka, {
                                  title: 'Movies',
                                  total: L.cast.movie.length,
                                  children: Object(he.jsx)(Za, { movies: L.cast.movie })
                                })
                              : null,
                            (null === (u = L.cast) || void 0 === u ? void 0 : u.tv) &&
                            (null === (g = L.cast) || void 0 === g ? void 0 : g.tv.length) > 0
                              ? Object(he.jsx)(Ka, {
                                  title: 'TV Shows',
                                  total: L.cast.tv.length,
                                  children: Object(he.jsx)(Ua, { tv: L.cast.tv })
                                })
                              : null
                          ]
                        })
                      : Object(he.jsxs)(he.Fragment, {
                          children: [
                            (null === (j = L.crew) || void 0 === j ? void 0 : j.movie) &&
                            (null === (h = L.crew) || void 0 === h ? void 0 : h.movie.length) > 0
                              ? Object(he.jsx)(Ka, {
                                  title: 'Movies',
                                  total: L.crew.movie.length,
                                  children: Object(he.jsx)(qa, { movies: L.crew.movie })
                                })
                              : null,
                            (null === (f = L.crew) || void 0 === f ? void 0 : f.tv) &&
                            (null === (m = L.crew) || void 0 === m ? void 0 : m.tv.length) > 0
                              ? Object(he.jsx)(Ka, {
                                  title: 'TV Shows',
                                  total: L.crew.tv.length,
                                  children: Object(he.jsx)(Xa, { tv: L.crew.tv })
                                })
                              : null
                          ]
                        })
                })
              })
            ]
          });
        },
        ei = Gt(300, 5),
        ti = function () {
          var e = Object(v.e)(),
            t = Object(J.c)().colorMode,
            n = (function (e) {
              return {
                common: {
                  button: {
                    'width': '100%',
                    'display': 'flex',
                    'justifyContent': 'space-between',
                    'backgroundColor': 'transparent',
                    'border': 'none',
                    'borderRadius': 'lg',
                    'padding': ''.concat(e.space[1], ' ').concat(e.space[2]),
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:focus': { boxShadow: 'none' }
                  },
                  icon: {
                    'transform': 'rotate(270deg)',
                    '&.MuiSvgIcon-root': {
                      fontSize: 'xl',
                      transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                    }
                  }
                }
              };
            })(e);
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            justifyContent: 'space-between',
            sx: Object(b.a)({}, D.a.merge(n.common.button)),
            children: [
              Object(he.jsx)(Ho, { width: ''.concat(ei[Math.floor(Math.random() * ei.length)], 'px'), height: '16px' }),
              Object(he.jsx)(Se.a, {
                as: Ha.a,
                color: 'light' === t ? 'gray.400' : 'gray.500',
                sx: Object(b.a)({}, D.a.merge(n.common.icon))
              })
            ]
          });
        },
        ni = function (e) {
          var t = e.departments,
            n = e.expanded,
            o = e.isLoading,
            a = void 0 !== o && o,
            i = e.onChange;
          return Object(he.jsx)(he.Fragment, {
            children: a
              ? D.a.range(0, 5).map(function (e, t) {
                  return Object(he.jsx)(ti, {}, t);
                })
              : Object(he.jsx)(Ra.a, {
                  width: '100%',
                  allowMultiple: !0,
                  allowToggle: !0,
                  defaultIndex: [],
                  index: n,
                  onChange: function (e) {
                    return i(e);
                  },
                  children: Object(he.jsx)(Z.c, {
                    width: '100%',
                    spacing: 2,
                    children: t.map(function (e, t) {
                      return Object(he.jsx)(
                        $a,
                        Object(b.a)(Object(b.a)({}, e), {}, { isExpanded: !!Array.isArray(n) && n.includes(t) }),
                        ''.concat(e.label.toLowerCase(), '-accordion')
                      );
                    })
                  })
                })
          });
        },
        oi = n(119),
        ai = Gt(200, 4),
        ii = function (e) {
          var t = Object(J.c)().colorMode,
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = e.departments,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = e.onToggleAccordion;
          return Object(he.jsxs)(Z.a, {
            justifyContent: 'stretch',
            spacing: i ? 1 : 0,
            children: [
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === t ? 'gray.400' : 'gray.500',
                fontSize: 'sm',
                whiteSpace: 'nowrap',
                py: 0.75,
                children: 'Jump to:'
              }),
              Object(he.jsx)(Ca, {
                width: 'calc(100% - 61.47px)',
                spacing: '0',
                isLoading: i,
                children: Object(he.jsx)(Z.a, {
                  width: '100%',
                  maxWidth: '100%',
                  divider: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === t ? 'gray.400' : 'gray.500',
                    fontSize: 'md',
                    mx: i ? 0.75 : 0,
                    children: '\u2022'
                  }),
                  children: Object(In.a)(i ? D.a.range(0, 4) : o).map(function (e, t) {
                    return Object(he.jsx)(
                      Zo,
                      {
                        width: i ? ''.concat(ai[Math.floor(Math.random() * ai.length)], 'px') : 'auto',
                        offsetY: 6,
                        isLoaded: !i,
                        children: Object(he.jsx)(oi.Link, {
                          to: ''.concat('number' !== typeof e ? e.toLowerCase() : '', '-accordion'),
                          spy: !0,
                          smooth: !0,
                          offset: -81,
                          children: Object(he.jsx)(bn, {
                            color: Wt(n),
                            onClick:
                              'number' !== typeof e
                                ? function () {
                                    return r(e);
                                  }
                                : void 0,
                            isDisabled: i,
                            size: 'sm',
                            variant: 'text',
                            children: 'number' !== typeof e ? e : 'Lorem'
                          })
                        })
                      },
                      t
                    );
                  })
                })
              })
            ]
          });
        },
        ri = function (e) {
          var t = e.departments,
            n = e.name,
            a = e.isSuccess,
            i = void 0 !== a && a,
            r = e.isLoading,
            c = void 0 !== r && r,
            s = e.isError,
            l = void 0 !== s && s,
            d = Object(o.useState)([]),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1];
          return Object(he.jsx)(wn, {
            box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
            isFullWidth: !0,
            variant: 'outlined',
            px: 2,
            pt: 1.5,
            pb: 2,
            children: {
              header: {
                title: 'Filmography',
                actions: Object(he.jsx)(_e.a, {
                  in: !l,
                  unmountOnExit: !0,
                  children: Object(he.jsx)(bn, {
                    isDisabled: c,
                    onClick: function () {
                      return (function () {
                        var e = Array.isArray(b) ? b.length : 0;
                        g(
                          e === t.length
                            ? []
                            : t.map(function (e, t) {
                                return t;
                              })
                        );
                      })();
                    },
                    size: 'sm',
                    variant: 'text',
                    children: (Array.isArray(b) ? b.length : 0) === t.length ? 'Hide all' : 'Show all'
                  })
                })
              },
              body: Object(he.jsxs)(Z.c, {
                width: '100%',
                spacing: 2,
                children: [
                  Object(he.jsx)(Be.a, {
                    in: !l,
                    unmountOnExit: !0,
                    style: { width: '100%' },
                    children: Object(he.jsx)(ii, {
                      departments: t.map(function (e) {
                        return e.label;
                      }),
                      isLoading: c,
                      onToggleAccordion: function (e) {
                        var n = Array.isArray(b) ? b : [],
                          o = t.findIndex(function (t) {
                            return t.label === e;
                          });
                        n.includes(o) || g([].concat(Object(In.a)(n), [o]));
                      }
                    })
                  }),
                  l
                    ? Object(he.jsx)(Pa, {
                        label: 'Oh no! Something went wrong',
                        description: 'Failed to fetch '.concat(
                          n ? '"'.concat(n, '"') : '',
                          ' filmography credits list!'
                        ),
                        variant: 'transparent'
                      })
                    : i && t && 0 === t.length
                    ? Object(he.jsx)(bo, {
                        label: ''.concat(n ? '"'.concat(n, '"') : '', ' has no credits'),
                        variant: 'transparent'
                      })
                    : Object(he.jsx)(ni, {
                        departments: t,
                        expanded: b,
                        isLoading: c,
                        onChange: function (e) {
                          return g(e);
                        }
                      })
                ]
              })
            }
          });
        },
        ci = function (e) {
          var t = e.direction,
            n = e.isLoading,
            a = void 0 !== n && n,
            i = e.isDisabled,
            r = void 0 !== i && i,
            c = e.reset,
            s = void 0 !== c && c,
            l = e.variant,
            d = e.onScrollClick,
            u = Object(Le.a)(),
            b = Object(p.a)(u, 2),
            g = b[0],
            j = b[1],
            h = Object(Le.a)(),
            v = Object(p.a)(h, 2),
            O = v[0],
            f = v[1];
          return (
            Object(hn.c)(
              function () {
                return d(t);
              },
              g ? 25 : null
            ),
            Object(o.useEffect)(
              function () {
                (s || r) && j.off();
              },
              [s, r]
            ),
            Object(he.jsx)(Ht, {
              'aria-label': 'Scroll '.concat(t.toLowerCase()),
              'closeOnClick': !1,
              'closeOnMouseDown': !1,
              'label': 'Scroll '
                .concat(t.toLowerCase(), ' (')
                .concat(g ? 'Auto-Scroll ON' : 'Hold for Auto-Scroll', ')'),
              'placement': 'top',
              'isOpen': O,
              'isDisabled': a || r,
              'gutter': g ? 8 : 10,
              'children': Object(he.jsx)(Ee, {
                'aria-label': 'Scroll left',
                'isDisabled': a || r,
                'icon': 'left' === t ? Qo.a : No.a,
                'onClick': function (e) {
                  return (function (e) {
                    e.preventDefault(), d(t);
                  })(e);
                },
                'onMouseDown': function (e) {
                  return (function (e) {
                    e.preventDefault(), 0 === e.button ? j.on() : j.off();
                  })(e);
                },
                'onMouseUp': function (e) {
                  return (function (e) {
                    e.preventDefault(), j.off();
                  })(e);
                },
                'onMouseEnter': function () {
                  return f.on();
                },
                'onMouseLeave': function () {
                  return f.off();
                },
                'size': 'transparent' === l ? 'md' : 'sm',
                'variant': 'outlined'
              })
            })
          );
        },
        si = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.children,
            o = e.gridRef,
            a = e.hasDivider,
            i = void 0 !== a && a,
            r = e.handleScrollChange,
            c = e.variant,
            s = void 0 === c ? 'transparent' : c;
          return Object(he.jsx)(f.a, {
            ref: o,
            width: '100%',
            overflowX: 'auto',
            px: 'transparent' === s ? 2 : 0,
            py: i ? 2 : 0,
            sx: { 'scrollbarWidth': 'none', '&::-webkit-scrollbar': { display: 'none' } },
            onLoad: function (e) {
              return r(e);
            },
            onScroll: function (e) {
              return r(e);
            },
            children: Object(he.jsx)(f.a, {
              width: 'auto',
              minWidth: '100%',
              height: '100%',
              display: 'transparent' === s ? 'inline-block' : 'block',
              border: 'transparent' === s ? 'solid2' : 'none',
              borderColor: 'light' === t ? 'gray.200' : 'gray.700',
              borderRadius: 'xl',
              px: 'transparent' === s ? 2 : 0,
              py: 'transparent' === s ? 2 : 0,
              children: Object(he.jsx)(Z.a, { spacing: 2, children: n })
            })
          });
        },
        li = { left: !0, right: !1 },
        di = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(hn.e)().width,
            a = Object(ge.g)(),
            i = e.children,
            r = e.title,
            c = e.footer,
            s = e.isLoading,
            l = void 0 === s || s,
            d = e.hasDivider,
            u = void 0 !== d && d,
            b = e.resetScroll,
            g = void 0 !== b && b,
            j = e.variant,
            h = void 0 === j ? 'transparent' : j,
            v = Object(o.useState)(li),
            O = Object(p.a)(v, 2),
            f = O[0],
            m = O[1],
            x = Object(Le.a)(),
            y = Object(p.a)(x, 2),
            A = y[0],
            w = y[1],
            k = Object(o.useCallback)(
              D.a.debounce(function (e) {
                if (e) {
                  var n = e.scrollLeft + e.offsetWidth,
                    o = 0 === e.scrollLeft,
                    a = 0 === e.scrollLeft ? e.scrollWidth <= e.offsetWidth : n >= e.scrollWidth;
                  m({ left: o, right: a }), o || a ? w.on() : w.off();
                } else k(t.current);
              }, 50),
              [t]
            ),
            C = Object(o.useCallback)(
              function (e) {
                t &&
                  t.current &&
                  (t.current.scrollLeft = 'left' === e ? t.current.scrollLeft - 10 : t.current.scrollLeft + 10);
              },
              [t]
            ),
            S = Object(o.useCallback)(
              function () {
                w.on(), t && t.current && ((t.current.scrollLeft = 0), k(t.current));
              },
              [t, w, k]
            );
          return (
            Object(o.useEffect)(
              function () {
                return S();
              },
              [a, g]
            ),
            Object(o.useEffect)(
              function () {
                k(t.current);
              },
              [n]
            ),
            Object(he.jsx)(wn, {
              box: {
                header: { px: 'transparent' === h ? 2 : 0, py: 1.5 },
                footer: { px: 'transparent' === h ? 2 : 0, py: 1 }
              },
              isFullWidth: !0,
              hasDivider: u,
              variant: h,
              px: 'outlined' === h ? 2 : 0,
              children: {
                header: {
                  title: r,
                  actions: It()
                    ? void 0
                    : Object(he.jsxs)(Z.a, {
                        spacing: 1,
                        children: [
                          Object(he.jsx)(ci, {
                            direction: 'left',
                            isDisabled: f.left,
                            isLoading: l,
                            reset: A,
                            onScrollClick: C,
                            variant: h
                          }),
                          Object(he.jsx)(ci, {
                            direction: 'right',
                            isDisabled: f.right,
                            isLoading: l,
                            reset: A,
                            onScrollClick: C,
                            variant: h
                          })
                        ]
                      })
                },
                body: Object(he.jsx)(si, {
                  gridRef: t,
                  hasDivider: u,
                  handleScrollChange: function () {
                    return k(t.current);
                  },
                  variant: h,
                  children: i
                }),
                footer: c
              }
            })
          );
        },
        ui = function (e) {
          var t = Object(Le.a)(),
            n = Object(p.a)(t, 2),
            o = n[0],
            a = n[1],
            i = w(function (e) {
              return e.user.ui.theme.color;
            }),
            r = e.title,
            c = e.mediaType,
            s = e.mediaItem,
            l = e.isLoading,
            d = void 0 === l || l,
            u = e.size;
          return Object(he.jsx)(na, {
            renderButton: function (e) {
              var t = e.lists,
                n = e.isBookmarked,
                l = e.onClick;
              return Object(he.jsx)(Ht, {
                'aria-label': n
                  ? 'Remove "'
                      .concat(r, '" ')
                      .concat(c, ' from ')
                      .concat(
                        t && 1 === ((null === t || void 0 === t ? void 0 : t.length) || 0)
                          ? ''.concat(t[0].label ? '"'.concat(t[0].label, '" list') : '')
                          : 'lists',
                        ' (tooltip)'
                      )
                  : 'Add "'.concat(r, '" ').concat(c, ' to a list (tooltip)'),
                'label': n
                  ? 'Remove "'
                      .concat(r, '" from ')
                      .concat(
                        t && 1 === ((null === t || void 0 === t ? void 0 : t.length) || 0)
                          ? ''.concat(t[0].label ? '"'.concat(t[0].label, '" list') : '')
                          : 'lists'
                      )
                  : 'Add "'.concat(r, '" to a list'),
                'placement': 'top',
                'isOpen': o,
                'isDisabled': d || !s,
                'gutter': 8,
                'children': Object(he.jsx)(Ee, {
                  'aria-label': n
                    ? 'Remove "'
                        .concat(r, '" ')
                        .concat(c, ' from ')
                        .concat(
                          t && 1 === ((null === t || void 0 === t ? void 0 : t.length) || 0)
                            ? ''.concat(t[0].label ? '"'.concat(t[0].label, '" list') : '')
                            : 'lists',
                          ' (tooltip)'
                        )
                    : 'Add "'.concat(r, '" ').concat(c, ' to a list (tooltip)'),
                  'color': n ? Wt(i) : 'gray',
                  'isDisabled': d || !s,
                  'icon': n ? on.a : an.a,
                  'onClick': function () {
                    return l();
                  },
                  'onMouseEnter': function () {
                    return a.on();
                  },
                  'onMouseLeave': function () {
                    return a.off();
                  },
                  'size': u,
                  'variant': 'icon'
                })
              });
            },
            title: r,
            mediaType: c,
            mediaItem: s
          });
        },
        bi = function (e) {
          var t = Object(Le.a)(),
            n = Object(p.a)(t, 2),
            o = n[0],
            a = n[1],
            i = e.title,
            r = e.mediaType,
            c = e.mediaItem,
            s = e.isLoading,
            l = void 0 === s || s,
            d = e.size;
          return Object(he.jsx)(oa, {
            renderButton: function (e) {
              var t = e.isLiked,
                n = e.onClick;
              return Object(he.jsx)(Ht, {
                'aria-label': t
                  ? 'Dislike "'.concat(i, '" ').concat(r, ' (tooltip)')
                  : 'Like "'.concat(i, '" ').concat(r, ' (tooltip)'),
                'label': t ? 'Dislike "'.concat(i, '"') : 'Like "'.concat(i, '"'),
                'placement': 'top',
                'isOpen': o,
                'isDisabled': l || !c,
                'gutter': 8,
                'children': Object(he.jsx)(Ee, {
                  'aria-label': t ? 'Dislike "'.concat(i, '" ').concat(r) : 'Like "'.concat(i, '" ').concat(r),
                  'color': t ? 'red' : 'gray',
                  'isDisabled': l || !c,
                  'icon': t ? tn.a : nn.a,
                  'onClick': function () {
                    return n();
                  },
                  'onMouseEnter': function () {
                    return a.on();
                  },
                  'onMouseLeave': function () {
                    return a.off();
                  },
                  'size': d,
                  'variant': 'icon'
                })
              });
            },
            mediaType: r,
            mediaItem: c
          });
        },
        gi = Gt(100, 10),
        ji = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.subtitle,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = Object(o.useState)(!1),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(o.useCallback)(
              function (e) {
                e && l(Rt(e));
              },
              [s, l]
            );
          return Object(he.jsx)(Zo, {
            width: i ? ''.concat(gi[Math.floor(Math.random() * gi.length)], '%') : '100%',
            offsetY: 6,
            isLoaded: !i,
            children: Object(he.jsx)(U.a, {
              ref: d,
              align: 'left',
              fontSize: 'xs',
              color: 'light' === t ? 'gray.400' : 'gray.500',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              children: i ? 'Lorem ipsum dolor sit amet' : n
            })
          });
        },
        hi = Gt(100, 10),
        pi = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.title,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = Object(o.useState)(!1),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(o.useCallback)(
              function (e) {
                e && l(Rt(e));
              },
              [s, l]
            );
          return Object(he.jsx)(Zo, {
            width: i ? ''.concat(hi[Math.floor(Math.random() * hi.length)], '%') : '100%',
            offsetY: 7,
            isLoaded: !i,
            children: Object(he.jsx)(U.a, {
              ref: d,
              align: 'left',
              fontSize: 'sm',
              fontWeight: 'semibold',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              children: i ? 'Lorem ipsum' : n
            })
          });
        },
        vi = function (e) {
          var t = Object(v.e)(),
            n = Object(r.b)(),
            o = Object(Co.a)({ threshold: [0.2, 0.4, 0.6, 0.8, 1], unobserveOnEnter: !0 }),
            a = o.observe,
            i = o.inView,
            c = e.width,
            s = e.mediaItem,
            l = e.mediaType,
            d = e.image,
            u = e.rating,
            b = e.title,
            g = void 0 === b ? 'Lorem ipsum' : b,
            j = e.subtitle,
            h = void 0 === j ? 'Lorem ipsum' : j,
            O = e.isLoading,
            m = void 0 === O || O,
            x = Object(Le.a)(),
            y = Object(p.a)(x, 2),
            A = y[0],
            w = y[1],
            k = Object(Le.a)(),
            C = Object(p.a)(k, 2),
            S = C[0],
            D = C[1];
          return Object(he.jsx)(pe, {
            isDisabled: m || S,
            to: { pathname: '/'.concat(l, '/').concat((null === s || void 0 === s ? void 0 : s.id) || '') },
            onMouseEnter: function () {
              return w.on();
            },
            onMouseLeave: function () {
              return w.off();
            },
            children: Object(he.jsx)(kn, {
              isDisabled: m,
              isClickable: !S,
              isLight: !0,
              children: Object(he.jsxs)(Z.c, {
                width: c,
                position: 'relative',
                spacing: 1,
                p: 1,
                children: [
                  Object(he.jsx)(f.a, {
                    as: wo.a,
                    ref: a,
                    position: 'relative',
                    width: '100%',
                    minWidth: '100%',
                    maxWidth: '100%',
                    borderRadius: 'base',
                    ratio: 2 / 3,
                    children: Object(he.jsx)(eo.a, {
                      in: m || i,
                      unmountOnExit: !0,
                      style: { width: 'inherit', borderRadius: 'inherit' },
                      children: Object(he.jsx)(wo.a, {
                        width: '100%',
                        minWidth: '100%',
                        maxWidth: '100%',
                        borderRadius: 'base',
                        ratio: 2 / 3,
                        children: Object(he.jsxs)(he.Fragment, {
                          children: [
                            Object(he.jsx)(Ho, {
                              isLoaded: !m && Boolean(d),
                              borderRadius: 'base',
                              children: Object(he.jsx)(Oo, {
                                alt: (null === d || void 0 === d ? void 0 : d.alt) || '',
                                mediaType: l,
                                maxWidth: 'none',
                                height: '100%',
                                borderRadius: 'base',
                                thumbnailSrc: ''
                                  .concat('https://image.tmdb.org/t/p', '/')
                                  .concat((null === d || void 0 === d ? void 0 : d.size.thumbnail) || '')
                                  .concat((null === d || void 0 === d ? void 0 : d.src) || ''),
                                fullSrc: ''
                                  .concat('https://image.tmdb.org/t/p', '/')
                                  .concat((null === d || void 0 === d ? void 0 : d.size.full) || '')
                                  .concat((null === d || void 0 === d ? void 0 : d.src) || '')
                              })
                            }),
                            s && !It()
                              ? Object(he.jsx)(_e.a, {
                                  in: A && !m,
                                  unmountOnExit: !0,
                                  children: Object(he.jsx)(f.a, {
                                    position: 'absolute',
                                    bottom: t.space[1],
                                    width: '100%',
                                    onMouseEnter: function () {
                                      return D.on();
                                    },
                                    onMouseLeave: function () {
                                      return D.off();
                                    },
                                    px: 1,
                                    children: Object(he.jsx)(bn, {
                                      isFullWidth: !0,
                                      onClick: function () {
                                        return n(Ue({ open: !0, mediaType: l, mediaItem: { id: s.id, title: g } }));
                                      },
                                      size: 'sm',
                                      children: 'Quick view'
                                    })
                                  })
                                })
                              : null
                          ]
                        })
                      })
                    })
                  }),
                  Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 'person' !== l ? 0.5 : 1,
                    children: [
                      'person' !== l
                        ? Object(he.jsxs)(Z.a, {
                            width: '100%',
                            justify: 'space-between',
                            spacing: 0,
                            children: [
                              Object(he.jsx)($o, {
                                rating: u,
                                isLoading: m,
                                iconFontsize: t.fontSizes.xl,
                                textFontsize: 'md'
                              }),
                              Object(he.jsxs)(Z.a, {
                                spacing: 0,
                                children: [
                                  Object(he.jsx)(f.a, {
                                    onMouseEnter: function () {
                                      return D.on();
                                    },
                                    onMouseLeave: function () {
                                      return D.off();
                                    },
                                    children: Object(he.jsx)(bi, {
                                      title: g,
                                      mediaType: l,
                                      mediaItem: s,
                                      size: 'sm',
                                      isLoading: m
                                    })
                                  }),
                                  Object(he.jsx)(f.a, {
                                    onMouseEnter: function () {
                                      return D.on();
                                    },
                                    onMouseLeave: function () {
                                      return D.off();
                                    },
                                    children: Object(he.jsx)(ui, {
                                      title: g,
                                      mediaType: l,
                                      mediaItem: s,
                                      isLoading: m,
                                      size: 'sm'
                                    })
                                  })
                                ]
                              })
                            ]
                          })
                        : null,
                      Object(he.jsxs)(Z.c, {
                        width: '100%',
                        alignItems: 'flex-start',
                        spacing: m ? 0.5 : 0,
                        children: [
                          Object(he.jsx)(pi, { title: g, isLoading: m }),
                          Object(he.jsx)(ji, { subtitle: h, isLoading: m })
                        ]
                      })
                    ]
                  }),
                  'person' === l
                    ? Object(he.jsx)(Z.a, {
                        spacing: 0,
                        sx: { position: 'absolute', top: 1, right: 2 },
                        children: Object(he.jsx)(f.a, {
                          onMouseEnter: function () {
                            return D.on();
                          },
                          onMouseLeave: function () {
                            return D.off();
                          },
                          children: Object(he.jsx)(bi, {
                            title: g,
                            mediaType: l,
                            mediaItem: s,
                            isLoading: m,
                            size: 'sm'
                          })
                        })
                      })
                    : null
                ]
              })
            })
          });
        },
        Oi = function (e) {
          var t = e.knownFor,
            n = e.name,
            o = e.isError,
            a = void 0 !== o && o,
            i = e.isSuccess,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 !== c && c;
          return Object(he.jsx)(di, {
            title: 'Known for',
            isLoading: s,
            hasDivider: !0,
            variant: 'outlined',
            children: a
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(n ? '"'.concat(n, '"') : '', ' known for list!'),
                  variant: 'transparent'
                })
              : r && t && 0 === t.length
              ? Object(he.jsx)(bo, {
                  label: ''.concat(n ? '"'.concat(n, '"') : '', ' has no known for credits'),
                  variant: 'transparent'
                })
              : r && t && t.length > 0
              ? Object(he.jsx)(he.Fragment, {
                  children: t.map(function (e) {
                    return Object(he.jsx)(
                      vi,
                      {
                        width: ['185px', '205px', '230px'],
                        mediaItem: e ? Object(b.a)({}, e) : void 0,
                        mediaType: (null === e || void 0 === e ? void 0 : e.title) ? 'movie' : 'tv',
                        image: {
                          alt: ''
                            .concat(
                              (null === e || void 0 === e ? void 0 : e.title) ||
                                (null === e || void 0 === e ? void 0 : e.name) ||
                                '',
                              ' '
                            )
                            .concat((null === e || void 0 === e ? void 0 : e.title) ? 'movie' : 'tv', ' poster'),
                          src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                          size: { thumbnail: 'w92', full: 'original' }
                        },
                        rating: {
                          rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                          count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                        },
                        title:
                          (null === e || void 0 === e ? void 0 : e.title) ||
                          (null === e || void 0 === e ? void 0 : e.name) ||
                          '',
                        subtitle:
                          ''.concat(
                            Ft(
                              (null === e || void 0 === e ? void 0 : e.release_date) ||
                                (null === e || void 0 === e ? void 0 : e.first_air_date) ||
                                '',
                              'year'
                            )
                          ) || 'N/A',
                        isLoading: !1
                      },
                      e.id
                    );
                  })
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(D.a.range(0, 20)).map(function (e, t) {
                    return Object(he.jsx)(
                      vi,
                      {
                        width: ['185px', '205px', '230px'],
                        mediaType: 'movie',
                        title: 'Lorem ipsum',
                        subtitle: 'Lorem ipsum',
                        isLoading: !0
                      },
                      t
                    );
                  })
                })
          });
        },
        fi = ['185px', '205px', '230px'],
        mi = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = e.images,
            i = e.name,
            r = e.isError,
            c = void 0 !== r && r,
            s = e.isSuccess,
            l = void 0 !== s && s,
            d = e.isLoading,
            u = void 0 !== d && d,
            b = e.onClickImage,
            g = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(di, {
            title: Object(he.jsxs)(ke.a, {
              children: [
                Object(he.jsx)(U.a, {
                  align: 'left',
                  color: 'light' === t ? 'gray.400' : 'gray.500',
                  fontSize: 'lg',
                  fontWeight: 'semibold',
                  children: 'Photos'
                }),
                Object(he.jsx)(yo, { label: String(a.length), size: 'md', ml: 2 })
              ]
            }),
            footer:
              a.length > 7
                ? Object(he.jsx)(bn, {
                    color: Wt(g),
                    isFullWidth: !0,
                    isDisabled: u || c,
                    onClick: function () {
                      return b(a[0].file_path);
                    },
                    size: o ? 'sm' : 'md',
                    variant: 'text',
                    children: 'View all '.concat(i ? '"'.concat(i, '"') : '', ' photos')
                  })
                : void 0,
            isLoading: u,
            hasDivider: !0,
            variant: 'outlined',
            children: c
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(i ? '"'.concat(i, '"') : '', ' photos!'),
                  variant: 'transparent'
                })
              : l && a && 0 === a.length
              ? Object(he.jsx)(bo, {
                  label: ''.concat(i ? '"'.concat(i, '"') : '', ' has no photos'),
                  variant: 'transparent'
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(a && a.length > 0 ? a : D.a.range(0, 8))
                    .filter(function (e, t) {
                      return t < 8;
                    })
                    .map(function (e, t) {
                      return Object(he.jsx)(
                        So,
                        {
                          width: fi,
                          borderRadius: 'lg',
                          isDisabled: u,
                          onClick:
                            'number' !== typeof e && e
                              ? function () {
                                  return b(e.file_path);
                                }
                              : void 0,
                          children: Object(he.jsx)(Ho, {
                            isLoaded: !u,
                            borderRadius: 'lg',
                            children: Object(he.jsx)(Oo, {
                              alt: ''.concat(i ? '"'.concat(i, '"') : '', ' image'),
                              maxWidth: 'none',
                              height: '100%',
                              borderRadius: 'lg',
                              mediaType: 'person',
                              thumbnailSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/w45')
                                .concat(
                                  'number' !== typeof e && e ? (null === e || void 0 === e ? void 0 : e.file_path) : ''
                                ),
                              fullSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/original')
                                .concat(
                                  'number' !== typeof e && e ? (null === e || void 0 === e ? void 0 : e.file_path) : ''
                                )
                            })
                          })
                        },
                        t
                      );
                    })
                })
          });
        },
        xi = function (e, t) {
          var n = [];
          return (
            (((null === e || void 0 === e ? void 0 : e.cast.length) || 0) > 0 || (t.cast.length || 0) > 0) &&
              n.push({
                label: 'Actor',
                credits: { cast: { movie: (null === e || void 0 === e ? void 0 : e.cast) || [], tv: t.cast || [] } }
              }),
            null === e ||
              void 0 === e ||
              e.crew.forEach(function (e) {
                n.some(function (t) {
                  return t.label === e.job;
                })
                  ? (n = n.map(function (t) {
                      var n;
                      return t.label === e.job
                        ? Object(b.a)(
                            Object(b.a)({}, t),
                            {},
                            {
                              credits: Object(b.a)(
                                Object(b.a)({}, t.credits),
                                {},
                                {
                                  crew: Object(b.a)(
                                    Object(b.a)({}, t.credits.crew),
                                    {},
                                    {
                                      movie: [].concat(
                                        Object(In.a)(
                                          (null === (n = t.credits.crew) || void 0 === n ? void 0 : n.movie) || []
                                        ),
                                        [Object(b.a)({}, e)]
                                      )
                                    }
                                  )
                                }
                              )
                            }
                          )
                        : t;
                    }))
                  : n.push({ label: e.job, credits: { crew: { movie: [Object(b.a)({}, e)], tv: [] } } });
              }),
            t.crew.forEach(function (e) {
              n.some(function (t) {
                return t.label === e.job;
              })
                ? (n = n.map(function (t) {
                    var n;
                    return t.label === e.job
                      ? Object(b.a)(
                          Object(b.a)({}, t),
                          {},
                          {
                            credits: Object(b.a)(
                              Object(b.a)({}, t.credits),
                              {},
                              {
                                crew: Object(b.a)(
                                  Object(b.a)({}, t.credits.crew),
                                  {},
                                  {
                                    tv: [].concat(
                                      Object(In.a)(
                                        (null === (n = t.credits.crew) || void 0 === n ? void 0 : n.tv) || []
                                      ),
                                      [Object(b.a)({}, e)]
                                    )
                                  }
                                )
                              }
                            )
                          }
                        )
                      : t;
                  }))
                : n.push({ label: e.job, credits: { crew: { movie: [], tv: [Object(b.a)({}, e)] } } });
            }),
            ua()(Object(In.a)(n), 'label')
          );
        },
        yi = function () {
          var e,
            t,
            n,
            a,
            i,
            r,
            c,
            s,
            l = C.a.CancelToken.source(),
            d = Object(fe.a)(),
            u = d.isOpen,
            b = d.onOpen,
            g = d.onClose,
            v = Object(ge.h)().id,
            O = Object(o.useState)(),
            f = Object(p.a)(O, 2),
            m = f[0],
            x = f[1],
            y = Object(go.a)(
              ['person-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(v), { cancelToken: l.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            A = Object(go.a)(
              ['person-combined_credits-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2), _.get('/person/'.concat(v, '/combined_credits'), { cancelToken: l.token })
                          );
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            w = Object(go.a)(
              ['person-movie_credits-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(v, '/movie_credits'), { cancelToken: l.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            k = Object(go.a)(
              ['person-tv_credits-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(v, '/tv_credits'), { cancelToken: l.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            S = Object(go.a)(
              ['person-external_ids-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(v, '/external_ids'), { cancelToken: l.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            D = Object(go.a)(
              ['person-images-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(v, '/images'), { cancelToken: l.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            E = Object(go.a)(
              ['person-tagged_images-'.concat(v), v],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(v, '/tagged_images'), { cancelToken: l.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            L = function (e) {
              x(e || void 0), b();
            },
            B = A.isSuccess
              ? (function () {
                  var e,
                    t,
                    n = new Set(),
                    o = [].concat(
                      Object(In.a)((null === (e = A.data) || void 0 === e ? void 0 : e.cast) || []),
                      Object(In.a)((null === (t = A.data) || void 0 === t ? void 0 : t.crew) || [])
                    ),
                    a = ua()(
                      o.filter(function (e) {
                        var t = n.has(e.id);
                        return n.add(e.id), !t;
                      }),
                      'vote_count',
                      { reverse: !0 }
                    ).filter(function (e, t) {
                      return t < 8;
                    });
                  return Object(In.a)(a);
                })()
              : [],
            M = w.isSuccess && k.isSuccess ? xi(w.data, k.data) : [];
          return (
            Object(o.useEffect)(function () {
              return function () {
                return l.cancel();
              };
            }, []),
            Object(he.jsxs)(Z.c, {
              spacing: 4,
              p: 2,
              children: [
                Object(he.jsx)(Ba, {
                  person: y.data,
                  departments: M.map(function (e) {
                    return e.label;
                  }),
                  socials: S.data,
                  isLoading: y.isFetching || y.isLoading || S.isFetching || S.isLoading,
                  isError: y.isError || y.isError,
                  onClickPoster: L
                }),
                (null === (e = y.data) || void 0 === e ? void 0 : e.biography) || y.isFetching || y.isLoading
                  ? Object(he.jsx)(ba, {
                      biography: (null === (t = y.data) || void 0 === t ? void 0 : t.biography) || '',
                      isLoading: y.isFetching || y.isLoading
                    })
                  : null,
                Object(he.jsx)(Oi, {
                  knownFor: B,
                  name: null === (n = y.data) || void 0 === n ? void 0 : n.name,
                  isError: A.isError,
                  isSuccess: A.isSuccess,
                  isLoading: A.isFetching || A.isLoading
                }),
                Object(he.jsx)(ri, {
                  departments: M,
                  isLoading: w.isFetching || w.isLoading || k.isFetching || k.isLoading,
                  isError: w.isError || k.isError
                }),
                Object(he.jsx)(mi, {
                  images: [].concat(
                    Object(In.a)((null === (a = D.data) || void 0 === a ? void 0 : a.profiles) || []),
                    Object(In.a)((null === (i = E.data) || void 0 === i ? void 0 : i.results.profiles) || [])
                  ),
                  name: null === (r = y.data) || void 0 === r ? void 0 : r.name,
                  isError: D.isError || E.isError,
                  isSuccess: D.isSuccess && E.isSuccess,
                  isLoading: D.isFetching || D.isLoading || E.isFetching || E.isLoading,
                  onClickImage: L
                }),
                D.isSuccess || E.isSuccess
                  ? Object(he.jsx)(Po, {
                      isOpen: u,
                      selected: { type: 'photo', asset: m },
                      photos: [].concat(
                        Object(In.a)((null === (c = D.data) || void 0 === c ? void 0 : c.profiles) || []),
                        Object(In.a)((null === (s = E.data) || void 0 === s ? void 0 : s.results.profiles) || [])
                      ),
                      mediaType: 'person',
                      onClose: g
                    })
                  : null
              ]
            })
          );
        },
        Ai = n(542),
        wi = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.totalMovieCredits,
            o = e.totalTvCredits,
            a = e.totalCrewCredits,
            i = e.isLoading,
            r = void 0 !== i && i,
            c = [
              { label: 'Total', number: n + o + a },
              { label: 'Movies', number: n },
              { label: 'TV Shows', number: o },
              { label: 'Crew', number: a }
            ];
          return Object(he.jsx)(Ai.b, {
            width: '100%',
            border: 'solid2',
            borderColor: 'light' === t ? 'gray.200' : 'gray.700',
            borderRadius: 'base',
            p: 1,
            children: Object(he.jsx)(Z.a, {
              width: '100%',
              justifyContent: 'space-between',
              wrap: 'wrap',
              divider: Object(he.jsx)(f.a, {
                width: '2px',
                height: '44px',
                backgroundColor: 'light' === t ? 'gray.200' : 'gray.700'
              }),
              spacing: 1,
              children: c.map(function (e, n) {
                return Object(he.jsx)(
                  Ai.a,
                  {
                    justifyContent: 'center',
                    children: Object(he.jsxs)(Z.c, {
                      spacing: 0,
                      children: [
                        Object(he.jsx)(Zo, {
                          offsetY: '14px',
                          isLoaded: !r,
                          children: Object(he.jsx)(Ai.d, {
                            color: 'light' === t ? 'gray.900' : 'gray.50',
                            fontSize: '3xl',
                            lineHeight: 'normal',
                            children: r ? '12' : e.number || 0
                          })
                        }),
                        Object(he.jsx)(Ai.c, {
                          color: 'light' === t ? 'gray.400' : 'gray.500',
                          fontSize: 'xs',
                          whiteSpace: 'nowrap',
                          textTransform: 'uppercase',
                          children: e.label
                        })
                      ]
                    })
                  },
                  n
                );
              })
            })
          });
        },
        ki = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = e.person,
            i = e.departments,
            r = e.totalMovieCredits,
            c = e.totalTvCredits,
            s = e.totalCrewCredits,
            l = e.isLoading,
            d = void 0 !== l && l,
            u = e.isError,
            b = void 0 !== u && u;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            alignItems: 'flex-start',
            spacing: 4,
            children: [
              Object(he.jsxs)(Z.c, {
                width: '100%',
                alignItems: 'flex-start',
                spacing: 2,
                children: [
                  Object(he.jsxs)(Z.c, {
                    width: '100%',
                    maxWidth: '100%',
                    alignItems: 'flex-start',
                    spacing: d ? 0.5 : 0,
                    children: [
                      Object(he.jsx)(Zo, {
                        offsetY: o ? 12 : 18,
                        isLoaded: !d,
                        children: Object(he.jsx)(U.a, {
                          align: 'left',
                          color: 'light' === t ? 'gray.900' : 'gray.50',
                          fontSize: o ? '2xl' : '4xl',
                          fontWeight: 'bold',
                          children: (null === a || void 0 === a ? void 0 : a.name) || 'Unknown'
                        })
                      }),
                      Object(he.jsx)(Da, { departments: i, isLoading: d })
                    ]
                  }),
                  Object(he.jsx)(xa, {
                    birthday: null === a || void 0 === a ? void 0 : a.birthday,
                    place_of_birth: null === a || void 0 === a ? void 0 : a.place_of_birth,
                    deathday: null === a || void 0 === a ? void 0 : a.deathday,
                    isLoading: d,
                    isError: b
                  }),
                  Object(he.jsx)(_e.a, {
                    in: !b,
                    unmountOnExit: !0,
                    children: Object(he.jsx)(oa, {
                      renderButton: function (e) {
                        var t = e.isLiked,
                          n = e.onClick;
                        return Object(he.jsx)(bn, {
                          color: t ? 'red' : 'gray',
                          isFullWidth: o,
                          isDisabled: d || !a,
                          leftIcon: t ? tn.a : nn.a,
                          onClick: function () {
                            return n();
                          },
                          size: 'md',
                          variant: 'outlined',
                          children: t ? 'Liked' : 'Like'
                        });
                      },
                      mediaType: 'person',
                      mediaItem: a
                    })
                  })
                ]
              }),
              Object(he.jsx)(wi, { totalMovieCredits: r, totalTvCredits: c, totalCrewCredits: s, isLoading: d })
            ]
          });
        },
        Ci = function (e) {
          var t,
            n,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            b,
            g,
            v,
            m,
            x = C.a.CancelToken.source(),
            y = Object(fe.a)(),
            A = y.isOpen,
            w = y.onOpen,
            k = y.onClose,
            S = Object(O.a)('(max-width: 600px)'),
            D = Object(p.a)(S, 1)[0],
            E = e.id,
            L = Object(o.useState)(),
            B = Object(p.a)(L, 2),
            M = B[0],
            T = B[1],
            z = Object(go.a)(
              ['person-'.concat(E), E],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(E), { cancelToken: x.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            I = Object(go.a)(
              ['person-movie_credits-'.concat(E), E],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(E, '/movie_credits'), { cancelToken: x.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            F = Object(go.a)(
              ['person-tv_credits-'.concat(E), E],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(E, '/tv_credits'), { cancelToken: x.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            Q = Object(go.a)(
              ['person-images-'.concat(E), E],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(E, '/images'), { cancelToken: x.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            N = Object(go.a)(
              ['person-tagged_images-'.concat(E), E],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/person/'.concat(E, '/tagged_images'), { cancelToken: x.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            Y = I.isSuccess && F.isSuccess ? xi(I.data, F.data) : [],
            W = function (e) {
              T(e), w();
            };
          return (
            Object(o.useEffect)(function () {
              return function () {
                return x.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                D
                  ? Object(he.jsxs)(Z.c, {
                      width: '100%',
                      maxWidth: '100%',
                      spacing: 2,
                      p: 2,
                      children: [
                        Object(he.jsx)(Jo, {
                          name: (null === (t = z.data) || void 0 === t ? void 0 : t.name) || '',
                          path: (null === (n = z.data) || void 0 === n ? void 0 : n.profile_path) || '',
                          mediaType: 'person',
                          isLoading: z.isFetching || z.isLoading,
                          onClickPoster: W
                        }),
                        Object(he.jsx)(ki, {
                          person: z.data,
                          departments: Y.map(function (e) {
                            return e.label;
                          }),
                          totalMovieCredits: (null === (a = I.data) || void 0 === a ? void 0 : a.cast.length) || 0,
                          totalTvCredits: (null === (i = F.data) || void 0 === i ? void 0 : i.cast.length) || 0,
                          totalCrewCredits:
                            ((null === (r = I.data) || void 0 === r ? void 0 : r.crew.length) || 0) +
                            ((null === (c = F.data) || void 0 === c ? void 0 : c.crew.length) || 0),
                          isLoading: z.isFetching || z.isLoading,
                          isError: z.isError
                        })
                      ]
                    })
                  : Object(he.jsxs)(Z.a, {
                      width: '100%',
                      maxWidth: '100%',
                      spacing: 2,
                      p: 2,
                      children: [
                        Object(he.jsx)(f.a, {
                          width: '40%',
                          maxWidth: '40%',
                          children: Object(he.jsx)(Jo, {
                            name: (null === (s = z.data) || void 0 === s ? void 0 : s.name) || '',
                            path: (null === (l = z.data) || void 0 === l ? void 0 : l.profile_path) || '',
                            mediaType: 'person',
                            isLoading: z.isFetching || z.isLoading,
                            onClickPoster: W
                          })
                        }),
                        Object(he.jsx)(f.a, {
                          width: '60%',
                          maxWidth: '60%',
                          children: Object(he.jsx)(ki, {
                            person: z.data,
                            departments: Y.map(function (e) {
                              return e.label;
                            }),
                            totalMovieCredits: (null === (d = I.data) || void 0 === d ? void 0 : d.cast.length) || 0,
                            totalTvCredits: (null === (u = F.data) || void 0 === u ? void 0 : u.cast.length) || 0,
                            totalCrewCredits:
                              ((null === (b = I.data) || void 0 === b ? void 0 : b.crew.length) || 0) +
                              ((null === (g = F.data) || void 0 === g ? void 0 : g.crew.length) || 0),
                            isLoading: z.isFetching || z.isLoading,
                            isError: z.isError
                          })
                        })
                      ]
                    }),
                Q.isSuccess || N.isSuccess
                  ? Object(he.jsx)(Po, {
                      isOpen: A,
                      selected: { type: 'photo', asset: M },
                      photos: [].concat(
                        Object(In.a)((null === (v = Q.data) || void 0 === v ? void 0 : v.profiles) || []),
                        Object(In.a)((null === (m = N.data) || void 0 === m ? void 0 : m.results.profiles) || [])
                      ),
                      mediaType: 'person',
                      onClose: k
                    })
                  : null
              ]
            })
          );
        },
        Si = function () {
          var e,
            t,
            n,
            o = Object(O.a)('(max-width: 600px)'),
            a = Object(p.a)(o, 1)[0],
            i = Object(r.b)(),
            c = w(function (e) {
              return e.modals.ui.quickViewModal;
            }),
            s = w(function (e) {
              return e.user.ui.theme.color;
            }),
            l = function () {
              i(Ue(Object(b.a)({}, Re)));
            };
          return Object(he.jsx)(pn, {
            title: a ? 'Quick View' : 'Quick View '.concat(c.mediaItem ? '"'.concat(c.mediaItem.title, '"') : ''),
            actions: Object(he.jsx)(pe, {
              to: {
                pathname: '/'
                  .concat(c.mediaType, '/')
                  .concat(null === (e = c.mediaItem) || void 0 === e ? void 0 : e.id)
              },
              children: Object(he.jsx)(bn, {
                color: Wt(s),
                onClick: function () {
                  return l();
                },
                size: 'sm',
                children: 'View full details'
              })
            }),
            isOpen: c.open,
            onClose: function () {
              return l();
            },
            isCentered: !0,
            size: '3xl',
            children:
              'movie' === c.mediaType
                ? Object(he.jsx)(la, { id: null === (t = c.mediaItem) || void 0 === t ? void 0 : t.id })
                : 'tv' === c.mediaType
                ? Object(he.jsx)('h1', { children: 'Hello TV Shows' })
                : 'person' === c.mediaType
                ? Object(he.jsx)(Ci, { id: null === (n = c.mediaItem) || void 0 === n ? void 0 : n.id })
                : Object(he.jsx)(bo, {
                    label: 'Oh no! Media-Item not found!',
                    description: 'Sorry, unfortunatly couldnt find the media-item to quick view'
                  })
          });
        },
        Di = n(170),
        Ei = Object(Di.a)(f.a),
        Li = function () {
          var e = Object(J.c)().colorMode,
            t = Object(r.b)(),
            n = w(function (e) {
              return e.modals.ui.isSplashscreenOpen;
            }),
            a = {
              fontFamily: '"Pacifico", cursive',
              fontSize: '9xl',
              fontWeight: 'extrabold',
              textTransform: 'lowercase',
              padding: 6
            },
            i = Object(o.useState)('.'),
            c = Object(p.a)(i, 2),
            s = c[0],
            l = c[1];
          return (
            Object(hn.c)(
              function () {
                4 === s.length ? l('.') : l(''.concat(s, '.'));
              },
              n ? 250 : null
            ),
            Object(o.useEffect)(
              function () {
                n &&
                  setTimeout(function () {
                    return t(Xe(!1));
                  }, 2500);
              },
              [n]
            ),
            Object(he.jsx)(xe.a, {
              closeOnEsc: !1,
              closeOnOverlayClick: !1,
              isOpen: n,
              onClose: function () {
                return t(Xe(!1));
              },
              motionPreset: 'scale',
              scrollBehavior: 'inside',
              size: 'full',
              children: Object(he.jsx)(xe.c, {
                backgroundColor: 'light' === e ? 'gray.50' : 'gray.900',
                borderRadius: 'none',
                m: 0,
                children: Object(he.jsx)(xe.b, {
                  zIndex: 1e4,
                  p: 0,
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    height: '100vh',
                    justifyContent: 'space-between',
                    p: 3,
                    children: [
                      Object(he.jsx)(U.a, {
                        align: 'center',
                        color: 'light' === e ? 'gray.400' : 'gray.500',
                        fontSize: 'sm',
                        fontWeight: 'medium',
                        children: 'Entertainment database'
                      }),
                      Object(he.jsx)(Ei, {
                        animate: {
                          backgroundPosition: [].concat(
                            Object(In.a)(
                              D.a.range(0, 101, 1).map(function (e) {
                                return ''.concat(e, '%');
                              })
                            ),
                            Object(In.a)(
                              D.a.reverse(
                                D.a.range(0, 101, 1).map(function (e) {
                                  return ''.concat(e, '%');
                                })
                              )
                            )
                          )
                        },
                        transition: { duration: 10, ease: [0.76, 0, 0.24, 1], repeat: 1 / 0 },
                        bgSize: '500%',
                        bgGradient:
                          'linear(to-r, red.400, orange.400, yellow.400, green.400, teal.400, blue.400, cyan.400, purple.400, pink.400)',
                        bgClip: 'text',
                        sx: Object(b.a)({}, a),
                        children: 'edb'
                      }),
                      Object(he.jsx)(U.a, {
                        align: 'center',
                        color: 'light' === e ? 'gray.400' : 'gray.500',
                        fontSize: 'sm',
                        fontWeight: 'medium',
                        children: 'Loading'.concat(s)
                      })
                    ]
                  })
                })
              })
            })
          );
        },
        _i = n(171),
        Bi = function (e) {
          var t = e.code,
            n = Object(J.c)().colorMode,
            o = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(U.a, {
            align: 'right',
            color: ''.concat(o, '.').concat('light' === n ? 400 : 500),
            fontSize: '6xl',
            fontWeight: 'bold',
            lineHeight: 'normal',
            children: t
          });
        },
        Mi = Object(o.forwardRef)(function (e, t) {
          var n = Object(J.c)().colorMode,
            o = e.title,
            a = e.subtitle;
          return Object(he.jsxs)(Z.c, {
            ref: t,
            alignItems: 'flex-start',
            spacing: 0,
            children: [
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === n ? 'gray.900' : 'gray.50',
                fontSize: '4xl',
                fontWeight: 'bold',
                children: o
              }),
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === n ? 'gray.400' : 'gray.500',
                fontSize: 'md',
                children: a
              })
            ]
          });
        }),
        Ti = Mi,
        zi = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(J.c)().colorMode,
            a = Object(O.a)('(max-width: 600px)'),
            i = Object(p.a)(a, 1)[0],
            r = Object(hn.a)(t).height,
            c = e.code,
            s = void 0 === c ? 404 : c,
            l = e.title,
            d = e.subtitle,
            u = e.actions;
          return Object(he.jsx)(ke.a, {
            width: '100%',
            minHeight: 'calc(100vh - '.concat(98, 'px)'),
            children: Object(he.jsxs)(Z.c, {
              spacing: 4,
              p: i ? 2 : 4,
              children: [
                i
                  ? Object(he.jsxs)(Z.c, {
                      alignItems: 'flex-start',
                      spacing: 1,
                      children: [
                        Object(he.jsx)(Bi, { code: s }),
                        Object(he.jsx)(f.a, {
                          width: '100%',
                          height: '2px',
                          backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
                        }),
                        Object(he.jsx)(Ti, { ref: t, title: l, subtitle: d })
                      ]
                    })
                  : Object(he.jsxs)(Z.a, {
                      spacing: 2,
                      children: [
                        Object(he.jsx)(Bi, { code: s }),
                        Object(he.jsx)(f.a, {
                          width: '2px',
                          height: r,
                          backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
                        }),
                        Object(he.jsx)(Ti, { ref: t, title: l, subtitle: d })
                      ]
                    }),
                Object(he.jsx)(Z.a, { alignItems: 'flex-start', spacing: 2, children: u })
              ]
            })
          });
        },
        Ii = function () {
          var e = Object(v.e)(),
            t = Object(J.c)().colorMode;
          return Object(he.jsx)(f.a, {
            width: 'calc(100% - '.concat(e.space[4], ')'),
            height: '2px',
            backgroundColor: 'light' === t ? 'gray.200' : 'gray.700'
          });
        },
        Fi = n(543),
        Qi = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object($n.a)({
              'base': t.fontSizes.md,
              'sm': t.fontSizes.md,
              'md': t.fontSizes.lg,
              'lg': t.fontSizes.lg,
              'xl': t.fontSizes.lg,
              '2xl': t.fontSizes.lg
            }),
            a = (function (e) {
              return {
                common: {
                  breadcrumbItem: {
                    fontWeight: 'medium',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  breadcrumbLink: {
                    'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                    '&:hover': { textDecoration: 'none' }
                  }
                },
                light: {
                  breadcrumbActive: { color: 'gray.900' },
                  breadcrumbLink: { 'color': 'gray.400', '&:hover': { color: 'gray.900' } }
                },
                dark: {
                  breadcrumbActive: { color: 'gray.50' },
                  breadcrumbLink: { 'color': 'gray.500', '&:hover': { color: 'gray.50' } }
                }
              };
            })(t),
            i = e.breadcrumbs;
          return Object(he.jsx)(Fi.a, {
            separator: Object(he.jsx)(Se.a, {
              as: Te.a,
              color: 'light' === n ? 'gray.400' : 'gray.500',
              sx: { fontSize: ''.concat(o, ' !important') }
            }),
            spacing: 1,
            children: i.map(function (e, t) {
              return Object(he.jsx)(
                Fi.b,
                {
                  isCurrentPage: t === i.length - 1,
                  fontSize: ['sm', 'sm', 'md', 'md', 'md', 'md'],
                  sx: Object(b.a)({}, a.common.breadcrumbItem),
                  children: Object(he.jsx)(Zo, {
                    offsetY: 8,
                    isLoaded: !e.isLoading,
                    children:
                      t === i.length - 1
                        ? Object(he.jsx)(U.a, {
                            align: 'left',
                            sx: Object(b.a)({}, a[n].breadcrumbActive),
                            children: e.label || ''
                          })
                        : Object(he.jsx)(Fi.c, {
                            as: pe,
                            to: Object(b.a)({}, e.to),
                            sx: Object(b.a)({}, D.a.merge(a.common.breadcrumbLink, a[n].breadcrumbLink)),
                            children: e.label || ''
                          })
                  })
                },
                e.label
              );
            })
          });
        },
        Ni = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.title,
            o = e.breadcrumbs;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            alignItems: 'flex-start',
            spacing: 0,
            children: [
              Object(he.jsx)(Qi, { breadcrumbs: o }),
              'string' === typeof n
                ? Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === t ? 'gray.900' : 'gray.50',
                    fontSize: ['2xl', '2xl', '3xl', '3xl', '3xl', '3xl'],
                    fontWeight: 'bold',
                    children: n || 'Page title'
                  })
                : n
            ]
          });
        },
        Yi = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.children,
            a = e.title,
            i = e.breadcrumbs;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            divider: Object(he.jsx)(Ii, {}),
            spacing: 0,
            children: [
              n
                ? Object(he.jsxs)(Z.c, {
                    width: '100%',
                    p: 2,
                    spacing: 2,
                    children: [
                      Object(he.jsx)(Ni, { title: a, breadcrumbs: i }),
                      (null === o || void 0 === o ? void 0 : o.actions) || null
                    ]
                  })
                : Object(he.jsxs)(Z.a, {
                    width: '100%',
                    justifyContent: 'space-between',
                    p: 2,
                    children: [
                      Object(he.jsx)(Ni, { title: a, breadcrumbs: i }),
                      (null === o || void 0 === o ? void 0 : o.actions) || null
                    ]
                  }),
              Object(he.jsx)(f.a, { width: '100%', children: o.body })
            ]
          });
        },
        Wi = function (e) {
          var t = e.isError,
            n = void 0 !== t && t,
            o = e.isSuccess,
            a = void 0 !== o && o,
            i = e.isLoading,
            r = void 0 === i || i,
            c = e.movies;
          return !r && n
            ? Object(he.jsx)(Pa, {
                label: 'Oh no! Something went wrong',
                description: 'Failed to fetch movies list!',
                variant: 'transparent'
              })
            : !r && a && c && 0 === c.length
            ? Object(he.jsx)(bo, { label: 'Movies list is currently empty!', variant: 'transparent' })
            : !r && a && c && c.length > 0
            ? Object(he.jsx)(he.Fragment, {
                children: c.map(function (e) {
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaItem: e ? Object(b.a)({}, e) : void 0,
                      mediaType: 'movie',
                      image: {
                        alt: ''.concat((null === e || void 0 === e ? void 0 : e.title) || '', ' movie poster'),
                        src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                        size: { thumbnail: 'w92', full: 'original' }
                      },
                      rating: {
                        rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                        count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                      },
                      title: (null === e || void 0 === e ? void 0 : e.title) || '',
                      subtitle: ''.concat(
                        [
                          ''.concat(Ft((null === e || void 0 === e ? void 0 : e.release_date) || '', 'year'), ' ') ||
                            !1,
                          ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'movie'))
                        ]
                          .filter(function (e) {
                            return e;
                          })
                          .join(' \u2022 ')
                      ),
                      isLoading: r
                    },
                    e.id
                  );
                })
              })
            : Object(he.jsx)(he.Fragment, {
                children: D.a.range(0, 20).map(function (e, t) {
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaType: 'movie',
                      title: 'Lorem ipsum',
                      subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                      isLoading: !0
                    },
                    t
                  );
                })
              });
        },
        Pi = [
          { id: 1, name: 'Actor', value: 'Acting' },
          { id: 2, name: 'Director', value: 'Directing' },
          { id: 3, name: 'Producer', value: 'Production' },
          { id: 4, name: 'Writer', value: 'Writing' },
          { id: 5, name: 'Cinematography', value: 'Camera' }
        ],
        Ri = function (e) {
          var t = e.isError,
            n = void 0 !== t && t,
            o = e.isSuccess,
            a = void 0 !== o && o,
            i = e.isLoading,
            r = void 0 === i || i,
            c = e.people;
          return !r && n
            ? Object(he.jsx)(Pa, {
                label: 'Oh no! Something went wrong',
                description: 'Failed to fetch people list!',
                variant: 'transparent'
              })
            : !r && a && c && 0 === c.length
            ? Object(he.jsx)(bo, { label: 'People list is currently empty!', variant: 'transparent' })
            : !r && a && c && c.length > 0
            ? Object(he.jsx)(he.Fragment, {
                children: c.map(function (e) {
                  var t;
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaItem: e ? Object(b.a)({}, e) : void 0,
                      mediaType: 'person',
                      image: {
                        alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                        src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                        size: { thumbnail: 'w45', full: 'original' }
                      },
                      title: (null === e || void 0 === e ? void 0 : e.name) || '',
                      subtitle:
                        (null ===
                          (t = Pi.find(function (t) {
                            return t.value === (null === e || void 0 === e ? void 0 : e.known_for_department);
                          })) || void 0 === t
                          ? void 0
                          : t.name) ||
                        (null === e || void 0 === e ? void 0 : e.known_for_department) ||
                        'N/A',
                      isLoading: r
                    },
                    e.id
                  );
                })
              })
            : Object(he.jsx)(he.Fragment, {
                children: D.a.range(0, 20).map(function (e, t) {
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaType: 'person',
                      title: 'Lorem ipsum',
                      subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                      isLoading: !0
                    },
                    t
                  );
                })
              });
        },
        Gi = function (e) {
          var t = e.isError,
            n = void 0 !== t && t,
            o = e.isSuccess,
            a = void 0 !== o && o,
            i = e.isLoading,
            r = void 0 === i || i,
            c = e.tv;
          return !r && n
            ? Object(he.jsx)(Pa, {
                label: 'Oh no! Something went wrong',
                description: 'Failed to fetch TV Shows list!',
                variant: 'transparent'
              })
            : !r && a && c && 0 === c.length
            ? Object(he.jsx)(bo, { label: 'TV Shows list is currently empty!', variant: 'transparent' })
            : !r && a && c && c.length > 0
            ? Object(he.jsx)(he.Fragment, {
                children: c.map(function (e) {
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaItem: e ? Object(b.a)({}, e) : void 0,
                      mediaType: 'tv',
                      image: {
                        alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' tv show poster'),
                        src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                        size: { thumbnail: 'w92', full: 'original' }
                      },
                      rating: {
                        rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                        count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                      },
                      title: (null === e || void 0 === e ? void 0 : e.name) || '',
                      subtitle: ''.concat(
                        [
                          ''.concat(Ft((null === e || void 0 === e ? void 0 : e.first_air_date) || '', 'year')) ||
                            'N/A',
                          ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'tv'))
                        ]
                          .filter(function (e) {
                            return e;
                          })
                          .join(' \u2022 ')
                      ),
                      isLoading: r
                    },
                    e.id
                  );
                })
              })
            : Object(he.jsx)(he.Fragment, {
                children: D.a.range(0, 20).map(function (e, t) {
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaType: 'tv',
                      title: 'Lorem ipsum',
                      subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                      isLoading: !0
                    },
                    t
                  );
                })
              });
        },
        Vi = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.children,
            r = e.title,
            c = e.pathname,
            s = e.isLoading,
            l = void 0 !== s && s;
          return Object(he.jsx)(di, {
            title: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
              fontWeight: 'semibold',
              textTransform: 'capitalize',
              children: r
            }),
            footer: Object(he.jsx)(pe, {
              to: { pathname: c },
              isFullWidth: !0,
              isDisabled: l,
              children: Object(he.jsx)(bn, {
                color: Wt(a),
                isFullWidth: !0,
                isDisabled: l,
                size: o ? 'sm' : 'md',
                variant: 'text',
                children: 'View all '.concat(r)
              })
            }),
            isLoading: l,
            children: i
          });
        },
        Hi = function () {
          var e = C.a.CancelToken.source(),
            t = Object(go.a)(
              'popularMovies',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/movie/popular', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            n = Object(go.a)(
              'trendingMovies',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/trending/movie/day', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            a = Object(go.a)(
              'popularTV',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/tv/popular', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            i = Object(go.a)(
              'trendingTV',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/trending/tv/day', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            r = Object(go.a)(
              'trendingPeople',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/trending/person/day', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'Home',
              breadcrumbs: [],
              children: {
                body: Object(he.jsxs)(Z.c, {
                  spacing: 6,
                  children: [
                    Object(he.jsx)(Vi, {
                      title: 'Popular movies',
                      pathname: '/movies/popular',
                      isLoading: t.isFetching || t.isLoading,
                      children: Object(he.jsx)(Wi, {
                        isError: t.isError,
                        isSuccess: t.isSuccess,
                        isLoading: t.isFetching || t.isLoading,
                        movies: t.data
                      })
                    }),
                    Object(he.jsx)(Vi, {
                      title: 'Trending movies',
                      pathname: '/trending/movie',
                      isLoading: n.isFetching || n.isLoading,
                      children: Object(he.jsx)(Wi, {
                        isError: n.isError,
                        isSuccess: n.isSuccess,
                        isLoading: n.isFetching || n.isLoading,
                        movies: n.data
                      })
                    }),
                    Object(he.jsx)(Vi, {
                      title: 'Popular TV shows',
                      pathname: '/tv/popular',
                      isLoading: a.isFetching || a.isLoading,
                      children: Object(he.jsx)(Gi, {
                        isError: a.isError,
                        isSuccess: a.isSuccess,
                        isLoading: a.isFetching || a.isLoading,
                        tv: a.data
                      })
                    }),
                    Object(he.jsx)(Vi, {
                      title: 'Trending TV shows',
                      pathname: '/trending/tv',
                      isLoading: i.isFetching || i.isLoading,
                      children: Object(he.jsx)(Gi, {
                        isError: i.isError,
                        isSuccess: i.isSuccess,
                        isLoading: i.isFetching || i.isLoading,
                        tv: i.data
                      })
                    }),
                    Object(he.jsx)(Vi, {
                      title: 'Trending People',
                      pathname: '/trending/person',
                      isLoading: r.isFetching || r.isLoading,
                      children: Object(he.jsx)(Ri, {
                        isError: r.isError,
                        isSuccess: r.isSuccess,
                        isLoading: r.isFetching || r.isLoading,
                        people: r.data
                      })
                    })
                  ]
                })
              }
            })
          );
        },
        Ji = n(261),
        Zi = n.n(Ji),
        Ui = [{ label: 'Date Added', value: 'dateAdded', isActive: !1 }],
        qi = [
          { label: 'Popularity', value: 'popularity', isActive: !1 },
          { label: 'Rating', value: 'vote_average', isActive: !1 },
          { label: 'Release Date', value: 'release_date', isActive: !1 },
          { label: 'Title', value: 'title', isActive: !1 }
        ],
        Xi = [].concat(qi, Ui),
        Ki = [
          { label: 'Popularity', value: 'popularity', isActive: !1 },
          { label: 'Rating', value: 'vote_average', isActive: !1 },
          { label: 'Release Date', value: 'first_air_date', isActive: !1 },
          { label: 'Title', value: 'name', isActive: !1 }
        ],
        $i = [].concat(Ki, Ui),
        er = [
          { label: 'Popularity', value: 'popularity', isActive: !1 },
          { label: 'Gender', value: 'gender', isActive: !1 },
          { label: 'Name', value: 'name', isActive: !1 }
        ],
        tr = [].concat(er, Ui),
        nr = n(544),
        or = function (e) {
          var t = e.id,
            n = e.name,
            o = e.value,
            a = e.isActive,
            i = void 0 !== a && a,
            r = e.onClick,
            c = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(bn, {
            color: i ? Wt(c) : 'gray',
            leftIcon: i ? _n.a : void 0,
            onClick: function () {
              return r({ id: t, name: n, value: o });
            },
            size: 'sm',
            variant: 'outlined',
            children: n
          });
        },
        ar = function (e) {
          var t = e.form,
            n = function (e) {
              var n = t.getValues().departments;
              t.getValues().departments.some(function (t) {
                return t.id === e.id;
              })
                ? t.setValue(
                    'departments',
                    n.filter(function (t) {
                      return t.id !== e.id;
                    }),
                    { shouldDirty: !0 }
                  )
                : t.setValue('departments', [].concat(Object(In.a)(n), [e]), { shouldDirty: !0 });
            };
          return Object(he.jsx)(On.a, {
            control: t.control,
            name: 'departments',
            render: function (e) {
              var o = e.field.value;
              return Object(he.jsx)(wn, {
                box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
                isFullWidth: !0,
                px: 2,
                pt: 1.5,
                pb: 2,
                children: {
                  header: {
                    actions: Object(he.jsx)(bn, {
                      onClick: function () {
                        t.getValues().departments.length === Pi.length
                          ? t.setValue('departments', [], { shouldDirty: !0 })
                          : t.setValue('departments', Object(In.a)(Pi), { shouldDirty: !0 });
                      },
                      size: 'sm',
                      variant: 'text',
                      children: ''.concat(t.getValues().departments.length === Pi.length ? 'Remove' : 'Select', ' All')
                    }),
                    title: 'Departments'
                  },
                  body: Object(he.jsx)(nr.a, {
                    width: '100%',
                    spacing: 1,
                    children: Pi.map(function (e) {
                      return Object(he.jsx)(
                        nr.b,
                        {
                          children: Object(he.jsx)(
                            or,
                            Object(b.a)(
                              Object(b.a)({}, e),
                              {},
                              {
                                isActive: o.some(function (t) {
                                  return t.id === e.id;
                                }),
                                onClick: n
                              }
                            ),
                            e.id
                          )
                        },
                        e.id
                      );
                    })
                  })
                }
              });
            }
          });
        },
        ir = n(545),
        rr = n(546),
        cr = n(547),
        sr = n(548),
        lr = function (e) {
          var t = Object(v.e)(),
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = e.label,
            a = e.value,
            i = e.icon,
            r = e.isActive,
            c = void 0 !== r && r,
            s = e.onClick;
          return Object(he.jsx)(kn, {
            color: c ? Wt(n) : 'gray',
            isFullWidth: !0,
            onClick: s
              ? function () {
                  return s(a);
                }
              : void 0,
            p: 2,
            children: Object(he.jsxs)(Z.a, {
              width: '100%',
              justifyContent: 'center',
              spacing: 1,
              children: [
                Object(he.jsx)(Se.a, { as: i, sx: { fontSize: ''.concat(t.fontSizes['2xl'], ' !important') } }),
                Object(he.jsx)(U.a, {
                  align: 'center',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                  textTransform: 'uppercase',
                  children: o
                })
              ]
            })
          });
        },
        dr = [
          { label: 'Grid', value: 'grid', iconActive: ir.a, icon: rr.a },
          { label: 'List', value: 'list', iconActive: cr.a, icon: sr.a }
        ],
        ur = function (e) {
          var t = e.form;
          return Object(he.jsx)(On.a, {
            control: t.control,
            name: 'displayMode',
            render: function (e) {
              var n = e.field.value;
              return Object(he.jsx)(wn, {
                box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
                isFullWidth: !0,
                px: 2,
                pt: 1.5,
                pb: 2,
                children: {
                  header: { title: 'Display Mode' },
                  body: Object(he.jsx)(Z.a, {
                    width: '100%',
                    spacing: 2,
                    children: dr.map(function (e) {
                      return Object(he.jsx)(
                        lr,
                        Object(b.a)(
                          Object(b.a)({}, e),
                          {},
                          {
                            isActive: n === e.value,
                            onClick: function () {
                              return t.setValue('displayMode', e.value, { shouldDirty: !0 });
                            }
                          }
                        ),
                        e.value
                      );
                    })
                  })
                }
              });
            }
          });
        },
        br = function (e) {
          var t = e.id,
            n = e.name,
            o = e.isActive,
            a = void 0 !== o && o,
            i = e.onClick,
            r = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(bn, {
            color: a ? Wt(r) : 'gray',
            leftIcon: a ? _n.a : void 0,
            onClick: function () {
              return i({ id: t, name: n });
            },
            size: 'sm',
            variant: 'outlined',
            children: n
          });
        },
        gr = function (e) {
          var t = e.mediaType,
            n = e.form,
            o = w(function (e) {
              return e.options.data.data.genres.movie;
            }),
            a = w(function (e) {
              return e.options.data.data.genres.tv;
            }),
            i = function (e) {
              var t = n.getValues().genres;
              n.getValues().genres.some(function (t) {
                return t.id === e.id;
              })
                ? n.setValue(
                    'genres',
                    t.filter(function (t) {
                      return t.id !== e.id;
                    }),
                    { shouldDirty: !0 }
                  )
                : n.setValue('genres', [].concat(Object(In.a)(t), [e]), { shouldDirty: !0 });
            },
            r = function () {
              var e = 'movie' === t ? Object(In.a)(o) : Object(In.a)(a);
              return ''.concat(n.getValues().genres.length === e.length ? 'Remove' : 'Select', ' All');
            };
          return Object(he.jsx)(On.a, {
            control: n.control,
            name: 'genres',
            render: function (e) {
              var c = e.field.value;
              return Object(he.jsx)(wn, {
                box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
                isFullWidth: !0,
                px: 2,
                pt: 1.5,
                pb: 2,
                children: {
                  header: {
                    actions: Object(he.jsx)(bn, {
                      onClick: function () {
                        return (function () {
                          var e = 'movie' === t ? Object(In.a)(o) : Object(In.a)(a);
                          n.getValues().genres.length === e.length
                            ? n.setValue('genres', [], { shouldDirty: !0 })
                            : n.setValue('genres', Object(In.a)(e), { shouldDirty: !0 });
                        })();
                      },
                      size: 'sm',
                      variant: 'text',
                      children: r()
                    }),
                    title: 'Genres'
                  },
                  body: Object(he.jsx)(nr.a, {
                    width: '100%',
                    spacing: 1,
                    children:
                      'movie' === t
                        ? o.map(function (e) {
                            return Object(he.jsx)(
                              nr.b,
                              {
                                children: Object(he.jsx)(
                                  br,
                                  Object(b.a)(
                                    Object(b.a)({}, e),
                                    {},
                                    {
                                      isActive: c.some(function (t) {
                                        return t.id === e.id;
                                      }),
                                      onClick: i
                                    }
                                  )
                                )
                              },
                              e.id
                            );
                          })
                        : 'tv' === t
                        ? a.map(function (e) {
                            return Object(he.jsx)(
                              nr.b,
                              {
                                children: Object(he.jsx)(
                                  br,
                                  Object(b.a)(
                                    Object(b.a)({}, e),
                                    {},
                                    {
                                      isActive: c.some(function (t) {
                                        return t.id === e.id;
                                      }),
                                      onClick: i
                                    }
                                  )
                                )
                              },
                              e.id
                            );
                          })
                        : null
                  })
                }
              });
            }
          });
        },
        jr = n(260),
        hr = n.n(jr),
        pr = function (e) {
          var t = e.label,
            n = e.value,
            o = e.isActive,
            a = e.direction,
            i = e.onSortChange,
            r = e.onDirectionChange,
            c = Object(v.e)(),
            s = Object(J.c)().colorMode,
            l = (function (e, t) {
              var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              return {
                common: {
                  'cursor': 'pointer',
                  'width': '100%',
                  'border': 'none',
                  'borderRadius': 'base',
                  'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                  '& .chakra-icon': {
                    fontSize: ''.concat(e.fontSizes.xl, ' !important'),
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  '& .chakra-text': {
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  '&:focus': { boxShadow: 'none' }
                },
                light: {
                  'backgroundColor': n ? ''.concat(t, '.400') : 'transparent',
                  '& .chakra-icon': { color: n ? 'gray.50' : 'gray.400' },
                  '& .chakra-text': { color: n ? 'gray.50' : 'gray.400' },
                  '&:hover': {
                    'backgroundColor': n ? ''.concat(t, '.500') : 'gray.200',
                    '& .chakra-icon': { color: n ? 'gray.50' : 'gray.900' },
                    '& .chakra-text': { color: n ? 'gray.50' : 'gray.900' }
                  }
                },
                dark: {
                  'backgroundColor': n ? ''.concat(t, '.500') : 'transparent',
                  '& .chakra-icon': { color: n ? 'gray.900' : 'gray.500' },
                  '& .chakra-text': { color: n ? 'gray.900' : 'gray.500' },
                  '&:hover': {
                    'backgroundColor': n ? ''.concat(t, '.400') : 'gray.700',
                    '& .chakra-icon': { color: n ? 'gray.900' : 'gray.50' },
                    '& .chakra-text': { color: n ? 'gray.900' : 'gray.50' }
                  }
                }
              };
            })(
              c,
              w(function (e) {
                return e.user.ui.theme.color;
              }),
              o
            );
          return Object(he.jsx)(dn.a, {
            isFullWidth: !0,
            onClick: function () {
              return o ? r('asc' === a ? 'desc' : 'asc') : i({ label: t, value: n, isActive: o });
            },
            px: 2,
            py: 1,
            sx: Object(b.a)({}, D.a.merge(l.common, l[s])),
            children: Object(he.jsxs)(Z.a, {
              width: '100%',
              justifyContent: 'space-between',
              spacing: 2,
              children: [
                Object(he.jsx)(U.a, { align: 'left', fontSize: 'md', fontWeight: 'medium', children: t }),
                Object(he.jsx)(_e.a, {
                  in: o,
                  unmountOnExit: !0,
                  children: Object(he.jsx)(Se.a, {
                    as: hr.a,
                    sx: { transform: 'asc' === a ? 'rotate(180deg)' : 'rotate(0deg)' }
                  })
                })
              ]
            })
          });
        },
        vr = function (e) {
          var t = e.form,
            n = function (e) {
              var n = t.getValues().sort.sortBy,
                o = n.findIndex(function (e) {
                  return e.isActive;
                }),
                a = n.findIndex(function (t) {
                  return t.value === e.value;
                });
              t.setValue(
                'sort',
                Object(b.a)(
                  Object(b.a)({}, t.getValues().sort),
                  {},
                  {
                    sortBy: n.map(function (e, t) {
                      switch (t) {
                        case o:
                          return Object(b.a)(Object(b.a)({}, e), {}, { isActive: !1 });
                        case a:
                          return Object(b.a)(Object(b.a)({}, e), {}, { isActive: !0 });
                        default:
                          return e;
                      }
                    })
                  }
                ),
                { shouldDirty: !0 }
              );
            },
            o = function (e) {
              t.setValue('sort', Object(b.a)(Object(b.a)({}, t.getValues().sort), {}, { direction: e }), {
                shouldDirty: !0
              });
            };
          return Object(he.jsx)(On.a, {
            control: t.control,
            name: 'sort',
            render: function (e) {
              var t = e.field.value;
              return Object(he.jsx)(wn, {
                box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
                isFullWidth: !0,
                px: 2,
                pt: 1.5,
                pb: 2,
                children: {
                  header: { title: 'Sort by' },
                  body: Object(he.jsx)(Z.c, {
                    width: '100%',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    spacing: 1,
                    children: t.sortBy.map(function (e) {
                      return Object(he.jsx)(
                        pr,
                        Object(b.a)(
                          Object(b.a)({}, e),
                          {},
                          { direction: t.direction, onSortChange: n, onDirectionChange: o }
                        ),
                        e.value
                      );
                    })
                  })
                }
              });
            }
          });
        },
        Or = function (e) {
          var t = Object(fe.a)(),
            n = t.isOpen,
            a = t.onOpen,
            i = t.onClose,
            c = Object(ge.g)(),
            s = Object(r.b)(),
            l = w(function (e) {
              return e.app.ui.displayMode;
            }),
            d = w(function (e) {
              return e.app.data.sortDirection;
            }),
            u = w(function (e) {
              return e.user.ui.theme.color;
            }),
            g = e.mediaType,
            j = e.isLikedLists,
            h = void 0 !== j && j,
            p = e.isDisabled,
            v = void 0 !== p && p,
            O = e.onFilter,
            f = {
              displayMode: l,
              sort: {
                sortBy: h
                  ? 'movie' === g
                    ? Object(In.a)(Xi)
                    : 'tv' === g
                    ? Object(In.a)($i)
                    : Object(In.a)(tr)
                  : 'movie' === g
                  ? Object(In.a)(qi)
                  : 'tv' === g
                  ? Object(In.a)(Ki)
                  : Object(In.a)(er),
                direction: d
              },
              genres: [],
              departments: []
            },
            m = Object(On.e)({ defaultValues: f }),
            x = Object(On.f)({ control: m.control }),
            y = x.isDirty,
            A = x.dirtyFields;
          return (
            Object(o.useEffect)(
              function () {
                var e = c.pathname.split('/');
                (e.includes('movie') || e.includes('tv') || e.includes('person')) &&
                  m.reset(
                    Object(b.a)(
                      Object(b.a)({}, f),
                      {},
                      {
                        sort: Object(b.a)(
                          Object(b.a)({}, f.sort),
                          {},
                          {
                            sortBy: h
                              ? e.includes('movie')
                                ? Object(In.a)(Xi)
                                : e.includes('tv')
                                ? Object(In.a)($i)
                                : Object(In.a)(tr)
                              : e.includes('movie')
                              ? Object(In.a)(qi)
                              : e.includes('tv')
                              ? Object(In.a)(Ki)
                              : Object(In.a)(er)
                          }
                        )
                      }
                    )
                  );
              },
              [c]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Ee, {
                  'aria-label': 'Open filters modal',
                  'color': n ? Wt(u) : 'gray',
                  'icon': Zi.a,
                  'isDisabled': v,
                  'onClick': function () {
                    return a();
                  },
                  'variant': 'outlined'
                }),
                Object(he.jsx)(pn, {
                  title: 'Filter',
                  actions: Object(he.jsx)(bn, {
                    color: Wt(u),
                    isDisabled: !y,
                    onClick: m.handleSubmit(function (e) {
                      return (function (e) {
                        A.displayMode && s(z(e.displayMode)),
                          A.sort && (O(e.sort.sortBy, [], []), s(I(e.sort.direction))),
                          A.genres && O([], e.genres, []),
                          A.departments && O([], [], e.departments),
                          i(),
                          m.reset(Object(b.a)({}, e));
                      })(e);
                    }),
                    size: 'sm',
                    children: 'Submit'
                  }),
                  isOpen: n,
                  onClose: function () {
                    m.reset(Object(b.a)({}, f)), i();
                  },
                  isCentered: !0,
                  size: '3xl',
                  children: Object(he.jsxs)(Z.c, {
                    spacing: 2,
                    p: 2,
                    children: [
                      Object(he.jsx)(ur, { form: m }),
                      Object(he.jsx)(vr, { form: m }),
                      'person' !== g ? Object(he.jsx)(gr, { mediaType: g, form: m }) : Object(he.jsx)(ar, { form: m })
                    ]
                  })
                })
              ]
            })
          );
        },
        fr = function (e) {
          var t,
            n,
            o,
            a,
            i = e.title,
            r = e.header,
            c = Object(J.c)().colorMode,
            s = Object(O.a)('(max-width: 600px)'),
            l = Object(p.a)(s, 1)[0],
            d =
              (null === r ||
              void 0 === r ||
              null === (t = r.props) ||
              void 0 === t ||
              null === (n = t.children) ||
              void 0 === n ||
              null === (o = n.props) ||
              void 0 === o ||
              null === (a = o.children) ||
              void 0 === a
                ? void 0
                : a.length) || 0;
          return Object(he.jsxs)(Z.b, {
            width: '100%',
            direction: l && d > 1 ? 'column' : 'row',
            alignItems: l && d > 1 ? 'stretch' : 'center',
            justify: i ? 'space-between' : 'flex-end',
            wrap: 'wrap',
            spacing: 2,
            p: [2],
            children: [
              i
                ? Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === c ? 'gray.900' : 'gray.50',
                    fontSize: '2xl',
                    fontWeight: 'semibold',
                    textTransform: 'capitalize',
                    children: i
                  })
                : null,
              r
            ]
          });
        },
        mr = function (e) {
          var t = e.children,
            n = e.title,
            o = e.header;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 0,
            children: [n || o ? Object(he.jsx)(fr, { title: n, header: o }) : null, t]
          });
        },
        xr = function (e) {
          var t = Object(v.e)(),
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = e.label,
            a = e.value,
            i = e.iconActive,
            r = e.icon,
            c = e.isActive,
            s = void 0 !== c && c,
            l = e.onClick;
          return Object(he.jsx)(kn, {
            color: s ? Wt(n) : 'gray',
            isFullWidth: !0,
            onClick: function () {
              return l(a);
            },
            px: 2,
            py: 6,
            children: Object(he.jsxs)(Z.c, {
              width: '100%',
              spacing: 0,
              children: [
                Object(he.jsx)(Se.a, { as: s ? i : r, sx: { fontSize: ''.concat(t.fontSizes['3xl'], ' !important') } }),
                Object(he.jsx)(U.a, {
                  align: 'center',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                  textTransform: 'uppercase',
                  children: o
                })
              ]
            })
          });
        },
        yr = [
          { label: 'Movies', value: 'movie', iconActive: re.a, icon: re.a },
          { label: 'TV Shows', value: 'tv', iconActive: ce.a, icon: se.a },
          { label: 'People', value: 'person', iconActive: le.a, icon: de.a }
        ],
        Ar = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.mediaTypes,
            a = e.mediaType,
            i = e.onSetType,
            r = e.onClose,
            c = function (e) {
              i(e), r && r();
            };
          return n
            ? Object(he.jsx)(Z.c, {
                width: '100%',
                justifyContent: 'space-between',
                spacing: 3,
                children: yr.map(function (e) {
                  return (o && o.includes(e.value)) || !o
                    ? Object(he.jsx)(
                        xr,
                        Object(b.a)(Object(b.a)({}, e), {}, { isActive: e.value === a, onClick: c }),
                        e.value
                      )
                    : null;
                })
              })
            : Object(he.jsx)(Z.a, {
                width: '100%',
                justifyContent: 'space-between',
                spacing: 3,
                children: yr.map(function (e) {
                  return (o && o.includes(e.value)) || !o
                    ? Object(he.jsx)(
                        xr,
                        Object(b.a)(Object(b.a)({}, e), {}, { isActive: e.value === a, onClick: c }),
                        e.value
                      )
                    : null;
                })
              });
        },
        wr = function (e) {
          var t = e.isOpen,
            n = e.onClose,
            o = Object(je.a)(e, ['isOpen', 'onClose']);
          return Object(he.jsx)(pn, {
            title: 'Select media type',
            isOpen: t,
            onClose: n,
            isCentered: !0,
            size: '2xl',
            children: Object(he.jsx)(f.a, {
              width: '100%',
              height: '100%',
              p: 3,
              children: Object(he.jsx)(Ar, Object(b.a)(Object(b.a)({}, o), {}, { onClose: n }))
            })
          });
        },
        kr = { label: 'Home', to: { pathname: '/' } },
        Cr = { label: 'Search', to: { pathname: '/search' } },
        Sr = { label: 'Trending', to: { pathname: '/trending' } },
        Dr = { label: 'Movies', to: { pathname: '/movies' } },
        Er = { label: 'TV Shows', to: { pathname: '/tv' } },
        Lr = { label: 'People', to: { pathname: '/people' } },
        _r = { label: 'Liked', to: { pathname: '/liked' } },
        Br = { label: 'Lists', to: { pathname: '/lists' } },
        Mr = Gt(100, 10),
        Tr = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.mediaType,
            a = e.mediaItem,
            i = e.isLoading,
            c = void 0 !== i && i,
            s = Object(r.b)(),
            l = Object(o.useState)(!1),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useCallback)(
              function (e) {
                e && b(Rt(e));
              },
              [u, b]
            );
          return Object(he.jsx)(Zo, {
            width: c ? ''.concat(Mr[Math.floor(Math.random() * Mr.length)], '%') : '100%',
            offsetY: 8.5,
            isLoaded: !c,
            children: Object(he.jsx)(U.a, {
              ref: g,
              cursor: u ? 'pointer' : 'text',
              align: 'left',
              fontSize: ['sm', 'md', 'lg', 'xl'],
              color: 'light' === t ? 'gray.400' : 'gray.500',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              onClick: function () {
                return s(Ze({ open: !0, mediaType: n, mediaItem: a }));
              },
              children: c
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                : a.description
            })
          });
        },
        zr = Gt(100, 10),
        Ir = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.subtitle,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = Object(o.useState)(!1),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(o.useCallback)(
              function (e) {
                e && l(Rt(e));
              },
              [s, l]
            );
          return Object(he.jsx)(Zo, {
            width: i ? ''.concat(zr[Math.floor(Math.random() * zr.length)], '%') : '100%',
            offsetY: 8.5,
            isLoaded: !i,
            children: Object(he.jsx)(U.a, {
              ref: d,
              align: 'left',
              fontSize: ['sm', 'md', 'lg', 'xl'],
              color: 'light' === t ? 'gray.400' : 'gray.500',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              children: i ? 'Lorem ipsum dolor sit amet' : n
            })
          });
        },
        Fr = Gt(100, 10),
        Qr = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.title,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = Object(o.useState)(!1),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(o.useCallback)(
              function (e) {
                e && l(Rt(e));
              },
              [s, l]
            );
          return Object(he.jsx)(Zo, {
            width: i ? ''.concat(Fr[Math.floor(Math.random() * Fr.length)], '%') : '100%',
            offsetY: 11.5,
            isLoaded: !i,
            children: Object(he.jsx)(U.a, {
              ref: d,
              align: 'left',
              fontSize: ['lg', 'xl', '2xl', '3xl'],
              fontWeight: 'semibold',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              children: i ? 'Lorem ipsum' : n
            })
          });
        },
        Nr = ['100px', '116px', '152px', '188px', '188px', '224px'],
        Yr = function (e) {
          var t = Object(v.e)(),
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = Object($n.a)({
              'base': t.fontSizes.lg,
              'sm': t.fontSizes.lg,
              'md': t.fontSizes.xl,
              'lg': t.fontSizes['2xl'],
              'xl': t.fontSizes['2xl'],
              '2xl': t.fontSizes['3xl']
            }),
            i = Object(Co.a)({ threshold: [0.2, 0.4, 0.6, 0.8, 1], unobserveOnEnter: !0 }),
            r = i.observe,
            c = i.inView,
            s = e.mediaItem,
            l = e.mediaType,
            d = e.image,
            u = e.rating,
            b = e.title,
            g = void 0 === b ? 'Lorem ipsum' : b,
            j = e.subtitle,
            h = void 0 === j ? 'Lorem ipsum' : j,
            m = e.description,
            x = void 0 === m ? 'Lorem ipsum' : m,
            y = e.isLoading,
            A = void 0 !== y && y,
            w = Object(Le.a)(),
            k = Object(p.a)(w, 2),
            C = k[0],
            S = k[1];
          return Object(he.jsx)(pe, {
            isDisabled: A || C,
            to: { pathname: '/'.concat(l, '/').concat((null === s || void 0 === s ? void 0 : s.id) || '') },
            children: Object(he.jsx)(kn, {
              isFullWidth: !0,
              isDisabled: A,
              isClickable: !C,
              isLight: !0,
              children: Object(he.jsxs)(Z.a, {
                width: '100%',
                position: 'relative',
                spacing: [1, 1, 2, 2, 2, 2],
                p: [1, 1, 2, 2, 2, 2],
                children: [
                  Object(he.jsx)(f.a, {
                    ref: r,
                    as: wo.a,
                    width: Nr,
                    minWidth: Nr,
                    maxWidth: Nr,
                    borderRadius: 'base',
                    ratio: 2 / 3,
                    children: Object(he.jsx)(eo.a, {
                      in: A || c,
                      unmountOnExit: !0,
                      style: { width: 'inherit', borderRadius: 'inherit' },
                      children: Object(he.jsx)(wo.a, {
                        width: Nr,
                        minWidth: Nr,
                        maxWidth: Nr,
                        borderRadius: 'base',
                        ratio: 2 / 3,
                        children: Object(he.jsx)(Ho, {
                          isLoaded: !A && Boolean(d),
                          borderRadius: 'base',
                          children: Object(he.jsx)(Oo, {
                            alt: (null === d || void 0 === d ? void 0 : d.alt) || '',
                            mediaType: l,
                            maxWidth: 'none',
                            height: '100%',
                            borderRadius: 'base',
                            thumbnailSrc: ''
                              .concat('https://image.tmdb.org/t/p', '/')
                              .concat((null === d || void 0 === d ? void 0 : d.size.thumbnail) || '')
                              .concat((null === d || void 0 === d ? void 0 : d.src) || ''),
                            fullSrc: ''
                              .concat('https://image.tmdb.org/t/p', '/')
                              .concat((null === d || void 0 === d ? void 0 : d.size.full) || '')
                              .concat((null === d || void 0 === d ? void 0 : d.src) || '')
                          })
                        })
                      })
                    })
                  }),
                  Object(he.jsxs)(Z.c, {
                    width: [
                      'calc(100% - 108px)',
                      'calc(100% - 124px)',
                      'calc(100% - 168px)',
                      'calc(100% - 204px)',
                      'calc(100% - 204px)',
                      'calc(100% - 240px)'
                    ],
                    alignItems: 'flex-start',
                    spacing: [1, 1, 2, 2, 2, 2],
                    children: [
                      'person' !== l
                        ? Object(he.jsx)($o, {
                            rating: u,
                            isLoading: A,
                            iconFontsize: a,
                            textFontsize: ['sm', 'sm', 'md', 'lg', 'lg', 'xl']
                          })
                        : null,
                      Object(he.jsxs)(Z.c, {
                        width: '100%',
                        alignItems: 'flex-start',
                        spacing: A ? 0.5 : 0,
                        children: [
                          Object(he.jsx)(Qr, { title: g, isLoading: A }),
                          Object(he.jsx)(Ir, { subtitle: h, isLoading: A })
                        ]
                      }),
                      Object(he.jsx)(f.a, {
                        width: '100%',
                        onMouseEnter: function () {
                          return S.on();
                        },
                        onMouseLeave: function () {
                          return S.off();
                        },
                        children:
                          'string' === typeof x
                            ? Object(he.jsx)(Tr, {
                                mediaType: l,
                                mediaItem: {
                                  id: (null === s || void 0 === s ? void 0 : s.id) || -1,
                                  title: g,
                                  description: x
                                },
                                isLoading: A
                              })
                            : x
                      })
                    ]
                  }),
                  s
                    ? Object(he.jsxs)(Z.a, {
                        spacing: 0,
                        sx: { position: 'absolute', top: 1, right: 1 },
                        children: [
                          Object(he.jsx)(f.a, {
                            onMouseEnter: function () {
                              return S.on();
                            },
                            onMouseLeave: function () {
                              return S.off();
                            },
                            children: Object(he.jsx)(bi, {
                              title: g,
                              mediaType: l,
                              mediaItem: s,
                              isLoading: A,
                              size: o ? 'md' : 'lg'
                            })
                          }),
                          'person' !== l
                            ? Object(he.jsx)(f.a, {
                                onMouseEnter: function () {
                                  return S.on();
                                },
                                onMouseLeave: function () {
                                  return S.off();
                                },
                                children: Object(he.jsx)(ui, {
                                  title: g,
                                  mediaType: l,
                                  mediaItem: s,
                                  isLoading: A,
                                  size: o ? 'md' : 'lg'
                                })
                              })
                            : null
                        ]
                      })
                    : null
                ]
              })
            })
          });
        },
        Wr = function (e) {
          var t = Object(O.a)('(max-width: 320px)'),
            n = Object(p.a)(t, 1)[0],
            o = w(function (e) {
              return e.app.ui.displayMode;
            }),
            a = e.isError,
            i = void 0 !== a && a,
            r = e.isSuccess,
            c = void 0 !== r && r,
            s = e.isLoading,
            l = void 0 === s || s,
            d = e.movies;
          return !l && i
            ? Object(he.jsx)(Pa, {
                label: 'Oh no! Something went wrong',
                description: 'Failed to fetch movies list!',
                variant: 'outlined'
              })
            : !l && c && d && 0 === d.length
            ? Object(he.jsx)(bo, { label: 'Movies list is currently empty!', variant: 'outlined' })
            : !l && c && d && d.length > 0
            ? Object(he.jsx)(En.a, {
                width: '100%',
                columns: 'list' === o ? 1 : [n ? 1 : 2, 2, 4, 5, 5, 6],
                spacing: 2,
                children: d.map(function (e) {
                  return 'list' === o
                    ? Object(he.jsx)(
                        Yr,
                        {
                          mediaItem: e ? Object(b.a)({}, e) : void 0,
                          mediaType: 'movie',
                          image: {
                            alt: ''.concat((null === e || void 0 === e ? void 0 : e.title) || '', ' movie poster'),
                            src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                            size: { thumbnail: 'w92', full: 'original' }
                          },
                          rating: {
                            rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                            count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                          },
                          title: (null === e || void 0 === e ? void 0 : e.title) || '',
                          subtitle: ''.concat(
                            [
                              ''.concat(Ft((null === e || void 0 === e ? void 0 : e.release_date) || '', 'full')) ||
                                'N/A',
                              ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'movie'))
                            ]
                              .filter(function (e) {
                                return e;
                              })
                              .join(' \u2022 ')
                          ),
                          description: (null === e || void 0 === e ? void 0 : e.overview) || '',
                          isLoading: l
                        },
                        e.id
                      )
                    : Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaItem: e ? Object(b.a)({}, e) : void 0,
                          mediaType: 'movie',
                          image: {
                            alt: ''.concat((null === e || void 0 === e ? void 0 : e.title) || '', ' movie poster'),
                            src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                            size: { thumbnail: 'w92', full: 'original' }
                          },
                          rating: {
                            rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                            count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                          },
                          title: (null === e || void 0 === e ? void 0 : e.title) || '',
                          subtitle: ''.concat(
                            [
                              ''.concat(Ft((null === e || void 0 === e ? void 0 : e.release_date) || '', 'year')) ||
                                'N/A',
                              ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'movie'))
                            ]
                              .filter(function (e) {
                                return e;
                              })
                              .join(' \u2022 ')
                          ),
                          isLoading: l
                        },
                        e.id
                      );
                })
              })
            : Object(he.jsx)(En.a, {
                width: '100%',
                columns: 'list' === o ? 1 : [n ? 1 : 2, 2, 4, 5, 5, 6],
                spacing: 2,
                children: D.a.range(0, c && d && d.length > 0 ? d.length : 20).map(function (e, t) {
                  return 'list' === o
                    ? Object(he.jsx)(
                        Yr,
                        {
                          mediaType: 'movie',
                          image: { alt: 'Movie poster', src: '', size: { thumbnail: 'w92', full: 'original' } },
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                          isLoading: !0
                        },
                        t
                      )
                    : Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaType: 'movie',
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                })
              });
        },
        Pr = Gt(100, 3),
        Rr = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(O.a)('(max-width: 320px)'),
            a = Object(p.a)(o, 1)[0],
            i = w(function (e) {
              return e.app.ui.displayMode;
            }),
            r = w(function (e) {
              return e.user.ui.theme.color;
            }),
            c = e.isError,
            s = void 0 !== c && c,
            l = e.isSuccess,
            d = void 0 !== l && l,
            u = e.isLoading,
            g = void 0 === u || u,
            j = e.people;
          return !g && s
            ? Object(he.jsx)(Pa, {
                label: 'Oh no! Something went wrong',
                description: 'Failed to fetch people list!',
                variant: 'outlined'
              })
            : !g && d && j && 0 === j.length
            ? Object(he.jsx)(bo, { label: 'People list is currently empty!', variant: 'outlined' })
            : !g && d && j && j.length > 0
            ? Object(he.jsx)(En.a, {
                width: '100%',
                columns: 'list' === i ? 1 : [a ? 1 : 2, 2, 4, 5, 5, 6],
                spacing: 2,
                children: j.map(function (e) {
                  var o, a;
                  return 'list' === i
                    ? Object(he.jsx)(
                        Yr,
                        {
                          mediaItem: e ? Object(b.a)({}, e) : void 0,
                          mediaType: 'person',
                          image: {
                            alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                            src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                            size: { thumbnail: 'w45', full: 'original' }
                          },
                          title: (null === e || void 0 === e ? void 0 : e.name) || '',
                          subtitle:
                            (null ===
                              (o = Pi.find(function (t) {
                                return t.value === (null === e || void 0 === e ? void 0 : e.known_for_department);
                              })) || void 0 === o
                              ? void 0
                              : o.name) ||
                            (null === e || void 0 === e ? void 0 : e.known_for_department) ||
                            'N/A',
                          description: Object(he.jsx)(Ca, {
                            isLoading: g,
                            children: Object(he.jsx)(Z.a, {
                              divider: Object(he.jsx)(U.a, {
                                align: 'left',
                                fontSize: ['sm', 'md', 'lg', 'xl'],
                                color: 'light' === n ? 'gray.400' : 'gray.500',
                                pr: 0.75,
                                children: ','
                              }),
                              children: ua()(
                                (null === e || void 0 === e ? void 0 : e.known_for) || [],
                                'vote_average'
                              ).map(function (e) {
                                return Object(he.jsx)(
                                  pe,
                                  {
                                    to: {
                                      pathname: '/'
                                        .concat(
                                          (null === e || void 0 === e ? void 0 : e.title)
                                            ? 'movie'
                                            : (null === e || void 0 === e ? void 0 : e.name)
                                            ? 'tv'
                                            : '',
                                          '/'
                                        )
                                        .concat(e.id)
                                    },
                                    isDisabled: g,
                                    children: Object(he.jsx)(Zo, {
                                      width: g ? ''.concat(Pr[Math.floor(Math.random() * Pr.length)], '%') : '100%',
                                      offsetY: 8.5,
                                      isLoaded: !g,
                                      children: Object(he.jsx)(U.a, {
                                        align: 'left',
                                        fontSize: ['sm', 'md', 'lg', 'xl'],
                                        color: 'light' === n ? 'gray.400' : 'gray.500',
                                        isTruncated: !0,
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        sx: {
                                          transition: ''
                                            .concat(t.transition.duration.faster, ' ')
                                            .concat(t.transition.easing['ease-out'])
                                        },
                                        _focus: { boxShadow: 'none' },
                                        _hover: { color: ''.concat(r, '.').concat('light' === n ? 500 : 400) },
                                        children:
                                          (null === e || void 0 === e ? void 0 : e.title) ||
                                          (null === e || void 0 === e ? void 0 : e.name) ||
                                          ''
                                      })
                                    })
                                  },
                                  e.id
                                );
                              })
                            })
                          }),
                          isLoading: g
                        },
                        e.id
                      )
                    : Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaItem: e ? Object(b.a)({}, e) : void 0,
                          mediaType: 'person',
                          image: {
                            alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                            src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                            size: { thumbnail: 'w45', full: 'original' }
                          },
                          title: (null === e || void 0 === e ? void 0 : e.name) || '',
                          subtitle:
                            (null ===
                              (a = Pi.find(function (t) {
                                return t.value === (null === e || void 0 === e ? void 0 : e.known_for_department);
                              })) || void 0 === a
                              ? void 0
                              : a.name) ||
                            (null === e || void 0 === e ? void 0 : e.known_for_department) ||
                            'N/A',
                          isLoading: g
                        },
                        e.id
                      );
                })
              })
            : Object(he.jsx)(En.a, {
                width: '100%',
                columns: 'list' === i ? 1 : [a ? 1 : 2, 2, 4, 5, 5, 6],
                spacing: 2,
                children: D.a.range(0, d && j && j.length > 0 ? j.length : 20).map(function (e, t) {
                  return 'list' === i
                    ? Object(he.jsx)(
                        Yr,
                        {
                          mediaType: 'person',
                          image: { alt: 'Person poster', src: '', size: { thumbnail: 'w45', full: 'original' } },
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                          isLoading: !0
                        },
                        t
                      )
                    : Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaType: 'person',
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                })
              });
        },
        Gr = function (e) {
          var t = Object(O.a)('(max-width: 320px)'),
            n = Object(p.a)(t, 1)[0],
            o = w(function (e) {
              return e.app.ui.displayMode;
            }),
            a = e.isError,
            i = void 0 !== a && a,
            r = e.isSuccess,
            c = void 0 !== r && r,
            s = e.isLoading,
            l = void 0 === s || s,
            d = e.tv;
          return !l && i
            ? Object(he.jsx)(Pa, {
                label: 'Oh no! Something went wrong',
                description: 'Failed to fetch TV Shows list!',
                variant: 'outlined'
              })
            : !l && c && d && 0 === d.length
            ? Object(he.jsx)(bo, { label: 'TV Shows list is currently empty!', variant: 'outlined' })
            : !l && c && d && d.length > 0
            ? Object(he.jsx)(En.a, {
                width: '100%',
                columns: 'list' === o ? 1 : [n ? 1 : 2, 2, 4, 5, 5, 6],
                spacing: 2,
                children: d.map(function (e) {
                  return 'list' === o
                    ? Object(he.jsx)(
                        Yr,
                        {
                          mediaItem: e ? Object(b.a)({}, e) : void 0,
                          mediaType: 'tv',
                          image: {
                            alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' tv show poster'),
                            src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                            size: { thumbnail: 'w92', full: 'original' }
                          },
                          rating: {
                            rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                            count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                          },
                          title: (null === e || void 0 === e ? void 0 : e.name) || '',
                          subtitle: ''.concat(
                            [
                              ''.concat(Ft((null === e || void 0 === e ? void 0 : e.first_air_date) || '', 'full')) ||
                                'N/A',
                              ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'tv'))
                            ]
                              .filter(function (e) {
                                return e;
                              })
                              .join(' \u2022 ')
                          ),
                          description: (null === e || void 0 === e ? void 0 : e.overview) || '',
                          isLoading: l
                        },
                        e.id
                      )
                    : Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaItem: e ? Object(b.a)({}, e) : void 0,
                          mediaType: 'tv',
                          image: {
                            alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' tv show poster'),
                            src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                            size: { thumbnail: 'w92', full: 'original' }
                          },
                          rating: {
                            rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                            count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                          },
                          title: (null === e || void 0 === e ? void 0 : e.name) || '',
                          subtitle: ''.concat(
                            [
                              ''.concat(Ft((null === e || void 0 === e ? void 0 : e.first_air_date) || '', 'year')) ||
                                'N/A',
                              ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'tv'))
                            ]
                              .filter(function (e) {
                                return e;
                              })
                              .join(' \u2022 ')
                          ),
                          isLoading: l
                        },
                        e.id
                      );
                })
              })
            : Object(he.jsx)(En.a, {
                width: '100%',
                columns: 'list' === o ? 1 : [n ? 1 : 2, 2, 4, 5, 5, 6],
                spacing: 2,
                children: D.a.range(0, c && d && d.length > 0 ? d.length : 20).map(function (e, t) {
                  return 'list' === o
                    ? Object(he.jsx)(
                        Yr,
                        {
                          mediaType: 'tv',
                          image: { alt: 'TV Show poster', src: '', size: { thumbnail: 'w92', full: 'original' } },
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                          isLoading: !0
                        },
                        t
                      )
                    : Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaType: 'tv',
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                })
              });
        },
        Vr = function (e) {
          var t = e.movies,
            n = void 0 === t ? [] : t,
            o = e.tv,
            a = void 0 === o ? [] : o,
            i = e.people,
            r = void 0 === i ? [] : i,
            c = Object(J.c)().colorMode,
            s = Object(O.a)('(max-width: 600px)'),
            l = Object(p.a)(s, 1)[0],
            d = w(function (e) {
              return e.user.ui.theme.color;
            }),
            u = function (e, t) {
              return Object(he.jsx)(ke.a, {
                children: Object(he.jsxs)(U.a, {
                  align: 'left',
                  color: 'light' === c ? 'gray.900' : 'gray.50',
                  fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
                  fontWeight: 'semibold',
                  textTransform: 'capitalize',
                  children: [e, Object(he.jsx)(yo, { label: String(t), color: 'gray', size: 'lg', ml: 2 })]
                })
              });
            };
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 6,
            children: [
              Object(he.jsx)(Be.a, {
                in: (n && n.length > 0) || !1,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(di, {
                  title: u('Movies', n.length),
                  footer:
                    n.length > 20
                      ? Object(he.jsx)(pe, {
                          to: { pathname: '/liked/movie' },
                          isFullWidth: !0,
                          children: Object(he.jsx)(bn, {
                            color: Wt(d),
                            isFullWidth: !0,
                            size: l ? 'sm' : 'md',
                            variant: 'text',
                            children: 'View all '
                              .concat(n.length || 0, ' liked movie')
                              .concat(n && (0 === n.length || n.length > 1 ? 's' : ''))
                          })
                        })
                      : void 0,
                  isLoading: !1,
                  children: Object(he.jsx)(he.Fragment, {
                    children: n.map(function (e, t) {
                      return t < 20
                        ? Object(he.jsx)(
                            vi,
                            {
                              width: ['185px', '205px', '230px'],
                              mediaItem: e ? Object(b.a)({}, e) : void 0,
                              mediaType: 'movie',
                              image: {
                                alt: ''.concat((null === e || void 0 === e ? void 0 : e.title) || '', ' movie poster'),
                                src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                                size: { thumbnail: 'w92', full: 'original' }
                              },
                              rating: {
                                rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                                count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                              },
                              title: (null === e || void 0 === e ? void 0 : e.title) || '',
                              subtitle: ''.concat(
                                [
                                  ''.concat(Ft((null === e || void 0 === e ? void 0 : e.release_date) || '', 'year')) ||
                                    'N/A',
                                  ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'movie'))
                                ]
                                  .filter(function (e) {
                                    return e;
                                  })
                                  .join(' \u2022 ')
                              ),
                              isLoading: !1
                            },
                            e.id
                          )
                        : null;
                    })
                  })
                })
              }),
              Object(he.jsx)(Be.a, {
                in: (a && a.length > 0) || !1,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(di, {
                  title: u('TV shows', a.length),
                  footer:
                    a.length > 20
                      ? Object(he.jsx)(pe, {
                          to: { pathname: '/liked/tv' },
                          isFullWidth: !0,
                          children: Object(he.jsx)(bn, {
                            color: Wt(d),
                            isFullWidth: !0,
                            size: l ? 'sm' : 'md',
                            variant: 'text',
                            children: 'View all '
                              .concat((null === a || void 0 === a ? void 0 : a.length) || 0, ' liked TV show')
                              .concat(a && (0 === a.length || a.length > 1 ? 's' : ''))
                          })
                        })
                      : void 0,
                  isLoading: !1,
                  children: Object(he.jsx)(he.Fragment, {
                    children: a.map(function (e, t) {
                      return t < 20
                        ? Object(he.jsx)(
                            vi,
                            {
                              width: ['185px', '205px', '230px'],
                              mediaItem: e ? Object(b.a)({}, e) : void 0,
                              mediaType: 'tv',
                              image: {
                                alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' tv show poster'),
                                src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                                size: { thumbnail: 'w92', full: 'original' }
                              },
                              rating: {
                                rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                                count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                              },
                              title: (null === e || void 0 === e ? void 0 : e.name) || '',
                              subtitle: ''.concat(
                                [
                                  ''.concat(
                                    Ft((null === e || void 0 === e ? void 0 : e.first_air_date) || '', 'year')
                                  ) || 'N/A',
                                  ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'tv'))
                                ]
                                  .filter(function (e) {
                                    return e;
                                  })
                                  .join(' \u2022 ')
                              ),
                              isLoading: !1
                            },
                            e.id
                          )
                        : null;
                    })
                  })
                })
              }),
              Object(he.jsx)(Be.a, {
                in: (r && r.length > 0) || !1,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(di, {
                  title: u('People', r.length),
                  footer:
                    r.length > 20
                      ? Object(he.jsx)(pe, {
                          to: { pathname: '/liked/person' },
                          isFullWidth: !0,
                          children: Object(he.jsx)(bn, {
                            color: Wt(d),
                            isFullWidth: !0,
                            size: l ? 'sm' : 'md',
                            variant: 'text',
                            children: 'View all '
                              .concat(r.length || 0, ' liked ')
                              .concat((r && 0 === r.length) || r.length > 1 ? 'people' : 'person')
                          })
                        })
                      : void 0,
                  isLoading: !1,
                  children: Object(he.jsx)(he.Fragment, {
                    children: r.map(function (e, t) {
                      var n;
                      return t < 20
                        ? Object(he.jsx)(
                            vi,
                            {
                              width: ['185px', '205px', '230px'],
                              mediaItem: e ? Object(b.a)({}, e) : void 0,
                              mediaType: 'person',
                              image: {
                                alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                                src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                                size: { thumbnail: 'w45', full: 'original' }
                              },
                              title: (null === e || void 0 === e ? void 0 : e.name) || '',
                              subtitle:
                                (null ===
                                  (n = Pi.find(function (t) {
                                    return t.value === (null === e || void 0 === e ? void 0 : e.known_for_department);
                                  })) || void 0 === n
                                  ? void 0
                                  : n.name) ||
                                (null === e || void 0 === e ? void 0 : e.known_for_department) ||
                                'N/A',
                              isLoading: !1
                            },
                            e.id
                          )
                        : null;
                    })
                  })
                })
              })
            ]
          });
        },
        Hr = function () {
          var e = Object(J.c)().colorMode,
            t = Object(fe.a)(),
            n = t.isOpen,
            a = t.onOpen,
            i = t.onClose,
            r = Object(O.a)('(max-width: 600px)'),
            c = Object(p.a)(r, 1)[0],
            s = Object(ge.f)(),
            l = Object(ge.h)().mediaType,
            d = w(function (e) {
              return e.user.data.liked;
            }),
            u = w(function (e) {
              return e.app.data.sortDirection;
            }),
            b = w(function (e) {
              return e.user.ui.theme.color;
            }),
            g = Object(o.useState)(null),
            j = Object(p.a)(g, 2),
            h = j[0],
            v = j[1],
            m = Object(o.useState)(Object(In.a)(d.movies)),
            x = Object(p.a)(m, 2),
            y = x[0],
            A = x[1],
            k = Object(o.useState)(Object(In.a)(d.tv)),
            C = Object(p.a)(k, 2),
            S = C[0],
            D = C[1],
            E = Object(o.useState)(Object(In.a)(d.people)),
            L = Object(p.a)(E, 2),
            _ = L[0],
            B = L[1];
          return (
            Object(o.useEffect)(
              function () {
                if (l)
                  switch (l) {
                    case 'person':
                      v('person');
                      break;
                    case 'tv':
                      v('tv');
                      break;
                    case 'movie':
                      v('movie');
                  }
                else v(null);
              },
              [s.location.pathname]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: Object(he.jsx)(ke.a, {
                    children: Object(he.jsxs)(U.a, {
                      align: 'left',
                      color: 'light' === e ? 'gray.900' : 'gray.50',
                      fontSize: ['2xl', '2xl', '3xl', '3xl', '3xl', '3xl'],
                      fontWeight: 'bold',
                      children: [
                        'movie' === h ? 'Movies' : 'tv' === h ? 'TV shows' : 'person' === h ? 'People' : 'Liked',
                        Object(he.jsx)(yo, {
                          label: String(
                            'movie' === h
                              ? y.length
                              : 'tv' === h
                              ? S.length
                              : 'person' === h
                              ? _.length
                              : y.length + S.length + _.length
                          ),
                          color: h ? Wt(b) : 'gray',
                          size: 'lg',
                          ml: 2
                        })
                      ]
                    })
                  }),
                  breadcrumbs: (function () {
                    var e = [kr, _r];
                    switch (h) {
                      case 'person':
                        e.push({ label: 'People', to: { pathname: '/liked/person' } });
                        break;
                      case 'tv':
                        e.push({ label: 'TV Shows', to: { pathname: '/liked/tv' } });
                        break;
                      case 'movie':
                        e.push({ label: 'Movies', to: { pathname: '/liked/movie' } });
                    }
                    return e;
                  })(),
                  children: {
                    actions: Object(he.jsx)(_e.a, {
                      in: !!h,
                      unmountOnExit: !0,
                      style: { width: c ? '100%' : 'auto' },
                      children: Object(he.jsxs)(Z.a, {
                        width: c ? '100%' : 'auto',
                        spacing: 2,
                        children: [
                          Object(he.jsx)(_e.a, {
                            in: (function () {
                              switch (h) {
                                case 'movie':
                                  return (S && S.length > 0) || (_ && _.length > 0);
                                case 'tv':
                                  return (y && y.length > 0) || (_ && _.length > 0);
                                case 'person':
                                  return (y && y.length > 0) || (S && S.length > 0);
                                default:
                                  return !1;
                              }
                            })(),
                            unmountOnExit: !0,
                            style: { width: c ? '100%' : 'auto' },
                            children: Object(he.jsx)(bn, {
                              onClick: function () {
                                return a();
                              },
                              isFullWidth: c,
                              variant: 'outlined',
                              children: 'Change media type'
                            })
                          }),
                          h
                            ? Object(he.jsx)(Or, {
                                mediaType: h,
                                isLikedLists: !0,
                                onFilter: function (e, t, n) {
                                  switch (h) {
                                    case 'movie':
                                      !(function (e, t) {
                                        var n,
                                          o = Object(In.a)(d.movies);
                                        t &&
                                          t.length > 0 &&
                                          (o = o.filter(function (e) {
                                            return t.some(function (t) {
                                              return e.genre_ids.includes(t.id);
                                            });
                                          })),
                                          e &&
                                            e.find(function (e) {
                                              return e.isActive;
                                            }) &&
                                            (o = ua()(
                                              o,
                                              null ===
                                                (n = e.find(function (e) {
                                                  return e.isActive;
                                                })) || void 0 === n
                                                ? void 0
                                                : n.value,
                                              { reverse: 'desc' === u }
                                            )),
                                          A(Object(In.a)(o));
                                      })(e, t);
                                      break;
                                    case 'tv':
                                      !(function (e, t) {
                                        var n,
                                          o = Object(In.a)(d.tv);
                                        t &&
                                          t.length > 0 &&
                                          (o = o.filter(function (e) {
                                            return t.some(function (t) {
                                              return e.genre_ids.includes(t.id);
                                            });
                                          })),
                                          e &&
                                            e.find(function (e) {
                                              return e.isActive;
                                            }) &&
                                            (o = ua()(
                                              o,
                                              null ===
                                                (n = e.find(function (e) {
                                                  return e.isActive;
                                                })) || void 0 === n
                                                ? void 0
                                                : n.value,
                                              { reverse: 'desc' === u }
                                            )),
                                          D(Object(In.a)(o));
                                      })(e, t);
                                      break;
                                    case 'person':
                                      !(function (e, t) {
                                        var n,
                                          o = Object(In.a)(d.people);
                                        t &&
                                          t.length > 0 &&
                                          (o = o.filter(function (e) {
                                            return t.some(function (t) {
                                              return e.known_for_department === t.value;
                                            });
                                          })),
                                          e &&
                                            e.find(function (e) {
                                              return e.isActive;
                                            }) &&
                                            (o = ua()(
                                              o,
                                              null ===
                                                (n = e.find(function (e) {
                                                  return e.isActive;
                                                })) || void 0 === n
                                                ? void 0
                                                : n.value,
                                              { reverse: 'desc' === u }
                                            )),
                                          B(Object(In.a)(o));
                                      })(e, n);
                                  }
                                }
                              })
                            : null
                        ]
                      })
                    }),
                    body: Object(he.jsx)(mr, {
                      children:
                        (y && y.length > 0) || (S && S.length > 0) || (_ && _.length > 0)
                          ? 'movie' === h
                            ? Object(he.jsx)(Wr, { isError: !1, isSuccess: !0, isLoading: !1, movies: y })
                            : 'tv' === h
                            ? Object(he.jsx)(Gr, { isError: !1, isSuccess: !0, isLoading: !1, tv: S })
                            : 'person' === h
                            ? Object(he.jsx)(Rr, { isError: !1, isSuccess: !0, isLoading: !1, people: _ })
                            : Object(he.jsx)(Vr, { movies: y, tv: S, people: _ })
                          : Object(he.jsx)(f.a, {
                              width: '100%',
                              px: 2,
                              pt: 2,
                              children: Object(he.jsx)(bo, {
                                label: 'You have no liked items!',
                                variant: 'outlined',
                                size: 'xl'
                              })
                            })
                    })
                  }
                }),
                Object(he.jsx)(wr, {
                  mediaTypes: (function () {
                    var e = [];
                    return (
                      y && y.length > 0 && e.push('movie'),
                      S && S.length > 0 && e.push('tv'),
                      _ && _.length > 0 && e.push('person'),
                      e
                    );
                  })(),
                  mediaType: h,
                  isOpen: n,
                  onClose: i,
                  onSetType: function (e) {
                    return s.push({ pathname: ''.concat('/liked' === s.location.pathname ? '/liked/' : '').concat(e) });
                  }
                })
              ]
            })
          );
        },
        Jr = n(566),
        Zr = n(262),
        Ur = n.n(Zr),
        qr = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.mediaType,
            a = e.lists,
            i = e.list,
            r = e.movies,
            c = e.tv,
            s = e.onFilter,
            l = e.onMediaTypePickerOpen,
            d = e.onListPickerOpen,
            u = e.onListInfoOpen,
            b = e.onCreateListOpen;
          return o || (i && a.length > 0)
            ? n
              ? Object(he.jsx)(eo.a, {
                  in: !!o || (!!i && a.length > 1),
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 2,
                    children: [
                      o
                        ? Object(he.jsxs)(Z.a, {
                            width: '100%',
                            spacing: 2,
                            children: [
                              r.length > 0 && c.length > 0
                                ? Object(he.jsx)(bn, {
                                    onClick: function () {
                                      return l();
                                    },
                                    isFullWidth: !0,
                                    variant: 'outlined',
                                    children: 'Change media-type'
                                  })
                                : null,
                              o ? Object(he.jsx)(Or, { mediaType: o, isLikedLists: !0, onFilter: s }) : null
                            ]
                          })
                        : null,
                      i && a.length > 1
                        ? Object(he.jsx)(bn, {
                            onClick: function () {
                              return d();
                            },
                            isFullWidth: !0,
                            variant: 'outlined',
                            children: 'Change list'
                          })
                        : null
                    ]
                  })
                })
              : Object(he.jsxs)(Z.a, {
                  spacing: 2,
                  children: [
                    Object(he.jsx)(_e.a, {
                      in: !!o,
                      unmountOnExit: !0,
                      children: Object(he.jsxs)(Z.a, {
                        spacing: 2,
                        children: [
                          r.length > 0 && c.length > 0
                            ? Object(he.jsx)(bn, {
                                onClick: function () {
                                  return l();
                                },
                                variant: 'outlined',
                                children: 'Change media-type'
                              })
                            : null,
                          o ? Object(he.jsx)(Or, { mediaType: o, isLikedLists: !0, onFilter: s }) : null
                        ]
                      })
                    }),
                    Object(he.jsx)(_e.a, {
                      in: !!i && a.length > 1,
                      unmountOnExit: !0,
                      children: Object(he.jsx)(bn, {
                        onClick: function () {
                          return d();
                        },
                        variant: 'outlined',
                        children: 'Change list'
                      })
                    }),
                    Object(he.jsx)(_e.a, {
                      in: !!i,
                      unmountOnExit: !0,
                      children: Object(he.jsx)(Ee, {
                        'aria-label': 'Open Information modal',
                        'icon': Ur.a,
                        'onClick': function () {
                          return u();
                        },
                        'variant': 'outlined'
                      })
                    })
                  ]
                })
            : Object(he.jsx)(bn, {
                onClick: function () {
                  return b();
                },
                isFullWidth: n,
                variant: 'outlined',
                children: 'Create new list'
              });
        },
        Xr = function (e) {
          var t = e.list,
            n = e.movies,
            o = void 0 === n ? [] : n,
            a = e.tv,
            i = void 0 === a ? [] : a,
            r = Object(J.c)().colorMode,
            c = Object(O.a)('(max-width: 600px)'),
            s = Object(p.a)(c, 1)[0],
            l = w(function (e) {
              return e.user.ui.theme.color;
            }),
            d = function (e, t) {
              return Object(he.jsxs)(ke.a, {
                children: [
                  Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === r ? 'gray.900' : 'gray.50',
                    fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
                    fontWeight: 'semibold',
                    textTransform: 'capitalize',
                    children: e
                  }),
                  Object(he.jsx)(yo, { label: String(t), color: 'gray', size: 'lg', ml: 2 })
                ]
              });
            };
          return Object(he.jsx)(eo.a, {
            in: (o && o.length > 0) || (i && i.length > 0) || !1,
            unmountOnExit: !0,
            style: { width: '100%' },
            children: Object(he.jsxs)(Z.c, {
              width: '100%',
              spacing: 6,
              children: [
                Object(he.jsx)(Be.a, {
                  in: (o && o.length > 0) || !1,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsx)(di, {
                    title: d('Movies', o.length),
                    footer:
                      o.length > 20
                        ? Object(he.jsx)(pe, {
                            to: { pathname: '/lists/'.concat(t.id, '/movie') },
                            isFullWidth: !0,
                            children: Object(he.jsx)(bn, {
                              color: Wt(l),
                              isFullWidth: !0,
                              size: s ? 'sm' : 'md',
                              variant: 'text',
                              children: 'View all '
                                .concat(o.length || 0, ' movie')
                                .concat(o && (0 === o.length || o.length > 1 ? 's' : ''))
                            })
                          })
                        : void 0,
                    isLoading: !1,
                    children: Object(he.jsx)(he.Fragment, {
                      children: o.map(function (e, t) {
                        return t < 20
                          ? Object(he.jsx)(
                              vi,
                              {
                                width: ['185px', '205px', '230px'],
                                mediaItem: e ? Object(b.a)({}, e) : void 0,
                                mediaType: 'movie',
                                image: {
                                  alt: ''.concat(
                                    (null === e || void 0 === e ? void 0 : e.title) || '',
                                    ' movie poster'
                                  ),
                                  src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                                  size: { thumbnail: 'w92', full: 'original' }
                                },
                                rating: {
                                  rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                                  count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                                },
                                title: (null === e || void 0 === e ? void 0 : e.title) || '',
                                subtitle: ''.concat(
                                  [
                                    ''.concat(
                                      Ft((null === e || void 0 === e ? void 0 : e.release_date) || '', 'year'),
                                      ' '
                                    ) || !1,
                                    ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'movie'))
                                  ]
                                    .filter(function (e) {
                                      return e;
                                    })
                                    .join(' \u2022 ')
                                ),
                                isLoading: !1
                              },
                              e.id
                            )
                          : null;
                      })
                    })
                  })
                }),
                Object(he.jsx)(Be.a, {
                  in: (i && i.length > 0) || !1,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsx)(di, {
                    title: d('TV shows', i.length),
                    footer:
                      i.length > 20
                        ? Object(he.jsx)(pe, {
                            to: { pathname: '/lists/'.concat(t.id, '/tv') },
                            isFullWidth: !0,
                            children: Object(he.jsx)(bn, {
                              color: Wt(l),
                              isFullWidth: !0,
                              size: s ? 'sm' : 'md',
                              variant: 'text',
                              children: 'View all '
                                .concat((null === i || void 0 === i ? void 0 : i.length) || 0, ' TV show')
                                .concat(i && (0 === i.length || i.length > 1 ? 's' : ''))
                            })
                          })
                        : void 0,
                    isLoading: !1,
                    children: Object(he.jsx)(he.Fragment, {
                      children: i.map(function (e, t) {
                        return t < 20
                          ? Object(he.jsx)(
                              vi,
                              {
                                width: ['185px', '205px', '230px'],
                                mediaItem: e ? Object(b.a)({}, e) : void 0,
                                mediaType: 'tv',
                                image: {
                                  alt: ''.concat(
                                    (null === e || void 0 === e ? void 0 : e.name) || '',
                                    ' tv show poster'
                                  ),
                                  src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                                  size: { thumbnail: 'w92', full: 'original' }
                                },
                                rating: {
                                  rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                                  count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                                },
                                title: (null === e || void 0 === e ? void 0 : e.name) || '',
                                subtitle: ''.concat(
                                  [
                                    ''.concat(
                                      Ft((null === e || void 0 === e ? void 0 : e.first_air_date) || '', 'year')
                                    ) || 'N/A',
                                    ''.concat(zt((null === e || void 0 === e ? void 0 : e.genre_ids) || [], 'tv'))
                                  ]
                                    .filter(function (e) {
                                      return e;
                                    })
                                    .join(' \u2022 ')
                                ),
                                isLoading: !1
                              },
                              e.id
                            )
                          : null;
                      })
                    })
                  })
                })
              ]
            })
          });
        },
        Kr = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = Object(r.b)(),
            a = w(function (e) {
              return e.user.data.lists;
            }),
            i = e.id,
            c = e.label,
            s = e.isOpen,
            l = e.onClose,
            d = e.onCloseToast;
          return Object(he.jsx)(Pn, {
            renderButton: Object(he.jsx)(bn, {
              color: 'red',
              onClick: function () {
                return (
                  o(
                    it(
                      a.filter(function (e) {
                        return e.id !== i;
                      })
                    )
                  ),
                  l(),
                  void d()
                );
              },
              size: 'sm',
              children: 'Delete'
            }),
            title: n ? 'Delete' : 'Delete '.concat(c ? '"'.concat(c, '"') : '', ' list'),
            description: 'Are you sure you want to delete the '.concat(
              c ? '"'.concat(c, '"') : '',
              ' list? You will not be able to retrieve this list back!'
            ),
            isOpen: s,
            onClose: l
          });
        },
        $r = { label: '', description: '' },
        ec = Rn.b().shape({ label: Rn.c().required().label('Label'), description: Rn.c().label('Description') }),
        tc = function (e) {
          var t = e.list,
            n = e.isOpen,
            a = e.onClose,
            i = Object(fe.a)(),
            c = i.isOpen,
            s = i.onOpen,
            l = i.onClose,
            d = Object(r.b)(),
            u = w(function (e) {
              return e.user.data.lists;
            }),
            g = w(function (e) {
              return e.user.ui.theme.color;
            }),
            j = Object(On.e)({ defaultValues: $r, reValidateMode: 'onSubmit', resolver: Object(Wn.a)(ec) }),
            h = Object(On.f)({ control: j.control }).isDirty;
          return (
            Object(o.useEffect)(
              function () {
                n && t && j.reset({ label: t.label, description: t.description });
              },
              [n]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(pn, {
                  title: 'Edit '.concat(
                    (null === t || void 0 === t ? void 0 : t.label) ? '"'.concat(t.label, '"') : '',
                    ' List'
                  ),
                  actions: Object(he.jsx)(bn, {
                    color: Wt(g),
                    isDisabled: !h,
                    onClick: j.handleSubmit(function (e) {
                      return (function (e) {
                        t &&
                          (d(
                            it(
                              u.map(function (n) {
                                return n.id === t.id
                                  ? Object(b.a)(
                                      Object(b.a)({}, t),
                                      {},
                                      {
                                        label: e.label,
                                        description: (null === e || void 0 === e ? void 0 : e.description) || '',
                                        date: K()(new Date()).toISOString(),
                                        results: Object(b.a)({}, t.results)
                                      }
                                    )
                                  : Object(b.a)({}, n);
                              })
                            )
                          ),
                          a());
                      })(e);
                    }),
                    size: 'sm',
                    children: 'Save List'
                  }),
                  isOpen: n,
                  onClose: function () {
                    h ? s() : a();
                  },
                  isCentered: !0,
                  size: 'lg',
                  children: Object(he.jsxs)(Z.c, {
                    spacing: 3,
                    p: 2,
                    children: [
                      Object(he.jsx)(On.a, {
                        control: j.control,
                        name: 'label',
                        render: function (e) {
                          var t = e.field,
                            n = t.onChange,
                            o = t.value,
                            a = t.name,
                            i = e.fieldState.error;
                          return Object(he.jsxs)(Fn.a, {
                            id: a,
                            isRequired: !0,
                            children: [
                              Object(he.jsx)(Qn.a, { fontSize: 'sm', mb: 1, children: 'Label' }),
                              Object(he.jsx)(Nn.a, {
                                autoComplete: 'off',
                                border: 'solid2',
                                errorBorderColor: 'red.400',
                                focusBorderColor: ''.concat(Wt(g), '.400'),
                                isInvalid: Boolean(i),
                                fontSize: 'md',
                                name: a,
                                placeholder: 'Try "DC Movies"',
                                onChange: n,
                                size: 'lg',
                                value: o,
                                px: 2,
                                _focus: { boxShadow: 'none' }
                              }),
                              Object(he.jsx)(Be.a, {
                                in: Boolean(i),
                                unmountOnExit: !0,
                                children: Object(he.jsx)(Fn.b, {
                                  mt: 1,
                                  children: null === i || void 0 === i ? void 0 : i.message
                                })
                              })
                            ]
                          });
                        }
                      }),
                      Object(he.jsx)(On.a, {
                        control: j.control,
                        name: 'description',
                        render: function (e) {
                          var t = e.field,
                            n = t.onChange,
                            o = t.value,
                            a = t.name,
                            i = e.fieldState.error;
                          return Object(he.jsxs)(Fn.a, {
                            id: a,
                            children: [
                              Object(he.jsx)(Qn.a, { fontSize: 'sm', mb: 1, children: 'Description (Optional)' }),
                              Object(he.jsx)(Yn.a, {
                                autoComplete: 'off',
                                border: 'solid2',
                                errorBorderColor: 'red.400',
                                focusBorderColor: ''.concat(Wt(g), '.400'),
                                name: a,
                                isInvalid: Boolean(i),
                                fontSize: 'md',
                                onChange: n,
                                size: 'lg',
                                value: o,
                                px: 2,
                                _focus: { boxShadow: 'none' }
                              }),
                              Object(he.jsx)(Be.a, {
                                in: Boolean(i),
                                unmountOnExit: !0,
                                children: Object(he.jsx)(Fn.b, {
                                  mt: 1,
                                  children: null === i || void 0 === i ? void 0 : i.message
                                })
                              })
                            ]
                          });
                        }
                      })
                    ]
                  })
                }),
                Object(he.jsx)(Pn, {
                  renderButton: Object(he.jsx)(bn, {
                    color: Wt(g),
                    onClick: function () {
                      return l(), void a();
                    },
                    size: 'sm',
                    children: 'Close'
                  }),
                  title: 'Unsaved data!',
                  description:
                    'Are you sure you want to close the modal, the data inserted will be lost unless you save it!',
                  isOpen: c,
                  onClose: l
                })
              ]
            })
          );
        },
        nc = function (e) {
          var t = Object(ge.f)(),
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = e.id,
            a = e.label,
            i = e.mediaTypeLabel;
          return Object(he.jsx)(f.a, {
            width: '100%',
            px: 2,
            pt: 2,
            children: Object(he.jsx)(bo, {
              button: Object(he.jsxs)(Z.a, {
                spacing: 1,
                children: [
                  i
                    ? Object(he.jsxs)(he.Fragment, {
                        children: [
                          Object(he.jsx)(bn, {
                            color: Wt(n),
                            onClick: function () {
                              return t.push({ pathname: '/lists/'.concat(o) });
                            },
                            size: 'sm',
                            variant: 'outlined',
                            children: 'Back to "'.concat(a, '" list')
                          }),
                          Object(he.jsx)(U.a, { align: 'center', fontSize: 'xs', fontWeight: 'medium', children: 'OR' })
                        ]
                      })
                    : null,
                  Object(he.jsx)(bn, {
                    color: Wt(n),
                    onClick: function () {
                      return t.push({ pathname: '/lists' });
                    },
                    size: 'sm',
                    variant: 'outlined',
                    children: 'Back to lists'
                  })
                ]
              }),
              label: i
                ? 'No '.concat(i, ' found in "').concat(a, '" list!')
                : 'You have no items in "'.concat(a, '" list!'),
              variant: 'outlined'
            })
          });
        },
        oc = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.totalMovies,
            o = e.totalTvs,
            a = [
              { label: 'Total', number: n + o },
              { label: 'Movies', number: n },
              { label: 'TV Shows', number: o }
            ];
          return Object(he.jsx)(Ai.b, {
            width: '100%',
            border: 'solid2',
            borderColor: 'light' === t ? 'gray.200' : 'gray.700',
            borderRadius: 'base',
            p: 1,
            children: Object(he.jsx)(Z.a, {
              width: '100%',
              justifyContent: 'space-between',
              divider: Object(he.jsx)(f.a, {
                width: '2px',
                height: '44px',
                backgroundColor: 'light' === t ? 'gray.200' : 'gray.700'
              }),
              spacing: 1,
              children: a.map(function (e, n) {
                return Object(he.jsx)(
                  Ai.a,
                  {
                    justifyContent: 'center',
                    children: Object(he.jsxs)(Z.c, {
                      spacing: 0,
                      children: [
                        Object(he.jsx)(Ai.d, {
                          color: 'light' === t ? 'gray.900' : 'gray.50',
                          fontSize: '2xl',
                          lineHeight: 'normal',
                          children: e.number
                        }),
                        Object(he.jsx)(Ai.c, {
                          color: 'light' === t ? 'gray.400' : 'gray.500',
                          fontSize: 'xs',
                          whiteSpace: 'nowrap',
                          textTransform: 'uppercase',
                          children: e.label
                        })
                      ]
                    })
                  },
                  n
                );
              })
            })
          });
        },
        ac = function (e) {
          var t = e.list,
            n = e.isOpen,
            o = e.onClose,
            a = Object(J.c)().colorMode;
          return Object(he.jsx)(pn, {
            title: Object(he.jsxs)(Z.c, {
              alignItems: 'flex-start',
              spacing: 0,
              children: [
                Object(he.jsx)(U.a, {
                  fontSize: 'md',
                  fontWeight: 'semibold',
                  color: 'light' === a ? 'gray.900' : 'gray.50',
                  children: ''.concat(
                    (null === t || void 0 === t ? void 0 : t.label) ? '"'.concat(t.label, '"') : '',
                    ' List'
                  )
                }),
                Object(he.jsx)(U.a, {
                  align: 'left',
                  color: 'light' === a ? 'gray.400' : 'gray.500',
                  fontSize: 'xs',
                  fontWeight: 'normal',
                  children: ''
                    .concat(
                      (t
                        ? (null === t || void 0 === t ? void 0 : t.results.movies.length) +
                          (null === t || void 0 === t ? void 0 : t.results.tv.length)
                        : 0) > 0
                        ? 'Updated'
                        : 'Created',
                      ' '
                    )
                    .concat(
                      K()(null === t || void 0 === t ? void 0 : t.date).isSame(K()(), 'day')
                        ? K()(null === t || void 0 === t ? void 0 : t.date).fromNow()
                        : K()(null === t || void 0 === t ? void 0 : t.date).format('LL')
                    )
                })
              ]
            }),
            isOpen: n,
            onClose: o,
            isCentered: !0,
            size: 'md',
            children: Object(he.jsxs)(Z.c, {
              width: '100%',
              spacing: 2,
              p: 2,
              children: [
                (null === t || void 0 === t ? void 0 : t.description)
                  ? Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === a ? 'gray.900' : 'gray.50',
                      fontSize: 'lg',
                      fontWeight: 'normal',
                      children: t.description
                    })
                  : null,
                Object(he.jsx)(oc, {
                  totalMovies: (null === t || void 0 === t ? void 0 : t.results.movies.length) || 0,
                  totalTvs: (null === t || void 0 === t ? void 0 : t.results.tv.length) || 0
                })
              ]
            })
          });
        },
        ic = n(573),
        rc = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = (function (e, t) {
              var n = t.color,
                o = void 0 === n ? 'gray' : n,
                a = t.isChecked,
                i = void 0 !== a && a,
                r = t.isDisabled;
              return {
                radio: {
                  'opacity': void 0 !== r && r ? 0.5 : 1,
                  'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                  '&:focus': { boxShadow: 'none !important' },
                  '&.chakra-radio__control': {
                    width: e.space[3],
                    height: e.space[3],
                    boxShadow: 'none !important',
                    background: i ? ''.concat(o, '.400') : 'transparent',
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  '& svg': {
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  }
                },
                light: {
                  '&.chakra-radio__control': {
                    background: i ? ''.concat(o, '.400') : 'transparent',
                    borderColor: i ? ''.concat(o, '.400') : 'gray.400',
                    color: i ? 'gray.50' : 'transparent'
                  },
                  '&:hover': {
                    '&.chakra-radio__control': {
                      background: i ? ''.concat(o, '.500') : 'transparent',
                      borderColor: i ? ''.concat(o, '.500') : 'gray.500',
                      color: i ? 'gray.50' : 'transparent'
                    }
                  }
                },
                dark: {
                  '&.chakra-radio__control': {
                    background: i ? ''.concat(o, '.500') : 'transparent',
                    borderColor: i ? ''.concat(o, '.500') : 'gray.500',
                    color: i ? 'gray.900' : 'transparent'
                  },
                  '&:hover': {
                    '&.chakra-radio__control': {
                      background: i ? ''.concat(o, '.400') : 'transparent',
                      borderColor: i ? ''.concat(o, '.400') : 'gray.400',
                      color: i ? 'gray.900' : 'transparent'
                    }
                  }
                }
              };
            })(t, e),
            a = e.colorMode,
            i = Object(je.a)(e, ['colorMode']),
            r = a || n;
          return Object(he.jsx)(
            ic.a,
            Object(b.a)(Object(b.a)({}, i), {}, { sx: Object(b.a)({}, D.a.merge(o.radio, o[r])) })
          );
        },
        cc = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(v.e)(),
            a = Object(J.c)().colorMode,
            i = Object(ge.g)(),
            r = Object(hn.a)(t).width,
            c = e.id,
            s = e.label,
            l = e.results,
            d = e.isActive,
            u = void 0 !== d && d,
            b = e.isSelectable,
            g = void 0 !== b && b,
            j = e.isSelected,
            h = void 0 !== j && j,
            O = e.onSelected,
            m = e.onClose,
            x = w(function (e) {
              return e.user.ui.theme.color;
            }),
            y = Object(Le.a)(),
            A = Object(p.a)(y, 2),
            k = A[0],
            C = A[1],
            S = l.movies.length,
            D = l.tv.length;
          return Object(he.jsx)(pe, {
            isFullWidth: !0,
            isDisabled: k,
            to: { pathname: '/lists/'.concat(c) },
            children: Object(he.jsx)(kn, {
              height: ''.concat(r, 'px'),
              color: i.pathname.includes(c) || h ? Wt(x) : 'gray',
              isFullWidth: !0,
              isClickable: !k,
              onClick: m
                ? function () {
                    return m();
                  }
                : void 0,
              children: Object(he.jsxs)(Z.c, {
                position: 'relative',
                width: '100%',
                spacing: 0,
                px: 2,
                py: 6,
                children: [
                  g && O
                    ? Object(he.jsx)(f.a, {
                        position: 'absolute',
                        top: n.space[2],
                        left: n.space[2],
                        children: Object(he.jsx)(rc, {
                          color: Wt(x),
                          isChecked: h,
                          onMouseEnter: function () {
                            return C.on();
                          },
                          onMouseLeave: function () {
                            return C.off();
                          },
                          onClick: function () {
                            return O(c);
                          }
                        })
                      })
                    : null,
                  Object(he.jsx)(U.a, {
                    align: 'center',
                    color: u || h ? ''.concat(Wt(x), '.400') : 'light' === a ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    fontWeight: 'semibold',
                    textTransform: 'capitalize',
                    sx: {
                      transition: ''.concat(n.transition.duration.faster, ' ').concat(n.transition.easing['ease-out'])
                    },
                    children: s
                  }),
                  Object(he.jsx)(U.a, {
                    align: 'center',
                    color: u || h ? ''.concat(Wt(x), '.400') : 'light' === a ? 'gray.400' : 'gray.500',
                    fontSize: 'xs',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                    sx: {
                      transition: ''.concat(n.transition.duration.faster, ' ').concat(n.transition.easing['ease-out'])
                    },
                    children: ''.concat(
                      [
                        ''.concat(S, ' movie').concat(0 === S || S > 1 ? 's' : ''),
                        ''.concat(D, ' TV show').concat(0 === D || D > 1 ? 's' : '')
                      ]
                        .filter(function (e) {
                          return e;
                        })
                        .join(' \u2022 ')
                    )
                  })
                ]
              })
            })
          });
        },
        sc = function (e) {
          var t = e.activeList,
            n = e.isOpen,
            o = e.onClose,
            a = w(function (e) {
              return e.user.data.lists;
            });
          return Object(he.jsx)(pn, {
            title: 'Select list',
            isOpen: n,
            onClose: o,
            isCentered: !0,
            size: '2xl',
            children: Object(he.jsx)(f.a, {
              width: '100%',
              height: '100%',
              p: 3,
              children: Object(he.jsx)(En.a, {
                width: '100%',
                columns: [1, 2, 3, 3, 3],
                spacing: 2,
                children: a.map(function (e) {
                  return Object(he.jsx)(
                    cc,
                    Object(b.a)(
                      Object(b.a)({}, e),
                      {},
                      { isActive: e.id === (null === t || void 0 === t ? void 0 : t.id) || !1, onClose: o }
                    ),
                    e.id
                  );
                })
              })
            })
          });
        },
        lc = n(549),
        dc = n(550),
        uc = n(551),
        bc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = jt.getState().user.ui.theme.color,
            i = e.selected,
            r = e.onInfo,
            c = e.onEdit,
            s = e.onDelete,
            l = e.onClose;
          return Object(he.jsxs)(Z.a, {
            backgroundColor: 'light' === t ? 'gray.700' : 'gray.200',
            borderRadius: 'full',
            boxShadow: 'lg',
            spacing: 2,
            px: 2,
            py: 1.5,
            mb: 1.5,
            children: [
              Object(he.jsx)(Z.a, {
                spacing: 0.25,
                children: Object(he.jsx)(U.a, {
                  align: 'left',
                  color: 'light' === t ? 'gray.50' : 'gray.900',
                  fontSize: o ? 'sm' : 'md',
                  fontWeight: 'normal',
                  whiteSpace: 'nowrap',
                  children: '"'.concat(i.label, '" list')
                })
              }),
              Object(he.jsxs)(Z.a, {
                spacing: 1,
                children: [
                  o
                    ? Object(he.jsx)(Ee, {
                        'aria-label': 'Information related to selected list',
                        'color': Wt(a),
                        'colorMode': 'light' === t ? 'dark' : 'light',
                        'icon': lc.a,
                        'onClick': function () {
                          return r();
                        },
                        'size': 'sm'
                      })
                    : Object(he.jsx)(bn, {
                        color: Wt(a),
                        colorMode: 'light' === t ? 'dark' : 'light',
                        leftIcon: lc.a,
                        onClick: function () {
                          return r();
                        },
                        children: 'Info'
                      }),
                  o
                    ? Object(he.jsx)(Ee, {
                        'aria-label': 'Edit selected list',
                        'colorMode': 'light' === t ? 'dark' : 'light',
                        'icon': dc.a,
                        'onClick': function () {
                          return c();
                        },
                        'size': 'sm'
                      })
                    : Object(he.jsx)(bn, {
                        colorMode: 'light' === t ? 'dark' : 'light',
                        leftIcon: dc.a,
                        onClick: function () {
                          return c();
                        },
                        children: 'Edit'
                      }),
                  o
                    ? Object(he.jsx)(Ee, {
                        'aria-label': 'Delete selected list',
                        'color': 'red',
                        'colorMode': 'light' === t ? 'dark' : 'light',
                        'icon': uc.a,
                        'onClick': function () {
                          return s();
                        },
                        'size': 'sm'
                      })
                    : Object(he.jsx)(bn, {
                        color: 'red',
                        colorMode: 'light' === t ? 'dark' : 'light',
                        leftIcon: uc.a,
                        onClick: function () {
                          return s();
                        },
                        children: 'Delete'
                      })
                ]
              }),
              Object(he.jsx)(Ee, {
                'aria-label': 'Close',
                'colorMode': 'light' === t ? 'dark' : 'light',
                'icon': Ae.a,
                'onClick': function () {
                  return l();
                },
                'size': o ? 'sm' : 'md',
                'variant': 'icon'
              })
            ]
          });
        },
        gc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(J.c)().colorMode,
            n = Object(fe.a)(),
            a = n.isOpen,
            i = n.onOpen,
            r = n.onClose,
            c = Object(fe.a)(),
            s = c.isOpen,
            l = c.onOpen,
            d = c.onClose,
            u = Object(fe.a)(),
            g = u.isOpen,
            j = u.onOpen,
            h = u.onClose,
            v = Object(fe.a)(),
            O = v.isOpen,
            m = v.onOpen,
            x = v.onClose,
            y = Object(fe.a)(),
            A = y.isOpen,
            k = y.onOpen,
            S = y.onClose,
            D = Object(fe.a)(),
            E = D.isOpen,
            L = D.onOpen,
            _ = D.onClose,
            B = Object(Jr.a)(),
            M = Object(ge.h)(),
            T = M.id,
            z = M.mediaType,
            I = Object(ge.f)(),
            F = w(function (e) {
              return e.user.data.lists;
            }),
            Q = w(function (e) {
              return e.app.data.sortDirection;
            }),
            N = Object(o.useState)(null),
            Y = Object(p.a)(N, 2),
            W = Y[0],
            P = Y[1],
            R = Object(o.useState)(null),
            G = Object(p.a)(R, 2),
            V = G[0],
            H = G[1],
            q = Object(o.useState)([]),
            X = Object(p.a)(q, 2),
            K = X[0],
            $ = X[1],
            ee = Object(o.useState)([]),
            te = Object(p.a)(ee, 2),
            ne = te[0],
            oe = te[1],
            ae = Object(o.useState)(),
            ie = Object(p.a)(ae, 2),
            re = ie[0],
            ce = ie[1],
            se = function (e) {
              (null === re || void 0 === re ? void 0 : re.id) === e
                ? ce(void 0)
                : ce(
                    F.find(function (t) {
                      return t.id === e;
                    })
                  );
            },
            le = function () {
              B.closeAll(), ce(void 0);
            };
          return (
            Object(o.useEffect)(
              function () {
                var e = F.find(function (e) {
                  return e.id === T;
                });
                if (
                  (H(null),
                  P(null),
                  T && e && (H(e), $(Object(In.a)(e.results.movies)), oe(Object(In.a)(e.results.tv))),
                  z)
                )
                  switch (z) {
                    case 'person':
                      P('person');
                      break;
                    case 'tv':
                      P('tv');
                      break;
                    case 'movie':
                      P('movie');
                  }
              },
              [I.location]
            ),
            Object(o.useEffect)(
              function () {
                B.closeAll(),
                  re &&
                    B({
                      duration: null,
                      isClosable: !0,
                      position: 'bottom',
                      variant: 'solid',
                      render: function () {
                        return Object(he.jsx)(bc, {
                          selected: re,
                          onInfo: function () {
                            return L();
                          },
                          onEdit: function () {
                            return k();
                          },
                          onDelete: function () {
                            return m();
                          },
                          onClose: function () {
                            return le();
                          }
                        });
                      }
                    });
              },
              [re]
            ),
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: Object(he.jsxs)(ke.a, {
                    children: [
                      Object(he.jsx)(U.a, {
                        align: 'left',
                        color: 'light' === t ? 'gray.900' : 'gray.50',
                        fontSize: ['2xl', '2xl', '3xl', '3xl', '3xl', '3xl'],
                        fontWeight: 'bold',
                        children: V
                          ? '"'
                              .concat(V.label, '" list ')
                              .concat('movie' === W ? 'Movies' : 'tv' === W ? 'TV shows' : '')
                          : 'Lists'
                      }),
                      Object(he.jsx)(yo, {
                        label: String(
                          V ? ('movie' === W ? K.length : 'tv' === W ? ne.length : K.length + ne.length) : F.length
                        ),
                        size: 'lg',
                        ml: 2
                      })
                    ]
                  }),
                  breadcrumbs: (function () {
                    var e = [kr, Br];
                    if (V && (e.push({ label: V.label, to: { pathname: '/lists/'.concat(V.id) } }), W))
                      switch (W) {
                        case 'tv':
                          e.push({ label: 'TV Shows', to: { pathname: '/lists/'.concat(V.id, '/tv') } });
                          break;
                        case 'movie':
                          e.push({ label: 'Movies', to: { pathname: '/lists/'.concat(V.id, '/movie') } });
                      }
                    return e;
                  })(),
                  children: {
                    actions: Object(he.jsx)(qr, {
                      mediaType: W,
                      lists: F,
                      list: V,
                      movies: K,
                      tv: ne,
                      onFilter: function (e, t) {
                        switch (W) {
                          case 'movie':
                            !(function (e, t) {
                              if (V && V.results.movies) {
                                var n,
                                  o = Object(In.a)(V.results.movies);
                                t &&
                                  t.length > 0 &&
                                  (o = o.filter(function (e) {
                                    return t.some(function (t) {
                                      return e.genre_ids.includes(t.id);
                                    });
                                  })),
                                  e &&
                                    e.find(function (e) {
                                      return e.isActive;
                                    }) &&
                                    (o = ua()(
                                      o,
                                      null ===
                                        (n = e.find(function (e) {
                                          return e.isActive;
                                        })) || void 0 === n
                                        ? void 0
                                        : n.value,
                                      { reverse: 'desc' === Q }
                                    )),
                                  $(Object(In.a)(o));
                              }
                            })(e, t);
                            break;
                          case 'tv':
                            !(function (e, t) {
                              if (V && V.results.tv) {
                                var n,
                                  o = Object(In.a)(V.results.tv);
                                t &&
                                  t.length > 0 &&
                                  (o = o.filter(function (e) {
                                    return t.some(function (t) {
                                      return e.genre_ids.includes(t.id);
                                    });
                                  })),
                                  e &&
                                    e.find(function (e) {
                                      return e.isActive;
                                    }) &&
                                    (o = ua()(
                                      o,
                                      null ===
                                        (n = e.find(function (e) {
                                          return e.isActive;
                                        })) || void 0 === n
                                        ? void 0
                                        : n.value,
                                      { reverse: 'desc' === Q }
                                    )),
                                  oe(Object(In.a)(o));
                              }
                            })(e, t);
                        }
                      },
                      onMediaTypePickerOpen: i,
                      onListPickerOpen: l,
                      onListInfoOpen: L,
                      onCreateListOpen: j
                    }),
                    body: Object(he.jsx)(Z.c, {
                      width: '100%',
                      spacing: 0,
                      pb: W ? 4 : 0,
                      children: Object(he.jsx)(mr, {
                        children: V
                          ? K.length > 0 || ne.length > 0
                            ? 'movie' === W
                              ? K.length > 0
                                ? Object(he.jsx)(Wr, { isError: !1, isSuccess: !0, isLoading: !1, movies: K })
                                : Object(he.jsx)(nc, { id: V.id, label: V.label, mediaTypeLabel: 'movies' })
                              : 'tv' === W
                              ? ne.length > 0
                                ? Object(he.jsx)(Gr, { isError: !1, isSuccess: !0, isLoading: !1, tv: ne })
                                : Object(he.jsx)(nc, { id: V.id, label: V.label, mediaTypeLabel: 'tv shows' })
                              : Object(he.jsx)(Xr, { list: V, movies: K, tv: ne })
                            : Object(he.jsx)(nc, { id: V.id, label: V.label })
                          : F && F.length > 0
                          ? Object(he.jsx)(En.a, {
                              width: '100%',
                              columns: [1, 2, 3, 4, 4],
                              spacing: 2,
                              px: 2,
                              pt: 2,
                              children: F.map(function (e) {
                                return Object(o.createElement)(
                                  cc,
                                  Object(b.a)(
                                    Object(b.a)({}, e),
                                    {},
                                    {
                                      key: e.id,
                                      isSelectable: !0,
                                      isSelected: (null === re || void 0 === re ? void 0 : re.id) === e.id || !1,
                                      onSelected: se
                                    }
                                  )
                                );
                              })
                            })
                          : Object(he.jsx)(f.a, {
                              width: '100%',
                              p: 2,
                              children: Object(he.jsx)(bo, {
                                label: 'You have no lists!',
                                variant: 'outlined',
                                size: 'xl'
                              })
                            })
                      })
                    })
                  }
                }),
                Object(he.jsx)(sc, { activeList: V, isOpen: s, onClose: d }),
                Object(he.jsx)(Zn, { isOpen: g, onClose: h }),
                Object(he.jsx)(Kr, {
                  id: null === re || void 0 === re ? void 0 : re.id,
                  label: null === re || void 0 === re ? void 0 : re.label,
                  isOpen: O,
                  onClose: x,
                  onCloseToast: function () {
                    return le();
                  }
                }),
                Object(he.jsx)(tc, {
                  list: re,
                  isOpen: A,
                  onClose: function () {
                    return S();
                  }
                }),
                Object(he.jsx)(ac, { list: V || re, isOpen: E, onClose: _ }),
                W && V
                  ? Object(he.jsx)(wr, {
                      mediaTypes: ['movie', 'tv'],
                      mediaType: W,
                      isOpen: a,
                      onClose: r,
                      onSetType: function (e) {
                        return I.push({ pathname: '/lists/'.concat(V.id, '/').concat(e) });
                      }
                    })
                  : null
              ]
            })
          );
        },
        jc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.movies,
            r = e.title,
            c = e.pathname,
            s = e.isLoading,
            l = void 0 === s || s,
            d = e.isError,
            u = void 0 !== d && d,
            b = e.isSuccess,
            g = void 0 !== b && b;
          return Object(he.jsx)(di, {
            title: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
              fontWeight: 'semibold',
              textTransform: 'capitalize',
              children: r
            }),
            footer: Object(he.jsx)(pe, {
              to: { pathname: c },
              isFullWidth: !0,
              isDisabled: l,
              children: Object(he.jsx)(bn, {
                color: Wt(a),
                isFullWidth: !0,
                isDisabled: l,
                size: o ? 'sm' : 'md',
                variant: 'text',
                children: 'View all '.concat(r)
              })
            }),
            isLoading: l,
            children: Object(he.jsx)(Wi, { isError: u, isSuccess: g, isLoading: l, movies: i })
          });
        },
        hc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(go.a)(
              'popularMovies',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/movie/popular', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            n = Object(go.a)(
              'upcomingMovies',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/movie/upcoming', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            a = Object(go.a)(
              'moviesNowPlaying',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/movie/now_playing', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            i = Object(go.a)(
              'topRatedMovies',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/movie/top_rated', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'Movies',
              breadcrumbs: [kr, Dr],
              children: {
                body: Object(he.jsxs)(Z.c, {
                  spacing: 6,
                  children: [
                    Object(he.jsx)(jc, {
                      movies: t.data,
                      title: 'Popular movies',
                      pathname: '/movies/popular',
                      isError: t.isError,
                      isSuccess: t.isSuccess,
                      isLoading: t.isFetching || t.isLoading
                    }),
                    Object(he.jsx)(jc, {
                      movies: n.data,
                      title: 'Upcoming Movies',
                      pathname: '/movies/upcoming',
                      isError: n.isError,
                      isSuccess: n.isSuccess,
                      isLoading: n.isFetching || n.isLoading
                    }),
                    Object(he.jsx)(jc, {
                      movies: a.data,
                      title: 'Movies Now Playing',
                      pathname: '/movies/now-playing',
                      isError: a.isError,
                      isSuccess: a.isSuccess,
                      isLoading: a.isFetching || a.isLoading
                    }),
                    Object(he.jsx)(jc, {
                      movies: i.data,
                      title: 'Top Rated Movies',
                      pathname: '/movies/top-rated',
                      isError: i.isError,
                      isSuccess: i.isSuccess,
                      isLoading: i.isFetching || i.isLoading
                    })
                  ]
                })
              }
            })
          );
        },
        pc = n(583),
        vc = n(576),
        Oc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.amount,
            r = void 0 === i ? 0 : i,
            c = e.total,
            s = void 0 === c ? 0 : c,
            l = e.label,
            d = e.isLoading,
            u = void 0 !== d && d,
            b = e.isButtonVisible,
            g = void 0 === b || b,
            j = e.onClick;
          return Object(he.jsxs)(Z.c, {
            width: o ? '100%' : 'auto',
            spacing: 3,
            children: [
              Object(he.jsxs)(Z.c, {
                width: '100%',
                children: [
                  Object(he.jsx)(U.a, {
                    align: 'center',
                    fontSize: 'sm',
                    color: 'light' === t ? 'gray.400' : 'gray.500',
                    children:
                      r >= s
                        ? "You've viewed all ".concat(s, ' ').concat(l)
                        : "You've viewed ".concat(r, ' of ').concat(s, ' ').concat(l)
                  }),
                  Object(he.jsx)(vc.a, {
                    width: '100%',
                    background: 'light' === t ? 'gray.200' : 'gray.700',
                    borderRadius: 'full',
                    size: 'sm',
                    value: Math.round((r / s) * 100),
                    sx: { '& div': { backgroundColor: ''.concat(Wt(a), '.400') } }
                  })
                ]
              }),
              Object(he.jsx)(_e.a, {
                in: g && r < s,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(bn, {
                  color: Wt(a),
                  isDisabled: r >= s,
                  isLoading: u,
                  isFullWidth: !0,
                  onClick: function () {
                    return j();
                  },
                  variant: 'outlined',
                  children: 'Load more'
                })
              })
            ]
          });
        },
        fc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = w(function (e) {
              return e.app.data.sortDirection;
            }),
            i = Object(o.useState)(),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(o.useState)([]),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useState)(),
            v = Object(p.a)(g, 2),
            f = v[0],
            m = v[1],
            x = Object(pc.a)(
              'moviesNowPlaying',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/movie/now_playing', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    m({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        u && u.length > 0
                          ? t.filter(function (e) {
                              return u.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === c || void 0 === c ? void 0 : c.value) || '',
                        { reverse: 'desc' === a }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'Movies Now Playing',
              breadcrumbs: [kr, Dr, { label: 'Now Playing', to: { pathname: '/movies/now-playing' } }],
              children: {
                actions: Object(he.jsx)(Or, {
                  mediaType: 'movie',
                  isDisabled: !x.isSuccess,
                  onFilter: function (e, t) {
                    var n = e.find(function (e) {
                      return e.isActive;
                    });
                    n && s(n), b(t), x.refetch();
                  }
                }),
                body: Object(he.jsx)(mr, {
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 4,
                    px: 2,
                    pt: 2,
                    children: [
                      Object(he.jsx)(Wr, {
                        isError: x.isError,
                        isSuccess: x.isSuccess,
                        isLoading: x.isFetching || x.isLoading,
                        movies: (null === f || void 0 === f ? void 0 : f.results) || []
                      }),
                      Object(he.jsx)(_e.a, {
                        in: !x.isError,
                        unmountOnExit: !0,
                        style: { width: n ? '100%' : 'auto' },
                        children: Object(he.jsx)(Oc, {
                          amount: (null === f || void 0 === f ? void 0 : f.results.length) || 0,
                          total: (null === f || void 0 === f ? void 0 : f.total_results) || 0,
                          label: 'Movies',
                          isLoading: x.isFetching || x.isLoading,
                          isButtonVisible: (x.hasNextPage, !x.isError),
                          onClick: x.fetchNextPage
                        })
                      })
                    ]
                  })
                })
              }
            })
          );
        },
        mc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = w(function (e) {
              return e.app.data.sortDirection;
            }),
            i = Object(o.useState)(),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(o.useState)([]),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useState)(),
            v = Object(p.a)(g, 2),
            f = v[0],
            m = v[1],
            x = Object(pc.a)(
              'popularMovies',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/movie/popular', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    m({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        u && u.length > 0
                          ? t.filter(function (e) {
                              return u.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === c || void 0 === c ? void 0 : c.value) || '',
                        { reverse: 'desc' === a }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'Popular Movies',
              breadcrumbs: [kr, Dr, { label: 'Popular', to: { pathname: '/movies/popular' } }],
              children: {
                actions: Object(he.jsx)(Or, {
                  mediaType: 'movie',
                  isDisabled: !x.isSuccess,
                  onFilter: function (e, t) {
                    var n = e.find(function (e) {
                      return e.isActive;
                    });
                    n && s(n), b(t), x.refetch();
                  }
                }),
                body: Object(he.jsx)(mr, {
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 4,
                    px: 2,
                    pt: 2,
                    children: [
                      Object(he.jsx)(Wr, {
                        isError: x.isError,
                        isSuccess: x.isSuccess,
                        isLoading: x.isFetching || x.isLoading,
                        movies: (null === f || void 0 === f ? void 0 : f.results) || []
                      }),
                      Object(he.jsx)(_e.a, {
                        in: !x.isError,
                        unmountOnExit: !0,
                        style: { width: n ? '100%' : 'auto' },
                        children: Object(he.jsx)(Oc, {
                          amount: (null === f || void 0 === f ? void 0 : f.results.length) || 0,
                          total: (null === f || void 0 === f ? void 0 : f.total_results) || 0,
                          label: 'Movies',
                          isLoading: x.isFetching || x.isLoading,
                          isButtonVisible: (x.hasNextPage, !x.isError),
                          onClick: x.fetchNextPage
                        })
                      })
                    ]
                  })
                })
              }
            })
          );
        },
        xc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = w(function (e) {
              return e.app.data.sortDirection;
            }),
            i = Object(o.useState)(),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(o.useState)([]),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useState)(),
            v = Object(p.a)(g, 2),
            f = v[0],
            m = v[1],
            x = Object(pc.a)(
              'topRatedMovies',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/movie/top_rated', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    m({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        u && u.length > 0
                          ? t.filter(function (e) {
                              return u.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === c || void 0 === c ? void 0 : c.value) || '',
                        { reverse: 'desc' === a }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'Top Rated Movies',
              breadcrumbs: [kr, Dr, { label: 'Top Rated', to: { pathname: '/movies/top-rated' } }],
              children: {
                actions: Object(he.jsx)(Or, {
                  mediaType: 'movie',
                  isDisabled: !x.isSuccess,
                  onFilter: function (e, t) {
                    var n = e.find(function (e) {
                      return e.isActive;
                    });
                    n && s(n), b(t), x.refetch();
                  }
                }),
                body: Object(he.jsx)(mr, {
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 4,
                    px: 2,
                    pt: 2,
                    children: [
                      Object(he.jsx)(Wr, {
                        isError: x.isError,
                        isSuccess: x.isSuccess,
                        isLoading: x.isFetching || x.isLoading,
                        movies: (null === f || void 0 === f ? void 0 : f.results) || []
                      }),
                      Object(he.jsx)(_e.a, {
                        in: !x.isError,
                        unmountOnExit: !0,
                        style: { width: n ? '100%' : 'auto' },
                        children: Object(he.jsx)(Oc, {
                          amount: (null === f || void 0 === f ? void 0 : f.results.length) || 0,
                          total: (null === f || void 0 === f ? void 0 : f.total_results) || 0,
                          label: 'Movies',
                          isLoading: x.isFetching || x.isLoading,
                          isButtonVisible: (x.hasNextPage, !x.isError),
                          onClick: x.fetchNextPage
                        })
                      })
                    ]
                  })
                })
              }
            })
          );
        },
        yc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = w(function (e) {
              return e.app.data.sortDirection;
            }),
            i = Object(o.useState)(),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(o.useState)([]),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useState)(),
            v = Object(p.a)(g, 2),
            f = v[0],
            m = v[1],
            x = Object(pc.a)(
              'upcomingMovies',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/movie/upcoming', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    m({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        u && u.length > 0
                          ? t.filter(function (e) {
                              return u.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === c || void 0 === c ? void 0 : c.value) || '',
                        { reverse: 'desc' === a }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'Upcoming Movies',
              breadcrumbs: [kr, Dr, { label: 'Upcoming', to: { pathname: '/movies/upcoming' } }],
              children: {
                actions: Object(he.jsx)(Or, {
                  mediaType: 'movie',
                  onFilter: function (e, t) {
                    var n = e.find(function (e) {
                      return e.isActive;
                    });
                    n && s(n), b(t), x.refetch();
                  }
                }),
                body: Object(he.jsx)(mr, {
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 4,
                    px: 2,
                    pt: 2,
                    children: [
                      Object(he.jsx)(Wr, {
                        isError: x.isError,
                        isSuccess: x.isSuccess,
                        isLoading: x.isFetching || x.isLoading,
                        movies: (null === f || void 0 === f ? void 0 : f.results) || []
                      }),
                      Object(he.jsx)(_e.a, {
                        in: !x.isError,
                        unmountOnExit: !0,
                        style: { width: n ? '100%' : 'auto' },
                        children: Object(he.jsx)(Oc, {
                          amount: (null === f || void 0 === f ? void 0 : f.results.length) || 0,
                          total: (null === f || void 0 === f ? void 0 : f.total_results) || 0,
                          label: 'Movies',
                          isLoading: x.isFetching || x.isLoading,
                          isButtonVisible: (x.hasNextPage, !x.isError),
                          onClick: x.fetchNextPage
                        })
                      })
                    ]
                  })
                })
              }
            })
          );
        },
        Ac = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = w(function (e) {
              return e.app.data.sortDirection;
            }),
            i = Object(o.useState)(),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(o.useState)([]),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useState)(),
            v = Object(p.a)(g, 2),
            f = v[0],
            m = v[1],
            x = Object(pc.a)(
              'popularPeople',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/person/popular', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    m({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        u && u.length > 0
                          ? t.filter(function (e) {
                              return u.some(function (t) {
                                return e.known_for_department === t.value;
                              });
                            })
                          : Object(In.a)(t),
                        (null === c || void 0 === c ? void 0 : c.value) || '',
                        { reverse: 'desc' === a }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'People',
              breadcrumbs: [kr, Lr],
              children: {
                actions: Object(he.jsx)(Or, {
                  mediaType: 'person',
                  isDisabled: !x.isSuccess,
                  onFilter: function (e, t, n) {
                    var o = e.find(function (e) {
                      return e.isActive;
                    });
                    o && s(o), b(n), x.refetch();
                  }
                }),
                body: Object(he.jsx)(mr, {
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 4,
                    px: 2,
                    pt: 2,
                    children: [
                      Object(he.jsx)(Rr, {
                        isError: x.isError,
                        isSuccess: x.isSuccess,
                        isLoading: x.isFetching || x.isLoading,
                        people: (null === f || void 0 === f ? void 0 : f.results) || []
                      }),
                      Object(he.jsx)(_e.a, {
                        in: !x.isError,
                        unmountOnExit: !0,
                        style: { width: n ? '100%' : 'auto' },
                        children: Object(he.jsx)(Oc, {
                          amount: (null === f || void 0 === f ? void 0 : f.results.length) || 0,
                          total: (null === f || void 0 === f ? void 0 : f.total_results) || 0,
                          label: 'People',
                          isLoading: x.isFetching || x.isLoading,
                          isButtonVisible: (x.hasNextPage, !x.isError),
                          onClick: x.fetchNextPage
                        })
                      })
                    ]
                  })
                })
              }
            })
          );
        },
        wc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.query,
            r = e.results,
            c = e.total_results,
            s = e.isFetching,
            l = e.isLoading,
            d = e.isError,
            u = e.isSuccess,
            b = e.refetch;
          return Object(he.jsx)(di, {
            title: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
              fontWeight: 'semibold',
              textTransform: 'capitalize',
              children: 'Found '
                .concat(c || 0, ' movie')
                .concat(c && (0 === c || c > 1) ? 's' : '', ' with "')
                .concat(i, '"')
            }),
            footer:
              (c || 0) > 20
                ? Object(he.jsx)(pe, {
                    to: { pathname: '/search', search: Ie.a.stringify({ query: i, mediaType: 'movie' }) },
                    isFullWidth: !0,
                    isDisabled: s || l,
                    children: Object(he.jsx)(bn, {
                      color: Wt(a),
                      isFullWidth: !0,
                      isDisabled: s || l,
                      onClick: function () {
                        return b();
                      },
                      size: o ? 'sm' : 'md',
                      variant: 'text',
                      children: 'View all '
                        .concat(c || 0, ' movie')
                        .concat(c && (0 === c || c > 1) ? 's' : '', ' with "')
                        .concat(i, '"')
                    })
                  })
                : void 0,
            isLoading: s || l,
            children: Object(he.jsx)(Wi, { isError: d, isSuccess: u, isLoading: s || l, movies: r || [] })
          });
        },
        kc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.query,
            r = e.results,
            c = e.total_results,
            s = e.isFetching,
            l = e.isLoading,
            d = e.isError,
            u = e.isSuccess,
            b = e.refetch;
          return Object(he.jsx)(di, {
            title: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
              fontWeight: 'semibold',
              textTransform: 'capitalize',
              children: 'Found '
                .concat(c || 0, ' ')
                .concat(c ? (0 === c || c > 1 ? 'people' : 'person') : '', ' with "')
                .concat(i, '"')
            }),
            footer:
              (c || 0) > 20
                ? Object(he.jsx)(pe, {
                    to: { pathname: '/search', search: Ie.a.stringify({ query: i, page: 1, mediaType: 'person' }) },
                    isFullWidth: !0,
                    isDisabled: s || l,
                    children: Object(he.jsx)(bn, {
                      color: Wt(a),
                      isFullWidth: !0,
                      isDisabled: s || l,
                      onClick: function () {
                        return b();
                      },
                      size: o ? 'sm' : 'md',
                      variant: 'text',
                      children: 'View all '
                        .concat(c || 0, ' ')
                        .concat(c ? (0 === c || c > 1 ? 'people' : 'person') : '', ' with "')
                        .concat(i, '"')
                    })
                  })
                : void 0,
            isLoading: s || l,
            children: Object(he.jsx)(Ri, { isError: d, isSuccess: u, isLoading: s || l, people: r || [] })
          });
        },
        Cc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.query,
            r = e.results,
            c = e.total_results,
            s = e.isFetching,
            l = e.isLoading,
            d = e.isError,
            u = e.isSuccess,
            b = e.refetch;
          return Object(he.jsx)(di, {
            title: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
              fontWeight: 'semibold',
              textTransform: 'capitalize',
              children: 'Found '
                .concat(c || 0, ' TV show')
                .concat(c && (0 === c || c > 1) ? 's' : '', ' with "')
                .concat(i, '"')
            }),
            footer:
              (c || 0) > 20
                ? Object(he.jsx)(pe, {
                    to: { pathname: '/search', search: Ie.a.stringify({ query: i, page: 1, mediaType: 'tv' }) },
                    isFullWidth: !0,
                    isDisabled: s || l,
                    children: Object(he.jsx)(bn, {
                      color: Wt(a),
                      isFullWidth: !0,
                      isDisabled: s || l,
                      onClick: function () {
                        return b();
                      },
                      size: o ? 'sm' : 'md',
                      variant: 'text',
                      children: 'View all '
                        .concat(c || 0, ' TV show')
                        .concat(c && (0 === c || c > 1) ? 's' : '', ' with "')
                        .concat(i, '"')
                    })
                  })
                : void 0,
            isLoading: s || l,
            children: Object(he.jsx)(Gi, { isError: d, isSuccess: u, isLoading: s || l, tv: r || [] })
          });
        },
        Sc = function (e) {
          var t,
            n,
            o,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            b,
            g,
            j,
            h,
            p,
            v,
            O,
            f,
            m,
            x,
            y = e.query,
            A = e.movies,
            w = e.tv,
            k = e.people;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 6,
            children: [
              Object(he.jsx)(eo.a, {
                in:
                  ((null === (t = A.data) ||
                  void 0 === t ||
                  null === (n = t.pages[(null === (o = A.data) || void 0 === o ? void 0 : o.pages.length) - 1]) ||
                  void 0 === n
                    ? void 0
                    : n.results.length) || 0) > 0,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(wc, {
                  query: y,
                  results:
                    (null === (a = A.data) || void 0 === a
                      ? void 0
                      : a.pages[(null === (i = A.data) || void 0 === i ? void 0 : i.pages.length) - 1].results) || [],
                  total_results:
                    (null === (r = A.data) || void 0 === r
                      ? void 0
                      : r.pages[(null === (c = A.data) || void 0 === c ? void 0 : c.pages.length) - 1].total_results) ||
                    0,
                  isFetching: A.isFetching,
                  isLoading: A.isLoading,
                  isError: A.isError,
                  isSuccess: A.isSuccess,
                  refetch: A.refetch
                })
              }),
              Object(he.jsx)(eo.a, {
                in:
                  ((null === (s = w.data) ||
                  void 0 === s ||
                  null === (l = s.pages[(null === (d = w.data) || void 0 === d ? void 0 : d.pages.length) - 1]) ||
                  void 0 === l
                    ? void 0
                    : l.results.length) || 0) > 0,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(Cc, {
                  query: y,
                  results:
                    (null === (u = w.data) || void 0 === u
                      ? void 0
                      : u.pages[(null === (b = w.data) || void 0 === b ? void 0 : b.pages.length) - 1].results) || [],
                  total_results:
                    (null === (g = w.data) || void 0 === g
                      ? void 0
                      : g.pages[(null === (j = w.data) || void 0 === j ? void 0 : j.pages.length) - 1].total_results) ||
                    0,
                  isFetching: w.isFetching,
                  isLoading: w.isLoading,
                  isError: w.isError,
                  isSuccess: w.isSuccess,
                  refetch: w.refetch
                })
              }),
              Object(he.jsx)(eo.a, {
                in:
                  ((null === (h = k.data) ||
                  void 0 === h ||
                  null === (p = h.pages[(null === (v = k.data) || void 0 === v ? void 0 : v.pages.length) - 1]) ||
                  void 0 === p
                    ? void 0
                    : p.results.length) || 0) > 0,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(kc, {
                  query: y,
                  results:
                    (null === (O = k.data) || void 0 === O
                      ? void 0
                      : O.pages[(null === (f = k.data) || void 0 === f ? void 0 : f.pages.length) - 1].results) || [],
                  total_results:
                    (null === (m = k.data) || void 0 === m
                      ? void 0
                      : m.pages[(null === (x = k.data) || void 0 === x ? void 0 : x.pages.length) - 1].total_results) ||
                    0,
                  isFetching: k.isFetching,
                  isLoading: k.isLoading,
                  isError: k.isError,
                  isSuccess: k.isSuccess,
                  refetch: k.refetch
                })
              })
            ]
          });
        },
        Dc = n(556),
        Ec = n(264),
        Lc = n.n(Ec),
        _c = n(552),
        Bc = n(553),
        Mc = n(554),
        Tc = function (e) {
          var t = e.hasQuery,
            n = void 0 !== t && t,
            o = e.isFormLocked,
            a = void 0 !== o && o,
            i = e.isHoveringLock,
            r = void 0 !== i && i,
            c = e.onToggleLock,
            s = e.onHoverLock,
            l = e.onClearQuery,
            d = Object(Le.a)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1];
          return Object(he.jsxs)(ke.a, {
            children: [
              Object(he.jsx)(_e.a, {
                in: n,
                unmountOnExit: !0,
                children: Object(he.jsx)(Ht, {
                  'aria-label': 'Clear search',
                  'label': 'Clear search',
                  'isOpen': b,
                  'isDisabled': !n,
                  'placement': 'top',
                  'children': Object(he.jsx)(Ee, {
                    'aria-label': 'Clear search',
                    'icon': _c.a,
                    'isDisabled': !n,
                    'onClick': function () {
                      return l();
                    },
                    'onMouseEnter': function () {
                      return g.on();
                    },
                    'onMouseLeave': function () {
                      return g.off();
                    },
                    'size': 'sm',
                    'variant': 'icon'
                  })
                })
              }),
              Object(he.jsx)(Ht, {
                'aria-label': a ? 'Unlock Search' : 'Lock Search',
                'label': a ? 'Unlock Search' : 'Lock Search',
                'isOpen': r,
                'placement': 'top',
                'children': Object(he.jsx)(Ee, {
                  'aria-label': a ? 'Unlock Search' : 'Lock Search',
                  'icon': a ? Bc.a : Mc.a,
                  'onClick': function () {
                    return c();
                  },
                  'onMouseEnter': function () {
                    return s(!0);
                  },
                  'onMouseLeave': function () {
                    return s(!1);
                  },
                  'size': 'sm',
                  'variant': 'icon'
                })
              })
            ]
          });
        },
        zc = function (e) {
          var t = e.query,
            n = void 0 === t ? '' : t,
            o = e.mediaType,
            a = e.hasUnsubmitted,
            i = e.totalResults,
            r = Object(J.c)().colorMode,
            c = function () {
              return (
                ((null === i || void 0 === i ? void 0 : i.movies) || 0) +
                ((null === i || void 0 === i ? void 0 : i.tv) || 0) +
                ((null === i || void 0 === i ? void 0 : i.people) || 0)
              );
            },
            s = function () {
              switch (o) {
                case 'person':
                  return (null === i || void 0 === i ? void 0 : i.people) || 0;
                case 'tv':
                  return (null === i || void 0 === i ? void 0 : i.tv) || 0;
                case 'movie':
                  return (null === i || void 0 === i ? void 0 : i.movies) || 0;
                default:
                  return 0;
              }
            };
          return Object(he.jsx)(mo.a, {
            in: Boolean(i) && !a,
            offsetY: -7,
            unmountOnExit: !0,
            style: { width: '100%' },
            children: Object(he.jsxs)(Z.a, {
              width: '100%',
              justifyContent: 'space-between',
              children: [
                Object(he.jsx)(U.a, {
                  align: 'left',
                  color: 'light' === r ? 'gray.400' : 'gray.500',
                  fontSize: 'sm',
                  children: 'Your search results for "'.concat(n, '"')
                }),
                Object(he.jsx)(U.a, {
                  align: 'right',
                  color: 'light' === r ? 'gray.400' : 'gray.500',
                  fontSize: 'sm',
                  children: ''.concat(o ? s() : c(), ' ').concat(
                    (function () {
                      if (!o) {
                        var e = c();
                        return 'result'.concat(e > 1 ? 's' : '');
                      }
                      var t = s();
                      switch (o) {
                        case 'person':
                          return ''.concat(t > 1 ? 'People' : 'Person');
                        case 'tv':
                          return 'TV Show'.concat(t > 1 ? 's' : '');
                        case 'movie':
                          return 'Movie'.concat(t > 1 ? 's' : '');
                        default:
                          return '';
                      }
                    })(),
                    ' found'
                  )
                })
              ]
            })
          });
        },
        Ic = n(555),
        Fc = function (e) {
          var t = e.children,
            n = e.title,
            a = e.actions,
            i = Object(o.useState)(!1),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(o.useCallback)(function (e) {
              e && s(e.scrollHeight > e.offsetHeight);
            }, []);
          return Object(he.jsx)(Ic.a, {
            spacing: 0,
            children: Object(he.jsx)(wn, {
              box: { header: { pb: 1 } },
              isFullWidth: !0,
              hasDivider: !1,
              variant: 'transparent',
              children: {
                header: { title: n, actions: a },
                body: Object(he.jsx)(Z.c, {
                  ref: function (e) {
                    return l(e);
                  },
                  width: '100%',
                  alignItems: 'flex-start',
                  spacing: 0,
                  maxHeight: '35vh',
                  overflowY: 'auto',
                  pr: c ? 2 : 0,
                  children: t
                })
              }
            })
          });
        },
        Qc = Gt(100, 10),
        Nc = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(r.b)(),
            a = w(function (e) {
              return e.user.data.recentSearches;
            }),
            i = e.id,
            c = e.title,
            s = e.subtitle,
            l = e.mediaType,
            d = e.state,
            u = void 0 === d ? 'default' : d,
            g = e.type,
            j = void 0 === g ? 'default' : g,
            h = e.onSearch,
            O = (function (e, t) {
              return {
                common: {
                  'cursor': 'pointer',
                  'width': '100%',
                  'display': 'flex',
                  'flexDirection': 'row',
                  'alignItems': 'center',
                  'justifyContent': 'space-between',
                  'borderRadius': e.radii.base,
                  'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                  '& .chakra-icon': {
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  },
                  '& .chakra-text': {
                    transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                  }
                },
                light: {
                  'backgroundColor': 'isKeyword' === t ? 'transparent' : 'gray.50',
                  '& .chakra-text': { color: 'gray.400' },
                  '&:hover': { 'backgroundColor': 'gray.100', '& .chakra-text': { color: 'gray.900' } },
                  '&:focus': { 'backgroundColor': 'gray.100', '& .chakra-text': { color: 'gray.900' } }
                },
                dark: {
                  'backgroundColor': 'isKeyword' === t ? 'transparent' : 'gray.900',
                  '& .chakra-text': { color: 'gray.500' },
                  '&:hover': { 'backgroundColor': 'gray.800', '& .chakra-text': { color: 'gray.50' } },
                  '&:focus': { 'backgroundColor': 'gray.800', '& .chakra-text': { color: 'gray.50' } }
                }
              };
            })(t, j),
            f = Object(Le.a)(),
            m = Object(p.a)(f, 2),
            x = m[0],
            y = m[1],
            A = Object(Le.a)(),
            k = Object(p.a)(A, 2),
            C = k[0],
            S = k[1];
          return Object(he.jsxs)(Ic.b, {
            px: 2,
            py: 'isKeyword' === j ? 1.25 : 1,
            onClick:
              !C && 'isLoading' !== u && h
                ? function () {
                    return h(c);
                  }
                : void 0,
            onMouseEnter:
              'isLoading' !== u
                ? function () {
                    return y.on();
                  }
                : void 0,
            onMouseLeave:
              'isLoading' !== u
                ? function () {
                    return y.off();
                  }
                : void 0,
            sx: Object(b.a)({}, D.a.merge(O.common, O[n])),
            children: [
              Object(he.jsx)(Zo, {
                width: 'isLoading' === u ? ''.concat(Qc[Math.floor(Math.random() * Qc.length)], '%') : 'auto',
                height: 'isLoading' === u ? '22px' : 'auto',
                offsetY: '11px',
                isLoaded: 'isLoaded' === u,
                children: Object(he.jsxs)(Z.c, {
                  alignItems: 'flex-start',
                  spacing: 0,
                  children: [
                    Object(he.jsxs)(ke.a, {
                      children: [
                        Object(he.jsx)(U.a, { align: 'left', fontSize: 'md', children: c }),
                        l
                          ? Object(he.jsx)(yo, {
                              color: 'movie' === l ? 'teal' : 'tv' === l ? 'cyan' : 'purple',
                              label: l,
                              ml: 1
                            })
                          : null
                      ]
                    }),
                    'default' === j && s
                      ? Object(he.jsx)(U.a, {
                          align: 'left',
                          color: 'light' === n ? 'gray.400' : 'gray.500',
                          fontSize: 'xs',
                          children: s
                        })
                      : null
                  ]
                })
              }),
              'isKeyword' !== j
                ? Object(he.jsx)(_e.a, {
                    in: x,
                    children: Object(he.jsx)(Ht, {
                      'aria-label': 'Remove search',
                      'label': 'Remove "'.concat(c, '"'),
                      'isOpen': C,
                      'placement': 'top',
                      'children': Object(he.jsx)(Ee, {
                        'aria-label': 'Remove search',
                        'icon': _c.a,
                        'onClick': function () {
                          i &&
                            o(
                              ot(
                                a.filter(function (e) {
                                  return e.id !== i;
                                })
                              )
                            );
                        },
                        'onMouseEnter':
                          'isLoading' !== u
                            ? function () {
                                return S.on();
                              }
                            : void 0,
                        'onMouseLeave':
                          'isLoading' !== u
                            ? function () {
                                return S.off();
                              }
                            : void 0,
                        'size': 'sm',
                        'variant': 'icon'
                      })
                    })
                  })
                : null
            ]
          });
        },
        Yc = [
          'The Godfather',
          'Seinfeld',
          'The Dark Knight',
          'I Love Lucy',
          'Pulp Fiction',
          'The Sopranos',
          'Fight Club',
          'The Simpsons',
          'The Matrix',
          'Friends',
          'GoodFellas',
          'South Park',
          'Hamilton',
          'Family Guy',
          'Star Wars',
          'Breaking Bad',
          'Parasite',
          'Game of Thrones',
          'Gladiator',
          'Star Trek'
        ],
        Wc = Yc[Math.floor(Math.random() * Yc.length)],
        Pc = function (e) {
          var t,
            n,
            a = Object(J.c)().colorMode,
            i = Object(o.useRef)(null),
            c = Object(r.b)(),
            s = w(function (e) {
              return e.user.data.recentSearches;
            }),
            l = e.keywords,
            d = e.query,
            u = e.mediaType,
            b = e.submittedQuery,
            g = e.hasUnsubmitted,
            j = void 0 !== g && g,
            h = e.totalResults,
            v = e.isInputDisabled,
            O = void 0 !== v && v,
            m = e.onInputKeyPress,
            x = e.onInputChange,
            y = e.onSubmitQuery,
            A = e.onClearQuery,
            k = Object(Le.a)(),
            C = Object(p.a)(k, 2),
            S = C[0],
            E = C[1],
            L = Object(Le.a)(),
            _ = Object(p.a)(L, 2),
            B = _[0],
            M = _[1],
            T = Object(Le.a)(),
            z = Object(p.a)(T, 2),
            I = z[0],
            F = z[1],
            Q = Object(Le.a)(),
            N = Object(p.a)(Q, 2),
            Y = N[0],
            W = N[1];
          return (
            Object(Dc.a)({
              ref: i,
              handler:
                B || S || I
                  ? void 0
                  : function () {
                      return W.off();
                    }
            }),
            Object(he.jsxs)(Z.c, {
              width: '100%',
              spacing: 1,
              p: 2,
              children: [
                Object(he.jsxs)(f.a, {
                  width: '100%',
                  cursor: 'text',
                  border: 'solid2',
                  borderColor: 'light' === a ? 'gray.200' : 'gray.700',
                  borderRadius: 'lg',
                  px: 2,
                  py: 1.5,
                  onClick: function () {
                    i && i.current && i.current.focus();
                  },
                  onMouseEnter:
                    l.isFetching && l.isLoading
                      ? void 0
                      : function () {
                          return F.on();
                        },
                  onMouseLeave:
                    l.isFetching && l.isLoading
                      ? void 0
                      : function () {
                          return F.off();
                        },
                  children: [
                    Object(he.jsxs)(Z.a, {
                      borderBottom: Y || S ? 'solid2' : 'none',
                      borderBottomColor: 'light' === a ? 'gray.200' : 'gray.700',
                      pb: Y || S ? 1.5 : 0,
                      mb: Y || S ? 2 : 0,
                      children: [
                        Object(he.jsx)(Se.a, { as: Lc.a, color: 'light' === a ? 'gray.400' : 'gray.500' }),
                        Object(he.jsx)(Nn.a, {
                          ref: i,
                          borderRadius: 'none',
                          placeholder: 'Try "'.concat(Wc, '"'),
                          isDisabled: O,
                          onFocus:
                            B || S
                              ? void 0
                              : function () {
                                  return W.on();
                                },
                          onKeyPress: function (e) {
                            return m(e);
                          },
                          onChange: function (e) {
                            return x(e);
                          },
                          variant: 'unstyled',
                          value: d
                        }),
                        Object(he.jsx)(Tc, {
                          hasQuery: d.length > 0,
                          isFormLocked: S,
                          isHoveringLock: B,
                          onToggleLock: function () {
                            return E.toggle();
                          },
                          onHoverLock: function (e) {
                            e ? M.on() : M.off();
                          },
                          onClearQuery: A
                        })
                      ]
                    }),
                    Object(he.jsx)(Be.a, {
                      in: Y || S,
                      unmountOnExit: !0,
                      children: Object(he.jsx)(Fc, {
                        title: j ? '' : 'Recent searches',
                        actions: j
                          ? void 0
                          : Object(he.jsx)(_e.a, {
                              in: s.length > 0,
                              children: Object(he.jsx)(bn, {
                                onClick: function () {
                                  return c(ot([]));
                                },
                                size: 'sm',
                                variant: 'text',
                                children: 'Clear'
                              })
                            }),
                        children: Object(he.jsx)(he.Fragment, {
                          children: j
                            ? l.isError
                              ? Object(he.jsx)(Pa, {
                                  hasIllustration: !1,
                                  label: 'Oh no! Something went wrong',
                                  description: 'Failed to fetch keywords!',
                                  size: 'xs'
                                })
                              : l.isSuccess && 0 === (null === (t = l.data) || void 0 === t ? void 0 : t.length)
                              ? Object(he.jsx)(bo, { hasIllustration: !1, label: 'No keywords found!', size: 'xs' })
                              : l.isSuccess && (null === (n = l.data) || void 0 === n ? void 0 : n.length) > 0
                              ? l.data.map(function (e) {
                                  return Object(he.jsx)(
                                    Nc,
                                    {
                                      id: String(e.id),
                                      title: e.name,
                                      state: 'isLoaded',
                                      type: 'isKeyword',
                                      onSearch: function (e) {
                                        return y(e);
                                      }
                                    },
                                    e.id
                                  );
                                })
                              : Object(In.a)(D.a.range(0, 7)).map(function (e, t) {
                                  return Object(he.jsx)(
                                    Nc,
                                    { id: String(t), title: 'Lorem Ipsum', state: 'isLoading', type: 'isKeyword' },
                                    t
                                  );
                                })
                            : s.length > 0
                            ? ua()(Object(In.a)(s), 'date', { reverse: !0 }).map(function (e) {
                                return Object(he.jsx)(
                                  Nc,
                                  {
                                    id: e.id,
                                    title: e.label,
                                    subtitle: K()(e.date).fromNow(),
                                    mediaType: e.mediaType,
                                    state: 'isLoaded',
                                    onSearch: function (t) {
                                      return y(t, e.mediaType);
                                    }
                                  },
                                  e.id
                                );
                              })
                            : Object(he.jsx)(bo, { hasIllustration: !1, label: 'No recent searches!', size: 'xs' })
                        })
                      })
                    })
                  ]
                }),
                Object(he.jsx)(zc, { query: b, mediaType: u, hasUnsubmitted: j, totalResults: h })
              ]
            })
          );
        },
        Rc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(fe.a)(),
            n = t.isOpen,
            a = t.onOpen,
            i = t.onClose,
            c = Object(O.a)('(max-width: 600px)'),
            s = Object(p.a)(c, 1)[0],
            l = Object(ge.f)(),
            d = Object(r.b)(),
            u = w(function (e) {
              return e.user.data.recentSearches;
            }),
            g = w(function (e) {
              return e.app.data.sortDirection;
            }),
            v = Object(o.useState)(''),
            m = Object(p.a)(v, 2),
            x = m[0],
            y = m[1],
            A = Object(o.useState)(''),
            k = Object(p.a)(A, 2),
            S = k[0],
            E = k[1],
            L = Object(o.useState)(),
            B = Object(p.a)(L, 2),
            M = B[0],
            T = B[1],
            z = Object(o.useState)(),
            I = Object(p.a)(z, 2),
            F = I[0],
            Q = I[1],
            N = Object(o.useState)([]),
            Y = Object(p.a)(N, 2),
            W = Y[0],
            P = Y[1],
            R = Object(o.useState)([]),
            G = Object(p.a)(R, 2),
            V = G[0],
            H = G[1],
            J = Object(o.useState)(null),
            U = Object(p.a)(J, 2),
            q = U[0],
            X = U[1],
            $ = Object(o.useState)(null),
            ee = Object(p.a)($, 2),
            te = ee[0],
            ne = ee[1],
            oe = Object(o.useState)(null),
            ae = Object(p.a)(oe, 2),
            ie = ae[0],
            re = ae[1],
            ce = Object(Le.a)(),
            se = Object(p.a)(ce, 2),
            le = se[0],
            de = se[1],
            ue = Object(o.useState)(),
            be = Object(p.a)(ue, 2),
            je = be[0],
            pe = be[1],
            ve = Object(go.a)(
              ['keywords', x],
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/search/keyword', { params: { query: x }, cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              ),
              { enabled: x.length > 0 }
            ),
            Oe = Object(pc.a)(
              ['searchMovies', S],
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r, c, s;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (i = n.pageParam),
                              (r = void 0 === i ? 1 : i),
                              (t.next = 3),
                              _.get('/search/movie', {
                                params: {
                                  query:
                                    x ||
                                    (null === (o = Ie.a.parse(location.search)) || void 0 === o ? void 0 : o.query) ||
                                    '',
                                  page:
                                    r ||
                                    (null === (a = Ie.a.parse(location.search)) || void 0 === a ? void 0 : a.page) ||
                                    1
                                },
                                cancelToken: e.token
                              })
                            );
                          case 3:
                            return (c = t.sent), (s = c.data), t.abrupt('return', s);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                enabled: (!M || 'movie' === M) && S.length > 0,
                cacheTime: 0,
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = e.pages[e.pages.length - 1],
                    n = [];
                  e.pages.forEach(function (e) {
                    n = [].concat(Object(In.a)(n), Object(In.a)(e.results));
                  }),
                    t &&
                      (X(
                        Object(b.a)(
                          Object(b.a)({}, t),
                          {},
                          {
                            results: ua()(
                              W && W.length > 0
                                ? n.filter(function (e) {
                                    return W.some(function (t) {
                                      return D.a.includes(e.genre_ids, t.id);
                                    });
                                  })
                                : Object(In.a)(n),
                              (null === F || void 0 === F ? void 0 : F.value) || '',
                              { reverse: 'desc' === g }
                            )
                          }
                        )
                      ),
                      pe(Object(b.a)(Object(b.a)({}, je), {}, { movies: t.total_results })),
                      E(x),
                      1 === e.pages.length &&
                        'movie' === M &&
                        d(
                          ot(
                            [].concat(Object(In.a)(u), [
                              {
                                id: Object(Fe.a)(),
                                label: x,
                                date: K()(new Date()).toISOString(),
                                type: 'isKeyword',
                                mediaType: 'movie'
                              }
                            ])
                          )
                        ));
                }
              }
            ),
            me = Object(pc.a)(
              ['searchTV', S],
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r, c, s;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (i = n.pageParam),
                              (r = void 0 === i ? 1 : i),
                              (t.next = 3),
                              _.get('/search/tv', {
                                params: {
                                  query:
                                    x ||
                                    (null === (o = Ie.a.parse(location.search)) || void 0 === o ? void 0 : o.query) ||
                                    '',
                                  page:
                                    r ||
                                    (null === (a = Ie.a.parse(location.search)) || void 0 === a ? void 0 : a.page) ||
                                    1
                                },
                                cancelToken: e.token
                              })
                            );
                          case 3:
                            return (c = t.sent), (s = c.data), t.abrupt('return', s);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                enabled: (!M || 'tv' === M) && S.length > 0,
                cacheTime: 0,
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = e.pages[e.pages.length - 1],
                    n = [];
                  e.pages.forEach(function (e) {
                    n = [].concat(Object(In.a)(n), Object(In.a)(e.results));
                  }),
                    t &&
                      (ne(
                        Object(b.a)(
                          Object(b.a)({}, t),
                          {},
                          {
                            results: ua()(
                              W && W.length > 0
                                ? n.filter(function (e) {
                                    return W.some(function (t) {
                                      return D.a.includes(e.genre_ids, t.id);
                                    });
                                  })
                                : Object(In.a)(n),
                              (null === F || void 0 === F ? void 0 : F.value) || '',
                              { reverse: 'desc' === g }
                            )
                          }
                        )
                      ),
                      pe(Object(b.a)(Object(b.a)({}, je), {}, { tv: t.total_results })),
                      E(x),
                      1 === e.pages.length &&
                        'tv' === M &&
                        d(
                          ot(
                            [].concat(Object(In.a)(u), [
                              {
                                id: Object(Fe.a)(),
                                label: x,
                                date: K()(new Date()).toISOString(),
                                type: 'isKeyword',
                                mediaType: 'tv'
                              }
                            ])
                          )
                        ));
                }
              }
            ),
            xe = Object(pc.a)(
              ['searchPeople', S],
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r, c, s;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (i = n.pageParam),
                              (r = void 0 === i ? 1 : i),
                              (t.next = 3),
                              _.get('/search/person', {
                                params: {
                                  query:
                                    x ||
                                    (null === (o = Ie.a.parse(location.search)) || void 0 === o ? void 0 : o.query) ||
                                    '',
                                  page:
                                    r ||
                                    (null === (a = Ie.a.parse(location.search)) || void 0 === a ? void 0 : a.page) ||
                                    1
                                },
                                cancelToken: e.token
                              })
                            );
                          case 3:
                            return (c = t.sent), (s = c.data), t.abrupt('return', s);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                enabled: (!M || 'person' === M) && S.length > 0,
                cacheTime: 0,
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = e.pages[e.pages.length - 1],
                    n = [];
                  e.pages.forEach(function (e) {
                    n = [].concat(Object(In.a)(n), Object(In.a)(e.results));
                  }),
                    t &&
                      (re(
                        Object(b.a)(
                          Object(b.a)({}, t),
                          {},
                          {
                            results: ua()(
                              V && V.length > 0
                                ? n.filter(function (e) {
                                    return V.some(function (t) {
                                      return e.known_for_department === t.value;
                                    });
                                  })
                                : Object(In.a)(n),
                              (null === F || void 0 === F ? void 0 : F.value) || '',
                              { reverse: 'desc' === g }
                            )
                          }
                        )
                      ),
                      pe(Object(b.a)(Object(b.a)({}, je), {}, { people: t.total_results })),
                      E(x),
                      1 === e.pages.length &&
                        'person' === M &&
                        d(
                          ot(
                            [].concat(Object(In.a)(u), [
                              {
                                id: Object(Fe.a)(),
                                label: x,
                                date: K()(new Date()).toISOString(),
                                type: 'isKeyword',
                                mediaType: 'person'
                              }
                            ])
                          )
                        ));
                }
              }
            ),
            ye = Object(o.useCallback)(
              function (e, t, n) {
                var o = { query: e };
                t && Object.assign(o, { mediaType: t }),
                  n && Object.assign(o, { page: n }),
                  l.push({ pathname: '/search', search: Ie.a.stringify(Object(b.a)({}, o)) });
              },
              [l]
            ),
            Ae = Object(o.useCallback)(
              function (e, t) {
                y(e), E(e), de.off(), Oe.remove(), me.remove(), xe.remove(), ye(e, t);
              },
              [y, E, de, Oe, me, xe, ye, T]
            ),
            we = function () {
              y(''), E(''), pe(void 0), T(void 0), de.off();
            };
          return (
            Object(o.useEffect)(
              function () {
                var e = Ie.a.parse(l.location.search);
                if (e && e.mediaType)
                  switch (e.mediaType) {
                    case 'person':
                      T('person');
                      break;
                    case 'tv':
                      T('tv');
                      break;
                    case 'movie':
                      T('movie');
                  }
                else T(void 0);
                if (e && e.page && e.mediaType && ('string' === typeof e.page ? e.page : 1) > 1)
                  switch (e.mediaType) {
                    case 'person':
                      xe.fetchNextPage();
                      break;
                    case 'tv':
                      me.fetchNextPage();
                      break;
                    case 'movie':
                      Oe.fetchNextPage();
                  }
                e && e.query && 'string' === typeof e.query && !S && Ae(e.query || S || x);
              },
              [l.location]
            ),
            Object(o.useEffect)(
              function () {
                Oe.isSuccess &&
                  me.isSuccess &&
                  xe.isSuccess &&
                  x &&
                  (de.off(),
                  pe({
                    movies:
                      Oe.data && Oe.data.pages && Oe.data.pages[Oe.data.pages.length - 1]
                        ? Oe.data.pages[Oe.data.pages.length - 1].total_results
                        : 0,
                    tv:
                      me.data && me.data.pages && me.data.pages[me.data.pages.length - 1]
                        ? me.data.pages[me.data.pages.length - 1].total_results
                        : 0,
                    people:
                      xe.data && xe.data.pages && xe.data.pages[xe.data.pages.length - 1]
                        ? xe.data.pages[xe.data.pages.length - 1].total_results
                        : 0
                  }),
                  d(
                    ot(
                      [].concat(Object(In.a)(u), [
                        { id: Object(Fe.a)(), label: x, date: K()(new Date()).toISOString(), type: 'isKeyword' }
                      ])
                    )
                  ));
              },
              [Oe.isSuccess && me.isSuccess && xe.isSuccess]
            ),
            Object(o.useEffect)(function () {
              return function () {
                e.cancel(), we();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: 'Search',
                  breadcrumbs: (function () {
                    var e = [kr, Cr];
                    if (
                      S &&
                      (e.push({ label: S, to: { pathname: '/search', search: Ie.a.stringify({ query: S }) } }), M)
                    )
                      switch (M) {
                        case 'person':
                          e.push({
                            label: 'People',
                            to: { pathname: '/search', search: Ie.a.stringify({ query: S, mediaType: 'person' }) }
                          });
                          break;
                        case 'tv':
                          e.push({
                            label: 'TV Shows',
                            to: { pathname: '/search', search: Ie.a.stringify({ query: S, mediaType: 'tv' }) }
                          });
                          break;
                        case 'movie':
                          e.push({
                            label: 'Movies',
                            to: { pathname: '/search', search: Ie.a.stringify({ query: S, mediaType: 'movie' }) }
                          });
                      }
                    return e;
                  })(),
                  children: {
                    actions: Object(he.jsx)(_e.a, {
                      in: !!M && !!x,
                      unmountOnExit: !0,
                      children: Object(he.jsxs)(Z.a, {
                        spacing: 2,
                        children: [
                          Object(he.jsx)(bn, {
                            onClick: function () {
                              return a();
                            },
                            isFullWidth: s,
                            variant: 'outlined',
                            children: 'Change media-type'
                          }),
                          M
                            ? Object(he.jsx)(Or, {
                                mediaType: M,
                                onFilter: function (e, t, n) {
                                  var o = e.find(function (e) {
                                    return e.isActive;
                                  });
                                  o && Q(o), P(t), H(n), ye(x, M || void 0);
                                }
                              })
                            : null
                        ]
                      })
                    }),
                    body: Object(he.jsxs)(Z.c, {
                      width: '100%',
                      spacing: 0,
                      children: [
                        Object(he.jsx)(Pc, {
                          keywords: ve,
                          query: x,
                          mediaType: M,
                          submittedQuery: S,
                          hasUnsubmitted: le,
                          totalResults: je,
                          isInputDisabled:
                            Oe.isFetching ||
                            Oe.isLoading ||
                            me.isFetching ||
                            me.isLoading ||
                            xe.isFetching ||
                            xe.isLoading,
                          onInputKeyPress: function (e) {
                            'Enter' === e.key && Ae(x);
                          },
                          onInputChange: function (e) {
                            y(e.target.value), de.on();
                          },
                          onSubmitQuery: Ae,
                          onClearQuery: we
                        }),
                        Object(he.jsx)(f.a, {
                          width: '100%',
                          children: Object(he.jsx)(mo.a, {
                            in: !le && S.length > 0,
                            offsetY: 100,
                            unmountOnExit: !0,
                            children: M
                              ? Object(he.jsx)(mr, {
                                  children: Object(he.jsxs)(Z.c, {
                                    width: '100%',
                                    spacing: 4,
                                    px: 2,
                                    children: [
                                      'movie' === M
                                        ? Object(he.jsx)(Wr, {
                                            isError: Oe.isError,
                                            isSuccess: Oe.isSuccess,
                                            isLoading: Oe.isFetching || Oe.isLoading,
                                            movies: (null === q || void 0 === q ? void 0 : q.results) || []
                                          })
                                        : 'tv' === M
                                        ? Object(he.jsx)(Gr, {
                                            isError: me.isError,
                                            isSuccess: me.isSuccess,
                                            isLoading: me.isFetching || me.isLoading,
                                            tv: (null === te || void 0 === te ? void 0 : te.results) || []
                                          })
                                        : 'person' === M
                                        ? Object(he.jsx)(Rr, {
                                            isError: xe.isError,
                                            isSuccess: xe.isSuccess,
                                            isLoading: xe.isFetching || xe.isLoading,
                                            people: (null === ie || void 0 === ie ? void 0 : ie.results) || []
                                          })
                                        : void 0,
                                      Object(he.jsx)(f.a, {
                                        style: { width: s ? '100%' : 'auto' },
                                        children: Object(he.jsx)(Oc, {
                                          amount:
                                            'movie' === M
                                              ? (null === q || void 0 === q ? void 0 : q.results.length) || 0
                                              : 'tv' === M
                                              ? (null === te || void 0 === te ? void 0 : te.results.length) || 0
                                              : ('person' === M &&
                                                  (null === ie || void 0 === ie ? void 0 : ie.results.length)) ||
                                                0,
                                          total:
                                            'movie' === M
                                              ? (null === q || void 0 === q ? void 0 : q.total_results) || 0
                                              : 'tv' === M
                                              ? (null === te || void 0 === te ? void 0 : te.total_results) || 0
                                              : ('person' === M &&
                                                  (null === ie || void 0 === ie ? void 0 : ie.total_results)) ||
                                                0,
                                          label: ''
                                            .concat(
                                              'movie' === M
                                                ? 'Movies'
                                                : 'tv' === M
                                                ? 'TV Shows'
                                                : 'person' === M
                                                ? 'People'
                                                : '',
                                              ' for "'
                                            )
                                            .concat(x, '"'),
                                          isLoading:
                                            'movie' === M
                                              ? Oe.isFetching || Oe.isLoading
                                              : 'tv' === M
                                              ? me.isFetching || me.isLoading
                                              : 'person' === M && (xe.isFetching || xe.isLoading),
                                          onClick: function () {
                                            return ye(
                                              S,
                                              M,
                                              'movie' === M
                                                ? ((null === q || void 0 === q ? void 0 : q.page) || 0) + 1
                                                : 'tv' === M
                                                ? ((null === te || void 0 === te ? void 0 : te.page) || 0) + 1
                                                : 'person' === M
                                                ? ((null === ie || void 0 === ie ? void 0 : ie.page) || 0) + 1
                                                : 1
                                            );
                                          }
                                        })
                                      })
                                    ]
                                  })
                                })
                              : Object(he.jsx)(Sc, { query: S, movies: Oe, tv: me, people: xe })
                          })
                        })
                      ]
                    })
                  }
                }),
                Object(he.jsx)(wr, {
                  mediaType: M,
                  isOpen: n,
                  onClose: i,
                  onSetType: function (e) {
                    return ye(S, e, 1);
                  }
                })
              ]
            })
          );
        },
        Gc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(fe.a)(),
            n = t.isOpen,
            a = t.onOpen,
            i = t.onClose,
            r = Object(O.a)('(max-width: 600px)'),
            c = Object(p.a)(r, 1)[0],
            s = Object(ge.f)(),
            l = Object(ge.h)().mediaType,
            d = w(function (e) {
              return e.app.data.sortDirection;
            }),
            u = Object(o.useState)(),
            b = Object(p.a)(u, 2),
            g = b[0],
            v = b[1],
            m = Object(o.useState)(),
            x = Object(p.a)(m, 2),
            y = x[0],
            A = x[1],
            k = Object(o.useState)([]),
            S = Object(p.a)(k, 2),
            E = S[0],
            L = S[1],
            B = Object(o.useState)([]),
            M = Object(p.a)(B, 2),
            T = M[0],
            z = M[1],
            I = Object(o.useState)(),
            F = Object(p.a)(I, 2),
            Q = F[0],
            N = F[1],
            Y = Object(o.useState)(),
            W = Object(p.a)(Y, 2),
            P = W[0],
            R = W[1],
            G = Object(o.useState)(),
            V = Object(p.a)(G, 2),
            H = V[0],
            J = V[1],
            U = Object(pc.a)(
              'trendingMovies',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/trending/movie/day', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                enabled: (g && g.length > 0 && 'movie' === g) || !1,
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    N({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        E && E.length > 0
                          ? t.filter(function (e) {
                              return E.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === y || void 0 === y ? void 0 : y.value) || '',
                        { reverse: 'desc' === d }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            ),
            q = Object(pc.a)(
              'trendingTV',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/trending/tv/day', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                enabled: (g && g.length > 0 && 'tv' === g) || !1,
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    R({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        E && E.length > 0
                          ? t.filter(function (e) {
                              return E.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === y || void 0 === y ? void 0 : y.value) || '',
                        { reverse: 'desc' === d }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            ),
            X = Object(pc.a)(
              'trendingPeople',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/trending/person/day', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                enabled: (g && g.length > 0 && 'person' === g) || !1,
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    J({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        T && T.length > 0
                          ? t.filter(function (e) {
                              return T.some(function (t) {
                                return e.known_for_department === t.value;
                              });
                            })
                          : Object(In.a)(t),
                        (null === y || void 0 === y ? void 0 : y.value) || '',
                        { reverse: 'desc' === d }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            ),
            K = function () {
              switch (g) {
                case 'movie':
                  U.refetch();
                  break;
                case 'tv':
                  q.refetch();
                  break;
                case 'person':
                  X.refetch();
              }
            };
          return (
            Object(o.useEffect)(
              function () {
                if ((v(void 0), l))
                  switch ((K(), l)) {
                    case 'person':
                      v('person');
                      break;
                    case 'tv':
                      v('tv');
                      break;
                    case 'movie':
                      v('movie');
                  }
              },
              [s.location.pathname]
            ),
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: g
                    ? 'Trending '.concat('movie' === g ? 'Movies' : 'person' === g ? 'People' : 'TV Shows')
                    : 'Trending',
                  breadcrumbs: (function () {
                    var e = [kr, Sr];
                    if (g)
                      switch (g) {
                        case 'person':
                          e.push({ label: 'People', to: { pathname: '/search/person' } });
                          break;
                        case 'tv':
                          e.push({ label: 'TV Shows', to: { pathname: '/search/tv' } });
                          break;
                        case 'movie':
                          e.push({ label: 'Movies', to: { pathname: '/search/movie' } });
                      }
                    return e;
                  })(),
                  children: {
                    actions: Object(he.jsx)(eo.a, {
                      in: !!g,
                      unmountOnExit: !0,
                      children: Object(he.jsxs)(Z.a, {
                        spacing: 2,
                        children: [
                          Object(he.jsx)(bn, {
                            onClick: function () {
                              return a();
                            },
                            isFullWidth: c,
                            variant: 'outlined',
                            children: 'Change media-type'
                          }),
                          g
                            ? Object(he.jsx)(Or, {
                                mediaType: g,
                                isDisabled: (function () {
                                  switch (g) {
                                    case 'movie':
                                      return !U.isSuccess;
                                    case 'tv':
                                      return !q.isSuccess;
                                    case 'person':
                                      return !X.isSuccess;
                                    default:
                                      return !0;
                                  }
                                })(),
                                onFilter: function (e, t, n) {
                                  var o = e.find(function (e) {
                                    return e.isActive;
                                  });
                                  o && A(o),
                                    L(t),
                                    z(n),
                                    setTimeout(function () {
                                      return K();
                                    }, 0);
                                }
                              })
                            : null
                        ]
                      })
                    }),
                    body: Object(he.jsx)(mr, {
                      children: g
                        ? Object(he.jsxs)(Z.c, {
                            width: '100%',
                            spacing: 4,
                            px: 2,
                            pt: 2,
                            children: [
                              'movie' === g
                                ? Object(he.jsx)(Wr, {
                                    isError: U.isError,
                                    isSuccess: U.isSuccess,
                                    isLoading: U.isFetching || U.isLoading,
                                    movies: (null === Q || void 0 === Q ? void 0 : Q.results) || []
                                  })
                                : 'tv' === g
                                ? Object(he.jsx)(Gr, {
                                    isError: q.isError,
                                    isSuccess: q.isSuccess,
                                    isLoading: q.isFetching || q.isLoading,
                                    tv: (null === P || void 0 === P ? void 0 : P.results) || []
                                  })
                                : 'person' === g
                                ? Object(he.jsx)(Rr, {
                                    isError: X.isError,
                                    isSuccess: X.isSuccess,
                                    isLoading: X.isFetching || X.isLoading,
                                    people: (null === H || void 0 === H ? void 0 : H.results) || []
                                  })
                                : null,
                              Object(he.jsx)(f.a, {
                                style: { width: c ? '100%' : 'auto' },
                                children: Object(he.jsx)(Oc, {
                                  amount:
                                    'movie' === g
                                      ? (null === Q || void 0 === Q ? void 0 : Q.results.length) || 0
                                      : 'tv' === g
                                      ? (null === P || void 0 === P ? void 0 : P.results.length) || 0
                                      : ('person' === g && (null === H || void 0 === H ? void 0 : H.results.length)) ||
                                        0,
                                  total:
                                    'movie' === g
                                      ? (null === Q || void 0 === Q ? void 0 : Q.total_results) || 0
                                      : 'tv' === g
                                      ? (null === P || void 0 === P ? void 0 : P.total_results) || 0
                                      : ('person' === g && (null === H || void 0 === H ? void 0 : H.total_results)) ||
                                        0,
                                  label:
                                    'movie' === g ? 'Movies' : 'tv' === g ? 'TV Shows' : 'person' === g ? 'People' : '',
                                  isLoading:
                                    'movie' === g
                                      ? U.isFetching || U.isLoading
                                      : 'tv' === g
                                      ? q.isFetching || q.isLoading
                                      : 'person' === g && (X.isFetching || X.isLoading),
                                  isButtonVisible:
                                    ('movie' === g
                                      ? U.hasNextPage
                                      : 'tv' === g
                                      ? q.hasNextPage
                                      : 'person' !== g || X.hasNextPage) &&
                                    ('movie' === g
                                      ? !U.isError
                                      : 'tv' === g
                                      ? !q.isError
                                      : 'person' === g && !X.isError),
                                  onClick: function () {
                                    return 'movie' === g
                                      ? U.fetchNextPage()
                                      : 'tv' === g
                                      ? q.fetchNextPage()
                                      : 'person' === g
                                      ? X.fetchNextPage()
                                      : void 0;
                                  }
                                })
                              })
                            ]
                          })
                        : Object(he.jsx)(f.a, {
                            width: '100%',
                            px: 2,
                            pt: 2,
                            children: Object(he.jsx)(bo, {
                              button: Object(he.jsx)(Ar, {
                                mediaType: g,
                                onSetType: function (e) {
                                  return s.push({ pathname: '/trending/'.concat(e) });
                                }
                              }),
                              hasIllustration: !1,
                              label: '',
                              size: 'xl',
                              variant: 'outlined'
                            })
                          })
                    })
                  }
                }),
                Object(he.jsx)(wr, {
                  mediaType: g,
                  isOpen: n,
                  onClose: i,
                  onSetType: function (e) {
                    return s.push({ pathname: '/trending/'.concat(e) });
                  }
                })
              ]
            })
          );
        },
        Vc = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = w(function (e) {
              return e.user.ui.theme.color;
            }),
            i = e.tv,
            r = e.title,
            c = e.pathname,
            s = e.isLoading,
            l = void 0 === s || s,
            d = e.isError,
            u = void 0 !== d && d,
            b = e.isSuccess,
            g = void 0 !== b && b;
          return Object(he.jsx)(di, {
            title: Object(he.jsx)(U.a, {
              align: 'left',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              fontSize: ['xl', 'xl', '2xl', '2xl', '2xl', '2xl'],
              fontWeight: 'semibold',
              textTransform: 'capitalize',
              children: r
            }),
            footer: Object(he.jsx)(pe, {
              to: { pathname: c },
              isFullWidth: !0,
              isDisabled: l,
              children: Object(he.jsx)(bn, {
                color: Wt(a),
                isFullWidth: !0,
                isDisabled: l,
                size: o ? 'sm' : 'md',
                variant: 'text',
                children: 'View all '.concat(r)
              })
            }),
            isLoading: l,
            children: Object(he.jsx)(Gi, { isError: u, isSuccess: g, isLoading: l, tv: i })
          });
        },
        Hc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(go.a)(
              'popularTV',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/tv/popular', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            n = Object(go.a)(
              'tvAiringToday',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/tv/airing_today', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            a = Object(go.a)(
              'onTV',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/tv/on_the_air', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            i = Object(go.a)(
              'topRatedTV',
              Object(h.a)(
                j.a.mark(function t() {
                  var n, o;
                  return j.a.wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), _.get('/tv/top_rated', { cancelToken: e.token });
                        case 2:
                          return (n = t.sent), (o = n.data), t.abrupt('return', o.results);
                        case 5:
                        case 'end':
                          return t.stop();
                      }
                  }, t);
                })
              )
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsx)(Yi, {
              title: 'TV Shows',
              breadcrumbs: [kr, Er],
              children: {
                body: Object(he.jsxs)(Z.c, {
                  spacing: 6,
                  children: [
                    Object(he.jsx)(Vc, {
                      tv: t.data,
                      title: 'Popular TV Shows',
                      pathname: '/tv/popular',
                      isError: t.isError,
                      isSuccess: t.isSuccess,
                      isLoading: t.isFetching || t.isLoading
                    }),
                    Object(he.jsx)(Vc, {
                      tv: n.data,
                      title: 'TV Shows Airing Today',
                      pathname: '/tv/airing-today',
                      isError: n.isError,
                      isSuccess: n.isSuccess,
                      isLoading: n.isFetching || n.isLoading
                    }),
                    Object(he.jsx)(Vc, {
                      tv: a.data,
                      title: 'TV Shows on at the moment',
                      pathname: '/tv/on-tv',
                      isError: a.isError,
                      isSuccess: a.isSuccess,
                      isLoading: a.isFetching || a.isLoading
                    }),
                    Object(he.jsx)(Vc, {
                      tv: i.data,
                      title: 'Top Rated TV Shows',
                      pathname: '/tv/top-rated',
                      isError: i.isError,
                      isSuccess: i.isSuccess,
                      isLoading: i.isFetching || i.isLoading
                    })
                  ]
                })
              }
            })
          );
        },
        Jc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = Object(fe.a)(),
            i = a.isOpen,
            r = a.onOpen,
            c = a.onClose,
            s = w(function (e) {
              return e.app.data.sortDirection;
            }),
            l = w(function (e) {
              return e.user.ui.theme.color;
            }),
            d = Object(o.useState)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            v = Object(o.useState)([]),
            f = Object(p.a)(v, 2),
            m = f[0],
            x = f[1],
            y = Object(o.useState)(),
            A = Object(p.a)(y, 2),
            k = A[0],
            S = A[1],
            E = Object(pc.a)(
              'tvAiringToday',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/tv/airing_today', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    S({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        m && m.length > 0
                          ? t.filter(function (e) {
                              return m.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === b || void 0 === b ? void 0 : b.value) || '',
                        { reverse: 'desc' === s }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: 'TV Shows Airing Today',
                  breadcrumbs: [kr, Er, { label: 'Airing Today,', to: { pathname: '/tv/airing-today' } }],
                  children: {
                    actions: Object(he.jsx)(Or, {
                      mediaType: 'tv',
                      isDisabled: !E.isSuccess,
                      onFilter: function (e, t) {
                        var n = e.find(function (e) {
                          return e.isActive;
                        });
                        n && g(n), x(t), E.refetch();
                      }
                    }),
                    body: Object(he.jsx)(mr, {
                      children: Object(he.jsxs)(Z.c, {
                        width: '100%',
                        spacing: 4,
                        px: 2,
                        pt: 2,
                        children: [
                          Object(he.jsx)(Gr, {
                            isError: E.isError,
                            isSuccess: E.isSuccess,
                            isLoading: E.isFetching || E.isLoading,
                            tv: (null === k || void 0 === k ? void 0 : k.results) || []
                          }),
                          Object(he.jsx)(_e.a, {
                            in: !E.isError,
                            unmountOnExit: !0,
                            style: { width: n ? '100%' : 'auto' },
                            children: Object(he.jsx)(Oc, {
                              amount: (null === k || void 0 === k ? void 0 : k.results.length) || 0,
                              total: (null === k || void 0 === k ? void 0 : k.total_results) || 0,
                              label: 'TV Shows',
                              isLoading: E.isFetching || E.isLoading,
                              isButtonVisible: (E.hasNextPage, !E.isError),
                              onClick: function () {
                                Yt(b, m) ? r() : E.fetchNextPage();
                              }
                            })
                          })
                        ]
                      })
                    })
                  }
                }),
                Object(he.jsx)(Pn, {
                  renderButton: Object(he.jsx)(bn, {
                    color: Wt(l),
                    onClick: function () {
                      return (
                        g(void 0),
                        x([]),
                        c(),
                        void setTimeout(function () {
                          E.fetchNextPage();
                        }, 0)
                      );
                    },
                    size: 'sm',
                    children: 'Load more'
                  }),
                  title: 'Filters',
                  description: 'Are you sure you want to load more TV shows? Filters will be reset!',
                  isOpen: i,
                  onClose: c
                })
              ]
            })
          );
        },
        Zc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = Object(fe.a)(),
            i = a.isOpen,
            r = a.onOpen,
            c = a.onClose,
            s = w(function (e) {
              return e.app.data.sortDirection;
            }),
            l = w(function (e) {
              return e.user.ui.theme.color;
            }),
            d = Object(o.useState)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            v = Object(o.useState)([]),
            f = Object(p.a)(v, 2),
            m = f[0],
            x = f[1],
            y = Object(o.useState)(),
            A = Object(p.a)(y, 2),
            k = A[0],
            S = A[1],
            E = Object(pc.a)(
              'onTV',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/tv/on_the_air', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    S({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        m && m.length > 0
                          ? t.filter(function (e) {
                              return m.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === b || void 0 === b ? void 0 : b.value) || '',
                        { reverse: 'desc' === s }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: 'TV Shows On At The Moment',
                  breadcrumbs: [kr, Er, { label: 'On At The Moment', to: { pathname: '/tv/on-tv' } }],
                  children: {
                    actions: Object(he.jsx)(Or, {
                      mediaType: 'tv',
                      isDisabled: !E.isSuccess,
                      onFilter: function (e, t) {
                        var n = e.find(function (e) {
                          return e.isActive;
                        });
                        n && g(n), x(t), E.refetch();
                      }
                    }),
                    body: Object(he.jsx)(mr, {
                      children: Object(he.jsxs)(Z.c, {
                        width: '100%',
                        spacing: 4,
                        px: 2,
                        pt: 2,
                        children: [
                          Object(he.jsx)(Gr, {
                            isError: E.isError,
                            isSuccess: E.isSuccess,
                            isLoading: E.isFetching || E.isLoading,
                            tv: (null === k || void 0 === k ? void 0 : k.results) || []
                          }),
                          Object(he.jsx)(_e.a, {
                            in: !E.isError,
                            unmountOnExit: !0,
                            style: { width: n ? '100%' : 'auto' },
                            children: Object(he.jsx)(Oc, {
                              amount: (null === k || void 0 === k ? void 0 : k.results.length) || 0,
                              total: (null === k || void 0 === k ? void 0 : k.total_results) || 0,
                              label: 'TV Shows',
                              isLoading: E.isFetching || E.isLoading,
                              isButtonVisible: (E.hasNextPage, !E.isError),
                              onClick: function () {
                                Yt(b, m) ? r() : E.fetchNextPage();
                              }
                            })
                          })
                        ]
                      })
                    })
                  }
                }),
                Object(he.jsx)(Pn, {
                  renderButton: Object(he.jsx)(bn, {
                    color: Wt(l),
                    onClick: function () {
                      return (
                        g(void 0),
                        x([]),
                        c(),
                        void setTimeout(function () {
                          E.fetchNextPage();
                        }, 0)
                      );
                    },
                    size: 'sm',
                    children: 'Load more'
                  }),
                  title: 'Filters',
                  description: 'Are you sure you want to load more TV shows? Filters will be reset!',
                  isOpen: i,
                  onClose: c
                })
              ]
            })
          );
        },
        Uc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = Object(fe.a)(),
            i = a.isOpen,
            r = a.onOpen,
            c = a.onClose,
            s = w(function (e) {
              return e.app.data.sortDirection;
            }),
            l = w(function (e) {
              return e.user.ui.theme.color;
            }),
            d = Object(o.useState)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            v = Object(o.useState)([]),
            f = Object(p.a)(v, 2),
            m = f[0],
            x = f[1],
            y = Object(o.useState)(),
            A = Object(p.a)(y, 2),
            k = A[0],
            S = A[1],
            E = Object(pc.a)(
              'popularTV',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/tv/popular', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    S({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        m && m.length > 0
                          ? t.filter(function (e) {
                              return m.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === b || void 0 === b ? void 0 : b.value) || '',
                        { reverse: 'desc' === s }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: 'Popular TV Shows',
                  breadcrumbs: [kr, Er, { label: 'Popular', to: { pathname: '/tv/popular' } }],
                  children: {
                    actions: Object(he.jsx)(Or, {
                      mediaType: 'tv',
                      isDisabled: !E.isSuccess,
                      onFilter: function (e, t) {
                        var n = e.find(function (e) {
                          return e.isActive;
                        });
                        n && g(n), x(t), E.refetch();
                      }
                    }),
                    body: Object(he.jsx)(mr, {
                      children: Object(he.jsxs)(Z.c, {
                        width: '100%',
                        spacing: 4,
                        px: 2,
                        pt: 2,
                        children: [
                          Object(he.jsx)(Gr, {
                            isError: E.isError,
                            isSuccess: E.isSuccess,
                            isLoading: E.isFetching || E.isLoading,
                            tv: (null === k || void 0 === k ? void 0 : k.results) || []
                          }),
                          Object(he.jsx)(_e.a, {
                            in: !E.isError,
                            unmountOnExit: !0,
                            style: { width: n ? '100%' : 'auto' },
                            children: Object(he.jsx)(Oc, {
                              amount: (null === k || void 0 === k ? void 0 : k.results.length) || 0,
                              total: (null === k || void 0 === k ? void 0 : k.total_results) || 0,
                              label: 'TV Shows',
                              isLoading: E.isFetching || E.isLoading,
                              isButtonVisible: (E.hasNextPage, !E.isError),
                              onClick: function () {
                                Yt(b, m) ? r() : E.fetchNextPage();
                              }
                            })
                          })
                        ]
                      })
                    })
                  }
                }),
                Object(he.jsx)(Pn, {
                  renderButton: Object(he.jsx)(bn, {
                    color: Wt(l),
                    onClick: function () {
                      return (
                        g(void 0),
                        x([]),
                        c(),
                        void setTimeout(function () {
                          E.fetchNextPage();
                        }, 0)
                      );
                    },
                    size: 'sm',
                    children: 'Load more'
                  }),
                  title: 'Filters',
                  description: 'Are you sure you want to load more TV shows? Filters will be reset!',
                  isOpen: i,
                  onClose: c
                })
              ]
            })
          );
        },
        qc = function () {
          var e = C.a.CancelToken.source(),
            t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            a = Object(fe.a)(),
            i = a.isOpen,
            r = a.onOpen,
            c = a.onClose,
            s = w(function (e) {
              return e.app.data.sortDirection;
            }),
            l = w(function (e) {
              return e.user.ui.theme.color;
            }),
            d = Object(o.useState)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            v = Object(o.useState)([]),
            f = Object(p.a)(v, 2),
            m = f[0],
            x = f[1],
            y = Object(o.useState)(),
            A = Object(p.a)(y, 2),
            k = A[0],
            S = A[1],
            E = Object(pc.a)(
              'topRatedTV',
              (function () {
                var t = Object(h.a)(
                  j.a.mark(function t(n) {
                    var o, a, i, r;
                    return j.a.wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (o = n.pageParam),
                              (a = void 0 === o ? 1 : o),
                              (t.next = 3),
                              _.get('/tv/top_rated', { params: { page: a }, cancelToken: e.token })
                            );
                          case 3:
                            return (i = t.sent), (r = i.data), t.abrupt('return', r);
                          case 6:
                          case 'end':
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    S({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(
                        m && m.length > 0
                          ? t.filter(function (e) {
                              return m.some(function (t) {
                                return D.a.includes(e.genre_ids, t.id);
                              });
                            })
                          : Object(In.a)(t),
                        (null === b || void 0 === b ? void 0 : b.value) || '',
                        { reverse: 'desc' === s }
                      ),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            );
          return (
            Object(o.useEffect)(function () {
              return function () {
                return e.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Yi, {
                  title: 'Top Rated TV Shows',
                  breadcrumbs: [kr, Er, { label: 'Top Rated', to: { pathname: '/tv/top-rated' } }],
                  children: {
                    actions: Object(he.jsx)(Or, {
                      mediaType: 'tv',
                      isDisabled: !E.isSuccess,
                      onFilter: function (e, t) {
                        var n = e.find(function (e) {
                          return e.isActive;
                        });
                        n && g(n), x(t), E.refetch();
                      }
                    }),
                    body: Object(he.jsx)(mr, {
                      children: Object(he.jsxs)(Z.c, {
                        width: '100%',
                        spacing: 4,
                        px: 2,
                        pt: 2,
                        children: [
                          Object(he.jsx)(Gr, {
                            isError: E.isError,
                            isSuccess: E.isSuccess,
                            isLoading: E.isFetching || E.isLoading,
                            tv: (null === k || void 0 === k ? void 0 : k.results) || []
                          }),
                          Object(he.jsx)(_e.a, {
                            in: !E.isError,
                            unmountOnExit: !0,
                            style: { width: n ? '100%' : 'auto' },
                            children: Object(he.jsx)(Oc, {
                              amount: (null === k || void 0 === k ? void 0 : k.results.length) || 0,
                              total: (null === k || void 0 === k ? void 0 : k.total_results) || 0,
                              label: 'TV Shows',
                              isLoading: E.isFetching || E.isLoading,
                              isButtonVisible: (E.hasNextPage, !E.isError),
                              onClick: function () {
                                Yt(b, m) ? r() : E.fetchNextPage();
                              }
                            })
                          })
                        ]
                      })
                    })
                  }
                }),
                Object(he.jsx)(Pn, {
                  renderButton: Object(he.jsx)(bn, {
                    color: Wt(l),
                    onClick: function () {
                      return (
                        g(void 0),
                        x([]),
                        c(),
                        void setTimeout(function () {
                          E.fetchNextPage();
                        }, 0)
                      );
                    },
                    size: 'sm',
                    children: 'Load more'
                  }),
                  title: 'Filters',
                  description: 'Are you sure you want to load more TV shows? Filters will be reset!',
                  isOpen: i,
                  onClose: c
                })
              ]
            })
          );
        },
        Xc = n(574),
        Kc = function (e) {
          var t = e.children,
            n = e.activeTab,
            o = e.onChange;
          return Object(he.jsx)(Xc.e, {
            width: '100%',
            maxWidth: '100%',
            index: n,
            onChange: o,
            variant: 'unstyled',
            isLazy: !0,
            children: t
          });
        },
        $c = function (e) {
          var t = e.label,
            n = e.badge,
            o = e.isDisabled,
            a = e.isSelected,
            i = e.size,
            r = void 0 === i ? 'md' : i,
            c = Object(v.e)(),
            s = Object(J.c)().colorMode,
            l = Object(O.a)('(max-width: 600px)'),
            d = Object(p.a)(l, 1)[0],
            u = w(function (e) {
              return e.user.ui.theme.color;
            }),
            g = (function (e, t) {
              var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              return {
                tab: {
                  'fontSize': 'sm',
                  'fontWeight': 'semibold',
                  'textTransform': 'uppercase',
                  'whiteSpace': 'nowrap',
                  'borderRadius': 'base',
                  'transition': ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out']),
                  '&:hover': { textDecoration: 'none' },
                  '&:focus': { boxShadow: 'none' }
                },
                disabled: { cursor: 'not-allowed', opacity: 0.5 },
                light: {
                  'color': n ? 'gray.50' : 'gray.400',
                  'backgroundColor': n ? ''.concat(t, '.400') : 'transparent',
                  '&:hover': {
                    color: n ? 'gray.50' : 'gray.500',
                    backgroundColor: n ? ''.concat(t, '.500') : 'transparent'
                  }
                },
                dark: {
                  'color': n ? 'gray.900' : 'gray.500',
                  'backgroundColor': n ? ''.concat(t, '.500') : 'transparent',
                  '&:hover': {
                    color: n ? 'gray.900' : 'gray.400',
                    backgroundColor: n ? ''.concat(t, '.400') : 'transparent'
                  }
                }
              };
            })(c, u, a);
          return Object(he.jsxs)(Xc.a, {
            isDisabled: o,
            isSelected: a,
            px: 'sm' === r ? 1.5 : 2,
            py: 'sm' === r ? 0.75 : 1,
            sx: Object(b.a)({}, D.a.merge(g.tab, g[s])),
            _disabled: Object(b.a)({}, g.disabled),
            children: [
              t,
              n
                ? Object(he.jsx)(yo, {
                    color: a ? Wt(u) : 'gray',
                    label: n,
                    size: d || 'sm' === r ? 'sm' : 'md',
                    ml: 1
                  })
                : null
            ]
          });
        },
        es = function (e) {
          var t = e.renderTabs,
            n = e.activeTab,
            o = e.size;
          return Object(he.jsx)(Xc.b, {
            width: '100%',
            children: Object(he.jsx)(Ca, {
              children: Object(he.jsx)(he.Fragment, {
                children: t.map(function (e, t) {
                  return Object(he.jsx)(
                    $c,
                    { label: e.label, badge: e.badge, isSelected: n === t, isDisabled: e.isDisabled || !1, size: o },
                    t
                  );
                })
              })
            })
          });
        },
        ts = function (e) {
          var t = e.children,
            n = e.activeTab;
          return Object(he.jsx)(Xc.d, {
            children: t.map(function (e, t) {
              return Object(he.jsx)(Xc.c, { as: eo.a, in: n === t, p: 0, unmountOnExit: !0, children: e }, t);
            })
          });
        },
        ns = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(J.c)().colorMode,
            a = Object(O.a)('(max-width: 600px)'),
            i = Object(p.a)(a, 1)[0],
            r = Object(hn.a)(t).height,
            c = w(function (e) {
              return e.user.ui.theme.color;
            }),
            s = e.mediaItem,
            l = e.mediaType,
            d = e.title,
            u = e.isLoading,
            g = void 0 === u || u,
            j = e.isError,
            h = void 0 !== j && j;
          return Object(he.jsxs)(Z.a, {
            ref: t,
            width: i ? '100%' : 'auto',
            divider: Object(he.jsx)(f.a, {
              width: '2px',
              height: r,
              backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
            }),
            spacing: 2,
            children: [
              Object(he.jsx)(na, {
                renderButton: function (e) {
                  var t = e.lists,
                    n = e.isBookmarked,
                    o = e.onClick;
                  return Object(he.jsx)(bn, {
                    color: n ? Wt(c) : 'gray',
                    isFullWidth: i,
                    isDisabled: h || g || !s,
                    onClick: function () {
                      return o();
                    },
                    size: 'md',
                    variant: 'outlined',
                    children: n
                      ? 'In '.concat(
                          t && 1 === ((null === t || void 0 === t ? void 0 : t.length) || 0)
                            ? ''.concat(t[0].label ? '"'.concat(t[0].label, '" list') : '')
                            : 'lists'
                        )
                      : 'Add to a list'
                  });
                },
                title: d || '',
                mediaType: l,
                mediaItem: s ? Object(b.a)({}, s) : void 0
              }),
              Object(he.jsx)(oa, {
                renderButton: function (e) {
                  var t = e.isLiked,
                    n = e.onClick;
                  return Object(he.jsx)(bn, {
                    color: t ? 'red' : 'gray',
                    isFullWidth: i,
                    isDisabled: h || g || !s,
                    leftIcon: t ? tn.a : nn.a,
                    onClick: function () {
                      return n();
                    },
                    size: 'md',
                    variant: 'outlined',
                    children: t ? 'Liked' : 'Like'
                  });
                },
                mediaType: l,
                mediaItem: s ? Object(b.a)({}, s) : void 0
              })
            ]
          });
        },
        os = function (e) {
          var t = (function (e) {
            return e.reduce(function (e, t) {
              return e.episode_count > t.episode_count ? e : t;
            });
          })(e);
          return ''
            .concat(t.episode_count, ' episode')
            .concat(0 === t.episode_count || t.episode_count > 1 ? 's' : '', ' as ')
            .concat(t.character);
        },
        as = function (e) {
          var t = (function (e) {
            return e.reduce(function (e, t) {
              return e.episode_count > t.episode_count ? e : t;
            });
          })(e);
          return ''
            .concat(t.episode_count, ' episode')
            .concat(0 === t.episode_count || t.episode_count > 1 ? 's' : '', ' as ')
            .concat(t.job);
        },
        is = function () {
          var e = Object(J.c)().colorMode;
          return Object(he.jsx)(f.a, {
            width: '100%',
            height: '2px',
            backgroundColor: 'light' === e ? 'gray.200' : 'gray.700'
          });
        },
        rs = function (e) {
          var t = e.children;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 1.5,
            px: 2,
            pb: 1.5,
            children: [Object(he.jsx)(is, {}), Object(he.jsx)(f.a, { width: 'auto', children: t })]
          });
        },
        cs = function (e) {
          var t = e.children;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 2,
            px: 2,
            pb: 2,
            children: [Object(he.jsx)(is, {}), t]
          });
        },
        ss = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.title,
            a = e.total,
            i = e.isOpen,
            r = void 0 === i || i,
            c = e.onToggle;
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            justifyContent: 'space-between',
            onClick: function () {
              return c();
            },
            p: 2,
            sx: {
              'cursor': 'pointer',
              'width': '100%',
              'backgroundColor': 'transparent',
              'transition': ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out']),
              '& .MuiSvgIcon-root': {
                color: 'light' === n ? 'gray.400' : 'gray.500',
                fontSize: ''.concat(t.fontSizes.xl, ' !important'),
                transform: 'rotate('.concat(r ? '90deg' : '0deg', ')'),
                transition: ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out'])
              },
              '&:hover': { '& .MuiSvgIcon-root': { color: 'light' === n ? 'gray.900' : 'gray.50' } }
            },
            children: [
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === n ? 'gray.400' : 'gray.500',
                fontSize: 'lg',
                fontWeight: 'semibold',
                children: o
              }),
              Object(he.jsxs)(Z.a, {
                children: [Object(he.jsx)(yo, { label: String(a), size: 'md' }), Object(he.jsx)(Se.a, { as: Te.a })]
              })
            ]
          });
        },
        ls = function (e) {
          var t = e.children,
            n = e.footer,
            o = e.id,
            a = e.title,
            i = e.total,
            r = e.isOpen,
            c = void 0 === r || r,
            s = e.onToggle,
            l = Object(v.e)(),
            d = Object(J.c)().colorMode,
            u = (function (e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return {
                panel: {
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  borderStyle: 'solid',
                  borderWidth: '2px',
                  borderRadius: 'lg',
                  transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                },
                light: {
                  'backgroundColor': 'transparent',
                  'borderColor': 'gray.200',
                  '&:hover': { backgroundColor: 'transparent', borderColor: t ? 'gray.200' : 'gray.400' },
                  '&:active': { backgroundColor: 'transparent', borderColor: t ? 'gray.200' : 'gray.400' }
                },
                dark: {
                  'backgroundColor': 'transparent',
                  'borderColor': 'gray.700',
                  '&:hover': { backgroundColor: 'transparent', borderColor: t ? 'gray.700' : 'gray.500' },
                  '&:active': { backgroundColor: 'transparent', borderColor: t ? 'gray.700' : 'gray.500' }
                }
              };
            })(l, c);
          return Object(he.jsxs)(Z.c, {
            spacing: 0,
            sx: Object(b.a)({}, D.a.merge(u.panel, u[d])),
            children: [
              Object(he.jsx)(Ga.a, { children: Object(he.jsx)('span', { id: o }) }),
              Object(he.jsx)(ss, { title: a, total: i, isOpen: c, onToggle: s }),
              Object(he.jsxs)(Be.a, {
                in: c,
                unmountOnExit: !0,
                style: { width: '100%' },
                children: [Object(he.jsx)(cs, { children: t }), n ? Object(he.jsx)(rs, { children: n }) : null]
              })
            ]
          });
        },
        ds = function (e) {
          var t = Object(O.a)('(max-width: 340px)'),
            n = Object(p.a)(t, 1)[0],
            a = Object(o.useState)(25),
            i = Object(p.a)(a, 2),
            r = i[0],
            c = i[1],
            s = e.mediaType,
            l = e.mediaItemTitle,
            d = e.cast,
            u = e.isLoading,
            b = void 0 === u || u,
            g = e.isError,
            j = void 0 !== g && g,
            h = e.isSuccess,
            v = void 0 !== h && h,
            f = e.isOpen,
            m = void 0 === f || f,
            x = e.onToggle;
          return Object(he.jsx)(ls, {
            id: 'cast',
            title: 'Cast',
            total: (null === d || void 0 === d ? void 0 : d.length) || 0,
            isOpen: m,
            onToggle: x,
            footer:
              ((null === d || void 0 === d ? void 0 : d.length) || 0) > 25
                ? Object(he.jsx)(Oc, {
                    amount: r,
                    total: (null === d || void 0 === d ? void 0 : d.length) || 0,
                    label: 'Cast Members',
                    onClick: function () {
                      return c(r + 25);
                    }
                  })
                : void 0,
            children:
              !b && j
                ? Object(he.jsx)(Pa, {
                    label: 'Oh no! Something went wrong',
                    description: 'Failed to fetch '
                      .concat(l ? '"'.concat(l, '"') : '', ' ')
                      .concat('tv' === s ? 'tv show' : 'movie', ' cast list!'),
                    variant: 'outlined'
                  })
                : !b && v && d && 0 === d.length
                ? Object(he.jsx)(bo, {
                    label: ''
                      .concat(l ? '"'.concat(l, '"') : '', ' ')
                      .concat('tv' === s ? 'tv show' : 'movie', ' cast list is currently empty!'),
                    variant: 'outlined'
                  })
                : !b && v && d && d.length > 0
                ? Object(he.jsx)(En.a, {
                    width: '100%',
                    columns: [n ? 1 : 2, 2, 3, 4, 4, 5],
                    spacing: 2,
                    children: d
                      .filter(function (e, t) {
                        return t < r;
                      })
                      .map(function (e) {
                        return Object(he.jsx)(
                          vi,
                          {
                            width: '100%',
                            mediaItem: e
                              ? {
                                  known_for_department: e.known_for_department || '',
                                  id: e.id || -1,
                                  name: e.name || '',
                                  gender: e.gender || 0,
                                  popularity: e.popularity || -1,
                                  profile_path: e.profile_path || null,
                                  adult: e.adult || !1,
                                  known_for: void 0
                                }
                              : void 0,
                            mediaType: 'person',
                            image: {
                              alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                              src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                              size: { thumbnail: 'w45', full: 'original' }
                            },
                            title: (null === e || void 0 === e ? void 0 : e.name) || '',
                            subtitle:
                              'movie' === s && e.character
                                ? 'As '.concat(e.character)
                                : 'tv' === s && e.roles && e.roles.length > 0
                                ? os(e.roles)
                                : 'N/A',
                            isLoading: b
                          },
                          e.id
                        );
                      })
                  })
                : Object(he.jsx)(En.a, {
                    width: '100%',
                    columns: [n ? 1 : 2, 2, 3, 4, 4, 5],
                    spacing: 2,
                    children: D.a.range(0, 20).map(function (e, t) {
                      return Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaType: 'person',
                          title: 'Lorem ipsum',
                          subtitle: 'Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                    })
                  })
          });
        },
        us = function (e) {
          var t = Object(O.a)('(max-width: 340px)'),
            n = Object(p.a)(t, 1)[0],
            a = Object(o.useState)(25),
            i = Object(p.a)(a, 2),
            r = i[0],
            c = i[1],
            s = e.mediaType,
            l = e.mediaItemTitle,
            d = e.crew,
            u = e.title,
            b = e.isLoading,
            g = void 0 === b || b,
            j = e.isError,
            h = void 0 !== j && j,
            v = e.isSuccess,
            f = void 0 !== v && v,
            m = e.isOpen,
            x = void 0 === m || m,
            y = e.onToggle;
          return Object(he.jsx)(ls, {
            id: ''.concat(u.toLowerCase(), '-crew'),
            title: u,
            total: (null === d || void 0 === d ? void 0 : d.length) || 0,
            isOpen: x,
            onToggle: y,
            footer:
              ((null === d || void 0 === d ? void 0 : d.length) || 0) > 25
                ? Object(he.jsx)(Oc, {
                    amount: r,
                    total: (null === d || void 0 === d ? void 0 : d.length) || 0,
                    label: ''.concat(u, ' Members'),
                    onClick: function () {
                      return c(r + 25);
                    }
                  })
                : void 0,
            children:
              !g && h
                ? Object(he.jsx)(Pa, {
                    label: 'Oh no! Something went wrong',
                    description: 'Failed to fetch '
                      .concat(l ? '"'.concat(l, '"') : '', ' ')
                      .concat('tv' === s ? 'tv show' : 'movie', ' ')
                      .concat(u, ' crew list!'),
                    variant: 'outlined'
                  })
                : !g && f && d && 0 === d.length
                ? Object(he.jsx)(bo, {
                    label: ''
                      .concat(l ? '"'.concat(l, '"') : '', ' ')
                      .concat('tv' === s ? 'tv show' : 'movie', ' ')
                      .concat(u, ' crew list is currently empty!'),
                    variant: 'outlined'
                  })
                : !g && f && d && d.length > 0
                ? Object(he.jsx)(En.a, {
                    width: '100%',
                    columns: [n ? 1 : 2, 2, 3, 4, 4, 5],
                    spacing: 2,
                    children: d
                      .filter(function (e, t) {
                        return t < r;
                      })
                      .map(function (e) {
                        return Object(he.jsx)(
                          vi,
                          {
                            width: '100%',
                            mediaItem: e
                              ? {
                                  known_for_department: e.known_for_department || '',
                                  id: e.id || -1,
                                  name: e.name || '',
                                  gender: e.gender || 0,
                                  popularity: e.popularity || -1,
                                  profile_path: e.profile_path || null,
                                  adult: e.adult || !1,
                                  known_for: void 0
                                }
                              : void 0,
                            mediaType: 'person',
                            image: {
                              alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                              src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                              size: { thumbnail: 'w45', full: 'original' }
                            },
                            title: (null === e || void 0 === e ? void 0 : e.name) || '',
                            subtitle:
                              'movie' === s && e.job
                                ? e.job
                                : 'tv' === s && e.jobs && e.jobs.length > 0
                                ? as(e.jobs)
                                : 'N/A',
                            isLoading: !1
                          },
                          e.id
                        );
                      })
                  })
                : Object(he.jsx)(En.a, {
                    width: '100%',
                    columns: [n ? 1 : 2, 2, 3, 4, 4, 5],
                    spacing: 2,
                    children: D.a.range(0, 20).map(function (e, t) {
                      return Object(he.jsx)(
                        vi,
                        {
                          width: '100%',
                          mediaType: 'person',
                          title: 'Lorem ipsum',
                          subtitle: 'Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                    })
                  })
          });
        },
        bs = Gt(200, 4),
        gs = function (e) {
          var t = Object(J.c)().colorMode,
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = e.departments,
            a = e.openedPanels,
            i = e.isLoading,
            r = void 0 === i || i,
            c = e.onTogglePanel,
            s = e.onToggleAllPanels;
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'stretch',
            spacing: r ? 1 : 0,
            children: [
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === t ? 'gray.400' : 'gray.500',
                fontSize: 'sm',
                whiteSpace: 'nowrap',
                py: 0.75,
                children: 'Jump to:'
              }),
              Object(he.jsx)(Ca, {
                width: 'calc(100% - '.concat(o.length === a ? 140.1 : 148.19, 'px)'),
                spacing: '0',
                isLoading: r,
                children: Object(he.jsx)(Z.a, {
                  width: '100%',
                  maxWidth: '100%',
                  divider: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === t ? 'gray.400' : 'gray.500',
                    fontSize: 'md',
                    mx: r ? 0.75 : 0,
                    children: '\u2022'
                  }),
                  children: Object(In.a)(r ? D.a.range(0, 4) : o).map(function (e, t) {
                    return Object(he.jsx)(
                      Zo,
                      {
                        width: r ? ''.concat(bs[Math.floor(Math.random() * bs.length)], 'px') : 'auto',
                        offsetY: 6,
                        isLoaded: !r,
                        children: Object(he.jsx)(oi.Link, {
                          to: ''.concat(
                            'number' !== typeof e ? ''.concat(e.toLowerCase()).concat('cast' !== e ? '-crew' : '') : ''
                          ),
                          spy: !0,
                          smooth: !0,
                          isDynamic: !1,
                          offset: -82,
                          delay: 1e3,
                          children: Object(he.jsx)(bn, {
                            color: Wt(n),
                            onClick:
                              'number' !== typeof e
                                ? function () {
                                    return c(
                                      o.findIndex(function (t) {
                                        return t === e;
                                      })
                                    );
                                  }
                                : void 0,
                            isDisabled: r,
                            size: 'sm',
                            variant: 'text',
                            children: 'number' !== typeof e ? e : 'Lorem'
                          })
                        })
                      },
                      t
                    );
                  })
                })
              }),
              Object(he.jsx)(bn, {
                isDisabled: r,
                onClick: function () {
                  return s();
                },
                size: 'sm',
                variant: 'text',
                children: o.length === a ? 'Hide all' : 'Show all'
              })
            ]
          });
        },
        js = function (e) {
          var t = Object(o.useState)([0]),
            n = Object(p.a)(t, 2),
            a = n[0],
            i = n[1],
            r = e.mediaType,
            c = e.mediaItemTitle,
            s = e.cast,
            l = e.crew,
            d = e.isError,
            u = void 0 !== d && d,
            g = e.isSuccess,
            j = void 0 !== g && g,
            h = e.isLoading,
            v = void 0 === h || h,
            O = function (e) {
              a.includes(e)
                ? i(
                    a.filter(function (t) {
                      return t !== e;
                    })
                  )
                : i([].concat(Object(In.a)(a), [e]));
            },
            f = (function () {
              var e = [];
              return (
                null === l ||
                  void 0 === l ||
                  l.forEach(function (t) {
                    e.some(function (e) {
                      return e.title === t.department;
                    })
                      ? (e = e.map(function (e) {
                          return e.title === t.department
                            ? Object(b.a)(
                                Object(b.a)({}, e),
                                {},
                                {
                                  crew: e.crew.some(function (e) {
                                    return e.id === t.id;
                                  })
                                    ? e.crew.map(function (e) {
                                        return e.id === t.id
                                          ? Object(b.a)(
                                              Object(b.a)({}, e),
                                              {},
                                              {
                                                job: [e.job, t.job]
                                                  .filter(function (e) {
                                                    return e;
                                                  })
                                                  .join(', ')
                                              }
                                            )
                                          : e;
                                      })
                                    : [].concat(Object(In.a)(e.crew), [t])
                                }
                              )
                            : e;
                        }))
                      : e.push({ title: t.department || '', crew: [t] });
                  }),
                ua()(Object(In.a)(e), 'title')
              );
            })();
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 2,
            children: [
              Object(he.jsx)(gs, {
                departments: ['cast'].concat(
                  Object(In.a)(
                    f.map(function (e) {
                      return e.title;
                    })
                  )
                ),
                openedPanels: a.length,
                isLoading: v,
                onTogglePanel: function (e) {
                  return i([].concat(Object(In.a)(a), [e]));
                },
                onToggleAllPanels: function () {
                  f.length === a.length - 1
                    ? i([])
                    : i(
                        [0].concat(
                          Object(In.a)(
                            f.map(function (e, t) {
                              return t + 1;
                            })
                          )
                        )
                      );
                }
              }),
              Object(he.jsxs)(Z.c, {
                width: '100%',
                spacing: 2,
                children: [
                  Object(he.jsx)(ds, {
                    mediaType: r,
                    mediaItemTitle: c,
                    cast: s,
                    isLoading: v,
                    isError: u,
                    isSuccess: j,
                    isOpen: a.includes(0),
                    onToggle: function () {
                      return O(0);
                    }
                  }),
                  f.map(function (e, t) {
                    return Object(he.jsx)(
                      us,
                      {
                        mediaType: r,
                        mediaItemTitle: c,
                        title: e.title,
                        crew: e.crew,
                        isLoading: v,
                        isError: u,
                        isSuccess: j,
                        isOpen: a.includes(t + 1),
                        onToggle: function () {
                          return O(t + 1);
                        }
                      },
                      t
                    );
                  })
                ]
              })
            ]
          });
        },
        hs = function (e) {
          var t = e.children,
            n = e.title,
            o = e.actions;
          return Object(he.jsx)(wn, {
            box: { header: { pb: 1.5 }, body: { pt: 1.5 } },
            isFullWidth: !0,
            variant: 'transparent',
            children: {
              header: { title: n, actions: o },
              body: Object(he.jsx)(Z.c, { width: '100%', spacing: 2, children: t })
            }
          });
        },
        ps = function (e) {
          var t = Object(o.useRef)(null),
            n = Object(J.c)().colorMode,
            a = Object(hn.e)().width,
            i = Object(hn.a)(t).height,
            r = e.content,
            c = e.isLoading,
            s = void 0 === c || c,
            l = Object(Le.a)(),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = Object(o.useState)(),
            j = Object(p.a)(g, 2),
            h = j[0],
            v = j[1],
            O = Object(o.useCallback)(
              D.a.debounce(function (e) {
                e ? v(e.offsetHeight) : O(t.current);
              }, 250),
              [t]
            );
          return (
            Object(o.useEffect)(
              function () {
                b.off();
              },
              [s]
            ),
            Object(o.useEffect)(
              function () {
                O(t.current);
              },
              [a]
            ),
            Object(o.useEffect)(function () {
              return function () {
                v(void 0), b.off();
              };
            }, []),
            Object(he.jsxs)(Z.c, {
              width: '100%',
              maxWidth: '100%',
              spacing: 2,
              children: [
                !s && r
                  ? Object(he.jsx)(Be.a, {
                      in: u,
                      startingHeight: (h || 176) >= 176 ? 176 : i || 176,
                      style: { width: 'inherit', maxWidth: 'inherit' },
                      children: Object(he.jsx)(Z.c, {
                        ref: t,
                        width: '100%',
                        maxWidth: '100%',
                        alignItems: 'flex-start',
                        spacing: 2,
                        children: Tt(r)
                          .filter(function (e) {
                            return e;
                          })
                          .map(function (e, t) {
                            return Object(he.jsx)(
                              U.a,
                              {
                                align: 'left',
                                color: 'light' === n ? 'gray.900' : 'gray.50',
                                fontSize: 'md',
                                fontWeight: 'medium',
                                children: e
                              },
                              t
                            );
                          })
                      })
                    })
                  : Object(he.jsx)(Z.c, {
                      width: '100%',
                      spacing: 1,
                      children: D.a.range(0, 3).map(function (e, t) {
                        return Object(he.jsx)(
                          Zo,
                          {
                            width: '100%',
                            offsetY: 6,
                            isLoaded: !s,
                            children: Object(he.jsx)(U.a, {
                              align: 'left',
                              fontSize: 'xs',
                              children: 'Lorem ipsum dolor sit amet'
                            })
                          },
                          t
                        );
                      })
                    }),
                Object(he.jsx)(_e.a, {
                  in: (h || 0) > 176,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsx)(bn, {
                    isFullWidth: !0,
                    isDisabled: s,
                    onClick: function () {
                      return b.toggle();
                    },
                    size: 'sm',
                    variant: 'text',
                    children: 'Read '.concat(u ? 'Less' : 'More')
                  })
                })
              ]
            })
          );
        },
        vs = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.date,
            o = e.renderActions;
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            justifyContent: 'space-between',
            children: [
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === t ? 'gray.400' : 'gray.500',
                fontSize: 'xs',
                children: n
              }),
              o
            ]
          });
        },
        Os = function (e) {
          var t = Object(J.c)().colorMode,
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = e.avatar,
            i = e.name,
            r = e.username,
            c = e.date,
            s = e.isLoading,
            l = void 0 === s || s,
            d = function () {
              return a && '/' === a.charAt(0) ? a.substring(1) : a || '';
            };
          return Object(he.jsxs)(Z.a, {
            children: [
              Object(he.jsx)(wo.a, {
                width: '48px',
                borderRadius: 'full',
                ratio: 1,
                children: Object(he.jsx)(Ho, {
                  borderRadius: 'full',
                  isLoaded: !l,
                  children: Object(he.jsx)(Oo, {
                    alt: ''.concat(i, ' (').concat(r, ') Avatar'),
                    borderRadius: 'full',
                    mediaType: 'person',
                    thumbnailSrc: d() || '',
                    fullSrc: d() || ''
                  })
                })
              }),
              Object(he.jsxs)(Z.c, {
                alignItems: 'flex-start',
                spacing: l ? 0.5 : 0,
                children: [
                  Object(he.jsx)(Zo, {
                    isLoaded: !l,
                    offsetY: 10,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === t ? 'gray.900' : 'gray.50',
                      fontSize: 'xl',
                      fontWeight: 'semibold',
                      children: o ? i : 'Review by '.concat(i)
                    })
                  }),
                  Object(he.jsx)(Z.a, {
                    divider: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === t ? 'gray.400' : 'gray.500',
                      fontSize: 'sm',
                      mx: 0.75,
                      children: '\u2022'
                    }),
                    children: [l ? '@Lorem' : '@'.concat(r), c ? K()(c).format('LLL') : void 0]
                      .filter(function (e) {
                        return e;
                      })
                      .map(function (e, n) {
                        return Object(he.jsx)(
                          Zo,
                          {
                            isLoaded: !l,
                            offsetY: 6,
                            children: Object(he.jsx)(U.a, {
                              align: 'left',
                              color: 'light' === t ? 'gray.400' : 'gray.500',
                              fontSize: 'sm',
                              children: e
                            })
                          },
                          n
                        );
                      })
                  })
                ]
              })
            ]
          });
        },
        fs = function (e) {
          var t = Object(v.e)(),
            n = Object(O.a)('(max-width: 600px)'),
            o = Object(p.a)(n, 1)[0],
            a = Object($n.a)({
              'base': t.fontSizes['2xl'],
              'sm': t.fontSizes['2xl'],
              'md': t.fontSizes['3xl'],
              'lg': t.fontSizes['3xl'],
              'xl': t.fontSizes['3xl'],
              '2xl': t.fontSizes['3xl']
            }),
            i = e.renderFooterActions,
            r = e.review,
            c = e.isLoading,
            s = void 0 === c || c,
            l = r || {},
            d = l.author,
            u = l.author_details,
            b = l.created_at,
            g = l.updated_at,
            j = l.content,
            h = g && !K()(g).isSame(b),
            f = h || o || !1 || i;
          return Object(he.jsx)(wn, {
            box: { header: { pb: 1.5 }, body: { pt: 1.5, pb: f ? 1.5 : 0 }, footer: { pt: f ? 1 : 0 } },
            isFullWidth: !0,
            px: 2,
            pt: 1.5,
            pb: 1,
            children: {
              header: {
                title: Object(he.jsx)(Os, {
                  avatar: (null === u || void 0 === u ? void 0 : u.avatar_path) || '',
                  name: (null === u || void 0 === u ? void 0 : u.name) || d || '',
                  username: (null === u || void 0 === u ? void 0 : u.username) || '',
                  date: o ? '' : b,
                  isLoading: s
                }),
                actions: Object(he.jsx)(mo.a, {
                  in: s || Boolean(null === u || void 0 === u ? void 0 : u.rating),
                  unmountOnExit: !0,
                  children: Object(he.jsx)($o, {
                    rating: { rating: (null === u || void 0 === u ? void 0 : u.rating) || null, count: null },
                    isLoading: s,
                    iconFontsize: a,
                    textFontsize: ['lg', 'lg', 'xl', 'xl', 'xl', 'xl']
                  })
                })
              },
              body: Object(he.jsx)(ps, { content: j, isLoading: s }),
              footer: f
                ? Object(he.jsx)(vs, {
                    date: h ? '* Updated on: '.concat(K()(g).format('LLL')) : o ? K()(b).format('LLL') : '',
                    renderActions: i
                  })
                : void 0
            }
          });
        },
        ms = n(557),
        xs = n(558),
        ys = n(559),
        As = n(560),
        ws = function (e) {
          var t = Object(r.b)(),
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = w(function (e) {
              return e.user.data.reviews.other;
            }),
            a = e.review,
            i = e.state,
            c = e.label,
            s = e.isDisabled,
            l = void 0 !== s && s,
            d = (a || {}).id,
            u = Object(Le.a)(),
            g = Object(p.a)(u, 2),
            j = g[0],
            h = g[1],
            v =
              o.some(function (e) {
                return e.id === d && (null === e || void 0 === e ? void 0 : e.state) === i;
              }) || !1;
          return Object(he.jsx)(Ht, {
            'aria-label': v ? 'Un-'.concat(c, ' review') : ''.concat(c, ' review'),
            'label': v ? 'Un-'.concat(c, ' review') : ''.concat(c, ' review'),
            'isOpen': j,
            'placement': 'top',
            'gutter': 4,
            'children': Object(he.jsx)(Ee, {
              'aria-label': v ? 'Un-'.concat(c, ' review') : ''.concat(c, ' review'),
              'color': v ? Wt(n) : 'gray',
              'icon': 'isLiked' === i ? (v ? ms.a : xs.a) : v ? ys.a : As.a,
              'isDisabled': l,
              'onClick': function () {
                a &&
                  (o.some(function (e) {
                    return e.id === d;
                  })
                    ? t(
                        ct(
                          o.map(function (e) {
                            return e.id === d ? Object(b.a)(Object(b.a)({}, e), {}, { state: v ? void 0 : i }) : e;
                          })
                        )
                      )
                    : t(ct([].concat(Object(In.a)(o), [Object(b.a)(Object(b.a)({}, a), {}, { state: i })]))));
              },
              'onMouseEnter': function () {
                return h.on();
              },
              'onMouseLeave': function () {
                return h.off();
              },
              'variant': 'icon'
            })
          });
        },
        ks = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.mediaItem,
            a = e.mediaType,
            i = e.reviews,
            r = e.isError,
            c = void 0 !== r && r,
            s = e.isSuccess,
            l = void 0 !== s && s,
            d = e.isLoading,
            u = void 0 === d || d,
            b = e.hasNextPage,
            g = void 0 !== b && b,
            j = e.onFetchNextPage;
          return Object(he.jsx)(hs, {
            title: 'Reviews',
            actions:
              ((null === i || void 0 === i ? void 0 : i.results.length) || 0) > 0
                ? Object(he.jsx)(yo, {
                    label: String(null === i || void 0 === i ? void 0 : i.results.length),
                    size: n ? 'sm' : 'md'
                  })
                : void 0,
            children:
              !u && c
                ? Object(he.jsx)(Pa, {
                    label: 'Oh no! Something went wrong',
                    description: 'Failed to fetch '
                      .concat(o && (o.title || o.name) ? '"'.concat(o.title || o.name, '"') : '', ' ')
                      .concat('tv' === a ? 'tv show' : 'movie', ' reviews!'),
                    variant: 'outlined',
                    size: 'sm'
                  })
                : !u && l && i && 0 === i.results.length
                ? Object(he.jsx)(bo, {
                    label: ''
                      .concat(o && (o.title || o.name) ? '"'.concat(o.title || o.name, '"') : '', ' ')
                      .concat('tv' === a ? 'tv show' : 'movie', ' has no reviews!'),
                    variant: 'outlined',
                    size: 'sm'
                  })
                : !u && l && i && i.results.length > 0
                ? Object(he.jsxs)(he.Fragment, {
                    children: [
                      null === i || void 0 === i
                        ? void 0
                        : i.results.map(function (e) {
                            return Object(he.jsx)(
                              fs,
                              {
                                renderFooterActions: Object(he.jsxs)(Z.a, {
                                  spacing: 0,
                                  children: [
                                    Object(he.jsx)(ws, { review: e, state: 'isLiked', label: 'Like', isDisabled: u }),
                                    Object(he.jsx)(ws, {
                                      review: e,
                                      state: 'isDisliked',
                                      label: 'Dislike',
                                      isDisabled: u
                                    })
                                  ]
                                }),
                                review: e,
                                isLoading: u
                              },
                              e.id
                            );
                          }),
                      Object(he.jsx)(_e.a, {
                        in: !c && g,
                        unmountOnExit: !0,
                        style: { width: n ? '100%' : 'auto' },
                        children: Object(he.jsx)(Oc, {
                          amount: (null === i || void 0 === i ? void 0 : i.results.length) || 0,
                          total: (null === i || void 0 === i ? void 0 : i.total_results) || 0,
                          label: 'Reviews',
                          isLoading: u,
                          isButtonVisible: g && !c,
                          onClick: j
                        })
                      })
                    ]
                  })
                : Object(he.jsx)(Z.c, {
                    width: '100%',
                    spacing: 4,
                    children: D.a.range(0, 5).map(function (e, t) {
                      return Object(he.jsx)(
                        fs,
                        {
                          renderFooterActions: Object(he.jsxs)(Z.a, {
                            spacing: 0,
                            children: [
                              Object(he.jsx)(ws, { state: 'isLiked', label: 'Like', isDisabled: u }),
                              Object(he.jsx)(ws, { state: 'isDisliked', label: 'Dislike', isDisabled: u })
                            ]
                          }),
                          isLoading: !0
                        },
                        t
                      );
                    })
                  })
          });
        },
        Cs = n(561),
        Ss = n(562),
        Ds = function (e) {
          var t = e.value,
            n = e.hoveringNumber,
            o = e.isChecked,
            a = e.onChange,
            i = e.onHover,
            r = Object(v.e)(),
            c = Object(J.c)().colorMode,
            s = Object(O.a)('(max-width: 600px)'),
            l = Object(p.a)(s, 1)[0];
          return Object(he.jsx)(f.a, {
            cursor: 'pointer',
            p: l ? 0.5 : 1,
            onClick: function () {
              return a(t);
            },
            onMouseEnter: function () {
              return i(t);
            },
            onMouseLeave: function () {
              return i(0);
            },
            _focus: { boxShadow: 'none' },
            _hover: { transform: 'scale(1.25)', color: 'yellow.'.concat('light' === c ? 400 : 500) },
            sx: {
              color: o || t < n ? 'yellow.'.concat('light' === c ? 400 : 500) : 'light' === c ? 'gray.400' : 'gray.500',
              transition: ''.concat(r.transition.duration.faster, ' ').concat(r.transition.easing['ease-out'])
            },
            children: Object(he.jsx)(Se.a, {
              as: o ? Cs.a : Ss.a,
              sx: {
                fontSize: ''.concat(l ? r.fontSizes.xl : r.fontSizes['2xl'], ' !important'),
                transition: ''.concat(r.transition.duration.faster, ' ').concat(r.transition.easing['ease-out'])
              }
            })
          });
        },
        Es = function (e) {
          var t = e.name,
            n = e.onChange,
            a = e.value,
            i = Object(o.useState)(0),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1];
          return Object(he.jsx)(Z.a, {
            'width': '100%',
            'aria-label': t,
            'justifyContent': 'space-between',
            'spacing': 0,
            'children': D.a.range(1, 11).map(function (e, t) {
              return Object(he.jsx)(
                Ds,
                {
                  value: e,
                  hoveringNumber: c,
                  isChecked: e === a || e < a,
                  onChange: n,
                  onHover: function (e) {
                    return s(e);
                  }
                },
                t
              );
            })
          });
        },
        Ls = { review: '', rating: 0 },
        _s = Rn.b().shape({ review: Rn.c().required().label('Review'), rating: Rn.a().nullable().label('Rating') }),
        Bs = function (e) {
          var t = e.mediaItem,
            n = e.mediaType,
            o = Object(J.c)().colorMode,
            a = Object(fe.a)(),
            i = a.isOpen,
            c = a.onOpen,
            s = a.onClose,
            l = Object(fe.a)(),
            d = l.isOpen,
            u = l.onOpen,
            g = l.onClose,
            j = Object(r.b)(),
            h = w(function (e) {
              return e.user.data.reviews.user;
            }),
            p = w(function (e) {
              return e.user.ui.theme.color;
            }),
            v = Object(On.e)({ defaultValues: Ls, reValidateMode: 'onSubmit', resolver: Object(Wn.a)(_s) }),
            O = Object(On.f)({ control: v.control }).isDirty,
            f = function () {
              v.reset(Object(b.a)({}, Ls)), s();
            };
          return Object(he.jsxs)(he.Fragment, {
            children: [
              Object(he.jsx)(bn, {
                color: Wt(p),
                onClick: function () {
                  return c();
                },
                size: 'sm',
                children: 'Create a new review'
              }),
              Object(he.jsx)(pn, {
                title: 'Create a new review',
                actions: Object(he.jsx)(bn, {
                  color: Wt(p),
                  isDisabled: !O,
                  onClick: v.handleSubmit(function (e) {
                    return (function (e) {
                      var o = Object(Fe.a)();
                      j(
                        rt(
                          [].concat(Object(In.a)(h), [
                            {
                              id: o,
                              author: 'Name',
                              author_details: { name: 'Name', username: 'Username', avatar_path: '', rating: e.rating },
                              content: e.review,
                              created_at: K()(new Date()).toISOString(),
                              updated_at: K()(new Date()).toISOString(),
                              mediaItem: Object(b.a)(Object(b.a)({}, t), {}, { mediaType: n })
                            }
                          ])
                        )
                      ),
                        f();
                    })(e);
                  }),
                  size: 'sm',
                  children: 'Submit Review'
                }),
                isOpen: i,
                onClose: function () {
                  O ? u() : f();
                },
                isCentered: !0,
                size: 'lg',
                children: Object(he.jsxs)(Z.c, {
                  spacing: 3,
                  p: 2,
                  children: [
                    Object(he.jsx)(On.a, {
                      control: v.control,
                      name: 'rating',
                      render: function (e) {
                        var t = e.field,
                          n = t.value,
                          a = t.name,
                          i = e.fieldState.error;
                        return Object(he.jsx)(wn, {
                          box: { header: { pb: 1.5 }, body: { pt: 1 } },
                          color: i ? 'red' : 'gray',
                          isFullWidth: !0,
                          px: 2,
                          pt: 1.5,
                          pb: 1,
                          children: {
                            header: {
                              title: Object(he.jsx)(U.a, {
                                color: 'light' === o ? 'gray.900' : 'gray.50',
                                fontSize: 'sm',
                                fontWeight: 'medium',
                                children: 'Rating'
                              }),
                              actions: Object(he.jsx)(U.a, {
                                color: 'light' === o ? 'gray.400' : 'gray.500',
                                fontSize: 'sm',
                                children: ''.concat(n, ' stars')
                              })
                            },
                            body: Object(he.jsx)(Es, {
                              name: a,
                              onChange: function (e) {
                                return v.setValue('rating', e, { shouldDirty: !0 });
                              },
                              value: n || 0
                            }),
                            footer: i
                              ? Object(he.jsx)(Be.a, {
                                  in: Boolean(i),
                                  unmountOnExit: !0,
                                  children: Object(he.jsx)(U.a, {
                                    color: 'light' === o ? 'gray.400' : 'gray.500',
                                    fontSize: 'xs',
                                    children: i
                                  })
                                })
                              : void 0
                          }
                        });
                      }
                    }),
                    Object(he.jsx)(On.a, {
                      control: v.control,
                      name: 'review',
                      render: function (e) {
                        var t = e.field,
                          n = t.onChange,
                          o = t.value,
                          a = t.name,
                          i = e.fieldState.error;
                        return Object(he.jsxs)(Fn.a, {
                          id: a,
                          isRequired: !0,
                          children: [
                            Object(he.jsx)(Qn.a, { fontSize: 'sm', mb: 1, children: 'Review' }),
                            Object(he.jsx)(Yn.a, {
                              autoComplete: 'off',
                              border: 'solid2',
                              boxShadow: 'none',
                              errorBorderColor: 'red.400',
                              focusBorderColor: ''.concat(Wt(p), '.400'),
                              isInvalid: Boolean(i),
                              fontSize: 'md',
                              name: a,
                              onChange: n,
                              size: 'lg',
                              value: o,
                              px: 2
                            }),
                            Object(he.jsx)(Be.a, {
                              in: Boolean(i),
                              unmountOnExit: !0,
                              children: Object(he.jsx)(Fn.b, {
                                mt: 1,
                                children: null === i || void 0 === i ? void 0 : i.message
                              })
                            })
                          ]
                        });
                      }
                    })
                  ]
                })
              }),
              Object(he.jsx)(Pn, {
                renderButton: Object(he.jsx)(bn, {
                  color: Wt(p),
                  onClick: function () {
                    return g(), void f();
                  },
                  size: 'sm',
                  children: 'Close'
                }),
                title: 'Unsaved data!',
                description:
                  'Are you sure you want to close the modal, the data inserted will be lost unless you save it!',
                isOpen: d,
                onClose: g
              })
            ]
          });
        },
        Ms = function (e) {
          var t = e.id,
            n = Object(fe.a)(),
            o = n.isOpen,
            a = n.onOpen,
            i = n.onClose,
            c = Object(r.b)(),
            s = w(function (e) {
              return e.user.data.reviews.user;
            }),
            l = Object(Le.a)(),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1];
          return Object(he.jsxs)(he.Fragment, {
            children: [
              Object(he.jsx)(Ht, {
                'aria-label': 'Delete review',
                'label': 'Delete review',
                'isOpen': u,
                'placement': 'top',
                'gutter': 6,
                'children': Object(he.jsx)(Ee, {
                  'aria-label': 'Delete review',
                  'color': u ? 'red' : 'gray',
                  'icon': uc.a,
                  'onClick': function () {
                    return a();
                  },
                  'onMouseEnter': function () {
                    return b.on();
                  },
                  'onMouseLeave': function () {
                    return b.off();
                  },
                  'variant': 'icon',
                  'size': 'sm'
                })
              }),
              Object(he.jsx)(Pn, {
                renderButton: Object(he.jsx)(bn, {
                  color: 'red',
                  onClick: function () {
                    return (
                      c(
                        rt(
                          s.filter(function (e) {
                            return e.id !== t;
                          })
                        )
                      ),
                      void i()
                    );
                  },
                  size: 'sm',
                  children: 'Delete'
                }),
                title: 'Delete review',
                description:
                  'Are you sure you want to delete the review? You will not be able to retrieve this review back!',
                isOpen: o,
                onClose: i
              })
            ]
          });
        },
        Ts = { review: '', rating: 0 },
        zs = Rn.b().shape({ review: Rn.c().required().label('Review'), rating: Rn.a().nullable().label('Rating') }),
        Is = function (e) {
          var t = e.review,
            n = Object(J.c)().colorMode,
            a = Object(fe.a)(),
            i = a.isOpen,
            c = a.onOpen,
            s = a.onClose,
            l = Object(fe.a)(),
            d = l.isOpen,
            u = l.onOpen,
            g = l.onClose,
            j = Object(r.b)(),
            h = w(function (e) {
              return e.user.data.reviews.user;
            }),
            v = w(function (e) {
              return e.user.ui.theme.color;
            }),
            O = t.id,
            f = Object(Le.a)(),
            m = Object(p.a)(f, 2),
            x = m[0],
            y = m[1],
            A = Object(On.e)({ defaultValues: Ts, reValidateMode: 'onSubmit', resolver: Object(Wn.a)(zs) }),
            k = Object(On.f)({ control: A.control }).isDirty,
            C = function () {
              A.reset(Object(b.a)({}, Ts)), s();
            };
          return (
            Object(o.useEffect)(
              function () {
                i && t && A.reset({ rating: t.author_details.rating, review: t.content });
              },
              [i]
            ),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Ht, {
                  'aria-label': 'Edit review',
                  'label': 'Edit review',
                  'isOpen': x,
                  'placement': 'top',
                  'gutter': 6,
                  'children': Object(he.jsx)(Ee, {
                    'aria-label': 'Edit review',
                    'icon': dc.a,
                    'onClick': function () {
                      return c();
                    },
                    'onMouseEnter': function () {
                      return y.on();
                    },
                    'onMouseLeave': function () {
                      return y.off();
                    },
                    'variant': 'icon',
                    'size': 'sm'
                  })
                }),
                Object(he.jsx)(pn, {
                  title: 'Edit review',
                  actions: Object(he.jsx)(bn, {
                    color: Wt(v),
                    isDisabled: !k,
                    onClick: A.handleSubmit(function (e) {
                      return (function (e) {
                        j(
                          rt(
                            h.map(function (t) {
                              return t.id === O
                                ? Object(b.a)(
                                    Object(b.a)({}, t),
                                    {},
                                    {
                                      author_details: Object(b.a)(
                                        Object(b.a)({}, t.author_details),
                                        {},
                                        { rating: e.rating }
                                      ),
                                      content: e.review,
                                      updated_at: K()(new Date()).toISOString()
                                    }
                                  )
                                : Object(b.a)({}, t);
                            })
                          )
                        ),
                          s();
                      })(e);
                    }),
                    size: 'sm',
                    children: 'Save Review'
                  }),
                  isOpen: i,
                  onClose: function () {
                    k ? u() : C();
                  },
                  isCentered: !0,
                  size: 'lg',
                  children: Object(he.jsxs)(Z.c, {
                    spacing: 3,
                    p: 2,
                    children: [
                      Object(he.jsx)(On.a, {
                        control: A.control,
                        name: 'rating',
                        render: function (e) {
                          var t = e.field,
                            o = t.value,
                            a = t.name,
                            i = e.fieldState.error;
                          return Object(he.jsx)(wn, {
                            box: { header: { pb: 1.5 }, body: { pt: 1 } },
                            color: i ? 'red' : 'gray',
                            isFullWidth: !0,
                            px: 2,
                            pt: 1.5,
                            pb: 1,
                            children: {
                              header: {
                                title: Object(he.jsx)(U.a, {
                                  color: 'light' === n ? 'gray.900' : 'gray.50',
                                  fontSize: 'sm',
                                  fontWeight: 'medium',
                                  children: 'Rating'
                                }),
                                actions: Object(he.jsx)(U.a, {
                                  color: 'light' === n ? 'gray.400' : 'gray.500',
                                  fontSize: 'sm',
                                  children: ''.concat(o, ' stars')
                                })
                              },
                              body: Object(he.jsx)(Es, {
                                name: a,
                                onChange: function (e) {
                                  return A.setValue('rating', e, { shouldDirty: !0 });
                                },
                                value: o || 0
                              }),
                              footer: i
                                ? Object(he.jsx)(Be.a, {
                                    in: Boolean(i),
                                    unmountOnExit: !0,
                                    children: Object(he.jsx)(U.a, {
                                      color: 'light' === n ? 'gray.400' : 'gray.500',
                                      fontSize: 'xs',
                                      children: i
                                    })
                                  })
                                : void 0
                            }
                          });
                        }
                      }),
                      Object(he.jsx)(On.a, {
                        control: A.control,
                        name: 'review',
                        render: function (e) {
                          var t = e.field,
                            n = t.onChange,
                            o = t.value,
                            a = t.name,
                            i = e.fieldState.error;
                          return Object(he.jsxs)(Fn.a, {
                            id: a,
                            isRequired: !0,
                            children: [
                              Object(he.jsx)(Qn.a, { fontSize: 'sm', mb: 1, children: 'Review' }),
                              Object(he.jsx)(Yn.a, {
                                autoComplete: 'off',
                                border: 'solid2',
                                boxShadow: 'none',
                                errorBorderColor: 'red.400',
                                focusBorderColor: ''.concat(Wt(v), '.400'),
                                isInvalid: Boolean(i),
                                fontSize: 'md',
                                name: a,
                                onChange: n,
                                size: 'lg',
                                value: o,
                                px: 2
                              }),
                              Object(he.jsx)(Be.a, {
                                in: Boolean(i),
                                unmountOnExit: !0,
                                children: Object(he.jsx)(Fn.b, {
                                  mt: 1,
                                  children: null === i || void 0 === i ? void 0 : i.message
                                })
                              })
                            ]
                          });
                        }
                      })
                    ]
                  })
                }),
                Object(he.jsx)(Pn, {
                  renderButton: Object(he.jsx)(bn, {
                    color: Wt(v),
                    onClick: function () {
                      return g(), void C();
                    },
                    size: 'sm',
                    children: 'Close'
                  }),
                  title: 'Unsaved data!',
                  description:
                    'Are you sure you want to close the modal, the data inserted will be lost unless you save it!',
                  isOpen: d,
                  onClose: g
                })
              ]
            })
          );
        },
        Fs = function (e) {
          var t = e.mediaItem,
            n = e.mediaType,
            o = e.isLoading,
            a = void 0 === o || o,
            i = Object(O.a)('(max-width: 600px)'),
            r = Object(p.a)(i, 1)[0],
            c = w(function (e) {
              return e.user.data.reviews.user;
            }).filter(function (e) {
              return e.mediaItem.id === (null === t || void 0 === t ? void 0 : t.id);
            });
          return Object(he.jsx)(he.Fragment, {
            children: Object(he.jsx)(hs, {
              title: 'My Review',
              actions: c.length > 0 ? Object(he.jsx)(Bs, { mediaItem: t, mediaType: n }) : void 0,
              children:
                c.length > 0
                  ? Object(he.jsx)(he.Fragment, {
                      children: c.map(function (e) {
                        return Object(he.jsx)(
                          fs,
                          {
                            renderFooterActions: Object(he.jsxs)(Z.a, {
                              children: [Object(he.jsx)(Is, { review: e }), Object(he.jsx)(Ms, { id: e.id })]
                            }),
                            review: e,
                            isLoading: a
                          },
                          e.id
                        );
                      })
                    })
                  : Object(he.jsx)(bo, {
                      hasIllustration: !1,
                      button: Object(he.jsx)(Bs, { mediaItem: t, mediaType: n }),
                      label: r
                        ? 'Write a review'
                        : 'You currently have not written any reviews '.concat(
                            t && (t.title || t.name)
                              ? 'for "'.concat(t.title || t.name, '" ').concat('tv' === n ? 'tv show' : 'movie')
                              : ''
                          ),
                      description: r
                        ? 'You currently have not written any reviews!'
                        : 'Write a review and leave your taughts about '.concat(
                            t && (t.title || t.name)
                              ? '"'.concat(t.title || t.name, '" ').concat('tv' === n ? 'tv show' : 'movie')
                              : '',
                            ' to help others make up their mind.'
                          ),
                      variant: 'outlined',
                      size: 'lg'
                    })
            })
          });
        },
        Qs = function (e) {
          var t = e.mediaItem,
            n = e.mediaType,
            o = e.isLoading,
            a = void 0 === o || o,
            i = Object(je.a)(e, ['mediaItem', 'mediaType', 'isLoading']);
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 6,
            children: [
              Object(he.jsx)(Fs, { mediaItem: t, mediaType: n, isLoading: a }),
              Object(he.jsx)(ks, Object(b.a)(Object(b.a)({}, i), {}, { mediaItem: t, mediaType: n, isLoading: a }))
            ]
          });
        },
        Ns = function (e) {
          var t = e.children,
            n = Object(J.c)().colorMode,
            o = Object(O.a)('(max-width: 960px)'),
            a = Object(p.a)(o, 1)[0];
          return Object(he.jsx)(Yi, {
            title: t.title,
            breadcrumbs: [],
            children: {
              actions: t.actions,
              body: Object(he.jsxs)(Z.c, {
                alignItems: 'stretch',
                justifyContent: 'stretch',
                divider: Object(he.jsx)(f.a, {
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
                }),
                spacing: 0,
                px: 2,
                children: [
                  Object(he.jsxs)(Z.a, {
                    width: '100%',
                    justifyContent: 'space-between',
                    divider: Object(he.jsx)(f.a, {
                      width: '2px',
                      height: '38px',
                      backgroundColor: 'light' === n ? 'gray.200' : 'gray.700'
                    }),
                    spacing: 2,
                    py: 2,
                    children: [t.tabList, a ? null : t.socials]
                  }),
                  Object(he.jsx)(Z.c, {
                    alignItems: 'stretch',
                    justifyContent: 'stretch',
                    spacing: 2,
                    py: 2,
                    children: t.tabPanels
                  })
                ]
              })
            }
          });
        },
        Ys = function (e) {
          var t = e.children,
            n = Object(O.a)('(max-width: 600px)');
          return Object(p.a)(n, 1)[0]
            ? t.poster
            : Object(he.jsxs)(Z.a, {
                width: '100%',
                maxWidth: '100%',
                spacing: 2,
                children: [
                  Object(he.jsx)(f.a, { width: '25%', maxWidth: '25%', children: t.poster }),
                  Object(he.jsx)(f.a, { width: '75%', maxWidth: '75%', children: t.backdrop })
                ]
              });
        },
        Ws = n(265),
        Ps = n.n(Ws),
        Rs = function (e) {
          var t = e.title,
            n = e.path,
            o = e.video,
            a = void 0 === o || o,
            i = e.isLoading,
            r = void 0 !== i && i,
            c = e.isError,
            s = void 0 !== c && c,
            l = e.onClick,
            d = Object(Le.a)(),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1];
          return Object(he.jsx)(So, {
            width: '100%',
            borderRadius: 'base',
            ratio: 2,
            icon: a ? Ps.a : void 0,
            isDisabled: r || s || b,
            onClick: n
              ? function () {
                  return l(n, a ? 'video' : 'backdrop');
                }
              : void 0,
            children: Object(he.jsx)(Ho, {
              width: '100%',
              position: 'absolute',
              top: 0,
              isLoaded: !r,
              borderRadius: 'base',
              children: Object(he.jsx)(Oo, {
                width: '100%',
                alt: ''.concat(t ? '"'.concat(t, '"') : '', ' movie backdrop'),
                borderRadius: 'base',
                mediaType: 'movie',
                onError: function () {
                  return g.on();
                },
                onLoad: function () {
                  return g.off();
                },
                thumbnailSrc: ''.concat('https://image.tmdb.org/t/p', '/w300').concat(n),
                fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(n)
              })
            })
          });
        },
        Gs = function (e) {
          var t = e.title,
            n = e.path,
            o = e.isLoading,
            a = void 0 !== o && o,
            i = e.isError,
            r = void 0 !== i && i,
            c = e.onClick,
            s = Object(Le.a)(),
            l = Object(p.a)(s, 2),
            d = l[0],
            u = l[1];
          return Object(he.jsx)(So, {
            width: '100%',
            borderRadius: 'base',
            isDisabled: a || r || d,
            onClick: n
              ? function () {
                  return c(n, 'photo');
                }
              : void 0,
            children: Object(he.jsx)(Ho, {
              isLoaded: !a,
              borderRadius: 'base',
              children: Object(he.jsx)(Oo, {
                alt: ''.concat(t ? '"'.concat(t, '"') : '', ' movie poster'),
                height: '100%',
                maxWidth: 'none',
                borderRadius: 'base',
                mediaType: 'movie',
                onError: function () {
                  return u.on();
                },
                onLoad: function () {
                  return u.off();
                },
                thumbnailSrc: ''.concat('https://image.tmdb.org/t/p', '/w92').concat(n),
                fullSrc: ''.concat('https://image.tmdb.org/t/p', '/original').concat(n)
              })
            })
          });
        },
        Vs = function (e) {
          var t = e.overview,
            n = e.isLoading,
            o = void 0 === n || n,
            a = Object(J.c)().colorMode;
          return o
            ? Object(he.jsx)(Z.c, {
                width: '100%',
                spacing: 1,
                children: D.a.range(0, 2).map(function (e, t) {
                  return Object(he.jsx)(
                    Zo,
                    {
                      width: '100%',
                      offsetY: 6,
                      isLoaded: !o,
                      children: Object(he.jsx)(U.a, {
                        align: 'left',
                        fontSize: 'xs',
                        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                      })
                    },
                    t
                  );
                })
              })
            : Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === a ? 'gray.900' : 'gray.50',
                fontSize: 'md',
                children: t
              });
        },
        Hs = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.renderCover,
            o = e.renderDetails,
            a = e.tagline,
            i = e.overview,
            r = e.isLoading,
            c = void 0 === r || r;
          return Object(he.jsx)(wn, {
            isFullWidth: !0,
            p: 2,
            children: {
              body: Object(he.jsxs)(Z.c, {
                position: 'relative',
                alignItems: 'stretch',
                spacing: 2,
                children: [
                  n,
                  Object(he.jsx)(_e.a, {
                    in: ((null === a || void 0 === a ? void 0 : a.length) || 0) > 0,
                    unmountOnExit: !0,
                    children: Object(he.jsx)(Uo, {
                      width: '100%',
                      label: 'Tagline',
                      children: Object(he.jsx)(Zo, {
                        offsetY: 8,
                        isLoaded: !c,
                        children: Object(he.jsx)(U.a, {
                          align: 'left',
                          color: 'light' === t ? 'gray.900' : 'gray.50',
                          fontSize: 'md',
                          fontStyle: 'italic',
                          children: a
                        })
                      })
                    })
                  }),
                  Object(he.jsx)(Uo, {
                    width: '100%',
                    label: 'Overview',
                    children: Object(he.jsx)(Vs, { overview: i, isLoading: c })
                  }),
                  o
                ]
              })
            }
          });
        },
        Js = ['185px', '205px', '230px'],
        Zs = function (e) {
          var t = e.title,
            n = e.backdrops,
            o = e.isError,
            a = void 0 !== o && o,
            i = e.isSuccess,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 !== c && c,
            l = e.onClick;
          return Object(he.jsx)(Z.a, {
            spacing: 2,
            children: a
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(t ? '"'.concat(t, '"') : '', ' backdrops!'),
                  variant: 'transparent'
                })
              : r && n && 0 === n.length
              ? Object(he.jsx)(bo, {
                  label: ''.concat(t ? '"'.concat(t, '"') : '', ' has no backdrops'),
                  variant: 'transparent'
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(n && n.length > 0 ? n : D.a.range(0, 8))
                    .filter(function (e, t) {
                      return t < 8;
                    })
                    .map(function (e, n) {
                      return Object(he.jsx)(
                        So,
                        {
                          width: Js,
                          borderRadius: 'base',
                          isDisabled: s,
                          onClick:
                            'number' !== typeof e && e
                              ? function () {
                                  return l(e.file_path, 'backdrop');
                                }
                              : void 0,
                          children: Object(he.jsx)(Ho, {
                            isLoaded: !s,
                            borderRadius: 'base',
                            children: Object(he.jsx)(Oo, {
                              alt: ''.concat(t ? '"'.concat(t, '"') : '', ' image'),
                              maxWidth: 'none',
                              height: '100%',
                              borderRadius: 'base',
                              mediaType: 'movie',
                              thumbnailSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/w300')
                                .concat(
                                  'number' !== typeof e && e ? (null === e || void 0 === e ? void 0 : e.file_path) : ''
                                ),
                              fullSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/original')
                                .concat(
                                  'number' !== typeof e && e ? (null === e || void 0 === e ? void 0 : e.file_path) : ''
                                )
                            })
                          })
                        },
                        n
                      );
                    })
                })
          });
        },
        Us = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = w(function (e) {
              return e.user.ui.theme.color;
            }),
            a = e.activeIndex,
            i = e.title,
            r = e.isDisabled,
            c = e.onClick;
          return Object(he.jsx)(bn, {
            color: Wt(o),
            isFullWidth: !0,
            isDisabled: r,
            onClick: c
              ? function () {
                  return c();
                }
              : void 0,
            size: n ? 'sm' : 'md',
            variant: 'text',
            children: 'View all '.concat(i ? '"'.concat(i, '"') : '', ' ').concat(
              (function () {
                switch (a) {
                  case 0:
                    return 'photos';
                  case 1:
                    return 'backdrops';
                  case 2:
                    return 'videos';
                  default:
                    return '';
                }
              })()
            )
          });
        },
        qs = ['185px', '205px', '230px'],
        Xs = function (e) {
          var t = e.title,
            n = e.photos,
            o = e.isError,
            a = void 0 !== o && o,
            i = e.isSuccess,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 !== c && c,
            l = e.onClick;
          return Object(he.jsx)(Z.a, {
            spacing: 2,
            children: a
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(t ? '"'.concat(t, '"') : '', ' photos!'),
                  variant: 'transparent'
                })
              : r && n && 0 === n.length
              ? Object(he.jsx)(bo, {
                  label: ''.concat(t ? '"'.concat(t, '"') : '', ' has no photos'),
                  variant: 'transparent'
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(n && n.length > 0 ? n : D.a.range(0, 8))
                    .filter(function (e, t) {
                      return t < 8;
                    })
                    .map(function (e, n) {
                      return Object(he.jsx)(
                        So,
                        {
                          width: qs,
                          borderRadius: 'base',
                          isDisabled: s,
                          onClick:
                            'number' !== typeof e && e
                              ? function () {
                                  return l(e.file_path, 'photo');
                                }
                              : void 0,
                          children: Object(he.jsx)(Ho, {
                            isLoaded: !s,
                            borderRadius: 'base',
                            children: Object(he.jsx)(Oo, {
                              alt: ''.concat(t ? '"'.concat(t, '"') : '', ' image'),
                              maxWidth: 'none',
                              height: '100%',
                              borderRadius: 'base',
                              mediaType: 'movie',
                              thumbnailSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/w92')
                                .concat(
                                  'number' !== typeof e && e ? (null === e || void 0 === e ? void 0 : e.file_path) : ''
                                ),
                              fullSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/original')
                                .concat(
                                  'number' !== typeof e && e ? (null === e || void 0 === e ? void 0 : e.file_path) : ''
                                )
                            })
                          })
                        },
                        n
                      );
                    })
                })
          });
        },
        Ks = (n(447), ['185px', '205px', '230px']),
        $s = function (e) {
          var t = e.video,
            n = e.isLoading,
            o = void 0 !== n && n,
            a = e.onClick,
            i = Object(Le.a)(),
            r = Object(p.a)(i, 2),
            c = r[0],
            s = r[1],
            l = Object(Le.a)(),
            d = Object(p.a)(l, 2),
            u = d[0],
            b = d[1],
            g = {
              playerVars: {
                autoplay: c ? 1 : 0,
                controls: 0,
                enablejsapi: 1,
                disablekb: 1,
                mute: 1,
                fs: 0,
                loop: 1,
                modestbranding: 1,
                showinfo: 0
              }
            };
          return Object(he.jsx)(f.a, {
            width: Ks,
            borderRadius: 'base',
            onMouseEnter: function () {
              return s.on();
            },
            onMouseLeave: function () {
              return s.off();
            },
            children: Object(he.jsx)(So, {
              width: Ks,
              borderRadius: 'base',
              ratio: 1,
              icon: Object(he.jsx)(Lo.a, {}),
              isDisabled: u || o,
              onClick:
                'number' !== typeof t && t
                  ? function () {
                      return a(t.key, 'video');
                    }
                  : void 0,
              children: Object(he.jsx)(Ho, {
                isLoaded: !o,
                borderRadius: 'base',
                children: Object(he.jsx)(_o.a, {
                  videoId: 'number' !== typeof t && t ? (null === t || void 0 === t ? void 0 : t.key) : '',
                  className: 'VideoGalleryFrame',
                  containerClassName: 'VideoGalleryContainer',
                  onError: function () {
                    return b.on();
                  },
                  opts: g
                })
              })
            })
          });
        },
        el = function (e) {
          var t = e.title,
            n = e.videos,
            o = e.isError,
            a = void 0 !== o && o,
            i = e.isSuccess,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 !== c && c,
            l = e.onClick;
          return Object(he.jsx)(Z.a, {
            spacing: 2,
            children: a
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(t ? '"'.concat(t, '"') : '', ' videos!'),
                  variant: 'transparent'
                })
              : r && n && 0 === n.length
              ? Object(he.jsx)(bo, {
                  label: ''.concat(t ? '"'.concat(t, '"') : '', ' has no videos'),
                  variant: 'transparent'
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(n && n.length > 0 ? n : D.a.range(0, 8))
                    .filter(function (e, t) {
                      return t < 8;
                    })
                    .map(function (e, t) {
                      return Object(he.jsx)($s, { video: e, isLoading: s, onClick: l }, t);
                    })
                })
          });
        },
        tl = function (e) {
          var t = e.title,
            n = e.photos,
            a = e.backdrops,
            i = e.videos,
            r = e.isError,
            c = e.isSuccess,
            s = e.isLoading,
            l = e.onClick,
            d = Object(o.useState)(0),
            u = Object(p.a)(d, 2),
            b = u[0],
            g = u[1],
            j = Object(Le.a)(),
            h = Object(p.a)(j, 2),
            v = h[0],
            O = h[1];
          return (
            Object(o.useEffect)(
              function () {
                c &&
                  (((null === n || void 0 === n ? void 0 : n.length) || 0) > 0
                    ? g(0)
                    : ((null === a || void 0 === a ? void 0 : a.length) || 0) > 0
                    ? g(1)
                    : ((null === i || void 0 === i ? void 0 : i.length) || 0) > 0 && g(2));
              },
              [c]
            ),
            Object(he.jsx)(Kc, {
              activeTab: b,
              onChange: function (e) {
                O.on(),
                  g(e),
                  setTimeout(function () {
                    return O.off();
                  }, 250);
              },
              children: Object(he.jsx)(di, {
                title: Object(he.jsx)(es, {
                  renderTabs: [
                    {
                      label: 'photos',
                      badge: String((null === n || void 0 === n ? void 0 : n.length) || 0),
                      isDisabled: s.images || 0 === ((null === n || void 0 === n ? void 0 : n.length) || 0)
                    },
                    {
                      label: 'backdrops',
                      badge: String((null === a || void 0 === a ? void 0 : a.length) || 0),
                      isDisabled: s.images || 0 === ((null === a || void 0 === a ? void 0 : a.length) || 0)
                    },
                    {
                      label: 'videos',
                      badge: String((null === i || void 0 === i ? void 0 : i.length) || 0),
                      isDisabled: s.videos || 0 === ((null === i || void 0 === i ? void 0 : i.length) || 0)
                    }
                  ],
                  activeTab: b,
                  size: 'sm'
                }),
                footer:
                  (0 === b && ((null === n || void 0 === n ? void 0 : n.length) || 0) > 7) ||
                  (1 === b && ((null === a || void 0 === a ? void 0 : a.length) || 0) > 7) ||
                  (2 === b && ((null === i || void 0 === i ? void 0 : i.length) || 0) > 7)
                    ? Object(he.jsx)(Us, {
                        activeIndex: b,
                        title: t,
                        isDisabled: 2 === b ? s.videos || r.videos || !1 : s.images || r.images || !1,
                        onClick: function () {
                          switch (b) {
                            case 0:
                              n && n.length > 0 && l(n[0].file_path, 'photo');
                              break;
                            case 1:
                              a && a.length > 0 && l(a[0].file_path, 'backdrop');
                              break;
                            case 2:
                              i && i.length > 0 && l(i[0].key, 'video');
                          }
                        }
                      })
                    : void 0,
                isLoading: 2 === b ? s.videos || !1 : s.images || !1,
                hasDivider: !0,
                resetScroll: v,
                variant: 'outlined',
                children: Object(he.jsxs)(ts, {
                  activeTab: b,
                  children: [
                    Object(he.jsx)(Xs, {
                      title: t,
                      photos: n,
                      isError: r.images,
                      isSuccess: c.images,
                      isLoading: s.images,
                      onClick: l
                    }),
                    Object(he.jsx)(Zs, {
                      title: t,
                      backdrops: a,
                      isError: r.images,
                      isSuccess: c.images,
                      isLoading: s.images,
                      onClick: l
                    }),
                    Object(he.jsx)(el, {
                      title: t,
                      videos: i,
                      isError: r.images,
                      isSuccess: c.images,
                      isLoading: s.images,
                      onClick: l
                    })
                  ]
                })
              })
            })
          );
        },
        nl = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.cast,
            a = e.name,
            i = e.isError,
            r = void 0 !== i && i,
            c = e.isSuccess,
            s = void 0 !== c && c,
            l = e.isLoading,
            d = void 0 === l || l,
            u = e.onChangeTab,
            g = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(di, {
            title: 'Cast',
            footer: Object(he.jsx)(bn, {
              color: Wt(g),
              isFullWidth: !0,
              isDisabled: d,
              onClick: function () {
                return u();
              },
              size: n ? 'sm' : 'md',
              variant: 'text',
              children: 'View all '
                .concat((null === o || void 0 === o ? void 0 : o.length) || 0, ' cast member')
                .concat(o && (0 === o.length || o.length > 1 ? 's' : ''))
            }),
            isLoading: d,
            hasDivider: !0,
            variant: 'outlined',
            children:
              !d && r
                ? Object(he.jsx)(Pa, {
                    label: 'Oh no! Something went wrong',
                    description: 'Failed to fetch '.concat(a ? '"'.concat(a, '"') : '', ' movie cast!'),
                    variant: 'transparent'
                  })
                : !d && s && o && 0 === o.length
                ? Object(he.jsx)(bo, {
                    label: ''.concat(a ? '"'.concat(a, '"') : '', ' movie cast list is currently empty!'),
                    variant: 'transparent'
                  })
                : !d && s && o && o.length > 0
                ? Object(he.jsx)(he.Fragment, {
                    children: o
                      .filter(function (e, t) {
                        return t < 20;
                      })
                      .map(function (e) {
                        return Object(he.jsx)(
                          vi,
                          {
                            width: ['185px', '205px', '230px'],
                            mediaItem: e ? Object(b.a)({}, e) : void 0,
                            mediaType: 'person',
                            image: {
                              alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                              src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                              size: { thumbnail: 'w45', full: 'original' }
                            },
                            title: (null === e || void 0 === e ? void 0 : e.name) || '',
                            subtitle: 'As '.concat(e.character),
                            isLoading: d
                          },
                          e.id
                        );
                      })
                  })
                : Object(he.jsx)(he.Fragment, {
                    children: D.a.range(0, 20).map(function (e, t) {
                      return Object(he.jsx)(
                        vi,
                        {
                          width: ['185px', '205px', '230px'],
                          mediaType: 'person',
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                    })
                  })
          });
        },
        ol = function (e) {
          var t = e.id,
            n = e.name,
            o = e.parts;
          return Object(he.jsx)(di, {
            title: 'Part of the "'.concat(
              n
                .split(' ')
                .filter(function (e) {
                  return 'collection' !== e.toLowerCase();
                })
                .join(' '),
              '" Franchise'
            ),
            isLoading: !1,
            hasDivider: !0,
            variant: 'outlined',
            children: Object(he.jsx)(he.Fragment, {
              children: o
                .filter(function (e) {
                  return e.id !== t;
                })
                .map(function (e) {
                  return Object(he.jsx)(
                    vi,
                    {
                      width: ['185px', '205px', '230px'],
                      mediaItem: e ? Object(b.a)({}, e) : void 0,
                      mediaType: (null === e || void 0 === e ? void 0 : e.title) ? 'movie' : 'tv',
                      image: {
                        alt: ''.concat(
                          (null === e || void 0 === e ? void 0 : e.title)
                            ? ''.concat(e.title, ' movie')
                            : (null === e || void 0 === e ? void 0 : e.name)
                            ? ''.concat(e.name, ' tv show')
                            : '',
                          ' poster'
                        ),
                        src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                        size: { thumbnail: 'w92', full: 'original' }
                      },
                      rating: {
                        rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                        count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                      },
                      title:
                        (null === e || void 0 === e ? void 0 : e.title) ||
                        (null === e || void 0 === e ? void 0 : e.name) ||
                        '',
                      subtitle:
                        ''.concat(
                          Ft(
                            (null === e || void 0 === e ? void 0 : e.release_date) ||
                              (null === e || void 0 === e ? void 0 : e.first_air_date) ||
                              '',
                            'year'
                          )
                        ) || 'N/A',
                      isLoading: !1
                    },
                    e.id
                  );
                })
            })
          });
        },
        al = Gt(200, 4),
        il = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = Object(O.a)('(max-width: 600px)'),
            a = Object(p.a)(o, 1)[0],
            i = w(function (e) {
              return e.user.ui.theme.color;
            }),
            r = e.directors,
            c = e.executiveProducer,
            s = e.producers,
            l = e.writers,
            d = e.isLoading,
            u = void 0 === d || d,
            b = [
              {
                label: 'Director'.concat(((null === r || void 0 === r ? void 0 : r.length) || 0) > 1 ? 's' : ''),
                data: r || []
              },
              {
                label: 'Executive Producer'.concat(
                  ((null === c || void 0 === c ? void 0 : c.length) || 0) > 1 ? 's' : ''
                ),
                data: c || []
              },
              {
                label: 'Producer'.concat(((null === s || void 0 === s ? void 0 : s.length) || 0) > 1 ? 's' : ''),
                data: s || []
              },
              {
                label: 'Writer'.concat(((null === l || void 0 === l ? void 0 : l.length) || 0) > 1 ? 's' : ''),
                data: l || []
              }
            ],
            g = function () {
              var e = 0;
              return (
                b.forEach(function (t) {
                  t.data.length > 0 && (e += 1);
                }),
                ''.concat(100 / e, '%')
              );
            };
          return Object(he.jsx)(Z.b, {
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'stretch',
            direction: a ? 'column' : 'row',
            spacing: a ? 2 : 4,
            children: b.map(function (e, o) {
              return u || e.data.length > 0
                ? Object(he.jsx)(
                    Uo,
                    {
                      width: a ? '100%' : 'auto',
                      maxWidth: a ? '100%' : u ? ''.concat(25, '%') : g(),
                      flex: 1,
                      label: e.label,
                      children: Object(he.jsx)(Ca, {
                        isLoading: u,
                        children: Object(he.jsx)(Z.a, {
                          wrap: 'nowrap',
                          divider: Object(he.jsx)(U.a, {
                            align: 'left',
                            color: 'light' === n ? 'gray.400' : 'gray.500',
                            fontSize: 'sm',
                            pr: 0.75,
                            children: ','
                          }),
                          children: Object(In.a)(u ? D.a.range(0, 2) : e.data).map(function (e, o) {
                            return Object(he.jsx)(
                              pe,
                              {
                                to: 'number' !== typeof e ? { pathname: '/person/'.concat(e.id) } : {},
                                isDisabled: u,
                                whiteSpace: 'nowrap',
                                children: Object(he.jsx)(Zo, {
                                  width: u ? ''.concat(al[Math.floor(Math.random() * al.length)], 'px') : 'auto',
                                  offsetY: 8,
                                  isLoaded: !u,
                                  children: Object(he.jsx)(U.a, {
                                    align: 'left',
                                    color: 'light' === n ? 'gray.900' : 'gray.50',
                                    fontSize: 'md',
                                    sx: {
                                      transition: ''
                                        .concat(t.transition.duration.faster, ' ')
                                        .concat(t.transition.easing['ease-out'])
                                    },
                                    _focus: { boxShadow: 'none' },
                                    _hover: { color: ''.concat(i, '.').concat('light' === n ? 500 : 400) },
                                    children: 'number' !== typeof e ? e.name : 'Lorem Ipsum'
                                  })
                                })
                              },
                              o
                            );
                          })
                        })
                      })
                    },
                    o
                  )
                : null;
            })
          });
        },
        rl = Gt(200, 4),
        cl = function (e) {
          var t,
            n,
            o = Object(J.c)().colorMode,
            a = Object(O.a)('(max-width: 600px)'),
            i = Object(p.a)(a, 1)[0],
            r = e.budget,
            c = e.revenue,
            s = e.languages,
            l = e.originalLanguage,
            d = e.isLoading,
            u = void 0 === d || d,
            b = [
              {
                label: 'Budget',
                children: Object(he.jsx)(Zo, {
                  offsetY: 8,
                  isLoaded: !u,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === o ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children: r ? '$'.concat(Mt(r)) : u ? '1,000,000' : 'N/A'
                  })
                })
              },
              {
                label: 'Revenue',
                children: Object(he.jsx)(Zo, {
                  offsetY: 8,
                  isLoaded: !u,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === o ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children: c ? '$'.concat(Mt(c)) : u ? '1,000,000' : 'N/A'
                  })
                })
              },
              {
                label: ((null === s || void 0 === s ? void 0 : s.length) || 0) > 1 ? 'Original Language' : 'Language',
                children: Object(he.jsx)(Zo, {
                  width: u ? ''.concat(rl[Math.floor(Math.random() * rl.length)], 'px') : 'auto',
                  offsetY: 8,
                  isLoaded: !u,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === o ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children:
                      (null === s ||
                      void 0 === s ||
                      null ===
                        (t = s.find(function (e) {
                          return e.iso_639_1 === l;
                        })) ||
                      void 0 === t
                        ? void 0
                        : t.english_name) || 'N/A'
                  })
                })
              },
              {
                label: 'Other Languages',
                children:
                  ((null === s || void 0 === s ? void 0 : s.length) || 0) > 1
                    ? Object(he.jsx)(Ca, {
                        isLoading: u,
                        children: Object(he.jsx)(Z.a, {
                          divider: Object(he.jsx)(U.a, {
                            align: 'left',
                            color: 'light' === o ? 'gray.400' : 'gray.500',
                            fontSize: 'sm',
                            pr: 0.75,
                            children: ','
                          }),
                          children:
                            null === s ||
                            void 0 === s ||
                            null ===
                              (n = s.filter(function (e) {
                                return e.iso_639_1 !== l;
                              })) ||
                            void 0 === n
                              ? void 0
                              : n.map(function (e, t) {
                                  return Object(he.jsx)(
                                    Zo,
                                    {
                                      width: u ? ''.concat(rl[Math.floor(Math.random() * rl.length)], 'px') : 'auto',
                                      offsetY: 8,
                                      isLoaded: !u,
                                      children: Object(he.jsx)(U.a, {
                                        align: 'left',
                                        color: 'light' === o ? 'gray.900' : 'gray.50',
                                        fontSize: 'md',
                                        whiteSpace: 'nowrap',
                                        children: e.english_name || ''
                                      })
                                    },
                                    t
                                  );
                                })
                        })
                      })
                    : void 0
              }
            ],
            g = function () {
              var e = 3;
              return ((null === s || void 0 === s ? void 0 : s.length) || 0) > 1 && (e += 1), ''.concat(100 / e, '%');
            };
          return Object(he.jsx)(Z.b, {
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'stretch',
            direction: i ? 'column' : 'row',
            spacing: i ? 2 : 4,
            children: b.map(function (e, t) {
              return e.children
                ? Object(he.jsx)(
                    Uo,
                    {
                      width: i ? '100%' : 'auto',
                      maxWidth: i ? '100%' : u ? ''.concat(25, '%') : g(),
                      flex: 1,
                      label: e.label,
                      children: e.children
                    },
                    t
                  )
                : null;
            })
          });
        },
        sl = function (e) {
          var t = e.recommendations,
            n = e.title,
            o = e.isError,
            a = void 0 !== o && o,
            i = e.isSuccess,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 !== c && c;
          return Object(he.jsx)(di, {
            title: 'Recommended Movies',
            isLoading: s,
            hasDivider: !0,
            variant: 'outlined',
            children: a
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(n ? '"'.concat(n, '"') : '', ' recommended movies list!'),
                  variant: 'transparent'
                })
              : r && t && 0 === t.length
              ? Object(he.jsx)(bo, {
                  label: 'No recommended movies found for '.concat(n ? '"'.concat(n, '"') : ''),
                  variant: 'transparent'
                })
              : r && t && t.length > 0
              ? Object(he.jsx)(he.Fragment, {
                  children: ua()(t, 'popularity', { reverse: !0 }).map(function (e) {
                    return Object(he.jsx)(
                      vi,
                      {
                        width: ['185px', '205px', '230px'],
                        mediaItem: e ? Object(b.a)({}, e) : void 0,
                        mediaType: 'movie',
                        image: {
                          alt: ''.concat((null === e || void 0 === e ? void 0 : e.title) || '', ' movie poster'),
                          src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                          size: { thumbnail: 'w92', full: 'original' }
                        },
                        rating: {
                          rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                          count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                        },
                        title: (null === e || void 0 === e ? void 0 : e.title) || '',
                        subtitle:
                          ''.concat(Ft((null === e || void 0 === e ? void 0 : e.release_date) || '', 'year')) || 'N/A',
                        isLoading: !1
                      },
                      e.id
                    );
                  })
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(D.a.range(0, 20)).map(function (e, t) {
                    return Object(he.jsx)(
                      vi,
                      {
                        width: ['185px', '205px', '230px'],
                        mediaType: 'movie',
                        title: 'Lorem ipsum',
                        subtitle: 'Lorem ipsum',
                        isLoading: !0
                      },
                      t
                    );
                  })
                })
          });
        },
        ll = function (e) {
          var t,
            n,
            o,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            b,
            g,
            j,
            h,
            p,
            v,
            O,
            f,
            m,
            x,
            y,
            A,
            w,
            k,
            C,
            S = e.movieQuery,
            D = e.creditsQuery,
            E = e.imagesQuery,
            L = e.videosQuery,
            _ = e.collectionsQuery,
            B = e.recommendationsQuery,
            M = e.onCoverClick,
            T = e.onMediaClick,
            z = e.onChangeTab;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            maxWidth: '100%',
            spacing: 4,
            children: [
              Object(he.jsx)(Hs, {
                renderCover: Object(he.jsx)(Ys, {
                  children: {
                    poster: Object(he.jsx)(Gs, {
                      title: null === (t = S.data) || void 0 === t ? void 0 : t.title,
                      path: null === (n = S.data) || void 0 === n ? void 0 : n.poster_path,
                      isLoading: S.isFetching || S.isLoading,
                      isError: S.isError,
                      onClick: M
                    }),
                    backdrop: Object(he.jsx)(Rs, {
                      title: null === (o = S.data) || void 0 === o ? void 0 : o.title,
                      path: null === (a = S.data) || void 0 === a ? void 0 : a.backdrop_path,
                      video:
                        (null === (i = S.data) || void 0 === i ? void 0 : i.video) ||
                        ((null === (r = L.data) || void 0 === r ? void 0 : r.results.length) || 0) > 0,
                      isLoading: S.isFetching || S.isLoading || L.isFetching || L.isLoading,
                      isError: S.isError || L.isError,
                      onClick: M
                    })
                  }
                }),
                renderDetails: Object(he.jsxs)(he.Fragment, {
                  children: [
                    Object(he.jsx)(il, {
                      directors:
                        null === (c = D.data) || void 0 === c
                          ? void 0
                          : c.crew.filter(function (e) {
                              return 'Director' === e.job;
                            }),
                      executiveProducer:
                        null === (s = D.data) || void 0 === s
                          ? void 0
                          : s.crew.filter(function (e) {
                              return 'Executive Producer' === e.job;
                            }),
                      producers:
                        null === (l = D.data) || void 0 === l
                          ? void 0
                          : l.crew.filter(function (e) {
                              return 'Producer' === e.job;
                            }),
                      writers:
                        null === (d = D.data) || void 0 === d
                          ? void 0
                          : d.crew.filter(function (e) {
                              return 'Writer' === e.job;
                            }),
                      isLoading: D.isFetching || D.isLoading
                    }),
                    Object(he.jsx)(cl, {
                      budget: null === (u = S.data) || void 0 === u ? void 0 : u.budget,
                      revenue: null === (b = S.data) || void 0 === b ? void 0 : b.revenue,
                      originalLanguage: null === (g = S.data) || void 0 === g ? void 0 : g.original_language,
                      languages: null === (j = S.data) || void 0 === j ? void 0 : j.spoken_languages,
                      isLoading: S.isFetching || S.isLoading
                    })
                  ]
                }),
                tagline: null === (h = S.data) || void 0 === h ? void 0 : h.tagline,
                overview: null === (p = S.data) || void 0 === p ? void 0 : p.overview,
                isLoading: S.isFetching || S.isLoading
              }),
              Object(he.jsx)(nl, {
                cast: null === (v = D.data) || void 0 === v ? void 0 : v.cast,
                name: null === (O = S.data) || void 0 === O ? void 0 : O.title,
                isError: D.isError,
                isSuccess: D.isSuccess,
                isLoading: D.isFetching || D.isLoading,
                onChangeTab: function () {
                  return z(1);
                }
              }),
              Object(he.jsx)(tl, {
                title: null === (f = S.data) || void 0 === f ? void 0 : f.title,
                photos: null === (m = E.data) || void 0 === m ? void 0 : m.posters,
                backdrops: null === (x = E.data) || void 0 === x ? void 0 : x.backdrops,
                videos: null === (y = L.data) || void 0 === y ? void 0 : y.results,
                isError: { images: E.isError, videos: L.isError },
                isSuccess: { images: E.isSuccess, videos: L.isSuccess },
                isLoading: { images: E.isFetching || E.isLoading, videos: L.isFetching || L.isLoading },
                onClick: T
              }),
              Object(he.jsx)(eo.a, {
                in: _.isSuccess && Boolean(_.data),
                unmountOnExit: !0,
                style: { width: '100%' },
                children: Object(he.jsx)(ol, {
                  id: null === (A = S.data) || void 0 === A ? void 0 : A.id,
                  name: (null === (w = _.data) || void 0 === w ? void 0 : w.name) || '',
                  parts: (null === (k = _.data) || void 0 === k ? void 0 : k.parts) || []
                })
              }),
              Object(he.jsx)(sl, {
                recommendations: B.data,
                title: null === (C = S.data) || void 0 === C ? void 0 : C.title,
                isError: B.isError,
                isSuccess: B.isSuccess,
                isLoading: B.isFetching || B.isLoading
              })
            ]
          });
        },
        dl = function () {
          var e,
            t,
            n,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            g,
            v,
            O,
            f,
            m = C.a.CancelToken.source(),
            x = Object(J.c)().colorMode,
            y = Object(fe.a)(),
            A = y.isOpen,
            k = y.onOpen,
            S = y.onClose,
            D = Object(ge.h)().id,
            E = w(function (e) {
              return e.user.data.reviews.user;
            }).filter(function (e) {
              return e.mediaItem.id === Number(D);
            }),
            L = Object(o.useState)(),
            B = Object(p.a)(L, 2),
            M = B[0],
            T = B[1],
            z = Object(o.useState)(0),
            I = Object(p.a)(z, 2),
            F = I[0],
            Q = I[1],
            N = Object(o.useState)(),
            Y = Object(p.a)(N, 2),
            W = Y[0],
            P = Y[1],
            R = Object(go.a)(
              ['movie-'.concat(D), D],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            _.get('/movie/'.concat(D), {
                              params: { append_to_response: 'release_dates' },
                              cancelToken: m.token
                            })
                          );
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            G = Object(go.a)(
              ['movie-credits-'.concat(D), D],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/movie/'.concat(D, '/credits'), { cancelToken: m.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            V = Object(go.a)(
              ['movie-external_ids-'.concat(D), D],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/movie/'.concat(D, '/external_ids'), { cancelToken: m.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            H = Object(go.a)(
              ['movie-images-'.concat(D), D],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/movie/'.concat(D, '/images'), { cancelToken: m.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            Z = Object(go.a)(
              ['movie-videos-'.concat(D), D],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/movie/'.concat(D, '/videos'), { cancelToken: m.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            U = Object(go.a)(
              'movie-collections-'.concat(D),
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n, o;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            _.get(
                              '/collection/'.concat(
                                null === (t = R.data) || void 0 === t ? void 0 : t.belongs_to_collection.id
                              ),
                              { cancelToken: m.token }
                            )
                          );
                        case 2:
                          return (n = e.sent), (o = n.data), e.abrupt('return', o);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              ),
              { enabled: R.isSuccess }
            ),
            q = Object(pc.a)(
              ['movie-reviews-'.concat(D), D],
              (function () {
                var e = Object(h.a)(
                  j.a.mark(function e(t) {
                    var n, o, a, i;
                    return j.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = t.pageParam),
                              (o = void 0 === n ? 1 : n),
                              (e.next = 3),
                              _.get('/movie/'.concat(D, '/reviews'), { params: { page: o }, cancelToken: m.token })
                            );
                          case 3:
                            return (a = e.sent), (i = a.data), e.abrupt('return', i);
                          case 6:
                          case 'end':
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    P({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(t, 'updated_at', { reverse: !0 }),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            ),
            X = Object(go.a)(
              ['movie-recommendations-'.concat(D), D],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/movie/'.concat(D, '/recommendations'), { cancelToken: m.token });
                        case 2:
                          return (
                            (t = e.sent),
                            (n = t.data),
                            e.abrupt(
                              'return',
                              n.results.filter(function (e, t) {
                                return t < 20;
                              })
                            )
                          );
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            K = function (e, t) {
              T({ type: t, asset: e }), k();
            };
          return (
            Object(o.useEffect)(function () {
              return function () {
                return m.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Kc, {
                  activeTab: F,
                  onChange: function (e) {
                    return Q(e);
                  },
                  children: Object(he.jsx)(Ns, {
                    children: {
                      title: Object(he.jsx)(ta, {
                        title: null === (e = R.data) || void 0 === e ? void 0 : e.title,
                        rating: {
                          rating: (null === (t = R.data) || void 0 === t ? void 0 : t.vote_average) || null,
                          count: (null === (n = R.data) || void 0 === n ? void 0 : n.vote_count) || null
                        },
                        date: Ft((null === (a = R.data) || void 0 === a ? void 0 : a.release_date) || '', 'full'),
                        certification: (function () {
                          var e,
                            t =
                              null === (e = R.data) || void 0 === e
                                ? void 0
                                : e.release_dates.results.find(function (e) {
                                    return 'US' === e.iso_3166_1;
                                  });
                          return t &&
                            (null === t || void 0 === t ? void 0 : t.release_dates.length) > 0 &&
                            (null === t || void 0 === t ? void 0 : t.release_dates[0].certification)
                            ? null === t || void 0 === t
                              ? void 0
                              : t.release_dates[0].certification
                            : void 0;
                        })(),
                        genres: null === (i = R.data) || void 0 === i ? void 0 : i.genres,
                        runtime: null === (r = R.data) || void 0 === r ? void 0 : r.runtime,
                        isLoading: R.isFetching || R.isLoading
                      }),
                      actions: Object(he.jsx)(ns, {
                        mediaItem: R.data
                          ? {
                              adult: R.data.adult,
                              poster_path: R.data.poster_path,
                              overview: R.data.overview,
                              release_date: R.data.release_date,
                              id: R.data.id,
                              original_language: R.data.original_language,
                              original_title: R.data.original_title,
                              title: R.data.title,
                              backdrop_path: R.data.backdrop_path,
                              popularity: R.data.popularity,
                              video: R.data.video,
                              vote_average: R.data.vote_average,
                              vote_count: R.data.vote_count,
                              genre_ids: R.data.genres.map(function (e) {
                                return e.id;
                              })
                            }
                          : void 0,
                        mediaType: 'movie',
                        title: null === (c = R.data) || void 0 === c ? void 0 : c.title,
                        isLoading: R.isFetching || R.isLoading,
                        isError: R.isError
                      }),
                      tabList: Object(he.jsx)(es, {
                        renderTabs: [
                          { label: 'Overview' },
                          {
                            label: 'Cast & Crew',
                            isDisabled: G.isError || G.isFetching || G.isLoading,
                            badge: String(
                              ((null === (s = G.data) || void 0 === s ? void 0 : s.cast.length) || 0) +
                                ((null === (l = G.data) || void 0 === l ? void 0 : l.crew.length) || 0)
                            )
                          },
                          {
                            label: 'Reviews',
                            isDisabled:
                              R.isError || R.isFetching || R.isLoading || q.isError || q.isFetching || q.isLoading,
                            badge: String(((null === W || void 0 === W ? void 0 : W.total_results) || 0) + E.length)
                          }
                        ],
                        activeTab: F
                      }),
                      socials: Object(he.jsx)(fa, {
                        socials: V.data,
                        name: null === (d = R.data) || void 0 === d ? void 0 : d.title,
                        orientation: 'horizontal',
                        color: 'light' === x ? 'gray.400' : 'gray.500',
                        isLoading: V.isFetching || V.isLoading
                      }),
                      tabPanels: Object(he.jsxs)(ts, {
                        activeTab: F,
                        children: [
                          Object(he.jsx)(ll, {
                            movieQuery: R,
                            creditsQuery: G,
                            imagesQuery: H,
                            videosQuery: Z,
                            collectionsQuery: U,
                            recommendationsQuery: X,
                            onCoverClick: function (e, t) {
                              switch (t) {
                                case 'video':
                                  var n,
                                    o =
                                      null === (n = Z.data) || void 0 === n
                                        ? void 0
                                        : n.results.find(function (e) {
                                            return e.official || 'Trailer' === e.type;
                                          });
                                  o && K(o.key, 'video');
                                  break;
                                default:
                                  K(e, t);
                              }
                            },
                            onMediaClick: K,
                            onChangeTab: function (e) {
                              var t;
                              Q(e), null === (t = document.scrollingElement) || void 0 === t || t.scrollTo(0, 0);
                            }
                          }),
                          Object(he.jsx)(js, {
                            mediaType: 'movie',
                            cast: null === (u = G.data) || void 0 === u ? void 0 : u.cast,
                            crew: null === (g = G.data) || void 0 === g ? void 0 : g.crew,
                            isError: G.isError,
                            isSuccess: G.isSuccess,
                            isLoading: G.isFetching || G.isLoading
                          }),
                          Object(he.jsx)(Qs, {
                            mediaItem: R.data ? Object(b.a)({}, R.data) : void 0,
                            mediaType: 'movie',
                            reviews: W,
                            isError: q.isError,
                            isSuccess: q.isSuccess,
                            isLoading: q.isFetching || q.isLoading,
                            hasNextPage: q.hasNextPage,
                            onFetchNextPage: q.fetchNextPage
                          })
                        ]
                      })
                    }
                  })
                }),
                H.isSuccess || Z.isSuccess
                  ? Object(he.jsx)(Po, {
                      isOpen: A,
                      selected: M,
                      photos: Object(In.a)((null === (v = H.data) || void 0 === v ? void 0 : v.posters) || []),
                      backdrops: Object(In.a)((null === (O = H.data) || void 0 === O ? void 0 : O.backdrops) || []),
                      videos: Object(In.a)(
                        (null === (f = Z.data) || void 0 === f
                          ? void 0
                          : f.results.filter(function (e) {
                              return 'YouTube' === e.site;
                            })) || []
                      ),
                      mediaType: 'movie',
                      onClose: S
                    })
                  : null
              ]
            })
          );
        },
        ul = function (e) {
          var t = Object(O.a)('(max-width: 600px)'),
            n = Object(p.a)(t, 1)[0],
            o = e.cast,
            a = e.name,
            i = e.isError,
            r = void 0 !== i && i,
            c = e.isSuccess,
            s = void 0 !== c && c,
            l = e.isLoading,
            d = void 0 === l || l,
            u = e.onChangeTab,
            g = w(function (e) {
              return e.user.ui.theme.color;
            });
          return Object(he.jsx)(di, {
            title: 'Series Cast',
            footer: Object(he.jsx)(bn, {
              color: Wt(g),
              isFullWidth: !0,
              isDisabled: d,
              onClick: function () {
                return u();
              },
              size: n ? 'sm' : 'md',
              variant: 'text',
              children: 'View all '
                .concat((null === o || void 0 === o ? void 0 : o.length) || 0, ' cast member')
                .concat(o && (0 === o.length || o.length > 1 ? 's' : ''))
            }),
            isLoading: d,
            hasDivider: !0,
            variant: 'outlined',
            children:
              !d && r
                ? Object(he.jsx)(Pa, {
                    label: 'Oh no! Something went wrong',
                    description: 'Failed to fetch '.concat(a ? '"'.concat(a, '"') : '', ' tv show cast!'),
                    variant: 'transparent'
                  })
                : !d && s && o && 0 === o.length
                ? Object(he.jsx)(bo, {
                    label: ''.concat(a ? '"'.concat(a, '"') : '', ' tv show cast list is currently empty!'),
                    variant: 'transparent'
                  })
                : !d && s && o && o.length > 0
                ? Object(he.jsx)(he.Fragment, {
                    children: o
                      .filter(function (e, t) {
                        return t < 20;
                      })
                      .map(function (e) {
                        return Object(he.jsx)(
                          vi,
                          {
                            width: ['185px', '205px', '230px'],
                            mediaItem: e ? Object(b.a)({}, e) : void 0,
                            mediaType: 'person',
                            image: {
                              alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' person poster'),
                              src: (null === e || void 0 === e ? void 0 : e.profile_path) || '',
                              size: { thumbnail: 'w45', full: 'original' }
                            },
                            title: (null === e || void 0 === e ? void 0 : e.name) || '',
                            subtitle: e.roles && e.roles.length > 0 ? os(e.roles) : 'N/A',
                            isLoading: d
                          },
                          e.id
                        );
                      })
                  })
                : Object(he.jsx)(he.Fragment, {
                    children: D.a.range(0, 20).map(function (e, t) {
                      return Object(he.jsx)(
                        vi,
                        {
                          width: ['185px', '205px', '230px'],
                          mediaType: 'person',
                          title: 'Lorem ipsum',
                          subtitle: '2021 \u2022 Lorem ipsum dolor sit amet',
                          isLoading: !0
                        },
                        t
                      );
                    })
                  })
          });
        },
        bl = Gt(200, 4),
        gl = function (e) {
          var t,
            n,
            o = Object(v.e)(),
            a = Object(J.c)().colorMode,
            i = Object(O.a)('(max-width: 600px)'),
            r = Object(p.a)(i, 1)[0],
            c = w(function (e) {
              return e.user.ui.theme.color;
            }),
            s = e.createdBy,
            l = e.languages,
            d = e.originalLanguage,
            u = e.status,
            b = e.isLoading,
            g = void 0 === b || b,
            j = [
              {
                label: 'Created By',
                children: Object(he.jsx)(Ca, {
                  isLoading: g,
                  children: Object(he.jsx)(Z.a, {
                    divider: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === a ? 'gray.400' : 'gray.500',
                      fontSize: 'sm',
                      pr: 0.75,
                      children: ','
                    }),
                    children: Object(In.a)(g ? D.a.range(0, 2) : s || []).map(function (e, t) {
                      return Object(he.jsx)(
                        pe,
                        {
                          to: 'number' !== typeof e ? { pathname: '/person/'.concat(e.id) } : {},
                          isDisabled: g,
                          whiteSpace: 'nowrap',
                          children: Object(he.jsx)(Zo, {
                            width: g ? ''.concat(bl[Math.floor(Math.random() * bl.length)], 'px') : 'auto',
                            offsetY: 8,
                            isLoaded: !g,
                            children: Object(he.jsx)(U.a, {
                              align: 'left',
                              color: 'light' === a ? 'gray.900' : 'gray.50',
                              fontSize: 'md',
                              sx: {
                                transition: ''
                                  .concat(o.transition.duration.faster, ' ')
                                  .concat(o.transition.easing['ease-out'])
                              },
                              _focus: { boxShadow: 'none' },
                              _hover: { color: ''.concat(c, '.').concat('light' === a ? 500 : 400) },
                              children: 'number' !== typeof e ? e.name : 'Lorem Ipsum'
                            })
                          })
                        },
                        'number' !== typeof e ? e.id : t
                      );
                    })
                  })
                })
              },
              {
                label: ((null === l || void 0 === l ? void 0 : l.length) || 0) > 1 ? 'Original Language' : 'Language',
                children: Object(he.jsx)(Zo, {
                  width: g ? ''.concat(bl[Math.floor(Math.random() * bl.length)], 'px') : 'auto',
                  offsetY: 8,
                  isLoaded: !g,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === a ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children:
                      (null === l ||
                      void 0 === l ||
                      null ===
                        (t = l.find(function (e) {
                          return e.iso_639_1 === d;
                        })) ||
                      void 0 === t
                        ? void 0
                        : t.english_name) || 'N/A'
                  })
                })
              },
              {
                label: 'Other Languages',
                children:
                  ((null === l || void 0 === l ? void 0 : l.length) || 0) > 1
                    ? Object(he.jsx)(Ca, {
                        isLoading: g,
                        children: Object(he.jsx)(Z.a, {
                          divider: Object(he.jsx)(U.a, {
                            align: 'left',
                            color: 'light' === a ? 'gray.400' : 'gray.500',
                            fontSize: 'sm',
                            pr: 0.75,
                            children: ','
                          }),
                          children:
                            null === l ||
                            void 0 === l ||
                            null ===
                              (n = l.filter(function (e) {
                                return e.iso_639_1 !== d;
                              })) ||
                            void 0 === n
                              ? void 0
                              : n.map(function (e, t) {
                                  return Object(he.jsx)(
                                    Zo,
                                    {
                                      width: g ? ''.concat(bl[Math.floor(Math.random() * bl.length)], 'px') : 'auto',
                                      offsetY: 8,
                                      isLoaded: !g,
                                      children: Object(he.jsx)(U.a, {
                                        align: 'left',
                                        color: 'light' === a ? 'gray.900' : 'gray.50',
                                        fontSize: 'md',
                                        whiteSpace: 'nowrap',
                                        children: e.english_name || ''
                                      })
                                    },
                                    t
                                  );
                                })
                        })
                      })
                    : void 0
              },
              {
                label: 'Status',
                children: Object(he.jsx)(Zo, {
                  width: g ? ''.concat(bl[Math.floor(Math.random() * bl.length)], 'px') : 'auto',
                  offsetY: 8,
                  isLoaded: !g,
                  children: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === a ? 'gray.900' : 'gray.50',
                    fontSize: 'md',
                    whiteSpace: 'nowrap',
                    children: u || 'N/A'
                  })
                })
              }
            ],
            h = function () {
              var e = 3;
              return ((null === l || void 0 === l ? void 0 : l.length) || 0) > 1 && (e += 1), ''.concat(100 / e, '%');
            };
          return Object(he.jsx)(Z.b, {
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'stretch',
            direction: r ? 'column' : 'row',
            spacing: r ? 2 : 4,
            children: j.map(function (e, t) {
              return e.children
                ? Object(he.jsx)(
                    Uo,
                    {
                      width: r ? '100%' : 'auto',
                      maxWidth: r ? '100%' : g ? ''.concat(25, '%') : h(),
                      flex: 1,
                      label: e.label,
                      children: e.children
                    },
                    t
                  )
                : null;
            })
          });
        },
        jl = function (e) {
          var t = e.recommendations,
            n = e.name,
            o = e.isError,
            a = void 0 !== o && o,
            i = e.isSuccess,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 !== c && c;
          return Object(he.jsx)(di, {
            title: 'Recommended TV Shows',
            isLoading: s,
            hasDivider: !0,
            variant: 'outlined',
            children: a
              ? Object(he.jsx)(Pa, {
                  label: 'Oh no! Something went wrong',
                  description: 'Failed to fetch '.concat(n ? '"'.concat(n, '"') : '', ' recommended tv show list!'),
                  variant: 'transparent'
                })
              : r && t && 0 === t.length
              ? Object(he.jsx)(bo, {
                  label: 'No recommended tv shows found for '.concat(n ? '"'.concat(n, '"') : ''),
                  variant: 'transparent'
                })
              : r && t && t.length > 0
              ? Object(he.jsx)(he.Fragment, {
                  children: ua()(t, 'popularity', { reverse: !0 }).map(function (e) {
                    return Object(he.jsx)(
                      vi,
                      {
                        width: ['185px', '205px', '230px'],
                        mediaItem: e ? Object(b.a)({}, e) : void 0,
                        mediaType: 'tv',
                        image: {
                          alt: ''.concat((null === e || void 0 === e ? void 0 : e.name) || '', ' tv show poster'),
                          src: (null === e || void 0 === e ? void 0 : e.poster_path) || '',
                          size: { thumbnail: 'w92', full: 'original' }
                        },
                        rating: {
                          rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                          count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                        },
                        title: (null === e || void 0 === e ? void 0 : e.name) || '',
                        subtitle:
                          ''.concat(Ft((null === e || void 0 === e ? void 0 : e.first_air_date) || '', 'year')) ||
                          'N/A',
                        isLoading: !1
                      },
                      e.id
                    );
                  })
                })
              : Object(he.jsx)(he.Fragment, {
                  children: Object(In.a)(D.a.range(0, 20)).map(function (e, t) {
                    return Object(he.jsx)(
                      vi,
                      {
                        width: ['185px', '205px', '230px'],
                        mediaType: 'tv',
                        title: 'Lorem ipsum',
                        subtitle: 'Lorem ipsum',
                        isLoading: !0
                      },
                      t
                    );
                  })
                })
          });
        },
        hl = function (e) {
          var t,
            n,
            o,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            b,
            g,
            j,
            h,
            p,
            v,
            O,
            f = e.tvShowQuery,
            m = e.creditsQuery,
            x = e.imagesQuery,
            y = e.videosQuery,
            A = e.recommendationsQuery,
            w = e.onCoverClick,
            k = e.onMediaClick,
            C = e.onChangeTab;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            maxWidth: '100%',
            spacing: 4,
            children: [
              Object(he.jsx)(Hs, {
                renderCover: Object(he.jsx)(Ys, {
                  children: {
                    poster: Object(he.jsx)(Gs, {
                      title: null === (t = f.data) || void 0 === t ? void 0 : t.name,
                      path: null === (n = f.data) || void 0 === n ? void 0 : n.poster_path,
                      isLoading: f.isFetching || f.isLoading,
                      isError: f.isError,
                      onClick: w
                    }),
                    backdrop: Object(he.jsx)(Rs, {
                      title: null === (o = f.data) || void 0 === o ? void 0 : o.name,
                      path: null === (a = f.data) || void 0 === a ? void 0 : a.backdrop_path,
                      video: ((null === (i = y.data) || void 0 === i ? void 0 : i.results.length) || 0) > 0,
                      isLoading: f.isFetching || f.isLoading || y.isFetching || y.isLoading,
                      isError: f.isError || y.isError,
                      onClick: w
                    })
                  }
                }),
                renderDetails: Object(he.jsx)(gl, {
                  createdBy: null === (r = f.data) || void 0 === r ? void 0 : r.created_by,
                  originalLanguage: null === (c = f.data) || void 0 === c ? void 0 : c.original_language,
                  languages: null === (s = f.data) || void 0 === s ? void 0 : s.spoken_languages,
                  status: null === (l = f.data) || void 0 === l ? void 0 : l.status,
                  isLoading: f.isFetching || f.isLoading
                }),
                tagline: null === (d = f.data) || void 0 === d ? void 0 : d.tagline,
                overview: null === (u = f.data) || void 0 === u ? void 0 : u.overview,
                isLoading: f.isFetching || f.isLoading
              }),
              Object(he.jsx)(ul, {
                cast: null === (b = m.data) || void 0 === b ? void 0 : b.cast,
                name: null === (g = f.data) || void 0 === g ? void 0 : g.name,
                isError: m.isError,
                isSuccess: m.isSuccess,
                isLoading: m.isFetching || m.isLoading,
                onChangeTab: function () {
                  return C(1);
                }
              }),
              Object(he.jsx)(tl, {
                title: null === (j = f.data) || void 0 === j ? void 0 : j.name,
                photos: null === (h = x.data) || void 0 === h ? void 0 : h.posters,
                backdrops: null === (p = x.data) || void 0 === p ? void 0 : p.backdrops,
                videos: null === (v = y.data) || void 0 === v ? void 0 : v.results,
                isError: { images: x.isError, videos: y.isError },
                isSuccess: { images: x.isSuccess, videos: y.isSuccess },
                isLoading: { images: x.isFetching || x.isLoading, videos: y.isFetching || y.isLoading },
                onClick: k
              }),
              Object(he.jsx)(jl, {
                recommendations: A.data,
                name: null === (O = f.data) || void 0 === O ? void 0 : O.name,
                isError: A.isError,
                isSuccess: A.isSuccess,
                isLoading: A.isFetching || A.isLoading
              })
            ]
          });
        },
        pl = function () {
          var e = Object(v.e)(),
            t = Object(J.c)().colorMode;
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            justifyContent: 'space-between',
            p: 2,
            sx: { cursor: 'not-allowed', width: '100%', backgroundColor: 'transparent' },
            children: [
              Object(he.jsxs)(Z.c, {
                alignItems: 'flex-start',
                spacing: 0,
                children: [
                  Object(he.jsx)(Zo, {
                    offsetY: 9,
                    isLoaded: !1,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === t ? 'gray.900' : 'gray.50',
                      fontSize: 'lg',
                      fontWeight: 'semibold',
                      children: 'Season 0'
                    })
                  }),
                  Object(he.jsx)(Zo, {
                    offsetY: 6,
                    isLoaded: !1,
                    children: Object(he.jsx)(U.a, {
                      align: 'left',
                      color: 'light' === t ? 'gray.400' : 'gray.500',
                      fontSize: 'xs',
                      children: 'Lorem Ipsum'
                    })
                  })
                ]
              }),
              Object(he.jsx)(Se.a, {
                as: Te.a,
                sx: {
                  color: 'light' === t ? 'gray.400' : 'gray.500',
                  fontSize: ''.concat(e.fontSizes.xl, ' !important')
                }
              })
            ]
          });
        },
        vl = Gt(200, 4),
        Ol = function (e) {
          var t = Object(J.c)().colorMode,
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            o = e.seasons,
            a = e.openedSeasons,
            i = e.isError,
            r = void 0 !== i && i,
            c = e.isLoading,
            s = void 0 === c || c,
            l = e.onToggleSeason,
            d = e.onToggleAllSeasons;
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            maxWidth: '100%',
            justifyContent: 'stretch',
            spacing: s ? 1 : 0,
            children: [
              Object(he.jsx)(U.a, {
                align: 'left',
                color: 'light' === t ? 'gray.400' : 'gray.500',
                fontSize: 'sm',
                whiteSpace: 'nowrap',
                py: 0.75,
                children: 'Jump to:'
              }),
              Object(he.jsx)(Ca, {
                width: 'calc(100% - '.concat(
                  (null === o || void 0 === o ? void 0 : o.length) === a ? 140.1 : 148.19,
                  'px)'
                ),
                spacing: '0',
                isLoading: s,
                children: Object(he.jsx)(Z.a, {
                  width: '100%',
                  maxWidth: '100%',
                  divider: Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === t ? 'gray.400' : 'gray.500',
                    fontSize: 'md',
                    mx: s ? 0.75 : 0,
                    children: '\u2022'
                  }),
                  children: Object(In.a)(!s && o ? o : D.a.range(0, 4)).map(function (e, t) {
                    return Object(he.jsx)(
                      Zo,
                      {
                        width: s ? ''.concat(vl[Math.floor(Math.random() * vl.length)], 'px') : 'auto',
                        offsetY: 6,
                        isLoaded: !s,
                        children: Object(he.jsx)(oi.Link, {
                          to: r ? '' : ''.concat('number' !== typeof e ? e.toLowerCase() : ''),
                          spy: !0,
                          smooth: !0,
                          isDynamic: !1,
                          offset: -82,
                          delay: 1e3,
                          children: Object(he.jsx)(bn, {
                            color: Wt(n),
                            onClick:
                              'number' !== typeof e && o
                                ? function () {
                                    return l(
                                      o.findIndex(function (t) {
                                        return t === e;
                                      })
                                    );
                                  }
                                : void 0,
                            isDisabled: r || s,
                            size: 'sm',
                            variant: 'text',
                            children: 'number' !== typeof e ? e : 'Lorem'
                          })
                        })
                      },
                      t
                    );
                  })
                })
              }),
              Object(he.jsx)(bn, {
                isDisabled: s,
                onClick: function () {
                  return d();
                },
                size: 'sm',
                variant: 'text',
                children: (null === o || void 0 === o ? void 0 : o.length) === a ? 'Hide all' : 'Show all'
              })
            ]
          });
        },
        fl = function () {
          var e = Object(J.c)().colorMode;
          return Object(he.jsx)(f.a, {
            width: '100%',
            height: '2px',
            backgroundColor: 'light' === e ? 'gray.200' : 'gray.700'
          });
        },
        ml = Gt(100, 10),
        xl = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.date,
            o = e.isLoading,
            a = void 0 !== o && o;
          return Object(he.jsx)(Zo, {
            width: a ? ''.concat(ml[Math.floor(Math.random() * ml.length)], '%') : '100%',
            offsetY: 11.5,
            isLoaded: !a,
            children: Object(he.jsx)(U.a, {
              align: 'left',
              fontSize: ['sm', 'md', 'lg', 'xl'],
              color: 'light' === t ? 'gray.400' : 'gray.500',
              children: a ? 'Lorem ipsum' : Ft(n, 'full')
            })
          });
        },
        yl = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.isOpen,
            o = void 0 !== n && n,
            a = e.name,
            i = e.date,
            r = e.onClose;
          return Object(he.jsx)(pn, {
            title: Object(he.jsxs)(Z.c, {
              alignItems: 'flex-start',
              spacing: 0,
              children: [
                Object(he.jsx)(U.a, {
                  align: 'left',
                  fontSize: 'xl',
                  fontWeight: 'semibold',
                  color: 'light' === t ? 'gray.900' : 'gray.50',
                  children: a
                }),
                Object(he.jsx)(U.a, {
                  align: 'left',
                  fontSize: 'xs',
                  fontWeight: 'normal',
                  color: 'light' === t ? 'gray.400' : 'gray.500',
                  children: Ft(i, 'full')
                })
              ]
            }),
            isOpen: o,
            onClose: r,
            isCentered: !0,
            size: '2xl',
            children: Object(he.jsx)('h1', { children: 'EpisodeModal' })
          });
        },
        Al = Gt(100, 10),
        wl = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.name,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = Object(o.useState)(!1),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(o.useCallback)(
              function (e) {
                e && l(Rt(e));
              },
              [s, l]
            );
          return Object(he.jsx)(Zo, {
            width: i ? ''.concat(Al[Math.floor(Math.random() * Al.length)], '%') : '100%',
            offsetY: 11.5,
            isLoaded: !i,
            children: Object(he.jsx)(U.a, {
              ref: d,
              align: 'left',
              fontSize: ['lg', 'xl', '2xl', '3xl'],
              fontWeight: 'semibold',
              color: 'light' === t ? 'gray.900' : 'gray.50',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              children: i ? 'Lorem ipsum' : n
            })
          });
        },
        kl = function (e) {
          var t = Object(J.c)().colorMode,
            n = e.overview,
            a = e.isLoading,
            i = void 0 !== a && a,
            r = Object(o.useState)(!1),
            c = Object(p.a)(r, 2),
            s = c[0],
            l = c[1],
            d = Object(o.useCallback)(
              function (e) {
                e && l(Rt(e));
              },
              [s, l]
            );
          return Object(he.jsx)(Zo, {
            width: '100%',
            offsetY: 11.5,
            isLoaded: !i,
            children: Object(he.jsx)(U.a, {
              ref: d,
              align: 'left',
              fontSize: ['sm', 'md', 'lg', 'xl'],
              color: 'light' === t ? 'gray.400' : 'gray.500',
              isTruncated: !0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              children: i ? 'Lorem ipsum' : n
            })
          });
        },
        Cl = ['100px', '116px', '152px', '188px', '188px', '224px'],
        Sl = function (e) {
          var t = Object(v.e)(),
            n = Object(fe.a)(),
            o = n.isOpen,
            a = n.onOpen,
            i = n.onClose,
            r = Object(O.a)('(max-width: 600px)'),
            c = Object(p.a)(r, 1)[0],
            s = Object($n.a)({
              'base': t.fontSizes.lg,
              'sm': t.fontSizes.lg,
              'md': t.fontSizes.xl,
              'lg': t.fontSizes['2xl'],
              'xl': t.fontSizes['2xl'],
              '2xl': t.fontSizes['3xl']
            }),
            l = Object(Co.a)({ threshold: [0.2, 0.4, 0.6, 0.8, 1], unobserveOnEnter: !0 }),
            d = l.observe,
            u = l.inView,
            b = e.image,
            g = e.rating,
            j = e.name,
            h = void 0 === j ? 'Lorem ipsum' : j,
            m = e.date,
            x = void 0 === m ? 'Lorem ipsum' : m,
            y = e.overview,
            A = void 0 === y ? 'Lorem ipsum' : y,
            w = e.number,
            k = e.isLoading,
            C = void 0 !== k && k;
          return Object(he.jsxs)(he.Fragment, {
            children: [
              Object(he.jsx)(kn, {
                isFullWidth: !0,
                isDisabled: C,
                isClickable: !0,
                onClick: function () {
                  return a();
                },
                isLight: !0,
                children: Object(he.jsxs)(Z.a, {
                  width: '100%',
                  position: 'relative',
                  spacing: [1, 1, 2, 2, 2, 2],
                  p: [1, 1, 2, 2, 2, 2],
                  children: [
                    Object(he.jsx)(f.a, {
                      ref: d,
                      as: wo.a,
                      width: Cl,
                      minWidth: Cl,
                      maxWidth: Cl,
                      borderRadius: 'base',
                      ratio: 2 / 3,
                      children: Object(he.jsx)(eo.a, {
                        in: C || u,
                        unmountOnExit: !0,
                        style: { width: 'inherit', borderRadius: 'inherit' },
                        children: Object(he.jsx)(wo.a, {
                          width: Cl,
                          minWidth: Cl,
                          maxWidth: Cl,
                          borderRadius: 'base',
                          ratio: 2 / 3,
                          children: Object(he.jsx)(Ho, {
                            isLoaded: !C && Boolean(b),
                            borderRadius: 'base',
                            children: Object(he.jsx)(Oo, {
                              alt: (null === b || void 0 === b ? void 0 : b.alt) || '',
                              maxWidth: 'none',
                              height: '100%',
                              mediaType: 'tv',
                              borderRadius: 'base',
                              thumbnailSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/')
                                .concat((null === b || void 0 === b ? void 0 : b.size.thumbnail) || '')
                                .concat((null === b || void 0 === b ? void 0 : b.src) || ''),
                              fullSrc: ''
                                .concat('https://image.tmdb.org/t/p', '/')
                                .concat((null === b || void 0 === b ? void 0 : b.size.full) || '')
                                .concat((null === b || void 0 === b ? void 0 : b.src) || '')
                            })
                          })
                        })
                      })
                    }),
                    Object(he.jsxs)(Z.c, {
                      width: [
                        'calc(100% - 108px)',
                        'calc(100% - 124px)',
                        'calc(100% - 168px)',
                        'calc(100% - 204px)',
                        'calc(100% - 204px)',
                        'calc(100% - 240px)'
                      ],
                      alignItems: 'flex-start',
                      spacing: [1, 1, 2, 2, 2, 2],
                      children: [
                        Object(he.jsx)($o, {
                          rating: g,
                          isLoading: C,
                          iconFontsize: s,
                          textFontsize: ['sm', 'sm', 'md', 'lg', 'lg', 'xl']
                        }),
                        Object(he.jsxs)(Z.c, {
                          width: '100%',
                          alignItems: 'flex-start',
                          spacing: C ? 0.5 : 0,
                          children: [
                            Object(he.jsx)(wl, { name: h, isLoading: C }),
                            Object(he.jsx)(xl, { date: x, isLoading: C })
                          ]
                        }),
                        Object(he.jsx)(f.a, {
                          width: '100%',
                          children: Object(he.jsx)(kl, { overview: A, isLoading: C })
                        })
                      ]
                    }),
                    Object(he.jsx)(_e.a, {
                      in: !C,
                      unmountOnExit: !0,
                      children: Object(he.jsx)(f.a, {
                        sx: { position: 'absolute', top: c ? 1 : 2, right: c ? 1 : 2 },
                        children: Object(he.jsx)(yo, { label: 'Episode '.concat(w), size: c ? 'sm' : 'md' })
                      })
                    })
                  ]
                })
              }),
              Object(he.jsx)(yl, { isOpen: o, name: h, date: x, onClose: i })
            ]
          });
        },
        Dl = function (e) {
          var t = e.children;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 3,
            pb: 2,
            children: [Object(he.jsx)(fl, {}), Object(he.jsx)(f.a, { width: 'auto', children: t })]
          });
        },
        El = function (e) {
          var t = Object(v.e)(),
            n = Object(J.c)().colorMode,
            o = e.title,
            a = e.date,
            i = e.episodes,
            r = void 0 === i ? 0 : i,
            c = e.isOpen,
            s = void 0 === c || c,
            l = e.onToggle;
          return Object(he.jsxs)(Z.a, {
            width: '100%',
            justifyContent: 'space-between',
            onClick: function () {
              return l();
            },
            p: 2,
            sx: {
              'cursor': 'pointer',
              'width': '100%',
              'backgroundColor': 'transparent',
              'transition': ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out']),
              '& .MuiSvgIcon-root': {
                color: 'light' === n ? 'gray.400' : 'gray.500',
                fontSize: ''.concat(t.fontSizes.xl, ' !important'),
                transform: 'rotate('.concat(s ? '90deg' : '0deg', ')'),
                transition: ''.concat(t.transition.duration.faster, ' ').concat(t.transition.easing['ease-out'])
              },
              '&:hover': { '& .MuiSvgIcon-root': { color: 'light' === n ? 'gray.900' : 'gray.50' } }
            },
            children: [
              Object(he.jsxs)(Z.c, {
                alignItems: 'flex-start',
                spacing: 0,
                children: [
                  Object(he.jsx)(U.a, {
                    align: 'left',
                    color: 'light' === n ? 'gray.900' : 'gray.50',
                    fontSize: 'lg',
                    fontWeight: 'semibold',
                    children: o || 'N/A'
                  }),
                  a
                    ? Object(he.jsx)(U.a, {
                        align: 'left',
                        color: 'light' === n ? 'gray.400' : 'gray.500',
                        fontSize: 'xs',
                        children: Ft(a, 'full')
                      })
                    : null
                ]
              }),
              Object(he.jsxs)(Z.a, {
                children: [
                  Object(he.jsx)(yo, {
                    label: ''.concat(r, ' episode').concat(0 === r || r > 1 ? 's' : ''),
                    size: 'md'
                  }),
                  Object(he.jsx)(Se.a, { as: Te.a })
                ]
              })
            ]
          });
        },
        Ll = function (e) {
          var t,
            n = C.a.CancelToken.source(),
            a = Object(v.e)(),
            i = Object(J.c)().colorMode,
            r = e.tvId,
            c = e.season,
            s = e.isOpen,
            l = void 0 === s || s,
            d = e.onToggle,
            u = c.name,
            g = c.air_date,
            O = c.episode_count,
            f = c.season_number,
            m = c.overview,
            x = (function (e) {
              var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
              return {
                season: {
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  borderStyle: 'solid',
                  borderWidth: '2px',
                  borderRadius: 'lg',
                  transition: ''.concat(e.transition.duration.faster, ' ').concat(e.transition.easing['ease-out'])
                },
                light: {
                  'backgroundColor': 'transparent',
                  'borderColor': 'gray.200',
                  '&:hover': { backgroundColor: 'transparent', borderColor: t ? 'gray.200' : 'gray.400' },
                  '&:active': { backgroundColor: 'transparent', borderColor: t ? 'gray.200' : 'gray.400' }
                },
                dark: {
                  'backgroundColor': 'transparent',
                  'borderColor': 'gray.700',
                  '&:hover': { backgroundColor: 'transparent', borderColor: t ? 'gray.700' : 'gray.500' },
                  '&:active': { backgroundColor: 'transparent', borderColor: t ? 'gray.700' : 'gray.500' }
                }
              };
            })(a, l),
            y = Object(o.useState)(10),
            A = Object(p.a)(y, 2),
            w = A[0],
            k = A[1],
            S = Object(go.a)(
              ['tv-show-'.concat(r, '-season-').concat(f), r],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, o;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(r, '/season/').concat(f), { cancelToken: n.token });
                        case 2:
                          return (t = e.sent), (o = t.data), e.abrupt('return', o);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              ),
              { enabled: l }
            ),
            E = S.isFetching || S.isLoading || !1,
            L = (null === (t = S.data) || void 0 === t ? void 0 : t.episodes) || [];
          return (
            Object(o.useEffect)(function () {
              return function () {
                return n.cancel();
              };
            }, []),
            Object(he.jsxs)(Z.c, {
              spacing: 0,
              sx: Object(b.a)({}, D.a.merge(x.season, x[i])),
              children: [
                Object(he.jsx)(Ga.a, { children: Object(he.jsx)('span', { id: u.toLowerCase() }) }),
                Object(he.jsx)(El, { title: u, date: g, episodes: O, isOpen: l, onToggle: d }),
                Object(he.jsx)(Be.a, {
                  in: l,
                  unmountOnExit: !0,
                  style: { width: '100%' },
                  children: Object(he.jsxs)(Z.c, {
                    width: '100%',
                    spacing: 2,
                    px: 2,
                    pb: 2,
                    children: [
                      Object(he.jsx)(fl, {}),
                      Object(he.jsxs)(Z.c, {
                        width: '100%',
                        maxWidth: '100%',
                        spacing: 2,
                        children: [
                          m
                            ? Object(he.jsx)(U.a, {
                                align: 'left',
                                color: 'light' === i ? 'gray.400' : 'gray.500',
                                fontSize: 'sm',
                                children: m
                              })
                            : null,
                          !E && S.isError
                            ? Object(he.jsx)(Pa, {
                                label: 'Oh no! Something went wrong',
                                description: 'Failed to fetch '.concat(u ? '"'.concat(u, '"') : '', ' episodes list!'),
                                variant: 'outlined'
                              })
                            : !E && S.isSuccess && L && 0 === L.length
                            ? Object(he.jsx)(bo, {
                                label: ''.concat(u ? '"'.concat(u, '"') : '', ' episodes list is currently empty!'),
                                variant: 'outlined'
                              })
                            : !E && S.isSuccess && L && L.length > 0
                            ? L.filter(function (e, t) {
                                return t < w;
                              }).map(function (e) {
                                return Object(he.jsx)(
                                  Sl,
                                  {
                                    image: {
                                      alt: ''.concat(
                                        (null === e || void 0 === e ? void 0 : e.name) || '',
                                        ' episode poster'
                                      ),
                                      src: (null === e || void 0 === e ? void 0 : e.still_path) || '',
                                      size: { thumbnail: 'w92', full: 'original' }
                                    },
                                    rating: {
                                      rating: (null === e || void 0 === e ? void 0 : e.vote_average) || null,
                                      count: (null === e || void 0 === e ? void 0 : e.vote_count) || null
                                    },
                                    name: (null === e || void 0 === e ? void 0 : e.name) || '',
                                    date: e.air_date,
                                    overview: (null === e || void 0 === e ? void 0 : e.overview) || '',
                                    number: e.episode_number,
                                    isLoading: E
                                  },
                                  e.id
                                );
                              })
                            : D.a.range(0, 5).map(function (e, t) {
                                return Object(he.jsx)(
                                  Sl,
                                  {
                                    image: {
                                      alt: 'Episode poster',
                                      src: '',
                                      size: { thumbnail: 'w92', full: 'original' }
                                    },
                                    name: 'Lorem ipsum',
                                    date: 'Lorem ipsum',
                                    overview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                    isLoading: !0
                                  },
                                  t
                                );
                              })
                        ]
                      }),
                      ((null === L || void 0 === L ? void 0 : L.length) || 0) > 10
                        ? Object(he.jsx)(Dl, {
                            children: Object(he.jsx)(Oc, {
                              amount: w,
                              total: (null === L || void 0 === L ? void 0 : L.length) || 0,
                              label: 'Episodes',
                              onClick: function () {
                                return k(w + 10);
                              }
                            })
                          })
                        : void 0
                    ]
                  })
                })
              ]
            })
          );
        },
        _l = function (e) {
          var t = Object(o.useState)([]),
            n = Object(p.a)(t, 2),
            a = n[0],
            i = n[1],
            r = e.seasons,
            c = e.tvId,
            s = e.name,
            l = e.isError,
            d = void 0 !== l && l,
            u = e.isSuccess,
            b = void 0 !== u && u,
            g = e.isLoading,
            j = void 0 === g || g;
          return Object(he.jsxs)(Z.c, {
            width: '100%',
            spacing: 2,
            children: [
              Object(he.jsx)(Ol, {
                seasons:
                  null === r || void 0 === r
                    ? void 0
                    : r.map(function (e) {
                        return e.name;
                      }),
                openedSeasons: a.length,
                isError: d,
                isLoading: j,
                onToggleSeason: function (e) {
                  return i([].concat(Object(In.a)(a), [e]));
                },
                onToggleAllSeasons: function () {
                  var e;
                  (null === r || void 0 === r ? void 0 : r.length) === a.length
                    ? i([])
                    : i(
                        Object(In.a)(
                          null === (e = r || []) || void 0 === e
                            ? void 0
                            : e.map(function (e, t) {
                                return t;
                              })
                        )
                      );
                }
              }),
              !j && d
                ? Object(he.jsx)(Pa, {
                    label: 'Oh no! Something went wrong',
                    description: 'Failed to fetch '.concat(s ? '"'.concat(s, '"') : '', ' tv show seasons list!'),
                    variant: 'outlined'
                  })
                : !j && b && r && 0 === r.length
                ? Object(he.jsx)(bo, {
                    label: ''.concat(s ? '"'.concat(s, '"') : '', ' tv show seasons list is currently empty!'),
                    variant: 'outlined'
                  })
                : !j && b && r && r.length > 0
                ? r.map(function (e, t) {
                    return Object(he.jsx)(
                      Ll,
                      {
                        tvId: c,
                        index: t,
                        season: e,
                        isOpen: a.includes(t),
                        onToggle: function () {
                          return (function (e) {
                            a.includes(e)
                              ? i(
                                  a.filter(function (t) {
                                    return t !== e;
                                  })
                                )
                              : i([].concat(Object(In.a)(a), [e]));
                          })(t);
                        }
                      },
                      e.id
                    );
                  })
                : D.a.range(0, 20).map(function (e, t) {
                    return Object(he.jsx)(pl, {}, t);
                  })
            ]
          });
        },
        Bl = function () {
          var e,
            t,
            n,
            a,
            i,
            r,
            c,
            s,
            l,
            d,
            u,
            g,
            v,
            O,
            f,
            m,
            x,
            y,
            A,
            k,
            S,
            D,
            E,
            L,
            B,
            M,
            T = C.a.CancelToken.source(),
            z = Object(J.c)().colorMode,
            I = Object(fe.a)(),
            F = I.isOpen,
            Q = I.onOpen,
            N = I.onClose,
            Y = Object(ge.h)().id,
            W = w(function (e) {
              return e.user.data.reviews.user;
            }).filter(function (e) {
              return e.mediaItem.id === Number(Y);
            }),
            P = Object(o.useState)(),
            R = Object(p.a)(P, 2),
            G = R[0],
            V = R[1],
            H = Object(o.useState)(0),
            Z = Object(p.a)(H, 2),
            U = Z[0],
            q = Z[1],
            X = Object(o.useState)(),
            K = Object(p.a)(X, 2),
            $ = K[0],
            ee = K[1],
            te = Object(go.a)(
              ['tv-show-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y), { cancelToken: T.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            ne = Object(go.a)(
              ['tv-show-aggregate_credits-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y, '/aggregate_credits'), { cancelToken: T.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            oe = Object(go.a)(
              ['tv-show-certifications-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y, '/content_ratings'), { cancelToken: T.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            ae = Object(go.a)(
              ['tv-show-external_ids-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y, '/external_ids'), { cancelToken: T.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            ie = Object(go.a)(
              ['tv-show-images-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y, '/images'), { cancelToken: T.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            re = Object(go.a)(
              ['tv-show-videos-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y, '/videos'), { cancelToken: T.token });
                        case 2:
                          return (t = e.sent), (n = t.data), e.abrupt('return', n);
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            ce = Object(pc.a)(
              ['tv-show-reviews-'.concat(Y), Y],
              (function () {
                var e = Object(h.a)(
                  j.a.mark(function e(t) {
                    var n, o, a, i;
                    return j.a.wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (n = t.pageParam),
                              (o = void 0 === n ? 1 : n),
                              (e.next = 3),
                              _.get('/tv/'.concat(Y, '/reviews'), { params: { page: o }, cancelToken: T.token })
                            );
                          case 3:
                            return (a = e.sent), (i = a.data), e.abrupt('return', i);
                          case 6:
                          case 'end':
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              {
                getPreviousPageParam: function (e) {
                  return 1 !== e.page && e.page - 1;
                },
                getNextPageParam: function (e) {
                  return e.page !== e.total_pages && e.page + 1;
                },
                onSuccess: function (e) {
                  var t = [];
                  e.pages.forEach(function (e) {
                    t = [].concat(Object(In.a)(t), Object(In.a)(e.results));
                  }),
                    ee({
                      page: e.pages[e.pages.length - 1].page,
                      results: ua()(t, 'updated_at', { reverse: !0 }),
                      total_pages: e.pages[e.pages.length - 1].total_pages,
                      total_results: e.pages[e.pages.length - 1].total_results
                    });
                }
              }
            ),
            se = Object(go.a)(
              ['tv-show-recommendations-'.concat(Y), Y],
              Object(h.a)(
                j.a.mark(function e() {
                  var t, n;
                  return j.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), _.get('/tv/'.concat(Y, '/recommendations'), { cancelToken: T.token });
                        case 2:
                          return (
                            (t = e.sent),
                            (n = t.data),
                            e.abrupt(
                              'return',
                              n.results.filter(function (e, t) {
                                return t < 20;
                              })
                            )
                          );
                        case 5:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            le = function (e, t) {
              V({ type: t, asset: e }), Q();
            };
          return (
            Object(o.useEffect)(function () {
              return function () {
                return T.cancel();
              };
            }, []),
            Object(he.jsxs)(he.Fragment, {
              children: [
                Object(he.jsx)(Kc, {
                  activeTab: U,
                  onChange: function (e) {
                    return q(e);
                  },
                  children: Object(he.jsx)(Ns, {
                    children: {
                      title: Object(he.jsx)(ta, {
                        title: null === (e = te.data) || void 0 === e ? void 0 : e.name,
                        rating: {
                          rating: (null === (t = te.data) || void 0 === t ? void 0 : t.vote_average) || null,
                          count: (null === (n = te.data) || void 0 === n ? void 0 : n.vote_count) || null
                        },
                        date:
                          !(null === (a = te.data) || void 0 === a ? void 0 : a.in_production) &&
                          (null === (i = te.data) || void 0 === i ? void 0 : i.last_air_date)
                            ? ''
                                .concat(
                                  Ft(
                                    (null === (r = te.data) || void 0 === r ? void 0 : r.first_air_date) || '',
                                    'year'
                                  ),
                                  ' - '
                                )
                                .concat(
                                  Ft((null === (c = te.data) || void 0 === c ? void 0 : c.last_air_date) || '', 'year')
                                )
                            : ''.concat(
                                Ft((null === (s = te.data) || void 0 === s ? void 0 : s.first_air_date) || '', 'year'),
                                ' - present'
                              ),
                        certification:
                          null === (l = oe.data) ||
                          void 0 === l ||
                          null ===
                            (d = l.results.find(function (e) {
                              return 'US' === e.iso_3166_1;
                            })) ||
                          void 0 === d
                            ? void 0
                            : d.rating,
                        genres: null === (u = te.data) || void 0 === u ? void 0 : u.genres,
                        runtime: (null === (g = te.data) || void 0 === g ? void 0 : g.episode_run_time)
                          ? te.data.episode_run_time.reduce(function (e, t) {
                              return e + t;
                            }, 0) / (null === (v = te.data) || void 0 === v ? void 0 : v.episode_run_time.length)
                          : void 0,
                        isLoading: te.isFetching || te.isLoading
                      }),
                      actions: Object(he.jsx)(ns, {
                        mediaItem: te.data
                          ? {
                              poster_path: te.data.poster_path,
                              popularity: te.data.popularity,
                              id: te.data.id,
                              backdrop_path: te.data.backdrop_path,
                              vote_average: te.data.vote_average,
                              vote_count: te.data.vote_count,
                              overview: te.data.overview,
                              first_air_date: te.data.first_air_date,
                              origin_country: te.data.origin_country,
                              original_language: te.data.original_language,
                              original_name: te.data.original_name,
                              name: te.data.name,
                              genre_ids: te.data.genres.map(function (e) {
                                return e.id;
                              })
                            }
                          : void 0,
                        mediaType: 'tv',
                        title: null === (O = te.data) || void 0 === O ? void 0 : O.name,
                        isLoading: te.isFetching || te.isLoading,
                        isError: te.isError
                      }),
                      tabList: Object(he.jsx)(es, {
                        renderTabs: [
                          { label: 'Overview' },
                          {
                            label: 'Series Cast & Crew',
                            isDisabled: ne.isError || ne.isFetching || ne.isLoading,
                            badge: String(
                              ((null === (f = ne.data) || void 0 === f ? void 0 : f.cast.length) || 0) +
                                ((null === (m = ne.data) || void 0 === m ? void 0 : m.crew.length) || 0)
                            )
                          },
                          {
                            label: 'Seasons',
                            isDisabled: te.isError || te.isFetching || te.isLoading,
                            badge: String((null === (x = te.data) || void 0 === x ? void 0 : x.number_of_seasons) || 0)
                          },
                          {
                            label: 'Reviews',
                            isDisabled:
                              te.isError ||
                              te.isFetching ||
                              te.isLoading ||
                              ce.isError ||
                              ce.isFetching ||
                              ce.isLoading,
                            badge: String(((null === $ || void 0 === $ ? void 0 : $.total_results) || 0) + W.length)
                          }
                        ],
                        activeTab: U
                      }),
                      socials: Object(he.jsx)(fa, {
                        socials: ae.data,
                        name: null === (y = te.data) || void 0 === y ? void 0 : y.name,
                        orientation: 'horizontal',
                        color: 'light' === z ? 'gray.400' : 'gray.500',
                        isLoading: ae.isFetching || ae.isLoading
                      }),
                      tabPanels: Object(he.jsxs)(ts, {
                        activeTab: U,
                        children: [
                          Object(he.jsx)(hl, {
                            tvShowQuery: te,
                            creditsQuery: ne,
                            imagesQuery: ie,
                            videosQuery: re,
                            recommendationsQuery: se,
                            onCoverClick: function (e, t) {
                              switch (t) {
                                case 'video':
                                  var n,
                                    o =
                                      null === (n = re.data) || void 0 === n
                                        ? void 0
                                        : n.results.find(function (e) {
                                            return e.official || 'Trailer' === e.type;
                                          });
                                  o && le(o.key, 'video');
                                  break;
                                default:
                                  le(e, t);
                              }
                            },
                            onMediaClick: le,
                            onChangeTab: function (e) {
                              var t;
                              q(e), null === (t = document.scrollingElement) || void 0 === t || t.scrollTo(0, 0);
                            }
                          }),
                          Object(he.jsx)(js, {
                            mediaType: 'tv',
                            cast: null === (A = ne.data) || void 0 === A ? void 0 : A.cast,
                            crew: null === (k = ne.data) || void 0 === k ? void 0 : k.crew,
                            isError: ne.isError,
                            isSuccess: ne.isSuccess,
                            isLoading: ne.isFetching || ne.isLoading
                          }),
                          Object(he.jsx)(_l, {
                            seasons: null === (S = te.data) || void 0 === S ? void 0 : S.seasons,
                            tvId: null === (D = te.data) || void 0 === D ? void 0 : D.id,
                            name: null === (E = te.data) || void 0 === E ? void 0 : E.name,
                            isError: te.isError,
                            isSuccess: te.isSuccess,
                            isLoading: te.isFetching || te.isLoading
                          }),
                          Object(he.jsx)(Qs, {
                            mediaItem: te.data ? Object(b.a)({}, te.data) : void 0,
                            mediaType: 'tv',
                            reviews: $,
                            isError: ce.isError,
                            isSuccess: ce.isSuccess,
                            isLoading: ce.isFetching || ce.isLoading,
                            hasNextPage: ce.hasNextPage,
                            onFetchNextPage: ce.fetchNextPage
                          })
                        ]
                      })
                    }
                  })
                }),
                ie.isSuccess || re.isSuccess
                  ? Object(he.jsx)(Po, {
                      isOpen: F,
                      selected: G,
                      photos: Object(In.a)((null === (L = ie.data) || void 0 === L ? void 0 : L.posters) || []),
                      backdrops: Object(In.a)((null === (B = ie.data) || void 0 === B ? void 0 : B.backdrops) || []),
                      videos: Object(In.a)(
                        (null === (M = re.data) || void 0 === M
                          ? void 0
                          : M.results.filter(function (e) {
                              return 'YouTube' === e.site;
                            })) || []
                      ),
                      mediaType: 'tv',
                      onClose: N
                    })
                  : null
              ]
            })
          );
        },
        Ml = Object(Di.a)(f.a),
        Tl = function (e) {
          var t = e.children;
          return Object(he.jsx)(Ml, {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
            children: t
          });
        },
        zl = function () {
          var e = Object(ge.f)(),
            t = Object(ge.g)(),
            n = w(function (e) {
              return e.user.ui.theme.color;
            });
          return (
            Object(o.useEffect)(
              function () {
                var e;
                t.pathname.includes('search') ||
                  null === (e = document.scrollingElement) ||
                  void 0 === e ||
                  e.scrollTo(0, 0);
              },
              [t]
            ),
            Object(he.jsx)(_i.a, {
              exitBeforeEnter: !0,
              initial: !1,
              children: Object(he.jsxs)(
                ge.c,
                {
                  location: t,
                  children: [
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Hi, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/liked',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Hr, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/liked/:mediaType',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Hr, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/lists',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(gc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/lists/:id',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(gc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/lists/:id/:mediaType',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(gc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/search',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Rc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/trending',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Gc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/trending/:mediaType',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Gc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/movies',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(hc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/movies/popular',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(mc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/movies/upcoming',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(yc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/movies/now-playing',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(fc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/movies/top-rated',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(xc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/movie/:id',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(dl, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/tv',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Hc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/tv/popular',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Uc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/tv/airing-today',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Jc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/tv/on-tv',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Zc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/tv/top-rated',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(qc, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/tv/:id',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Bl, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/people',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(Ac, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      exact: !0,
                      path: '/person/:id',
                      children: Object(he.jsx)(Tl, { children: Object(he.jsx)(yi, {}) })
                    }),
                    Object(he.jsx)(ge.a, {
                      children: Object(he.jsx)(Tl, {
                        children: Object(he.jsx)(zi, {
                          code: 404,
                          title: 'Page not found!',
                          subtitle: 'Please check the URL in the address bar and try again.',
                          actions: Object(he.jsxs)(he.Fragment, {
                            children: [
                              Object(he.jsx)(bn, {
                                color: Wt(n),
                                onClick: function () {
                                  return e.push({ pathname: '/' });
                                },
                                variant: 'outlined',
                                children: 'Go back home'
                              }),
                              Object(he.jsx)(bn, {
                                color: Wt(n),
                                onClick: function () {
                                  return window.location.reload(), !1;
                                },
                                children: 'Try again'
                              })
                            ]
                          })
                        })
                      })
                    })
                  ]
                },
                t.pathname
              )
            })
          );
        },
        Il = n(266),
        Fl = n.n(Il),
        Ql = function () {
          var e = Object(v.e)(),
            t = Object(hn.e)().height,
            n = w(function (e) {
              return e.user.ui.theme.color;
            }),
            a = Object(o.useState)(0),
            i = Object(p.a)(a, 2),
            r = i[0],
            c = i[1],
            s = Object(Le.a)(),
            l = Object(p.a)(s, 2),
            d = l[0],
            u = l[1],
            b = Object(o.useCallback)(
              D.a.debounce(function () {
                var e,
                  n,
                  o =
                    (null === (e = document) || void 0 === e || null === (n = e.scrollingElement) || void 0 === n
                      ? void 0
                      : n.scrollTop) || 0;
                o <= t && u.off(), c(o);
              }, 250),
              [document, c]
            );
          return (
            Object(o.useEffect)(function () {
              return (
                b(),
                window.addEventListener('scroll', b),
                function () {
                  return window.removeEventListener('scroll', b);
                }
              );
            }, []),
            Object(he.jsx)(f.a, {
              position: 'fixed',
              bottom: e.space[2],
              right: e.space[2],
              zIndex: e.zIndices.toast,
              borderRadius: 'lg',
              boxShadow: 'lg',
              backgroundColor: 'transparent',
              children: Object(he.jsx)(mo.a, {
                in: r > screen.height,
                unmountOnExit: !0,
                offsetY: e.space[2],
                children: Object(he.jsx)(Ht, {
                  'aria-label': 'Scroll to top',
                  'label': 'Scroll to the top',
                  'placement': 'left',
                  'isOpen': d,
                  'gutter': 6,
                  'children': Object(he.jsx)(Ee, {
                    'aria-label': 'Scroll to top',
                    'color': Wt(n),
                    'icon': Fl.a,
                    'onClick': function () {
                      var e;
                      return null === (e = document.scrollingElement) || void 0 === e ? void 0 : e.scrollTo(0, 0);
                    },
                    'onMouseEnter': function () {
                      return u.on();
                    },
                    'onMouseLeave': function () {
                      return u.off();
                    }
                  })
                })
              })
            })
          );
        },
        Nl = n(268),
        Yl = n.n(Nl),
        Wl = n(267),
        Pl = n.n(Wl),
        Rl = function (e) {
          var t = e.width,
            n = Object(v.e)(),
            o = Object(J.c)().colorMode,
            a = H(n),
            i = Object(r.b)(),
            c = w(function (e) {
              return e.app.ui.sidebarMode;
            });
          return Object(he.jsxs)(Z.c, {
            width: t,
            height: '100vh',
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: 900,
            alignItems: 'expanded' === c ? 'flex-start' : 'stretch',
            justifyContent: 'space-between',
            backgroundColor: 'light' === o ? 'gray.50' : 'gray.900',
            borderRight: 'solid2',
            borderRightColor: 'light' === o ? 'gray.200' : 'gray.700',
            p: 1,
            spacing: 2,
            sx: Object(b.a)({}, a),
            children: [
              Object(he.jsx)(qt, { navItems: be }),
              Object(he.jsx)(bn, {
                isFullWidth: !0,
                onClick: function () {
                  return i(F('expanded' === c ? 'collapsed' : 'expanded'));
                },
                leftIcon: 'expanded' === c ? Pl.a : Yl.a,
                variant: 'outlined',
                children: 'expanded' === c ? 'Collapse' : ''
              })
            ]
          });
        },
        Gl = function () {
          var e = Object(v.e)(),
            t = Object(O.a)('(min-width: '.concat(e.breakpoints.xl, ')')),
            n = Object(p.a)(t, 1)[0],
            a = H(e),
            i = Object(r.b)(),
            c = w(function (e) {
              return e.app.ui.sidebarMode;
            }),
            s = w(function (e) {
              return e.modals.ui.isSplashscreenOpen;
            }),
            l = Object(o.useState)('100%'),
            d = Object(p.a)(l, 2),
            u = d[0],
            g = d[1],
            x = Object(o.useState)(''.concat(V[c], 'px')),
            y = Object(p.a)(x, 2),
            k = y[0],
            C = y[1],
            S = A([
              {
                queryKey: ['movieGenres'],
                queryFn: (function () {
                  var e = Object(h.a)(
                    j.a.mark(function e() {
                      var t, n;
                      return j.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), _.get('/genre/movie/list');
                            case 2:
                              return (t = e.sent), (n = t.data), e.abrupt('return', n);
                            case 5:
                            case 'end':
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })()
              },
              {
                queryKey: 'tvGenres',
                queryFn: (function () {
                  var e = Object(h.a)(
                    j.a.mark(function e() {
                      var t, n;
                      return j.a.wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), _.get('/genre/tv/list');
                            case 2:
                              return (t = e.sent), (n = t.data), e.abrupt('return', n);
                            case 5:
                            case 'end':
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })()
              }
            ]);
          return (
            Object(o.useEffect)(
              function () {
                S[0].isSuccess && i(W(S[0].data.genres));
              },
              [S[0]]
            ),
            Object(o.useEffect)(
              function () {
                S[1].isSuccess && i(P(S[1].data.genres));
              },
              [S[1]]
            ),
            Object(o.useEffect)(
              function () {
                S.some(function (e) {
                  return e.isError || e.isLoading;
                })
                  ? i(R(!1))
                  : i(R(!0));
              },
              [S]
            ),
            Object(o.useEffect)(
              function () {
                g(n ? 'calc(100% - '.concat(V[c], 'px)') : '100%'), C(n ? ''.concat(V[c], 'px') : '0px');
              },
              [n, c]
            ),
            Object(o.useEffect)(
              function () {
                n || i(F('expanded'));
              },
              [n]
            ),
            s
              ? Object(he.jsx)(Li, {})
              : Object(he.jsxs)(m.a, {
                  basename: '/edb',
                  children: [
                    n ? Object(he.jsx)(Rl, { width: ''.concat(V[c], 'px') }) : null,
                    Object(he.jsxs)(f.a, {
                      width: u,
                      maxWidth: u,
                      position: 'absolute',
                      top: '0px',
                      left: k,
                      sx: Object(b.a)({}, a),
                      children: [
                        Object(he.jsx)(ln, { width: u, left: k }),
                        Object(he.jsxs)(f.a, {
                          width: '100%',
                          maxWidth: '100%',
                          position: 'relative',
                          top: ''.concat(66, 'px'),
                          left: '0px',
                          sx: Object(b.a)({}, a),
                          children: [
                            Object(he.jsx)(f.a, {
                              width: '100%',
                              minHeight: 'calc(100vh - '.concat(98, 'px)'),
                              sx: Object(b.a)({}, a),
                              children: Object(he.jsx)(zl, {})
                            }),
                            Object(he.jsx)(Oe, {})
                          ]
                        }),
                        Object(he.jsx)(Ql, {})
                      ]
                    }),
                    Object(he.jsx)(Si, {}),
                    Object(he.jsx)(zn, {}),
                    Object(he.jsx)(Kn, {}),
                    Object(he.jsx)(vn, {})
                  ]
                })
          );
        },
        Vl = new d.a({ defaultOptions: { queries: { refetchOnWindowFocus: !1, refetchOnReconnect: !1, retry: !1 } } }),
        Hl = function () {
          return Object(he.jsx)(l.a, {
            theme: Lt,
            children: Object(he.jsx)(u.a, { client: Vl, children: Object(he.jsx)(Gl, {}) })
          });
        },
        Jl = (n(448), Object(c.b)(jt));
      i.a.render(
        Object(he.jsx)(r.a, {
          store: jt,
          children: Object(he.jsx)(s.a, { loading: null, persistor: Jl, children: Object(he.jsx)(Hl, {}) })
        }),
        document.getElementById('root')
      );
    }
  },
  [[449, 1, 2]]
]);
//# sourceMappingURL=main.6461b48c.chunk.js.map
