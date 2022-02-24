import { ButtonProps, Variant, Size } from './types';

import { Style } from '../../../common/types';
import { handleIsTouchDevice } from '../../../common/utils';
import { Theme } from '../../../theme/types';

type VariantStyle = { [key in Variant]: Style };

type SizeStyle = { [key in Size]: Style };

type CommonStyle<S> = {
	back: S;
	front: S;
	disabled: S;
};

type DefaultStyle = { default: Style };

type ButtonStyle = {
	button: CommonStyle<DefaultStyle & SizeStyle>;
	light: CommonStyle<VariantStyle>;
	dark: CommonStyle<VariantStyle>;
};

type StyleButtonProps = {
	color: ButtonProps['color'];
	isFullWidth: ButtonProps['isFullWidth'];
	isLoading: ButtonProps['isLoading'];
	size: ButtonProps['size'];
	variant: ButtonProps['variant'];
};

const isTouchDevice = handleIsTouchDevice();

export default (
	theme: Theme,
	{ color = 'gray', isFullWidth = false, isLoading = false, size = 'md', variant = 'contained' }: StyleButtonProps
): ButtonStyle => ({
	button: {
		back: {
			default: {
				'cursor': 'pointer',

				'position': 'relative',

				'width': isFullWidth ? '100%' : 'auto',
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

				'marginTop': `${variant !== 'text' ? 3 : 1}px !important`,

				'&:hover .button_front': {
					transform: variant !== 'text' ? 'translateY(-3px)' : 'none'
				},

				'&:active .button_front': {
					transform: variant !== 'text' ? 'translateY(-1px)' : 'none'
				}
			},
			md: {
				'borderRadius': 'base',

				'marginTop': `${variant !== 'text' ? 4 : 2}px !important`,

				'&:hover .button_front': {
					transform: variant !== 'text' ? 'translateY(-4px)' : 'none'
				},

				'&:active .button_front': {
					transform: variant !== 'text' ? 'translateY(-2px)' : 'none'
				}
			},
			lg: {
				'borderRadius': 'lg',

				'marginTop': `${variant !== 'text' ? 5 : 2}px !important`,

				'&:hover .button_front': {
					transform: variant !== 'text' ? 'translateY(-5px)' : 'none'
				},

				'&:active .button_front': {
					transform: variant !== 'text' ? 'translateY(-2px)' : 'none'
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

				fontWeight: 'semibold',
				textTransform: 'uppercase',
				whiteSpace: 'nowrap',
				lineHeight: 'normal',

				borderStyle: 'solid',

				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']} !important`
			},
			sm: {
				fontSize: 'xs',

				borderRadius: 'sm',
				borderWidth: variant !== 'text' ? '1px 1px 0' : '0',

				padding: `${theme.space[0.5]} ${theme.space[1]}`,

				transform: variant !== 'text' ? 'translateY(-3px)' : 'none'
			},
			md: {
				fontSize: 'sm',

				borderRadius: 'base',
				borderWidth: variant !== 'text' ? '2px 2px 0' : '0',

				padding: `${theme.space[1]} ${theme.space[2]}`,

				transform: variant !== 'text' ? 'translateY(-4px)' : 'none'
			},
			lg: {
				fontSize: 'md',

				borderRadius: 'lg',
				borderWidth: variant !== 'text' ? '2px 2px 0' : '0',

				padding: `${theme.space[1.5]} ${theme.space[3]}`,

				transform: variant !== 'text' ? 'translateY(-5px)' : 'none'
			}
		},
		disabled: {
			default: {
				cursor: 'not-allowed',
				pointerEvents: 'none',

				opacity: isLoading ? 1 : 0.5,

				marginTop: '2px !important'
			},
			sm: {
				'& .button_front': {
					transform: variant !== 'text' ? 'translateY(-1px) !important' : 'none !important'
				}
			},
			md: {
				'& .button_front': {
					transform: variant !== 'text' ? 'translateY(-2px) !important' : 'none !important'
				}
			},
			lg: {
				'& .button_front': {
					transform: variant !== 'text' ? 'translateY(-2px) !important' : 'none !important'
				}
			}
		}
	},
	light: {
		back: {
			contained: {
				'backgroundColor': `${color}.${color === 'gray' ? 600 : 700}`,

				'&:hover': {
					'backgroundColor': `${color}.${color === 'gray' ? 600 : 700}`,

					'& .button_front': {
						borderColor: `${color}.${color === 'gray' ? 400 : 500}`,
						backgroundColor: `${color}.${color === 'gray' ? 400 : 500}`,
						color: 'gray.50'
					}
				},

				'&:active': {
					'backgroundColor': `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`,

					'& .button_front': {
						borderColor: `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`,
						backgroundColor: `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`,
						color: `${theme.colors.gray[50]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice
						? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
						: 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			outlined: {
				'backgroundColor': `${color}.${color === 'gray' ? 400 : 500}`,

				'&:hover': {
					'backgroundColor': `${color}.${color === 'gray' ? 400 : 500}`,

					'& .button_front': {
						borderColor: `${color}.${color === 'gray' ? 400 : 500}`,
						backgroundColor: 'gray.50',
						color: `${color}.${color === 'gray' ? 400 : 500}`
					}
				},

				'&:active': {
					'backgroundColor': `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`,

					'& .button_front': {
						borderColor: `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`,
						backgroundColor: `${theme.colors.gray[50]} !important`,
						color: `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice
						? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
						: 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			text: {
				'backgroundColor': 'transparent',

				'&:hover': {
					'backgroundColor': 'transparent',

					'& .button_front': {
						borderColor: 'transparent',
						backgroundColor: 'transparent',
						color: `${color}.${color === 'gray' ? 400 : 500}`
					}
				},

				'&:active': {
					'backgroundColor': 'transparent !important',

					'& .button_front': {
						borderColor: 'transparent !important',
						backgroundColor: 'transparent !important',
						color: `${theme.colors[color][color === 'gray' ? 500 : 600]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice
						? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 400 : 500]}`
						: 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			}
		},
		front: {
			contained: {
				borderColor: `${color}.${color === 'gray' ? 400 : 500}`,
				backgroundColor: `${color}.${color === 'gray' ? 400 : 500}`,
				color: 'gray.50'
			},
			outlined: {
				borderColor: `${color}.${color === 'gray' ? 400 : 500}`,
				backgroundColor: 'gray.50',
				color: `${color}.${color === 'gray' ? 400 : 500}`
			},
			text: {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				color: `${color}.${color === 'gray' ? 400 : 500}`
			}
		},
		disabled: {
			contained: {
				'background': `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]} !important`,
				'backgroundColor': `${
					theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]
				} !important`,

				'& .button_front': {
					borderColor: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]} !important`,
					backgroundColor: `${
						theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]
					} !important`,
					color: `${theme.colors.gray[50]} !important`
				}
			},
			outlined: {
				'background': `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]} !important`,
				'backgroundColor': `${
					theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]
				} !important`,

				'& .button_front': {
					borderColor: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]} !important`,
					backgroundColor: `${theme.colors.gray[50]} !important`,
					color: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]} !important`
				}
			},
			text: {
				'background': 'transparent !important',
				'backgroundColor': 'transparent !important',

				'& .button_front': {
					borderColor: 'transparent !important',
					backgroundColor: 'transparent !important',
					color: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 400 : 500]} !important`
				}
			}
		}
	},
	dark: {
		back: {
			contained: {
				'backgroundColor': `${color}.${color === 'gray' ? 700 : 600}`,

				'&:hover': {
					'backgroundColor': `${color}.${color === 'gray' ? 700 : 600}`,

					'& .button_front': {
						borderColor: `${color}.${color === 'gray' ? 500 : 400}`,
						backgroundColor: `${color}.${color === 'gray' ? 500 : 400}`,
						color: 'gray.50'
					}
				},

				'&:active': {
					'backgroundColor': `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`,

					'& .button_front': {
						borderColor: `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`,
						backgroundColor: `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`,
						color: `${theme.colors.gray[50]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice
						? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
						: 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			outlined: {
				'backgroundColor': `${color}.${color === 'gray' ? 500 : 400}`,

				'&:hover': {
					'backgroundColor': `${color}.${color === 'gray' ? 500 : 400}`,

					'& .button_front': {
						borderColor: `${color}.${color === 'gray' ? 500 : 400}`,
						backgroundColor: 'gray.50',
						color: `${color}.${color === 'gray' ? 500 : 400}`
					}
				},

				'&:active': {
					'backgroundColor': `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`,

					'& .button_front': {
						borderColor: `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`,
						backgroundColor: `${theme.colors.gray[50]} !important`,
						color: `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice
						? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
						: 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			},
			text: {
				'backgroundColor': 'transparent',

				'&:hover': {
					'backgroundColor': 'transparent',

					'& .button_front': {
						borderColor: 'transparent',
						backgroundColor: 'transparent',
						color: `${color}.${color === 'gray' ? 500 : 400}`
					}
				},

				'&:active': {
					'backgroundColor': 'transparent !important',

					'& .button_front': {
						borderColor: 'transparent !important',
						backgroundColor: 'transparent !important',
						color: `${theme.colors[color][color === 'gray' ? 400 : 300]} !important`
					}
				},

				'&:focus-visible': {
					outline: !isTouchDevice
						? `${size === 'sm' ? 1 : 2}px auto ${theme.colors[color][color === 'gray' ? 500 : 400]}`
						: 'none',
					outlineOffset: !isTouchDevice ? `${size === 'sm' ? 2 : size === 'md' ? 3 : 4}px` : 0
				}
			}
		},
		front: {
			contained: {
				borderColor: `${color}.${color === 'gray' ? 500 : 400}`,
				backgroundColor: `${color}.${color === 'gray' ? 500 : 400}`,
				color: 'gray.50'
			},
			outlined: {
				borderColor: `${color}.${color === 'gray' ? 500 : 400}`,
				backgroundColor: 'gray.50',
				color: `${color}.${color === 'gray' ? 500 : 400}`
			},
			text: {
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				color: `${color}.${color === 'gray' ? 500 : 400}`
			}
		},
		disabled: {
			contained: {
				'background': `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]} !important`,
				'backgroundColor': `${
					theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]
				} !important`,

				'& .button_front': {
					borderColor: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]} !important`,
					backgroundColor: `${
						theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]
					} !important`,
					color: `${theme.colors.gray[50]} !important`
				}
			},
			outlined: {
				'background': `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]} !important`,
				'backgroundColor': `${
					theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]
				} !important`,

				'& .button_front': {
					borderColor: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]} !important`,
					backgroundColor: `${theme.colors.gray[50]} !important`,
					color: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]} !important`
				}
			},
			text: {
				'background': 'transparent !important',
				'backgroundColor': 'transparent !important',

				'& .button_front': {
					borderColor: 'transparent !important',
					backgroundColor: 'transparent !important',
					color: `${theme.colors[isLoading ? color : 'gray'][color === 'gray' ? 500 : 400]} !important`
				}
			}
		}
	}
});
