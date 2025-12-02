/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "ogl" {
  export interface RendererOptions {
    canvas?: HTMLCanvasElement;
    dpr?: number;
    alpha?: boolean;
    antialias?: boolean;
  }

  export class Renderer {
    constructor(options?: RendererOptions);
    gl: WebGLRenderingContext;
    dpr: number;
    canvas: HTMLCanvasElement;
    setSize(width: number, height: number): void;
    render(options: { scene: any }): void;
  }

  type UniformValue =
    | number
    | Vec2
    | Float32Array<ArrayBufferLike>
    | WebGLTexture
    | { set: (...args: number[]) => void };

  export interface ProgramOptions {
    vertex: string;
    fragment: string;
    uniforms?: Record<string, { value: UniformValue }>;
    transparent?: boolean;
  }

  export class Program {
    constructor(gl: WebGLRenderingContext, options: ProgramOptions);
    uniforms: Record<string, { value: any }>;
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }

  export interface MeshOptions {
    geometry: any;
    program: Program;
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext, options: MeshOptions);
  }

  export class Vec2 {
    constructor(x?: number, y?: number);
    set(x?: number, y?: number): this;
  }
}
