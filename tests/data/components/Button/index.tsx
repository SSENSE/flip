import React, { Component } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import atoms from '../../styles/atoms';

const variants = {
	primary: {
		// TODO:
		backgroundColor: atoms.colors.black,
		color: atoms.colors.textWhite,
		fontFamily: atoms.typefaces.favorit_SSENSE.fontFamily,
		fontSize: atoms.typefaces.favorit_SSENSE.fontSize,
		lineHeight: atoms.typefaces.favorit_SSENSE.lineHeight,
		opacity: 0.8
	},
	secondary: {
		backgroundColor: atoms.colors.backgroundWhite,
		color: atoms.colors.black,
		fontFamily: atoms.typefaces.favorit_SSENSE.fontFamily,
		fontSize: atoms.typefaces.favorit_SSENSE.fontSize,
		lineHeight: atoms.typefaces.favorit_SSENSE.lineHeight,
		border: `${atoms.borders.widths.small} solid ${atoms.colors.black}`,
		opacity: 0.5
	},
	tertiary: {
		backgroundColor: atoms.colors.backgroundWhite,
		color: atoms.colors.black,
		fontFamily: atoms.typefaces.favorit_SSENSE.fontFamily,
		fontSize: atoms.typefaces.favorit_SSENSE.fontSize,
		lineHeight: atoms.typefaces.favorit_SSENSE.lineHeight,
		opacity: 0.5
	}
};

const StyledButton = styled.div`
	padding-top: 7px;
    padding-bottom: 5px;
	text-align: center;
	text-transform: uppercase;
	cursor: pointer;
	color: ${({ theme }) => theme.color};
	border: ${({ theme }) => theme.border};
	background-color: ${({ theme }) => theme.backgroundColor};
	font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSize};
    width: 100%;
	&:active {
		opacity: ${({ theme }) => theme.opacity};
	}
	&:hover {
		opacity: ${({ theme }) => theme.opacity};
	}
`;

const blink = keyframes`
    0% {
    background: ${atoms.colors.black};
        border: 1px solid ${atoms.colors.textWhite};
    }

    50% {
        background: ${atoms.colors.textWhite};
    }
`;

interface DotProps {
	dotSize: {
		small: number,
		large: number
	},
	dotCount: number,
	dotSpacing: number,
	blinkInterval: number,
	totalInterval: number,
	index?: number
}

const Dot = styled.div<DotProps>`
	@media (max-width: 500px) {
		width: ${({ dotSize }) => `${dotSize.small}px`};
		height: ${({ dotSize }) => `${dotSize.small}px`};
	}
	@media (min-width: 500px) {
		width: ${({ dotSize }) => `${dotSize.large}px`};
		height: ${({ dotSize }) => `${dotSize.large}px`};
	}
	border-radius: 50%;
	margin-right: ${({ dotCount, index, dotSpacing }) =>
		`${index < dotCount - 1 ? dotSpacing : 0}px`};
	animation: ${({ dotCount, blinkInterval, index }) =>
		`${dotCount * blinkInterval}s ${(blinkInterval / 2) *
			index}s ${blink} step-end infinite`};
`;

/**
 * Button Description
 */
class Button extends Component<{
	variant: 'primary' | 'secondary' | 'tertiary',
	loading: boolean
}, {
    primary: {
        loading: true
    },
    secondary: null,
    tertiary: null
}> {
	loadingAnimation = {
		dotCount: 3,
		dotSize: {
			small: 12,
			large: 14
		},
		dotSpacing: 12,
		blinkInterval: 0.15
	};

	totalInterval() {
		const { dotCount, blinkInterval } = this.loadingAnimation;
		return dotCount * blinkInterval;
	}

	loading() {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{[...Array(this.loadingAnimation.dotCount)].map((dot, index) => (
					<Dot
						key={index}
						index={index}
						totalInterval={this.totalInterval()}
						{...this.loadingAnimation}
					/>
				))}
			</div>
		);
	}

	render() {
        const { variant, loading, children } = this.props;
		return (
			<ThemeProvider theme={variants[variant]}>
				<StyledButton>
					{loading && variant === 'primary' ? this.loading() : children}
				</StyledButton>
			</ThemeProvider>
		);
	}
}

export default Button;
