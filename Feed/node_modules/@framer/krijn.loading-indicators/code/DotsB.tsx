import * as React from "react";
import {PropertyControls, ControlType, RenderTarget} from "framer";

interface Props {
	width: number;
	height: number;
	animate: boolean;
	stroke: number;
	color: string;
	size: number;
	duration: number;
}

export class Dots extends React.Component<Props> {
	static defaultProps = {
		width: 44,
		height: 44,
		animate: true,
		color: "#09f",
		size: 20,
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
		size: {type: ControlType.Number, min: 5, max: 30, title: "Size"},
		duration: {type: ControlType.Number, min: 1, max: 10, title: "Duration"}
	};

	render() {
		const {width, height, animate, color, size, duration} = this.props;
		const css = `
      @-webkit-keyframes dotBounce {
        0%, 75%, 100%{
          transform: translateY(0);
        }
        25%{
          transform: translateY(-100%);
        }
      }`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const dotStyle = {
			width: `${size}%`,
			height: `${size}%`,
			borderRadius: "50%",
			backgroundColor: color,
			animationName: "dotBounce",
			animationDuration: `${duration}s`,
			animationIterationCount: iteration,
			animationTimingFunction: "ease-in-out"
		};

		const key = duration + iteration;

		return (
			<div
				key={key}
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: width,
					height: height
				}}
			>
				<style>{css}</style>
				<div style={dotStyle} />
				<div
					style={Object.assign({}, dotStyle, {
						animationDelay: `${duration / 3}s`
					})}
				/>
				<div
					style={Object.assign({}, dotStyle, {
						animationDelay: `${(duration / 3) * 2}s`
					})}
				/>
			</div>
		);
	}
}
