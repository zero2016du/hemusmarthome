import * as React from "react";
import {PropertyControls, ControlType, RenderTarget} from "framer";

interface Props {
	width: number;
	height: number;
	animate: boolean;
	stroke: number;
	colorA: string;
	colorB: string;
	colorC: string;
	colorD: string;
}

export class Material extends React.Component<Props> {
	static defaultProps = {
		width: 44,
		height: 44,
		animate: true,
		stroke: 2,
		colorA: "#EEE",
		colorB: "#05f",
		colorC: "#09f",
		colorD: "#0cf"
	};

	static propertyControls: PropertyControls<Props> = {
		animate: {
			type: ControlType.Boolean,
			enabled: "Canvas",
			disabled: "Preview",
			title: "Animate"
		},
		colorA: {type: ControlType.Color, title: "Color A"},
		colorB: {type: ControlType.Color, title: "Color B"},
		colorC: {type: ControlType.Color, title: "Color C"},
		colorD: {type: ControlType.Color, title: "Color D"},
		stroke: {type: ControlType.Number, min: 1, max: 6, title: "Stroke"}
	};

	render() {
		const {
			width,
			height,
			animate,
			stroke,
			colorA,
			colorB,
			colorC,
			colorD
		} = this.props;

		const css = `
      @-webkit-keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @-webkit-keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
      @-webkit-keyframes color {
        100 %,
        0% {
          stroke: ${colorA};
        }
        40% {
          stroke: ${colorB};
        }
        66% {
          stroke: ${colorC};
        }
        80%,
        90% {
          stroke: ${colorD};
        }
			}`;

		let iteration = "infinite";
		if (RenderTarget.current() != RenderTarget.preview && !animate) {
			iteration = "1";
		}

		const key = iteration + colorA + colorB + colorC + colorD;

		return (
			<div style={{position: "relative", width: width, height: height}}>
				<style>{css}</style>
				<svg
					key={key}
					style={{
						animation: `rotate 2s linear ${iteration}`,
						height: "100%",
						width: "100%",
						transformOrigin: "center center",
						position: "absolute",
						top: "0",
						left: "0",
						overflow: "visible",
						margin: "auto"
					}}
					viewBox="25 25 50 50"
				>
					<circle
						style={{
							strokeDasharray: "89, 200",
							stroke: colorA,
							strokeDashoffset: "0",
							animation: `dash 1.5s ease-in-out ${iteration}, color 6s ease-in-out ${iteration}`,
							strokeLinecap: "round"
						}}
						cx="50"
						cy="50"
						r="20"
						fill="none"
						strokeWidth={stroke}
						strokeMiterlimit="10"
					/>
				</svg>
			</div>
		);
	}
}
