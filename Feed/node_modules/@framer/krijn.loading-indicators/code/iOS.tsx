import * as React from "react";
import {PropertyControls, ControlType, RenderTarget} from "framer";

interface Props {
	width: number;
	height: number;
	animate: boolean;
	stroke: number;
	color: string;
	particles: number;
	spacing: number;
	duration: number;
}

export class iOS extends React.Component<Props> {
	static defaultProps = {
		width: 30,
		height: 30,
		animate: true,
		color: "#09f",
		particles: 12,
		spacing: 10,
		duration: 1
	};

	static propertyControls: PropertyControls<Props> = {
		animate: {
			type: ControlType.Boolean,
			enabled: "Canvas",
			disabled: "Preview",
			title: "Animate"
		},
		color: {type: ControlType.Color, title: "Color"},
		particles: {type: ControlType.Number, min: 6, max: 24, title: "Particles"},
		spacing: {type: ControlType.Number, min: 10, max: 20, title: "Spacing"},
		duration: {type: ControlType.Number, min: 1, max: 10, title: "Duration"}
	};

	render() {
		const {
			width,
			height,
			animate,
			color,
			particles,
			spacing,
			duration
		} = this.props;
		const css = `
      @-webkit-keyframes iOSSpin {
        30% {
          opacity: 1;
          box-shadow: 0px 0px 6px rgba( 255, 255, 255, 0.8 );
        }
	  }`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const key = duration + iteration;

		const line = {
			position: "absolute",
			width: "7px",
			height: "2px",
			borderRadius: "4px",
			backgroundColor: color,
			opacity: 0.2,
			animationName: "iOSSpin",
			animationDuration: `${duration}s`,
			animationIterationCount: iteration,
			animationTimingFunction: "ease"
		};

		let lines = [];
		for (let i = 1; i < particles + 1; i++) {
			lines.push(
				<div
					style={Object.assign({}, line, {
						transform: `rotate( ${(i / particles) *
							360}deg ) translateX(${spacing}px)`,
						animationDelay: `${i * (duration / 12)}s`
					})}
				/>
			);
		}

		return (
			<div
				key={key}
				style={{position: "relative", width: width, height: height}}
			>
				<style>{css}</style>
				<div
					style={{
						marginLeft: "50%",
						marginTop: "50%",
						transform: "translateX(-3.5px) translateY(-1px)"
					}}
				>
					{lines}
				</div>
			</div>
		);
	}
}
