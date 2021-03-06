import { BaseSerializer } from "@hediet/semantic-json";
import { Theme } from "./Theme";

export interface VisualizerId extends String {
	__brand: "VisualizerId";
}

export function asVisualizerId(id: string): VisualizerId {
	return (id as unknown) as VisualizerId;
}

export interface Visualizer {
	readonly id: VisualizerId;
	readonly name: string;
	readonly serializer: BaseSerializer<Visualization>;
}

export interface VisualizationId extends String {
	__brand: "VisualizationId";
}

export function asVisualizationId(id: string): VisualizationId {
	return (id as unknown) as VisualizationId;
}

export interface VisualizationRenderOptions<TRenderState> {
	theme: Theme;
	previousRenderState: TRenderState | undefined;
	readyCallback: () => void;
}

export interface Visualization<TRenderState = any> {
	readonly id: VisualizationId;
	readonly name: string;
	readonly priority: number;
	readonly sourceVisualizer: Visualizer;

	render(
		target: HTMLDivElement,
		options: VisualizationRenderOptions<TRenderState>
	): { renderState: TRenderState };

	/**
	 * Preloads resources to speed up first rendering.
	 */
	preload(): Promise<void>;
}
