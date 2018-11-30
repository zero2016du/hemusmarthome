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

export class Circular extends React.Component<Props> {
	static defaultProps = {
		width: 44,
		height: 44,
		animate: true,
		stroke: 2,
		color: "hsl(204, 100%, 50%)",
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
		duration: {type: ControlType.Number, min: 1, max: 10, title: "Duration"},
		stroke: {type: ControlType.Number, min: 1, max: 10, title: "Stroke"}
	};

	convertHsl(hsl: string, opacity: number) {
		return hsl.replace(")", `, ${opacity / 100})`).replace("hsl", "hsla");
	}

	render() {
		let {width, height, animate, stroke, color, duration} = this.props;
		const css = `
      @-webkit-keyframes circular {
        100% {
          transform: rotate(360deg);
        }
	  }`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const key = duration + iteration;

		return (
			<div
				key={key}
				style={{
					width: width,
					height: height,
					borderRadius: "50%",
					border: `${stroke}px solid ${this.convertHsl(color, 30)}`,
					borderTop: `${stroke}px solid ${color}`,
					animationName: "circular",
					animationDuration: `${duration}s`,
					animationIterationCount: iteration
				}}
			>
				<style>{css}</style>
			</div>
		);
	}
}
