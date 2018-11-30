import * as React from "react";
import {PropertyControls, ControlType, RenderTarget} from "framer";

interface Props {
	width: number;
	height: number;
	animate: boolean;
	color: string;
	duration: number;
}

export class Flip extends React.Component<Props> {
	static defaultProps = {
		width: 40,
		height: 40,
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
      @-webkit-keyframes flip {
        0% {
          transform: rotate(0);
        }

        50% {
          transform: rotateY(180deg);
        }

        100% {
          transform: rotateY(180deg)  rotateX(180deg);
        }
			}`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const key = duration + iteration;

		return (
			<div
				style={{
					position: "relative",
					width: width,
					height: height,
					perspective: "120px"
				}}
			>
				<style>{css}</style>
				<div
					key={key}
					style={{
						position: "absolute",
						left: "0",
						top: "0",
						width: "100%",
						height: "100%",
						backgroundColor: color,
						animationName: "flip",
						animationDuration: `${duration}s`,
						animationIterationCount: iteration
					}}
				/>
			</div>
		);
	}
}
