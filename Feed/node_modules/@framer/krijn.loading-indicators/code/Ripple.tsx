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

export class Ripple extends React.Component<Props> {
	static defaultProps = {
		width: 44,
		height: 44,
		animate: true,
		stroke: 2,
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
		stroke: {type: ControlType.Number, min: 1, max: 10, title: "Stroke"},
		duration: {type: ControlType.Number, min: 1, max: 10, title: "Duration"}
	};

	render() {
		const {width, height, animate, stroke, color, duration} = this.props;
		const css = `
      @-webkit-keyframes rippleA {
        0% {
          transform: translate3d(0, 0, 0) scale(0);
          opacity: 1; 
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 0; 
        }
      }

      @-webkit-keyframes rippleB {
        0% {
          transform: translate3d(0, 0, 0) scale(0);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, 0, 0) scale(0.5);
          opacity: 0; 
        }
			}`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const rippleStyle = {
			position: "absolute",
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			borderRadius: "50%",
			opacity: 0,
			border: `${stroke}px solid ${color}`,
			animationDuration: `${duration}s`,
			animationIterationCount: iteration,
			animationTimingFunction: "cubic-bezier(0.075, 0.820, 0.165, 1.000)"
		};

		let key = duration + iteration;

		return (
			<div
				key={key}
				style={{position: "relative", width: width, height: height}}
			>
				<style>{css}</style>
				<div
					style={Object.assign({}, rippleStyle, {
						animationName: "rippleB",
						animationDelay: ".25s"
					})}
				/>
				<div
					style={Object.assign({}, rippleStyle, {
						animationName: "rippleA"
					})}
				/>
			</div>
		);
	}
}
