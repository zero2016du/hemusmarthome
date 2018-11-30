import * as React from "react";
import {PropertyControls, ControlType, RenderTarget} from "framer";

interface Props {
	width: number;
	height: number;
	animate: boolean;
	stroke: number;
	color: string;
	duration: number;
}

export class Multiply extends React.Component<Props> {
	static defaultProps = {
		width: 44,
		height: 44,
		animate: true,
		color: "#09f",
		duration: 2
	};

	static propertyControls: PropertyControls<Props> = {
		animate: {
			type: ControlType.Boolean,
			enabled: "Canvas",
			disabled: "Preview",
			title: "Animate"
		},
		color: {type: ControlType.Color, title: "Color"},
		duration: {type: ControlType.Number, min: 1, max: 10, title: "Duration"}
	};

	render() {
		const {width, height, animate, color, duration} = this.props;
		const css = `
      @-webkit-keyframes dotsA {
        	0% { transform: scale(0); opacity: 0; }
					50% { transform: scale(1); opacity: 1; }
					100% { transform: scale(0); opacity: 0; }
			}
			@-webkit-keyframes dotsB {
				0% { transform: rotate(0deg); }
				50% { transform: rotate(180deg); }
				100% { transform: rotate(360deg); }
			}
			@-webkit-keyframes dotsC {
				0% { transform: translate3d(0, 0, 0) scale(1); }
				50% { transform: translate3d(-16px, 0, 0) scale(.5); }
				100% { transform: translate3d(0, 0, 0) scale(1); }
			}
			@-webkit-keyframes dotsD {
				0% { transform: translate3d(0, 0, 0) scale(1); }
				50% { transform: translate3d(16px, 0, 0) scale(.5); }
				100% { transform: translate3d(0, 0, 0) scale(1); }
			}`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const dotStyle = {
			position: "absolute",
			top: "50%",
			left: "50%",
			margin: "-12.5%",
			width: "25%",
			height: "25%",
			background: color,
			borderRadius: "50%",
			animationDuration: `${duration}s`,
			animationIterationCount: iteration,
			animationTimingFunction: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
		};

		let key = iteration + duration;

		return (
			<div
				key={key}
				style={{position: "relative", width: width, height: height}}
			>
				<style>{css}</style>
				<div
					style={Object.assign({}, dotStyle, {
						animationName: "dotsA"
					})}
				/>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						margin: "auto",
						width: "100%",
						height: "100%",
						animationName: "dotsB",
						animationDuration: `${duration}s`,
						animationIterationCount: iteration,
						animationTimingFunction: "cubic-bezier(0.770, 0.000, 0.175, 1.000)"
					}}
				>
					<div
						style={Object.assign({}, dotStyle, {
							animationName: "dotsC"
						})}
					/>
					<div
						style={Object.assign({}, dotStyle, {
							animationName: "dotsD"
						})}
					/>
				</div>
			</div>
		);
	}
}
