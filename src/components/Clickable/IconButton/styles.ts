import { IconButtonProps, Variant, Size } from './types';

import { Style } from '../../../common/types';
import { handleIsTouchDevice } from '../../../common/utils';
import { Theme } from '../../../theme/types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type DefaultStyle = { default: Style };

type CommonStyle<S> = {
	back: S;
	front: S;
	disabled: S;
};

type IconButtonStyle = {
	iconButton: CommonStyle<DefaultStyle & SizeStyle>;
	light: CommonStyle<VariantStyle>;
	dark: CommonStyle<VariantStyle>;
};

type StyleIconButtonProps = {
	color: IconButtonProps['color'];
	isLoading: IconButtonProps['isLoading'];
	size: IconButtonProps['size'];
	variant: IconButtonProps['variant'];
};

const isTouchDevice = handleIsTouchDevice();

export default (
	theme: Theme,
	{ color = 'gray', isLoading = false, size = 'md', variant = 'contained' }: StyleIconButtonProps
): IconButtonStyle => ({
	iconButton: {
		back: {
			default: {
				'cursor': 'pointer',

				'position': 'relative',

				'width': 'auto',
				'height': 'auto',

				'minWidth': 'auto',
				'minHeight': 'auto',
				'maxWidth': 'none',
				'maxHeight': 'none',

				'userSelect': 'none',

				'opacity': 1,

				'border': 'none',
				'outline': !isTouchDevice ? '0px auto' : 'none !important',

				'padding': 0,

				'WebkitTapHighlightColor': 'transparent',

				'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`,

				'&:focus:not(:focus-visible)': {
					outline: !isTouchDevice ? '0px auto' : 'none !important'
				},

				'&:focus': {
					boxShadow: 'none',
					outline: !isTouchDevice ? '0px auto' : 'none !important'
				},

				'&:active': {
					outline: !isTouchDevice ? '0px auto' : 'none !important'
				},

				'& svg': {
					transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
				}
			},
			sm: {
				'borderRadius': 'sm',

				'marginTop': variant !== 'icon' ? '3px !important' : 0,

				'&:hover .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-3px)' : 'none'
				},

				'&:active .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-1px)' : 'none'
				}
			},
			md: {
				'borderRadius': 'base',

				'marginTop': variant !== 'icon' ? '4px !important' : 0,

				'&:hover .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-4px)' : 'none'
				},

				'&:active .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-2px)' : 'none'
				}
			},
			lg: {
				'borderRadius': 'lg',

				'marginTop': variant !== 'icon' ? '5px !important' : 0,

				'&:hover .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-5px)' : 'none'
				},

				'&:active .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-2px)' : 'none'
				}
			}
		},
		front: {
			default: {
				cursor: 'inherit',

				position: 'relative',

				width: '100%',
				height: '100%',

				userSelect: 'none',
				willChange: 'auto',

				borderStyle: 'solid',

				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
			},
			sm: {
				'borderRadius': 'sm',
				'borderWidth': variant !== 'icon' ? '1px 1px 0' : '0',

				'padding': theme.space['0.5'],

				'transform': variant !== 'icon' ? 'translateY(-3px)' : 'none',

				'& svg': {
					fontSize: 'lg'
				}
			},
			md: {
				'borderRadius': 'base',
				'borderWidth': variant !== 'icon' ? '2px 2px 0' : '0',

				'padding': theme.space[1],

				'transform': variant !== 'icon' ? 'translateY(-4px)' : 'none',

				'& svg': {
					fontSize: 'xl'
				}
			},
			lg: {
				'borderRadius': 'lg',
				'borderWidth': variant !== 'icon' ? '2px 2px 0' : '0',

				'padding': theme.space[1.5],

				'transform': variant !== 'icon' ? 'translateY(-5px)' : 'none',

				'& svg': {
					fontSize: '2xl'
				}
			}
		},
		disabled: {
			default: {
				cursor: 'not-allowed',
				pointerEvents: 'none',

				opacity: isLoading ? 1 : 0.5,

				marginTop: 0
			},
			sm: {
				'& .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-1px) !important' : 'none !important'
				}
			},
			md: {
				'& .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-2px) !important' : 'none !important'
				}
			},
			lg: {
				'& .icon_button_front': {
					transform: variant !== 'icon' ? 'translateY(-2px) !important' : 'none !important'
				}
			}
		}
	},
	light: {
		back: {
			contained: {
				'backgroundColor': `${color}.700`,

				'&:hover': {
					'backgroundColor': `${color}.700`,

					'& .icon_button_front': {
						borderColor: `${color}.500`,
						backgroundColor: `${color}.500`,
						color: 'gray.50'
					}
				},

				'&:active': {
					'backgroundColor': `${theme.colors[color][600]} !important`,

					'& .icon_button_front': {
						borderColor: `${theme.colors[color][600]} !important`,
						backgroundColor: `${theme.colors[color][600]} !important`,
						color: `${theme.colors.gray[50]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice ? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][500]}` : 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			outlined: {
				'backgroundColor': `${color}.500`,

				'&:hover': {
					'backgroundColor': `${color}.500`,

					'& .icon_button_front': {
						borderColor: `${color}.500`,
						backgroundColor: 'gray.50',
						color: `${color}.500`
					}
				},

				'&:active': {
					'backgroundColor': `${color}.500`,

					'& .icon_button_front': {
						borderColor: `${theme.colors[color][600]} !important`,
						backgroundColor: `${theme.colors.gray[50]} !important`,
						color: `${theme.colors[color][600]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice ? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][500]}` : 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			icon: {
				'backgroundColor': 'transparent',

				'&:hover': {
					'backgroundColor': 'transparent',

					'& .icon_button_front': {
						borderColor: 'transparent',
						backgroundColor: 'transparent',
						color: `${color}.500`
					}
				},

				'&:active': {
					'backgroundColor': 'transparent !important',

					'& .icon_button_front': {
						borderColor: 'transparent !important',
						backgroundColor: 'transparent !important',
						color: `${theme.colors[color][600]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice ? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][500]}` : 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			}
		},
		front: {
			contained: {
				borderColor: `${color}.500`,
				backgroundColor: `${color}.500`,
				color: 'gray.50'
			},
			outlined: {
				borderColor: `${color}.500`,
				backgroundColor: 'gray.50',
				color: `${color}.500`
			},
			icon: {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				color: `${color}.500`
			}
		},
		disabled: {
			contained: {
				'background': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
				'backgroundColor': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,

				'& .icon_button_front': {
					borderColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
					backgroundColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
					color: `${theme.colors.gray[50]} !important`
				}
			},
			outlined: {
				'background': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
				'backgroundColor': `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,

				'& .icon_button_front': {
					borderColor: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`,
					backgroundColor: `${theme.colors.gray[50]} !important`,
					color: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`
				}
			},
			icon: {
				'background': 'transparent !important',
				'backgroundColor': 'transparent !important',

				'& .icon_button_front': {
					borderColor: 'transparent !important',
					backgroundColor: 'transparent !important',
					color: `${isLoading ? theme.colors[color][500] : theme.colors.gray[500]} !important`
				}
			}
		}
	},
	dark: {
		back: {
			contained: {
				'backgroundColor': `${color}.600`,

				'&:hover': {
					'backgroundColor': `${color}.600`,

					'& .icon_button_front': {
						borderColor: `${color}.400`,
						backgroundColor: `${color}.400`,
						color: 'gray.900'
					}
				},

				'&:active': {
					'backgroundColor': `${theme.colors[color][300]} !important`,

					'& .icon_button_front': {
						borderColor: `${theme.colors[color][300]} !important`,
						backgroundColor: `${theme.colors[color][300]} !important`,
						color: `${theme.colors.gray[900]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice ? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][400]}` : 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			outlined: {
				'backgroundColor': `${color}.400`,

				'&:hover': {
					'backgroundColor': `${color}.400`,

					'& .icon_button_front': {
						borderColor: `${color}.400`,
						backgroundColor: 'gray.900',
						color: `${color}.400`
					}
				},

				'&:active': {
					'backgroundColor': `${color}.300`,

					'& .icon_button_front': {
						borderColor: `${theme.colors[color][300]} !important`,
						backgroundColor: `${theme.colors.gray[900]} !important`,
						color: `${theme.colors[color][300]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice ? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][400]}` : 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			icon: {
				'backgroundColor': 'transparent',

				'&:hover': {
					'backgroundColor': 'transparent',

					'& .icon_button_front': {
						borderColor: 'transparent',
						backgroundColor: 'transparent',
						color: `${color}.400`
					}
				},

				'&:active': {
					'backgroundColor': 'transparent',

					'& .icon_button_front': {
						borderColor: 'transparent !important',
						backgroundColor: 'transparent !important',
						color: `${theme.colors[color][300]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice ? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][400]}` : 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			}
		},
		front: {
			contained: {
				borderColor: `${color}.400`,
				backgroundColor: `${color}.400`,
				color: 'gray.900'
			},
			outlined: {
				borderColor: `${color}.400`,
				backgroundColor: 'gray.900',
				color: `${color}.400`
			},
			icon: {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				color: `${color}.400`
			}
		},
		disabled: {
			contained: {
				'background': `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,
				'backgroundColor': `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,

				'& .icon_button_front': {
					borderColor: `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,
					backgroundColor: `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,
					color: `${theme.colors.gray[900]} !important`
				}
			},
			outlined: {
				'background': `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,
				'backgroundColor': `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,

				'& .icon_button_front': {
					borderColor: `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`,
					backgroundColor: `${theme.colors.gray[900]} !important`,
					color: `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`
				}
			},
			icon: {
				'background': 'transparent !important',
				'backgroundColor': 'transparent !important',

				'& .icon_button_front': {
					borderColor: 'transparent !important',
					backgroundColor: 'transparent !important',
					color: `${isLoading ? theme.colors[color][400] : theme.colors.gray[400]} !important`
				}
			}
		}
	}
});
